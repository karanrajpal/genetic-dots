import { p } from "..";
import { Vector } from "p5";

const mutationRate = 0.01;

// Gene's job is to store the unique movements the dot will make through it's lifetime
export class Genes {
    public movements: Vector[] = [];
    public currentStep = 0;
    private totalSteps = 500;

    constructor() {
        this.generateMovements();
    }

    private getRandomAngle() {
        const randomAngle = p.random(2 * p.PI);
        return Vector.fromAngle(randomAngle);
    }

    private generateMovements() {
        for (let i = 0; i < this.totalSteps; i++) {
            this.movements.push(this.getRandomAngle());
        }
    }

    public getNextMove() {
        return this.movements[this.currentStep++];
    }

    public clone(): Genes {
        const newGenes = new Genes();
        newGenes.movements = [...this.movements];
        return newGenes;
    }

    public mutate() {
        for (let i = 0; i < this.movements.length; i++) {
            if (Math.random() < mutationRate) {
                this.movements[i] = this.getRandomAngle();
            }
        }
    }
}
