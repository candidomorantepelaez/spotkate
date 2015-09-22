var models = require('../models/models.js');

//GET/shop/:shopsId/comment/new
exports.new = function(req, res){
	res.render('commentShop/new', {shopid:req.params.shopsId, errors:[]});
};

//POST/shop/:shopsId/comment
exports.create = function(req, res, next){
	var hora = new Date();
	var momento= hora.getDate() + "/" + (hora.getMonth() +1) + "/" + hora.getFullYear()+" a las "+hora.getHours()+":"+hora.getMinutes('mm');
	var comment = models.CommentShop.build({
		comentario: req.body.commentShop.texto,
		creado_por: req.body.commentShop.creado_por,
		creado_el: momento,
		shopId: req.params.shopsId,
		UserId: req.session.user.id
	});
	comment.validate().then(function(err){
		if(err){
			res.render('commentShop/new', {comment:comment, errors:err.errors});
		}else{
			comment.save().then(function(){res.redirect('/shop/'+req.params.shopsId)});
		}
	}).catch(function(error){next(error)});
};