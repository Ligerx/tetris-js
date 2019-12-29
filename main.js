const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate the size of the canvas from constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale the blocks so they have a size of 1
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board();

const moves = {
    [KEY.LEFT]: piece => ({ ...piece, x: piece.x - 1 }),
    [KEY.RIGHT]: piece => ({ ...piece, x: piece.x + 1 }),
    [KEY.DOWN]: piece => ({ ...piece, y: piece.y + 1 }),
    [KEY.UP]: piece => board.rotate(piece), // relies on board being initialized beforehand
    [KEY.SPACE]: piece => ({ ...piece, y: piece.y + 1 })
}

function addEventListener() {
    document.addEventListener('keydown', event => {
        if (moves[event.keyCode]) {
            event.preventDefault();
            let piece = moves[event.keyCode](board.piece);
    
            if (event.keyCode === KEY.SPACE) {
                // Hard drop
                while (board.valid(piece)) {
                    board.piece.move(piece);
                    piece = moves[KEY.DOWN](board.piece);
                }
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                board.piece.draw();
            }
            else if (board.valid(piece)) {
                board.piece.move(piece);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                board.piece.draw();
            }
        }
    });
}

function animate() {
    // Clear board before drawing new state.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.draw();

    requestAnimationFrame(animate);
}

function play() {
    board.reset();

    let piece = new Piece(ctx);
    piece.draw();
    board.piece = piece;

    // animate();

    addEventListener();
}
