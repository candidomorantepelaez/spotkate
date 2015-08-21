var express = require('express');
var router = express.Router();

var Controller= require('../controllers/spotkate_controller');
var MapsController = require('../controllers/maps_controller');
var SpotController = require('../controllers/spot_controller');
var ShopController = require('../controllers/shop_controller');

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

//Rutas de Shops
router.param('shopsId', ShopController.load);//autoload de shops
router.get('/shops', ShopController.shops);
router.get('/shop/new', ShopController.new);
router.post('/shop/create', ShopController.create);
router.get('/shop/:shopsId/edit', ShopController.edit);
router.put('/shop/:shopsId', ShopController.update);
router.get('/shop/:shopsId', ShopController.show);
router.delete('/shop/:shopsId', ShopController.destroy);

module.exports = router;
