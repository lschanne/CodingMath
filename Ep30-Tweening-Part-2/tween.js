// For all of these tweening functions:
// t: current time, b: beginning value, c: change in value, d: duration
// t and d can be in frames or seconds/milliseconds

// Linear tween - constant velocity from start to end points
function linearTween(t, b, c, d) {
    return c * t / d + b;
}

// Quadratic easing in - accelerating from zero velocity
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