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
var Shops = sequelize.import(path.join(__dirname, 'shops'));
var CommentSpot = sequelize.import(path.join(__dirname, 'commentSpot'));
var CommentShop = sequelize.import(path.join(__dirname, 'commentShop'));

//Relaciones de bases de datos Spots y CommentSpot
CommentSpot.belongsTo(Spots);
Spots.hasMany(CommentSpot);

//Relaciones de bases de datos Shops y CommentShop
CommentShop.belongsTo(Shops);
Shops.hasMany(CommentShop);

//Relaciones de bases de datos Shops y Spots
Spots.belongsTo(Shops);
Shops.hasMany(Spots);

//exportar definicion de tabla spots
exports.Spots = Spots;
exports.Shops = Shops;
exports.CommentSpot = CommentSpot;
exports.CommentShop = CommentShop;

//sequelize.sync crea e inicializa tabla de spots en DB
sequelize.sync().then(function(){
	//then(..)ejecuta el manejador una vez creada la tabla
	alert('creada base de datos');
});