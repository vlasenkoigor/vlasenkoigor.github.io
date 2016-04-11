/**
 * Sprite
 * @param img
 * @param x
 * @param y
 * @param w
 * @param h
 * @param colls
 * @param rows
 * @param frame
 * @constructor
 */
function Sprite(img, x, y, w, h, colls,rows, frame){

    this.setPosition(x, y);
    this.img = loader.getFile(img);
    this.width = w;
    this.height = h;
    this.angle = 0;
    this.rows = rows || 1;
    this.colls = colls || 1;
    this.frame = frame || 0;
}

Sprite.prototype.draw = function(ctx){
    if (this.img)
    {
        ctx.save();
        //ctx.translate(this.x, this.y);
        //ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.img,this.frame * this.img.width / this.colls , 0, this.img.width / this.colls, this.img.height / this.rows, this.x, this.y, this.width, this.height);
        //ctx.drawImage(this.img,this.frame * this.img.width / this.colls , 0, this.img.width / this.colls, this.img.height / this.rows, -(this.width/2), -(this.height/2), this.width, this.height);
        //ctx.restore();
    } else {
        ctx.fillStyle = "#9C0B10";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

};

Sprite.prototype.update = function(dt){};

Sprite.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = game.transformCoordinates(y);
};


/**
 * Hero
 */
function Hero(){
    Sprite.apply(this, arguments);
    this.state = "idle";
    this.startActionTime = 0;
    this.speed = 800;
    this.startActionState = {};
}

Hero.prototype =  Object.create(Sprite.prototype);

Hero.prototype.update = function(dt){
    if (this.state == "jumping")
    {
        var t = (stage.time - this.startActionTime) / 1000,
            Y = game.transformCoordinates(this.startActionState.y),
            V = this.speed,
            g = 2500,
            v = V - g*t;
        this.angle = v > v/V/2 ? v/V * -25 :  v/V/4 * -90;
        this.y = game.transformCoordinates(Y + V * t - g * Math.pow(t,2)/2);

        if (game.transformCoordinates(this.y) < 100 + this.height*0.5){
            this.y = game.transformCoordinates(100 + this.height*0.5);
            this.state =  "dead";
            game.gameover();
        }
    }
};

Hero.prototype.draw = function(ctx){
    if (this.img)
    {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.img,this.frame * this.img.width / this.colls , 0, this.img.width / this.colls, this.img.height / this.rows, 0, 0, this.width, this.height);
        ctx.restore();
    } else {
        ctx.fillStyle = "#9C0B10";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
};

Hero.prototype.act = function(time){
    this.startActionTime = time;
    this.startActionState = {y : this.y}
};

Hero.prototype.jump = function(){
    this.act(stage.time);
    this.state = "jumping";
};

/**
* Background
*/
function Background(img, x, y, width, height){
    Sprite.call(this, img, x, y, width, height);

    this.offset = 0;
}
Background.prototype = Object.create(Sprite.prototype);

Background.prototype.draw = function(ctx){
    ctx.fillStyle = ctx.createPattern(this.img, 'repeat');
    ctx.save();
    ctx.translate(this.offset, this.y);
    ctx.fillRect(-this.offset,0,this.width,this.height);
    ctx.restore();
};


function Tower(){
    Sprite.apply(this, arguments);
}
Tower.prototype = Object.create(Sprite.prototype);

Tower.prototype.speed  = .1;

Tower.prototype.update = function(dt){
    this.x -= dt * this.speed;
};
