class Board {
    grid; // arranged by [y][x]

    constructor() {
        this.reset();
    }

    // set/reset the grid to a matrix filled with zeros
    reset() {
        this.grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    commitPiece(piece) {
        // assuming that piece is in a valid position, not error checking
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 0) return;
                this.grid[piece.y + y][piece.x + x] = value;
            });
        });
    }
}
