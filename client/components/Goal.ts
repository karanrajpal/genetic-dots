import { p } from "..";
import { Vector } from "p5";

export class Goal {
    public center: Vector;
    constructor(public x, public y, public width = 50, public height = 50) {
        this.center = p.createVector(x + width / 2, y + height / 2);
    }

    public render() {
        p.fill(0, 255, 0);
        p.rect(this.x, this.y, this.width, this.height);
    }
}
