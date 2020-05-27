import { Dot } from './Dot';

export class Population {
    private generation = 1;
    private population: Dot[];
    private bestStepsSoFar = 500;
    private fitnessSum;
    private bestFitnessScore = 0;

    constructor(private size = 100) {
        this.population = this.create();
    }

    public update() {
        for (let i = 0; i < this.population.length; i++) {
            const dot = this.population[i];
            if (dot.genes.currentStep > this.bestStepsSoFar) {
                dot.dead = true;
            }
            dot.update();
        }
    }

    public allDotsDone() {
        for (let i = 0; i < this.population.length; i++) {
            const dot = this.population[i];
            if (!dot.dead && !dot.reachedGoal) {
                return false;
            }
        }
        return true;
    }

    // The God function. Makes selections by picking the best performing parents and spawns the next generation of dots
    public naturalSelection() {
        const newPopulation: Dot[] = [];
        this.setFitnessSum();

        const bestDot = this.getBestPerformer();
        newPopulation.push(bestDot.makeBaby());

        for (let i = 1; i < this.size; i++) {
            const parentDot = this.selectionOfTheFittestParent();
            const childDot = parentDot.makeBaby();
            childDot.genes.mutate();
            newPopulation.push(childDot);
        }

        this.generation++;
        this.population = newPopulation;
    }

    public getStats() {
        return {
            generation: this.generation,
            bestStepsSoFar: this.bestStepsSoFar,
            bestFitness: this.bestFitnessScore,
            size: this.population.length,
            fitnessSum: this.fitnessSum,
        };
    }

    private getBestPerformer(): Dot {
        let max = 0;
        let bestDot: Dot = this.population[0];
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > max) {
                bestDot = this.population[i];
                max = bestDot.fitness;
            }
        }
        // If this bestDot reached the goal, then reset the bestStepsSoFar
        if (bestDot.reachedGoal && bestDot.genes.currentStep < this.bestStepsSoFar) {
            this.bestStepsSoFar = bestDot.genes.currentStep;
        }
        return bestDot;
    }

    // We need to make this calculation so that the selection of the fittest function can choose a parent correctly
    private setFitnessSum() {
        let sum = 0;
        const fitnesses = [];
        this.population.forEach((dot) => {
            if (dot.fitness > this.bestFitnessScore) {
                this.bestFitnessScore = dot.fitness;
            }
            sum += dot.fitness;
            fitnesses.push(dot.fitness);
        });
        this.fitnessSum = sum;
    }

    private selectionOfTheFittestParent(): Dot {
        const randomNumber = Math.random() * this.fitnessSum;
        let runningSum = 0;
        for (let i = 0; i < this.size; i++) {
            runningSum += this.population[i].fitness;
            if (runningSum > randomNumber) {
                // We've found our highly probably parent
                return this.population[i];
            }
        }
    }

    private create(): Dot[] {
        const dots = [];
        for (let i = 0; i < this.size; i++) {
            const dot = new Dot();
            dots.push(dot);
        }
        return dots;
    }
}
