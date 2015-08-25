var models = require('../models/models.js');

//Autoload :userId
exports.load = function(req, res, next, userId){
	models.User.find({where:{id: Number(userId)}}).then(function(user){
		if(user){
			req.user = user;
			next();
		}else{
			next(new Error('No existe el usuario'))
		}
	}).catch(function(error){next(error)});
};

//Comprueba si el usuario esta registrado en users
//si autenticacion falla o hay errores se ejecuta callback(error).
exports.autenticar = function(login, password, callback){	
	models.User.find({
		where:{username:login}
		}).then(function(user){
			if(user){
				if(user.verifyPassword(password)){					
					callback(null, user);
				}else{					
					callback(new Error('Password Erroneo'));
				}
			}else{				
				callback(new Error('No existe el usuario= '+login));
			}
		}).catch(function(error){callback(error)});
};

//GET/user/:id/edit
exports.edit = function(req, res){
	res.render('user/edit', {user:req.user, errors:[]});
	//req.user: instancia de user cargada por autoload
};

//GET/user
exports.new = function(req, res){
	var user = models.User.build({username:"", password:""});//crea el objeto user
	res.render('user/new', {user:user, errors:[]});
};

//POST/user
exports.create = function(req, res, next){
	var user = models.User.build(req.body.user);
	
	user.validate().then(function(err){
		if(err){
			res.render('user/new', {user:user, errors:err.errors});
		}else{
			user.save({fields:["username", "password"]}).then(function(){
				req.session.user = {id:user.id, username:user.username};
				res.redirect('/');
			});
		}
	}).catch(function(error){next(error)});
};

//PUT/user/:id
exports.update = function(req, res, next){
	req.user.username = req.body.user.username;
	req.user.password = req.body.user.password;
	
	req.user.validate().then(function(err){
		if(err){
			res.render('user/'+req.user.id, {user: req.user, errors:err.errors});
		}else{
			req.user.save({fields:["username", "password"]}).then(function(){
				res.redirect('/');//redireccion http a /
			});
		}
	}).catch(function(error){next(error)});
};

//DELETE/user/:id
exports.destroy = function(req, res, next){
	req.user.destroy().then(function(){
		//borra la sesion y redirige a /
		delete req.session.user;
		res.redirect('/');
	}).catch(function(error){next(error)});
};
//GET/user/:userId
exports.show = function(req, res){
	res.render('user/show', {user:req.user, errors:[]});
};