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
        ease = 0.1;
    
    document.addEventListener("click", function (event) {
        target.x = event.x;
        target.y = event.y;
    });

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(current.x, current.y, 10, 0, Math.PI * 2, false);
        context.fill();

        // Here we simply apply Zeno's paradox for our easing
        var dx = target.x - current.x,
            dy = target.y - current.y,
            vx = dx * ease,
            vy = dy * ease;
        
        current.x += vx;
        current.y += vy;

        requestAnimationFrame(update);
    }
}