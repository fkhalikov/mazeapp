import { MoveDirection } from 'src/app/maze-game/maze-game/models/move-direction';

export class MazeSolverResult {
    found: boolean;
    route: MoveDirection[];
}