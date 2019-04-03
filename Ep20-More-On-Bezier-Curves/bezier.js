getPoint = function(x0, y0, x1, y1) {
    return {
        x: Math.random() * (x1 - x0) + x0,
        y: Math.random() * (y1 - y0) + y0
    }
};

drawPoint = function(context, point, radius, color) {
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
};

_interp = function(p0, p1, t) {
    return {
        x: (p1.x - p0.x) * t + p0.x,
        y: (p1.y - p0.y) * t + p0.y
    }
};

bezierCurve = function(context, x0, y0, x1, y1, kwargs = {}) {
    _getPoint = function() {
        return getPoint(x0, y0, x1, y1);
    }

    _drawPoint = function(point, radius, color) {
        return drawPoint(context, point, radius, color);
    }

    // note that if the number of control points is greater than what would be
    // implied by degree, the degree argument is ignored
    let {pStart = _getPoint(), pEnd = _getPoint(), controlPoints = [], degree = 2} = kwargs;

    var points = [],
        t = 0,
        nSteps = 100,
        step = 1 / nSteps,
        prevPoint = pStart,
        thisPoint = null,
        newPoints = null,
        thesePoints = null;

    context.fillStyle = "#000000";
    context.strokeStyle = "#FF0000";
    context.fillRect(x0, y0, x1, y1);
    _drawPoint(pStart, 15, "#FFFFFF");
    _drawPoint(pEnd, 15, "#FFFFFF");

    points.push(pStart);
    for (var i = 0; i < controlPoints.length; i++) {
        points.push(controlPoints[i]);
    }

    for (var i = points.length; i < degree; i++) {
        points.push(_getPoint());
    }

    for (var i = 1; i < points.length; i++) {
        _drawPoint(points[i], 10, "#00FFFF");
    }
    points.push(pEnd);

    for (var i = 0; i < nSteps; i++) {
        t += step;
        thesePoints = points;
        while (thesePoints.length > 1) {
            newPoints = [];
            for (var j = 1; j < thesePoints.length; j++) {
                newPoints.push(_interp(thesePoints[j - 1], thesePoints[j], t));
            }
            thesePoints = newPoints;
        }
        thisPoint = thesePoints[0];

        context.beginPath();
        context.moveTo(prevPoint.x, prevPoint.y);
        context.lineTo(thisPoint.x, thisPoint.y);
        context.stroke();

        prevPoint = thisPoint;
    }

    // now we will overlay the new technique from CodingMath to see if the
    // results are the same
    context.strokeStyle = "#550055";
    var p0 = null,
        p1 = pStart,
        pC = null;

    for (var i = 1; i < points.length - 1; i++) {
        p0 = p1;
        pC = points[i];
        if (points.length - i > 2) {
            p1 = {
                x: (points[i + 1].x + pC.x) / 2,
                y: (points[i + 1].y + pC.y) / 2
            };
        } else {
            p1 = points[i + 1];
        }

        t = 0;
        prevPoint = p0;
        for (var j = 0; j < nSteps; j++) {
            t += step;
            pA = _interp(p0, pC, t);
            pB = _interp(pC, p1, t);
            thisPoint = _interp(pA, pB, t);

            context.beginPath();
            context.moveTo(prevPoint.x, prevPoint.y);
            context.lineTo(thisPoint.x, thisPoint.y);
            context.stroke();

            prevPoint = thisPoint;
        }
    }
}
