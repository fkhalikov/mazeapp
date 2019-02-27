import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MazePoint } from '../maze-game/models/maze-point';

@Component({
  selector: "maze-player",
  templateUrl: "maze-player.template.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazePlayerComponent {
  @Input() color: string;
  @Input() cellSize: number;

  x: number = 0;
  y: number = 0;
  private position: MazePoint;

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  public SetPosition(mazePoint: MazePoint) {
    this.x = mazePoint.x;
    this.y = mazePoint.y;
    this.position = mazePoint;

    this.changeDetector.detectChanges();
  }

  public SetY(y:number) {
    this.y = y;
    this.position.y = y;

    this.changeDetector.detectChanges();
  }

  public SetX(x:number) {
    this.x = x;
    this.position.x = x;

    this.changeDetector.detectChanges();
  }

  public getPosition() {
    return this.position;
  }

}
