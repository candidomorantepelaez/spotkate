var models = require('../models/models.js');
var cloudinary = require('cloudinary');

//Autoload en caso de :spotId lo precarga y gestiona posibles errores
exports.load = function(req, res, next, spotId){
	models.Spots.find({
		where: {id: Number(spotId)},
		include:[{model:models.PhotosSpot},{model:models.CommentSpot}]
	}).then(function(spot){
		if(spot){
			req.spot = spot;
			next();
		}else{
			next(new Error('Este spot todavia no esta creado ¡ANIMATE y CREALO!!!'));
		}
	}).catch(function(error){next(error);});
	
};

//MW que permite acciones solo a admin o al creador del spot
exports.ownershipRequired = function(req, res, next){
	var objSpotOwner = req.spot.UserId;
	var logUser = req.session.user.id;
	var isAdmin = req.session.user.isAdmin;
	
	if(isAdmin || objSpotOwner === logUser){
		next();
	}else{
		res.redirect('/');
	}
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
		ciudad:'ciudad',
		descripcion:'descripcion',
		tipo:'tipo',
		creado_por:'creado_por',
		UserId:'UserId',
		creado_el:'creado_el',
		image:'image',
		lat:'lat',
		lng:'lng'
	});
	res.render('spots/new', {spot:spot, errors:[]});
};
//POST/spot/create
exports.create = function(req, res){	
	var hora = new Date();	
	if(req.files.photo.name){		
		var publicId = req.session.id + hora.getHours()+hora.getMinutes()+hora.getSeconds(); 
		cloudinary.uploader.upload(req.files.photo.path,
  		function(result) {},{public_id:publicId});
		req.body.spot.image = publicId;
	};	
	req.body.spot.creado_el = hora.getDate() + "/" + (hora.getMonth() +1) + "/" + hora.getFullYear()+" a las "+hora.getHours()+":"+hora.getMinutes('mm');	
	var spot = models.Spots.build(req.body.spot);
	//guarda en DB los campos del spot
	spot.validate().then(function(err){
		if(err){
			res.render('spots/new', {spot:spot,errors:err.errors});
		}else{
		spot.save({fields:["nombre", "ciudad", "descripcion", "tipo", "creado_por", "UserId", "image","creado_el", "lat", "lng"]})
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
    req.spot.ciudad = req.body.spot.ciudad;
	req.spot.descripcion = req.body.spot.descripcion;
	req.spot.tipo = req.body.spot.tipo;
	req.spot.lat = req.body.spot.lat;
	req.spot.lng = req.body.spot.lng;
	req.spot.image = req.body.spot.image;
		
	req.spot.validate().then(function(err){
		if(err){
			res.render('spots/edit', {spot:req.spot, errors:err.errors});
		}else{
			req.spot.save({fields:["nombre", "ciudad", "descripcion", "tipo", "lat", "lng", "image"]})
			.then(function(){res.redirect('/spots');});
		}
	});
};
//DELETE/spot/:spotsId
exports.destroy = function (req, res, next){
	req.spot.destroy().then(function(){
		res.redirect('/spots');
	}).catch(function(error){next(error)});
};