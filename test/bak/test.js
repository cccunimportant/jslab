var C = console;
var V = require("../js/V");
var R = require("../js/R");
var G = require("../js/G");

var x1 = R.rnorm(1000, 10, 2);
var y1 = R.rnorm(1000, 10, 2);
var x2 = R.rnorm(1000, 1, 1);
var y2 = R.rnorm(1000, 1, 1);

C.log("x1.mean=%d, x1.sd=%d", V.mean(x1), V.sd(x1,1));

function M_test() {
  var M = require("../js/numeric");
  var A = [[1,2,3],[4,5,6]];
  var x = [7,8,9];
  var b = M.dot(A,x);

  C.log("A=%j x=%j b=%j", A, x, b);

  var B = [[22,10,2,3,7],[14,7,10,0,8],[-1,13,-1,-11,3],[-3,-2,13,-2,4],[9,8,1,-2,4],[9,1,-7,5,-1],[2,-6,6,5,1],[4,5,0,-2,2]];
  var Bsvd = M.svd(B);
  C.log("Bsvd=%j", Bsvd);
}

var fnorm = function(x) { return R.dnorm(x, 10, 2); }
var funif = function(x) { return R.dunif(x, 2, 8); }
C.log("R.dnorm(9, 10, 2)="+R.dnorm(9, 10, 2));

var g  = new G();
/*
g.curve("normal", -5, 15, 0.1, fnorm);
g.curve("uniform",-5, 15, 0.1, funif);
*/

g.hist("x1", 0, 20, 1, x1);
C.log(JSON.stringify(g.g));

/*
var Ax = R.rnorm(100, 10, 2);
var Ay = R.rnorm(100, 1, 2);
var Bx = R.rnorm(100, 0, 1);
var By = R.rnorm(100, 0, 1);
g.plot("A", Ax, Ay);
g.plot("B", Bx, By);
*/
// g.show();


