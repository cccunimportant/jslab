var C = console;
var V = require("../js/V");
var R = require("../js/R");

var x1 = rnorm(1000, 10, 2);
var y1 = R.rnorm(1000, 10, 2);
var x2 = R.rnorm(1000, 1, 1);
var y2 = R.rnorm(1000, 1, 1);

C.log("x1.mean=%d, x1.sd=%d", V.mean(x1), V.sd(x1,1));

var fnorm = function(x) { return R.dnorm(x, 10, 2); }
var funif = function(x) { return R.dunif(x, 2, 8); }

C.log("R.dnorm(9, 10, 2)="+R.dnorm(9, 10, 2));

var x = R.rnorm(25, 5, 2);
C.log("x=%j\nx.mean()=%d x.sd()=%d", x, V.mean(x), V.sd(x,1));

var t = R.ttest(5.2, x, 2);
C.log("t=%j", t);

/*
var xq = R.qnorm(0.975, );
C.log("xq=%d", xq);
*/
