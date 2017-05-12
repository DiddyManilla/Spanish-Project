/*global $*/
var player;
$(function() {
	var images = ['Casa', 'Partido', 'Concierto'];
	var keys = {left: false, right: false, space: false};
	//Each conversation is an array of questions, each with text, answers, and correctAnswer.
	var NPCs = ['Mom', 'Soccer_Player', 'Concert_Goer'];
	var conversations = [
		//Screen 1, Home
		[
			{
				'text': 'Buenos dias, hijo! Como estas?',
				'answers' : ['Yo estoy bueno. Y tu, Mama?',
					 'Yo estas bien. Y tu, Mama?',
					 'Yo esto bueno. Y tu, Mama?',
					 'Yo estoy bien. Y tu, Mama?'],
				'correctAnswer': 3
			},
			{
				'text': 'Yo estoy bien. Que te gusta hacer?',
				'answers' : [
					'Me gusto veo deportes.',
					'Te gusta ver deportes.',
					'Me gusta ver deportes.',
					'Te gusto veo deportes.'],
				'correctAnswer': 2
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
		],
		
		//Screen 2, Soccer game
		[
			{
				'text': `Hola! Como te llamas?`,
				'answers' : [
					'Te llamas Julio. Y usted?',
					'Te llamo Julio. Y usted?',
					'Me llama Julio. Y usted?',
					'Me llamo Julio. Y usted?'],
				'correctAnswer': 3
			},
			{
				'text': 'Me llamo Givanildo. Cuantas personas hay aqui para ver el partido?',
				'answers' : [
					'Hay mucho personas aqui.',
					'Hay muchas personas aqui.',
					'Hay muchos personos aqui.',
					'Hay mucha personas aqui.'],
				'correctAnswer': 1
			},
			{
				'text': 'Cual juego juegan ellos?',
				'answers' : [
					'Ellos juegan futbol. Hasta luego!',
					`Ellos escalan una montana. Hasta luego!`,
					`Ellos nadan en el oceano. Hasta luego!`,
					'Ellos juegan baloncesto. Ciao!'],
				'correctAnswer': 0
			}
		],
		
		//Screen 3, Concert
		[
			{
				'text': 'Hola! Donde estamos?',
				'answers' : [
					'Somos en un cine.',
					'Estamos en un concierto.',
					'Estamos en un cafe.',
					'Somos en un restaurante.'],
				'correctAnswer': 1
			},
			{
				'text': 'De que tipo es este concierto?',
				'answers' : [
					'Es un opera.',
					'Es un orquesta.',
					'Es un concierto de rock.',
					'Es un concierto coral.'],
				'correctAnswer': 2
			},
			{
				'text': 'Que instrumento toca el?',
				'answers' : [
					'El toca un guitarra.',
					'El toca un violin.',
					'El toca un piano.',
					'El toca una guitarra.'],
				'correctAnswer': 3
			}
		]
	];
	var conversation = conversations.shift();
	player = $('#player');
	player.speed = 5;
	
	player.score = 0;
	var numQuestions = 0;
	
	var keyDownHandler = function(event) {

		if (event.keyCode == 37 && !keys.left) {
			keys.left = true;
			moveLeft();
		} else if (event.keyCode == 39 && !keys.right) {
			keys.right = true;
			moveRight();
		} else if (event.keyCode == 32 && !keys.space) {
			keys.space = true;
			$('body').trigger('spacebar');
		}
	};
	var questioning = false;
	var answered = false;
	var loaded = {player: false, person: false, background: false};
	
	//Load player icon
	$('<img id="player-icon" src="img/Julio.png"/>').on('load', function() {
		$(this).appendTo('#player');
		player.css('height', $('#player-icon').css('height'));
		player.css('width', $('#player-icon').css('width'));
		
		loaded.player = true;
		if (loaded.player && loaded.person && loaded.background) {
			$('body').on('keydown', keyDownHandler);
			$('main').removeClass('invisible');
		}
	});
	
	//Load NPC icon
	$('<img id="person-icon" src="img/' + NPCs.shift() + '.png"/>').on('load', function() {
		$(this).appendTo('#person');
		$('person').css('height', $('#player-icon').css('height'));
		$('person').css('width', $('#player-icon').css('width'));
		
		loaded.person = true;
		if (loaded.player && loaded.person && loaded.background) {
			$('body').on('keydown', keyDownHandler);
			$('main').removeClass('invisible');
		}
	});
	
	//Load background image
	$('<img id="background" src="img/'+ images.shift() +'.png">').on('load', function() {
		$(this).appendTo('main');
		$('main').css('height', $('#background').css('height'));
		$('main').css('width', $('#background').css('width'));
		$('#loading').css('height', $('main').css('height'));
		$('#loading').css('width', $('main').css('width'));
		
		loaded.background = true;
		if (loaded.player && loaded.person && loaded.background) {
			$('body').on('keydown', keyDownHandler);
			$('main').removeClass('invisible');
		}
	});

	function end() {
		$('#score').text(`You scored ${player.score} out of a possible ${numQuestions} points!
		${player.score > numQuestions?'That shouldn\'t have happened...':player.score == numQuestions?'A perfect score!':'Good job!'}`);
		$('#results').css('height', $('main').css('height'));
		$('#results').css('width', $('main').css('width'));
		$('#results').removeClass('invisible');
	}
	
	function nextScreen() {
		if (images.length) {
			conversation = conversations.shift();
			$('#loading').removeClass('invisible');
			loaded.background = false;
			loaded.person = false;
			var background = $('<img id="background" src="img/'+ images.shift() +'.png">');
			var npc = $('<img src="img/' + NPCs.shift() + '.png">');
			npc.on('load', function() {
				loaded.person = true;
				if (loaded.person && loaded.background) {
					$('#person').empty();
					npc.appendTo('#person');
					
					$('#background').remove();
					
					$('#loading').addClass('invisible');
					
					background.appendTo('main');
					$('main').css('height', $('#background').css('height'));
					$('main').css('width', $('#background').css('width'));
					
					$('#loading').css('height', $('main').css('height'));
					$('#loading').css('width', $('main').css('width'));
					answered = false;
				}
			});
			
			background.on('load', function() {
				loaded.background = true;
				if (loaded.person && loaded.background) {
					$('#person').empty();
					npc.appendTo('#person');
					
					$('#background').remove();
					
					$('#loading').addClass('invisible');
					
					background.appendTo('main');
					$('main').css('height', $('#background').css('height'));
					$('main').css('width', $('#background').css('width'));
					
					$('#loading').css('height', $('main').css('height'));
					$('#loading').css('width', $('main').css('width'));
					answered = false;
				}
			});
		} else {
			end();
		}
	}

	function moveLeft() {
		if (!(player.position().left + player.width() >= $('#person').position().left - 50 && !answered)
				&& $('#loading').hasClass('invisible') && player.position().left > 0) {
			player.css('left', player.position().left - 1 + 'px');
			player.timeout = setTimeout(arguments.callee, player.speed);
		}
	}
	
	function moveRight() {
		if (player.position().left + player.width() >= $('#background').width()) {
			nextScreen();
			player.css('left', '50px');
		} else if (player.position().left + player.width() >= $('#person').position().left - 50 && !answered) {
			if (!questioning) {
				question();
				questioning = true;
			}
		} else if ($('#loading').hasClass('invisible')) {
			player.css('left', player.position().left + 1 + 'px');
		}
		player.timeout = setTimeout(arguments.callee, player.speed);
	}
	
	
	
	function question() {
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
				numQuestions++;
				if (correct) {
					player.score++;
				} else {
					$(this).css('background-color', '#ff6060');
				}
				
				$(answers[question.correctAnswer]).css('background-color', '#35f24e');
				$('#continue').removeClass('invisible');
				
				answers.off('click');
				$('body').on('spacebar', function() {
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

	$('body').on('keyup', function(event) {

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