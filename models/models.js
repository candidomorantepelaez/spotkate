var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQlite:
var sequelize = new Sequelize(null, null, null, {dialect:"sqlite", storage:"quiz.sqlite"});

//importar la definicion de la tabla Quiz en quiz.js
var Spots = sequelize.import(path.join(__dirname, 'spots'));

//exportar definicion de tabla spots
exports.Spots = Spots;

//sequelize.sync crea e inicializa tabla de spots en DB
sequelize.sync().then(function(){
	//then(..)ejecuta el manejador una vez creada la tabla
	Spots.count().then(function(count){
		if(count===0){//si la base de datos no tiene registros crea uno
			Spots.create({
				nombre:'skatepark el cerro',
				direccion:'cimadevilla',
				descripcion:'Es un skatepark de cemento, tiene una zona street y un bowl.',
				tipo:'skatepark',
				creado_por:'Kan'				
			})
			.then(function(){console.log('spots inicializados...')});
		};
	});
});