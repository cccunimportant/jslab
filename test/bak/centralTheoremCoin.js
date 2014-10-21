var x = sample(1000, [0,1]);
var y = sample(1000, [0,1]);
var z = sample(1000, [0,1]);

xrange(0, 5);

hist(x, "x");

var xy=M["+"](x,y)
hist(xy, "x+y");

var xyz=M["+"](x,y,z);
hist(xyz, "x+y+z");

