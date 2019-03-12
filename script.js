var oDoc, sDefTxt;

function initDoc() {
                      oDoc = document.getElementById("textBox");
                                                                  sDefTxt = oDoc.innerHTML;
                                                                                              if (document.compForm.switchMode.checked) { setDocMode(true); }
}

function formatDoc(sCmd, sValue) {
                                    if (validateMode()) { document.execCommand(sCmd, false, sValue);

                                      oDoc.focus(); }
}

function validateMode() {
                          if (!document.compForm.switchMode.checked) { return true ; }
                                                                                        alert("Uncheck \"Show HTML\".");
                                                                                                                          oDoc.focus();
                                                                                                                                        return false;
}

function setDocMode(bToSource) {  var oContent;
                                                if (bToSource) {
                                                                  oContent = document.createTextNode(oDoc.innerHTML);
                                                                                                                      oDoc.innerHTML = "";
                                                                                                                                            var oPre = document.createElement("pre");
                                                                                                                                                                                      oDoc.contentEditable = false;
  oPre.id = "sourceText";
                          oPre.contentEditable = true;
                                                        oPre.appendChild(oContent);
                                                                                    oDoc.appendChild(oPre);
                                                                                                            document.execCommand("defaultParagraphSeparator", false, "div");
                                                } else {
                                                          if (document.all) {
                                                                                oDoc.innerHTML = oDoc.innerText;
                                                          } else {
                                                                      oContent = document.createRange();
                                                                                                          oContent.selectNodeContents(oDoc.firstChild);
                                                                                                                                                          oDoc.innerHTML = oContent.toString();   }
                                                                      oDoc.contentEditable = true;    }   oDoc.focus();
}

var format = document.getElementById('format');

format.addEventListener('change' , function() {
                                                formatDoc('formatblock',this[this.selectedIndex].value);
                                                                                                          this.selectedIndex=0;
})

var clean = document.getElementById('clean');

clean.addEventListener('click' , function() {
                                              if(validateMode() && confirm('Are you sure?')) {
                                                                                                oDoc.innerHTML = sDefTxt
                                                                                       };
})

var undo = document.getElementById('undo');

undo.addEventListener('click' , function() {
                                              formatDoc('undo');
})

var $paste = document.getElementById('paste');

$paste.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('paste');
})

var redo = document.getElementById('redo');

redo.addEventListener('click', function() {
                                              formatDoc('redo');
})

var $underline = document.getElementById('underline');

$underline.addEventListener('click', function(e) {

  e.preventDefault();

  console.log('Yes Yes');
                                              formatDoc('underline');
});

var boold = document.getElementById('bold');

boold.addEventListener('click', function() {
                                              formatDoc('bold');
})


var italize = document.getElementById('italic');

italize.addEventListener('click', function() {
                                              formatDoc('italic');
})
