var R = require("../source/R");

var x1 = rnorm(1000, 10, 2);
var y1 = R.rnorm(1000, 10, 2);
var x2 = R.rnorm(1000, 1, 1);
var y2 = R.rnorm(1000, 1, 1);

C.log("mean(x1)=%d, sd(x1)=%d", mean(x1), sd(x1,1));

var fnorm = function(x) { return dnorm(x, 10, 2); }
var funif = function(x) { return dunif(x, 2, 8); }

C.log("dnorm(9, 10, 2)="+dnorm(9, 10, 2));

var x = R.rnorm(25, 5, 2);
C.log("x=%j\nx.mean()=%d x.sd()=%d", str(x), mean(x), sd(x,1));

var t = R.ttest(5.2, x, 2);
C.log("t=%j", t);

var a = [1,2,3,4];
C.log("normalize(a)="+normalize(a));

C.log("sample(10, [0,1], [0.9,0.1])="+sample(10, [0,1], [0.9, 0.1]));

