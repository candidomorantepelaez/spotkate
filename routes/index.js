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
router.get('/spots', SpotController.spots);
router.get('/spot/:spotsId', SpotController.show);

//Rutas de Shops
router.get('/shops', ShopController.shops);

module.exports = router;
