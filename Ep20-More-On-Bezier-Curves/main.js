window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

   
    thruPoint = function() {
        // this function will pick some point on the canvas through which
        // our bezier curve should pass
        // it will then generate a corresponding quadratic bezier curve

        var thruPoint = getPoint(0, 0, width, height),
            pStart = getPoint(0, 0, width, height),
            pEnd = getPoint(0, 0, width, height),
            pCtrl = {
                x: thruPoint.x * 2 - (pStart.x + pEnd.x) / 2,
                y: thruPoint.y * 2 - (pStart.y + pEnd.y) / 2
            };

        // note that sometimes the control point will not be visible on the
        // canvas because we have not limited where the thruPoint may be placed
        // therefore, the control point may have to be off the visible bounds
        // of the screen in order to get the curve to run through the desired
        // point
        bezierCurve(context, 0, 0, width, height,
            {controlPoints: [pCtrl], pStart: pStart, pEnd: pEnd});
        drawPoint(context, thruPoint, 10, "#FF0000");
    };

    randomBezier = function() {
        // plot a random bezier curve with a degree between 1 and 10, inclusive
        bezierCurve(context, 0, 0, width, height,
            {degree: Math.floor(Math.random() * 9 + 1)});
    };

    //thruPoint();
    //randomBezier();
    testBezier(context, width, height); // this is coming from the directCopies.js file

};
