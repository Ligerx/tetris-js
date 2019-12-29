class Piece {
    x;
    y;
    color;
    shape;

    constructor(piece) {
        // Optional constructor param to create a copy of an existing piece
        // Probably use clone() to be explicit when creating a copied class instance
        if (piece != null) {
            this.x = piece.x;
            this.y = piece.y;
            this.color = piece.color;
            this.shape = piece.shape;
        }
        else {
            const typeId = _randomizeTetronimoType(COLORS.length);

            this.color = COLORS[typeId];
            this.shape = SHAPES[typeId];
            this.x = 3;
            this.y = 0;
        }
    }

    clone() {
        return new Piece(this);
    }

    // NOTE: these movement functions return this instance to make chaining more convenient
    moveLeft() {
        this.x = this.x - 1;
        return this;
    }

    moveRight() {
        this.x = this.x + 1;
        return this;
    }

    rotate() {
        // Deep clone the shape so we can mutate the 2d array
        let newShape = JSON.parse(JSON.stringify(piece));

        // Transpose matrix
        for (let y = 0; y < newShape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [newShape[x][y], newShape[y][x]] = [newShape[y][x], newShape[x][y]];
            }
        }

        // Reverse the order of the columns
        newShape.forEach(row => row.reverse());

        this.shape = newShape;
        return this;
    }

    drop() {
        this.y = this.y + 1;
        return this;
    }
    // hard dropping is equivalent to multiple normal drops
}

function _randomizeTetronimoType(numTypes) {
    // hacky fix
    // the 0th index of the COLORS and SHAPES arrays are empty, so we need to skip it 
    return Math.floor(Math.random() * (numTypes - 1)) + 1;
}
