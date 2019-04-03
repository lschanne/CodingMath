window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        target = {
            x: width,
            y: Math.random() * height
        },
        current = {
            x: 0,
            y: Math.random() * height
        },
        ease = 0.1,
        easing = true;
    
    document.addEventListener("click", function (event) {
        target.x = event.x;
        target.y = event.y;
        if (!easing) {
            easing = true;
            update();
        }
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(current.x, current.y, 10, 0, Math.PI * 2, false);
        context.fill();

        easeTo(current, target, ease);

        if (easing) {
            requestAnimationFrame(update);
        }
    }

    function easeTo(current, target, ease) {
        var dx = target.x - current.x,
            dy = target.y - current.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            easing = false;
            current.x = target.x;
            current.y = target.y;
        } else {
            current.x += dx * ease;
            current.y += dy * ease;
        }
    }
}