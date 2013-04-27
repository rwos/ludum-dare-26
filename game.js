
var player = {
    pos: [2, 2],
    dir: 1,
    health: PLAYER_HEALTH,
    shooting: false,
};

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
            LOG(end + " - " + hit + "|||" +  dist);
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
    var y_top = (H-height)/2;
    CTX.fillStyle = "#ddd";
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
            var y_top = (H-height)/2;
            CTX.fillStyle = wall_color(blob.dist);
            CTX.fillRect(blob.scr_x, y_top, VERT_STEP, fill_height);
            CTX.fillStyle = blob.color;
            CTX.fillRect(blob.scr_x, y_top+fill_height, VERT_STEP, height-fill_height);
        }
    }
}

//////////////////// PLAYER

function player_world_at(pos) {
    return world_at([Math.floor(pos[0]),
                     Math.floor(pos[1])]) == "#"
        || world_at([Math.ceil(pos[0]),
                     Math.ceil(pos[1])]) == "#"
        || world_at([Math.floor(pos[0]),
                     Math.ceil(pos[1])]) == "#"
        || world_at([Math.ceil(pos[0]),
                     Math.floor(pos[1])]) == "#";
}

function player_move(pos, dir, dist) {
    var end = move_2d(pos, dir, dist);
    update_level_canvas(end, 0, 0, 0, 120);
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
    if (DEATH_FLASH >= 0) {
        DEATH_FLASH -= 1;
        document.body.style.background = "#000000";
    } else {
        document.body.style.background = "#aaaaaa";
    }
    player.shooting = KEY[ord(" ")] ? true : false;
    update_blobs();
    update_screen();
    draw_level_canvas_preview();
    LOG("health: " + player.health + " --> " + player.shooting);
}

