jslab
=====

JsLab -- A JavaScript Scientific Computing Environment (in R style API)

JsLab is a R like environment but in JavaScript Language.

We create JsLab by integrate the following open source project.

* numeric.js -- http://numericjs.com/ (BSD like license)
* jStat.js -- https://github.com/jstat/jstat (MIT license)
* d3.js -- http://d3js.org/ (BSD license)
* c3.js -- http://c3js.org/ (MIT license)
* jQuery -- http://jquery.com/
* jquery-linedtextarea -- http://alan.blog-city.com/jquerylinedtextarea.htm

The R.js should be included to write the R style code in Javascript.

You may run the R.js in node.js console mode or in browser. 

The function of jslab is attach to the global object (in browser, the window object) so that you don't have to call api in the R.norm(x, 5, 2) style. You may just use norm(x, 5, 2) directly.

### Example 1 : run in node.js

file: rtest1.js

```javascript
var R = require("../js/R");

var x = rnorm(25, 5, 2);
C.log("x=%s\nmean(x)=%d sd(x)=%d", toStr(x,2), mean(x), sd(x,1));

var t = ttest(5.2, x, 2);
C.log("t=%j", t);
```

run the code in node.js

```
D:\Dropbox\Public\jslab\test>node rtest1
x=[5.11,5.58,6.55,8.60,5.74,5.76,6.25,4.49,2.49,5.64,3.27,5.11,5.27,5.48,4.13,3.
44,4.51,2.95,6.80,5.95,6.06,8.40,4.24,4.74,3.03]
mean(x)=5.1825993345749195 sd(x)=1.5376908648028214
t=0.9553477856606291
```

### Example 2 : run in browser.js

![](img/jslab_test.jpg)

file : jslab.html

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="../css/c3.css">
	<link rel="stylesheet" type="text/css" href="../css/jquery-linedtextarea.css"/>
	<style>
	body, fieldset, div { font-size:large; }
	button , input { font-size:large; }
	textarea { width:95%; }
	fieldset { width:90%; height:98%; }
	</style>
  </head>
  <body>
   <div style="width:100%; height:400px;">
    <div style="width:50%;height:95%;float:left;">
     <fieldset>
      <legend>JavaScript</legend>
	  <center>
	  <textarea id="codebox" class="lined" style="height:80%" onkeyup="onLineNumber();" onmouseup="this.onkeyup();">
x = rnorm(1000, 5, 2);
toStr(x,2);
hist(x, "normalized", "x");
curve("dnorm(x, 5,2)", "N(5,2)");
</textarea>
      <div style="height:10px"></div>
      <div>
	    <input type="file" id="filebox" name="filebox" onchange="handleFileSelect"/>
	    <input type="radio" name="mode" value="code" checked="true"/>code
        <input type="radio" name="mode" value="line"/>line &nbsp;
        <button onclick="run()">run</button>
	  </div>
	  </center>
    </div>
    <div style="width:50%;height:95%;float:left;">
     <fieldset>
      <legend>Graph</legend>
      <div id="chart" style="height:95%"></div>
     </fieldset>
	</div>
   </div>
   <div style="width:98%;height:100px">
     <textarea id="msgbox" style="width:100%;height:100%"></textarea>
   </div>
    
   <script src="../js/d3.min.js" charset="utf-8"></script>
   <script src="../js/c3.min.js"></script>
   <script src="../js/jstat.min.js"></script>
   <script src="../js/numeric.min.js"></script>
   <script src="../js/jquery.min.js"></script>
   <script src="../js/jquery-linedtextarea.js"></script>
   <script src="../source/R.js"></script>
   <script>
   var filebox = document.getElementById('filebox');
   var codebox = document.getElementById('codebox');
   var msgbox  = document.getElementById('msgbox');
   var lineNo  = 1;
   var mode, code, lines, results;
   
   function msgClear() { msgbox.value = ""; }
   
   function getRadioValue(name) {
     return document.querySelector('input[name='+name+']:checked').value;
   }

   function handleFileSelect(evt) {
	  msgClear();
	  var reader = new FileReader();
	  reader.onload = function(e) {
		codebox.value = reader.result;
	    run();
      };
      reader.readAsText(evt.target.files[0]);
	}
	
	filebox.addEventListener('change', handleFileSelect, false);

    function onLineNumber() {
     if (mode === "line") {
      lineNo = codebox.value.substr(0, codebox.selectionStart).split("\n").length;
      var msg = "";
	  if (lineNo < results.length) {
	    var r = results[lineNo];
		msg += "line "+lineNo+" : "+lines[lineNo];
		if (r.error !== null)
		  msg += "\nerror  : "+r.error;
	    msg += "\nreturn : "+r.value;
	  }
	  msgbox.value = msg;
	 }
    }
	
    function run() {
      code = codebox.value.trim();
	  mode = getRadioValue("mode");
      msgbox.value = "running...";
	  if (mode === "code") {
        try { 
          eval("newGraph();"+code);
		} catch (e) {
		  msgbox.value = "error  : ";
		  if (typeof(e.lineNumber) !== "undefined")
		    msgbox.value += "line="+e.lineNumber+" column="+e.columnNumber;
		  msgbox.value += "\nmessage : "+e.message;
		}
	  } else {
        lines = ["newGraph()"].concat(code.split("\n"));
	    results = [];
	    for (var i in lines) {
	      var v = null, e=null;
	      try { 
		    v=eval(lines[i]); 
		  } catch (error) {
		    e=error;
		  }
	      results.push({value:v,error:e});
	    }
	  }
	  msgbox.value += "finished!";
    }
	
	run();
   </script>
   <script>
    $(function() {
	  $(".lined").linedtextarea(
		{selectedLine: -1}
	  );
    });
   </script>	
 </body>
</html>
```



