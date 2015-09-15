//definicion del modelo de spot
module.exports=function(sequelize, DataTypes){
	return sequelize.define('spots',{
		nombre: {type: DataTypes.STRING,
				 validate: {notEmpty:{msg:"El nombre no puede estar vacio"}}},
		lat: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"la direccion no puede quedar vacia"}}},
		lng: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"la direccion no puede quedar vacia"}}},		
		ciudad: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"La direccion no puede estar vacia"}}},
		descripcion: {type: DataTypes.TEXT,
				validate: {notEmpty:{msg:"la descripcion no puede estar vacia"}}},
		tipo: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"el tipo no puede estar vacio"}}},			
		creado_por: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"el autor no puede quedar vacio"}}},
		creado_el: {type: DataTypes.STRING},
		image: {type: DataTypes.STRING}		
	});
};