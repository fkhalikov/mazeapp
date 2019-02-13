import { MazePoint } from './maze-point';

export interface IMazeGameObject {
    id: string;
    position: MazePoint;
    getDefinition(): string;
}