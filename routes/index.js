var express = require('express');
var router = express.Router();

var quizController= require('../controllers/spotkate_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SpotKate' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
