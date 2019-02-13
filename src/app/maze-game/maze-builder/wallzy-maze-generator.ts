import { MazeBuilderOptions } from 'src/app/maze-game/maze-builder/maze-builder-options';
import { Maze } from 'src/app/maze-game/maze';
import { MazePoint } from 'src/app/maze-game/maze-game/models/maze-point';
import { IMazeGenerator } from 'src/app/maze-game/maze-builder/maze-generator.interface';


declare var $: any;
declare var Math: any;

export class WallzyMazeGenerator implements IMazeGenerator {

    constructor(private options: MazeBuilderOptions) {

    }

    create(): Maze {
        let maze = new Maze(this.options.size
            , this.options.cellsizepx
            , this.options.containerDivId);

        this.defineEntryAndExitPoints(maze);
        this.defineMazeWalls(maze);

        return maze;
    }

    defineEntryAndExitPoints(maze: Maze) {
        maze.entrance = new MazePoint(Math.floor(Math.random() * this.options.size), 0);
        maze.exit = new MazePoint(Math.floor(Math.random() * this.options.size), this.options.size);
    }

    defineMazeWalls(maze: Maze) {

        const size = this.options.size;

        maze.mazeHorizontalWalls = [];
        maze.mazeVerticalwalls = [];

        for (let i = 0; i < size + 1; i++) {

            const line = [];

            maze.mazeHorizontalWalls.push(line);

            for (let j = 0; j < size; j++) {

                let putAWall = this.randomBoolVal();

                if (i === 0 || i === size) {
                    putAWall = 1;
                }

                if (maze.entrance.y === i && j === maze.entrance.x) {
                    putAWall = 0;
                }

                if (maze.exit.y === i && j === maze.exit.x) {
                    putAWall = 0;
                }

                line.push(putAWall);
            }
        }

        for (let i = 0; i < size; i++) {
            const line = [];
            maze.mazeVerticalwalls.push(line);
            for (let j = 0; j < size + 1; j++) {

                let putAWall = this.randomBoolVal();

                if (j === 0 || j === size) {
                    putAWall = 1;
                }

                line.push(putAWall);
            }
        }
    }

    randomBoolVal() {
        return Math.round((Math.random() * 50)) % 2;
    }
}