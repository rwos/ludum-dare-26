//////////////////// WORLD

var world = [
"         #####                   ",
"           ###                   ",
"           ###                   ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"                                 ",
"           ################      ",
"    #      ##############        ",
"    #        ##                  ",
"    ####     ##                  ",
"    ######   ##                  ",
];

function world_at(pos) {
    var x = Math.round(pos[0]);
    var y = Math.round(pos[1]);
    if (y >= 0 && y < world.length
    &&  x >= 0 && x < world[y].length) {
        if (world[y][x] == " ")
            return false;
        return world[y][x];
    }
    return "#";
}

//////////////////// BLOBS

var blobs = [
    {pos: [2, 2], dir: 1, color: "blue"},
    {pos: [4, 4], dir: 0, color: "green"},
    {pos: [5, 6], dir: 0, color: "yellow"}
];

function blob_at(pos, scr_x, dist) {
    var x = pos[0];
    var y = pos[1];
    for (var i = 0; i < blobs.length; i++) {
        if (x >= blobs[i].pos[0] && x <= blobs[i].pos[0]+BLOB_SIZE
        &&  y >= blobs[i].pos[1] && y <= blobs[i].pos[1]+BLOB_SIZE) {
            return {scr_x: scr_x, color: blob_color(dist, blobs[i].color), dist: dist};
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
    for (var i = 0; i < blobs.length; i++) {
        move_blob(blobs[i]);
    }
}

function blob_color(dist, rgb) {
    var d = Math.round(255 * (dist/RAY_RANGE));
    if (rgb == "green")
        return "rgb(" + d + ",255," + d + ")";
    else if (rgb == "blue")
        return "rgb(" + d + "," + d + ",255)";
    else // yellow
        return "rgb(255,255," + d + ")";
}

//////////////////// LEVEL CANVAS

var CANVAS_PX_SIZE = 4;

var CURRENT_CANVAS = [];
for (var y = 0; y < world.length; y++) {
    CURRENT_CANVAS[y] = [];
    for (var x = 0; x < world[y].length; x++) {
        CURRENT_CANVAS[y][x] = [255, 255, 255];
    }
}

function update_level_canvas(pos, r, g, b, factor)
{
    var x = Math.round(pos[0]);
    var y = Math.round(pos[1]);
    if (y >= 0 && y < CURRENT_CANVAS.length
    &&  x >= 0 && x < CURRENT_CANVAS[y].length) {
        CURRENT_CANVAS[y][x][0] = Math.round((CURRENT_CANVAS[y][x][0]*factor + r)/(factor+1));
        CURRENT_CANVAS[y][x][1] = Math.round((CURRENT_CANVAS[y][x][1]*factor + g)/(factor+1));
        CURRENT_CANVAS[y][x][2] = Math.round((CURRENT_CANVAS[y][x][2]*factor + b)/(factor+1));
    }
}

function draw_level_canvas_preview()
{
    CTX.fillStyle = "#000";
    CTX.fillRect(0, 0,
                 CANVAS_PX_SIZE*CURRENT_CANVAS[0].length + CANVAS_PX_SIZE,
                 CANVAS_PX_SIZE*CURRENT_CANVAS.length + CANVAS_PX_SIZE);
    for (var y = 0; y < CURRENT_CANVAS.length; y++) {
        for (var x = 0; x < CURRENT_CANVAS[y].length; x++) {
            var c = CURRENT_CANVAS[y][x];
            CTX.fillStyle = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
            CTX.fillRect(x*CANVAS_PX_SIZE, y*CANVAS_PX_SIZE,
                         CANVAS_PX_SIZE, CANVAS_PX_SIZE);
        }
    }
}

