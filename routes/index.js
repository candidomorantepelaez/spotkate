var express = require('express');
var router = express.Router();

var Controller= require('../controllers/spotkate_controller');
var MapsController = require('../controllers/maps_controller');
var SpotController = require('../controllers/spot_controller');
var ShopController = require('../controllers/shop_controller');
var CommentSpot = require('../controllers/commentSpot_controller');
var CommentShop = require('../controllers/commentShop_controller');
var SessionController = require('../controllers/session_controller');
var UserController = require('../controllers/user_controller');
var PhotosSpotController = require('../controllers/photosSpot_controller');

/* GET home page. */
router.get('/', Controller.index);//pagina principal o novedades

//Rutas de sesion
router.get('/login', SessionController.new); //formulario de login
router.post('/login', SessionController.create); //crear sesion
router.get('/logout', SessionController.destroy); //destruir sesion

//Rutas de Cuentas
router.param('userId', UserController.load);//autoload de cuenta
router.get('/user', UserController.new);//formulario de registro
router.post('/user', UserController.create);//creacion de usuario
router.get('/user/:userId/edit', SessionController.loginRequired, UserController.ownershipRequired, UserController.edit);//formulario de edicion de usuario
router.put('/user/:userId', SessionController.loginRequired,UserController.ownershipRequired, UserController.update);//editar el usuario
router.get('/user/:userId', UserController.show);//muestra los datos de un user
router.delete('/user/:userId', SessionController.loginRequired,UserController.ownershipRequired, UserController.destroy);//eliminar usuario

//Rutas de Maps
router.get('/maps', MapsController.maps);//muestra el mapa
router.get('/maps/spots', MapsController.spots);//muestra busqueda

//Rutas de Spots
router.param('spotsId', SpotController.load);//autoload de spots
router.get('/spots', SpotController.spots);//muestra los spots
router.get('/spot/new', SessionController.loginRequired, SpotController.new);//formulario de creacion de spot
router.post('/spot/create', SessionController.loginRequired, SpotController.create);//creacion de spot
router.get('/spot/:spotsId/edit', SessionController.loginRequired, SpotController.edit);//formulario de edicion de spot
router.put('/spot/:spotsId', SessionController.loginRequired, SpotController.update);//editar el spot
router.get('/spot/:spotsId', SpotController.show);//muestra los datos de un spot
router.delete('/spot/:spotsId', SessionController.loginRequired, SpotController.ownershipRequired, SpotController.destroy);//elimina un spot

//Rutas de CommentSpot
router.get('/spot/:spotsId/comments/new',SessionController.loginRequired, SessionController.loginRequired, CommentSpot.new);//formulario de creacion de comentario de spot
router.post('/spot/:spotsId/comments',SessionController.loginRequired, SessionController.loginRequired, CommentSpot.create);//creacion de comentario de spot

//Rutas de Shops
router.param('shopsId', ShopController.load);//autoload de shops
router.get('/shops', ShopController.shops);//muestra las shops
router.get('/shop/new', SessionController.loginRequired, ShopController.adminRequired, ShopController.new);//formulario de creacion de shop
router.post('/shop/create', SessionController.loginRequired, ShopController.adminRequired, ShopController.create);//creacion de shop
router.get('/shop/:shopsId/edit', SessionController.loginRequired, ShopController.ownershipRequired, ShopController.edit);//formulario de edicion de shop
router.put('/shop/:shopsId', SessionController.loginRequired, ShopController.ownershipRequired, ShopController.update);//edicion de shop
router.get('/shop/:shopsId', ShopController.show);
router.delete('/shop/:shopsId', SessionController.loginRequired, ShopController.ownershipRequired, ShopController.destroy);//elimina la shop

//Rutas de CommentShop
router.get('/shop/:shopsId/comments/new', SessionController.loginRequired, CommentShop.new);//formulario de creacion de comentarios de tienda
router.post('/shop/:shopsId/comments', SessionController.loginRequired, CommentShop.create);//creacion de comentario de tienda

//Rutas de Result
router.get('/result', Controller.busqueda);//Resultados de las busquedas

//Rutas de PhotosSpot
router.post('/photosSpot/new', SessionController.loginRequired, PhotosSpotController.create);//creacion de foto en Spot
router.get('/photosSpot/:photosSpotID', PhotosSpotController.show);

module.exports = router;//exportamos las rutas 
