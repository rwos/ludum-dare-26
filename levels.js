var levels = [
    // LEVEL 1
    {
        start: [0,1],
        dir: Math.PI/2,
        map: [
            "       #     #",
            "       #     X",
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
            {pos: [10.4, 0.5], dir: 0, color: "blue", health: 1},
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
            {pos: [11.5, 8.5], dir: -Math.PI/2, color: "blue", health: 1},
            {pos: [11.5, 0.5], dir: -Math.PI/2, color: "green", health: 1},
        ],
    },
    // LEVEL 4
    {
        start: [0,12],
        dir: Math.PI/2,
        map: [
            "                    #                 ",
            "                    #                 ",
            "########  ##  ##    #    #    #  #  ##",
            "               #    #                 ",
            "               #                      ",
            "               #                      ",
            "               #                      ",
            "###############################  #  ##",
            "                   #                  ",
            "                   #       #        ##",
            "               #   #                  ",
            "               #   #                  ",
            "########  #    #   ###   #    ########",
            "X              #                     #",
            "X              #                     #",
            "#  #####  #    #    #    #    #  #  ##",
        ].reverse(),
        canvas_pos: [42, 0],
        blobs: [
            {pos: [0.8, 14.6], dir: 1.4, color: "yellow", health: 1},
            {pos: [26.6, 9.2], dir: 4.5, color: "green", health: 1},
            {pos: [35.7, 14.1], dir: 3.7, color: "blue", health: 1},
            {pos: [21.5, 1.1], dir: 6.8, color: "yellow", health: 1},
            {pos: [5.1, 1.5], dir: 7.8, color: "blue", health: 1},
        ],
    },
    // LEVEL 5
    {
        start: [12,12],
        dir: -Math.PI/2,
        map: [
            "              ",
            "              ",
            "              ",
            "#    #        ",
            "              ",
            "              ",
            "              ",
            "              ",
            "#  ###########",
            "   ######     ",
            "        #     ",
            "        #     ",
            "   #    #     ",
            "######  ###  #",
            "X             ",
            "X             ",
            "######    #  #",
        ].reverse(),
        canvas_pos: [28, 10],
        blobs: [
            {pos: [0.1, 9.0], dir: -6, color: "blue", health: 1},
            {pos: [8.8, 0.4], dir: 1, color: "green", health: 1},
            {pos: [9.4, 6.4], dir: 1.4, color: "yellow", health: 1},
        ],
    },
    // LEVEL 6
    {
        start: [12.9,1.5],
        dir: -Math.PI/2,
        map: [
            "#    #       #",
            "X    #       #",
            "X    #       #",
            "###  #    #  #",
            "#    #       #",
            "#    #       #",
            "   #######   #",
            "             #",
            "             #",
            "     #    #  #",
            "     #       #",
            "    ##       #",
            "    ##       #",
            "    ##       #",
            "    ##       #",
            "    ##       #",
            "#  ###    #  #",
            "#  ###        ",
            "#  ###        ",
            "#  ###    #  #",
        ].reverse(),
        canvas_pos: [14, 7],
        blobs: [
            {pos: [1.5, 0.9], dir: 3, color: "yellow", health: 1},
            {pos: [6.1, 0.4], dir: 0.13, color: "yellow", health: 1},
            {pos: [6.0, 17.6], dir: -0.12, color: "yellow", health: 1},
        ],
    },
    // LEVEL 7
    {
        start: [12.8,12.7],
        dir: 4,
        map: [
            "#             ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "              ",
            "#            #",
            "   ###########",
            "          #   ",
            "          #   ",
            "########  #   ",
            "              ",
            "#XX           ",
        ].reverse(),
        canvas_pos: [0, 4],
        blobs: [
            {pos: [2.3, 6.05], dir: 0.85, color: "blue", health: 1},
            {pos: [3.3, 6.05], dir: 0.85, color: "green", health: 1},
            {pos: [4.3, 6.05], dir: 0.85, color: "yellow", health: 1},
            {pos: [12.4, 2.6], dir: -2.6, color: "green", health: 1},
            {pos: [11.4, 2.6], dir: -2.6, color: "green", health: 1},
        ],
    },
    // LEVEL 8
    {
        start: [2,15],
        dir: Math.PI,
        map: [
            "#   #        #",
            "#   #        #",
            "#   #        #",
            "#   #  #######",
            "#   #        #",
            "#   #        #",
            "#   #        #",
            "#   #        #",
            "#   ##   #   #",
            "#   #    #   #",
            "#   #    #   #",
            "#   #    #   #",
            "#   ##   #   #",
            "#   #    #   #",
            "#   ##   #   #",
            "#        #   X",
            "#        #   X",
        ].reverse(),
        canvas_pos: [0, 19],
        blobs: [
            {pos: [7.9, 0], dir: -1.5, color: "blue", health: 1},
            {pos: [0, 7.5], dir: 0, color: "green", health: 1},
            {pos: [3.2, 7.5], dir: 0, color: "green", health: 1},
            {pos: [5.7, 15.2], dir: 1.5, color: "yellow", health: 1},
            {pos: [12.2, 4], dir: 1.5, color: "yellow", health: 1},
            {pos: [12.2, 5], dir: 1.5, color: "blue", health: 1},
            {pos: [12.2, 6], dir: 1.5, color: "green", health: 1},
            {pos: [9, 4], dir: 1.5, color: "green", health: 1},
            {pos: [9, 5], dir: 1.5, color: "blue", health: 1},
            {pos: [9, 6], dir: 1.5, color: "yellow", health: 1},
        ],
    },
    // LEVEL 9
    {
        start: [0,0.5],
        dir: Math.PI/2,
        map: [
            "           #                #      # XX  ",
            "           #                #      #     ",
            "    ########   ###########  #      #     ",
            "           #   #         #  #      #     ",
            "           #             #  #  #   #     ",
            "           #             #  #  #   #     ",
            "######  ####   #         #  #  #         ",
            "               #         #     #         ",
            "               #         #     #         ",
        ].reverse(),
        canvas_pos: [14, 27],
        blobs: [
            {pos: [5.9, 7.7], dir: 1.5, color: "blue", health: 1},
            {pos: [19.5, 2.6], dir: 1.4, color: "green", health: 1},
            {pos: [26.6, 0.5], dir: 0, color: "yellow", health: 1},
            {pos: [39.4, 0.3], dir: -1.4, color: "green", health: 1},
        ],
    },
    // LEVEL 10
    {
        start: [6.8,0],
        dir: 0.5,
        map: [
            "                                      ",
            "                                      ",
            "                                      ",
            "                                      ",
            "                                      ",
            "                                      ",
            "                                   #  ",
            "                                   #  ",
            "                                   #  ",
            "                                   #  ",
            "                                   #XX",
        ].reverse(),
        canvas_pos: [42, 16],
        blobs: [
            {pos: [3.8, 8.4], dir: 1, color: "yellow", health: 1},
            {pos: [5.6, 8.4], dir: 1, color: "blue", health: 1},
            {pos: [20, 2], dir: -1, color: "green", health: 1},
            {pos: [20, 4], dir: -1, color: "yellow", health: 1},
            {pos: [20, 6], dir: -1, color: "blue", health: 1},
            {pos: [8.8, 8.4], dir: 1, color: "green", health: 1},
        ],
    },
    // LEVEL 11
    {
        start: [23.5,28.8],
        dir: 3.8,
        map: [
            "     #    #    #######   ",
            "     #    #    #######   ",
            "     #    #    ##        ",
            "     #        ##        #",
            "     #       ##   ##   ##",
            "     #      ##   ##   ###",
            "     #     ##   ##   ####",
            "     #    ##   ##   #####",
            "         ##   ##   ######",
            "        ##   ##   ###    ",
            "     ####   ##   ###     ",
            "     ###   ##   ###      ",
            "     ##   ##   ###       ",
            "    ##   ##   ###        ",
            "   ##   ##   ###         ",
            "  ##   ##   ###          ",
            "      ###  ####          ",
            "       ##   ###          ",
            "        ##   ###         ",
            "###########    ##        ",
            "          ##             ",
            "           ##            ",
            "            ###########  ",
            "   ###       ##          ",
            "    ###       ##         ",
            "     ###                 ",
            "X     ###                ",
            "X      ###       ##      ",
            "        ###       ##     ",
            "         ###       ######",
        ].reverse(),
        canvas_pos: [55, 27],
        blobs: [
            {pos: [21.6, 25.1], dir: 5.1, color: "green", health: 1},
            {pos: [1.56, 23.1], dir: 8.7, color: "blue", health: 1},
            {pos: [8.1, 25.1], dir: 7.7, color: "yellow", health: 1},
            {pos: [9, 14.0], dir: 5, color: "green", health: 1},
            {pos: [20.0, 15.6], dir: 6.7, color: "blue", health: 1},
            {pos: [20.4, 2.8], dir: 11.5, color: "yellow", health: 1},
            {pos: [1, 7], dir: 3, color: "green", health: 1},
            {pos: [3.7, 1.7], dir: 3, color: "blue", health: 1},
        ],
    },
    // LEVEL 12
    {
        start: [53,2.5],
        dir: -Math.PI/2,
        map: [
            "########   ##############                              ",
            "#######    ##############                              ",
            "######     ###########################  #############  ",
            "#####      ###########################  #############  ",
            "####   #   ###########################  #############  ",
            "###   ##   ###########################  #############  ",
            "##   ###   ###########################  #############  ",
            "#   ####   ###########################  #############  ",
            "   #####   ###########################  #############  ",
            "XXX#####   ###############              #####          ",
            "########   ###############              #####          ",
            "########   ###############  #########################  ",
            "########   ###############  #########################  ",
            "########   ###############  #########################  ",
            "########   ###############  #########################  ",
            "########   ###############  #########################  ",
            "########   ###############  #########################  ",
            "########   ##############               ###            ",
            "########   #############                ###            ",
            "                          #############################",
            "                         ##############################",
        ].reverse(),
        canvas_pos: [0,36],
        blobs: [
            {pos: [42, 2], dir: 1, color: "green", health: 1},
            {pos: [44, 10], dir: 1, color: "green", health: 1},
            {pos: [53.6, 20], dir: Math.PI, color: "blue", health: 1},
            {pos: [25, 19], dir: Math.PI, color: "blue", health: 1},
            {pos: [27, 19], dir: Math.PI, color: "yellow", health: 1},
            {pos: [29, 19], dir: Math.PI, color: "green", health: 1},
            {pos: [37, 10.5], dir: 1, color: "blue", health: 1},
            {pos: [26.5, 5], dir: 1, color: "green", health: 1},
            {pos: [37, 2], dir: 1, color: "green", health: 1},
            {pos: [30, 2.5], dir: 1, color: "yellow", health: 1},
            {pos: [22, 0], dir: 1, color: "blue", health: 1},
            {pos: [23, 0], dir: 1, color: "green", health: 1},
            {pos: [24, 0], dir: 1, color: "blue", health: 1},
            {pos: [8.8, 19], dir: 1, color: "yellow", health: 1},
            {pos: [8.1, 16], dir: 1, color: "yellow", health: 1},
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
        cycle: 0,
        height: 0,
    };
}

switch_to_level(CURRENT_LEVEL);


