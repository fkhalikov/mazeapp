import { MazeBuilderOptions } from "./maze-builder-options";
import { Maze } from "../maze";

declare var $: any;

export class MazeUIBuilder {
  constructor(private mazeBuilderOptions: MazeBuilderOptions) {}

  build(maze: Maze): void {
    const mazeContainer: any = $("#" + this.mazeBuilderOptions.containerDivId);
    mazeContainer.empty();

    const cellSize: number = this.mazeBuilderOptions.cellsizepx;

    let widthHeight = cellSize * this.mazeBuilderOptions.size;

    mazeContainer.css({
      width: `${widthHeight}px`,
      height: `${widthHeight}px`
    });

    for (let i = 0; i < maze.mazeVerticalwalls.length; i++) {
      for (let j = 0; j < maze.mazeVerticalwalls[i].length; j++) {
        const showWall = maze.mazeVerticalwalls[i][j];

        const newDiv = `<div id='${"vwall_" + i + "_" + j}'
                                    style='top:${i * cellSize -
                                      (i > 0 ? 1 : 0)}px;
                                        left:${j * cellSize -
                                          (j > 0 ? 1 : 0)}px;height:${
          showWall === 1 ? cellSize : 0
        }px;' class="maze-cell vertical-line"></div>`;

        $(mazeContainer).append(newDiv);
      }
    }

    for (let i = 0; i < maze.mazeHorizontalWalls.length; i++) {
      for (let j = 0; j < maze.mazeHorizontalWalls[i].length; j++) {
        let showWall = maze.mazeHorizontalWalls[i][j];

        const newDiv = `<div id='${"hwall_" + i + "_" + j}'
                style='top:${i * cellSize - (i > 0 ? 1 : 0)}px;
                    left:${j * cellSize - (j > 0 ? 1 : 0)}px;width:${
          showWall === 1 ? cellSize : 0
        }px' class="maze-cell horizontal-line"></div>`;

        $(mazeContainer).append(newDiv);
      }
    }
  }
}
