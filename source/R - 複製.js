// jStat 資料請參考 -- http://jstat.github.io/test.html
// 函數預設值的寫法 -- 請參考 http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function

R = {};

if (typeof(module)!=="undefined") {
  jStat = require("../js/jstat");
  R = global;
  V = global;
  R.inBrowser = false;
  module.exports = R;
} else {
  R = window;
  V = window;
  R.inBrowser = true;
}

C = console;
R.C = console;

V.def=function(arg, value) {
   return (typeof arg == 'undefined' ? value : arg);
}

V.opt = function(options, name, value) {
  if (typeof(options)=='undefined') return value;
  return V.def(options[name], value);
//  return (typeof(options[name]) == 'undefined')?value:options[name];
}

V.fx = function() {
  var args = Array.prototype.slice.call(arguments);
  var f = args[0];
  var fargs = args.slice(1, arguments.length);
  return function(x) {
    return f.apply(null, [x].concat(fargs));
  };
}

V.precision = 4;
V.largeArray = 50;

V.str = function prettyPrint(x) {
    function fmtnum(x) {
        if(x === 0) { return '0'; }
        if(isNaN(x)) { return 'NaN'; }
        if(x<0) { return '-'+fmtnum(-x); }
        if(isFinite(x)) {
            var scale = Math.floor(Math.log(x) / Math.log(10));
            var normalized = x / Math.pow(10,scale);
            var basic = normalized.toPrecision(V.precision);
            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(V.precision); }
            return parseFloat(basic).toString()+'e'+scale.toString();
        }
        return 'Infinity';
    }
    var ret = [];
    function foo(x) {
        var k;
        if(typeof x === "undefined") { ret.push(Array(V.precision+8).join(' ')); return false; }
        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
        if(typeof x === "number") {
            var a = fmtnum(x);
            var b = x.toPrecision(V.precision);
            var c = parseFloat(x.toString()).toString();
            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
            ret.push(Array(V.precision+8-a.length).join(' ')+a);
            return false;
        }
        if(x === null) { ret.push("null"); return false; }
        if(typeof x === "function") { 
            ret.push(x.toString());
            var flag = false;
            for(k in x) { if(x.hasOwnProperty(k)) { 
                if(flag) ret.push(',\n');
                else ret.push('\n{');
                flag = true; 
                ret.push(k); 
                ret.push(': \n'); 
                foo(x[k]); 
            } }
            if(flag) ret.push('}\n');
            return true;
        }
        if(x instanceof Array) {
            if(x.length > V.largeArray) { ret.push('...Large Array...'); return true; }
            var flag = false;
            ret.push('[');
            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
            ret.push(']');
            return true;
        }
        ret.push('{');
        var flag = false;
        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
        ret.push('}');
        return true;
    }
    foo(x);
    return ret.join('');
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
// 標準差
R.sd = function(a, flag) { 
  flag = V.def(flag, 1);
  return jStat.stdev(a, flag); 
}

