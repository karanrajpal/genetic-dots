/**
 * Adding instance extensions to p5. Currently includes types for p5.collide.min.js
 */
import p5 from "p5";

declare module 'p5' {
    interface p5InstanceExtensions {
        collideRectCircle?: (rectX: string, rectY: number, rectWidth: number, rectHeight: number, circleX: number, circleY: number, circleRadius: number) => boolean;
    }
}

