window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // Again, define the center point of our animation
    var centerX = width * .5,
        centerY = height * .5,
        // Define the offset and range for each physical property
        radiusOffset = 150,
        radiusRange = 50,
        thetaOffset = 0,
        thetaRange = Math.PI * 2,
        speedOffset = 0.05,
        speedRange = 0.1,
        // We will animate multiple objects to make it look like a bunch of
        // flies moving about on the screen
        numObjects = 10,
        x, y;

    // Each object will need its own set of physical properties
    // For each variable, we create seperate variables for x and y to
    // create a proper Lissajous curve animation
    // If each set of variables are the same for x and y, we have a circle
    var radiusX = [],
        radiusY = [],
        thetaX = [],
        thetaY = [],
        speedX = [],
        speedY = [];

    // Randomize the properties of the objects
    for(var i = 0; i < numObjects; i += 1) {
        radiusX.push(radiusOffset + radiusRange * Math.random());
        radiusY.push(radiusOffset + radiusRange * Math.random());
        thetaX.push(thetaOffset + thetaRange * Math.random());
        thetaY.push(thetaOffset + thetaRange * Math.random());
        speedX.push(speedOffset + speedRange * Math.random());
        speedY.push(speedOffset + speedRange * Math.random());
    }

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        for(var i = 0; i < numObjects; i += 1) {
            x = centerX + Math.cos(thetaX[i]) * radiusX[i];
            y = centerY + Math.cos(thetaY[i]) * radiusY[i];
            context.beginPath();
            context.arc(x, y, 10, 0, Math.PI * 2, false);
            context.fill();
            thetaX[i] += speedX[i];
            thetaY[i] += speedY[i];
        }

        requestAnimationFrame(render);
    }
};