// 協方差
R.cov = function(x, y) { 
  return jStat.stdev(x, y); 
}
// 相關係數
R.cor = function(x, y) { return jStat.corrcoeff(x, y); }
// 階層 n!
R.factorial = function(n) { return jStat.factorial(n); }
// log(n!)
R.lfactorial = function(n) { return jStat.factorialln(n); }
// 組合 C(n,m)
R.choose = function(n,m) { return jStat.combination(n, m); }
// log C(n,m)
R.lchoose = function(n,m) { return jStat.combinationln(n, m); }
// 組合 C(n,m)
R.permutation = function(n,m) { return jStat.permutation(n, m); }
// log C(n,m)
R.lchoose = function(n,m) { return jStat.combinationln(n, m); }
/*
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
*/
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
R.qunif=function(p, a, b) { return R.q2x(p, function (q) { return R.punif(q, a, b);});}
// 常態分布
R.rnorm=function(n, mean, sd) { return V.calls(n, jStat.normal.sample, mean, sd); }
R.dnorm=function(x, mean, sd) { return jStat.normal.pdf(x, mean, sd); }
R.pnorm=function(q, mean, sd) { return jStat.normal.cdf(q, mean, sd); }
// R.qnorm=function(p, mean, sd) { return R.q2x(p, function (q) { return R.pnorm(q, mean, sd);});}
R.qnorm=function(p, mean, sd) { return jStat.normal.inv(p, mean, sd); }
// 布瓦松分布
R.rpois=function(n, l) { return V.calls(n, jStat.poisson.sample, l); }
R.dpois=function(x, l) { return jStat.poisson.pdf(x, l); }
R.ppois=function(q, l) { return jStat.poisson.cdf(q, l); }
R.qpois=function(p, l) { return R.q2x(p, function (q) { return R.ppois(q, l);});}
// F 分布
R.rf=function(n, df1, df2) { return V.calls(n, jStat.centralF.sample, df1, df2); }
R.df=function(x, df1, df2) { return jStat.centralF.sample(x, df1, df2); }
R.pf=function(q, df1, df2) { return jStat.centralF.sample(q, df1, df2); }
R.qf=function(p, df1, df2) { return R.q2x(p, function (q) { return R.pf(q, df1, df2);});}
// T 分布
R.rt=function(n, dof) { return V.calls(n, jStat.studentt.sample, dof); }
R.dt=function(x, dof) { return jStat.studentt.pdf(x, dof); }
R.pt=function(q, dof) { return jStat.studentt.cdf(q, dof); }
R.qt=function(p, dof) { return R.q2x(p, function (q) { return R.pt(q, dof);});}
// Beta 分布
R.rbeta=function(n, alpha, beta) { return V.calls(n, jStat.beta.sample, alpha, beta); }
R.dbeta=function(x, alpha, beta) { return jStat.beta.pdf(x, alpha, beta); }
R.pbeta=function(q, alpha, beta) { return jStat.beta.cdf(q, alpha, beta); }
R.qbeta=function(p, alpha, beta) { return R.q2x(p, function (q) { return R.pbeta(q, alpha, beta);});}
// 柯西分布
R.rcauchy=function(n, local, scale) { return V.calls(n, jStat.cauchy.sample, local, scale); }
R.dcauchy=function(x, local, scale) { return jStat.cauchy.pdf(x, local, scale); }
R.pcauchy=function(q, local, scale) { return jStat.cauchy.cdf(q, local, scale); }
R.qcauchy=function(p, local, scale) { return R.q2x(p, function (q) { return R.pcauchy(q, local, scale);});}
// chisquare 分布
R.rchisq=function(n, dof) { return V.calls(n, jStat.chisquare.sample, dof); }
R.dchisq=function(x, dof) { return jStat.chisquare.pdf(x, dof); }
R.pchisq=function(q, dof) { return jStat.chisquare.cdf(q, dof); }
R.qchisq=function(p, dof) { return R.q2x(p, function (q) { return R.pchisq(q, dof);});}
// 指數分布
R.rexp=function(n, rate) { return V.calls(n, jStat.exponential.sample, rate); }
R.dexp=function(x, rate) { return jStat.exponential.pdf(x, rate); }
R.pexp=function(q, rate) { return jStat.exponential.cdf(q, rate); }
R.qexp=function(p, rate) { return R.q2x(p, function (q) { return R.pexp(q, rate);});}
// Gamma 分布
R.rgamma=function(n, shape, scale) { return V.calls(n, jStat.gamma.sample, shape, scale); }
R.dgamma=function(x, shape, scale) { return jStat.gamma.pdf(x, shape, scale); }
R.pgamma=function(q, shape, scale) { return jStat.gamma.cdf(q, shape, scale); }
R.qgamma=function(p, shape, scale) { return R.q2x(p, function (q) { return R.pgamma(q, shape, scale);});}
// 反 Gamma 分布
R.rinvgamma=function(n, shape, scale) { return V.calls(n, jStat.invgamma.sample, shape, scale); }
R.dinvgamma=function(x, shape, scale) { return jStat.invgamma.pdf(x, shape, scale); }
R.pinvgamma=function(q, shape, scale) { return jStat.invgamma.cdf(q, shape, scale); }
R.qinvgamma=function(p, shape, scale) { return R.q2x(p, function (q) { return R.pinvgamma(q, shape, scale);});}
// 對數常態分布
R.rlognormal=function(n, mu, sigma) { return V.calls(n, jStat.lognormal.sample, mu, sigma); }
R.dlognormal=function(x, mu, sigma) { return jStat.lognormal.pdf(x, mu, sigma); }
R.plognormal=function(q, mu, sigma) { return jStat.lognormal.cdf(q, mu, sigma); }
R.qlognormal=function(p, mu, sigma) { return R.q2x(p, function (q) { return R.plognormal(q, mu, sigma);});}
// Pareto 分布
R.rpareto=function(n, scale, shape) { return V.calls(n, jStat.pareto.sample, scale, shape); }
R.dpareto=function(x, scale, shape) { return jStat.pareto.pdf(x, scale, shape); }
R.ppareto=function(q, scale, shape) { return jStat.pareto.cdf(q, scale, shape); }
R.qpareto=function(p, scale, shape) { return R.q2x(p, function (q) { return R.ppareto(q, scale, shape);});}
// Weibull 分布
R.rweibull=function(n, scale, shape) { return V.calls(n, jStat.weibull.sample, scale, shape); }
R.dweibull=function(x, scale, shape) { return jStat.weibull.pdf(x, scale, shape); }
R.pweibull=function(q, scale, shape) { return jStat.weibull.cdf(q, scale, shape); }
R.qweibull=function(p, scale, shape) { return R.q2x(p, function (q) { return R.pweibull(q, scale, shape);});}
// 三角分布
R.rtriangular=function(n, a, b, c) { return V.calls(n, jStat.triangular.sample, a, b, c); }
R.dtriangular=function(x, a, b, c) { return jStat.triangular.pdf(x, a, b, c); }
R.ptriangular=function(q, a, b, c) { return jStat.triangular.cdf(q, a, b, c); }
R.qtriangular=function(p, a, b, c) { return R.q2x(p, function (q) { return R.ptriangular(q, a, b, c);});}
// 類似 Beta 分布，但計算更簡單
R.rkumaraswamy=function(n, alpha, beta) { return V.calls(n, jStat.kumaraswamy.sample, alpha, beta); }
R.dkumaraswamy=function(x, alpha, beta) { return jStat.kumaraswamy.pdf(x, alpha, beta); }
R.pkumaraswamy=function(q, alpha, beta) { return jStat.kumaraswamy.cdf(q, alpha, beta); }
R.qkumaraswamy=function(p, alpha, beta) { return R.q2x(p, function (q) { return R.pkumaraswamy(q, alpha, beta);});}

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
R.dbinom=function(x, N, p) { return jStat.binomial.pdf(x, N, p); }
R.pbinom=function(q, N, p) { return jStat.binomial.cdf(q, N, p); }
R.qbinom=function(p, N, p) { return R.q2x(p, function (q) { return R.pbinom(q, N, p);});}

