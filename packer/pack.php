<?php
define('IMAGE_COMP_LEVEL', 9);
define('COLOR_CHANNELS', 3);

$wordList = file_get_contents('wordlist.txt');
$listLength = strlen($wordList);
echo 'Size of data: '.$listLength.PHP_EOL;
echo 'Number of pixels in data: '.($listLength/COLOR_CHANNELS).PHP_EOL;
$imageSide = round(sqrt($listLength/COLOR_CHANNELS));
echo 'Size of actual side: '.$imageSide.PHP_EOL;
echo 'Number of pixels in image size: '.(($imageSide*$imageSide)/COLOR_CHANNELS).PHP_EOL;

$packImage = imagecreatetruecolor($imageSide, $imageSide);
$i = 0;
for ($y = 0; $y < $imageSide; ++$y) {
	for ($x = 0; $x < $imageSide; ++$x) {
		$r = (isset($wordList[$i+0]) ? ord($wordList[$i+0]) : 0);
		$g = (isset($wordList[$i+1]) ? ord($wordList[$i+1]) : 0);
		$b = (isset($wordList[$i+2]) ? ord($wordList[$i+2]) : 0);
		
		$currPixel = imagecolorallocate($packImage, $r, $g, $b);
	
		imagesetpixel($packImage, $x, $y, $currPixel);
	
		$i+=3;
	}
}
imagepng($packImage,'packed.png',IMAGE_COMP_LEVEL,PNG_NO_FILTER);
imagedestroy($packImage);

// convert to b64
file_put_contents('packed.txt','data:image/png;base64,'.base64_encode(file_get_contents('packed.png')));
?>