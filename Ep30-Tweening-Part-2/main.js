window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        tweeningMethod,
        x = 100,
        y = 100,
        start = {},
        target = {},
        change = {},
        startTime,
        duration = 1000; // milliseconds

        drawCircle(start.x, start.y);

        document.body.addEventListener("click", function(event) {
            if (event.ctrlKey && event.shiftKey) {
                tweeningMethod = easeInOutQuad;
            } else if (event.ctrlKey) {
                tweeningMethod = easeInQuad;
            } else if (event.shiftKey) {
                tweeningMethod = easeOutQuad;
            } else {
                tweeningMethod = linearTween;
            }
            start.x = x;
            start.y = y;
            target.x = event.clientX;
            target.y = event.clientY;
            change.x = target.x - start.x;
            change.y = target.y - start.y;
            startTime = new Date();
            update();
        });

        function update() {
            context.clearRect(0, 0, width, height);

            var time = new Date() - startTime;
            if (time < duration) {
                x = tweeningMethod(time, start.x, change.x, duration);
                y = tweeningMethod(time, start.y, change.y, duration);
                drawCircle(x, y);
                requestAnimationFrame(update);
            } else {
                drawCircle(target.x, target.y);
                start.x = target.x;
                start.y = target.y;
            }
        }

        function drawCircle(x, y) {
            context.beginPath();
            context.arc(x, y, 20, 0, Math.PI * 2, false);
            context.fill();
        }

        function linearTween(t, b, c, d) {
            return c * t / d + b;
        }

        // Quadratic easing in - accelerating from zero velocity
        // t: current time, b: beginning value, c: change in value, d: duration
        // t and d can be in frames or seconds/milliseconds
        function easeInQuad(t, b, c, d) {
            return c*(t/=d)*t + b;
        }

        // quadratic easing out - decelerating to zero velocity
        function easeOutQuad(t, b, c, d) {
            return -c*(t/=d)*(t-2) + b;
        }

        // quadratic easing in/out:
        // acceleration until halfway, then decelaration
        function easeInOutQuad(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) -1) + b;
        }
}