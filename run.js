//////////////////// KEYS

var KEY = [];

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;

function ord(c) {
    return c.charCodeAt(0);
}

document.onkeydown = function(e) {
    var evt = window.event || e;
    var code = e.keyCode;
    KEY[code] = true;
    if (code == UP || code == DOWN || code == LEFT || code == RIGHT
    ||  code == ord(" "))
        e.preventDefault();
}
document.onkeyup = function(e) {
    var evt = window.event || e;
    var code = e.keyCode;
    KEY[code] = false;
}

//////////////////// FRAME

var frame_fun = game_frame;

var RUNNING = false;


function frame() {
    frame_fun();
    RUNNING = setTimeout(frame, TIMEOUT);
}
RUNNING = setTimeout(frame, TIMEOUT);

