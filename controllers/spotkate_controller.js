var models = require('../models/models.js');
var cloudinary = require('cloudinary');

exports.index = function(req, res){
	res.render('index',{errors:[]});
}

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
//Funciones para subir fotos de la pagina dbigcloud son dos funciones
//funcion primera cargar el formulario
exports.upload = function(req, res){			
  res.render('foto/upload', {errors:[]});
};

//funcion dos la que recibe el post y guarda el archivo en nuestro ordenador
// Importamos el modulo para subir ficheros


exports.Uploads = function(req, res) { 	  
    cloudinary.uploader.upload(req.files.photo.path,
  		function(result) {
			  console.log(result);
			  res.render('foto/upload', {errors:[]});			  
    });         
};




