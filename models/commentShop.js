//definicion del modelo de comentarios de las shops
module.exports=function(sequelize, DataTypes){
	return sequelize.define('commentShop',{
		comentario: {type: DataTypes.STRING,
				 validate: {notEmpty:{msg:"El comentario no puede estar vacio"}}},				
		creado_por: {type: DataTypes.STRING,
				validate: {notEmpty:{msg:"el autor no puede quedar vacio"}}}		
	})
};