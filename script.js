$(function() {
	var images = ['Partido'];
	var keys = {left: false, right: false};
	var questions = [{
		'text': 'Buenos dias! Adonde vas?',
		'answers' : ['Buenos dias! Yo voy al Partido.',
					 'Buenos dias! Yo voy a la Partido',
					 'Buenos dias! Yo vas a el Partido.',
					 'Buenos dias! Yo vamos al Partido.']
	},
	{
		'text': 'Hola! Como estas?',
		'answers': [

					]
	}];
	var player = $('#player');
	player.speed = 5;
	
	player.score = 0;
	player.maxScore = 2;

	player.css('height', '179px');
	player.css('width', '96px');
	$('main').css('height', $('#background').css('height'));
	$('main').css('width', $('#background').css('width'));


	function nextScreen() {
		if (images.length) {
			$('#background').attr('src', ('img/' + images.shift() + '.PNG'));
			
			$('main').css('height', $('#background').css('height'));
			$('main').css('width', $('#background').css('width'));
			console.log($('#background').css('height'));
		}
	}

	function moveLeft() {
		player.css('left', player.position().left - 1 + 'px');
		player.timeout = setTimeout(arguments.callee, player.speed);
	}
	function moveRight() {
		player.css('left', player.position().left + 1 + 'px');
		player.timeout = setTimeout(arguments.callee, player.speed);

		if (player.position().left + player.width() >= $('#background').width()) {
			nextScreen();
			player.css('left', '0px');
		} else if (player.position().left + player.width() >= $('#person').position().left - 50) {
			clearTimeout(player.timeout);
			question();
		}
	}

	function answer() {

	}
	function question() {
		if (questions.length) {
			var question = questions.shift();
			$('#question').text(question.text);
			$('#answers li').each(function(i) {
				$(this).text(question.answers[i]);
			});

			$('#answers li').on('click', function(event) {
				answer()
			});

			$('#question-box').removeClass('hidden');
			$('#question-box').addClass('show');
		}
	}

	$('body').on('keydown', function(event) {

		if (event.keyCode == 37 && !keys.left) {
			keys.left = true;
			moveLeft();
		} else if (event.keyCode == 39 && !keys.right) {
			keys.right = true;
			moveRight();
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