var WidgetPlugin=require('./../mylib/MpWidgetPlugin');

var SPlugin={
    name:"WidgetSPlugin",
    init:function(widget) {
	var self=this;
	widget.on('refreshed',function () {
        widget.appendInFrameJS({exec:self.change_mobil});
    });
	widget.once('ready',function() {
		widget.Bridge.addAction('change_hh', function (data) {
		widget.iframe.style.height=data.h + "px";
    });
			/*widget.appendInFrameCSS({
			type: "link",
			style: "//api.market-place.su/templates/widget_templates/widget-block-mobile-new-test/css/widget-slider-big.css"});
			*//*widget.iframe.style.bottom="0";
			widget.iframe.style.position="fixed";*/
			widget.iframe.style.boxShadow="0px 0px 6px rgba(0,0,0,.4)";
			// крестик 
			var glav_div=widget.iframe.parentNode;
			glav_div.style.bottom="0";
			glav_div.style.position="fixed";
			glav_div.style.width="100%";
			glav_div.style.transition="all 1s";
			var closer=document.createElement('div');
			closer.className="close-widget";
			closer.style.width="21px";
			closer.style.height="22px";
			closer.style.zIndex="9999";
			closer.style.cursor="pointer";
			closer.style.position="absolute";
			closer.style.top="6px";
			closer.style.right="10px";
			closer.style.background="url(http://api.market-place.su/templates/widget_templates/widget-block-mobile-new-test/css/images/close.png)";
			closer.style.backgroundSize="100% 100%";
			closer.style.opacity="1";
			closer.style.transition="all 1s";
			var open=document.createElement('div');
			open.style.width="21px";
			open.style.height="22px";
			open.style.zIndex="0";
			open.style.cursor="pointer";
			open.style.position="absolute";
			open.style.top="6px";
			open.style.right="10px";
			open.style.background="url(http://api.market-place.su/templates/widget_templates/widget-block-mobile-new-test/css/images/open.png)";
			open.style.backgroundSize="100% 100%";
			open.style.opacity="0";
			open.style.transition="all 1s";
			glav_div.appendChild(closer);
			glav_div.appendChild(open);
			var selfglav=glav_div.offsetHeight;
			closer.onclick = function () {
				if (glav_div.offsetHeight > selfglav){
				glav_div.style.bottom = -(parseInt(document.body.clientHeight) - 34) + "px";
				}
				else{
                glav_div.style.bottom = -(parseInt(widget.iframe.style.height) - 34) + "px";
				}
				closer.style.opacity="0";
				open.style.opacity="1";
				closer.style.zIndex="0";
				open.style.zIndex="9999"
            }
			open.onclick = function () {
                glav_div.style.bottom = "0px";
				closer.style.opacity="1";
				open.style.opacity="0";
				closer.style.zIndex="9999";
				open.style.zIndex="0"
            }
			widget.appendInFrameJS({exec:self.change_mobil});
			window.addEventListener("resize", function() {
			widget.appendInFrameJS({exec:self.change_mobil});
			}, false);
		});
	},
	change_mobil : "(function () {\
	if (screen.width > screen.height){\
				var elems = document.getElementsByClassName('model-offers');\
				var foto = document.getElementsByClassName('foto-block');\
				var i;\
				for(i=0; i < elems.length; i++) {\
					elems[i].style.display = 'none';\
					foto[i].style.order='1';\
				}\
				var elems1 = document.getElementsByClassName('model-offers-orient');\
				for(i=0; i < elems1.length; i++) {\
				elems1[i].style.display = 'block';\
				}\
			}\
	else {\
				var i;\
				var elems1 = document.getElementsByClassName('model-offers-orient');\
				for(i=0; i < elems1.length; i++) {\
				elems1[i].style.display = 'none';\
				}\
				var elems = document.getElementsByClassName('model-offers');\
				var foto = document.getElementsByClassName('foto-block');\
				for(i=0; i < elems.length; i++) {\
					elems[i].style.display = 'block';\
					foto[i].style.order='0';\
				}\
			}\
	var height_block=document.getElementById('widget').offsetHeight;\
	mp_widget.sendToParent('change_hh',{h:height_block});\
			})()",
};
var plugin=new WidgetPlugin(SPlugin);