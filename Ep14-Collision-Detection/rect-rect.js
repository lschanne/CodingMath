var rectangle = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,

    create: function(x, y, width, height) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.width = width;
        obj.height = height;
        return obj;
    }
}

window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        r0 = rectangle.create(width / 2, height / 2, 20, 20),
        r1 = rectangle.create(0, 0, 10, 10);

    update();

    // we will have one of our rectangles follow the mouse
    // the other will be static in the center of the screen
    document.body.addEventListener("mousemove", function(event) {
        r1.x = event.clientX;
        r1.y = event.clientY;
    });

    function update() {
        context.clearRect(0, 0, width, height);

        // check if the rectangles overlap
        if ((Math.abs(r0.x - r1.x) > (r0.width + r1.width)/2) ||
             (Math.abs(r0.y - r1.y) > (r0.height + r1.height)/2)) {
            // color yellow for no collision
            context.fillStyle = "#ffff00";
        } else {
            // color blue for collision
            context.fillStyle = "#0000ff";
        }

        // draw the rectangles
        context.fillRect(r0.x - r0.width / 2, r0.y - r0.height / 2,
                         r0.width, r0.height);
        context.fillRect(r1.x - r1.width / 2, r1.y - r1.height / 2,
                         r1.width, r1.height);

        requestAnimationFrame(update);
    }
};

