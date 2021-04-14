function KeyboardInputManager () {
    this.events = {};

    if (window.navigator.msPointerEnabled) {
        // Internet explorer 10 style
        this.eventTouchstart = "MSPointerDown";
        