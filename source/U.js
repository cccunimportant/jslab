// 參考：4 ways to dynamically load external JavaScript(with source)
// -- http://ntt.cc/2008/02/10/4-ways-to-dynamically-load-external-javascriptwith-source.html
U = {};

U.inBrowser = function() {
  return typeof(window) !== "undefined";
}

U.moduleExport = function(obj) {
  if (typeof(module) !== "undefined")
    module.exports = obj;
}

U.use = function(path, name) {
  if (U.inBrowser) {
    document.write("<script src='"+path+"'><\/script>");
  } else {
    if (typeof name === 'undefined')
		global[name] = require(path);
    module.exports = U;
  }
}
