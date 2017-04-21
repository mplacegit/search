'use strict';
var MPParseContent = require('./MPParseContent');
var MPHttp = require('./MPHttp');
var WidgetContainer = require('./MPWidgetContainer');
var LOGApi = require('./LOGApi');

function MPWidgetLibDispatcher(params) {
    this.wText = MPParseContent.startSearch();
    this.collection = [];
};

MPWidgetLibDispatcher.prototype.startKeySelector = function startKeySelector(key, cnt) {
    var self = this;

    function myDivCollback(obj) {
        LOGApi.consoleLog(0, obj);

    }

    cnt = cnt || 1;
    if (cnt <= 0) {
        LOGApi.consoleLog(1, 'Нет контейнеров' + cnt);
        return;
    }
    var selectedDivs = document.querySelectorAll(key);
    if (!selectedDivs.length) {
        var self = this;
        cnt--;
        LOGApi.consoleLog(1, 'ожидание  ключа ' + key + ' ' + cnt);
        window.setTimeout(function () {
            self.startKeySelector(key, cnt);
        }, 295);
        return;
    }
    function actionDivContainer(obj) {
        obj = obj || {};
        obj.action = obj.action || 'test';
        switch (obj.action) {
            case 'getSrc':
                obj.wid = obj.wid || '97';
                obj.affiliate_id = obj.affiliate_id || '56015401b3da9';
                return '//newapi.market-place.su/api?mth=api&wid=' + obj.wid + '&affiliate_id=' + obj.affiliate_id + '&rnd=' + Math.random();
                break;
            case "getSearchText":
                return  MPParseContent.startSearch();
                break;
        }
    }

    var enu = 0;
    for (var i = 0, j = selectedDivs.length; i < j; i++) {
        if (typeof selectedDivs[i].dataset != 'indefined') {
            //selectedDivs[i].dataset.index=i;
        }
        try {
            this.collection[enu] = new WidgetContainer(selectedDivs[i]);
        } catch (e) {
            LOGApi.consoleLog(0, e);
            continue;
        }

        this.collection[enu].actionDivContainer = actionDivContainer;
        selectedDivs[i].dataset.index = enu;
        this.collection[enu].init(myDivCollback);
        //this.collection[enu].actionDivContainer({action:'stop all',div:this.collection[enu]});
        LOGApi.consoleLog(1, 'найден :' + i + '/' + enu);
        enu++;

        //this.collection[i].init_(selectedDivs[i]);
    }
};
module.exports = MPWidgetLibDispatcher;