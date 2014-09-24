var R = require("../js/R");

var x = rnorm(25, 5, 2);
C.log("x=%s\nmean(x)=%d sd(x)=%d", toStr(x,2), mean(x), sd(x,1));

var t = ttest(5.2, x, 2);
C.log("t=%j", t);

