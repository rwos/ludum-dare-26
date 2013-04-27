var levels = [
    // LEVEL 1
    {
        start: [0,1],
        dir: Math.PI/2,
        map: [
            "       #     #",
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
        start: [0,4],
        dir: Math.PI/2,
        map: [
            "             #",
            "             X",
            "             X",
            "             #",
            "#  #  #  #  ##",
            "             #",
            "             #",
        ].reverse(),
        canvas_pos: [14, 0],
        blobs: [
            {pos: [1.5, 5.7], dir: 1, color: "blue", health: 1},
        ],
    },
    // LEVEL 3
    {
        start: [0,6],
        dir: Math.PI/2,
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
        canvas_pos: [28, 0],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 4
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "                                     #",
            "                                     #",
            "#  #####  #    #    #    #    #  #  ##",
            "                                     #",
            "                                     X",
            "                                     X",
            "                                     #",
            "#  #####  #    #    #    #    #  #  ##",
            "                                     #",
            "                                     #",
            "                                     #",
            "                                     #",
            "#  #####  #    #    #    #    #  #  ##",
            "X                                    #",
            "X                                    #",
            "#  #####  #    #    #    #    #  #  ##",
        ].reverse(),
        canvas_pos: [42, 0],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 5
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "             #",
            "             X",
            "             X",
            "             #",
            "#    #    #  #",
            "             #",
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "X            #",
            "X            #",
            "#    #    #  #",
        ].reverse(),
        canvas_pos: [28, 10],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 6
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "             #",
            "             X",
            "             X",
            "             #",
            "#    #    #  #",
            "             #",
            "             #",
            "             #",
            "             #",
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "X            #",
            "X            #",
            "#    #    #  #",
        ].reverse(),
        canvas_pos: [14, 7],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 7
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "             #",
            "             X",
            "             X",
            "             #",
            "#    #    #  #",
            "             #",
            "             #",
            "#    #    #  #",
            "X            #",
            "X            #",
            "#    #    #  #",
        ].reverse(),
        canvas_pos: [0, 4],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 8
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "             #",
            "             X",
            "             X",
            "             #",
            "#    #    #  #",
            "             #",
            "             #",
            "             #",
            "             #",
            "#    #    #  #",
            "X            #",
            "X            #",
            "#    #    #  #",
        ].reverse(),
        canvas_pos: [0, 19],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 9
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "                                        #",
            "                                        #",
            "                                        #",
            "#       #    #  #    #  #    #  #    #  #",
            "                                        #",
            "                                        #",
            "                                        #",
            "                                        #",
            "                                        X",
        ].reverse(),
        canvas_pos: [14, 27],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 10
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "                                     #",
            "                                     #",
            "                                     #",
            "#       #    #    #  #    #  #    #  #",
            "                                     #",
            "                                     #",
            "                                     #",
            "                                     #",
            "                                     #",
            "                                     #",
            "                                     X",
        ].reverse(),
        canvas_pos: [42, 16],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 11
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "                        #",
            "                        #",
            "                        #",
            "#            #  #    #  #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        #",
            "                        X",
        ].reverse(),
        canvas_pos: [55, 27],
        blobs: [
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 12
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "                                                      #",
            "                                                      #",
            "                                                      #",
            "#                    #  #    #             #  #    #  #",
            "                                                      #",
            "                                                      #",
            "                                                      #",
            "                                                      #",
            "                                                      #",
            "                                                      #",
            "                                                      #",
            "                                                      #",
        ].reverse(),
        canvas_pos: [0,36],
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


