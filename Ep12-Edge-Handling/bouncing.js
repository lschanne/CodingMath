window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 5,
                            Math.random() * Math.PI * 2,
                            // We can adjust gravity or leave it at 0
                            0.1);

    p.radius = 40;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(),
                    p.radius, 0, Math.PI * 2);
        context.fill();

        p.update();

        // Check for collision with screen edge
        // We can adjust this bounceFactor for some interesting effects
        // To simulate some real physics, a factor with magnitude less than 1.0
        // will cause the particle to lose some velocity on every collision
        // A magnitude greater than 1.0 would cause the particle to actually
        // speed up on each collision
        var bounceFactor = -0.9
        if (p.position.getX() + p.radius > width) {
            p.position.setX(width - p.radius);
            p.velocity.setX(p.velocity.getX() * bounceFactor);
        }
        if (p.position.getX() - p.radius < 0) {
            p.position.setX(p.radius);
            p.velocity.setX(p.velocity.getX() * bounceFactor);
        }
        if (p.position.getY() + p.radius > height) {
            p.position.setY(height - p.radius);
            p.velocity.setY(p.velocity.getY() * bounceFactor);
        }
        if (p.position.getY() - p.radius < 0) {
            p.position.setY(p.radius);
            p.velocity.setY(p.velocity.getY() * bounceFactor);
        }

        requestAnimationFrame(update);
    }
};

