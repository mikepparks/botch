(function(gameEngine,ui) {
	ui.SIZE = 5;
	
	var seconds = 0;
	
	ui.updateScore = function() {
		$('#scoreDisplay').text(gameEngine.score);
	};
	
	ui.updateTime = function() {
		var seconds = gameEngine.utils.pad(parseInt(gameEngine.timer % 60),2,'0');
		var minutes = gameEngine.utils.pad(parseInt(gameEngine.timer / 60),2,'0');
		$('#timeDisplay').text(minutes + ':' + seconds);
	};
	
	ui.init = function() {
		console.log('Game UI Initializing...');
		
		var x,y;
		
		for (y = 0; y < ui.SIZE; ++y) {
			for (x = 0; x < ui.SIZE; ++x) {
				gameEngine.container.append($('<div class="cell size'+ui.SIZE+'">').attr({'data-x':x,'data-y':y,'data-index':(y * ui.SIZE + x)}));
			}
		}
		
		ui.updateScore();
		
		console.log('Game UI Initialized.');
	};
})(window.gameEngine,window.gameEngine.ui = (window.gameEngine.ui || {}));