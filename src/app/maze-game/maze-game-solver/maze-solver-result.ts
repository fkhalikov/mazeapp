import { MoveDirection } from '../maze-game/models/move-direction';

export class MazeSolverResult {
    found: boolean;
    route: MoveDirection[];
}