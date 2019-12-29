class Board {
    grid; // arranged by [y][x]

    constructor() {
        this.reset();
    }

    // set/reset the grid to a matrix filled with zeros
    reset() {
        this.grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }

    valid(piece) {
        return piece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;

                return (
                    value === 0 || 
                    (_isInsideWalls(x) && _isAboveFloor(y) && _isNotOccupied(this.grid[y][x]))
                );
            });
        });
    }

    // drop() {
    //     let p = moves[KEY.DOWN](this.piece);

    //     if (this.valid(p)) {
    //         this.piece.move(p);
    //     }
    //     else {
    //         // this.freeze();
    //         // this.clearLines();
    //         // ...
    //     }
    // }

    // draw() {
    //     this.grid.forEach((row, y) => {
    //         row.forEach((value, x) => {
    //             this.ctx.fillStyle = COLORS[value];
    //             this.ctx.fillRect(x, y, 1, 1);
    //         });
    //     });
    // }
}

function _isNotOccupied(cellValue) {
    return cellValue === 0;
}

function _isInsideWalls(x) {
    return x >= 0 && x < COLS;
}

function _isAboveFloor(y) {
    return y < ROWS;
}