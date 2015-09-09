
	$(function(){
	$('#passwordedit1').keyup(function(){
		var _this = $('#passwordedit1');
		var pass_1 = $('#passwordedit1').val();
                _this.attr('style', 'background:white');
		if(pass_1.charAt(0) == ' '){
			_this.attr('style', 'background:#FF4A4A');
		}
 
		if(_this.val() == ''){
			_this.attr('style', 'background:#FF4A4A');
		}
	});
 
	$('#passwordedit2').keyup(function(){
		var pass_1 = $('#passwordedit1').val();
		var pass_2 = $('#passwordedit2').val();
		var _this = $('#passwordedit2');
                _this.attr('style', 'background:white');
		if(pass_1 != pass_2 && pass_2 != ''){
			_this.attr('style', 'background:#FF4A4A');
		}
	});
	});
