var stage = {},
    hero,
    ground,
    bg,
    game,
    towers = [];

loader.addFile("hero.png");
loader.addFile("ground.png");
loader.addFile("bg.png");
loader.addFile("tower.png");
loader.load();

loader.onload = function(){
    bg = new Background("bg.png",0,480,300,384);
    hero = new Hero("hero.png", 50, 400, 40, 28);
    ground = new Background("ground.png",0,100,300,100);
    game.start();
};


stage.canvas = document.getElementById("stage");
stage.ctx = stage.canvas.getContext("2d");
stage.loop = function (){
    stage.time = + new Date();
    game.draw(stage.ctx);
    game.update(stage.time - stage.lastTime);
    stage.lastTime = stage.time;
    requestAnimationFrame(stage.loop);
};


function Game(){
    this.state = "playing"; //start, playing, gameover
}
Game.prototype.start = function(){
    stage.time = +new Date();
    stage.lastTime = + new Date();
    this.addTower();
    stage.loop();

};
Game.prototype.draw = function(ctx){

    ctx.clearRect(0,0,stage.canvas.width, stage.canvas.height);
    bg.draw(ctx);

    for (var i = 0, len = towers.length; i < len; i++)
    {
        var tower = towers[i];
        tower.draw(ctx);
    }
    ground.draw(ctx);
    hero.draw(ctx);
};

Game.prototype.update = function(dt){
    if (this.state != "playing")
    {
        return;
    }

    hero.update(dt);


    if (towers.length && towers[towers.length - 1].x < stage.canvas.width - 100)
    {
       this.addTower();
    }
    for (var i = 0, len = towers.length; i < len; i++)
    {
        var tower = towers[i];
            tower.update(dt);
    }

    ground.offset  += - dt * 0.03;
    bg.offset  += - dt * 0.01;
};

Game.prototype.transformCoordinates = function(y){
    return stage.canvas.height - y;
};

Game.prototype.addTower = function(){
    var rand1 = Math.random();
    var min = 70;
    var max = 300;
    var rand2 = min + Math.round((rand1/10)*10)* (max-min);
    var gapSize = 50;


    towers.push(new Tower("tower.png", stage.canvas.width + 100, rand2, 54, 319, 2, 1, 1));
    //towers.push(new Tower("tower.png", stage.canvas.width + 100, 319 - rand2 - gapSize , 54, 319, 2, 1, 0))
    console.log(rand2, towers.length)
};

Game.prototype.gameover = function()
{
    this.state = "gameover";

};
game = new Game();

document.onclick = function(){
    hero.jump();
};

stage.canvas.onclick = function (e) {
    console.log(e, e.clientX, e.clientX)
}