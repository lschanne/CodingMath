window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // this tile width:height ratio creates our Diametric 3D (which is very
    // close to Isometric)
    var tileWidth = 15,
        tileHeight = tileWidth / 2;

    context.translate(width / 2, 50);

    for (var x = 0; x < 100; x++) {
        for (var y = 0; y < 100; y++) {
            // either one of these commands is visually pleasing
            drawTile(x, y, randomColor())
            //drawBlock(x, y, Math.floor(Math.random() * 4))
        }
    }

    function randomColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b +")";
    }

    function drawTile(x, y, color) {
        // x and y are "tile positions"
        // we need to convert that to pixels so that we can translate the
        // context appropriately
        var x_pixel = (x - y) * tileWidth / 2,
            y_pixel = (x + y) * tileHeight / 2;

        context.save();
        context.translate(x_pixel, y_pixel);

        context.beginPath();
        context.moveTo(0, 0); // top corner
        context.lineTo(tileWidth / 2, tileHeight / 2); // right corner
        context.lineTo(0, tileHeight); // bottom corner
        context.lineTo(-tileWidth / 2, tileHeight / 2); // left corner
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.restore();
    }

    function drawBlock(x, y, z) {
        var top = "#eeeeee",
            right = "#cccccc",
            left = "#999999";

        var x_pixel = (x - y) * tileWidth / 2,
            y_pixel = (x + y) * tileHeight / 2,
            z_pixel = z * tileHeight;


        var top_x = 0,
            top_y = 0,
            left_x = -tileWidth / 2,
            left_y = tileHeight / 2,
            right_x = tileWidth / 2,
            right_y = tileHeight / 2,
            bottom_x = 0,
            bottom_y = tileHeight;

        context.save();
        context.translate(x_pixel, y_pixel);

        // draw top
        context.beginPath();
        context.moveTo(top_x, top_y - z_pixel);
        context.lineTo(right_x, right_y - z_pixel);
        context.lineTo(bottom_x, bottom_y - z_pixel);
        context.lineTo(left_x, left_y - z_pixel);
        context.closePath();
        context.fillStyle = top;
        context.fill()

        // draw left
        context.beginPath();
        context.moveTo(left_x, left_y - z_pixel);
        context.lineTo(bottom_x, bottom_y - z_pixel);
        context.lineTo(bottom_x, bottom_y);
        context.lineTo(left_x, left_y);
        context.closePath();
        context.fillStyle = left;
        context.fill()

        // draw left
        context.beginPath();
        context.moveTo(right_x, right_y - z_pixel);
        context.lineTo(bottom_x, bottom_y - z_pixel);
        context.lineTo(bottom_x, bottom_y);
        context.lineTo(right_x, right_y);
        context.closePath();
        context.fillStyle = right;
        context.fill()

        context.restore();
    }
}