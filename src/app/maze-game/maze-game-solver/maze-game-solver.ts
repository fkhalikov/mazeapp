import { MazeGame } from "../maze-game";
import { MoveDirection } from "../maze-game/models/move-direction";
import { MazePoint } from "../maze-game/models/maze-point";
import { MazeSolverResult } from "./maze-solver-result";
import { CloneService } from 'src/app/services/clone.service';

export class MazeGameSolver {
  constructor(private mazeGame: MazeGame, private cloneService: CloneService) {}

  solve(): void {
    const player = this.mazeGame.player;

    let route: MoveDirection[];
    route = [];

    const solverResult = this.findRoute(
      player.position,
      route,
      MoveDirection.None,
      {}
    );
    if (solverResult.found) {
      const self = this;

      let autoSolveDel = function(pos) {
        setTimeout(() => {
          switch (solverResult.route[pos]) {
            case MoveDirection.Down:
              self.mazeGame.moveDown(self.mazeGame.player);
              break;
            case MoveDirection.Up:
              self.mazeGame.moveUp(self.mazeGame.player);
              break;
            case MoveDirection.Left:
              self.mazeGame.moveLeft(self.mazeGame.player);
              break;
            case MoveDirection.Right:
              self.mazeGame.moveRight(self.mazeGame.player);
              break;
          }

          if (pos < solverResult.route.length - 1) {
            autoSolveDel(++pos);
          }
        }, 200);
      };
      autoSolveDel(0);
    } else {
      alert("No way to get out of here!");
    }
  }

  findRoute(
    point: MazePoint,
    outRoute: MoveDirection[],
    previousMove: MoveDirection,
    routePoints: any
  ): MazeSolverResult {
    if (previousMove !== MoveDirection.Up) {
      const checkResult = this.checkDirection(
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
      this.mazeGame.canGo(point, moveDirection) &&
      this.haveIBeenThere(newDirection, routePoints) === false
    ) {
      outRoute.push(moveDirection);

      routePoints[newDirection.toString()] = true;

      if (this.mazeGame.hasReachedExit(newDirection.y, newDirection.x)) {
        result.found = true;
        result.route = outRoute;
        return result;
      } else {
        const subSearch = this.findRoute(
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
}
