window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = vector.create(width / 2, height / 2),
        weight = particle.create(Math.random() * width,
                                 Math.random() * height,
                                 Math.random() * 3,
                                 Math.random() * Math.PI * 2),
        k = 0.3;

    weight.radius = 20;
    // Add some arbitrary friction to simulate loss of energy
    weight.friction = 0.95;

    update();

    // Make the spring point follow the cursor
    document.addEventListener("mousemove", function (event) {
        springPoint.setX(event.clientX);
        springPoint.setY(event.clientY);
    });

    function update() {
        context.clearRect(0, 0, width, height);

        // stuff //
        var distance = springPoint.subtract(weight.position),
            springForce = distance.multiply(k);

        weight.velocity.addTo(springForce);
        weight.update();

        context.beginPath();
        context.fillStyle = "#999999";
        context.arc(springPoint.getX(), springPoint.getY(),
            weight.radius / 4, 0, Math.PI * 2);
        context.fill();
        
        context.beginPath();
        context.moveTo(springPoint.getX(), springPoint.getY());
        context.lineTo(weight.position.getX(), weight.position.getY());
        context.stroke();

        context.beginPath();
        context.fillStyle = "#FFFF00";
        context.arc(weight.position.getX(), weight.position.getY(),
            weight.radius, 0, Math.PI * 2);
        context.fill();

        requestAnimationFrame(update);
    }
};
