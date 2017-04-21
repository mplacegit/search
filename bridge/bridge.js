/**
 * Created by admin on 17.02.17.
 */
var BridgeLib = require('./../mylib/iFrameBridge');
var Bridge=BridgeLib.Bridge;
var CallAction=BridgeLib.callAction;

function Container(){
    this.Bridge=new Bridge('myindex');
    var self=this;
    this.Bridge.addAction("setVar",function(data){
        self.secret.push(data.secret);

    });
    this.secret=[];
}

var x=new Container();

CallAction('setVar',{index:'myindex',secret:13},window);
console.log(x)