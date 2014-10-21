var x = sample(10000, s(0,6));
var y = sample(10000, s(0,6));
var z = sample(10000, s(0,6));

xrange(0, 18);
hist(x, "x");

var xy=M["+"](x,y)
hist(xy, "x+y");

var xyz=M["+"](x,y,z);
hist(xyz, "x+y+z");

