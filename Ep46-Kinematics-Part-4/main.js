window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var iks1 = IKSystem.create(250, height);
    iks1.addArm(240);
    iks1.addArm(180);
    iks1.addArm(120);

    var iks2 = IKSystem.create(width - 250, height);
    iks2.addArm(240);
    iks2.addArm(180);
    iks2.addArm(120);

    var ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 0,
        radius: 20,
        gravity: 0.25,
        bounce: -1,
        update: function() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            if (this.x + this.radius > width) {
                this.x = width - this.radius;
                this.vx *= this.bounce;
            } else if (this.x < this.radius) {
                this.x = this.radius;
                this.vx *= this.bounce;
            }
            if (this.y + this.radius > height) {
                this.y = height - this.radius;
                this.vy *= this.bounce;
            } else if (this.y < this.radius) {
                this.y = this.radius;
                this.vy *= this.bounce;
            }
        },
        render: function(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
        }
    }

    update();
    function update() {
        context.clearRect(0, 0, width, height);

        ball.update();
        ball.render(context);

        iks1.reach(ball.x, ball.y);
        iks2.reach(ball.x, ball.y);

        iks1.render(context);
        iks2.render(context);

        // keep the party going
        requestAnimationFrame(update);
    }
}