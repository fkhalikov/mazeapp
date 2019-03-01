import * as Hammer from "hammerjs";
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MazeGame } from "./maze-game/maze-game/maze-game.component";
import { CloneService } from "./services/clone.service";
import { MazeApp } from "./maze-game/maze-app/maze-app.component";
import { MazeGameSolver } from "./maze-game/maze-game-solver/maze-game-solver";
import { MazePlayerComponent } from "./maze-game/maze-player/maze-player.component";
import { RandomService } from "./services/random.service";

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [AppComponent, MazeApp, MazeGame, MazePlayerComponent],
  imports: [BrowserModule],
  providers: [
    CloneService,
    MazeGameSolver,
    RandomService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
