// jStat 資料請參考 -- http://jstat.github.io/test.html
// 函數預設值的寫法 -- 請參考 http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function

R = {};

if (typeof(module)!=="undefined") {
  jStat = require("../js/jstat");
  M = require("../js/numeric");
  R = global;
  V = global;
  R.inBrowser = false;
  module.exports = R;
} else {
  R = window;
  V = window;
  M = numeric;
  R.inBrowser = true;
}

C = console;
R.C = console;

R.M = M
R.str=M.prettyPrint;
M.precision = 2;
M.largeArray = 100;

V.def=function(arg, value) {
   return (typeof arg == 'undefined' ? value : arg);
}

// ------------------------ 陣列數值函數 ------------------------------
// max(a0..an)
V.max=function(a) {
  var r=Number.MIN_VALUE;
  for (var i in a)
    if (a[i]>r) r=a[i];
  return r;
}

// min(a0..an)
V.min=function(a) {
  var r=Number.MAX_VALUE;
  for (var i in a) 
    if (a[i]<r) r=a[i];
  return r;
}

// a0+a1....+an
V.sum=function(a) {
  var s=0;
  for (var i in a) s+=a[i];
  return s;
}

V.mean=function(a) { return V.sum(a)/a.length; }

V.sd=function(a, flag) { 
  var s = 0;
  var mean = V.mean(a);
  for (var i in a)
    s += Math.pow(a[i]-mean, 2);
  return Math.sqrt(s/(a.length-flag)); 
}

// a0*a1*....an
V.prod=function(a) {
  var p=0;
  for (var i in a) p*=a[i];
  return p;
}

// list(from, from+step, ..., to)
V.steps=function(from, to, step) {
  step = V.def(step, 1);
  var a=[];
  for (var i=0; from+i*step<=to; i++)
    a.push(from+i*step);
  return a;
}

V.s = V.steps;

// [ o, o, ...., o ]
V.repeats=function(o, n) {
  var a=[];
  for (var i=0; i<n; i++)
    a.push(o);
  return a;
}

// a[1..n]+b[1..n]
V.add=function(a,b) {
  var ab=[];
  for (var i in a) ab.push(a[i]+b[i]);
  return ab;
}

// a[1..n]+b[1..n]
V.sub=function(a,b) {
  var ab=[];
  for (var i in a) ab.push(a[i]-b[i]);
  return ab;
}

V.dot=function(a,b) {
  var s = 0;
  for (var i in a) 
    s += a[i]*b[i];
  return s;
}

V.mul=function(c,a) {
  var ca = [];
  for (var i in a) 
    ca.push(c*a[i]);
  return ca;
}

// a[1..m][1..n] => r[1..m*n]
V.flat=function(a) {
  var r=[];
  for (var i in a)
    for (var j in a[i])
      V.push(a[i][j]);
  return r;
}

V.normalize = function(a) {
  var total = V.sum(a);
  return V.apply(a, function(x) { return x/total; });
}

// apply(a, f)=>[f(a[0]), ..., f(a[n],p)]
V.apply=function() {
  var args = Array.prototype.slice.call(arguments);
  var a = args[0];
  var f = args[1];
  var params = args.slice(2, args.length);
  var fa=[];
  for (var i in a)
    fa.push(f.apply(null, [a[i]].concat(params)));
  return fa;
}

// calls(n, f, p1, p2, ..)
V.calls=function() {
  var args = Array.prototype.slice.call(arguments);
  var n = args[0];
  var f = args[1];
  var params = args.slice(2, args.length);
  var a=[];
  for (var i=0; i<n; i++)
    a.push(f.apply(null, params));
  return a;	
}

// --------------------- 數學函數 ------------------------------
// log n!
R.logp=function(n) { 
  var na = V.steps(1, n, 1);
  var lna= V.apply(na, Math.log);  
  return V.sum(lna);
}

// log n!/k!(n-k)!
R.logc=function(n,k) {
  return R.logp(n)-R.logp(k)-R.logp(n-k);
}

