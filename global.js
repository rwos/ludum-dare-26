var C = document.getElementById("canvas");
var W = C.width;
var H = C.height;
var CTX = C.getContext("2d");

var DEBUG = document.getElementById("debug");
function LOG(v) {
    DEBUG.innerHTML = v;
}

var TIMEOUT = 10;

var FOV = 90 * (Math.PI / 180);
var VERT_STEP = 8;
var RAY_RANGE = 20;
var RAY_STEP = 0.1;
var WALL_HEIGHT = 700;
var BLOB_HEIGHT = 400;
var BLOB_SIZE = 1;

var SPEED = 0.05;
var ANG_SPEED = 0.1;

var BLOB_SPEED = SPEED + 0.01;

var PLAYER_HEALTH = 10000;
var BLOB_HURT = 0.1;
var BLOB_RANGE = 2;

var SHOOT_AREA_LEFT = (W/2)-15;
var SHOOT_AREA_RIGHT = (W/2)+15;

var SHOOT_DAMAGE_FACTOR = 0.99;
var BLOB_DIE_THRESHOLD = 0.1;

//////////////////// UTILS

function move_2d(pos, dir, dist) {
    return [
        Math.sin(dir)*dist + pos[0],
        Math.cos(dir)*dist + pos[1]
    ];
}

