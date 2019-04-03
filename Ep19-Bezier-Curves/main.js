window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    
    getPoint = function(x0, y0, x1, y1) {
        x = Math.random() * (x1 - x0) + x0
        y = Math.random() * (y1 - y0) + y0
        return {x: x, y: y}
    }

    drawPoint = function(point, radius, color) {
        radius = radius || 10;
        color = color || "#000000";
        
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
    }

    interp = function(p0, p1, t) {
        return {
            x: (p1.x - p0.x) * t + p0.x,
            y: (p1.y - p0.y) * t + p0.y
        }
    }

    quadraticBezier = function (x0, y0, x1, y1) {
        context.fillStyle = "#000000"
        context.fillRect(x0, y0, x1, y1);

        var pStart = getPoint(x0, y0, x1, y1),
            pEnd = getPoint(x0, y0, x1, y1),
            p0 = getPoint(x0, y0, x1, y1),
            t = 0,
            nSteps = 100,
            step = 1 / nSteps;

        drawPoint(pStart, 15, "#FFFFFF");
        drawPoint(pEnd, 15, "#FFFFFF");
        drawPoint(p0, 10, "#0000FF");

        prevP = pStart;
        context.strokeStyle = "#FF0000";
        for (var i = 0; i < nSteps; i++) {
            t += step;
            pA = interp(pStart, p0, t);
            pB = interp(p0, pEnd, t);
            thisP = interp(pA, pB, t);

            context.beginPath();
            context.moveTo(prevP.x, prevP.y);
            context.lineTo(thisP.x, thisP.y);
            context.stroke();

            prevP = thisP;
        }
    }

    cubicBezier = function (x0, y0, x1, y1) {
        context.fillStyle = "#FFFFFF"
        context.fillRect(x0, y0, x1, y1);

        var pStart = getPoint(x0, y0, x1, y1),
            pEnd = getPoint(x0, y0, x1, y1),
            p0 = getPoint(x0, y0, x1, y1),
            p1 = getPoint(x0, y0, x1, y1),
            t = 0,
            nSteps = 100,
            step = 1 / nSteps;

        drawPoint(pStart, 15, "#000000");
        drawPoint(pEnd, 15, "#000000");
        drawPoint(p0, 10, "#00FF00");
        drawPoint(p1, 10, "#00FF00");

        prevP = pStart;
        context.strokeStyle = "#FF0000";
        for (var i = 0; i < nSteps; i++) {
            t += step;
            pA = interp(pStart, p0, t);
            pB = interp(p0, p1, t);
            pC = interp(p1, pEnd, t);
            pM = interp(pA, pB, t);
            pN = interp(pB, pC, t);
            thisP = interp(pM, pN, t);

            context.beginPath();
            context.moveTo(prevP.x, prevP.y);
            context.lineTo(thisP.x, thisP.y);
            context.stroke();

            prevP = thisP;
        }
    }

    // Divide the screen horizontally to make these curves
    // quadraticBezier(0, 0, width, height / 2);
    // cubicBezier(0, height / 2, width, height);

    bezierCurve = function (nSteps, degree) {
        // nSteps should be an integer to control how many steps it takes to
        //      increment t from 0 to 1
        // degree should be an integer to control how many control points
        //      the bezier curve has

        var points = [],
            pStart = getPoint(0, 0, width, height),
            pEnd = getPoint(0, 0, width, height),
            t = 0,
            step = 1 / nSteps,
            thesePoints = [],
            prevPoint = pStart,
            thisPoint = null;

        context.fillStyle = "#000000";
        context.strokeStyle = "#FF0000";
        context.fillRect(0, 0, width, height);
        drawPoint(pStart, 15, "#FFFFFF");
        drawPoint(pEnd, 15, "#FFFFFF");

        points.push(pStart);
        // an nth degree bezier curve should have (n - 1) control points
        for (var i = 1; i < degree; i++) {
            var p = getPoint(0, 0, width, height);
            drawPoint(p, 10, "#00FFFF");
            points.push(p);
        }
        points.push(pEnd);

        for (var i = 0; i < nSteps; i++) {
            t += step;
            thesePoints = points;
            while (thesePoints.length > 1) {
                var newPoints = [];
                for (var j = 1; j < thesePoints.length; j++) {
                    newPoints.push(
                        interp(thesePoints[j - 1], thesePoints[j], t)
                    );
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
    }

    // these things start to get pretty crazy when degree gets big
    // well actually, it kind of just looks like scribbles
    bezierCurve(100, 100);

};
