/**
 * Created by admin on 25.02.17.
 */
var WidgetPlugin=require('./../mylib/MpWidgetPlugin');
var ajax=require('./../mylib/MPHttp').ajax;
var SGeoPlugin={
    name:"WidgetSGeoPlugin",
    init:function(widget){
        // console.log('geoPlugin2',widget);

        var self=this;
        widget.once('ready',function () {
            // self.drawGeo(widget);
            //console.log('load_geo_plugin');
            widget.appendInFrameJS({exec:self.change_geo});
			widget.Bridge.addAction('change_hh', function (data) {
				if (data.h==100){
				widget.iframe.parentNode.style.bottom="0";
				widget.iframe.style.height=data.h + "%";
				}
				else{
				widget.iframe.style.height=data.h + "px";
				}
			});
        });
        widget.on('refreshed',function () {
            // self.drawGeo(widget);
            widget.appendInFrameJS({exec:self.change_geo});

        });

    },
    drawGeo:function (widget) {
        var src='https://api.market-place.su/Sgeo.php';
        ajax(src, {
            successFn: function (r) {
                // var widgetdata = JSON.parse(r);
                widget.appendInFrameElement({id:'geo',className:'ggg'},r);

            }, errorFn: function () {
            }
        });

    },
    createElement:function () {
        console.log('createElement');
    },
    last:function () {
        console.log('last function');
    },
    change_geo : "(function () {\
    var selCity = document.body.querySelector('.city-name');\
	var selfHeight=document.getElementById('widget').offsetHeight;\
	console.log(selfHeight);\
    if (selCity) {\
        selCity.onclick = function () {\
        console.log('click');\
    var oid = document.body.querySelector('.mp-offers');\
    var d = document.body.querySelector('.geo_list_frame');\
	d.style.height=screen.height - 30 + 'px';\
	window.addEventListener('resize', function() {\
			d.style.height=screen.height - 34 + 'px';\
			}, false);\
			var height_b;\
    if (d) {\
			if (d.style.display == 'block') {\
			console.log('блок закрыт');\
			height_b=selfHeight;\
			}\
			else{\
			console.log('блок открыт');\
			height_b=100;\
			}\
			mp_widget.sendToParent('change_hh',{h:height_b});\
        var uu = d.querySelector('.geo_list');\
        if (uu) {\
            if (d.style.display == 'block') {\
                d.style.display = 'none';\
                oid.style.display = 'block';\
            }\
            else {\
                d.style.display = 'block';\
                oid.style.display = 'none';\
            }\
            return;\
        }\
    }\
    try {\
        var xhr = new XMLHttpRequest();\
        var url = 'https://api.market-place.su/Sgeo.php?r=' + Math.random();\
        xhr.open('GET', url, true);\
        xhr.send();\
        xhr.onreadystatechange = function () {\
            if (this.readyState != 4) return;\
            if (this.status != 200) {\
                return;\
            }\
            oid.style.display = 'none';\
            d.innerHTML = this.responseText;\
            var ldd = d.querySelectorAll('ul.geo_list li');\
            for (var i = 0, j = ldd.length; i < j; i++) {\
                ldd[i].onclick = function () {\
                    var geo = this.dataset['regionId'];\
                    var geo_name = this.innerHTML;\
                    mp_widget.change_search_params({geo_id:geo});\
                }\
            }\
            try {\
                d.style.display = 'block';\
            } catch (E) {\
            }\
        }\
    } catch (e) { }\
          }\
    }\
})();",
    // terminator:null
};

var geo=new WidgetPlugin(SGeoPlugin);