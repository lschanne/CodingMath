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
    function addPoint(x, y, additionalParams) {
        var additionalParams = additionalParams || {};
        points.push({
            x: x,
            y: y,
            oldx: additionalParams.oldx || x,
            oldy: additionalParams.oldy || y,
            pinned: additionalParams.pinned || false,
        });
    }
    addPoint(100, 100, {oldx: 25, oldy: 95});
    addPoint(200, 100);
    addPoint(200, 200);
    addPoint(100, 200);

    // add a chain that is pinned (unaffected by the Verlet integration)
    // the bolt of the chain will be an engine that has some motion outside
    // of the system
    var engine = {
        baseX: 450,
        baseY: 100,
        range: 100,
        angle: 0,
        speed: 0.05,
        x: 550,
        y: 100,
        pinned: true,
    };
    points.push(engine);
    addPoint(400, 100);
    addPoint(250, 100);

    // Add sticks via helper function
    function addStick(pIdx0, pIdx1, hidden) {
        sticks.push({
            p0: points[pIdx0],
            p1: points[pIdx1],
            length: distance(points[pIdx0], points[pIdx1]),
            hidden: hidden || false,
        });
    }
    addStick(0, 1);
    addStick(0, 3);
    addStick(1, 2);
    addStick(2, 3);

    // add a cross-piece for stability in the square
    // if it's not there, the square will just collapse - which is actually
    // realistic physics
    addStick(0, 2, true);


    // add a chain to the box using the last 3 points
    addStick(4, 5);
    addStick(5, 6);
    addStick(6, 0);

    // add a bit of motion to points[4], the pinned point
    // it may be pinned with respect to the Verlet integration, but we can
    // add some motion to it outside of that system

    update();
    function update() {
        updateEngine();
        updatePoints();

        // Update sticks needs to be called multiple times
        // Every time one stick is updated, the other sticks that are attached
        // to either of the points will be warped a little bit
        // If we repeat this process a few times, we approach an equilibrium
        // where the warpage is minimized
        for (var i=0; i < 5; i++) {
            updateSticks();
        }

        context.clearRect(0, 0, width, height);
        renderPoints();
        renderSticks();
        renderEngine();
        requestAnimationFrame(update);
    }

    function updateEngine() {
        engine.x = engine.baseX + Math.cos(engine.angle) * engine.range;
        engine.y = engine.baseY + Math.sin(engine.angle) * engine.range;
        engine.angle += engine.speed;
    }

    function updatePoints() {
        for (var i=0; i < points.length; i++) {
            var p = points[i];

            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
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

            // if both of the points are pinned, offsetX and offsetY should
            // be 0, so it doesn't matter which block this hits
            // if one of the points is pinned, then only move the other point
            // if neither point is pinned, then we can split =the offset
            // between them both
            if (s.p0.pinned) {
                s.p1.x += offsetX * 2;
                s.p1.y += offsetY * 2;
            } else if (s.p1.pinned) {
                s.p0.x -= offsetX * 2;
                s.p0.y -= offsetY * 2;
            } else {
                s.p0.x -= offsetX;
                s.p0.y -= offsetY;
                s.p1.x += offsetX;
                s.p1.y += offsetY;
            }

            // we need screen edge bouncing to occur after the updateSticks()
            // method because if we do it beforehand, the stick correction could
            // push the points off the screen
            screenBounce(s.p0);
            screenBounce(s.p1);
        }
    }

    function renderPoints() {
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
            if (!s.hidden) {
                context.beginPath();

                // use tertiary operators to extract the line width and/or
                // color of the stick if it exists on the object
                context.strokeStyle = s.color ? s.color : "black";
                context.lineWidth = s.width ? s.width : 1;

                context.moveTo(s.p0.x, s.p0.y);
                context.lineTo(s.p1.x, s.p1.y);
                context.stroke();
            }
        }
    }

    function renderEngine() {
        context.beginPath();
        context.arc(engine.baseX, engine.baseY, engine.range, 0, Math.PI * 2)
        context.stroke();
    }

    function distance(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}