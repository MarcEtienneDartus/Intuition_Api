var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var pool = require('../db');
var VerifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', VerifyToken, async (req, res) => {
	let sql = 'Select SocieteId,NomSociete,CA,Ebitda,Intermediaire,Localisation from deal'
	listWildCard = []
	let initAnd = false
	if(req.body.secteur != null || req.body.annee != null || req.body.localisation != null) sql += ' where'
	if(req.body.secteur != null){ 
		sql += ' Secteur=?'
		listWildCard.push(req.body.secteur)
		initAnd = true
	}
	if(req.body.annee != null){ 
		if(initAnd) sql += ' and'
		sql += ' DateSaisie like ?'
		listWildCard.push(req.body.annee)
		initAnd = true
	}
	if(req.body.localisation != null) {
		if(initAnd) sql += ' and'
		sql += ' Localisation= ?'
		listWildCard.push(req.body.localisation)
	}
	try{
		var result = await pool.query(sql,listWildCard)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});

router.get('/:id', VerifyToken, async (req, res) => {
	try{
		var result = await pool.query('Select * from deal where SocieteId = ?',req.params.id)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});

router.post('/listId', VerifyToken, async (req, res) => {
	let sql = 'Select * from deal where'
	let listWildCard = req.body.listSocieteId
	let initOr = false
	listWildCard.forEach(item => {
		if(initOr) sql += ' or'
		sql += ' SocieteId = ?'
		initOr = true
	});
	try{
		var result = await pool.query(sql,listWildCard)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});

router.get('/distinct/:champ', VerifyToken, async (req, res) => {
	try{
		var sql = 'Select distinct('+req.params.champ+') from deal'
		var result = await pool.query(sql)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});




module.exports = router;
