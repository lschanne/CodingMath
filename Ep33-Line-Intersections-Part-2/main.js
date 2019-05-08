window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p0 = {
            x: 200,
            y: 100,
        },
        p1 = {
            x: 600,
            y: 100,
        },
        p2 = {
            x: 50,
            y: 50,
        },
        p3 = {
            x: 500,
            y: 500,
        };

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(p1.x, p1.y);
        context.stroke();

        context.beginPath();
        context.moveTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.stroke();

        var pI = segmentIntersect(p0, p1, p2, p3);
        if (pI) {
            context.beginPath();
            context.arc(pI.x, pI.y, 15, 0, Math.PI * 2, false);
            context.stroke();
        }

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