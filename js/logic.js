(function(gameEngine,logic) {

	var diceTypes = {
		'4': [
			{'sides':'AACIOT'},
			{'sides':'ABILTY'},
			{'sides':'ABJMOQ'},
			{'sides':'ACDEMP'},
			{'sides':'ACELRS'},
			{'sides':'ADENVZ'},
			{'sides':'AHMORS'},
			{'sides':'BIFORX'},
			{'sides':'DENOSW'},
			{'sides':'DKNOTU'},
			{'sides':'EEFHIY'},
			{'sides':'EGKLUY'},
			{'sides':'EGINTV'},
			{'sides':'EHINPS'},
			{'sides':'ELPSTU'},
			{'sides':'GILRUW'}
		],
		'5': [
			{'sides':'AAAFRS'},
			{'sides':'AAEEEE'},
			{'sides':'AAFIRS'},
			{'sides':'ADENNN'},
			{'sides':'AEEEEM'},
			{'sides':'AEEGMU'},
			{'sides':'AEGMNN'},
			{'sides':'AFIRSY'},
			{'sides':'BJKQXZ'},
			{'sides':'CCENST'},
			{'sides':'CEIILT'},
			{'sides':'CEILPT'},
			{'sides':'CEIPST'},
			{'sides':'DDHNOT'},
			{'sides':'DHHLOR'},
			{'sides':'DHLNOR'},
			{'sides':'DHLNOR'},
			{'sides':'EIIITT'},
			{'sides':'EMOTTT'},
			{'sides':'ENSSSU'},
			{'sides':'FIPRSY'},
			{'sides':'GORRVW'},
			{'sides':'IPRRRY'},
			{'sides':'NOOTUW'},
			{'sides':'OOOTTU'}
		]
	};
	
	var gameDurations = { '4': 3, '5': 3, '6': 4 };

	var diceList = [];
	
	var usedDice = [];
	var usedWords = [];
	
	logic.wordScore = function(word) {
		switch (word.length) {
			case 3:
			case 4:
				return 1;
				break;
			case 5:
				return 2;
				break;
			case 6:
				return 3;
				break;
			case 7:
				return 5;
				break;
			default:
				return 11;
		}
	};
	
	logic.update = function() {
		if (!gameEngine.pause) {
			if (gameEngine.timer >= (gameDurations[gameEngine.ui.SIZE] * 60)) gameEngine.pause = true;
			var wordListString = usedWords.join("\n");
			
			if ($('#wordList').text() !== wordListString) $('#wordList').text(wordListString);
		}
	};

	logic.init = function() {
		console.log('Game Logic Initializing...');
		
		var diceIndex;
		
		usedDice = [];
		
		diceList = diceTypes[gameEngine.ui.SIZE];
		
		if (diceList.length > 0) {
			// seed cells
			$('.cell').each(function(i,cell) {
				diceIndex = 0;
				
				while ((usedDice.length < diceList.length) && (usedDice.indexOf(diceIndex) != -1)) diceIndex = gameEngine.utils.rand(diceList.length);
				
				if (usedDice.length <= diceList.length) {
					var selectedDie = diceList[diceIndex].sides;
					var selectedChar = selectedDie.substr(gameEngine.utils.rand(selectedDie.length),1);
					
					// special case
					if (selectedChar === 'Q') selectedChar = 'Qu';
					
					$(this).append($('<label>').text(selectedChar));
					
					usedDice.push(diceIndex);
				}
			});
		}
		
		var firstCell = null;
		var selectedCells = [];
		
		gameEngine.container.mousedown(function(e) {
			if (!gameEngine.pause) {
				firstCell = $(e.target);
				if (firstCell.is('.cell > label')) {
					firstCell.parent('.cell').attr('data-selected',true);
					
					if (selectedCells.indexOf(firstCell.parent('.cell').attr('data-index')) == -1) selectedCells.push(firstCell.parent('.cell').attr('data-index'));
				}
			}
		});
		
		gameEngine.container.mouseup(function(e) {
			if (!gameEngine.pause) {
				firstCell = null;
				var selectedWord = '';
				$.each(selectedCells, function(i,cellIndex) {
					selectedWord += $('.cell[data-index="'+cellIndex+'"] label').text().toLowerCase();
				});
				
				if (selectedWord.length > 2) {
					if (gameEngine.wordlist.checkWord(selectedWord)) {
						if (usedWords.indexOf(selectedWord) == -1) {
							var scoreValue = logic.wordScore(selectedWord);
							gameEngine.updateScore(scoreValue);
							usedWords.push(selectedWord);
						}
					}
				}
				$('.cell').removeAttr('data-selected');
				selectedCells = [];
			}
		});
		
		gameEngine.container.mousemove(function(e) {
			if (!gameEngine.pause) {
				var selectedCell = $(e.target);
				if ((firstCell !== null) && (selectedCell !== firstCell) && (selectedCell.is('.cell > label'))) {
					selectedCell.parent('.cell').attr('data-selected',true);
					if (selectedCells.indexOf(selectedCell.parent('.cell').attr('data-index')) == -1) selectedCells.push(selectedCell.parent('.cell').attr('data-index'));
				}
			}
		});
		
		console.log('Game Logic Initialized.');
	};
})(window.gameEngine,window.gameEngine.logic = (window.gameEngine.logic || {}));