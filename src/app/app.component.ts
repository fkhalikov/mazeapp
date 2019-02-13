import { Component, AfterViewInit } from '@angular/core';
import { MazeApp } from './maze-game/maze-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  
  ngAfterViewInit(): void {
    const mazeApp = new MazeApp();
  }

  title = 'maze-app';

  constructor() {
    
  }
}
