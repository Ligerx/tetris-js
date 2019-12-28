class Board {
    grid;
    piece;

    // Reset the board when we start a new game
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Generate a matrix filled with zeros
    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    valid(piece) {
        return piece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;
                return (
                    this.isEmpty(value) || (this.isInsideWalls(x) && this.isAboveFloor(y))
                );
            });
        });
    }

    isEmpty(value) {
        return true;
    }

    isInsideWalls(x) {
        return true;
    }

    isAboveFloor(y) {
        return true;
    }
}
