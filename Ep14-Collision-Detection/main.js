/// On my own, I have created a program to detect circle-circle and
/// Circle-rectangle collisions. I have placed a few objects on the screen.
/// One object will follow the cursor around, and pressing space will toggle
/// that object between a circle and a rectangle.

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
        onScreenObjects = [rectangle.create(width / 4, height / 4, 15, 15),
            circle.create(width / 4, 3 * height / 4, 15),
            rectangle.create(3 * width / 4, height / 4, 15, 15),
            circle.create(3 * width / 4, 3 * height / 4, 15)],
        isCircleArray = [false, true, false, true],
        r = rectangle.create(width / 2, height / 2, 25, 25),
        c = circle.create(0, 0, 10),
        pointerObject = r,
        isCircle = false,
        noOverlapColor = '#ffff00', // blue for no overlap
        overlapColor = '#0000ff'; // yellow for overlap

    update();

    document.body.addEventListener("mousemove", function(event) {
        c.x = event.clientX;
        c.y = event.clientY;
        r.x = event.clientX;
        r.y = event.clientY;
    });

    document.body.addEventListener("keyup", function(event) {
        // 32 is the spacebar
        if (event.keyCode == 32) {
            isCircle = !isCircle;
        }
    });

    function circle_circle_Overlap(c0, c1) {
        var dx = c0.x - c1.x,
            dy = c0.y - c1.y;

        return Math.sqrt(dx*dx + dy*dy) <= c0.r + c1.r;
    }

    function rect_rect_Overlap(r0, r1) {
        return Math.abs(r0.x - r1.x) <= (r0.width + r1.width) / 2 &&
               Math.abs(r0.y - r1.y) <= (r0.height + r1.height) / 2;
    }

    function rect_circle_Overlap(r0, c1) {
        return Math.abs(r0.x - c1.x) <= r0.width/2 + c1.r &&
               Math.abs(r0.y - c1.y) <= r0.height/2 + c1.r;
    }

    function update() {
        context.clearRect(0, 0, width, height);

        var anyOverlap = false;
        for (var i = 0; i < onScreenObjects.length; i+=1) {
            var thisOverlap = false,
                thisObject = onScreenObjects[i],
                thisCircle = isCircleArray[i];

            if (thisCircle && isCircle) {
                thisOverlap = circle_circle_Overlap(c, thisObject);
            } else if (thisCircle && !isCircle) {
                thisOverlap = rect_circle_Overlap(r, thisObject);
            } else if (isCircle) {
                thisOverlap = rect_circle_Overlap(thisObject, c);
            } else {
                thisOverlap = rect_rect_Overlap(thisObject, r);
            }


            if (thisOverlap) {
                context.fillStyle = overlapColor;
                anyOverlap = true;
            } else {
                context.fillStyle = noOverlapColor;
            }

            if (thisCircle) {
                context.beginPath();
                context.arc(thisObject.x, thisObject.y,
                            thisObject.r, 0, Math.PI * 2);
                context.fill();
            } else {
                context.fillRect(thisObject.x - thisObject.width / 2,
                                 thisObject.y - thisObject.height / 2,
                                 thisObject.width, thisObject.height);
            }
        }


        if (anyOverlap) {
            context.fillStyle = overlapColor;
        } else {
            context.fillStyle = noOverlapColor;
        }

        if (isCircle) {
            context.beginPath();
            context.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            context.fill();
        } else {
            context.fillRect(r.x - r.width / 2,
                             r.y - r.height / 2,
                             r.width, r.height);
        }

        requestAnimationFrame(update);
    }
};

