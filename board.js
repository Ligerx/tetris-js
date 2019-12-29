class Board {
    grid; // arranged by [y][x]

    constructor() {
        this.reset();
    }

    // set/reset the grid to a matrix filled with zeros
    reset() {
        this.grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));
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
