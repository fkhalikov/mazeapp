import { MazePoint } from '../../maze-game/models/maze-point'
import { MoveDirection } from '../../maze-game/models/move-direction'
import { Maze } from '../../maze'

export class MazeMove {
    constructor(public point: MazePoint, public direction: MoveDirection) {}

    static NextPoint(mazeMove: MazeMove): MazePoint {
        return MazePoint.NextPoint(mazeMove.point, mazeMove.direction);
    }
}
