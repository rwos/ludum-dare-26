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

//////////////////// MENU

function display_level_selector() {
    for (var i = 0; i < levels.length; i++) {
        var lvl = levels[i];
        draw_level_canvas(lvl.canvas,
                [10 + lvl.canvas_pos[0],
                 10 + lvl.canvas_pos[1]], false);
    }
}

function level_won_frame() {
    CTX.fillStyle = "#ddd";
    CTX.fillRect(0, 0, W, H);
    display_level_selector();
    if (KEY[ord(" ")]) {
        switch_to_level(CURRENT_LEVEL+1);
        return 1;
    }
    return 0;
}

//////////////////// FRAME

var current_frame_fun = 0;
var frame_funs = [game_frame,
                level_won_frame];

var frame_fun = game_frame;

var RUNNING = false;

function frame() {
    var result = frame_fun();
    if (result == 0) {
        // no action
    } else if (result == 1) {
        // next frame function
        current_frame_fun += 1;
        if (current_frame_fun >= frame_funs.length) {
            current_frame_fun = 0;
        }
        frame_fun = frame_funs[current_frame_fun];
    } else if (result == -1) {
        // level lost -> try again
    }
    RUNNING = setTimeout(frame, TIMEOUT);
}
RUNNING = setTimeout(frame, TIMEOUT);

