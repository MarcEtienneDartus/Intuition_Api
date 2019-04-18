var app = require('./app');
var http = require('http');
var https = require('https');
const fs = require("fs");

var privateKey  = fs.readFileSync('./sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80,function() {
  console.log('Express server listening on port ' + 80);
});

httpsServer.listen(443,function() {
  console.log('Express server listening on port ' + 443);
});
