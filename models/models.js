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

//importar la definiciones de las tablas
var Spots = sequelize.import(path.join(__dirname, 'spots'));
var Shops = sequelize.import(path.join(__dirname, 'shops'));
var CommentSpot = sequelize.import(path.join(__dirname, 'commentSpot'));
var CommentShop = sequelize.import(path.join(__dirname, 'commentShop'));
var User = sequelize.import(path.join(__dirname, 'user'));

//relaciones de bases de datos user y spots
Spots.belongsTo(User);
User.hasMany(Spots);

//relaciones entre bases de datos user y commentSpot
CommentSpot.belongsTo(User);
User.hasMany(CommentSpot);

//relaciones entre bases de datos user y commentShop
CommentShop.belongsTo(User);
User.hasMany(CommentShop);

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
exports.User = User;

//sequelize.sync crea e inicializa tabla de spots en DB
sequelize.sync().then(function(){
	//then(..)ejecuta el manejador una vez creada la tabla
	User.count().then(function(count){
		if(count === 0) { //la tabla se inicializa solo si esta vacia
			User.bulkCreate([{username:'admin', password:'1234', isAdmin:true},
				{username:'manolo', password:'4567'}]).then(function(){
				console.log('Base de datos (tabla user) inicializada');
				Spots.count().then(function(count){
					if(count===0){
						Spots.bulkCreate([{nombre:'el cerro', direccion:'cimadevilla', descripcion:'skatepark',
							tipo:'skatepark', creado_por:'candido', UserId:1},
							{nombre:'el nautico', direccion:'playa de san lorenzo', descripcion:'plaza de piedra', 
								tipo:'street', creado_por:'candido', UserId:1}]).then(function(){
								console.log('base de datos de spot inicializada');
							});
					};
					});		
			});			
		};
	});
});