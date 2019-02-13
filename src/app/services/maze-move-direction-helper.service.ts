import { MoveDirection } from '../maze-game/maze-game/models/move-direction';

export class MazeMoveDirectionHelperService {
    static opposite(direction: MoveDirection) {
        switch (direction) {
            case MoveDirection.Right:
                return MoveDirection.Left;
            case MoveDirection.Left:
                return MoveDirection.Right;
            case MoveDirection.Up:
                return MoveDirection.Down;
            case MoveDirection.Down:
                return MoveDirection.Up;
            case MoveDirection.None:
                return MoveDirection.None;
        }
    }

    static get(): MoveDirection[] {
        return [
            MoveDirection.Up,
            MoveDirection.Left,
            MoveDirection.Right,
            MoveDirection.Down,
        ];
    }
}
