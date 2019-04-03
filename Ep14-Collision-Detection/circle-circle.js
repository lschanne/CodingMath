var circle = {
    x: 0,
    y: 0,
    r: 1,

    create: function(x, y, r) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.r = r;
        return obj;
    }
}

window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        c0 = circle.create(width / 2, height / 2, 20),
        c1 = circle.create(0, 0, 10),
        radiiSum = c0.r + c1.r,
        dx = 0, dy = 0;

    update();

    // we will have one of our circles follow the mouse
    // the other will be static in the center of the screen
    document.body.addEventListener("mousemove", function(event) {
        c1.x = event.clientX;
        c1.y = event.clientY;
    });

    function update() {
        context.clearRect(0, 0, width, height);

        // check if the distance is greater than the sum of the radii
        dx = c0.x - c1.x;
        dy = c0.y - c1.y;
        if (Math.sqrt(dx * dx + dy * dy) > radiiSum) {
            // color yellow for no collision
            context.fillStyle = "#ffff00";
        } else {
            // color blue for collision
            context.fillStyle = "#0000ff";
        }

        // draw the circles
        context.beginPath();
        context.arc(c0.x, c0.y, c0.r, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.arc(c1.x, c1.y, c1.r, 0, Math.PI * 2);
        context.fill();

        requestAnimationFrame(update);
    }
};

