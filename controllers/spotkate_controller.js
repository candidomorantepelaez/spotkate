exports.index = function(req, res){
	res.render('index');
}

exports.spots = function(req, res){
	res.render('spots/index');
};

exports.shops = function(req, res){
	res.render('shops/index');
};

exports.maps = function(req, res){
	res.render('maps/index');
}