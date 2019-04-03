window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        numParticles = 100;

    for (var i = 0; i < numParticles; i += 1) {
        p = particle.create(width / 2, height / 3, 1 + 4 * Math.random(),
                            2 * Math.PI * Math.random(), 0.1);
        p.radius = 5;
        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // Just to prove that we are actually deleting objects
        console.log(particles.length);

        // Note that we have to use particles.length rather than numParticles
        // here since the length of the particles array is changing when we
        // delete objects
        for (var i = 0; i < particles.length; i += 1) {
            var p = particles[i];

            p.update();

            context.beginPath();
            context.arc(p.position.getX(),
                        p.position.getY(),
                        p.radius, 0, Math.PI * 2, false);
            context.fill();
        }

        // Check to remove particles that are off screen
        // Keep in mind that moving backwards through an array is the safest
        // way to delete objects
        for (var i = particles.length - 1; i >= 0; i -= 1) {
            var p = particles[i];
            if (p.position.getX() - p.radius > width ||
                p.position.getX() + p.radius < 0 ||
                p.position.getY() - p.radius > height ||
                p.position.getY() + p.radius < 0 ) {

                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(update);
    }
};
