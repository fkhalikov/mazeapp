import { Maze } from "../maze";
import { MoveDirection } from "./models/move-direction";
import { MazePoint } from "./models/maze-point";
import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { MazeBuilderOptions } from "../maze-builder/maze-builder-options";
import { IMazeGenerator } from "../maze-builder/maze-generator.interface";
import { ClassicMazeGenerator } from "../maze-builder/classic-maze-generator";
import { MazePlayerComponent } from "../maze-player/maze-player.component";
import { RandomService } from "../../services/random.service";

@Component({
  selector: "maze-game",
  templateUrl: "maze-game.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazeGame {
  @ViewChild(MazePlayerComponent) player: MazePlayerComponent;
  
  maze: Maze;
  cellSize: number = 20;
  size: number = 10;
  verticalWalls: any[];
  horizontalWalls: any[];
  constructor(
    private changeDetector: ChangeDetectorRef,
    private randomService: RandomService
  ) {}

 
  moveDown() {
    if (this.canGo(this.player.getPosition(), MoveDirection.Down)) {
      this.player.SetY(++this.player.y);

      if (this.hasReachedExit(this.player.y, this.player.x)) {
        alert("WoW! You have won!");
      }
    }
  }

  moveUp() {
    if (this.canGo(this.player.getPosition(), MoveDirection.Up)) {
      this.player.SetY(--this.player.y);
    }
  }

  moveLeft() {
    if (this.canGo(this.player.getPosition(), MoveDirection.Left)) {
      this.player.SetX(--this.player.x);
    }
  }

  moveRight() {
    if (this.canGo(this.player.getPosition(), MoveDirection.Right)) {
      this.player.SetX(++this.player.x);
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

  restart() {}

  hasReachedExit(y: number, x: number) {
    return x === this.maze.exit.x && y === this.maze.exit.y;
  }

  createNew(size: number) {
    const mazeOptions = new MazeBuilderOptions(size, this.cellSize);

    const mazeGenerator: IMazeGenerator = new ClassicMazeGenerator(
      mazeOptions,
      this.randomService
    );

    this.maze = mazeGenerator.create();

    this.size = size;

    this.verticalWalls = this.maze.mazeVerticalwalls;
    this.horizontalWalls = this.maze.mazeHorizontalWalls;
    this.changeDetector.detectChanges();

    this.player.SetPosition(this.maze.entrance.Copy());
  }
}
