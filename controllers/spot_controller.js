var models = require('../models/models.js');

exports.spots = function(req, res){
	models.Spots.findAll().then(function(spots){
	res.render('spots/index', {spots:spots});	
	});
};

exports.show = function(req, res){
	models.Spots.find(req.params.quizId).then(function(spot){
		res.render('spots/show', {spot:spot});
	});
};
