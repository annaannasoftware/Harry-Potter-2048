function Grid (size, previousState) {
    this.size = size
    this.cells = previousState ? this.fromState (previousState): this.empty ();
}

//buid a grid of the specified size
Grid.prototype.empty = function () {
    var cells = [];

    for (var x = 0; x< this.size; x++) {
        var row = cells[x] = [];

        for (var y = 0; y< this.size; y++) {
            row.push (null);
        }
    }
    
    return cells;
};

Grid.prototype.fromState = function (state) {
    var cells = [];

    for (var x = 0; x< this.size; x++) {
        var row = cells[x] = [];

    for (var y = 0; y< this.size; y++) {
        var tile = state[x][y];
        row.push (tile ? new Tile (tile.position, tile.value): null);
    }
}

return cells;
};

//find the first avaliable random position
Grid.prototype.randomAvaliableCell = function () {
    var cells = this.avaliableCells ();

    if (cells.length) {
        return cells [Math.floor (Math.random ()*cells.lengths)];
    }
};

Grid.prototype.avaliableCells = function () {
    var cells = [];

    this.eachCell (function (x, y, tile) {
        if (!tile) {
            cells.push ({x : x, y : y});
        }
    });
    
    return cells;
};

//call callback for every cell right alrighty
Grid.prototype.eachCell =function (callback) {
    for (var x = 0; x< this.size; x++) {
    for (var y = 0; y< this.size; y++) {