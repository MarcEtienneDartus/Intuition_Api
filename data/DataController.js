var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var pool = require('../db');
var VerifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/:type', VerifyToken, async (req, res) => {
	let sql = req.params.type =='deal' ? 'Select SocieteId,NomSociete,CA,Activite,TypeActionnariat,Intermediaire from deal' : 'Select MillesimeId,NomParticipation,CA,Description,MaisonGestion,TypePosition from millesime'
	listWildCard = []
	let initAnd = false
	if(req.body.secteur != null || req.body.activite != null) sql += ' where'
	if(req.body.secteur != null){ 
		sql += ' Secteur=?'
		listWildCard.push(req.body.secteur)
		initAnd = true
	}
	if(req.body.activite != null){ 
		if(initAnd) sql += ' and'
		sql += req.params.type =='deal' ? ' Activite like ?' : '  Description like ?'
		listWildCard.push(req.body.activite)
		initAnd = true
	}
	try{
		var result = await pool.query(sql,listWildCard)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});

router.get('/:type/:id', VerifyToken, async (req, res) => {
	try{
		sql = req.params.type =="deal"?'Select * from deal where SocieteId = ?':'Select * from millesime where MillesimeId = ?'
		var result = await pool.query(sql,req.params.id)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});

router.post('/:type/listId', VerifyToken, async (req, res) => {
	let sql = req.params.type =="deal"?'Select * from deal where':'Select * from millesime where'
	let listWildCard = req.body.listSocieteId
	let initOr = false
	listWildCard.forEach(item => {
		if(initOr) sql += ' or'
		sql += req.params.type =="deal"?' SocieteId = ?':' MillesimeId = ?'
		initOr = true
	});
	try{
		var result = await pool.query(sql,listWildCard)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});

// router.get('/:type/distinct/:champ', VerifyToken, async (req, res) => {
// 	try{
// 		var sql = 'Select distinct('+req.params.champ+') from '+req.params.type
// 		var result = await pool.query(sql)
// 		res.status(200).send(result);
// 	} catch(err) {
// 		res.status(500).send(err);
// 	}
// });

router.get('/header/distinct/Secteur', VerifyToken, async (req, res) => {
	try{
		var sql = 'select distinct(Secteur) from deal union select Distinct(Secteur) from millesime'
		var result = await pool.query(sql)
		res.status(200).send(result);
	} catch(err) {
		res.status(500).send(err);
	}
});




module.exports = router;
