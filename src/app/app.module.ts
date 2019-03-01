import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MazeGame } from './maze-game/maze-game/maze-game.component';
import { CloneService } from './services/clone.service';
import { MazeApp } from './maze-game/maze-app/maze-app.component';
import { MazeGameSolver } from './maze-game/maze-game-solver/maze-game-solver';
import { MazePlayerComponent } from './maze-game/maze-player/maze-player.component';
import { RandomService } from './services/random.service';

@NgModule({
  declarations: [
    AppComponent
    , MazeApp
    , MazeGame
    , MazePlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CloneService, MazeGameSolver, RandomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
