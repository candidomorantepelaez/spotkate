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
var CommentPhotoShop = sequelize.import(path.join(__dirname, 'commentPhotoShop'));
var CommentPhotoSpot = sequelize.import(path.join(__dirname, 'commentPhotoSpot'));
var PhotosShop = sequelize.import(path.join(__dirname, 'photosShop'));
var PhotosSpot = sequelize.import(path.join(__dirname, 'photosSpot'));

//relaciones de bases bases de datos photosShop y shop
PhotosShop.belongsTo(Shops);
Shops.hasMany(PhotosShop);

//relaciones de bases de datos user y photoshop
PhotosShop.belongsTo(User);
User.hasMany(PhotosShop);

//relaciones entre photoshop y commentphotoshop
CommentPhotoShop.belongsTo(PhotosShop);
PhotosShop.hasMany(CommentPhotoShop);

//relaciones entre commentphotoshop y user
CommentPhotoShop.belongsTo(User);
User.hasMany(CommentPhotoShop);

//relaciones de bases bases de datos photosSpot y spot
PhotosSpot.belongsTo(Spots);
Spots.hasMany(PhotosSpot);

//relaciones de bases de datos user y photospot
PhotosSpot.belongsTo(User);
User.hasMany(PhotosSpot);

//relaciones entre photospot y commentphotospot
CommentPhotoSpot.belongsTo(PhotosSpot);
PhotosSpot.hasMany(CommentPhotoSpot);

//relaciones entre commentphotospot y user
CommentPhotoSpot.belongsTo(User);
User.hasMany(CommentPhotoSpot);

//relaciones de bases de datos user y spots
Spots.belongsTo(User);
User.hasMany(Spots);

//relaciones entre bases de datos user y shops
Shops.belongsTo(User);

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
exports.CommentPhotoShop = CommentPhotoShop;
exports.CommentPhotoSpot = CommentPhotoSpot;
exports.PhotosShop = PhotosShop;
exports.PhotosSpot = PhotosSpot;


//sequelize.sync crea e inicializa tabla de spots en DB
sequelize.sync().then(function(){
	//then(..)ejecuta el manejador una vez creada la tabla
	User.count().then(function(count){
		if(count === 0) { //la tabla se inicializa solo si esta vacia
			User.create({username:'admin', password:'1234567', image:'E3j-KHGMS92srd6vxWM4GglWcvxwRlmd214123', isAdmin:true}).then(function(){
				console.log('Base de datos (tabla user) inicializada');
				Spots.count().then(function(count){
					if(count===0){
						var hora = new Date();
						Spots.create({nombre:'el cerro', lat: '43.548812', lng: '-5.665255', ciudad:'cimadevilla', descripcion:'skatepark',
							tipo:'skatepark', creado_por:'candido', image:'RqiH8teWWexbrRvK6cI9quuY56HKqXdJ191422', creado_el:''+hora.getDate() + "/" + (hora.getMonth() +1) + "/" + hora.getFullYear()+" a las "+hora.getHours()+":"+hora.getMinutes('mm')+'', UserId:1}).then(function(){
								console.log('base de datos de spot inicializada');
							});
					}
				});		
			});			
		}
	});
});