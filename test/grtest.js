var C = console;
var V = require("../js/V");
var R = require("../js/R");

var x1 = rnorm(1000, 10, 2);
var y1 = rnorm(1000, 10, 2);
var x2 = rnorm(1000, 1, 1);
var y2 = rnorm(1000, 1, 1);

C.log("x1.mean=%d, x1.sd=%d", mean(x1), sd(x1,1));

var fnorm = function(x) { return dnorm(x, 10, 2); }
var funif = function(x) { return dunif(x, 2, 8); }

C.log("dnorm(9, 10, 2)="+dnorm(9, 10, 2));

var x = rnorm(25, 5, 2);
C.log("x=%j\nmean(x)=%d sd(x)=%d", x, mean(x), sd(x,1));

var t = ttest(5.2, x, 2);
C.log("t=%j", t);

/*
var xq = R.qnorm(0.975, );
C.log("xq=%d", xq);
*/
