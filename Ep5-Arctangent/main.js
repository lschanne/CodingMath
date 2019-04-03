window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        // define where we want to draw our arrow
        arrowX = width / 2, // middle of canvas
        arrowY = height / 2, // middle of canvas
        // position of mouse
        px, py,
        // distance between arrow and mouse
        dx, dy,
        theta = 0,
        // define some variables for moving the origin point of the arrow
        radius = 150,
        arrowTheta = 0,
        arrowSpeed = 0.1;

    render();

    function render() {
        context.clearRect(0, 0, width, height);

        // Because we dynamically translate the origin point to where
        // the arrow originates from, we can move the arrow on each refresh
        // and still have it point to the mouse cursor
        arrowX = width/2 + radius * Math.cos(arrowTheta);
        arrowY = height/2 + radius * Math.sin(arrowTheta);
        arrowTheta += arrowSpeed;

        // find dx and dy by subtracting the mouse position from the
        // arrow start position
        dx = px - arrowX;
        dy = py - arrowY;

        // Math.atan2 is preferred over Math.atan because atan2 is able to
        // return a result properly for all 4 quadrants by taking two
        // arguments
        // atan only takes one argument and is therefore not smart enough to
        // distinguish between QI and QIII or QII and QIV
        theta = Math.atan2(dy, dx);

        context.save();
        // move the origin point of the canvas
        context.translate(arrowX, arrowY);
        // rotate the axes; respect the order of operations here
        // translating after the rotation yields very different results
        // because here we are rotating around the new origin point
        context.rotate(theta);

        context.beginPath();

        // draw an arrow pointing to the mouse
        context.moveTo(20, 0);
        context.lineTo(-20, 0);
        context.moveTo(20, 0);
        context.lineTo(10, -10);
        context.moveTo(20, 0);
        context.lineTo(10, 10);

        // fill in the arrow
        context.stroke();

        context.restore();
        requestAnimationFrame(render);
    }

    // this function will be called whenever the mouse moves
    // using it, we can make our arrow point to the mouse location
    document.body.addEventListener("mousemove", function(event) {
        // Store the mouse position for finding dx and dy above
        px = event.clientX;
        py = event.clientY;

    });
};
