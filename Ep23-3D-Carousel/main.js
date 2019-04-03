window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        fl = 300,
        cards = [],
        numCards = 7
        centerZ = 1000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0,
        colors = [
            "#000000",
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF"
        ]

    for (var i = 0; i < numCards; i++) {
        var card = {
            angle: Math.PI * 2 * i / numCards,
            y: 0,
            c: colors[i%colors.length]
        }
        card.x = Math.cos(card.angle + baseAngle) * radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
        cards.push(card);
    }

    context.translate(width/2, height/2);

    // control the spinning of the carousel with the mouse x position
    document.body.addEventListener("mousemove", function (event) {
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
    });

    update();

    function update() {
        context.clearRect(-width/2, -height/2, width, height);

        baseAngle += rotationSpeed;
        cards.sort(zsort);

        for (var i = 0; i < numCards; i++) {
            var card = cards[i],
                perspective = fl / (fl + card.z);

            context.save();
            // by scaling the context *before* we translate, we avoid having
            // to scale the translation as well
            // just a small little optimization
            context.scale(
                perspective,
                perspective
            );
            context.translate(
                card.x,
                card.y
            );
            context.fillStyle = card.c;
            context.fillRect(-100, -100, 200, 200);
            context.restore();

            card.x = Math.cos(card.angle + baseAngle) * radius;
            card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
        }

        requestAnimationFrame(update);
    }

    function zsort(cardA, cardB) {
        return cardB.z - cardA.z;
    }
}