// 負二項分布
R.rnbinom=function(n, N, p) { return V.calls(n, jStat.negbin.sample, N, p); }
R.dnbinom=function(x, N, p) { return jStat.negbin.pdf(x, N, p); }
R.pnbinom=function(q, N, p) { return jStat.negbin.cdf(q, N, p); }
R.qnbinom=function(p, N, p) { return R.q2x(p, function (q) { return R.pnbinom(q, N, p);});}

// 超幾何分布
R.rhyper=function(n, N, m, n) { return V.calls(n, jStat.hypgeom.sample, N, m, n); }
R.dhyper=function(x, N, m, n) { return jStat.hypgeom.pdf(x, N, m, n); }
R.phyper=function(q, N, m, n) { return jStat.hypgeom.cdf(q, N, m, n); }
R.qhyper=function(p, N, m, n) { return R.q2x(p, function (q) { return R.phyper(q, N, m, n);});}

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

// ------------------ 繪圖物件與函數 C3.js 部份  --------------------------------
var G=function() {
  this.c3g = {
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
            tick: { fit: false, format:d3.format(".2f") }
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

G.prototype.plot = function(x,y, options) {
  var name = V.opt(options, "name", this.tempvar());
  this.c3g.data.types[name] = "scatter";
  this.c3g.data.xs[name] = name+"x";
  this.c3g.data.columns.push([name+"x"].concat(x));
  this.c3g.data.columns.push([name].concat(y));
}

G.prototype.curve = function(f, options) {
  var name = V.opt(options, "name", this.tempvar());
  var step = V.opt(options, "step", this.step);
  var from = V.opt(options, "from", this.xmin);
  var to   = V.opt(options, "to",   this.xmax);
  this.c3g.data.types[name] = "line";
  this.c3g.data.xs[name] = name+"x";
  var x = V.steps(from, to, step), y=[];
  for (var i in x) {
    if (typeof(f)==="string")
		y.push(eval(f.replace("x", x[i])));
	else
		y.push(f(x[i]));
  }
  this.c3g.data.columns.push([name+"x"].concat(x));
  this.c3g.data.columns.push([name].concat(y));
}

G.prototype.hist = function(x, options) {
  var name = V.opt(options, "name", this.tempvar()); 
  var mode = V.opt(options, "mode", ""); 
  var step = V.opt(options, "step", this.step); 
  var from = V.opt(options, "from", this.xmin); 
  var to   = V.opt(options, "to", this.xmax);
  this.c3g.data.types[name] = "bar";
  this.c3g.data.xs[name] = name+"x";
  var xc = V.steps(from+step/2.0, to, step);
  var n = (to-from)/step + 1;
  var count = V.repeats(0, n);
  for (var i in x) {
    var slot=Math.floor((x[i]-from)/step);
	if (slot>=0 && slot < n)
	  count[slot]++;
  }
  this.c3g.data.columns.push([name+"x"].concat(xc));
  var total = V.sum(count);
  if (mode === "normalized")
    count = V.apply(count, function(c) { return (1.0/step)*(c/total); });
  this.c3g.data.columns.push([name].concat(count));
}

G.prototype.show = function() {
  if (R.inBrowser)
    return c3.generate(this.c3g);
}

R.newGraph = function() {
  R.g = new G();
  R.g.show();
}

R.xrange = function(xmin, xmax) { R.g.xrange(xmin, xmax); }

R.curve = function(f, options) {
  R.g.curve(f, options);
  R.g.show();
}

R.hist = function(x, options) {
  R.g.hist(x, options);
  R.g.show();
}

R.plot = function(x,y,options) {
  R.g.plot(x,y,options);
  R.g.show();
}

// R.newGraph();

// ------------------ 繪圖物件與函數 vis.js 部份  --------------------------------

	function curve3d(f) {
      // Create and populate a data table.
      data = new vis.DataSet();
      // create some nice looking data with sin/cos
      var counter = 0;
      var steps = 50;  // number of datapoints will be steps*steps
      var axisMax = 314;
      var axisStep = axisMax / steps;
      for (var x = 0; x < axisMax; x+=axisStep) {
        for (var y = 0; y < axisMax; y+=axisStep) {
          var value = f(x,y);
          data.add({id:counter++,x:x,y:y,z:value,style:value});
        }
      }
	  return data;
	}



