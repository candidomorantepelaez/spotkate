//definicion del modelo de fotos de los shops
module.exports=function(sequelize, DataTypes){
	return sequelize.define('photosShop',{
		image: {type: DataTypes.STRING,
				 validate: {notEmpty:{msg:"Debes elegir una imagen."}}},				
		creado_por: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"El autor no puede quedar vacio."}}},
		creado_el: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"La hora de creacion no puede quedar vacia."}}},
		nombreShop: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"El nombre de la tienda no puede quedar vacio"}}}				
	});
};