function Loader(){
    this.counter = 0;
    this.queue = [];
    this.files = {};
}

Loader.prototype.addFile = function(name){
    this.queue.push(name);
};

Loader.prototype.load = function(){
    this.counter = 0;
    this.next();
};

Loader.prototype.next = function(){
    var that = this,
        src,
        img;

    if (this.counter > this.queue.length-1)
    {
        this.onload();
        return;
    }

    img = new Image();
    src = this.queue[this.counter];
    console.log('src', src, that.counter);
    img.src = src;

    img.onload = function(){
        that.files[src] = img;
        that.counter++;
        that.next();
    };

    img.onerror = function(e){
        throw new Error(e.message)
    }
};

Loader.prototype.getFile = function(name){
    return this.files[name];
};

Loader.prototype.onload = function(){

};

var loader = new Loader();