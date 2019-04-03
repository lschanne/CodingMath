rotate3d = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        theta = 0.01,
        cosine = Math.cos(theta),
        sine = Math.sin(theta),
        fl = 300,
        nPoints = 9,
        points = [],
        origin = {
            x: 0,
            y: 0,
            z: 0,
            r: 15
        }
    
    for (var i=0; i<nPoints; i++) {
        points.push({
            x: Math.random() * width / 3,
            y: Math.random() * height / 3,
            z: Math.random() * fl / 3,
            r: 10
        })
    }

    context.translate(width/2, height/2);
    update();

    function update() {
        context.clearRect(-width/2, -height/2, width, height);

        drawCircle(origin);
        for (var i=0; i<nPoints; i++) {
            var p = points[i];
            drawCircle(p);
            rotatePoint(p, i);
        }

        requestAnimationFrame(update);
    }

    function drawCircle(p) {
        var ratio = fl / (fl + p.z);
        context.save();
        context.scale(ratio, ratio);
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        context.fill();
        context.restore();
    }

    function rotatePoint(p, i) {
        var x,y;
        if (i%3==0) {
            // rotate around z
            x = p.x;
            y = p.y;
        } else if (i%2==0) {
            // rotate around y
            x = p.x;
            y = p.z;
        } else {
            // rotate around x
            x = p.y;
            y = p.z;
        }

        var x1 = x * cosine - y * sine,
            y1 = y * cosine + x * sine;
        
        if (i%3==0) {
            // rotate around z
            p.x = x1;
            p.y = y1;
        } else if (i%2==0) {
            // rotate around y
            p.x = x1;
            p.z = y1;
        } else {
            // rotate around x
            p.y = x1;
            p.z = y1;
        }
    }
}