(function(gameEngine,wordlist) {
	
	wordlist.words = [
	];
	
	wordlist.init = function() {
		var canvas = $('<canvas>');
		canvas = canvas.get(0);
		var context = canvas.getContext('2d');
		
		var image = new Image();
		image.onload = function(e) {
			context.drawImage(this,0,0,this.width,this.height);
			
			var i = 0;
			var output = '';
			var imageData = context.getImageData(0,0,this.width,this.height);
			for (i = 0; i <= imageData.data.length; i+=4) {
				output += String.fromCharCode(imageData.data[i+0]);
				output += String.fromCharCode(imageData.data[i+1]);
				output += String.fromCharCode(imageData.data[i+2]);
			}
			gameEngine.wordlist.words = output.split(',');
			
			gameEngine.gameInit();
		};
		image.src = wordData;
	};
	
	wordlist.checkWord = function(word) {
		return (wordlist.words.indexOf(word.toLowerCase()) !== -1);
	};
})(window.gameEngine,window.gameEngine.wordlist = (window.gameEngine.wordlist || {}));