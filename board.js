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

    clearLines(callback) {
        let numCleared = 0;

        this.grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
                numCleared += 1;
            }
        });

        if (typeof callback === 'function') {
            callback(numCleared);
        };
    }
}
