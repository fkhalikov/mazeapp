import { MoveDirection } from './move-direction';

export class MazePoint {
    constructor(public x: number, public y: number) {}

    static NextPoint(point: MazePoint, direction: MoveDirection): MazePoint {
        switch (direction) {
            case MoveDirection.Down:
                return new MazePoint(point.x, point.y + 1);
            case MoveDirection.Up:
                return new MazePoint(point.x, point.y - 1);
            case MoveDirection.Left:
                return new MazePoint(point.x - 1, point.y);
            case MoveDirection.Right:
                return new MazePoint(point.x + 1, point.y);
        }
    }

    Copy() {
        return new MazePoint(this.x, this.y);
    }

    toString() {
        return 'p' + this.x + '_' + this.y;
    }
}
