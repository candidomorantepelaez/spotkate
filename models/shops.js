//definicion del modelo de shops
module.exports=function(sequelize, DataTypes){
	return sequelize.define('shops',{
		nombre: {type: DataTypes.STRING,
				 validate: {notEmpty:{msg:"El nombre no puede estar vacio"}}},
		direccion: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"La direccion no puede estar vacia"}}},
		descripcion: {type: DataTypes.TEXT,
				validate: {notEmpty:{msg:"la descripcion no puede estar vacia"}}},				
		creado_por: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"el autor no puede quedar vacio"}}},
		creado_el:{type:DataTypes.STRING},
		image:{type:DataTypes.STRING}		
	});
};