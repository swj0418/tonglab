function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

/* Make sure all numbers in an array are between 0 and 360: */
function wrap(v) {
  	for (var i=0; i<v.length; i++) {
    	if (v[i]>360) { v[i]-=360; }
    	if (v[i]<0) { v[i]+=360; }
  	}
  	return v;
} 

function convertTo($type, $num) {
    if ($type == "rads") {$result = $num*((Math.PI)/180);}
	if ($type == "degs") {$result = $num*(180/(Math.PI));}
    return $result;
}