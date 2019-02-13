import { MazePoint } from 'src/app/maze-game/maze-game/models/maze-point';

export interface IMazeGameObject {
    id: string;
    position: MazePoint;
    getDefinition(): string;
}