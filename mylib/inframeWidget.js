/**
 * Created by admin on 17.02.17.
 */
'use strict';
var ajax = require('./../mylib/MPHttp').ajax;
var tepmlator = require('./../mylib/Templator');
var BridgeLib = require('./../mylib/iFrameBridge');
var Bridge = BridgeLib.Bridge;
var CallAction = BridgeLib.callAction;
window.tepmlator = tepmlator;
function Widget(config) {
    var self = this;
    this.src = "//newapi.market-place.su/staticdata.php";
    this.index = config.index || null;
    this.readyState=false;

    this.Bridge = new Bridge(this.index);
    this.attributes = window.attributes;
    this.size = window.size;
    this.container = document.getElementById('widget');
    this.template=document.getElementById('template').innerHTML;
    this.divObject=null;

    /**
     * получает массив товаров и вызывает функцию cb
     * @param cb
     */
    this.getProducts = function (cb) {
        var src = self.src;
        ajax(src, {
            successFn: function (r) {
                var widgetdata = JSON.parse(r);
                cb(widgetdata);
            }, errorFn: function () {
            }
        });
    };

    /**
     * рендерит шаблон с указанным массивом
     * @param renderArray
     */
    this.render = function (renderArray,template) {
        var template_=self.template||template;
        renderArray.attributes = self.attributes;
        self.container.innerHTML = tepmlator.tmpl(template_, renderArray);
        self.divObject= self.container.querySelector('.widget');

        self.MainJs();
    };

    /**
     * обработчики кликов и т.д
     * @constructor
     */
    this.MainJs = function () {
        var links = self.container.querySelectorAll('.mp-offers a');
        for (var i in links) {

            if (links.hasOwnProperty(i)) {
                var link = links[i].href;
                links[i].onclick = function (e) {
                    window.PostAffTracker.track();
                };
            }

        }
    };


    /**
     * устанавлиивает параметр который влияет на получаемый массив для рендера
     * @param hash
     * @returns {string|*}
     */
    this.setHash=function (hash) {
        if(typeof hash!="undefined") {
            this.src = "//newapi.market-place.su/api/hash/" + hash;
        } else {
            this.src = "//newapi.market-place.su/staticdata.php";
        }
        return this.src;

    };

    /**
     * Посылает ноые параметры для поиска в родительский контейнер
     * @param params
     */
    this.change_search_params=function(params) {
        self.sendToParent('change_search_params',params);
    };

    /**
     * получает массив товарных предложений из this.src и запускает рендер
     * @param hash - необязательный параметр.
     * меняет this.src и массив получаемых товаров соответственно
     * @param cb - необязательный параметр.
     */
    this.fillContainer=function(hash,cb) {
        var callback=cb||function () {

            };
        if(typeof hash!="undefined") {
            self.setHash(hash);
        }

        self.getProducts(function (products) {

            self.render(products);
            callback();
        });
    };


    /**
     *
     * @param params - {id:"geo",className:"geo-frame"} параметры элемента
     * @param innerHTML - тело элемента
     * @returns {Element}
     */
    this.appendElement=function (params,innerHTML) {
        var div=document.createElement('DIV');
        if(typeof params.id!="undefined") {
            div.id=params.id;
        }
        if(typeof params.className!="undefined") {
            div.className=params.className;
        }
        div.innerHTML=innerHTML;
        self.divObject.appendChild(div);
        return div;
    };
    this.sendToParent=function(action,data){
        // console.log(arguments)
        data.index= self.index;
        CallAction(action, data,window.parent);
    };

    this.Bridge.addAction('setHash',function(data){
        self.setHash(data.hash);
    });

    this.Bridge.addAction('renderArray',function(data){
        self.render(data.renderArray);
    });
    /**
     * запускаем рендер с новыми товарами
     */
    this.Bridge.addAction('refresh',function(data){
        self.fillContainer(data.hash,function () {
            self.sendToParent('refreshed',{});
        });

    });

    this.Bridge.addAction('appendElement',function(data){
        // console.log("123432412341234",data)
        self.appendElement(data.params,data.innerHTML);
    });

    /**
     * добавляет стили
     */

    this.Bridge.addAction('appendStyle',function(data) {
	console.log("app");
        var style=null;
        var type=(data.type=="link")?"link":"style";
        style=document.createElement(type);
        if(type=="link") {
            style.href=data.style;
			style.rel="stylesheet";
        }else {
            style.innerHTML=data.style;
        }

        document.head.appendChild(style);
    });
    this.Bridge.addAction('appendScript',function(data) {

        var script=document.createElement('script');
        script.src=data.src;
        if(typeof data.exec=="string"){
            eval(data.exec);
        }else {
            data.exec(this);
        }
        if(data.onload){
            script.onload=function(){
                eval(data.onload);
            }
        }
        document.body.appendChild(script);
    });
    // инициализация

    this.fillContainer(config.hash,function () {
        CallAction('resize', {index: self.index, size: self.size}, window.parent);
    });

}
module.exports = Widget;