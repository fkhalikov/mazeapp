import { MazeGame } from "../maze-game/maze-game.component";
import { MoveDirection } from "../maze-game/models/move-direction";
import { MazePoint } from "../maze-game/models/maze-point";
import { MazeSolverResult } from "./maze-solver-result";
import { CloneService } from "src/app/services/clone.service";
import { Injectable } from '@angular/core';

@Injectable()
export class MazeGameSolver {
  constructor(private cloneService: CloneService) {}

  private terminate: boolean;
  private lastTimeoutInstance: any;

  solve(mazeGame: MazeGame): void {
    this.terminate = false;
    const player = mazeGame.player;

    let route: MoveDirection[];
    route = [];

    const solverResult = this.findRoute(
      mazeGame,
      player.getPosition(),
      route,
      MoveDirection.None,
      {}
    );

    if (solverResult.found) {
      let self = this;
      let autoSolveDel = function(pos) {
        self.lastTimeoutInstance = setTimeout(() => {
          switch (solverResult.route[pos]) {
            case MoveDirection.Down:
              mazeGame.moveDown();
              break;
            case MoveDirection.Up:
              mazeGame.moveUp();
              break;
            case MoveDirection.Left:
              mazeGame.moveLeft();
              break;
            case MoveDirection.Right:
              mazeGame.moveRight();
              break;
          }

          if (pos < solverResult.route.length - 1
            && self.terminate == false) {
            autoSolveDel(++pos);
          }
        }, 50);
      };
      autoSolveDel(0);
    } else {
      alert("No way to get out of here!");
    }
  }

  findRoute(
    mazeGame: MazeGame,
    point: MazePoint,
    outRoute: MoveDirection[],
    previousMove: MoveDirection,
    routePoints: any
  ): MazeSolverResult {
    if (previousMove !== MoveDirection.Up) {
      const checkResult = this.checkDirection(
        mazeGame,
        point,
        MoveDirection.Down,
        outRoute.splice(0),
        this.cloneService.clone(routePoints)
      );

      if (checkResult.found) {
        return checkResult;
      }
    }

    if (previousMove !== MoveDirection.Down) {
      const checkResult = this.checkDirection(
        mazeGame,
        point,
        MoveDirection.Up,
        outRoute.splice(0),
        this.cloneService.clone(routePoints)
      );

      if (checkResult.found) {
        return checkResult;
      }
    }

    if (previousMove !== MoveDirection.Right) {
      const checkResult = this.checkDirection(
        mazeGame,
        point,
        MoveDirection.Left,
        outRoute.splice(0),
        this.cloneService.clone(routePoints)
      );

      if (checkResult.found) {
        return checkResult;
      }
    }

    if (previousMove !== MoveDirection.Left) {
      const checkResult = this.checkDirection(
        mazeGame,
        point,
        MoveDirection.Right,
        outRoute.splice(0),
        this.cloneService.clone(routePoints)
      );

      if (checkResult.found) {
        return checkResult;
      }
    }

    return new MazeSolverResult();
  }

  checkDirection(
    mazeGame: MazeGame,
    point: MazePoint,
    moveDirection: MoveDirection,
    outRoute: MoveDirection[],
    routePoints: any
  ): MazeSolverResult {
    const result = new MazeSolverResult();
    result.found = false;

    const newDirection = point.Copy();

    switch (moveDirection) {
      case MoveDirection.Down:
        newDirection.y++;
        break;
      case MoveDirection.Up:
        newDirection.y--;
        break;
      case MoveDirection.Left:
        newDirection.x--;
        break;
      case MoveDirection.Right:
        newDirection.x++;
        break;
    }

    if (
      mazeGame.canGo(point, moveDirection) &&
      this.haveIBeenThere(newDirection, routePoints) === false
    ) {
      outRoute.push(moveDirection);

      routePoints[newDirection.toString()] = true;

      if (mazeGame.hasReachedExit(newDirection.y, newDirection.x)) {
        result.found = true;
        result.route = outRoute;
        return result;
      } else {
        const subSearch = this.findRoute(
          mazeGame,
          newDirection,
          [],
          moveDirection,
          this.cloneService.clone(routePoints)
        );

        if (subSearch.found) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < subSearch.route.length; i++) {
            outRoute.push(subSearch.route[i]);
          }

          result.found = true;
          result.route = outRoute;

          return result;
        }
      }
    }

    return result;
  }

  haveIBeenThere(position: MazePoint, routePoints: any) {
    return routePoints[position.toString()] === true;
  }

  stop() {
      this.terminate = true;
      if (this.lastTimeoutInstance) {
        clearTimeout(this.lastTimeoutInstance);
        this.lastTimeoutInstance = undefined;
      }
  }
}
