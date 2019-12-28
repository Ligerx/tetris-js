const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate the size of the canvas from constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale the blocks so they have a size of 1
ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

function play() {
    const moves = {
        [KEY.LEFT]: piece => ({ ...piece, x: piece.x - 1 }),
        [KEY.RIGHT]: piece => ({ ...piece, x: piece.x + 1 }),
        [KEY.DOWN]: piece => ({ ...piece, y: piece.y + 1 })
    }
    
    const board = new Board();
    board.reset();

    let piece = new Piece(ctx);
    piece.draw();
    board.piece = piece;

    document.addEventListener('keydown', event => {
        if (moves[event.keyCode]) {
            event.preventDefault();
            let piece = moves[event.keyCode](board.piece);

            if (board.valid(piece)) {
                board.piece.move(piece);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                board.piece.draw();
            }
        }
    });
}
