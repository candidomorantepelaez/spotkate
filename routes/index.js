var express = require('express');
var router = express.Router();

var Controller= require('../controllers/spotkate_controller');

/* GET home page. */
router.get('/', Controller.index);
router.get('/maps', Controller.maps);
router.get('/spots', Controller.spots);
router.get('/shops', Controller.shops);

module.exports = router;
