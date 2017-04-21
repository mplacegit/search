'use strict';
var Widget = require('./../mylib/inframeWidget');

function getUrlVars() {
   var vars = {};
   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
   });
   return vars;
}
var data=getUrlVars();
var widget=new Widget(data);
window.mp_widget=widget;


