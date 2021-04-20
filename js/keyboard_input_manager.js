function KeyboardInputManager () {
    this.events = {};

    if (window.navigator.msPointerEnabled) {
        // Internet explorer 10 style
        this.eventTouchstart = "MSPointerDown";
        this.eventTouchmove = "MSPointerMove";
        this.eventTouchend = "MSPointerUp";
    } else {
        this.eventTouchstart = "touchstart";
        this.eventTouchmove = "touchmove";
        this.eventTouchend = "touchend";
    }

    this.listen (); 
}

KeyboardInputManager.prototype.on = function (event, callback) {
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
    var callbacks = this.events[event];
    if (callbacks) {
        callbacks.forEach (function (callback) { 
             callback (data);
        });
    }
};

KeyboardInputManager.prototype.listen = function () {
    var self = this;

    var map = {
        38: 0, //up
        39: 1, //right
        40: 2, //down
        37: 3, //left
        75: 0, //vim up
        76: 1, //vim right
        74: 2, //vim down
        72: 3, //vim left
        87: 0, //w
        68: 1, //d
        83: 2, //s
        65: 3 //a
    };

    //respond to direction keys
    document.addEventListener ("keydown", function (event) {
        var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                        event.shiftKey;
        var mapped = map [event.which];

    //ignore the event if its happening in a text field
    if  (self.targetIsInput(event)) return;
    
    if (!modifiers) {
        if (mapped !==  undefined) {
            event.preventDefault (); 
            self.emit ("move", mapped);
        }
    }

    //R key restarts the game
    if (!modifiers && event.which === 82) {
        self.restart.call (self, event);
    }
});

//respond to button presses
this.bindButtonPress (".retry-button", this.restart);
this.bindButtonPress (".restart-button", this. restart);


//respond to swipe events
var touchStartClientX, touchStartClientY;
var gameContainer = document.getElementsByClassName ("game-container") [0];

gameContainer.addEventListener (this.eventTouchstart, function(event) {
    if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
    event.TargetTouches > 1 || 
    self.targetIsInput (event)) {
        return;
    }

    if