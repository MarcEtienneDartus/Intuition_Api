var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('./User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var {SECRET_HASH} = require('../config'); // get config file

router.post('/login',(req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, SECRET_HASH, {
      expiresIn: 2419200 // expires in 4 weeks
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });

});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

// router.post('/register', (req, res) => {

//   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
//   console.log(req.body.name)
//   console.log(req.body.email)
//   console.log(hashedPassword)
//   User.create({
//     name : req.body.name,
//     email : req.body.email,
//     password : hashedPassword
//   }, 
//   (err, user) => {
//     if (err) return res.status(500).send("There was a problem registering the user`.");

//     // if user is registered without errors
//     // create a token
//     var token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });

//     res.status(200).send({ auth: true, token: token });
//   });

// });

router.get('/me', VerifyToken, (req, res, next) => {
  res.status(200).send();
});

module.exports = router;