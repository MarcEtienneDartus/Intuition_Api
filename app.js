var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var {MYSQL_CONNECTION_LIMIT,MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE} = require('./config');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/api', (req, res) => {
  res.status(200).send('API works.'+MYSQL_CONNECTION_LIMIT+MYSQL_HOST+MYSQL_USER+MYSQL_PASSWORD+MYSQL_DATABASE);
});

var corsOptions = {
  origin: ['https://intuition-gt.firebaseapp.com','http://localhost:3000','http://localhost'],
  credentials:true,
  // preflightContinue: true,
  // optionsSuccessStatus: 204,
  // methods: ['GET','POST','OPTIONS'],
  // allowedHeaders:['Content-Type', 'x-access-token']
}

var DataController = require('./data/DataController');
app.use('/api/data', cors(corsOptions), DataController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', cors(corsOptions), AuthController);

module.exports = app;
