function Tile(postion, value){
    this.x  = postion.x;
    this.y  = postion.y;
    this.value  = value || 2;

    this.previousPosition = null;
    this.mergedFrom = null;
}

Tile.prototype.savePosition = function () {
    this.previousPosition = {x: this.x, y: this.y};
};

Tile.prototype.updatePosition = function (position) {
    this.x = position.x;
    this.y = postion.y;
};

Tile.prototype.seralize = funtion () {
    return{
        position: {
            x: this.x,
            y: this.y
        },
        value: this.value
};
};