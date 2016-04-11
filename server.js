/**
 * Created by i.vlasenko on 05.11.2015.
 */
var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8090);

console.log('Server running on port 8090');