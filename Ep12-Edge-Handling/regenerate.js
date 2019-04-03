window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        numParticles = 100,
        origin = vector.create(width / 2, height);

    for (var i =  0; i < numParticles; i += 1) {
        var p = particle.create(origin.getX(), origin.getY(),
                                getVelocity(),
                                getDirection(),
                                0.1);
        p.radius = Math.random() * 10 + 2;
        particles.push(p);
    }


    update();

    function getVelocity() {
        // get a random velocity
        return Math.random() * 8 + 5;
    }

    function getDirection() {
        // get a random direction
        return -Math.PI/2 + (Math.random() * .2 - .1);
    }

    function update() {
        context.clearRect(0, 0, width, height);

        for (var i = 0; i < particles.length; i += 1) {
            var p = particles[i];

            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(),
                        p.radius, 0, Math.PI * 2);
            context.fill();

            p.update();

            // Since we know that for this particular animation sequence,
            // particles will only fall off the bottom of the screen, that's
            // really the only edge that we need to handle
            // When particles do move off screen, "regenerate" them at the
            // starting point again
            if (p.position.getY() - p.radius > height) {
                p.position.setX(origin.getX());
                p.position.setY(origin.getY());
                p.velocity.setLength(getVelocity());
                p.velocity.setAngle(getDirection());
            }
        }

        requestAnimationFrame(update);
    }
};

