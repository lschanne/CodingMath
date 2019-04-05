window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ball = {
            x: 100,
            y: 100,
            alpha: 1
        };

        tween(
            ball, {x: 500, y: 200, alpha: 0}, 1000,
            easeInOutQuad, render, tweenBack
        );

        function tweenBack() {
            tween(
                ball, {x: 100, y: 100, alpha: 1}, 1000,
                easeInOutQuad, render, render
            )
        }

        function render() {
            context.clearRect(0, 0, width, height);
            context.globalAlpha = ball.alpha;
            context.beginPath();
            context.arc(ball.x, ball.y, 20, 0, Math.PI * 2, false);
            context.fill();
        }

        /*
         * obj: the object to be tweened
         * targetProperties: object containing properties of `obj` that are to
         *                   be tweened; the values of those properties in
         *                   `targetProperties` are the target values
         * duration: time in milliseconds of the full tween
         * easingFunc: standard tweening function from tween.js to be used
         *             to perform the actual tweening
         * onProgress: function to be called while the tween is in progress
         * onComplete: function to be called once the tween is finished
        */
        function tween(
            obj,
            targetProperties,
            duration,
            easingFunc,
            onProgress,
            onComplete
        ) {
            var starts = {},
                changes = {},
                startTime = new Date();

            for (var prop in targetProperties) {
                starts[prop] = obj[prop];
                changes[prop] =  targetProperties[prop] - starts[prop];
            }

            update();

            function update() {
                var time = new Date() - startTime,
                    keepGoing = true;

                if (time >= duration) {
                    keepGoing = false;
                    time = duration;
                }

                for (var prop in targetProperties) {
                    obj[prop] = easingFunc(
                        time, starts[prop], changes[prop], duration
                    );
                }

                if (keepGoing) {
                    onProgress();
                    requestAnimationFrame(update);
                } else {
                    onComplete();
                }
            }
        }
}