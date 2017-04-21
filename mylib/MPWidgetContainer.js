/**
 * Created by admin on 08.02.17.
 */
'use  strict';
var consoleLog = require('./LOGApi').consoleLog;
var MPParseContent = require('./MPParseContent');
var ajax = require('./MPHttp').ajax;
var isElement = require("lodash.iselement");
var BridgeLib = require('./iFrameBridge');
var Bridge = BridgeLib.Bridge;
var CallAction = BridgeLib.callAction;
var WidgetContainer = function (divObject) {
    this.readyState = false;
    this.divObject = divObject;
    this.css_selector = null;
    this.pluginsPath='//node.market-place.su/build/';
    this.pluginsConfig=[];
    this.validate();
    this.RequestParams = {
        geo_id: "",
        url: "",
        text: "Nokia",
        userText: "",
        categories: "",
        models: ""
    };
    this.RequestParams.text = MPParseContent.startSearch();
    this.RequestParams.url = encodeURIComponent(
        (window.location != window.parent.location) ? document.referrer : document.location.href);

};
WidgetContainer.plugins = [];
WidgetContainer.extends = function (plugin) {
    //плагины работают только если будут загружены до конструктора
    WidgetContainer.plugins.push(plugin);
};

/**
 * подгружаем плагины для виджета по списку из конфигурации и оповещаем их что можно встраиваться
 */
