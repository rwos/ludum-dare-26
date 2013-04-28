
//////////////////// RAYCASTER

var blobs_seen = [];

function cast_ray(x, dir) {
// includes blob detection
    var start = player.pos.slice();
    for (var dist = 0; dist < RAY_RANGE; dist += RAY_STEP) {
        var end = move_2d(start, dir, dist);
        var blob = blob_at(end, x, dist)
        if (blob) {
            blobs_seen.push(blob);
        }
        var hit = world_at(end);
        if (hit) {
            break;
        }
    }
    return {dist: dist, type: hit};
}

function wall_color(dist) {
    var d = Math.round(MAX_COLOR * (dist/RAY_RANGE));
    return "rgb(" + d + "," + d + "," + d + ")";
}
function goal_color(dist) {
    var d = Math.round(MAX_COLOR * (dist/RAY_RANGE));
    return "rgb(255," + d + ",255)";
}

function draw_slice(x, dist, type) {
    var height = WALL_HEIGHT/dist;
    if (dist == 0)
        height = H;
    var y_top = (H-height)/2+WALL_Y_OFF+player.height;
    var bg = CTX.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#fff");
    bg.addColorStop(0.4, "#ddd");
    bg.addColorStop(0.6, "#ddd");
    bg.addColorStop(1, "#aaa");
    CTX.fillStyle = bg;
    CTX.fillRect(x, 0, VERT_STEP, H);
    if (type == "X") {
        CTX.fillStyle = goal_color(dist);
    } else {
        CTX.fillStyle = wall_color(dist);
    }
    CTX.fillRect(x, y_top, VERT_STEP, height);
}

function draw_blobs(blobs) {
// includes hit trigger (for the "player shot blob" case)
    var z_buf = [];
    for (var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        if (typeof z_buf[blob.scr_x] == "undefined"
        ||  z_buf[blob.scr_x] >= blob.dist
        || blob.dist < 0.5) {
            if (player.shooting
            &&  blob.scr_x > SHOOT_AREA_LEFT
            &&  blob.scr_x < SHOOT_AREA_RIGHT) {
                player_shot_blob(blob.index);
            }
            z_buf[blob.scr_x] = blob.dist;
            var height = BLOB_HEIGHT / blob.dist;
            var fill_height = height-height*blob.health;
            var y_top = (H-height)/2 + 20;
            CTX.fillStyle = wall_color(blob.dist);
            CTX.fillRect(blob.scr_x, y_top, VERT_STEP, fill_height);
            CTX.fillStyle = blob.color;
            CTX.fillRect(blob.scr_x, y_top+fill_height, VERT_STEP, height-fill_height);
        }
    }
}

//////////////////// PLAYER

function player_world_at(pos) {
    var hit = world_at([Math.floor(pos[0]),
                        Math.floor(pos[1])])
           || world_at([Math.ceil(pos[0]),
                        Math.ceil(pos[1])])
           || world_at([Math.floor(pos[0]),
                        Math.ceil(pos[1])])
           || world_at([Math.ceil(pos[0]),
                        Math.floor(pos[1])]);
    if (hit == "X") {
        FLASH = FLASH_DURATION;
        FLASH_COLOR = "#fff";
        level_won();
        return false;
    }
    return (hit == "#");
}

function player_move(pos, dir, dist) {
    player.cycle += 1;
    var end = move_2d(pos, dir, dist);
    update_level_canvas(end, 0, 0, 0, 1); // XXX DEBUG : 120
    if (player_world_at(end)) {
        if (! player_world_at([end[0], pos[1]])) {
            return [end[0], pos[1]];
        } else if (! player_world_at([pos[0], end[1]])) {
            return [pos[0], end[1]];
        }
        return pos;
    }
    return end;
}

function update_player_health(blobs) {
    for (var i = 0; i < blobs.length; i++) {
        if (blobs[i].dist < BLOB_RANGE) {
            // player was hit
            player.health -= BLOB_HURT;
            update_level_canvas(player.pos, 255, 0, 0, 10);
            document.body.style.background = "#ffaaaa";
        }
    }
}

//////////////////// HUD

function update_hud() {
    draw_level_canvas(LEVEL.canvas, [0, 0]);
    CTX.font = "30px Arial,Helvetica,sans-serif";
    CTX.textAlign = "center";
    CTX.fillStyle = "#333";
    CTX.fillText(to_tri_str(Math.round(player.health)), W/2, 30);
    LOG("health: " + player.health + " --> " + player.shooting + " | " + player.pos + " | " + player.dir);
}

//////////////////// FRAME

function update_screen() {
// includes player-hit-by-blob updates (but it shouldn't)
    var FOV_STEP = FOV/W;
    blobs_seen = [];
    for (var x = 0; x < W; x += VERT_STEP) {
        var dir = (player.dir - FOV/2) + x*FOV_STEP;
        var hit = cast_ray(x, dir);
        draw_slice(x, hit.dist, hit.type);
    }
    draw_blobs(blobs_seen);
    update_player_health(blobs_seen);
}

var LEVEL_WON = false;
var LEVEL_LOST = false;
function level_won() {LEVEL_WON = true;}

function game_frame() {
    if (KEY[UP] || KEY[ord("W")]) {
        player.pos = player_move(player.pos, player.dir, SPEED);
    }
    if (KEY[DOWN] || KEY[ord("S")]) {
        player.pos = player_move(player.pos, player.dir, -SPEED);
    }
    if (KEY[ord("A")]) {
        player.pos = player_move(player.pos, player.dir+Math.PI/2, -SPEED);
    }
    if (KEY[ord("D")]) {
        player.pos = player_move(player.pos, player.dir+Math.PI/2, +SPEED);
    }
    if (KEY[LEFT]) {
        player.dir -= ANG_SPEED;
    }
    if (KEY[RIGHT]) {
        player.dir += ANG_SPEED;
    }
    if (KEY[ord(" ")] && player.cycle > 1) {
        player.shooting = true;
        // jitter
        player.dir += (Math.random()-0.5)/25;
        player.pos = player_move(player.pos, player.dir+Math.PI/2, (Math.random()-0.5)/50);
        player.height += (Math.random()-0.5)*5;
    } else {
        player.shooting = false;
        if (KEY[UP] || KEY[ord("W")]
        ||  KEY[DOWN] || KEY[ord("S")]
        ||  KEY[ord("A")] || KEY[ord("D")]) {
            // player walking
            player.height = Math.abs(Math.sin(player.cycle/5)) * 10;
        } else {
            // player not walking or shooting
            player.height = 0;
        }
    }
    update_blobs();
    update_screen();
    update_hud();
    if (LEVEL_WON) {
        return 1;
    } else if (LEVEL_LOST) {
        return -1;
    } else {
        return 0;
    }
}

