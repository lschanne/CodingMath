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
        r = rectangle.create(width / 2, height / 2, 25, 25),
        c = circle.create(0, 0, 10);

    update();

    // we will have the circle follow the mouse
    // the rectangle will be static in the center of the screen
    document.body.addEventListener("mousemove", function(event) {
        c.x = event.clientX;
        c.y = event.clientY;
    });

    function update() {
        context.clearRect(0, 0, width, height);

        // check for overlap
        if (Math.abs(r.x - c.x) > r.width/2 + c.r ||
            Math.abs(r.y - c.y) > c.height/2 + c.r) {
            // color yellow for no collision
            context.fillStyle = "#ffff00";
        } else {
            // color blue for collision
            context.fillStyle = "#0000ff";
        }

        // draw the shapes
        context.fillRect(r.x - r.width / 2, r.y - r.height / 2,
                         r.width, r.height);
        context.beginPath();
        context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        context.fill();

        requestAnimationFrame(update);
    }
};

