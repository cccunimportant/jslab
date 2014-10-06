var C = console;
var path = require('path');
var fs = require("fs");
var qs = require('querystring');
var express = require("express");
var app = express();

app.listen(80);

var files = [ "../source/jslab.html", "../source/R.js", "../js/c3.min.js", "../js/d3.min.js", "../js/jquery.min.js", "../js/jquery-linedtextarea.js", "../js/jstat.min.js", "../js/numeric.min.js", "../css/c3.css", "../css/jquery-linedtextarea.css" ];

var pages = {};

var typemap = { "js":"text/javascript", "html":"text/html", "css":"text/css" };

for (var i in files) {
  var path = files[i].replace("../", "/");
  C.log("path="+path);
  pages[path] = fs.readFileSync(files[i], "utf8");
}

var error = function(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
}

var response = function(res, type, text) {
    res.writeHead(200, {'Content-Type': type});
    res.write(text);
//    C.log(text);
    res.end();
}

var responsePage = function(res, path) {
  var type = path.split(".").pop();
  var mime = typemap[type];
  C.log("path="+path+" type="+type+" mime="+mime);
  if (pages[path] !== null)
    response(res, mime, pages[path]);  
  else
    error();
}

app.get('/:path/:file', function(req, res) {
  responsePage(res, "/"+req.params.path+"/"+req.params.file);
});

app.post('/save/:path', function(req, res) {
    C.log('save ' + req.params.path);
	
    var path = "../save/"+req.params.path;
	
    data = '';
	
    req.on("data", function (chunk) {
        data += chunk;
    });

    req.on("end", function () {
		C.log("path="+path+" data="+data);
        fs.writeFile(path, data, function (err) {
          if (err)
		    error(res);
		  else
 		    response(res, "text/html", "");
        });		
    });
});


console.log('start jslab\n');
