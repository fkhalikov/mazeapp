import { IMazeGameObject } from './maze-game-object';
import { MazePoint } from './maze-point';

export class MazePlayer implements IMazeGameObject {

    private definition: string;

    public id: string;
    public position: MazePoint;

    constructor(public name: string, public size: number) {
        this.id = name;
        this.definition = `<div id="${this.id}" class="maze-player" style="width:${size}px;height:${size}px;">`;
    }

    getDefinition(): string {
        return this.definition;
    }
}