WidgetContainer.prototype.loadPlugins=function() {
    var self=this;
    var configUrl="//widget2.market-place.su/widget-plugins/widget_"+ this.affiliate_id+"_wid"+ this.wid+".json";
    this.ajax(configUrl,function(res){

        var plugins=[];
        try{
            plugins=JSON.parse(res);
            self.pluginsConfig=plugins;
        }catch(e){}
        for(var i=0;i<plugins.length;i++) {
            var src=self.pluginsPath+plugins[i]+'.js';
            self.appendScript(src,
            function(){
                CallAction('container-ready', {index: 'broadcast'}, window);
            });
        }
        CallAction('container-ready', {index: 'broadcast'}, window);
    });


};
WidgetContainer.prototype.buildParams = function (params) {

    //this.RequestParams;
    //consoleLog(123,params);
    for (var i in params) {

        if (this.RequestParams.hasOwnProperty(i)) {
            this.RequestParams[i] = params[i];
        }
    }

    return this.RequestParams;
};
WidgetContainer.prototype.init = function (callback) {
    var self = this;
    this.on('ready', function (e) {
        this.readyState = true;

        for (var i in WidgetContainer.plugins) {
            if (
                WidgetContainer.plugins.hasOwnProperty(i)
                && (typeof WidgetContainer.plugins[i].initialized[self.index] == "undefined")// если плагин еще не подключен
            &&(self.pluginsConfig.indexOf(WidgetContainer.plugins[i].name)>=0)// и он нужен для этого виджета
            ) {
                //consoleLog(1111,self.pluginsConfig.indexOf(WidgetContainer.plugins[i].name))
                WidgetContainer.plugins[i].init(this);
            }
        }

    });
    this.once('ready', function (e) {
        return;
        //console.log('once',self.index);

    });
    this.src = this.actionDivContainer({action: 'getSrc',wid:this.divObject.dataset.wid,affiliate_id:this.divObject.dataset.affiliate_id});
    var src = this.src;
    var params = this.divObject.dataset || {};
    this.css_selector = params.css;
    if (this.css_selector) {
        this.RequestParams.text = MPParseContent.startSearch(this.css_selector);
    }
    var data = this.buildParams(params);
    src += '&data=' + encodeURIComponent(JSON.stringify(data));

    this.affiliate_id = this.divObject.dataset.affiliate_id;
    this.wid = this.divObject.dataset.wid;
    this.index = this.divObject.dataset.index;
    this.Bridge = new Bridge(this.index);
    this.loadPlugins();
    this.Bridge.addAction('resize', function (data) {
        self.resize(data.size);
        // self.fire('ready');
        // self.appendInFrameElement({id:"geo",className:"geo-frame"},'<input value="inframe"  type="button">');
    });
    this.Bridge.addAction('rendered', function (data) {
        self.fire('rendered');
        // self.appendInFrameElement({id:"geo",className:"geo-frame"},'<input value="inframe"  type="button">');
    });
    this.Bridge.addAction('ready', function (data) {
        self.fire('ready');
    });
    this.Bridge.addAction('refreshed', function (data) {
        self.fire('refreshed');
    });
    this.Bridge.addAction('extends', function (data) {
        for (var i in WidgetContainer.plugins) {
            if (WidgetContainer.plugins.hasOwnProperty(i)) {
                if (
                    (typeof WidgetContainer.plugins[i].initialized[self.index] == "undefined")
                    && WidgetContainer.plugins[i].index == data.plugin
                    &&(self.pluginsConfig.indexOf(WidgetContainer.plugins[i].name)>=0)// и он нужен для этого виджета
                ) {
                    WidgetContainer.plugins[i].init(self);
                    //consoleLog(1111,self.pluginsConfig);
                }

            }
        }

    });
    this.Bridge.addAction('change_search_params', function (data) {

        self.change_search_params(data);
    });
    var self = this;
    var config = {
        successFn: function (data) {
            var obj = {hash: null};
            try {
                obj = JSON.parse(data);
            } catch (e) {

            }
            //var obj=JSON.parse(data);

            self.initialize(function (iframe) {

                callback(iframe);
            }, obj.hash);
        }, errorFn: function (error) {
            consoleLog(1, 'ошибка xml :' + error.status);
        }
    };
    self.fire('ready');
    ajax(src, config);
};
WidgetContainer.prototype.initialize = function (callback, hash) {


    this.iframe = document.createElement('iframe');
    this.iframe.id = "myframe-" + this.affiliate_id + "-" + this.wid + "-" + this.index;
    this.divObject.appendChild(this.iframe);
    this.iframe.scrolling = "no";
    this.iframe.style.border = "0";
    this.iframe.style.margin = "0";
    //this.iframe.src="http://widget2.market-place.su/widget/render/"+this.affiliate_id+"/"+this.wid;
    this.iframe.src = "//widget2.market-place.su/compiled/widget_" + this.affiliate_id + "_wid" + this.wid + ".html?index=" + this.index + "&hash=" + hash;
    var self = this;
    this.iframe.onload = function () {
        callback(self.iframe);
    }


};
WidgetContainer.prototype.validate = function () {
    var result = {"status": "success", "messages": []};
    if ((typeof this.divObject.dataset == "undefined") || (this.divObject.dataset.length == 0)) {
        result.status = "failed";

        result.messages.push("empty data-set");
    }
    if (typeof this.divObject.dataset.affiliate_id == "undefined") {
        result.status = "failed";
        result.messages.push("empty data-set affiliate_id");

    }
    if (typeof this.divObject.dataset.wid == "undefined") {
        result.status = "failed";
        result.messages.push("empty data-set wid");
    }
    if (typeof this.divObject.dataset.wid == "undefined") {
        result.status = "failed";
        result.messages.push("empty data-set index");
    }

    if (result.status == "success") {
        return true;
    } else {
        throw result.messages;
    }

};
//api -функции для плагинов
WidgetContainer.prototype.resize = function (size) {

    //var width=(parseInt(size.width)+35)+"px";
    var width = size.width;
    //var height = (parseInt(size.height) + 0) + "px";
    var height = (parseInt(size.height) + 55) + "px";
    this.iframe.width = width;
    this.iframe.height = height;
    this.fire("ready");

};
WidgetContainer.prototype.appendElement = function (params, element) {

    var div = document.createElement('DIV');
    if (typeof params.id != "undefined") {
        div.id = params.id;
    }
    if (typeof params.className != "undefined") {
        div.className = params.className;
    }
    //console.log( 1234,isElement(element));
    switch (true) {
        case isElement(element):
            div.appendChild(element);
            break;
        case typeof element == "string":
            div.innerHTML = element;
            break;

        default :
            console.log('appendElement: ', typeof element);
            break;
    }

    this.divObject.appendChild(div);
    return div;
};
WidgetContainer.prototype.change_search_params = function (data) {
    var self = this;
    // consoleLog(666,'change prams');
    var data2 = self.buildParams(data);
    ajax(self.src + '&data=' + encodeURIComponent(JSON.stringify(data2)), {
        successFn: function (res) {
            var obj = {hash: null};
            try {
                obj = JSON.parse(res);
            } catch (e) {

            }
            //var obj=JSON.parse(res);
            self.sendToFrame('refresh', obj);
        },
        errorFn: function (error) {

        }
    })
};
WidgetContainer.prototype.appendScript=function (src,callback){
    callback=callback||function(){};
    var script=document.createElement('script');
    script.src=src;

    script.onload=function(){
            callback();
    };
    document.body.appendChild(script);
};
WidgetContainer.prototype.ajax=function(src,callback,onerror){
    callback=callback||function(){};
    onerror=onerror||function(){};
    ajax(src, {
        successFn: function (res) {
            callback(res);
        },
        errorFn: function (error) {
            onerror(error);
        }
    });
};


