var app = require('./backend/app');
var http = require('http');
var debug = require("debug")("Job-Search-Server");

var port = process.env.PORT || 3898;

app.set('port',port);
var server = http.createServer(app);

server.listen(port);
