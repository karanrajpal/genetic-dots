import { p, goal } from "..";
import { Genes } from './Genes';

export class Dot {
    public genes: Genes;
    public dead: boolean = false;
    public reachedGoal: boolean = false;
    public isBest: boolean = false;
    private pos = p.createVector(window.innerWidth/2, window.innerHeight - 30);
    private vel = p.createVector(0, 0);
    private radius = 7;
    public fitness = 0;

    constructor(genes?: Genes) {
        if (genes) {
            this.genes = genes;
        } else {
            this.genes = new Genes();
        }
    }

    public render() {
        if (this.reachedGoal) {
            p.fill(0, 0, 255);
        } else if (this.dead) {
            p.fill(255, 0, 0);
        } else {
            p.fill(255);
        }
        p.ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }

    public update() {
        if (!this.dead && !this.reachedGoal) {
            this.move();
            if (this.pos.x >= window.innerWidth || this.pos.x <= 0 || this.pos.y >= window.innerHeight || this.pos.y <= 0) {
                this.dead = true;
            // } else if (p.dist(this.pos.x, this.pos.y, goal.center.x, goal.center.y) <= (goal.width / 2)) {
            } else if (p.collideRectCircle(goal.x, goal.y, goal.width, goal.height, this.pos.x, this.pos.y, this.radius)) {
                this.reachedGoal = true;
            }
        }
        if (this.dead || this.reachedGoal) {
            this.calculateFitness();
        }
        this.render();
    }

    private move() {
        const nextMove = this.genes.getNextMove();
        if (!nextMove) {
            this.dead = true;
        } else {
            this.vel.add(nextMove);
            this.vel.limit(5);
            this.pos.add(this.vel);
        }
    }

    public makeBaby(): Dot {
        // This is a very simple crossover, in the sense that there is no crossover.
        // The child dot gets the exact genes as the parent
        const childGenes = this.genes.clone();
        const childDot = new Dot(childGenes);
        return childDot;
    }

    private calculateFitness() {
        if (this.reachedGoal) {  // if the dot reached the goal
            // fitness is higher if steps are lower
            this.fitness = (1.0 / 16.0) + 10000.0 / (this.genes.currentStep * this.genes.currentStep);
        } else {
            const distanceToGoal = p.dist(this.pos.x, this.pos.y, goal.center.x, goal.center.y);
            this.fitness = 1 / (distanceToGoal * distanceToGoal * distanceToGoal);
        }
    }
}
