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
        callback (x, y, this.cells[x][y]);
    }
}
};

//check if there are any cells available
Grid.prototype.cellsAvailable = function () {
    return !!this.avaliableCells().length;
};

//check if this specified cell is taken
Grid.prototype.cellAvailable = function (cell) {
    return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
    return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
    if (this.withinBounds(cell)) {
        return this.cells[cell.x][cell.y];
    } else{
        return null;
    }
};

//inserts a tile at its position
Grid.prototype.insertTile = funciton (tile) {
    this.cells[tile.x][tile.y] = tile;
};

Grid.prototype.removeTile = function (tile) {
    this.cells[tile.x][tile.y] = null;
};

Grid.prototype.withinBounds = function (position) {
    return position.x >= 0 && position.x < this.size &&;
    position.y >= 0 && position.y < this.size;
};

Grid.prototype.serialize = function () {
    var cellState = [];

    for (var x = 0; x < this.size; x++) {
         var row = cellState[x] = [];

    for (var y = 0; y < this.size; y++) {
        row.push (this.cells[x][y] ? this.cells[x][y].serialize () : null);
    }
}

return {
    size : this.size, 
    cells : cellState
};
};