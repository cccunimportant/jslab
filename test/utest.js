var U = require("../source/U");
U.use("../source/R", "R");
log("U.getModule()="+U.getModule());
log("rnorm="+rnorm);
log("rnorm(5, 2, 1)="+str(rnorm(5,2,1)));
// var x = rnorm(100, 0, 2);
// log("tci(x, 1, 0.05)="+tci(x, 0.05));
// log("zci(x, 1, 0.05)="+zci(x, 0.05));

var x = [7.169890,2.188864,2.963868,7.790631,2.474261,7.694849,1.585007,4.087697,3.051643,4.697559];

log("ttest(x, 6, 0.05)="+JSON.stringify(ttest(x,6,0.05)));

