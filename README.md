# Intuiton

Intuition is a web full stack app for displaying and searching futur company that will be sold

This project is in 2 part: Front End and Back End<br>
- [Intuition_Api](https://github.com/MarcEtienneDartus/Intuition_Api)<br>
- [Intuition_React](https://github.com/MarcEtienneDartus/Intuition_React)

# Intuiton Api

## Installation
```git
git clone https://github.com/MarcEtienneDartus/Intuition_Api.git
```

## Requirements

#### Mongodb

For security reason, I didn't put the authentification table in the same database. I created a free monongodb databse to store all thoses data. <br> The advantage is that we can secure the connection by IP address


#### dev.env & prod.env

Create 2 files for configuration: <b>dev.env</b> and <b>prod.env</b>

```
MONGODB_ID = ''
MONGODB_DATABASE_NAME = ''

MYSQL_CONNECTION_LIMIT = 
MYSQL_HOST = ''
MYSQL_USER = ''
MYSQL_PASSWORD = ''
MYSQL_DATABASE = ''

SECRET_HASH =  ''
```

##### Exemple config for the env file

```
MONGODB_ID = 'mongodb+srv://test:iuhgf8Ldn8reQ@test-dozn.mongodb.net'
MONGODB_DATABASE_NAME = 'Auth'

MYSQL_CONNECTION_LIMIT = 10
MYSQL_HOST = 'db'
MYSQL_USER = 'api'
MYSQL_PASSWORD = 'password'
MYSQL_DATABASE = 'Intuition'

SECRET_HASH =  'T$vFvQ>Zk3_HMy&v9ftmDz>_7EM<zTP3vr7WT&wyr#(dR'
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production mode.<br>
you can acess it with http or https.
- [http://localhost](http://localhost)
- [https://localhost](https://localhost)

### `npm dev`

Runs the app in the development mode.<br>
you can acess it with http or https.
- [http://localhost](http://localhost)
- [https://localhost](https://localhost)

You can modify the code, the app will restart automaticly with the modification.

### `npm test`

Launches the test runner in the interactive watch mode.<br> It use [mocha](https://mochajs.org) for the testing part.
