window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        star0 = {
            x: 200,
            y: 200,
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ],
            offsets: [
                { x: 100, y: 0 },
                { x: 40, y: 29 },
                { x: 31, y: 95 },
                { x: -15, y: 48 },
                { x: -81, y: 59 },
                { x: -50, y: 0 },
                { x: -81, y: -59 },
                { x: -15, y: -48 },
                { x: 31, y: -95 },
                { x: 40, y: -29 },
            ],
            color: '#999999',
        },
        star1 = {
            x: 600,
            y: 600,
            points: [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ],
            offsets: [
                { x: 100, y: 0 },
                { x: 40, y: 29 },
                { x: 31, y: 95 },
                { x: -15, y: 48 },
                { x: -81, y: 59 },
                { x: -50, y: 0 },
                { x: -81, y: -59 },
                { x: -15, y: -48 },
                { x: 31, y: -95 },
                { x: 40, y: -29 },
            ],
        };
    function updateStar(star) {
        for(var i = 0; i < star.points.length; i++) {
            star.points[i].x = star.x + star.offsets[i].x;
            star.points[i].y = star.y + star.offsets[i].y;
        }
    }

    function drawStar(star) {
        context.beginPath();
        context.moveTo(star.points[0].x, star.points[0].y);
        for (var i = 1; i < star.points.length; i++) {
            context.lineTo(star.points[i].x, star.points[i].y);
        }
        context.closePath();
        context.fill();
    }

    function checkStarCollision(starA, starB) {
        for (var i = 0; i < starA.points.length; i++) {
            var p0 = starA.points[i],
                p1 = starA.points[(i + 1) % starA.points.length];

            for (var j = 0; j < starB.points.length; j++) {
                var p2 = starB.points[j],
                    p3 = starB.points[(j + 1) % starB.points.length];

                if (segmentIntersect(p0, p1, p2, p3)) {
                    return true;
                }
            }
        }
        return false;
    }

    document.body.addEventListener("mousemove", function(event) {
        star0.x = event.clientX;
        star0.y = event.clientY;

        context.clearRect(0, 0, width, height);
        updateStar(star0);
        updateStar(star1);
        if (checkStarCollision(star0, star1)) {
            // color stars red on collision
            context.fillStyle = "red";
        } else {
            // color black otherwise
            context.fillStyle = "black";
        }
        drawStar(star0);
        drawStar(star1);
    })

    /*
        * So this function will take four points, with p0 and p1 representing
        * two points on one line, and p2 and p3 representing two points on
        * another line. The function will then return the intersection point
        * of the two lines. If the lines are parallel or collinear, the
        * function will return null.
    */
    function lineIntersect(p0, p1, p2, p3) {
        var A1 = p1.y - p0.y,
            B1 = p0.x - p1.x,
            C1 = A1 * p0.x + B1 * p0.y,
            A2 = p3.y - p2.y,
            B2 = p2.x - p3.x,
            C2 = A2 * p2.x + B2 * p2.y,
            denominator = A1 * B2 - A2 * B1;

        if (!denominator) {
            return null;
        }

        return {
            x: (B2 * C1 - B1 * C2) / denominator,
            y: (A1 * C2 - A2 * C1) / denominator,
        }
    }

    /*
        * This function is similar to the above, but for line segments rather
        * than lines. p0 and p1 represent the ends of the first segment.
        * p2 and p3 represent the ends of the second segment.
    */
    function segmentIntersect(p0, p1, p2, p3) {
        var A1 = p1.y - p0.y,
            B1 = p0.x - p1.x,
            C1 = A1 * p0.x + B1 * p0.y,
            A2 = p3.y - p2.y,
            B2 = p2.x - p3.x,
            C2 = A2 * p2.x + B2 * p2.y,
            denominator = A1 * B2 - A2 * B1;

        if (!denominator) {
            return null;
        }

        var intersectX  = (B2 * C1 - B1 * C2) / denominator,
            intersectY = (A1 * C2 - A2 * C1) / denominator,
            rx0 = (intersectX - p0.x) / (p1.x - p0.x),
            ry0 = (intersectY - p0.y) / (p1.y - p0.y),
            rx1 = (intersectX - p2.x) / (p3.x - p2.x),
            ry1 = (intersectY - p2.y) / (p3.y - p2.y);

        if (
            // note that (0 <= rx0 <=1) !=== (0 <= rx0 && rx0 <= 1)
            ((0 <= rx0 && rx0 <= 1) || (0 <= ry0 && ry0 <= 1)) &&
            ((0 <= rx1 && rx1 <= 1) || (0 <= ry1 && ry1 <= 1))
        ) {
            return {
                x: intersectX,
                y: intersectY,
            }
        }
    }
}