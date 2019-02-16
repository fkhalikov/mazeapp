import { MazeBuilderOptions } from './maze-builder/maze-builder-options';
import { MazePoint } from './maze-game/models/maze-point';
import { MazePlayer } from './maze-game/models/maze-player';
import { IMazeGameObject } from './maze-game/models/maze-game-object';
import { MazeWallType } from './maze-game/models/maze-wall-type';

declare var $: any;

export class Maze extends MazeBuilderOptions {
  mazeContainer: any;

  mazeObjects: any = {};

  mazeHorizontalWalls: any[] = [];
  mazeVerticalwalls: any[] = [];
  entrance: MazePoint;
  exit: MazePoint;

  constructor(
    public size: number,
    public cellsizepx: number,
    public mazecontainerdiv: string
  ) {
    super(size, mazecontainerdiv, cellsizepx);

    this.mazeContainer = $("#" + mazecontainerdiv);
  }

  addPlayer(name: string, color?: string): MazePlayer {
    const mazePlayer: MazePlayer = new MazePlayer(name, this.cellsizepx - 10, color);
    this.mazeContainer.append(mazePlayer.getDefinition());
    this.mazeObjects[mazePlayer.id] = $("#" + mazePlayer.id);
    mazePlayer.position = new MazePoint(this.entrance.x, this.entrance.y);

    this.positionObject(mazePlayer);

    return mazePlayer;
  }

  positionObject(mazeObject: IMazeGameObject): void {
    const mazePoint: MazePoint = this.toUIPoint(mazeObject.position);

    this.mazeObjects[mazeObject.id].css({
      top: mazePoint.y,
      left: mazePoint.x
    });
  }

  positionObjectByPoint(mazeObject: IMazeGameObject, point: MazePoint): void {
    mazeObject.position.x = point.x;
    mazeObject.position.y = point.y;

    this.positionObject(mazeObject);
  }

  toUIPoint(point: MazePoint): MazePoint {
    return new MazePoint(
      1 + point.x * this.cellsizepx,
      1 + point.y * this.cellsizepx
    );
  }

  removeWall(wallType: MazeWallType, y: number, x: number) {
    if (wallType === MazeWallType.Horizontal) {
      this.mazeHorizontalWalls[y][x] = 0;
      $(`#hwall${'_' + y + '_' + x}`).css({ width: '0px' });
    } else {
      this.mazeVerticalwalls[y][x] = 0;
      $(`#vwall${'_' + y + '_' + x}`).css({ height: '0px' });
    }
  }
}
