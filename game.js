var player = {
    pos: [2, 2],
    dir: 1
};

var blobs_seen = [];

function cast_ray(x, dir) {
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
    var d = Math.round(255 * (dist/RAY_RANGE));
    return "rgb(" + d + "," + d + "," + d + ")";
}
function goal_color(dist) {
    var d = Math.round(255 * (dist/RAY_RANGE));
    return "rgb(255," + d + ",255)";
}

function draw_slice(x, dist, type) {
    var height = WALL_HEIGHT/dist;
    if (dist == 0)
        height = H;
    var y_top = (H-height)/2;
    CTX.fillStyle = "rgba(255,255,255,1)";
    CTX.fillRect(x, 0, VERT_STEP, H);
    if (type == "X") {
        CTX.fillStyle = goal_color(dist);
    } else {
        CTX.fillStyle = wall_color(dist);
    }
    CTX.fillRect(x, y_top, VERT_STEP, height);
}

function draw_blobs(blobs) {
    var z_buf = [];
    for (var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        if (typeof z_buf[blob.scr_x] == "undefined"
        ||  z_buf[blob.scr_x] >= blob.dist) {
            z_buf[blob.scr_x] = blob.dist;
            var height = BLOB_HEIGHT / blob.dist;
            var y_top = (H-height)/2;
            CTX.fillStyle = blob.color;
            CTX.fillRect(blob.scr_x, y_top, VERT_STEP, height);
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

//////////////////// FRAME

function update_screen() {
    var FOV_STEP = FOV/W;
    blobs_seen = [];
    for (var x = 0; x < W; x += VERT_STEP) {
        var dir = (player.dir - FOV/2) + x*FOV_STEP;
        var hit = cast_ray(x, dir);
        draw_slice(x, hit.dist, hit.type);
    }
    draw_blobs(blobs_seen);
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
    update_blobs();
    update_screen();
}

