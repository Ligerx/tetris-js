const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate the size of the canvas from constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale the blocks so they have a size of 1
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board();

const keyActionDictionary = {
    [KEY.LEFT]: ACTIONS.LEFT,
    [KEY.RIGHT]: ACTIONS.RIGHT,
    [KEY.DOWN]: ACTIONS.DROP,
    [KEY.UP]: ACTIONS.ROTATE,
    [KEY.SPACE]: ACTIONS.HARD_DROP
}
const actions = {
    [ACTIONS.LEFT]: piece => piece.clone().moveLeft(),
    [ACTIONS.RIGHT]: piece => piece.clone().moveRight(),
    [ACTIONS.DROP]: piece.clone().drop(),
    [ACTIONS.ROTATE]: piece => piece.clone().rotate(),
    [ACTIONS.HARD_DROP]: piece => ({ ...piece, y: piece.y + 1 }) // TODO UPDATE
}

function validPosition(piece, board) {
    return piece.shape.every((row, dy) => {
        return row.every((value, dx) => {
            let x = piece.x + dx;
            let y = piece.y + dy;

            return (
                value === 0 || 
                (_isInsideWalls(x) && _isAboveFloor(y) && _isNotOccupied(board.grid[y][x]))
            );
        });
    });
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

const time = { start: 0, elapsed: 0, level: 1000};
let requestId;

function animate(now = 0) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
        time.start = now;
        board.drop();
    }
    // TODO: Levels and points

    // Clear board before drawing new state.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.draw();

    requestId = requestAnimationFrame(animate);
}

function play() {
    board.reset();

    let piece = new Piece(ctx);
    piece.draw();
    board.piece = piece;

    animate();

    addEventListener();
}
