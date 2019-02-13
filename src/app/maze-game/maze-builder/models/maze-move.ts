import { MazePoint } from '../../maze-game/models/maze-point'
import { MoveDirection } from '../../maze-game/models/move-direction'

export class MazeMove {
    consecutiveMove: MoveDirection;
    consecutiveMoveCount: number = 0;

    constructor(public point: MazePoint, public direction: MoveDirection) {
        this.consecutiveMove = direction;
    }

    static NextPoint(mazeMove: MazeMove): MazePoint {
        return MazePoint.NextPoint(mazeMove.point, mazeMove.direction);
    }
}
