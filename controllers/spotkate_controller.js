//GET /quizes/question
exports.question = function(req, res){
	res.render('quizes/question', {pregunta:'Cual es tu nombre'});	
};

//GET /quizes/answer
exports.answer = function(req, res){
	res.render('quizes/answer', {respuesta:req.query.respuesta});
};