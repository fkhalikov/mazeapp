import { MazePlayer } from "src/app/maze-game/maze-game/models/maze-player";
import { Maze } from "src/app/maze-game/maze";
import { MazePoint } from "src/app/maze-game/maze-game/models/maze-point";
import { IMazeGameObject } from "src/app/maze-game/maze-game/models/maze-game-object";
import { MoveDirection } from "src/app/maze-game/maze-game/models/move-direction";
import { MazeWallType } from "src/app/maze-game/maze-game/models/maze-wall-type";

declare var $: any;

export class MazeGame {
  player: MazePlayer;

  constructor(private maze: Maze) {}

  initPlayer(name: string): void {
    this.player = this.maze.addPlayer("player1");
  }

  moveDown(mazeObject: IMazeGameObject, breakTheWall: boolean = false) {
    if (this.canGo(mazeObject.position, MoveDirection.Down)) {
      mazeObject.position.y++;
      this.maze.positionObject(mazeObject);

      if (this.hasReachedExit(mazeObject.position.y, mazeObject.position.x)) {
        alert('WoW! You have won!');
      }
    } else if (breakTheWall) {
      this.breakThrough(
        mazeObject,
        MoveDirection.Down,
        MazeWallType.Horizontal
      );
    }
  }

  moveUp(mazeObject: IMazeGameObject, breakTheWall: boolean = false) {
    if (this.canGo(mazeObject.position, MoveDirection.Up)) {
      mazeObject.position.y--;
      this.maze.positionObject(mazeObject);
    } else if (breakTheWall) {
      this.breakThrough(mazeObject, MoveDirection.Up, MazeWallType.Horizontal);
    }
  }

  moveLeft(mazeObject: IMazeGameObject, breakTheWall: boolean = false) {
    if (this.canGo(mazeObject.position, MoveDirection.Left)) {
      mazeObject.position.x--;
      this.maze.positionObject(mazeObject);
    } else if (breakTheWall) {
      this.breakThrough(mazeObject, MoveDirection.Left, MazeWallType.Vertical);
    }
  }

  moveRight(mazeObject: IMazeGameObject, breakTheWall: boolean = false) {
    if (this.canGo(mazeObject.position, MoveDirection.Right)) {
      mazeObject.position.x++;
      this.maze.positionObject(mazeObject);
    } else if (breakTheWall) {
      this.breakThrough(mazeObject, MoveDirection.Right, MazeWallType.Vertical);
    }
  }

  breakThrough(
    mazeObject: IMazeGameObject,
    direction: MoveDirection,
    wallType: MazeWallType
  ) {
    switch (direction) {
      case MoveDirection.Down:
        if (mazeObject.position.y < this.maze.size - 1) {
          this.maze.removeWall(
            MazeWallType.Horizontal,
            mazeObject.position.y + 1,
            mazeObject.position.x
          );
          this.moveDown(mazeObject);
        }
        break;
      case MoveDirection.Up:
        if (mazeObject.position.y > 0) {
          this.maze.removeWall(
            MazeWallType.Horizontal,
            mazeObject.position.y,
            mazeObject.position.x
          );
          this.moveUp(mazeObject);
        }
        break;
      case MoveDirection.Left:
        if (mazeObject.position.x > 0) {
          this.maze.removeWall(
            MazeWallType.Vertical,
            mazeObject.position.y,
            mazeObject.position.x
          );

          this.moveLeft(mazeObject);
        }
        break;
      case MoveDirection.Right:
        if (mazeObject.position.x < this.maze.size - 1) {
          this.maze.removeWall(
            MazeWallType.Vertical,
            mazeObject.position.y,
            mazeObject.position.x + 1
          );
          this.moveRight(mazeObject);
        }
        break;
    }
  }

  canGo(currentPosition: MazePoint, direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.Down:
        return (
          (currentPosition.y < this.maze.size - 1 &&
            this.maze.mazeHorizontalWalls[currentPosition.y + 1][
              currentPosition.x
            ] === 0) ||
          this.hasReachedExit(currentPosition.y + 1, currentPosition.x)
        );
      case MoveDirection.Up:
        return (
          currentPosition.y > 0 &&
          this.maze.mazeHorizontalWalls[currentPosition.y][
            currentPosition.x
          ] === 0
        );
      case MoveDirection.Left:
        return (
          currentPosition.x > 0 &&
          this.maze.mazeVerticalwalls[currentPosition.y][currentPosition.x] ===
            0
        );

      case MoveDirection.Right:
        return (
          currentPosition.x < this.maze.size - 1 &&
          this.maze.mazeVerticalwalls[currentPosition.y][
            currentPosition.x + 1
          ] === 0
        );
    }
  }

  restart() {
    this.maze.positionObjectByPoint(this.player, this.maze.entrance);
  }

  hasReachedExit(y: number, x: number) {
    return x === this.maze.exit.x && y === this.maze.exit.y;
  }

  size() {
      return this.maze.size;
  }
}
