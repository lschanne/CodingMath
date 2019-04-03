window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = vector.create(width / 2, height / 2),
        weight = particle.create(Math.random() * width, // x position
                                 Math.random() * height, // y position
                                 // particle velocity magnitude
                                 50,
                                 // particle velocity direction
                                 Math.random() * Math.PI * 2,
                                 // gravity
                                 0.2),
        k = 0.1, // spring constant
        springLength = 100; // natural spring length

    weight.radius = 20;
    weight.friction = 0.95;

    document.body.addEventListener("mousemove", function(event) {
        springPoint.setX(event.clientX);
        springPoint.setY(event.clientY);
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // Get the distance vector from the weight to the spring point
        var distanceVector = springPoint.subtract(weight.position);

        // draw stuff
        context.beginPath();
        context.strokeStyle = "#000000";
        context.moveTo(springPoint.getX(), springPoint.getY());
        context.lineTo(weight.position.getX(), weight.position.getY());
        context.stroke();

        context.beginPath();
        context.fillStyle = "#FFFF00";
        context.arc(springPoint.getX(), springPoint.getY(),
                    10, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "#999999";
        context.arc(weight.position.getX(), weight.position.getY(),
                    weight.radius, 0, Math.PI * 2);
        context.fill();

        // Adjust by the natural spring length
        distanceVector.setLength(distanceVector.getLength() - springLength);
        // Multiply by the spring constant to get the force applied by the
        // spring to the weight
        weight.accelerate(distanceVector.multiply(k));
        weight.update();

        requestAnimationFrame(update);
    }
};