R.q2x=function(q, cdf) {
  var max=10000000, min=-max;
  while (true) {
    var x = (max+min)/2;
	var qx = cdf(x);
    if (Math.abs(qx-q) < 0.00001) 
	  return x;
	else if (q > qx)
	  min = x;
	else
	  max = x;
  }
  return null;
}

// -------------------------- 連續分布 -------------------------------------
// 均等分布
R.runif=function(n, a, b) { return V.calls(n, jStat.uniform.sample, a, b); }
R.dunif=function(x, a, b) { return jStat.uniform.pdf(x, a, b); }
R.punif=function(q, a, b) { return jStat.uniform.cdf(q, a, b); }
// 常態分布
R.rnorm=function(n, mean, sd) { return V.calls(n, jStat.normal.sample, mean, sd); }
R.dnorm=function(x, mean, sd) { return jStat.normal.pdf(x, mean, sd); }
R.pnorm=function(q, mean, sd) { return jStat.normal.cdf(q, mean, sd); }
R.qnorm=function(p, mean, sd) { return R.q2x(p, function (x) { return R.pnorm(mean, sd); }); }
// 布瓦松分布
R.rpois=function(n, l) { return V.calls(n, jStat.poisson.sample, l); }
R.dpois=function(x, l) { return jStat.poisson.pdf(x, l); }
R.ppois=function(q, l) { return jStat.poisson.cdf(q, l); }
// F 分布
R.rf=function(n, df1, df2) { return V.calls(n, jStat.centralF.sample, df1, df2); }
R.df=function(x, df1, df2) { return jStat.centralF.sample(x, df1, df2); }
R.pf=function(q, df1, df2) { return jStat.centralF.sample(q, df1, df2); }
// T 分布
R.rt=function(n, dof) { return V.calls(n, jStat.studentt.sample, dof); }
R.dt=function(x, dof) { return jStat.studentt.pdf(x, dof); }
R.pt=function(q, dof) { return jStat.studentt.cdf(q, dof); }
// 

// -------------------------- 離散分布 -------------------------------------
R.sample1=function(a, p) { 
  var r = Math.random();
  var u = V.repeats(1.0, a.length);
  p = V.def(p, V.normalize(u));
  var psum = 0;
  for (var i in p) {
    psum += p[i];
	if (psum > r)
	  return a[i];
  }
  return null;
}

R.sample=function(n, a, p) { return V.calls(n, R.sample1, a, p); }

// 二項分布
R.rbinom=function(n, N, p) { return V.calls(n, jStat.binomial.sample, N, p); }
// 負二項分布
R.rnegbin=function(n, r, p) { return V.calls(n, jStat.weibull.sample, r, p); }
// 超幾何分布
R.rhypgeom=function(n, N, m, n) { return V.calls(n, jStat.hypgeom.sample, N, m, n); }
// 柯西分布
R.rcauchy=function(n, local, scale) { return V.calls(n, jStat.cauchy.sample, local, scale); }
// Beta 分布
R.rbeta=function(n, alpha, beta) { return V.calls(n, jStat.beta.sample, alpha, beta); }
// chisquare 分布
R.rchisq=function(n, dof) { return V.calls(n, jStat.chisquare.sample, dof); }
// 指數分布
R.rexp=function(n, rate) { return V.calls(n, jStat.beta.exponential, rate); }
// Gamma 分布
R.rgamma=function(n, shape, scale) { return V.calls(n, jStat.gamma.sample, shape, scale); }
// 反 Gamma 分布
R.rinvgamma=function(n, shape, scale) { return V.calls(n, jStat.invgamma.sample, shape, scale); }

// 對數常態分布
R.rlognormal=function(n, mu, sigma) { return V.calls(n, jStat.lognormal.sample, mu, sigma); }
// Pareto 分布
R.rpareto=function(n, scale, shape) { return V.calls(n, jStat.pareto.sample, scale, shape); }
// Weibull 分布
R.rweibull=function(n, scale, shape) { return V.calls(n, jStat.weibull.sample, scale, shape); }

R.rtriangular=function(n, a, b, c) { return V.calls(n, jStat.weibull.sample, a, b, c); }
R.rkumaraswamy=function(n, alpha, beta) { return V.calls(n, jStat.kumaraswamy.sample, alpha, beta); }