/**
 * работа с фреймом
 */
WidgetContainer.prototype.sendToFrame = function (action, data) {
    if (!this.readyState)return;
    data.index = this.index;
    CallAction(action, data, this.iframe.contentWindow);
};
WidgetContainer.prototype.appendInFrameElement = function (params, innerHTML) {
    this.sendToFrame('appendElement', {params: params, innerHTML: innerHTML});

};
WidgetContainer.prototype.appendInFrameCSS = function (package_) {
    var package = {
        type: "style",
        style: ".someclass{ color:red;}"
    };
    for (var i in package) {
        if (package_.hasOwnProperty(i)) {
            package[i] = package_[i];
        }
    }
    this.sendToFrame('appendStyle', package);
	console.log('style');
};
WidgetContainer.prototype.appendInFrameJS = function (package_) {
    var package = {
        exec: "", // выполняется во фрейме через eval
        src: "", // путь к файлу
        onload: '' // выполняется eval после подгрузки src
    };
    for (var i in package) {
        if (package_.hasOwnProperty(i)) {
            package[i] = package_[i];
        }
    }
    this.sendToFrame('appendScript', package);
};

/**
 * функции для обеспечения событий
 * @param eventName
 * @param handler
 */
WidgetContainer.prototype.on = function (eventName, handler) {

    if (typeof this.events == "undefined") {
        this.events = {};
    }
    if (typeof this.events[eventName] == "undefined") {
        this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
};
WidgetContainer.prototype.once = function (eventName, handler) {

    if (typeof this.onceEvents == "undefined") {
        this.onceEvents = {};
    }
    if (typeof this.onceEvents[eventName] == "undefined") {
        this.onceEvents[eventName] = [];
    }
    this.onceEvents[eventName].push(handler);
};
WidgetContainer.prototype.unbind = function (eventName, handler) {
    if (typeof this.events[eventName] != "undefined") {
        this.events[eventName] = [];
    }
};
WidgetContainer.prototype.fire = function (eventName) {

    if (typeof this.events != "undefined" && typeof this.events[eventName] != "undefined") {
        for (var i = 0; i < this.events[eventName].length; i++) {
            this.events[eventName][i].apply(this, [{name: eventName}]);
        }
    }
    if (typeof this.onceEvents != "undefined" && typeof this.onceEvents[eventName] != "undefined") {
        for (var i = 0; i < this.onceEvents[eventName].length; i++) {

            if (typeof  this.onceEvents[eventName][i] != "undefined") {
                this.onceEvents[eventName][i].apply(this, [{name: eventName}]);
                delete  this.onceEvents[eventName][i];
            }

        }
    }
};

window.MpWidgetContainer = WidgetContainer;
CallAction('container-ready', {index: 'broadcast'}, window);
module.exports = WidgetContainer;