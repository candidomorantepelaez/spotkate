var models = require('../models/models.js');
var cloudinary = require('cloudinary');

//POST/photosShop/create
exports.create = function(req, res){
	var hora = new Date();
	if(req.files.photo.name){
		var publicId = req.session.id + hora.getHours()+ hora.getMinutes()+ hora.getSeconds();
		cloudinary.uploader.upload(req.files.photo.path,function(result){},{public_id:publicId});
	};
	var photosShop = models.PhotosShop.build({
		image : publicId,
		creado_por : req.session.user.username,
		creado_el : hora.getDate() + "/" + (hora.getMonth() +1) + "/" + hora.getFullYear()+" a las "+hora.getHours()+":"+hora.getMinutes('mm'),
		UserId : req.body.UserId,
		nombreShop : req.body.nombreShop,
		shopId : req.body.shopId
	});
	//guarda en DB los campos de la foto
	photosShop.validate().then(function(err){
		if(err){
			res.render('/shop/'+req.body.shopId);
		}else{
			photosShop.save({fields:["image", "creado_el", "creado_por", "shopId", "UserId", "nombreShop"]})
			.then(function(){
				res.redirect('/shop/'+req.body.shopId);
			});
		};
	});
};
//GET/photosShop/:photosShopId
exports.show = function(req, res){
	res.render('photosShop/show', {errors:[]});
}