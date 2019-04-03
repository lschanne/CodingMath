window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        fl = 300,
        shapes = [],
        numShapes = 100,
        xStart = yStart = -1000,
        xRange = yRange = 2000,
        zMax = 10000,
        zInc = 5,
        squareStart = -100,
        squareWidth = 200;
    
        for (var i = 0; i < numShapes; i++) {
            shapes[i] = {
                x: Math.random() * xRange + xStart,
                y: Math.random() * yRange + yStart,
                z: Math.random() * zMax
            }
            console.log(shapes[i])
        }

        // set (0, 0) to our vanishing point on the middle of the screen
        context.translate(width / 2, height / 2);

        update();

        function update() {
            context.clearRect(-width/2, -height/2, width, height);
            for (var i = 0; i < numShapes; i++) {
                var shape = shapes[i],
                    perspective = fl / (fl + shape.z);
                
                    // To draw this square and make it look like it is at a
                    // distance of z, we need to shift and scale the context
                    // by the appropriate perspective
                    context.save();
                    context.translate(
                        shape.x * perspective,
                        shape.y * perspective
                    )
                    context.scale(perspective, perspective)
                    context.fillRect(
                        squareStart,
                        squareStart,
                        squareWidth,
                        squareWidth
                    );
                    context.restore();

                    // Slowly moves the squares further away
                    shape.z += zInc;
                    // If it gets too far, pull it back to the front
                    if (shape.z > zMax) {
                        shape.z -= zMax;
                    }
            }

            requestAnimationFrame(update)
        }
}