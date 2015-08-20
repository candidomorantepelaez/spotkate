var models = require('../models/models.js');

exports.shops = function(req, res){
	res.render('shops/index',{errors:[]});
};