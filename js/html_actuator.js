function HTMLActuator () {
    this.tileContainer = document.querySelector (".tile-container");
    this.scoreContainer = document.querySelector (".score-container");
    this.bestContainer = document.querySelector (".best-container");
    this.messageContainer = document.querySelector (".game-message");
    this.sharingContainer = document.querySelector(".score-sharing");

    this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
    var self = this;

    window.requestAnimationFrame (function () {
        self.clearContainer (self.tileContainer);

        grid.cells.forEach (function (column) {
            column.forEach (function (cell) {
                if (cell) {
                    self.addTile (cell);
                }
            });
        });

        self.updateScore (metadata.score);
        self.updateBestScore (metadata.bestScore);
        
        if (metadata.terminated) {
            if (metadata.over) {
                self.message (false);
            } else if (metadata.won) {
                self.message (true);
            }
        }

    });
};

//continue the game
HTMLActuator.prototype.continueGame = function () {
    if (typeof ga !=="undefined") {
        ga ("send", "event", "game", "restart");
    }
    this.clearMessage ();
};

HTMLActuator.prototype.clearContainer = function (container) {
    while (container.firstChild) {
        container.removeChild (container.firstChild);
    }
};

HTMLActuator.prototype.addTile = function (tile) {
    var valueMap = {
        2 : 'HarryPotter',
        4 : 'HermioneGranger',
        8 : 'RonWeasley',
        16 : 'WeasleyFamily',
        32 : 'NevilleLongbottom',
        64 : 'LunaLovegood',
        128 : 'LupinAndTonks',
        256 : 'SiriusBlack',
        512 : 'Potters',
        1024 : 'LordVoldemort',
        2048 : 'AlbusDumbledore'

    }
    var self = this;

    var wrapper = document.createElement ("div");
    var inner = document.createElement ("div");

    var position = tile.previousPosition || {x : tile.x, y : tile.y};
    var positionClass = this.positionClass (position);

    //we can't use class list
    var classes = ["tile", "tile-" + tile.value, positionClass];

    if (tile.value > 2048) classes.push ("tile-super");

    this.applyClasses (wrapper, classes);

    inner.classList.add ("tile-inner");

    inner.textContent = valueMap [tile.value];
    
    if (tile.previousPosition) {
        //make sure that the tile gets rendered in the previous postion first
        window.requestAnimationFrame (function () {
            classes [2] = self.positionClass ( {x : tile.x, y : tile.y});
            self.applyClasses (wrapper, classes); //update the position
        });
    } else if (tile.mergedFrom) {
        classes.push ("tile-merged");
        this.applyClasses (wrapper, classes);

        //render the tiles that merged
        tile.mergedFrom.forEach (function (merged) {
            self.addTile (merged);
        });
    } else {
        classes.push ("tile-new");