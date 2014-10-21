var C = console;

var M = require("../js/numeric");
var A = [[1,2,3],[4,5,6]];
var x = [7,8,9];
var b = M.dot(A,x);

C.log("A=%j x=%j b=%j", A, x, b);

var B = [[22,10,2,3,7],[14,7,10,0,8],[-1,13,-1,-11,3],[-3,-2,13,-2,4],[9,8,1,-2,4],[9,1,-7,5,-1],[2,-6,6,5,1],[4,5,0,-2,2]];
var Bsvd = M.svd(B);
C.log("Bsvd=%j", Bsvd);

x = [7,8,9];
y = [10,1,2];

C.log("M['+'](x,y)="+M['+'](x,y));
C.log("M['>'](x,y)="+M['>'](x,y));

