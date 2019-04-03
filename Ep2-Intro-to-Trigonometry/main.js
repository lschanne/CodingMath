window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // So we need to push down the canvas so that the x-axis isn't at the
    // top of the screen
    context.translate(0, height / 2);

    // Changing the scale of the y-axis will flip the inversion
    // I mention in the notes.txt that on computer screens, the y-axis
    // starts negative at the top of the screen and is positive at the bottom
    context.scale(1, -1);

    // Note that both translate and scale take the x-axis argument first
    // and the y-axis argument second
    // In both we leave the x-axis unchanged

    // print the values of sin(theta) as we move theta from 0 to 2*pi
    for(var theta = 0; theta < Math.PI * 2; theta += .01) {
        // to see these values, you have to inspect element on the page
        // and go to the console log
        console.log(Math.sin(theta));

        // Here we will actually draw the sine curve or sine wave
        var x = theta * 200,
            y = Math.sin(theta) * 200;
        context.fillRect(x, y, 5, 5);
    }
};
