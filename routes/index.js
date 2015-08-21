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

//Rutas de Shops
router.get('/shops', ShopController.shops);

module.exports = router;
