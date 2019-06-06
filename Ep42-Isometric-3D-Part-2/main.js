window.onload = function() {
    var canvas = document.getElementById("canvas"),
        characterCanvas = document.getElementById("characterCanvas"),
        context = canvas.getContext("2d"),
        characterContext = characterCanvas.getContext("2d"),
        width = canvas.width = characterCanvas.width = window.innerWidth,
        height = canvas.height = characterCanvas.height = window.innerHeight;

    // this tile width:height ratio creates our Diametric 3D (which is very
    // close to Isometric)
    var tileWidth = 100,
        tileHeight = tileWidth / 2,
        // a predefined layout of block heights
        heightGrid = generateSizeGrid(),
        // create a character object to move
        character = {x: 0, y: 0},
        contextShift = {
            x: width / 2,
            y: 300,
        };
    context.translate(contextShift.x, contextShift.y);
    characterContext.translate(contextShift.x, contextShift.y);

    // draw the static grid on which the character will move
    numRows = heightGrid.length;
    for (var x = 0; x < heightGrid.length; x++) {
        for (var y = 0; y < heightGrid[x].length; y++) {
            drawBlock(x, y, heightGrid[x][y]);
        }
    }


    // NOTE something in this drawCharacter() function isn't quite right
    // the character can clearly move off of the grid in some places and
    // cannot traverse the entire grid, so the position where we are
    // drawing the character isn't right, but I'm not quite sure why
    // we'll just draw a circle to represent the "character"
    function drawCharacter() {
        // so these x- and y-pixel positions are missing the z value
        var x_pixel = (character.x - character.y) * tileWidth / 2,
            y_pixel = (character.x + character.y) * tileHeight / 2,
            // the z_pixel adjustment only makes sense in the context of
            // the heightGrid, which draws blocks instead of tiles
            z_pixel = heightGrid[character.x][character.y] * tileHeight;

        console.log('x pos: ', character.x);
        console.log('y pos: ', character.y);

        characterContext.clearRect(
            -contextShift.x, -contextShift.y, width, height
        );

        // these x and y will be used as the actual coordinates at which
        // to draw the character
        var x = x_pixel - z_pixel,
            y = y_pixel + tileHeight / 2 - z_pixel;

        characterContext.beginPath();
        characterContext.arc(x, y, 10, 0, Math.PI * 2);
        characterContext.fillStyle = 'red';
        characterContext.fill();
    }

    // Make event listeners for the arrow keys
    // to move the character on the grid
    document.addEventListener('keydown', function (event) {
        switch(event.keyCode) {
            case 37: // left
                console.log('left')
                character.x--;
                break;
            case 38: // up
                console.log('up')
                character.y--;
                break;
            case 39: // right
                console.log('right')
                character.x++;
                break;
            case 40: // down
                console.log('down')
                character.y++;
                break;
        }

        // keep the character on the grid
        if (character.x < 0) {
            character.x = 0;
        } else if (character.x >= heightGrid.length) {
            character.x = heightGrid.length - 1;
        }
        if (character.y < 0) {
            character.y = 0;
        } else if (character.y >= heightGrid[character.x].length) {
            character.y = heightGrid[character.x].length - 1;
        }

        drawCharacter();
    });
    drawCharacter();

    // create the pseudo-predefined grid of block heights
    // is programatically generated and non-random still predefined?
    // we know what it will be ahead of time, it's just not a static asset
    function generateSizeGrid() {
        var heightGrid = [],
            sizeRow = [],
            minSize = 0,
            maxSize = 7,
            currentSize = minSize;

        while (currentSize < maxSize) {
            sizeRow.push(currentSize++);
        }
        for (var i = 0; i < 6; i++) {
            sizeRow.push(currentSize);
        }
        currentSize--;
        while (currentSize >= minSize) {
            sizeRow.push(currentSize--);
        }
        // push a deep copy of the sizeRow onto the heightGrid
        heightGrid.push([...sizeRow]);
        while (sum(sizeRow) > minSize * sizeRow.length) {
            var prevRow = heightGrid[heightGrid.length - 1];
            for (var idx = 0; idx < sizeRow.length; idx++) {
                var value = prevRow[idx];
                if (idx > 0 && prevRow[idx + 1] < value) {
                    value -= 1
                } else if (idx - 1 < prevRow.length && prevRow[idx - 1] < value) {
                    value -= 1
                }
                sizeRow[idx] = value;
            }
            // push a deep copy of the sizeRow onto the heightGrid
            heightGrid.push([...sizeRow]);
        }

        return heightGrid;
    }

    function sum(array) {
        return array.reduce(function(total, num) { return total + num; })
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

        // draw top side
        context.beginPath();
        context.moveTo(top_x, top_y - z_pixel);
        context.lineTo(right_x, right_y - z_pixel);
        context.lineTo(bottom_x, bottom_y - z_pixel);
        context.lineTo(left_x, left_y - z_pixel);
        context.closePath();
        context.fillStyle = top;
        context.fill()

        // draw left side
        context.beginPath();
        context.moveTo(left_x, left_y - z_pixel);
        context.lineTo(bottom_x, bottom_y - z_pixel);
        context.lineTo(bottom_x, bottom_y);
        context.lineTo(left_x, left_y);
        context.closePath();
        context.fillStyle = left;
        context.fill()

        // draw right side
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