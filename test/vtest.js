var C = console;
var V = require("../js/V");
var a = [1,2,3], b=[4,5,6];

C.log("a.mean=%d, a.sd=%d", V.mean(a), V.sd(a,1));

C.log("a.dot(b)=%d", V.dot(a,b));
