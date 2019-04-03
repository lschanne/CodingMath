window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 10,
                            Math.random() * Math.PI * 2),
        // Set friction to reduce velocity by 5% each frame
        friction = 0.95;

    p.radius = 10;
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        // using our pseudo-friction
        p.velocity.multiplyBy(friction);

        p.update();

        context.beginPath();
        context.arc(p.position.getX(), p.position.getY(),
                    p.radius, 0, Math.PI * 2);
        context.fill();

        requestAnimationFrame(update);
    }
};

