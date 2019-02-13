import { Maze } from 'src/app/maze-game/maze';

export interface IMazeGenerator {
  create(): Maze;
}
