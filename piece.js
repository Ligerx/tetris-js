class Piece {
    x; // mutate directly to move
    y; // mutate directly to move
    color;
    shape;

    constructor(piece) {
        // Optional constructor param to create a copy of an existing piece
        // Probably use clone() to be explicit when creating a copied class instance
        if (piece !== null) {
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

    // draw() {
    //     this.ctx.fillStyle = this.color;
    //     this.shape.forEach((row, y) => {
    //         row.forEach((value, x) => {
    //             if (value > 0) {
    //                 this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
    //             }
    //         });
    //     });
    // }

    // move(piece) {
    //     this.x = piece.x;
    //     this.y = piece.y;
    //     this.shape = piece.shape;
    // }

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
    }
}

function _randomizeTetronimoType(numTypes) {
    return Math.floor(Math.random() * numTypes);
}
