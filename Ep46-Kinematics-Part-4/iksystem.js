var IKSystem = IKSystem || {
    arms: null,
    lastArm: null,
    x: 0,
    y: 0,

    create: function(x, y) {
        var obj = Object.create(this);
        obj.init(x, y);
        return obj;
    },

    init: function(x, y) {
        this.x = x;
        this.y = y;
        this.arms = [];
    },

    addArm: function(length) {
        var arm = Arm.create(0, 0, length, 0);
        arm.parent = this.lastArm;
        this.updateArm(arm);
        this.arms.push(arm);
        this.lastArm = arm;
    },

    render: function(context) {
        for (var i = 0; i < this.arms.length; i++) {
            this.arms[i].render(context);
        }
    },

    drag: function(x, y) {
        this.lastArm.drag(x, y);
    },

    reach: function(x, y) {
        // inverse kinematics
        this.drag(x, y);
        this.update();
    },

    update: function() {
        // forward kinematics
        for (var i = 0; i < this.arms.length; i++) {
            this.updateArm(this.arms[i]);
        }
    },

    updateArm: function(arm) {
        if (arm.parent) {
            arm.x = arm.parent.getEndX();
            arm.y = arm.parent.getEndY();
        } else {
            arm.x = this.x;
            arm.y = this.y;
        }
    },
};
