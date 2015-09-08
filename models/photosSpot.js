//definicion del modelo de fotos de los spots
module.exports=function(sequelize, DataTypes){
	return sequelize.define('photosSpot',{
		image: {type: DataTypes.STRING,
				 validate: {notEmpty:{msg:"Debes elegir una imagen."}}},				
		creado_por: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"El autor no puede quedar vacio."}}},
		creado_el: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"La hora de creacion no puede quedar vacia."}}},
		nombreSpot: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"El nombre del spot no puede quedar vacio"}}}		
	});
};