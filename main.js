var game = new Phaser.Game(900, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update }, true);
var sprite;
var cnt = 0,
    img,
    graphics,
    startX = 0,
    startY =0,
    scale = 2,
    rectsPositions = [{x : 40, y : 50}, {x : 110, y : 10}, {x : 230, y : 50}],
    rectsParams = {width : 50, height : 50};
function preload() {

    game.load.image('line', 'line.png');
    game.load.image('bg', 'bg.jpg');

}

function create() {
    startX = 50;//game.world.centerX-200;
    startY = game.world.centerY - 100;

    // game.add.sprite(0, 0, 'line');
    var bmd = game.add.bitmapData(900, 600);
    img = new Phaser.Image(game, 0, 0, "line") ;//game.image(0, 0, 'line');
//    bmd.addToWorld();

    bmd.draw(img, 0, 0);
    //	Put the bitmapData into the cache
    game.cache.addBitmapData('lineBmp', bmd);

    game.add.sprite(0,0,'bg')
    sprite = game.add.sprite(startX,startY, game.cache.getBitmapData('lineBmp'));

    sprite.scale.setTo(2, 2);
    graphics = game.add.graphics(0, 0);

    game.input.onDown.add(addRects, this);

}

function update() {
}
function addRects() {
    var bmd = game.cache.getBitmapData('lineBmp');
    bmd.clear();
    graphics.clear();
    bmd.draw(img, 0, 0);

    rectsPositions.forEach(function (r) {
        clearRect(bmd,r.x, r.y, rectsParams.width, rectsParams.height)
    });



}
function clearRect(bmd, x, y, width, height) {
    bmd.clear(x,y, width, height);

    // draw a rectangle
    graphics.lineStyle(2, 0x000000, 1);
    graphics.drawRect(startX + x * scale, startY + y * scale, width * scale, height * scale);
}