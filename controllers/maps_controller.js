var models = require('../models/models.js');

exports.maps = function(req, res){
	res.render('maps/index', {errors:[]});    
};
exports.spots = function(req, res){
	models.Spots.findAll().then(function(datos){
		res.send(datos);
	});
};