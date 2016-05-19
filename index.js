var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
sockets = {};
io.on('connection', function(socket){
	console.log('a user connected');
	var id = socket.id.substring(2);
	sockets[id] = socket;
	socket.emit("id", id);
	socket.on('response', function(response){
		for (key in response.options) {
			resArr[id].set(key, response.options[key]);
		}
		resArr[id].send(response.chunk);
	});
});
app.get('/create', function(req, res){
 	res.sendFile(__dirname + '/public/test.html');
});
var resArr = {};
app.get('/view/:id', function(req, res) {handleRequest(req, res);});
app.post('/view/:id', function(req, res) {handleRequest(req, res);});
app.get('/view/:id/*', function(req, res) {handleRequest(req, res);});
app.post('/view/:id/*', function(req, res) {handleRequest(req, res);});
function handleRequest(req, res) {
	var id = req.params.id;
	var socket = sockets[id];
	var request = {
		url: req.url.substring(6 + id.length),
		method: req.method,
		body: req.body,
		headers: req.headers,
		connection: {
			remoteAddress: '::1'
		}
	}
	socket.emit("request", request);
	resArr[id] = res;
}
var port = process.env.PORT || 3000;
http.listen(port, function(){
	console.log('listening on *:'+port);
});