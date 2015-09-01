var crypto = require('crypto');
var key = process.env.PASSWORD_ENCRYPTION_KEY;

module.exports = function(sequelize, DataTypes){
	var User = sequelize.define('User',
	{
		username:{
			type: DataTypes.STRING,
			unique: true,
			validate:{notEmpty:{msg:"Como quieres que te llamemos"},
				//->devuelve mensaje de error si username ya existe
				isUnique:function(value, next){
					var self = this;
					User.find({where:{username:value}}).then(function(user){
						if(user && self.id !== user.id){
							return next('Nombre ya usado');
						}
						return next();
					}).catch(function(err){return next(err);});
				}
			}
		},
		password:{
			type:DataTypes.STRING,
			validate:{notEmpty:{msg:"Falta password"}},
			set: function(password){
				var encripted = crypto
								.createHmac('sha1', key)
						    	.update(password)
							    .digest('hex');
				//evita passwords vacios
				if(password === ''){ encripted = '';}
				this.setDataValue('password', encripted);
			}
		},
		isAdmin:{
			type:DataTypes.BOOLEAN,
			defaultValue: false
		},
		ciudad:{type:DataTypes.STRING},
		push:{type:DataTypes.STRING},
		tipo:{type:DataTypes.STRING},
		tabla:{type:DataTypes.STRING},
		ejes:{type:DataTypes.STRING},
		ruedas:{type:DataTypes.STRING},
		rodatas:{type:DataTypes.STRING},
		rideFor:{type:DataTypes.STRING},
		trick:{type:DataTypes.STRING},
		creado_el:{type:DataTypes.STRING},
		image:{type:DataTypes.STRING}
	},		
	{
		instanceMethods:{
			verifyPassword: function(password){
				var encripted = crypto.createHmac('sha1', key).update(password).digest('hex');
				return encripted === this.password;
			}
		}		
	});
	return User;
}