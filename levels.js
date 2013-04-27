var levels = [
    // LEVEL 1
    {
        start: [0,1],
        dir: Math.PI/2,
        map: [
            "   #         #",
            "             X",
            "             X",
            "             #",
        ].reverse(),
        canvas_pos: [0, 0],
        blobs: [
        ],
    },
    // LEVEL 2
    {
        start: [1,1],
        dir: 1,
        map: [
            "             #",
            "             X",
            "             X",
            "             #",
            "#  #  #  #  ##",
            "             #",
            "             #",
        ].reverse(),
        canvas_pos: [12, 0],
        blobs: [
            {pos: [1.5, 5.7], dir: 1, color: "blue", health: 1},
        ],
    },
    // LEVEL 3
    {
        start: [1,4],
        dir: 1,
        map: [
            "             #",
            "             #",
            "#  #  #  #  ##",
            "             #",
            "             X",
            "             X",
            "             #",
            "#  #  #  #  ##",
            "             #",
            "             #",
        ].reverse(),
        canvas_pos: [24, 0],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
];


//////////////////// LEVEL CANVAS INIT

for (var i = 0; i < levels.length; i++) {
    levels[i].canvas = [];
    for (var y = 0; y < levels[i].map.length; y++) {
        levels[i].canvas[y] = [];
        for (var x = 0; x < levels[i].map[y].length; x++) {
            levels[i].canvas[y][x] = [255, 255, 255];
        }
    }
}

//////////////////// LEVEL SELECTION

var LEVEL;
var MAP;
var BLOBS;

var CURRENT_LEVEL = 0;

function switch_to_level(n) {
    CURRENT_LEVEL = n;
    LEVEL = levels[CURRENT_LEVEL];
    MAP   = LEVEL.map;
    BLOBS = LEVEL.blobs;

    LEVEL_WON = false;
    LEVEL_LOST = false;
    player = {
        pos: LEVEL.start.slice(),
        dir: LEVEL.dir,
        health: PLAYER_HEALTH,
        shooting: false,
    };
}

switch_to_level(CURRENT_LEVEL);


