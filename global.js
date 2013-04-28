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
var WALL_Y_OFF = 20;
var BLOB_HEIGHT = 300;
var BLOB_SIZE = 0.8;

var SPEED = 0.5;
var ANG_SPEED = 0.05;

var BLOB_SPEED = 0.06;

var PLAYER_HEALTH = 19682; // 3^9 - 1
var BLOB_HURT = 0.5;
var BLOB_RANGE = 3;

var SHOOT_AREA_LEFT = (W/2)-15;
var SHOOT_AREA_RIGHT = (W/2)+15;

var SHOOT_DAMAGE_FACTOR = 0.99;
var BLOB_DIE_THRESHOLD = 0.1;

var MAX_COLOR = 0xdd;

var FLASH = 0;
var FLASH_DURATION = 15;
var FLASH_COLOR;

//////////////////// UTILS

function move_2d(pos, dir, dist) {
    return [
        Math.sin(dir)*dist + pos[0],
        Math.cos(dir)*dist + pos[1]
    ];
}

function to_tri_str(n) {
    var num = n.toString(3);
    var out = "";
    for (var j = 0; j < num.length; j++) {
        if (num[j] == "0") {
            out += ".";
        } else if (num[j] == "1") {
            out += ":";
        } else {
            out += "|";
        }
    }
    return out;
}

function enc_msg(s) {
    var enc = "";
    for (var i = 0; i < s.length; i++) {
        //enc += String.fromCharCode(ord(s[i])+2);
        if (s[i] == " ") {
            enc += " ";
        } else {
            enc += to_tri_str(ord(s[i]));
        }
    }
    return enc;
}

