window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        massList = [],
        springLengths = [],
        numParticles = 3,
        k = 0.05,
        baseGravity = 0.3,
        baseRadius = 20;


    for (var i = 0; i < numParticles; i += 1) {
        // uniformly distributed radii from [10, 30]
        var thisRadius = baseRadius - 10 + Math.random() * 20;

        // treat the circles as equal density
        massList.push(thisRadius / baseRadius);

        particles.push(particle.create(
            Math.random() * width, // x position
            Math.random() * height, // y position
            10 + Math.random() * 15, // random velocity magnitude
            Math.random() * Math.PI * 2, // random velocity direction
            baseGravity * massList[i] // adjust gravity for mass
        ));

        particles[i].radius = thisRadius;
        // we'll give all of the particles the same friction
        particles[i].friction = 0.95;

        // Add a random spring length
        springLengths.push(50 + Math.random() * 100);
    }

    // springLengths[0]: from particles[0] to particles[1]
    // springLengths[1]: from particles[1] to particles[2]
    // springLengths[2]: from particles[2] to particles[0]

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

        // draw stuff
        for (var i = 0; i < particles.length; i += 1) {
            var p0 = particles[i],
                p1 = particles[(i + 1) % 3];

            context.beginPath();
            context.moveTo(p0.position.getX(), p0.position.getY());
            context.lineTo(p1.position.getX(), p1.position.getY());
            context.stroke();

            context.beginPath();
            context.arc(p0.position.getX(), p0.position.getY(),
                        p0.radius, 0, Math.PI * 2);
            context.fill();
        }

        // do the spring physics stuff
        for (var i = 0; i < particles.length; i += 1) {
            var p0 = particles[i],
                p1 = particles[(i + 1) % 3],
                distanceVector = p1.position.subtract(p0.position);

            // so the distanceVector goes from p0 to p1
            // now we adjust it based on the natural spring length between them
            distanceVector.setLength(distanceVector.getLength() -
                                     springLengths[i]);

            // next we multiply by the spring constant to turn distanceVector
            // into a force applied by the spring between p0 and p1
            var springForce = distanceVector.multiply(k);

            // finally, apply that force to p0 and p1 according to their
            // masses
            p0.accelerate(springForce.multiply(massList[i]));
            p1.accelerate(springForce.multiply(-1 * massList[(i + 1) % 3]));
        }

        for (var i = 0; i < particles.length; i += 1) {
            particles[i].update();
            handleEdges(particles[i]);
        }

        requestAnimationFrame(update);
    }
};

