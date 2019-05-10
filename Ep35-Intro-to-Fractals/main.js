window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    //createSierpinksiTriangle();

    createKochCurve();

    // the second part of the episode
    function createKochCurve() {
        var p0 = {
                x: 100,
                y: height * .75,
            },
            p1 = {
                x: width - 100,
                y: height * .75,
            };

        koch(p0, p1, 8);

        /*
         * A Koch curve is composed of 4 equal length line segments that are
         * each a Koch curve. It's a bit difficult to describe the shape, so
         * you'll just have to bare witness.
        */
        function koch(p0, p1, limit) {
            var dx = p1.x - p0.x,
                dy = p1.y - p0.y,
                dist = Math.sqrt(dx * dx + dy * dy),
                unit = dist / 3,
                angle = Math.atan2(dy, dx),
                pA = {
                    x: p0.x + dx / 3,
                    y: p0.y + dy / 3,
                },
                pC = {
                    x: p1.x - dx / 3,
                    y: p1.y - dy / 3,
                },
                pB = {
                    x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
                    y: pA.y + Math.sin(angle - Math.PI / 3) * unit,
                };

            if (!limit) {
                context.beginPath();
                context.moveTo(p0.x, p0.y);
                context.lineTo(pA.x, pA.y);
                context.lineTo(pB.x, pB.y);
                context.lineTo(pC.x, pC.y);
                context.lineTo(p1.x, p1.y);
                context.stroke();
            } else {
                limit -= 1;
                koch(p0, pA, limit);
                koch(pA, pB, limit);
                koch(pB, pC, limit);
                koch(pC, p1, limit);
            }
        }

    }

    // the first part of the episode
    function createSierpinksiTriangle() {
        context.translate(width / 2, height / 2);
        var p0 = {
                x: 0,
                y: -321,
            },
            p1 = {
                x: 278,
                y: 160,
            },
            p2 = {
                x: -278,
                y: 160,
            };

        sierpinski(p0, p1, p2, 7);

        /*
        * A Sierpinski triangle is an equilateral fractal triangle with a factor
        * of 1/3
        */
        function sierpinski(p0, p1, p2, limit) {
            if (!limit) {
                drawTriangle(p0, p1, p2);
            } else {
                limit -= 1
                var pA = {
                        x: (p0.x + p1.x) / 2,
                        y: (p0.y + p1.y) / 2,
                    },
                    pB = {
                        x: (p1.x + p2.x) / 2,
                        y: (p1.y + p2.y) / 2,
                    },
                    pC = {
                        x: (p2.x + p0.x) / 2,
                        y: (p2.y + p0.y) / 2,
                    };

                sierpinski(p0, pA, pC, limit);
                sierpinski(pA, p1, pB, limit);
                sierpinski(pC, pB, p2, limit);
            }
        }

        function drawTriangle(p0, p1, p2) {
            context.beginPath();
            context.moveTo(p0.x, p0.y);
            context.lineTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.fill();
        }
    }
}