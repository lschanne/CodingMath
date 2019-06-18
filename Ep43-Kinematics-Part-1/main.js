window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var angle = 0,
        arm = Arm.create(width / 3, height / 3, 100, angle);
        arm2 = Arm.create(arm.getEndX(), arm.getEndY(), 100, angle);
        arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), 100, angle);
        arm4 = Arm.create(2 * width / 3, 2 * height / 3, 100, angle);
        arm5 = Arm.create(arm4.getEndX(), arm4.getEndY(), 100, angle);
        arm6 = Arm.create(arm5.getEndX(), arm5.getEndY(), 100, angle);
    arm2.parent = arm;
    arm3.parent = arm2;

    update();
    function update() {
        context.clearRect(0, 0, width, height);
        // move the angle
        angle += 0.05;

        // update the arm objects
        arm.angle = Math.sin(angle) * 1.2;
        arm2.angle = Math.cos(angle * 0.873) * 0.92;
        arm3.angle = Math.sin(angle * 1.57) * 1.34;
        arm2.x = arm.getEndX()
        arm2.y = arm.getEndY()
        arm3.x = arm2.getEndX()
        arm3.y = arm2.getEndY()

        arm4.angle = Math.sin(angle * 0.5);
        arm5.angle = Math.cos(angle * 1.0);
        arm6.angle = Math.sin(angle * 1.5);
        arm5.x = arm4.getEndX()
        arm5.y = arm4.getEndY()
        arm6.x = arm5.getEndX()
        arm6.y = arm5.getEndY()

        // render the arms
        arm.render(context);
        arm2.render(context);
        arm3.render(context);
        arm4.render(context);
        arm5.render(context);
        arm6.render(context);

        // keep the party going
        requestAnimationFrame(update);
    }
}