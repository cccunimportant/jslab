var C = console;
var V = require("../js/V");
var R = require("../js/R");
var G = require("../js/G");

var x1 = R.rnorm(1000, 10, 2);
var y1 = R.rnorm(1000, 10, 2);
var x2 = R.rnorm(1000, 1, 1);
var y2 = R.rnorm(1000, 1, 1);

C.log("x1.mean=%d, x1.sd=%d", V.mean(x1), V.sd(x1,1));

var fnorm = function(x) { return R.dnorm(x, 10, 2); }
var funif = function(x) { return R.dunif(x, 2, 8); }

C.log("R.dnorm(9, 10, 2)="+R.dnorm(9, 10, 2));

var g  = new G();
g.curve("normal", -5, 15, 0.1, fnorm);
g.curve("uniform",-5, 15, 0.1, funif);

g.hist("x1", 0, 20, 1, x1);
C.log(JSON.stringify(g.g));

var Ax = R.rnorm(100, 10, 2);
var Ay = R.rnorm(100, 1, 2);
var Bx = R.rnorm(100, 0, 1);
var By = R.rnorm(100, 0, 1);
g.plot("A", Ax, Ay);
g.plot("B", Bx, By);

// g.show();


