//////////////////// KEYS

var KEY = [];

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var ENTER = 13;

function ord(c) {
    return c.charCodeAt(0);
}

document.onkeydown = function(e) {
    var evt = window.event || e;
    var code = e.keyCode;
    KEY[code] = true;
    if (code == UP || code == DOWN || code == LEFT || code == RIGHT
    ||  code == ord(" ") || code == ENTER)
        e.preventDefault();
}
document.onkeyup = function(e) {
    var evt = window.event || e;
    var code = e.keyCode;
    KEY[code] = false;
}

//////////////////// MENU

var color_cycle = 0;
var sound_cycle = 1;

function display_level_selector() {
    var xoff = 40;
    var yoff = 35;
    for (var i = 0; i < levels.length; i++) {
        var lvl = levels[i];
        draw_level_canvas(lvl.canvas,
                [xoff + lvl.canvas_pos[0],
                 yoff + lvl.canvas_pos[1]]);
    }
    if (CURRENT_LEVEL < levels.length) {
        var bordered = levels[CURRENT_LEVEL];
        var color = "#3f3";
        if (Math.round(color_cycle) == 0) {
            color = "#ff3";
        } else if (Math.round(color_cycle) == 2) {
            color = "#33f";
        }
        draw_level_canvas_border(bordered.canvas,
            [xoff + bordered.canvas_pos[0],
             yoff + bordered.canvas_pos[1]],
             color);
    }
    sound_cycle += 0.03;
    if (sound_cycle > 1) {
        sound_cycle = 0;
        SND_BLING.play();
    }
    color_cycle += 0.06;
    if (color_cycle > 2) color_cycle = 0;
}

function display_message(y, s) {
    CTX.font = "30px Arial,Helvetica,sans-serif";
    CTX.textAlign = "center";
    CTX.fillStyle = "#333";
    CTX.fillText(enc_msg(s), W/2, y);
}

function menu_frame() {
    var ol = CTX.createLinearGradient(0, 0, W, 0);
    ol.addColorStop(0,   "rgba(0, 0, 0, 0.5)");
    ol.addColorStop(1,   "rgba(0, 0, 0, 0.5)");
    ol.addColorStop(0.2, "rgba(0, 0, 0, 0.2)");
    ol.addColorStop(0.5, "rgba(0, 0, 0, 0)");
    ol.addColorStop(0.8, "rgba(0, 0, 0, 0.2)");
    CTX.fillStyle = "#ddd";
    CTX.fillRect(0, 0, W, H);
    CTX.fillStyle = ol;
    CTX.fillRect(0, 0, W, H);
    // border
    CTX.fillStyle = "#333";
    CTX.fillRect(156, 136, 328, 236);
    display_level_selector();
    if (LEVEL_WON) {
        if (CURRENT_LEVEL < 12) {
            display_message(80, "You won!");
            display_message(430, "You go on!");
        } else {
            display_message(80, "px");
            document.getElementById("msg").style.cssText = "display:block";
            document.getElementById("img-link").href = C.toDataURL();
        }
    } else if (LEVEL_LOST) {
        display_message(80, "You lost!");
        display_message(430, "You try again!");
    } else {
        display_message(80, "You hello!");
        display_message(430, "You start!");
    }
    if (KEY[ENTER] && CURRENT_LEVEL < 12) {
        switch_to_level(CURRENT_LEVEL);
        SND_UP.play();
        return 1;
    }
    return 0;
}

//////////////////// SOUND

var SND_BG = new Audio("snd/bg.wav");
var SND_BG2 = new Audio("snd/bg2.wav");
var SND_BLING = new Audio("snd/bling.wav");
var SND_UP = new Audio("snd/up.wav");
var SND_UP2 = new Audio("snd/up2.wav");
var SND_GUN = new Audio("snd/machine_gun.wav");
var SND_HURT = new Audio("snd/hurt.wav");
var SND_PLAYER_DEATH = new Audio("snd/down.wav");
var SND_BLOB_HIT = new Audio("snd/machine_gun_hit.wav");
var SND_BLOB_DEATH = new Audio("snd/blob_death.wav");

//////////////////// FRAME

var current_frame_fun = 0;
var frame_funs = [menu_frame,
                  game_frame]
var frame_fun = frame_funs[current_frame_fun];

var RUNNING = false;

function frame() {
    var frame_start = (new Date()).getTime();
    clearTimeout(RUNNING);

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
        current_frame_fun += 1;
        if (current_frame_fun >= frame_funs.length) {
            current_frame_fun = 0;
        }
        frame_fun = frame_funs[current_frame_fun];
    }
    // overlay
    var ol = CTX.createLinearGradient(0, 0, W, 0);
    if (player.shooting) {
        ol.addColorStop(0,   "rgba(0, 0, 0, 0.5)");
        ol.addColorStop(1,   "rgba(0, 0, 0, 0.5)");
        ol.addColorStop(0.5, "rgba(0, 0, 0, 0)");
    } else {
        ol.addColorStop(0.01, "rgba(0, 0, 0, 0)");
        ol.addColorStop(0.99, "rgba(0, 0, 0, 0)");
        ol.addColorStop(0,   "rgba(0, 0, 0, 0.05)");
        ol.addColorStop(1,   "rgba(0, 0, 0, 0.05)");
    }
    CTX.fillStyle = ol;
    CTX.fillRect(0, 0, W, H);

    // frame rate limiter
    var frame_time = (new Date()).getTime() - frame_start;
    if (frame_time >= TARGET_FRAME_TIME) {
        //LOG("XXX: " + frame_time + " (" + TARGET_FRAME_TIME + ")");
        RUNNING = setTimeout(frame, 1);
    } else {
        //LOG(">>>: " + frame_time + " (" + TARGET_FRAME_TIME + ")");
        RUNNING = setTimeout(frame, TARGET_FRAME_TIME-frame_time);
    }
}
RUNNING = setTimeout(frame, 1);

//////////////////// STUPIDITY

// chrome and opera perform fine on my machine here,
// FF 10 is too slow
if ((! window.chrome) && (! window.opera)) {
    document.getElementById("warning").style.cssText = "display:block";
}

