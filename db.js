var mysql = require('mysql')
var mongoose = require('mongoose');
var util = require('util');
var {MYSQL_CONNECTION_LIMIT,MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE,MONGODB_ID,MONGODB_DATABASE_NAME} = require('./config');

mongoose.connect(MONGODB_ID,{ dbName: MONGODB_DATABASE_NAME, useNewUrlParser: true });

const pool = mysql.createPool({
	connectionLimit:MYSQL_CONNECTION_LIMIT,
	host:MYSQL_HOST,
	user:MYSQL_USER,
	password:MYSQL_PASSWORD,
	database:MYSQL_DATABASE,
})

pool.getConnection((err,connection) => {
	if(err) {
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.log('Database connection was closed')
		}
		if(err.code === 'ER_CON_COUNT_ERROR') {
			console.log('Database has too many connections')
		}
		if(err.code === 'ECONNREFUSED') {
			console.log('Database connection was refused')
		}
	}

	if(connection) connection.release()

	return
})

pool.query = util.promisify(pool.query);


module.exports = pool;
