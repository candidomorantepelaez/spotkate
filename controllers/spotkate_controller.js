var models = require('../models/models.js');

exports.index = function(req, res, next){
	
	models.PhotosShop.findAll({
			orden:['image','DESC' ]
		}).then(function(fotospot){
			if(fotospot){
				models.PhotosSpot.findAll({
					orden:['image','DESC']
				}).then(function(result){
					if(result){
						res.render('index',{result:result, fotospot:fotospot,  errors:[]});
					}else{
						next(new Error('No tenemos novedades que presentarte'));
					}
				});				
			}else{
				next(new Error('No tenemos novedades que presentarte'))
			}
	}).catch(function(error){next(error);});
		
};

//Get/result
exports.busqueda=function(req, res){	
	var busqueda = req.query.search;
	var donde = req.query.donde;
	var spot;
	var shop;
	var user;
	
	if(donde==='spot'){
		models.Spots.findAll({where:{nombre:{$like:'%'+busqueda+'%'}}}).then(function(spots){
		res.render('result/index', {result:spots, result1:0, result2:0, busqueda:busqueda, errors:[]});});
	}else{
		if(donde==='shop'){
			models.Shops.findAll({where:{nombre:{$like:'%'+busqueda+'%'}}}).then(function(shops){
			res.render('result/index',{result:0, result1:shops, result2:0, busqueda:busqueda, errors:[]});});
		}else{
			if(donde==='user'){
				models.User.findAll({where:{username:{$like:'%'+busqueda+'%'}}}).then(function(users){
				res.render('result/index.ejs', {result:0, result1:0, result2:users, busqueda:busqueda, errors:[]});});
			}else{
				models.Spots.findAll({where:{nombre:{$like:'%'+busqueda+'%'}}}).then(function(spots){
					spot=spots;
					models.Shops.findAll({where:{nombre:{$like:'%'+busqueda+'%'}}}).then(function(shops){
						shop=shops;
						models.User.findAll({where:{username:{$like:'%'+busqueda+'%'}}}).then(function(users){
						user=users;
						res.render('result/index', {result:spot, result1:shop, result2:user, busqueda:busqueda, errors:[]});
				        });
            		});
				});
			}	
		}		
	}
};



