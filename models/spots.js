//definicion del modelo de spot
module.exports=function(sequelize, DataTypes){
	return sequelize.define('spots',{
		nombre:      DataTypes.STRING,
		direccion:   DataTypes.STRING,
		descripcion: DataTypes.STRING,
		tipo:        DataTypes.STRING,		
		creado_por:  DataTypes.STRING		
	})
}