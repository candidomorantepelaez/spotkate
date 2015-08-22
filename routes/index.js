var express = require('express');
var router = express.Router();

var Controller= require('../controllers/spotkate_controller');
var MapsController = require('../controllers/maps_controller');
var SpotController = require('../controllers/spot_controller');
var ShopController = require('../controllers/shop_controller');
var CommentSpot = require('../controllers/commentSpot_controller');
var CommentShop = require('../controllers/commentShop_controller');
var SessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', Controller.index);

//Rutas de sesion
router.get('/login', SessionController.new); //formulario de login
router.post('/login', SessionController.create); //crear sesion
router.get('/logout', SessionController.destroy); //destruir sesion

//Rutas de Maps
router.get('/maps', MapsController.maps);

//Rutas de Spots
router.param('spotsId', SpotController.load);//autoload de spots
router.get('/spots', SpotController.spots);
router.get('/spot/new', SessionController.loginRequired, SpotController.new);
router.post('/spot/create', SessionController.loginRequired, SpotController.create);
router.get('/spot/:spotsId/edit', SessionController.loginRequired, SpotController.edit);
router.put('/spot/:spotsId', SessionController.loginRequired, SpotController.update);
router.get('/spot/:spotsId', SpotController.show);
router.delete('/spot/:spotsId', SessionController.loginRequired, SpotController.destroy);

//Rutas de CommentSpot
router.get('/spot/:spotsId/comments/new',SessionController.loginRequired, SessionController.loginRequired, CommentSpot.new);
router.post('/spot/:spotsId/comments',SessionController.loginRequired, SessionController.loginRequired, CommentSpot.create);

//Rutas de Shops
router.param('shopsId', ShopController.load);//autoload de shops
router.get('/shops', ShopController.shops);
router.get('/shop/new', SessionController.loginRequired, ShopController.new);
router.post('/shop/create', SessionController.loginRequired, ShopController.create);
router.get('/shop/:shopsId/edit', SessionController.loginRequired, ShopController.edit);
router.put('/shop/:shopsId', SessionController.loginRequired, ShopController.update);
router.get('/shop/:shopsId', ShopController.show);
router.delete('/shop/:shopsId', SessionController.loginRequired, ShopController.destroy);

//Rutas de CommentShop
router.get('/shop/:shopsId/comments/new', SessionController.loginRequired, CommentShop.new);
router.post('/shop/:shopsId/comments', SessionController.loginRequired, CommentShop.create);

module.exports = router;
