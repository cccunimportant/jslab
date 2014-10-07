// 參考：4 ways to dynamically load external JavaScript(with source)
// -- http://ntt.cc/2008/02/10/4-ways-to-dynamically-load-external-javascriptwith-source.html
U = {};

U.use = function(path, name) {
  if (typeof(module)!=="undefined") {
    global[name] = require(path);
    module.exports = U;
  } else {
    document.write("<script src='"+path+"'><\/script>");
  }
}
