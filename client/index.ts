import { Population } from './components/Population';
import { Goal } from './components/Goal';
import { Stats } from './components/Stats';

// Importing p5 after extending it's functionality
import p5 from './libraries/p5.collide2d.min';

// Exporting the instantiated p5 object to follow the Singleton pattern
export const p: p5 = new p5((p: p5) => {
    let population: Population;
    let stats: Stats;

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        population = new Population(100);
        stats = new Stats(population);
    }

    p.draw = () => {
        p.background(20);
        goal.render();
        if (population.allDotsDone()) {
            population.naturalSelection();
        }
        population.update();
        stats.update();
    }
});

// Exporting goal so that it can be used as a Singleton by all dot objects
const goalWidth = 50;
const goalHeight = 50;
const goalX = (window.innerWidth/2) - (goalWidth/2);
const goalY = 10;
export const goal = new Goal(goalX, goalY, goalWidth, goalHeight);
