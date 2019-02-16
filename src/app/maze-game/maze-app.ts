﻿import { CloneService } from "../services/clone.service";
import { MazeGame } from "./maze-game";
import { MazeBuilderOptions } from "./maze-builder/maze-builder-options";
import { MazeUIBuilder } from "./maze-builder/maze-ui-builder";
import { IMazeGenerator } from "./maze-builder/maze-generator.interface";
import { ClassicMazeGenerator } from "./maze-builder/classic-maze-generator";
import { MazeGameSolver } from "./maze-game-solver/maze-game-solver";

declare var $: any;

export class MazeApp {
  mazeGame: MazeGame = null;

  cloneService: CloneService = new CloneService();

  constructor() {
    $(document).ready(() => {
      this.createNewMaze(this.getSelectedSize());

      $("#generatenew").click(() => {
        this.createNewMaze(this.getSelectedSize());
      });

      $("#solvethemaze").click(() => {
        this.solve();
      });

      $("#breakdown").click(() => {
        if (this.checkBreakTroughCountAndDecrement()) {
          this.mazeGame.moveDown(this.mazeGame.player, true);
        }
      });

      $("#breakleft").click(() => {
        if (this.checkBreakTroughCountAndDecrement()) {
          this.mazeGame.moveLeft(this.mazeGame.player, true);
        }
      });

      $("#breakright").click(() => {
        if (this.checkBreakTroughCountAndDecrement()) {
          this.mazeGame.moveRight(this.mazeGame.player, true);
        }
      });

      $("#breakup").click(() => {
        if (this.checkBreakTroughCountAndDecrement()) {
          this.mazeGame.moveUp(this.mazeGame.player, true);
        }
      });

      $(document).keydown(e => {
        switch (e.which) {
          case 37: // left
            this.mazeGame.moveLeft(this.mazeGame.player);
            break;

          case 38: // up
            this.mazeGame.moveUp(this.mazeGame.player);
            break;

          case 39: // right
            this.mazeGame.moveRight(this.mazeGame.player);
            break;

          case 40: // down
            this.mazeGame.moveDown(this.mazeGame.player);
            break;

          case 87: // Second player up W
            this.mazeGame.moveUp(this.mazeGame.player2);
            break;

          case 65: // Second player left A
            this.mazeGame.moveLeft(this.mazeGame.player2);
            break;

          case 68: // Second player right D
            this.mazeGame.moveRight(this.mazeGame.player2);
            break;

          case 83: // Second player left s
            this.mazeGame.moveDown(this.mazeGame.player2);
            break;

          default:
            return; // exit this handler for other keys
        }
        
        e.preventDefault(); // prevent the default action (scroll / move caret)
      });
    });
  }

  getSelectedSize(): number {
    return this.parseNumber($("#selectsize").val());
  }

  parseNumber(str: string): number {
    return Number.parseInt(str);
  }

  checkBreakTroughCountAndDecrement(): boolean {
    let breakThroughCount = this.parseNumber($("#breaksavailable").text());

    if (breakThroughCount > 0)
      $("#breaksavailable").text(breakThroughCount - 1);

    return breakThroughCount > 0;
  }

  createNewMaze(size: number) {
    $("#breaksavailable").text(3);

    const mazeOptions = new MazeBuilderOptions(size, "mazecontainer", 20);

    const mazeUIBuilder: MazeUIBuilder = new MazeUIBuilder(mazeOptions);
    const mazeGenerator: IMazeGenerator = new ClassicMazeGenerator(mazeOptions);

    const maze = mazeGenerator.create();
    mazeUIBuilder.build(maze);

    this.mazeGame = new MazeGame(maze);
    this.mazeGame.initPlayer("player1");
  }

  solve() {
    const mazeSolver = new MazeGameSolver(this.mazeGame, this.cloneService);

    mazeSolver.solve();
  }
}
