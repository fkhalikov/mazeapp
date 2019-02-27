import { MazeBuilderOptions } from './maze-builder/maze-builder-options';
import { MazePoint } from './maze-game/models/maze-point';

export class Maze extends MazeBuilderOptions {

  mazeHorizontalWalls: any[] = [];
  mazeVerticalwalls: any[] = [];
  entrance: MazePoint;
  exit: MazePoint;

  constructor(
    public size: number,
    public cellsizepx: number
  ) {
    super(size, cellsizepx);
  }


 
}
