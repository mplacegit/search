var WidgetPlugin=require('./../mylib/MpWidgetPlugin');

var SliderPlugin={
    name:"WidgetSliderPlugin",
    init:function(widget) {
	var self=this;
	widget.on('refreshed',function () {
        widget.appendInFrameJS({exec:self.change_slider});
    });
	widget.once('ready',function() {
		widget.appendInFrameJS({exec:'exec_block_mobile_second_sw({css_id:"widget_5746c8e110f45_wid97",template:"block-mobile-second-sw",wid:"97",channel:"97",aff_id:"5746c8e110f45"})'});
	});
	},
};
var plugin=new WidgetPlugin(SliderPlugin);