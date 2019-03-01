import { MazeBuilderOptions } from "./maze-builder-options";
import { Maze } from "../maze";
import { IMazeGenerator } from "./maze-generator.interface";
import { MazeMove } from "./models/maze-move";
import { MoveDirection } from "../maze-game/models/move-direction";
import { MazePoint } from "../maze-game/models/maze-point";
import { MazeMoveDirectionHelperService } from "src/app/services/maze-move-direction-helper.service";
import { MoveState } from "./models/move-state";
import { RandomService } from "src/app/services/random.service";

export class ClassicMazeGenerator implements IMazeGenerator {
  constructor(
    private options: MazeBuilderOptions,
    private randomService: RandomService
  ) {}

  visitedPoints: any = {};

  create(): Maze {
    let maze = new Maze(this.options.size, this.options.cellsizepx);

    this.defineEntryAndExitPoints(maze);
    this.createOuterMazeWalls(maze);

    let move: MazeMove = new MazeMove(maze.entrance, MoveDirection.None);

    this.visitedPoints = {};
    this.visitedPoints[maze.entrance.toString()] = true;

    this.build(maze, move);

    return maze;
  }

  build(maze: Maze, mazeMove: MazeMove): MoveState {
    let nextPoint: MazePoint = MazeMove.NextPoint(mazeMove);

    if (this.isAtExit(maze, nextPoint)) {
      return MoveState.IsAtExit;
    } else if (
      this.canGo(nextPoint) ||
      mazeMove.direction == MoveDirection.None
    ) {
      this.visitedPoints[nextPoint.toString()] = true;

      let blockedMoves = {};

      if (mazeMove.direction != MoveDirection.None) {
        blockedMoves[
          MazeMoveDirectionHelperService.opposite(mazeMove.direction)
        ] = true;
      }

      let nextMove: MazeMove = this.getNewMove(nextPoint, blockedMoves);

      let foundExit = false;

      while (nextMove.direction != MoveDirection.None) {
        if (this.build(maze, nextMove) == MoveState.IsAtExit) {
          foundExit = true;
        }

        blockedMoves[nextMove.direction] = true;
        nextMove = this.getNewMove(nextPoint, blockedMoves);
      }

      if (foundExit) {
        return MoveState.IsAtExit;
      } else {
        return MoveState.NoWay;
      }
    } else {
      this.makeAWall(maze, mazeMove);
      return MoveState.NoWay;
    }
  }

  canGo(point: MazePoint): boolean {
    return (this.isOutSideBounds(point) || this.hasBeenHere(point)) == false;
  }

  makeAWall(maze: Maze, move: MazeMove) {
    if (this.isOutSideBounds(MazeMove.NextPoint(move)) == false) {
      switch (move.direction) {
        case MoveDirection.Down:
          maze.mazeHorizontalWalls[move.point.y + 1][move.point.x] = 1;
          break;
        case MoveDirection.Up:
          maze.mazeHorizontalWalls[move.point.y][move.point.x] = 1;
          break;
        case MoveDirection.Left:
          maze.mazeVerticalwalls[move.point.y][move.point.x] = 1;
          break;
        case MoveDirection.Right:
          maze.mazeVerticalwalls[move.point.y][move.point.x + 1] = 1;
          break;
      }
    }
  }

  getNewMove(newPoint: MazePoint, blockedMoves: any): MazeMove {
    let possibleDirections = MazeMoveDirectionHelperService.get();

    let moveOptionCount =
      possibleDirections.length - Object.keys(blockedMoves).length;

    if (moveOptionCount == 0) {
      return new MazeMove(newPoint, MoveDirection.None);
    }

    let rndDirection = this.randomService.randomInt(moveOptionCount);
    let i = 0;

    let mazeMove = null;

    possibleDirections.forEach(d => {
      if (blockedMoves[d]) {
        //skip
      } else {
        if (i == rndDirection) {
          mazeMove = new MazeMove(newPoint, d);
        }

        i++;
      }
    });

    return mazeMove;
  }

  isOutSideBounds(point: MazePoint) {
    let size = this.options.size;

    return point.x < 0 || point.y < 0 || point.y >= size || point.x >= size;
  }

  isAtExit(maze: Maze, point: MazePoint) {
    return point.x === maze.exit.x && point.y === maze.exit.y;
  }

  hasBeenHere(point: MazePoint) {
    return this.visitedPoints[point.toString()] === true;
  }

  defineEntryAndExitPoints(maze: Maze) {
    maze.entrance = new MazePoint(
      Math.floor(Math.random() * this.options.size),
      0
    );

    maze.exit = new MazePoint(
      Math.floor(Math.random() * this.options.size),
      this.options.size
    );
  }

  createOuterMazeWalls(maze: Maze) {
    const size = this.options.size;

    maze.mazeHorizontalWalls = [];
    maze.mazeVerticalwalls = [];

    for (let i = 0; i < size + 1; i++) {
      const line = [];

      maze.mazeHorizontalWalls.push(line);

      for (let j = 0; j < size; j++) {
        let putAWall = 0;

        if (i === 0 || i === size) {
          putAWall = 1;
        }

        if (maze.entrance.y === i && j === maze.entrance.x) {
          putAWall = 0;
        }

        if (maze.exit.y === i && j === maze.exit.x) {
          putAWall = 0;
        }

        line.push(putAWall);
      }
    }

    for (let i = 0; i < size; i++) {
      const line = [];
      maze.mazeVerticalwalls.push(line);
      for (let j = 0; j < size + 1; j++) {
        let putAWall = 0;

        if (j === 0 || j === size) {
          putAWall = 1;
        }

        line.push(putAWall);
      }
    }
  }
}
