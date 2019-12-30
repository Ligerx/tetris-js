const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Calculate the size of the canvas from constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale the blocks so they have a size of 1
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// Repeat for the next block
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d'); // Size canvas for four blocks.
ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board();
let piece;
let nextPiece;

const time = { start: 0, elapsed: 0, level: LEVEL[0]};

let isPlaying = false;
let requestId;

// object that will be proxied
const accountObj = {
    score: 0,
    lines: 0,
    level: 0
};

// proxied object. use this.
const account = new Proxy(accountObj, {
    set(target, key, value) {
        target[key] = value;
        updateAccountUI(key, value);
        return true;
    }
});

function updateAccountUI(key, value) {
    let element = document.getElementById(key);
    if (element != null) {
        element.textContent = value;
    }
}

// Generate a new piece to check for a valid position before replacing the existing piece
const actions = {
    [ACTIONS.LEFT]: piece => piece.clone().moveLeft(),
    [ACTIONS.RIGHT]: piece => piece.clone().moveRight(),
    [ACTIONS.DROP]: piece => {
        account.score += POINTS.SOFT_DROP;
        return piece.clone().drop()
    },
    [ACTIONS.ROTATE]: piece => piece.clone().rotate(),
    [ACTIONS.HARD_DROP]: (piece, board) => {
        let nextValidPiece = piece.clone();
        let nextTempPiece = piece.clone().drop();

        while(validPosition(nextTempPiece, board)) {
            account.score += POINTS.HARD_DROP;
            nextValidPiece = nextTempPiece;
            nextTempPiece = nextTempPiece.clone().drop();
        };

        return nextValidPiece;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function play() {
    isPlaying = true;

    board.reset();
    piece = new Piece();
    nextPiece = new Piece();
    resetAccount();

    setupEventListener();

    animate();
}

function resetAccount() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;
}

function setupEventListener() {
    document.removeEventListener('keydown', handleKeyDown); // cleanup
    document.addEventListener('keydown', handleKeyDown);
}

function animate(now = 0) {
    draw(piece, board, ctx);
    nextGameTick(now);

    if (isPlaying) {
        requestId = window.requestAnimationFrame(animate);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function handleKeyDown(event) {
    const actionCode = KEY_ACTION_DICTIONARY[event.keyCode];

    if (actionCode != null) {
        event.preventDefault();

        // Passing in board to all functions even if they don't need it to simplify code
        const newPiece = actions[actionCode](piece, board);

        if (validPosition(newPiece, board)) {
            piece = newPiece;
        }
    }
}

function draw(piece, board, ctx) {
    // Clear board before drawing new state
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctxNext.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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

    // Draw next piece
    nextPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 0) return;
            ctxNext.fillStyle = COLORS[value];
            ctxNext.fillRect(x, y, 1, 1);
        });
    });
}

function nextGameTick(now) {
    time.elapsed = now - time.start;

    if (time.elapsed > time.level) {
        time.start = now;

        const droppedPiece = piece.clone().drop();


        if (validPosition(droppedPiece, board)) {
            piece = droppedPiece;
            account.score += POINTS.SOFT_DROP;
        }
        else if (piece.y <= 1) {
            gameOver();
        }
        else {
            board.commitPiece(piece);
            board.clearLines(numCleared => {
                const points = linesClearedToPoints(numCleared);
                account.score += points * (account.level + 1);
                account.lines += numCleared;
            });
            piece = nextPiece;
            nextPiece = new Piece();

            if (account.lines >= LINES_PER_LEVEL * (account.level + 1)) {
                account.level += 1;
                time.level = LEVEL[account.level];
            }
        }
    }
}

function gameOver() {
    isPlaying = false;
    window.cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 3, 10, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.2, 4);
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

function linesClearedToPoints(lines) {
    return lines === 1 ? POINTS.SINGLE :
        lines === 2 ? POINTS.DOUBLE :  
        lines === 3 ? POINTS.TRIPLE :     
        lines === 4 ? POINTS.TETRIS : 
        0;
}
