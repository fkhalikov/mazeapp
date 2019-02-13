import { Maze } from '../maze';

export interface IMazeGenerator {
  create(): Maze;
}
