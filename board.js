class Board {
    grid;

    // Reset the board when we start a new game
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Geberate a matrix filled with zeros
    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }
}