window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        weight1 = particle.create(Math.random() * width, // x position
                                  Math.random() * height, // y position
                                  // particle velocity magnitude
                                  25 + Math.random() * 25,
                                  // particle velocity direction
                                  Math.random() * Math.PI * 2,
                                  // gravity
                                  0.2),
        weight2 = particle.create(Math.random() * width, // x position
                                  Math.random() * height, // y position
                                  // particle velocity magnitude
                                  10 + Math.random() * 25,
                                  // particle velocity direction
                                  Math.random() * Math.PI * 2,
                                  // gravity
                                  0.1),
        k = 0.1, // spring constant
        springLength = 100; // natural spring length

    weight1.radius = 20;
    weight2.radius = 10;
    weight1.friction = 0.95
    weight2.friction = 0.95;

    update();

    function handleEdges(p) {
        var bounceFactor = 0.9;
        if (p.position.getX() - p.radius < 0) {
            p.position.setX(p.radius);
            p.velocity.setX(p.velocity.getX() * -1);
            p.velocity.multiplyBy(bounceFactor);
        } else if (p.position.getX() + p.radius > width) {
            p.position.setX(width - p.radius);
            p.velocity.setX(p.velocity.getX() * -1);
            p.velocity.multiplyBy(bounceFactor);
        }

        if (p.position.getY() - p.radius < 0) {
            p.position.setY(p.radius);
            p.velocity.setY(p.velocity.getY() * -1);
            p.velocity.multiplyBy(bounceFactor);
        } else if (p.position.getY() + p.radius > height) {
            p.position.setY(height - p.radius);
            p.velocity.setY(p.velocity.getY() * -1);
            p.velocity.multiplyBy(bounceFactor);
        }
    }

    function update() {
        context.clearRect(0, 0, width, height);

        // Get the distance vector from weight2 to weight 1
        var distanceVector = weight1.position.subtract(weight2.position);

        // Need to add some edge handling
        handleEdges(weight1);
        handleEdges(weight2);

        // draw stuff
        context.beginPath();
        context.strokeStyle = "#000000";
        context.moveTo(weight2.position.getX(), weight2.position.getY());
        context.lineTo(weight1.position.getX(), weight1.position.getY());
        context.stroke();

        context.beginPath();
        context.fillStyle = "#FFFF00";
        context.arc(weight1.position.getX(), weight1.position.getY(),
                    weight1.radius, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "#222222";
        context.arc(weight2.position.getX(), weight2.position.getY(),
                    weight2.radius, 0, Math.PI * 2);
        context.fill();

        // Adjust by the natural spring length
        distanceVector.setLength(distanceVector.getLength() - springLength);
        // Multiply by the spring constant to get the force applied by the
        // spring to the weight
        distanceVector.multiplyBy(k);
        // so at this point, the "distance vector" is really the "spring
        // force", but we'll leave it in the same object
        // Since distanceVector was calculated as from weight2 to weight1,
        // the weight1 acceleration must be inverted to go the right direction
        // I also want to divide both of them by radius so that, assuming equal
        // density, the F = m * a equation actually holds true
        weight1.accelerate(distanceVector.multiply(-1));
        weight2.accelerate(distanceVector.multiply(weight1.radius /
                                                   weight2.radius));
        weight1.update();
        weight2.update();

        requestAnimationFrame(update);
    }
};

