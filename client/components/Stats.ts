import { p } from "..";
import { Population } from "./Population";

export class Stats {
    constructor(private population: Population) { }

    public update() {
        const stats = this.population.getStats();
        p.fill(255, 150);
        p.rect(5, 5, 140, 110);
        p.fill(0);
        p.text("Generation: " + stats.generation, 10, 20);
        p.text("Best Fitness Score: " + stats.bestFitness.toFixed(2), 10, 40);
        p.text("Best Steps So Far: " + stats.bestStepsSoFar, 10, 60);
        p.text("Population Size: " + stats.size, 10, 80);
        p.text("Frame Rate: " + Math.round(p.frameRate()), 10, 100);
        // p.text("Fitness Sum: " + stats.fitnessSum, 10, 110);
        //   text("Succesful Explorers: " + this.population.getSuccesfulDotCount(), 10, 40);
        // const generation = new PIXI.BitmapText(`Generation: ${stats.generation}`, { font: { size: 24 }, tint: 0xFFFFFF });
    }
}