// ------------------------------ 統計與檢定 -----------------------------------------
// 說明：以下 ?test 傳回顯著值 p-value，最後一個變數 flag = true 代表使用樣本標準差。
// 參考：http://stattrek.com/probability-distributions/t-distribution.aspx
R.ztest = function(mu, x, sides, flag) { 
  sides = V.def(sides, 2), flag = V.def(flag, true);
  return jStat.ztest(mu, x, sides, true); 
}

R.tscore = function(mu, x) { return jStat.tscore(mu, x); }
R.ttest = function(mu, x, sides, flag) { 
  sides = V.def(sides, 2), flag = V.def(flag, true);
  return jStat.ttest(mu, x, sides, true); 
}

// ------------------ 繪圖物件與函數 --------------------------------
var G=function() {
  this.g = {
        data: {
/*		  x: "x",  */
          xs: {},
          columns: [ /*["x", 1, 2, 3, 4 ]*/ ],
		  type: "line", 
		  types : {}, 
        },
        axis: {
          x: {
            label: 'X',
            tick: { fit: false }
          },
          y: { label: 'Y', 
		    tick : { format: d3.format(".2f") }
    	  }
        }, 
		bar: { width: { ratio: 0.9 } }, 
      };
  this.varcount = 0;
  this.xrange(-10, 10);
  this.step = 1;
  this.setrange = false;
}

G.prototype.tempvar = function() { return "T"+this.varcount++; }

G.prototype.xrange = function(xmin, xmax) {
  this.xmin = xmin;
  this.xmax = xmax;
  if (arguments.length == 0)
    this.setrange = false;
  else
    this.setrange = true;
}

G.prototype.plot = function(x,y,name) {
  this.g.data.types[name] = "scatter";
  this.g.data.xs[name] = name+"x";
  this.g.data.columns.push([name+"x"].concat(x));
  this.g.data.columns.push([name].concat(y));
}

G.prototype.curve = function(f, name, step, from, to) {
  name = V.def(name, this.tempvar());
  step = V.def(step, this.step);
  from = V.def(from, this.xmin);
  to   = V.def(to,   this.xmax);
  this.g.data.types[name] = "line";
  this.g.data.xs[name] = name+"x";
  var x = V.steps(from, to, step), y=[];
  for (var i in x) {
    if (typeof(f)==="string")
		y.push(eval(f.replace("x", x[i])));
	else
		y.push(f(x[i]));
  }
  this.g.data.columns.push([name+"x"].concat(x));
  this.g.data.columns.push([name].concat(y));
}

G.prototype.hist = function(x, name, mode, step, from, to) {
  name = V.def(name, this.tempvar()); 
  mode = V.def(mode, ""); 
  step = V.def(step, this.step); 
  from = V.def(from, this.xmin); 
  to=V.def(to, this.xmax);
  this.g.data.types[name] = "bar";
  this.g.data.xs[name] = name+"x";
  var xc = V.steps(from+step/2.0, to, step);
  var n = (to-from)/step + 1;
  var count = V.repeats(0, n);
  for (var i in x) {
    var slot=Math.floor((x[i]-from)/step);
	if (slot>=0 && slot < n)
	  count[slot]++;
  }
  this.g.data.columns.push([name+"x"].concat(xc));
  var total = V.sum(count);
  if (mode === "normalized")
    count = V.apply(count, function(c) { return (1.0/step)*(c/total); });
  this.g.data.columns.push([name].concat(count));
}

G.prototype.show = function() {
  if (R.inBrowser)
    return c3.generate(this.g);
}

R.newGraph = function() {
  R.g = new G();
  R.g.show();
}

R.xrange = function(xmin, xmax) { R.g.xrange(xmin, xmax); }

R.curve = function(f, name, step, from, to) {
  R.g.curve(f, name, step, from, to);
  R.g.show();
}

R.hist = function(x, mode, name, step, from, to) {
  R.g.hist(x, mode, name, step, from, to);
  R.g.show();
}

R.plot = function(x,y,name) {
  R.g.plot(x,y,name);
  R.g.show();
}

R.newGraph();




