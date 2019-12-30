const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate the size of the canvas from constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale the blocks so they have a size of 1
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board();
let piece;

// Generate a new piece to check for a valid position before replacing the existing piece
const actions = {
    [ACTIONS.LEFT]: piece => piece.clone().moveLeft(),
    [ACTIONS.RIGHT]: piece => piece.clone().moveRight(),
    [ACTIONS.DROP]: piece => piece.clone().drop(),
    [ACTIONS.ROTATE]: piece => piece.clone().rotate(),
    [ACTIONS.HARD_DROP]: (piece, board) => {
        const newPiece = piece.clone();
        while(validPosition(newPiece, board)) {
            newPiece.drop();
        }
        return newPiece;
    }
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

function _isAboveFloor(y) {
    return y < ROWS;
}

function _isInsideWalls(x) {
    return x >= 0 && x < COLS;
}

function _isNotOccupied(cellValue) {
    return cellValue === 0;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function addEventListener() {
    document.addEventListener('keydown', event => {
        const actionCode = KEY_ACTION_DICTIONARY[event.keyCode];

        if (actionCode != null) {
            event.preventDefault();

            // Passing in board to all functions even if they don't need it to simplify code
            const newPiece = actions[actionCode](piece, board);

            if (validPosition(newPiece, board)) {
                piece = newPiece;
            }
        }
    });
}

function draw(piece, board, ctx) {
    // Clear board before drawing new state
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw board
    board.grid.forEach((row, y) => {
        row.forEach((value, x) => {
            ctx.fillStyle = COLORS[value];
            ctx.fillRect(x, y, 1, 1);
        });
    });

    // Draw piece
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 0) return;
            ctx.fillStyle = COLORS[value];
            ctx.fillRect(piece.x + x, piece.y + y, 1, 1);
        });
    });
}

const time = { start: 0, elapsed: 0, level: 1000};

function nextGameTick(now) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
        time.start = now;

        const droppedPiece = piece.clone().drop();

        if (validPosition(droppedPiece, board)) {
            piece = droppedPiece;
        }
        else {
            board.commitPiece(piece);
            board.clearLines();
            piece = new Piece();
            // scoring
        }
    }
}

let requestId;

function animate(now = 0) {
    draw(piece, board, ctx);
    nextGameTick(now);

    requestId = requestAnimationFrame(animate);
}

function play() {
    board.reset();
    piece = new Piece();
    addEventListener();

    animate();
}
