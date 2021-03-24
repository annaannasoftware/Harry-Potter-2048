//Wait until the browser is ready to render the game.
window.requestAnimationFrame(function (){
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});