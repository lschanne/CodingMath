window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // this line would just make the whole canvas black
    // context.fillRect(0, 0, width, height);

    // draw 100 random lines on the screen
    for(var i = 0; i < 100; i += 1) {
        context.beginPath();

        // get the starting point of the line
        context.moveTo(Math.random() * width, Math.random() * height);

        // get the ending point of the line
        context.lineTo(Math.random() * width, Math.random() * height);

        // color in the line
        context.stroke();
    }
};
