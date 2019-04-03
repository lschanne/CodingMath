window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        fl = 300,
        shapes = [],
        numShapes = 200
        centerZ = 2000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0.01;

    for (var i = 0; i < numShapes; i++) {
        var shape = {
            angle: 0.2 * i,
            y: 2000 - 4000 * i / numShapes + Math.random() * 500,
        }
        shape.x = Math.cos(shape.angle + baseAngle) * radius;
        shape.z = centerZ + Math.sin(shape.angle + baseAngle) * radius;
        shapes.push(shape);
    }

    context.translate(width/2, height/2);
    update();

    function update() {
        context.clearRect(-width/2, -height/2, width, height);

        baseAngle += rotationSpeed;

        context.beginPath();
        for (var i = 0; i < numShapes; i++) {
            var shape = shapes[i],
                perspective = fl / (fl + shape.z);

            context.save();
            context.scale(
                perspective,
                perspective
            );
            context.translate(
                shape.x,
                shape.y
            );
            // don't worry - the context.save() and context.restore() won't
            // affect our context.lineTo() and context.moveTo() calls
            if (i == 0) {
                context.moveTo(0, 0);
            }
            else {
                context.lineTo(0, 0);
            }
            context.restore();

            shape.x = Math.cos(shape.angle + baseAngle) * radius;
            shape.z = centerZ + Math.sin(shape.angle + baseAngle) * radius;
        }
        context.stroke();

        requestAnimationFrame(update);
    }
}