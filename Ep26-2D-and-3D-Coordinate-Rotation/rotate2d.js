rotate2d = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        theta = 0.01,
        sine = Math.sin(theta),
        cosine = Math.cos(theta),
        point = {
            x: width/2 - 20,
            y: height/2 - 20
        };
    
    if (width > height) {
        point.y = 0;
    } else {
        point.x = 0;
    }

    context.translate(width/2, height/2);

    update();

    function update() {
        context.clearRect(-width/2, -height/2, width, height);

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(point.x, point.y);
        context.stroke();

        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2, false);
        context.fill();

        context.beginPath();
        context.arc(point.x, point.y, 20, 0, Math.PI * 2, false);
        context.fill();

        var x1 = point.x * cosine - point.y * sine,
            y1 = point.y * cosine + point.x * sine;
        
        point = {
            x: x1,
            y: y1
        }

        requestAnimationFrame(update);
    }
}