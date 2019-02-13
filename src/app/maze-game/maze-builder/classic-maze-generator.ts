import { MazeBuilderOptions } from "./maze-builder-options";
import { Maze } from "../maze";
import { IMazeGenerator } from "./maze-generator.interface";
import { MazeMove } from "./models/maze-move";
import { MoveDirection } from "../maze-game/models/move-direction";
import { MazePoint } from "../maze-game/models/maze-point";
import { MazeMoveDirectionHelperService } from "src/app/services/maze-move-direction-helper.service";

export class ClassicMazeGenerator implements IMazeGenerator {
  constructor(private options: MazeBuilderOptions) {}

  visitedPoints: any = {};

  create(): Maze {
    let maze = new Maze(
      this.options.size,
      this.options.cellsizepx,
      this.options.containerDivId
    );

    this.defineEntryAndExitPoints(maze);
    this.createOuterMazeWalls(maze);

    let moves: MazeMove[] = this.getNewMoves(
      maze.entrance,
      new MazeMove(maze.entrance, MoveDirection.None)
    );

    this.visitedPoints = {};
    this.visitedPoints[maze.entrance.toString()] = true;

    this.build(maze, moves);

    return maze;
  }

  build(maze: Maze, moves: MazeMove[]) {
    let newMoves = [];

    while (moves.length > 0) {
      let moveIndex = Math.floor(Math.random() * moves.length);

      let move: MazeMove = moves[moveIndex];
      moves.splice(moveIndex, 1);

      let nextPoint: MazePoint = MazeMove.NextPoint(move);

      if (this.canGo(nextPoint) && move.consecutiveMoveCount < 3) {
        
          this.visitedPoints[nextPoint.toString()] = true;

          let nextPointMoves = this.getNewMoves(nextPoint, move);

          nextPointMoves.forEach(m => newMoves.push(m));
        
      } else if (this.isAtExit(maze, nextPoint)) {
        // skip
      } else {
        this.makeAWall(maze, move);
      }
    }

    if (newMoves.length > 0) {
      this.build(maze, newMoves);
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

  getNewMoves(newPoint: MazePoint, lastMove: MazeMove): MazeMove[] {
    let newMoves: MazeMove[] = [];

    let possibleDirections = MazeMoveDirectionHelperService.get();

    let backDirection = MazeMoveDirectionHelperService.opposite(
      lastMove.direction
    );

    possibleDirections.forEach((d, i) => {
      if (d != backDirection) {
        let newMove = new MazeMove(newPoint, d);

        if (d == lastMove.consecutiveMove) {
          newMove.consecutiveMoveCount = lastMove.consecutiveMoveCount + 1;
        }

        newMoves.push(newMove);
      }
    });

    return newMoves;
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
