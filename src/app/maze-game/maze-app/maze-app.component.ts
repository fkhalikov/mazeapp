import { MazeGame } from "../maze-game/maze-game.component";
import {
  Component,
  AfterViewInit,
  ViewChild,
  HostListener
} from "@angular/core";
import { MazeGameSolver } from '../maze-game-solver/maze-game-solver';

@Component({
  selector: "maze-app",
  templateUrl: "maze-app.component.html"
})
export class MazeApp implements AfterViewInit {
  @ViewChild(MazeGame) mazeGame: MazeGame;

  selectedSize: number = 20;

  constructor(private mazeSolver: MazeGameSolver) {}

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37: // left
        this.mazeGame.moveLeft();
        break;

      case 38: // up
        this.mazeGame.moveUp();
        break;

      case 39: // right
        this.mazeGame.moveRight();
        break;

      case 40: // down
        this.mazeGame.moveDown();
        break;
    }
  }

  ngAfterViewInit() {
    this.GenerateNew();
  }

  GenerateNew() {
    this.mazeSolver.stop();
    this.mazeGame.createNew(this.selectedSize);
  }

  SolveMaze() {
    this.mazeSolver.stop();
    this.mazeSolver.solve(this.mazeGame);
  }

  selectedSizeChanged(val) {
    this.selectedSize = Number.parseInt(val);
  }
}
