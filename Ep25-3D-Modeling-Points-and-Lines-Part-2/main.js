window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        needsUpdate = true,
        fl = 300,
        points = [
            { x: -500, y: -500, z: 1000 },
            { x:  500, y: -500, z: 1000 },
            { x:  500, y: -500, z:  500 },
            { x: -500, y: -500, z:  500 },
            { x: -500, y:  500, z: 1000 },
            { x:  500, y:  500, z: 1000 },
            { x:  500, y:  500, z:  500 },
            { x: -500, y:  500, z:  500 },
        ];

    context.translate(width / 2, height / 2);

    // for each point in our `points` array, we will get the screen position,
    // (sx, sy) based on the 3D position (x, y, z), the implicit focal length,
    // fl, and our projection formula
    function project() {
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            
                p.p = fl / (fl + p.z);
                p.sx = p.x * p.p;
                p.sy = p.y * p.p;
        }
    }

    // this function will take indices of the points in our `points` array
    // and draw lines from the ith point to the (i+1)th point
    function drawLine() {
        var p = points[arguments[0]];
        context.moveTo(p.sx, p.sy);
        for (var i = 1; i < arguments.length; i++) {
            var p = points[arguments[i]];
            context.lineTo(p.sx, p.sy);
            context.moveTo(p.sx, p.sy);
        }
    }

    function translateModel(x, y, z) {
        for (var i = 0; i < points.length; i ++) {
            var p = points[i];
            p.x += x;
            p.y += y;
            p.z += z;
        }
        needsUpdate = true;
    }

    document.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            case 37: // left key
                translateModel(-20, 0, 0);
                break;
            case 39: // right key
                translateModel(20, 0, 0);
                break;
            case 38: // up key
                // remember that the y-axis is inverted on the screen, so in
                // order to not invert the controls visually for the user, we
                // need to actually invert the program controls
                if (event.shiftKey) {
                    translateModel(0, 0, -20);
                } else {
                    translateModel(0, -20, 0);
                }
                break;
            case 40: // down key
                if (event.shiftKey) {
                    translateModel(0, 0, 20);
                } else {
                    translateModel(0, 20, 0);
                }
                break;
        }
    })
    update();

    function update() {
        if (needsUpdate) {
            context.clearRect(-width/2, -height/2, width, height);
            project();

            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                context.beginPath();
                context.arc(p.sx, p.sy, p.p * 10, 0, Math.PI * 2, false);
                context.fill()
            }

            context.beginPath();
            // draw top face of cube
            drawLine(0, 1, 2, 3, 0);
            // draw bottom face of cube
            drawLine(4, 5, 6, 7, 4);
            // connect the remaining edges of the cube
            drawLine(0, 4);
            drawLine(1, 5);
            drawLine(2, 6);
            drawLine(3, 7);
            context.stroke();

            needsUpdate = false;
        }

        requestAnimationFrame(update);
    }
}