var G = require("../js/G");
var R = require("../js/R");

var c = console;
var fnorm = function(x) { return R.dnorm(x, 10, 2); }
var funif = function(x) { return R.dunif(x, 2, 8); }

c.log("R.dnorm(9, 10, 2)="+R.dnorm(9, 10, 2));
var g  = new G();
g.curve("normal", -5, 15, 1, fnorm);
g.curve("uniform",-5, 15, 1, funif);
c.log("%j", g.g);
// g.show();

      