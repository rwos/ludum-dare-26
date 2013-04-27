var levels = [
    // LEVEL 1
    {
        map: [
            "         #####                   ",
            "           ###                   ",
            "           ###                   ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "                                 ",
            "           ################      ",
            "    #      ##############        ",
            "    #        ##                  ",
            "    ####     ##                  ",
            "    ######   ##                  ",
        ],
        blobs: [
            {pos: [2, 2], dir: 1, color: "blue", health: 1},
            {pos: [4, 4], dir: 0, color: "green", health: 1},
            {pos: [5, 6], dir: 0, color: "yellow", health: 1}
        ],
    },
    // LEVEL 2

];

//////////////////// LEVEL SELECTION

var LEVEL = levels[0];
var MAP   = LEVEL.map;
var BLOBS = LEVEL.blobs;

