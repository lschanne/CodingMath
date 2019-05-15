window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var points = [],
        // factor for velocity loss on object collision
        bounce = 0.9,
        // a bit of gravity never hurt anyone
        gravity = 0.5,
        // a constant friction of the "medium"
        friction = 0.999;

    points.push({
        x: 100,
        y: 100,

        // instead of storing velocities, we will store the previous positions
        oldx: 95,
        oldy: 95
    });

    update();

    function update() {
        updatePoints();
        renderPoints();
        requestAnimationFrame(update);
    }

    function updatePoints() {
        for (var i=0; i < points.length; i++) {
            var p = points[i],
                vx = (p.x - p.oldx) * friction;
                vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y += vy;

                // I feel heavy...
                p.y += gravity;

                // add edge of screen bouncing
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
}