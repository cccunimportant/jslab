var U = require("../source/U");
U.use("../source/R", "R");

// x = rnorm(10, 5, 2)
var x = [7.169890 ,2.188864 , 2.963868 ,7.790631 ,2.474261 ,7.694849 ,1.585007 ,4.087697 ,3.051643 ,4.697559];
// y = rnorm(10, 4,2)
var y = [4.9627295,6.0336209,-0.4610221,7.3744023,2.4804347,7.2053190,3.5558563,3.6505476,2.2200754,5.3021459];
// py = x + rnorm(10, 1, 2)
var py= [9.829046 ,2.491387 ,6.037504  ,5.709755 ,5.461208 ,7.345603 ,3.040538 ,4.856838 ,3.195437 ,7.079105];

log("x="+str(x));
log("y="+str(y));

ttest({x:x, mu:6, alpha:0.05, op:"="}).report();

/* 
> t.test(x, mu=6, alpha=0.05)

        One Sample t-test

data:  x
t = -2.1732, df = 9, p-value = 0.05781
alternative hypothesis: true mean is not equal to 6
95 percent confidence interval:
 2.674155 6.066699
sample estimates:
mean of x 
 4.370427 */

ttest({x:x, mu:6, alpha:0.05, op:"<"}).report();

/*
> t.test(x, mu=6, alternative="greater")

        One Sample t-test

data:  x
t = -2.1732, df = 9, p-value = 0.9711
alternative hypothesis: true mean is greater than 6
95 percent confidence interval:
 2.995873      Inf
sample estimates:
mean of x 
 4.370427 
*/

ttest({x:x, mu:6, alpha:0.05, op:">"}).report();

/*
> t.test(x, mu=6, alternative="less")

        One Sample t-test

data:  x
t = -2.1732, df = 9, p-value = 0.02891
alternative hypothesis: true mean is less than 6
95 percent confidence interval:
     -Inf 5.744981
sample estimates:
mean of x 
 4.370427 
*/

ztest({x:x, mu:6, sd:2.5, alpha:0.05, op:"="}).report();

ttest({x:x, y:y, mu:1, alpha:0.05, varequal:true, op:"="}).report();

/*
> t.test(x, y, mu=1, conf.level=0.95, var.equal=T, alternative="two.sided");

        Two Sample t-test

data:  x and y
t = -0.8012, df = 18, p-value = 0.4335
alternative hypothesis: true difference in means is not equal to 1
95 percent confidence interval:
 -2.122363  2.398395
sample estimates:
mean of x mean of y 
 4.370427  4.232411 */

ttest({x:x, y:py, mu:-1, alpha:0.05, paired:true, op:"="}).report();

/*
> t.test(x, py, mu=-1, conf.level=0.95, paired=T)

        Paired t-test

data:  x and py
t = -0.252, df = 9, p-value = 0.8067
alternative hypothesis: true difference in means is not equal to -1
95 percent confidence interval:
 -2.33885689  0.07042649
sample estimates:
mean of the differences 
              -1.134215 */

ttest({x:x, y:y, mu:1, alpha:0.05, op:"="}).report();

/*
> t.test(x, y, mu=1, conf.level=0.95, alternative="two.sided");

        Welch Two Sample t-test

data:  x and y
t = -0.8012, df = 17.985, p-value = 0.4335
alternative hypothesis: true difference in means is not equal to 1
95 percent confidence interval:
 -2.122495  2.398527
sample estimates:
mean of x mean of y 
 4.370427  4.232411 
*/

ftest({x:x, y:y}).report();

/*
> var.test(x,y)

        F test to compare two variances

data:  x and y
F = 0.9445, num df = 9, denom df = 9, p-value = 0.9337
alternative hypothesis: true ratio of variances is not equal to 1
95 percent confidence interval:
 0.2346094 3.8026974
sample estimates:
ratio of variances 
         0.9445362 
*/

var vx = [175, 176, 173, 175, 174, 173, 173, 176, 173, 179];
vartest({x:vx, sd:2, alpha:0.05, op:"="}).report();
// R 軟體沒有此函數，測試請看湯銀才 143 頁
// 信賴區間 (1.793, 12.628)

binomtest({x:7, n:12, p:0.4, op:">"}).report();

/*
> binom.test(x=7, n=12, p=0.4, alternative="less")

        Exact binomial test

data:  7 and 12
number of successes = 7, number of trials = 12, p-value = 0.9427
alternative hypothesis: true probability of success is less than 0.4
95 percent confidence interval:
 0.0000000 0.8189752
sample estimates:
probability of success 
             0.5833333 
*/

binomtest({x:7, n:12, p:0.4, op:"<"}).report();
/*
> binom.test(x=7, n=12, p=0.4, alternative="greater")

        Exact binomial test

data:  7 and 12
number of successes = 7, number of trials = 12, p-value = 0.1582
alternative hypothesis: true probability of success is greater than 0.4
95 percent confidence interval:
 0.3152378 1.0000000
sample estimates:
probability of success 
             0.5833333 
*/



binomtest({x:7, n:12, p:0.4}).report(); // 有誤，p-value 與 R 不同

/*
> binom.test(x=7, n=12, p=0.4)

        Exact binomial test

data:  7 and 12
number of successes = 7, number of trials = 12, p-value = 0.2417 ==> R.js ??? error : pvalue  : 0.1146
alternative hypothesis: true probability of success is not equal to 0.4
95 percent confidence interval:
 0.2766697 0.8483478
sample estimates:
probability of success 
             0.5833333 
*/


proptest({x:91, n:100, p:0.9, correct:false}).report();

/*  1-sample proportions test without continuity correction

data:  91 out of 100, null probability 0.9
X-squared = 0.1111, df = 1, p-value = 0.7389
alternative hypothesis: true p is not equal to 0.9
95 percent confidence interval:
 0.8377379 0.9519275
sample estimates:
   p 
0.91 */

proptest({x:23, n1:102, y:25, n2:135, correct:false}).report();

/*
> success = c(23, 25)
> total = c(102, 135)
> prop.test(success, total)

        2-sample test for equality of proportions with continuity correction

data:  success out of total
X-squared = 0.3615, df = 1, p-value = 0.5477
alternative hypothesis: two.sided
95 percent confidence interval:
 -0.07256476  0.15317478
sample estimates:
   prop 1    prop 2 
0.2254902 0.1851852 
*/

proptest({x:8, n1:100, y:12, n2:200, op:"<", correct:false}).report();

/*
> prop.test(c(8,12), c(100,200), alternative="greater", correct=F)

        2-sample test for equality of proportions without continuity
        correction

data:  c(8, 12) out of c(100, 200)
X-squared = 0.4286, df = 1, p-value = 0.2563
alternative hypothesis: greater
95 percent confidence interval:
 -0.03248088  1.00000000 => R.js ??? [-0.0303,Infinity]
sample estimates:
prop 1 prop 2 
  0.08   0.06 
*/