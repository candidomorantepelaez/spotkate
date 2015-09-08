var models = require('../models/models.js');
var cloudinary = require('cloudinary');

//POST/photosShop/create
exports.create = function(req, res, next){	
	var hora = new Date();	
	if(req.files.photo.name){		
		var publicId = req.session.id + hora.getHours()+hora.getMinutes()+hora.getSeconds(); 
		cloudinary.uploader.upload(req.files.photo.path,
  		function(result) {},{public_id:publicId});		
	};		
	var photosSpot = models.PhotosSpot.build({
		image:publicId,
		creado_por:req.session.user.username,
		creado_el:hora.getDate() + "/" + (hora.getMonth() +1) + "/" + hora.getFullYear()+" a las "+hora.getHours()+":"+hora.getMinutes('mm'),
		UserId:req.session.user.id,
		spotId:req.body.spotId,
		nombreSpot: req.body.nombreSpot,
	});
	//guarda en DB los campos de la foto
	photosSpot.validate().then(function(err){
		if(err){
			res.redirect('/spot/'+req.body.spotId);
		}else{
		photosSpot.save({fields:["image", "creado_el", "creado_por", "spotId", "UserId", "nombreSpot"]})
	.then(function(){
		res.redirect('/spot/'+req.body.spotId);})
	};
	});
};