import { CloneService } from "../../services/clone.service";
import { MazeGame } from "../maze-game/maze-game.component";
import { Component, AfterViewInit, ViewChild } from '@angular/core';


@Component({
  selector: 'maze-app'
  , templateUrl: 'maze-app.component.html'
})
export class MazeApp implements AfterViewInit {
  @ViewChild(MazeGame) mazeGame: MazeGame;

  selectedSize: number = 10;

  constructor(private cloneService: CloneService
    ) {
  
  }

  ngAfterViewInit() {
  
      this.GenerateNew();


      
        // switch (e.which) {
        //   case 37: // left
        //     this.mazeGame.moveLeft(this.mazeGame.player);
        //     break;

        //   case 38: // up
        //     this.mazeGame.moveUp(this.mazeGame.player);
        //     break;

        //   case 39: // right
        //     this.mazeGame.moveRight(this.mazeGame.player);
        //     break;

        //   case 40: // down
        //     this.mazeGame.moveDown(this.mazeGame.player);
        //     break;

   
   
  }

  GenerateNew() {
    this.mazeGame.createNew(this.selectedSize);
  }

  SolveMaze() {
    this.mazeGame.solve();
  }

  selectedSizeChanged(val) {
    this.selectedSize = val;
  }
}
