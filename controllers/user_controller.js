var models = require('../models/models.js');
var cloudinary = require('cloudinary');

//Autoload :userId
exports.load = function(req, res, next, userId){
	models.User.find({
			where:{id: Number(userId)},
			include:[{model:models.PhotosSpot}]
			}).then(function(user){
		if(user){
			req.user = user;
			next();
		}else{
			next(new Error('No existe el usuario'))
		}
	}).catch(function(error){next(error)});
};
//MW que permite acciones solo a admin o al usuario propio
exports.ownershipRequired = function(req, res, next){
	var objUser = req.user.id;
	var logUser = req.session.user.id;
	var isAdmin = req.session.user.isAdmin;
	
	if(isAdmin || objUser === logUser){
		next();
	}else{
		res.redirect('/');
	}
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
	var user = models.User.build({username:"", password:"", ciudad:"", push:"", tipo:"", tabla:"", ejes:"", 
		ruedas:"", rodatas:"", rideFor:"", trick:"", creado_el:""});//crea el objeto user
	res.render('user/new', {user:user, errors:[]});
};

//POST/user
exports.create = function(req, res, next){
	if(req.body.user.password==req.body.comp.password){
	var hora = new Date();
	req.body.user.creado_el = hora.getDate() + "/" + (hora.getMonth() +1) + "/" + hora.getFullYear() + " a las " + hora.getHours() + ":" + hora.getMinutes('mm');
	if(req.files.photo.name){		
		var publicId = req.session.id + hora.getHours()+hora.getMinutes()+hora.getSeconds(); 
		cloudinary.uploader.upload(req.files.photo.path,
  		function(result) {},{public_id:publicId});
		req.body.user.image = publicId;
	};	
	var user = models.User.build(req.body.user);		
	user.validate().then(function(err){
		if(err){
			res.render('user/new', {user:user, errors:err.errors});
		}else{
			user.save({fields:["username", "password", "ciudad", "push", "tipo", "tabla",
				"ejes", "ruedas", "rodatas", "rideFor", "trick", "creado_el", "image" ]}).then(function(){
				req.session.user = {id:user.id, username:user.username};
				res.redirect('/');
			});
		}
	}).catch(function(error){next(error)});
	}else{	 	
		res.render('user/new', {user:user, errors:[]});
	}
};

//PUT/user/:id
exports.update = function(req, res, next){
	req.user.username = req.body.user.username;
	req.user.password = req.body.user.password;
	req.user.ciudad = req.body.user.ciudad;
	req.user.push = req.body.user.push;
	req.user.tipo = req.body.user.tipo;
	req.user.tabla = req.body.user.tabla;
	req.user.ejes = req.body.user.ejes;
	req.user.ruedas = req.body.user.ruedas;
	req.user.rodatas = req.body.user.rodatas;
	req.user.rideFor = req.body.user.rideFor;
	req.user.trick = req.body.user.trick;	
	
	req.user.validate().then(function(err){
		if(err){
			res.render('user/'+req.user.id, {user: req.user, errors:err.errors});
		}else{
			req.user.save({fields:["username", "password", "ciudad", "push", "tipo", "tabla", "ejes",
				"ruedas", "rodatas", "rideFor", "trick"]}).then(function(){
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