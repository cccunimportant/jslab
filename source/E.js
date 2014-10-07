U.use("../js/codemirror/lib/codemirror.js", "CodeMirror");
U.use("../js/codemirror/addon/hint/show-hint.js");
U.use("../js/codemirror/addon/hint/javascript-hint.js");
U.use("../js/codemirror/mode/javascript/javascript.js");

E = {};

U.moduleExport(E);

E.editor = null;

E.loadEditor = function(codebox) {
  E.editor = CodeMirror.fromTextArea(codebox, {
    lineNumbers: true,
    extraKeys: {"Ctrl-A": "autocomplete"},
    lineWrapping: true, 
    mode: {name: "javascript", globalVars: true}
  });
}


