
//////////////////// WORLD

function world_at(pos) {
    var x = Math.round(pos[0]);
    var y = Math.round(pos[1]);
    if (y >= 0 && y < MAP.length
    &&  x >= 0 && x < MAP[y].length) {
        if (MAP[y][x] == " ")
            return false;
        return MAP[y][x];
    }
    return "#";
}

//////////////////// BLOBS

function blob_at(pos, scr_x, dist) {
    var x = pos[0];
    var y = pos[1];
    for (var i = 0; i < BLOBS.length; i++) {
        var size = BLOB_SIZE;
        if (x >= BLOBS[i].pos[0] && x <= BLOBS[i].pos[0]+size
        &&  y >= BLOBS[i].pos[1] && y <= BLOBS[i].pos[1]+size) {
            return {index: i,
                    scr_x: scr_x,
                    color: blob_color(dist, BLOBS[i].color),
                    health: BLOBS[i].health,
                    dist: dist};
        }
    }
}

function blob_world_at(pos) {
    return world_at([Math.floor(pos[0]),
                     Math.floor(pos[1])])
        || world_at([Math.ceil(pos[0]),
                     Math.ceil(pos[1])])
        || world_at([Math.floor(pos[0]),
                     Math.ceil(pos[1])])
        || world_at([Math.ceil(pos[0]),
                     Math.floor(pos[1])]);
}

function blob_move(pos, dir, dist) {
    var end = move_2d(pos, dir, dist);
    if (blob_world_at(end)) {
        if (! blob_world_at([end[0], pos[1]])) {
            return [end[0], pos[1]];
        } else if (! blob_world_at([pos[0], end[1]])) {
            return [pos[0], end[1]];
        }
        return pos;
    }
    return end;
}

function move_blob(b) {
    var old_pos = b.pos.slice();
    b.pos = blob_move(b.pos, b.dir, BLOB_SPEED);
    if (old_pos[0] == b.pos[0] || old_pos[1] == b.pos[1])
        b.dir += Math.random() - Math.random();
}

function update_blobs() {
    for (var i = 0; i < BLOBS.length; i++) {
        move_blob(BLOBS[i]);
    }
}

function blob_color(dist, rgb) {
    var d = Math.round(MAX_COLOR * (dist/RAY_RANGE));
    if (rgb == "green")
        return "rgb(" + d + "," + MAX_COLOR + "," + d + ")";
    else if (rgb == "blue")
        return "rgb(" + d + "," + d + "," + MAX_COLOR + ")";
    else // yellow
        return "rgb(" + MAX_COLOR + "," + MAX_COLOR + "," + d + ")";
}

function player_shot_blob(i) {
    if (typeof BLOBS[i] == "undefined")
        return;
    BLOBS[i].health *= SHOOT_DAMAGE_FACTOR;
    if (BLOBS[i].color == "green") {
        update_level_canvas(player.pos, 0, 255, 0, 1);
        document.body.style.background = "#aaddaa";
    } else if (BLOBS[i].color == "blue") {
        update_level_canvas(player.pos, 0, 0, 255, 1);
        document.body.style.background = "#aaaadd";
    } else { // yellow
        update_level_canvas(player.pos, 255, 255, 0, 1);
        document.body.style.background = "#ddddaa";
    }
    // death
    if (BLOBS[i].health < BLOB_DIE_THRESHOLD) {
        FLASH = FLASH_DURATION;
        FLASH_COLOR = "#000";
        BLOBS.splice(i, 1);
    }
}

//////////////////// LEVEL CANVAS

var CANVAS_PX_SIZE = 4;

function draw_level_canvas(canvas, pos) {
    var cx = pos[0];
    var cy = pos[1];
    for (var y = 0; y < canvas.length; y++) {
        for (var x = 0; x < canvas[y].length; x++) {
            var c = canvas[canvas.length - y - 1][x];
            CTX.fillStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
            CTX.fillRect((cx+x)*CANVAS_PX_SIZE, (cy+y)*CANVAS_PX_SIZE,
                         CANVAS_PX_SIZE, CANVAS_PX_SIZE);
        }
    }
}
function draw_level_canvas_border(canvas, pos) {
    var cx = pos[0];
    var cy = pos[1];
    CTX.beginPath();
    CTX.rect(cx*CANVAS_PX_SIZE, cy*CANVAS_PX_SIZE,
             canvas[0].length*CANVAS_PX_SIZE,
             canvas.length*CANVAS_PX_SIZE);
    CTX.lineWidth = CANVAS_PX_SIZE;
    CTX.strokeStyle = "#333";
    CTX.stroke();
}

function update_level_canvas(pos, r, g, b, factor)
{
    var x = Math.round(pos[0]);
    var y = Math.round(pos[1]);
    if (y >= 0 && y < LEVEL.canvas.length
    &&  x >= 0 && x < LEVEL.canvas[y].length) {
        LEVEL.canvas[y][x][0] = Math.round((LEVEL.canvas[y][x][0]*factor + r)/(factor+1));
        LEVEL.canvas[y][x][1] = Math.round((LEVEL.canvas[y][x][1]*factor + g)/(factor+1));
        LEVEL.canvas[y][x][2] = Math.round((LEVEL.canvas[y][x][2]*factor + b)/(factor+1));
    }
}

