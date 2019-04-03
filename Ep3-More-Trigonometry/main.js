window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // centerY and centerX are the central point around which
    // our object will move
    var centerY = height * .5,
        centerX = width * .5,
    // offset is how far the object will move around this
    // center point
        offset = height * .4,
    // speed controls how fast the object will move
        speed = 0.015,
    // theta will control the current position of the object
        theta = 0;

    // we can also add some variables to control the size and shape of our
    // circle over time
    var baseRadius = 50,
        radiusOffset = baseRadius * .3,
        baseAlpha = 0.5,
        alphaOffset = 0.5;

    render();

    function render() {
        // Here we adjust the y-position of the circle based on sin(theta)
        // Since sine values range from [-1, 1], we get the circle
        // moving from centerY - offset to centerY + offset
        var y = centerY + Math.sin(theta) * offset;

        // We'll adjust size and alpha at twice the frequency of y so that
        // the size and alpha are the same at each end of the oscillation
        var alpha = baseAlpha + Math.sin(theta * 2) * alphaOffset,
            radius = baseRadius + Math.sin(theta * 2) * radiusOffset;

        // We have to create an rgba string code to utilize alpha
        // This will be used by context.fill()
        // If we don't define context.fillStyle, it is implicitly
        // set to "rgba(0, 0, 0, 1)"
        // I guess JS will implicitly convert the number to a string to
        // perform concatentation - that's convenient
        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";

        // Clear the canvas to all white; this will delete the previous
        // image of the circle
        context.clearRect(0, 0, width, height);
        context.beginPath();

        // Here is where we pass in the coordinates and size of our circle
        context.arc(centerX, y, radius, 0, Math.PI * 2, false);

        // context.fill() uses context.fillStyle to change the color of
        // our circle
        context.fill();

        // We increment theta by the speed so that the circle is actually
        // moving on each iteration
        theta += speed;

        // Passing our render function into requestAnimationFrame ensures that
        // our circle is moving every time the screen refreshes
        // This yields a smoother looking animation
        requestAnimationFrame(render);
    }
}
