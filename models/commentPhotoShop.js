//definicion del modelo de comentarios de las fotos del shop
module.exports=function(sequelize, DataTypes){
	return sequelize.define('commentPhotoShop',{
		comentario: {type: DataTypes.STRING,
				 validate: {notEmpty:{msg:"El comentario no puede estar vacio."}}},				
		creado_por: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"El autor no puede quedar vacio."}}},
		creado_el: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"La hora de creacion no puede quedar vacia."}}}		
	});
};