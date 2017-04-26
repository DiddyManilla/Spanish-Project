/*global $*/
$(function() {
	var images = ['Casa', 'Partido'];
	var keys = {left: false, right: false};
	var questions = [{
		'text': 'Buenos dias! Adonde vas?',
		'answers' : ['Buenos dias! Yo voy al Partido.',
					 'Buenos dias! Yo voy a la Partido',
					 'Buenos dias! Yo vas a el Partido.',
					 'Buenos dias! Yo vamos al Partido.']
	},
	{
		'text': 'Hola! Que te gusta hacer?',
		'answers': ['Me gusta juego futbol. Adios!',
					'Me gusta jugar futbol. Adios!',
					'Te gusta juego futbol. Adios!',
					'Te gusta jugar futbol. Adios!']
	}];
	var player = $('#player');
	player.speed = 5;
	
	player.score = 0;
	player.maxScore = 2;
	
	var questioning = false;
	var loaded = {player: false, person: false, background: false};
	
	//Load player icon
	$('<img id="player-icon" src="img/grey_square.png"/>').on('load', function() {
		$(this).appendTo('#player');
		player.css('height', $('#player-icon').css('height'));
		player.css('width', $('#player-icon').css('width'));
		
		loaded.player = true;
		if (loaded.player && loaded.person && loaded.background) {
			$('main').removeClass('invisible');
		}
	});
	
	//Load NPC icon
	$('<img id="person-icon" src="img/blue_square.png"/>').on('load', function() {
		$(this).appendTo('#person');
		$('person').css('height', $('#player-icon').css('height'));
		$('person').css('width', $('#player-icon').css('width'));
		
		loaded.person = true;
		if (loaded.player && loaded.person && loaded.background) {
			$('main').removeClass('invisible');
		}
	});
	
	//Load background image
	$('<img id="background" src="img/'+ images.shift() +'.png">').on('load', function() {
		$(this).appendTo('main');
		$('main').css('height', $('#background').css('height'));
		$('main').css('width', $('#background').css('width'));
		
		loaded.background = true;
		if (loaded.player && loaded.person && loaded.background) {
			$('main').removeClass('invisible');
		}
	});


	function nextScreen() {
		if (images.length) {
			
			$('<img id="background" src="img/'+ images.shift() +'.png">').on('load', function() {
				$('#background').remove();
				$(this).appendTo('main');
				$('main').css('height', $('#background').css('height'));
				$('main').css('width', $('#background').css('width'));
				console.log($('#background').css('height'));
			});
		}
	}

	function moveLeft() {
		player.css('left', player.position().left - 1 + 'px');
		player.timeout = setTimeout(arguments.callee, player.speed);
	}
	function moveRight() {
		if (player.position().left + player.width() >= $('#background').width()) {
			nextScreen();
			player.css('left', '0px');
			player.timeout = setTimeout(arguments.callee, player.speed);
		} else if (player.position().left + player.width() >= $('#person').position().left - 50) {
			clearTimeout(player.timeout);
			if (!questioning) {
				question();
				questioning = true;
				$('body').off('keydown');
			}
		} else {
			player.css('left', player.position().left + 1 + 'px');
			player.timeout = setTimeout(arguments.callee, player.speed);
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
				answer();
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