window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var iksystem = IKSystem.create(width / 2, height / 2);
    for (var i = 0; i < 20; i++) {
        iksystem.addArm(20);
        iksystem.addArm(20);
        iksystem.addArm(20);
    }

    document.body.addEventListener("mousemove", function (event) {
        iksystem.drag(event.clientX, event.clientY);
    });

    update();
    function update() {
        context.clearRect(0, 0, width, height);

        iksystem.render(context);

        // keep the party going
        requestAnimationFrame(update);
    }
}