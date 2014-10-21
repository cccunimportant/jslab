// 參考：4 ways to dynamically load external JavaScript(with source)
// -- http://ntt.cc/2008/02/10/4-ways-to-dynamically-load-external-javascriptwith-source.html
// C = console;
U = { used:{} };

if (typeof module!=="undefined") module.exports = U;

U.getModule = function() { return module; }

U.exports = function(obj, module) {
  if (typeof(module)!=="undefined")
    module.exports = obj;  
}

U.global = function() {
  if (U.inBrowser())
    return window;
  else if (typeof global !== 'undefined')
    return global;
}

U.inBrowser = function() {
  return typeof(window) !== "undefined";
}

U.need = function(name) {
  if (typeof U.global()[name] === 'undefined')
    throw new Error('Error: U.need '+name);
}

U.use = function(path, name) {
  var m;
  console.log("use "+path+" name="+name);
  if (typeof U.used[name] !== "undefined")
    return U.used[name];
  if (typeof name !== "undefined")
    U.used[name] = path;
  if (U.inBrowser()) {
    document.write("<script src='"+path+"'></script>");
  } else if (typeof require !== "undefined") {
    m = require(path);
    if (typeof name !== "undefined") 
	  this[name] = m;
  } else
    U.error("Error : not in browser and no function require()");
  U.global()[name] = m;
  return m;
}

// U.exports(U, module);

/*	  if (typeof global !== 'undefined')
		global[name] = m;
*/		
/*	  
	  if (typeof module === "object" && module.exports) // node.js
	    
      else if (typeof define === "function" && define.amd) 
	    // 參考：https://github.com/amdjs/amdjs-api/wiki/AMD
	    define(m);
*/		
