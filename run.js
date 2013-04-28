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
    var xoff = 40;
    var yoff = 35;
    for (var i = 0; i < levels.length; i++) {
        var lvl = levels[i];
        draw_level_canvas(lvl.canvas,
                [xoff + lvl.canvas_pos[0],
                 yoff + lvl.canvas_pos[1]]);
    }
    if (CURRENT_LEVEL < levels.length -1) {
        var bordered = levels[CURRENT_LEVEL+1];
        draw_level_canvas_border(bordered.canvas,
            [xoff + bordered.canvas_pos[0],
             yoff + bordered.canvas_pos[1]]);
    }
}

function display_message(s) {
    CTX.font = "25px Arial,Helvetica,sans-serif";
    CTX.textAlign = "center";
    CTX.fillStyle = "#333";
    var enc = "";
    for (var i = 0; i < s.length; i++) {
        //enc += String.fromCharCode(ord(s[i])+2);
        if (s[i] == " ") {
            enc += ":";
        } else {
            var num = ord(s[i]).toString(3);
            for (var j = 0; j < num.length; j++) {
                if (num[j] == "0") {
                    enc += ".";
                } else if (num[j] == "1") {
                    enc += "/";
                } else {
                    enc += "|";
                }
            }
        }
    }
    CTX.fillText(enc, W/2, 80);
}

function level_won_frame() {
    CTX.fillStyle = "#ddd";
    CTX.fillRect(0, 0, W, H);
    // border
    CTX.fillStyle = "#333";
    CTX.fillRect(154, 132, 332, 242);
    display_level_selector();
    display_message("You won!");
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
    if (FLASH >= 0) {
        FLASH -= 1;
        document.body.style.background = FLASH_COLOR;
    } else {
        document.body.style.background = "#aaaaaa";
    }
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

