class Board {
    grid; // arranged by [y][x]

    constructor() {
        this.reset();
    }

    // set/reset the grid to a matrix filled with zeros
    reset() {
        this.grid = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }
}
