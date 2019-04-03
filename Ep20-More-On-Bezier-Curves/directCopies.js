// these functions are directly copied from the CodingMath utils.js
// just to verify my suspicion that his "multicurve" is not a real bezier curve

cubicBezier = function(p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x = Math.pow(1 - t, 3) * p0.x +
               Math.pow(1 - t, 2) * 3 * t * p1.x +
               (1 - t) * 3 * t * t * p2.x +
               t * t * t * p3.x;
    pFinal.y = Math.pow(1 - t, 3) * p0.y +
               Math.pow(1 - t, 2) * 3 * t * p1.y +
               (1 - t) * 3 * t * t * p2.y +
               t * t * t * p3.y;
    return pFinal;
};

multicurve = function(points, context) {
    var p0, p1, midx, midy;

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length - 2; i += 1) {
        p0 = points[i];
        p1 = points[i + 1];
        midx = (p0.x + p1.x) / 2;
        midy = (p0.y + p1.y) / 2;
        context.quadraticCurveTo(p0.x, p0.y, midx, midy);
    }
    p0 = points[points.length - 2];
    p1 = points[points.length - 1];
    context.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
    context.stroke();
};

// this I made myself to compare them
testBezier = function(context, width, height) {
    var nPoints = 4,
        points = [];

    draw = function(p, r, c) {
        context.fillStyle = c;
        context.beginPath();
        context.arc(p.x, p.y, r, 0, Math.PI * 2);
        context.fill();
    }

    context.clearRect(0, 0, width, height);
    context.strokeStyle = "#FF0000";
    for (var i = 0; i < nPoints; i++) {
        var p = {
            x: Math.random() * width,
            y: Math.random() * height
        },
            radius, color;

        if ((i == 0) || (i == nPoints - 1)) {
            radius = 15;
            color = "#000000";
        } else {
            radius = 10;
            color = "#00FFFF";
        }

        draw(p, radius, color);
        points.push(p);
    }

    var prevP = points[0],
        t = 0,
        nSteps = 100,
        step = 1 / nSteps,
        thisP = null;

    for (var i = 0; i < nSteps; i++) {
        t += step;
        thisP = cubicBezier(points[0], points[1], points[2], points[3], t);

        context.beginPath();
        context.moveTo(prevP.x, prevP.y);
        context.lineTo(thisP.x, thisP.y);
        context.stroke();

        prevP = thisP;
    }

    context.strokeStyle = "#550055";
    multicurve(points, context);
    // and yes we can see that the resulting curves are clearly different
};
