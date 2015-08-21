var models = require('../models/models.js');
//Autoload en caso de :spotId lo precarga y gestiona posibles errores
exports.load = function(req, res, next, spotId){
	models.Spots.findById(spotId).then(function(spot){
		if(spot){
			req.spot = spot;
			next();
		}else{
			next(new Error('Este spot todavia no esta creado ¡ANIMATE y CREALO!!!'));
		}
	}).catch(function(error){next(error);});
};
//GET/spots lista los spots
exports.spots = function(req, res){
	models.Spots.findAll().then(function(spots){
	res.render('spots/index', {spots:spots, errors:[]});	
	});
};
//GET/spot/:spotId lista los datos de un spot
exports.show = function(req, res){
	res.render('spots/show', {spot:req.spot, errors:[]});	
};
//GET/spot/new
exports.new = function(req, res){
	var spot = models.Spots.build({//crea un objeto
		nombre:'nombre',
		direccion:'direccion',
		descripcion:'descripcion',
		tipo:'tipo',
		creado_por:'creado_por'
	});
	res.render('spots/new', {spot:spot, errors:[]});
};
//POST/spot/create
exports.create = function(req, res){
	var spot = models.Spots.build(req.body.spot);
	//guarda en DB los campos del spot
	spot.validate().then(function(err){
		if(err){
			res.render('spots/new', {spot:spot,errors:err.errors});
		}else{
		spot.save({fields:["nombre", "direccion", "descripcion", "tipo", "creado_por"]})
	.then(function(){
		res.redirect('/spots');})}
	});
};
//GET/spot/:spotsId/edit
exports.edit = function(req, res){
	var spot = req.spot; //autoload de instancia de spot
	res.render('spots/edit', {spot:spot, errors:[]});
};
//PUT/spot/:spotsId
exports.update = function(req, res){
	req.spot.nombre = req.body.spot.nombre;
    req.spot.direccion = req.body.spot.direccion;
	req.spot.descripcion = req.body.spot.descripcion;
	req.spot.tipo = req.body.spot.tipo;
	req.spot.creado_por=req.spot.creado_por +", modificado por "+ req.body.spot.creado_por;
	
	req.spot.validate().then(function(err){
		if(err){
			res.render('spots/edit', {spot:req.spot, errors:err.errors});
		}else{
			req.spot.save({fields:["nombre", "direccion", "descripcion", "tipo", "creado_por"]})
			.then(function(){res.redirect('/spots');});
		}
	});
};