<?php
$packedImage = imagecreatefrompng('packed.png');
$imageWidth = imagesx($packedImage);
$imageHeight = imagesy($packedImage);

$output = '';
for ($y = 0; $y < $imageHeight; ++$y) {
	for ($x = 0; $x < $imageWidth; ++$x) {
		$pixel = imagecolorat($packedImage, $x, $y);
		
		$r = ($pixel >> 16) & 0xFF;
		$g = ($pixel >> 8) & 0xFF;
		$b = $pixel & 0xFF;
		
		$output .= chr($r).chr($g).chr($b);
	}
}
$output = trim($output);
$original = file_get_contents('wordlist.txt');
echo ((strlen($original) == strlen($output)) ? 'Matches' : 'No Match').PHP_EOL;

imagedestroy($packedImage);
file_put_contents('unpacked.txt',$output);
?>