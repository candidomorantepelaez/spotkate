var path = require('path');

//Postgres DATABASE_URL=postgres://user:passwd@host:port/database
//SQlite   DATABASE_URL=sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name =  (url[6]||null);
var user =     (url[2]||null);
var pwd =      (url[3]||null);
var protocol = (url[1]||null);
var dialect =  (url[1]||null);
var port =     (url[5]||null);
var host =     (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQlite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {
								dialect: protocol,
								protocol:protocol,
								port: port,
								host: host,
								storage:storage, //solo SQlite(.env)
								omitNull:true}); //solo Postgres

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