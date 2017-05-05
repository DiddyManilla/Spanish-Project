/*global $*/
$(function() {
	var images = ['Casa', 'Partido'];
	var keys = {left: false, right: false, space: false};
	//Each conversation is an array of questions, each with text, answers, and correctAnswer.
	var conversations = [
		[
				{
					'text': 'Buenos dias! Como estas?',
					'answers' : ['Yo estoy bueno. Y tu?',
						 'Yo estas bien. Y tu?',
						 'Yo esto bueno. Y tu?',
						 'Yo estoy bien. Y tu?'],
					'correctAnswer': 3
				},
				{
					'text': 'Adonde vas?',
					'answers' : [
						'Yo voy al Partido. Adios!',
						'Yo voy a la Partido. Adios!',
						'Yo vas a el Partido. Adios!',
						'Yo vamos al Partido. Adios!'],
					'correctAnswer': 0
				}
			
		]
	];
	var conversation = conversations.shift();
	/*var questions = [{
		'text': 'Buenos dias! Adonde vas?',
		'answers' : ['Buenos dias! Yo voy al Partido.',
					 'Buenos dias! Yo voy a la Partido',
					 'Buenos dias! Yo vas a el Partido.',
					 'Buenos dias! Yo vamos al Partido.'],
		'correctAnswer': 0
	},
	{
		'text': 'Hola! Que te gusta hacer?',
		'answers': ['Me gusta juego futbol. Adios!',
					'Me gusta jugar futbol. Adios!',
					'Te gusta juego futbol. Adios!',
					'Te gusta jugar futbol. Adios!'],
		'correctAnswer': 1
	}];*/
	var player = $('#player');
	player.speed = 5;
	
	player.score = 0;
	player.maxScore = 2;
	
	var questioning = false;
	var answered = false;
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

			conversation = conversations.shift();
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
		if (!(player.position().left + player.width() >= $('#person').position().left - 50 && !answered)) {
			player.css('left', player.position().left - 1 + 'px');
			player.timeout = setTimeout(arguments.callee, player.speed);
		}
	}
	
	function moveRight() {
		if (player.position().left + player.width() >= $('#background').width()) {
			console.log('Next screen');
			nextScreen();
			player.css('left', '0px');
		} else if (player.position().left + player.width() >= $('#person').position().left - 50 && !answered) {
			console.log('Player is past NPC.');
			if (!questioning) {
				question();
				questioning = true;
			}
		} else {
			console.log('Player is moving');
			player.css('left', player.position().left + 1 + 'px');
		}
		player.timeout = setTimeout(arguments.callee, player.speed);
	}
	
	
	
	function question() {
		console.log(conversation.length);
		var questionFunction = arguments.callee;
		
		if (conversation.length) {
			var question = conversation.shift();
			$('#question').text(question.text);
			var answers = $('#answers li');
			
			answers.each(function(i) {
				$(this).text(question.answers[i]);
				$(this).css('background-color', '#dedede');
				$(this).on('mouseover', function() {
					$(this).css('background-color', '#bebebe');
				}).on('mouseout', function() {
					$(this).css('background-color', '#dedede');
				});
			});
			
			answers.on('click', function(event) {
				
				var correct = $(this).text() == question.answers[question.correctAnswer];
				
				if (correct) {
					player.score++;
				} else {
					$(this).css('background-color', '#ff6060');
				}
				
				$(answers[question.correctAnswer]).css('background-color', '#35f24e');
				$('#continue').removeClass('invisible');
				
				answers.off('click');
				$('body').on('spacebar', function() {
					console.log('spacebar');
					$('#continue').addClass('invisible');
					$('body').off('spacebar');
					if (conversation.length) {
						questionFunction();
					} else {
						$('#question-box').addClass('hidden');
						$('#question-box').removeClass('show');
						questioning = false;
						answered = true;
					}
					
					
				});
				answers.off('mouseover').off('mouseout');
				
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
		} else if (event.keyCode == 32 && !keys.space) {
			keys.space = true;
			console.log('spacebar');
			$('body').trigger('spacebar');
		}
	})


	.on('keyup', function(event) {

		if (event.keyCode == 37) {
			keys.left = false;
			clearTimeout(player.timeout);
		} else if (event.keyCode == 39) {
			
			keys.right = false;
			clearTimeout(player.timeout);
		} else if (event.keyCode == 32) {
			keys.space = false;
		}
	});



});