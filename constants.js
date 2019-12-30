const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const COLORS = [
    'white', // empty, none
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];
Object.freeze(COLORS);

const SHAPES = [
    [],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];
Object.freeze(SHAPES);

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38,
    SPACE: 32
}
Object.freeze(KEY);

const ACTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    ROTATE: 'ROTATE',
    DROP: 'DROP',
    HARD_DROP: 'HARD_DROP',
};
Object.freeze(ACTIONS);

const KEY_ACTION_DICTIONARY = {
    [KEY.LEFT]: ACTIONS.LEFT,
    [KEY.RIGHT]: ACTIONS.RIGHT,
    [KEY.DOWN]: ACTIONS.DROP,
    [KEY.UP]: ACTIONS.ROTATE,
    [KEY.SPACE]: ACTIONS.HARD_DROP
};
Object.freeze(KEY_ACTION_DICTIONARY);

const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2
}
Object.freeze(POINTS);

const LINES_PER_LEVEL = 10;

const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,
    // 29+ is 20ms
  }
  Object.freeze(LEVEL);
