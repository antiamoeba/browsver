const oldLog = console.log;
console.log = function (message) {
    log(message, "log");
    oldLog.apply(console, arguments);
};
const oldWarn = console.warn;
console.warn = function (message) {
    log(message, "warn");
    oldWarn.apply(console, arguments);
};
const oldError = console.error;
console.error = function (message) {
    log(message, "error");
    oldError.apply(console, arguments);
};
const oldInfo = console.info;
console.info = function (message) {
    log(message, "info");
    oldInfo.apply(console, arguments);
};
var colors = {"log": "white","warn": "#ff9933","error": "#ff0000","info": "#00ff00"};
var log = function(message, type) {
  cons = document.getElementById("consoleText");
  if (cons) {
    var newNode = document.createElement('div');      
    newNode.innerHTML = message;
    newNode.style.color = colors[type];
    cons.appendChild( newNode )
  }
}
startServer = function() {
  text = editor.getValue();
  result = Function(text);
  result();
  socket = io();
  id = "";
  document.getElementById("serverButton").innerHTML = "Refresh";
  socket.on('id', function(socketId){
    id = socketId;
    document.getElementById("link").value = id;
  });
  socket.on('request', function(req){
    var res = {
      _headers: {},
      setHeader: function setHeader (name, value) {
        this._headers[name] = value;
      },
      getHeader: function getHeader (name) {
        return this._headers[name];
      },
      get: function get (name) {
        return this._headers[name];
      }
    }
    if (req.url == '') {
      req.url = '/';
    }
    req.unpipe = function() {};
    req.resume = function() {};
    function endWithFinish (chunk, encoding) {
      const responseOptions = {
        status: res.statusCode || 200,
        headers: {
          'Content-Length': res.get('Content-Length'),
          'Content-Type': res.get('Content-Type')
        }
      }
      if (res.get('Location')) {
        responseOptions.headers.Location = res.get('Location')
      }
      if (res.get('X-Powered-By')) {
        responseOptions.headers['X-Powered-By'] = res.get('X-Powered-By')
      }
      var chunkString = '';
      if (chunk != null) {
        chunkString = chunk.toString();
      }
      var resp = { chunk: chunkString, options: responseOptions };
      socket.emit("response", resp);
    }
    res.end = endWithFinish;
    app(req, res);
  });
}