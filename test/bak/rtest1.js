var R = require("../source/R");

var x = rnorm(25, 5, 2);
C.log("x=%s\nmean(x)=%d sd(x)=%d", str(x), mean(x), sd(x,1));

C.log("x=%s", R.str(x));

var t = ttest(5.2, x, 2);
C.log("t=%j", t);

C.log("qnorm(0.5, 5, 2)="+qnorm(0.5, 5, 2));

C.log("qunif(0.5, 3, 5)="+qunif(0.5, 3, 5));
