window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var points = [],
        sticks = [],
        // factor for velocity loss on object collision
        bounce = 0.9,
        // a bit of gravity never hurt anyone
        gravity = 0.5,
        // a constant friction of the "medium"
        friction = 0.999;

    // Add points
    points.push({
        x: 100,
        y: 100,
        oldx: 25,
        oldy: 95,
    });
    points.push({
        x: 200,
        y: 100,
        oldx: 200,
        oldy: 100,
    })
    points.push({
        x: 200,
        y: 200,
        oldx: 200,
        oldy: 200,
    });
    points.push({
        x: 100,
        y: 200,
        oldx: 100,
        oldy: 200,
    })

    // Add sticks via helper function
    function addStick(pIdx0, pIdx1) {
        sticks.push({
            p0: points[pIdx0],
            p1: points[pIdx1],
            length: distance(points[pIdx0], points[pIdx1]),
        });
    }
    addStick(0, 1);
    addStick(0, 3);
    addStick(1, 2);
    addStick(2, 3);

    // add a cross-piece for stability in the square
    // if it's not there, the square will just collapse - which is actually
    // realistic physics
    addStick(0, 2);

    update();

    function update() {
        updatePoints();

        // Update sticks needs to be called multiple times
        // Every time one stick is updated, the other sticks that are attached
        // to either of the points will be warped a little bit
        // If we repeat this process a few times, we approach an equilibrium
        // where the warpage is minimized
        for (var i=0; i < 5; i++) {
            updateSticks();
        }

        renderPoints();
        renderSticks();
        requestAnimationFrame(update);
    }

    function updatePoints() {
        for (var i=0; i < points.length; i++) {
            var p = points[i],
                vx = (p.x - p.oldx) * friction,
                vy = (p.y - p.oldy) * friction;

            // apply physics - done before updating the sticks
            p.oldx = p.x;
            p.oldy = p.y;
            p.x += vx;
            p.y += vy;

            // I feel heavy...
            p.y += gravity;

            screenBounce(p);
        }
    }

    function screenBounce(p) {
        var vx = (p.x - p.oldx) * friction,
            vy = (p.y - p.oldy) * friction;

        // bounce off the edge of the screen - done after updating
        // the sticks
        if (p.x > width) {
            p.x = width;
            p.oldx = p.x + vx * bounce;
        } else if (p.x < 0) {
            p.x = 0;
            p.oldx = p.x + vx * bounce;
        }
        if (p.y > height) {
            p.y = height;
            p.oldy = p.y + vy * bounce;
        } else if (p.y < 0) {
            p.y = 0;
            p.oldy = p.y + vy * bounce;
        }
    }

    function updateSticks() {
        for (var i=0; i < sticks.length; i++) {
            var s = sticks[i],
                percentage = (s.length - distance(s.p0, s.p1)) / s.length / 2,
                offsetX = (s.p1.x - s.p0.x) * percentage,
                offsetY = (s.p1.y - s.p0.y) * percentage;

            s.p0.x -= offsetX;
            s.p0.y -= offsetY;
            s.p1.x += offsetX;
            s.p1.y += offsetY;

            // we need screen edge bouncing to occur after the updateSticks()
            // method because if we do it beforehand, the stick correction could
            // push the points off the screen
            screenBounce(s.p0);
            screenBounce(s.p1);
        }
    }

    function renderPoints() {
        context.clearRect(0, 0, width, height);
        for (var i=0; i < points.length; i++) {
            var p = points[i];
            context.beginPath();
            context.arc(p.x, p.y, 5, 0, Math.PI * 2);
            context.fill();
        }
    }

    function renderSticks() {
        for (var i=0; i < sticks.length; i++) {
            var s = sticks[i];
            context.beginPath();
            context.moveTo(s.p0.x, s.p0.y);
            context.lineTo(s.p1.x, s.p1.y);
            context.stroke();
        }
    }

    function distance(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}