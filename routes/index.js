var express = require('express');
var router = express.Router();

var Controller= require('../controllers/spotkate_controller');
var MapsController = require('../controllers/maps_controller');
var SpotController = require('../controllers/spot_controller');
var ShopController = require('../controllers/shop_controller');
var CommentSpot = require('../controllers/commentSpot_controller');
var CommentShop = require('../controllers/commentShop_controller');

/* GET home page. */
router.get('/', Controller.index);

//Rutas de Maps
router.get('/maps', MapsController.maps);

//Rutas de Spots
router.param('spotsId', SpotController.load);//autoload de spots
router.get('/spots', SpotController.spots);
router.get('/spot/new', SpotController.new);
router.post('/spot/create', SpotController.create);
router.get('/spot/:spotsId/edit', SpotController.edit);
router.put('/spot/:spotsId', SpotController.update);
router.get('/spot/:spotsId', SpotController.show);
router.delete('/spot/:spotsId', SpotController.destroy);

//Rutas de CommentSpot
router.get('/spot/:spotsId/comments/new', CommentSpot.new);
router.post('/spot/:spotsId/comments', CommentSpot.create);

//Rutas de Shops
router.param('shopsId', ShopController.load);//autoload de shops
router.get('/shops', ShopController.shops);
router.get('/shop/new', ShopController.new);
router.post('/shop/create', ShopController.create);
router.get('/shop/:shopsId/edit', ShopController.edit);
router.put('/shop/:shopsId', ShopController.update);
router.get('/shop/:shopsId', ShopController.show);
router.delete('/shop/:shopsId', ShopController.destroy);

//Rutas de CommentShop
router.get('/shop/:shopsId/comments/new', CommentShop.new);
router.post('/shop/:shopsId/comments', CommentShop.create);

module.exports = router;
