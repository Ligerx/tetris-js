class Board {
    grid;
    piece;

    // Reset the board when we start a new game
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Generate a matrix filled with zeros
    // arranged by [y][x]
    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    valid(piece) {
        return piece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;

                return (
                    value === 0 || 
                    (this.isInsideWalls(x) && this.isAboveFloor(y) && this.isNotOccupied(x, y))
                );
            });
        });
    }

    isNotOccupied(x, y) {
        return this.grid[y][x] === 0;
    }

    isInsideWalls(x) {
        return x >= 0 && x < COLS;
    }

    isAboveFloor(y) {
        return y < ROWS;
    }
}
