'use strict';
var LOGApi=require('./LOGApi');
var  MPHttp={
    ajax: function (src, config) {
        //LOGApi.consoleLog(666,arguments);
        var linksrc=src;
	    config = config ||{};
    	var errorFn= config.errorFn  || function(){};
		var successFn= config.successFn || function(){};
		var type= config.type || "GET";
		var data = config.data || {};
        var serialized_Data = JSON.stringify(data);
		type = type.toUpperCase();
        if (window.XMLHttpRequest) {
            var xhttp = new XMLHttpRequest();
        }
        else {
            var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (type == "GET") {
            //src += "?p=" + Math.random() + serialized_Data;
             serialized_Data = null;
        }
		xhttp.open(type, linksrc, true);
		
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    successFn({response:xhttp.responseText});
                }else{
				    errorFn({status:xhttp.status});
				}
            }else{
			 errorFn({status:xhttp.readyState});
			}
        };
	       xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                successFn(xhttp.responseText);
                }else{
				errorFn({status:xhttp.status});
				}
            }
        };
        try {
            xhttp.withCredentials = config.withCredentials||false;
			xhttp.send(serialized_Data);
        } catch (err) {
		//alert(1);
            LOGApi.consoleLog(2,'error:'+err);
        } 
    }
};
module.exports = MPHttp;