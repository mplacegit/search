/**
 * Created by admin on 24.02.17.
 */
var BridgeLib = require('./iFrameBridge');
var Bridge = BridgeLib.Bridge;
var CallAction = BridgeLib.callAction;
function WidgetPlugin(init) {
    var self=this;
    this.init=function(parent) {
        self._init.apply(self,arguments);
        self.initialized[parent.index]=true;

    };
    for(var i in init){
        if(init.hasOwnProperty(i)) {

            if(i=="init"&&typeof init[i]=="function"){
                this._init=init[i];

            }else {
                this[i]=init[i];
            }

        }
    }
    this.bridge=new Bridge();
    this.index=this.bridge.index;
    this.initialized=[];
    this.bridge.addAction('container-ready',function () {
        MpWidgetContainer.extends(self);
        CallAction('extends',{index:'broadcast',plugin:self.index},window);
    });
}
WidgetPlugin.prototype={};
module.exports=WidgetPlugin;