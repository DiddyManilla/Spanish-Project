$(function() {
	var images = ['Partido'];
	var keys = {left: false, right: false};
	var player = $('#player');
	player.speed = 5;

	player.css('height', $('#player-icon').css('height'));
	player.css('width', $('#player-icon').css('width'));
	$('main').css('height', $('#background').css('height'));
	$('main').css('width', $('#background').css('width'));


	function nextScreen() {
		if (images.length) {
			$('#background').attr('src', ('img/' + images.shift() + '.png'));
			
			$('main').css('height', $('#background').css('height'));
			$('main').css('width', $('#background').css('width'));
			console.log($('#background').css('height'));
		}
	}

	$('body').on('keydown', function(event) {

		if (event.keyCode == 37 && !keys.left) {
			keys.left = true;
			(function() {
				player.css('left', player.position().left - 1 + 'px');
				player.timeout = setTimeout(arguments.callee, player.speed);
			})();

		} else if (event.keyCode == 39 && !keys.right) {

			keys.right = true;
			(function() {
				player.css('left', player.position().left + 1 + 'px');
				if (player.position().left + player.width() >= $('#background').width()) {
					nextScreen();
					player.css('left', '0px');
				}
				player.timeout = setTimeout(arguments.callee, player.speed);
			})();

		}
	})


	.on('keyup', function(event) {

		if (event.keyCode == 37) {
			keys.left = false;
			clearTimeout(player.timeout);
		} else if (event.keyCode == 39) {

			keys.right = false;
			clearTimeout(player.timeout);
		}
	});



});