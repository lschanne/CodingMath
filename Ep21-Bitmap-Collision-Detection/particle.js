var particle = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: 1,
    radius: 0,
    bounce: -1,
    friction: 1,
    gravity: 0,
    springs: null,
    gravitations: null,

    create: function(x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.vx = Math.cos(direction) * speed;
        obj.vy = Math.sin(direction) * speed;
        obj.gravity = grav || 0;
        obj.springs = [];
        obj.gravitations = [];
        return obj;
    },

    accelerate: function(ax, ay) {
        this.vx += ax;
        this.vy += ay;
    },

    update: function() {
        this.handleSprings();
        this.handleGravitations();
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    },

    angleTo: function(p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    },

    distanceTo: function(p2) {
        var dx = p2.x - this.x,
            dy = p2.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    },

    gravitateTo: function(p2) {
        var dist = this.distanceTo(p2),
            theta = this.angleTo(p2),
            grav = p2.mass / (dist * dist);

        this.vx += grav * Math.cos(theta);
        this.vy += grav * Math.sin(theta);
    },

    getSpeed: function() {
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    },

    getHeading: function() {
        return Math.atan2(this.vy, this.vx);
    },

    setSpeed: function(speed) {
        var heading = this.getHeading();
        this.vx = speed * Math.cos(heading);
        this.vy = speed * Math.sin(heading);
    },

    setHeading: function(heading) {
        var speed = this.getSpeed();
        this.vx = speed * Math.cos(heading);
        this.vy = speed * Math.sin(heading);
    },

    springTo: function(point, k, length) {
        var dx = point.x - this.x,
            dy = point.y - this.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            delta = k * (dist - length || 0);

        this.vx += dx * delta / dist;
        this.vy += dy * delta / dist;
    },

    addSpring: function(point, k, length) {
        // just to be sure that there are no two springs at the same point
        this.removeSpring(point);
        // of course, that call is quite inefficient if you have a large
        // number of springs; especially if the point doesn't actually exist

        // maybe we should consider creating a spring object, but meh
        this.springs.push({
            point: point,
            k: k,
            length: length || 0
        });
    },

    // note that the sping removal relies on there only being one possible
    // spring with that point, which probably doesn't matter
    // why would you want two springs at the same point acting on the same
    // particle object? idkmybffjill
    removeSpring: function(point) {
        for (var i = 0; i < this.springs.length; i += 1) {
            if (point === this.springs[i].point) {
                this.springs.splice(i, 1);
                return;
            }
        }
    },

    handleSprings: function() {
        for (var i = 0; i < this.springs.length; i += 1) {
            var spring = this.springs[i];
            this.springTo(
                spring.point,
                spring.k,
                spring.length
            );
        }
    },

    addGravitation: function(p) {
        this.removeGravitation(p);
        this.gravitations.push(p);
    },

    removeGravitation: function(p) {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            if (p === this.gravitations[i]) {
                this.gravitations.splice(i, 1);
                return;
            }
        }
    },

    handleGravitations: function() {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            this.gravitateTo(this.gravitations[i]);
        }
    }
};
