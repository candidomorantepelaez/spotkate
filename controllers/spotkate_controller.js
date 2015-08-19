var models = require('../models/models.js');

exports.index = function(req, res){
	res.render('index');
}

exports.spots = function(req, res){
	models.Spots.findAll().then(function(spot){
	res.render('spots/index', {spots:spot[0].nombre});	
	})
};

exports.shops = function(req, res){
	res.render('shops/index');
};

exports.maps = function(req, res){
	res.render('maps/index');
}