"use strict";

U.use("../js/codemirror/lib/codemirror.js", "CodeMirror");
U.use("../js/codemirror/addon/hint/show-hint.js");
U.use("../js/codemirror/addon/hint/javascript-hint.js");
U.use("../js/codemirror/mode/javascript/javascript.js");

E = {};

// U.exports(E, module);
if (typeof module!=="undefined") module.exports = E;

E.editor = null;

E.loadEditor = function(codebox) {
  E.codebox = codebox;
  E.editor = CodeMirror.fromTextArea(codebox, {
    lineNumbers: true,
    extraKeys: {"Ctrl-.": "autocomplete"},
    lineWrapping: true, 
    styleActiveLine: true,
    mode: {name: "javascript", globalVars: true}
  });
  
  E.editor.on('update', function(instance){
    E.codebox.value = instance.getValue();
  });  
}


