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

    rotate(piece) {
        // Deep clone the piece to copy it's 2d shape array correctly
        let newPiece = JSON.parse(JSON.stringify(piece));

        // Transpose matrix
        for (let y = 0; y < newPiece.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [newPiece.shape[x][y], newPiece.shape[y][x]] = [newPiece.shape[y][x], newPiece.shape[x][y]];
            }
        }

        // Reverse the order of the columns
        newPiece.shape.forEach(row => row.reverse());
        return newPiece;
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);

        if (this.valid(p)) {
            this.piece.move(p);
        }
        else {
            // this.freeze();
            // this.clearLines();
            // ...
        }
    }

    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                this.ctx.fillStyle = COLORS[value];
                this.ctx.fillRect(x, y, 1, 1);
            });
        });
    }
}
