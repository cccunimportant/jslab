var R = require("../js/R");
var x1 = R.rnorm(1000, 10, 2);
var y1 = R.rnorm(1000, 10, 2);
var x2 = R.rnorm(1000, 1, 1);
var y2 = R.rnorm(1000, 1, 1);

R.log("x1.mean=%d, x1.sd=%d", R.mean(x1), R.sd(x1,1));




