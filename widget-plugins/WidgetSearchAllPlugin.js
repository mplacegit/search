/**
 * Created by admin on 28.02.17.
 */
var WidgetPlugin=require('./../mylib/MpWidgetPlugin');


var SearchAllPlugin={
    name:"WidgetSearchAllPlugin",
    init:function(widget) {
        var self=this;
        this.widget=widget; //вот так делать нельзя.
        // если на странице несколько виджетов,то
        // в переменную сохранится ссылка на последний

		widget.on('refreshed',function () {
			widget.appendInFrameJS({exec:self.change_search});
		});
        widget.once('ready',function(){
            //console.log(this,"widget");//
            var widget=this;
			this.appendInFrameCSS({type:"link",style:"//node.market-place.su/widget-plugins/css/WidgetSearchAllPlugin.css"});
			widget.appendInFrameJS({exec:self.change_search});
			widget.iframe.height="400px";//для примера
            //запоминаем текущий виджет потому что плагин один на всех
            //это нужно чтобы правильно навесить события и вызвать перезапуск поиска
            var element=self.renderSearchDiv(widget);
           /*widget.appendElement({id:"",className:''},element);
            widget.iframe.style.display='none';*/
			widget.Bridge.addAction('change_value', function (data) {
			widget.change_search_params({userText:data.v});
			});
        });
    },
    renderSearchDiv:function(widget){
        var self=this;
        var d0=document.createElement('div');
        d0.className='serchPanel_';


        var s1=document.createElement('SPAN');
        s1.className='startSearch_';
        var s2=document.createElement('SPAN');
        s2.className='startSearch_2';
        var ch=document.createElement('span');
        ch.className='startSear';
        ch.innerHTML='Поиск';
        ch.style.display="block";
        var copyr=document.createElement('DIV');
        copyr.className='copyr';
        copyr.id='copyr';
        var d1=document.createElement('DIV');
        //d1.style.display="none";
        d1.style.zIndex=199;
        d1.className="mp-widget-search-div";
        var inp=document.createElement('input');
        inp.placeholder = 'Какой товар вас интересует?';
        inp.className='field';
        d1.appendChild(inp);
        //var sp=document.createElement('span');
        //sp.innerHTML='';
        /*var exitFrame=document.createElement('span');
         exitFrame.innerHTML='';
         exitFrame.className='exitFrame';
         exitFrame.id='exitFrame';*/
        //

        d0.style.height='87px';
        d0.style.top='0px';
        //d0.style.background='rgba(255, 255, 255, 0.85)';
        //d0.style.padding='3px 0px';
        //d0.style.borderRadius='5px';
        //d0.style.boxShadow='5px 8px 15px rgba(0,0,0,0.5)';
        ch.style.display='none';
        //s1.style.display='none';
        //d1.style.display='block';
        d1.style.width='100%';
        //d1.style.border='none';
        //var im = new Image('24px, 23px');
        //im.src = "url(http://api.market-place.su/stest/img/lupa-hov-act.png)";
        //d1.style.background='none';
        //d1.style.padding='0px';
        //d1.style.top='0px';
        //d1.style.left='0px';
        //d1.style.height='100%';
        //d1.style.boxShadow='none';
        /*s1.style.background='url(http://api.market-place.su/stest/img/lupa.png)';
         s1.onmouseover = function(){
         s1.style.background='url(http://api.market-place.su/stest/img/lupa-hov-act.png)';
         }
         s1.onmouseout= function(){
         s1.style.background='url(http://api.market-place.su/stest/img/lupa.png)';
         }
         s1.style.background.hover='url(http://api.market-place.su/stest/img/lupa-hov-act.png)';
         *//*inp.style.display='block';
         inp.style.position='relative';
         inp.style.top='calc(50% - 22px)';
         inp.style.width='calc(92% - 60px)';
         inp.style.left='2%';
         inp.style.height='40px';
         inp.style.fontSize='20px';
         inp.style.boxShadow='rgba(0, 0, 0, 0.498039) 1px 1px 5px';
         sp.style.display='block';
         sp.style.boxShadow='rgba(0, 0, 0, 0.498039) 1px 1px 5px';
         sp.style.height='36px';
         sp.style.width='18px';
         sp.style.borderRadius='20px';
         sp.title='Найти';
         sp.style.position='absolute';
         sp.style.right='2px';
         sp.style.top='calc(50% - 19px)';*/
        //exitFrame.title='Закрыть результаты поиска';
        //
        /*exitFrame.onclick=function(){
         self.widget.iframe.style.display="none";
         exitFrame.style.display='none';
         self.widget.iframe.contentWindow.document.querySelector(".geo_list_frame").style.display='none'
         }*/
        //self.widget.iframe.style.height='0px';
        inp.onkeydown=function(event){
            event=event||window.event;
            if(event.keyCode==13){

                widget.change_search_params({userText:this.value});
               widget.iframe.style.transform='translate(0%, 0px)';
                widget.iframe.style.opacity='1';
                widget.iframe.style.zIndex='9999999999';
                widget.iframe.style.display='inherit';
                //exitFrame.style.display='block';
            }
        }
        s1.onclick=function(){
            widget.change_search_params({userText:inp.value});

            //self.widget.iframe.removeAttribute("style");
            //self.widget.iframe.style.display="flex";
            widget.iframe.style.transform='translate(0%, 0px)';
            widget.iframe.style.opacity='1';
            widget.iframe.style.zIndex='9999999999';
            widget.iframe.style.display='inherit';
            //d0.style.top='0';

            //exitFrame.style.display='block';
        }
        //d1.appendChild(sp);
        s1.innerHTML='  ';
        /*ch.onclick=function(){
         if (d0.offsetLeft > 208 || s1.offsetLeft > 208){
         d1.style.right="30px";
         }
         else {d1.style.right="-210px"}
         if (d1.style.display && d1.style.display=="none"){
         d1.style.display ="inline-block";
         ch.style.display ="none";
         }
         }*/
        /*s1.onclick=function(){
         if (d0.offsetLeft > 200 || s1.offsetLeft > 200){
         d1.style.right="30px";
         }
         else {d1.style.right="-210px"}
         if(d1.style.display && d1.style.display=="none"){
         d1.style.display ="inline-block";
         ch.style.display ="none";
         }
         else{
         d1.style.display="none";
         ch.style.display="block";
         }
         }*/
        s1.style.zIndex=201;
        d0.appendChild(d1);
        d0.appendChild(s1);
        d0.appendChild(s2);
        d0.appendChild(ch);
        d0.appendChild(copyr);
        //d0.appendChild(exitFrame);
        return d0;
    },

    appendStyle:function(data) {
        var style=null;
        var type=(data.type=="link")?"link":"style";
        style=document.createElement(type);
        if(type=="link") {
            style.href=data.style;
            style.rel="stylesheet"
        }else {
            style.innerHTML=data.style;
        }

        document.head.appendChild(style);

    },
	change_search : "(function () {\
	var search=document.createElement('div');\
	search.className='blockSearch';\
	var widget=document.getElementById('widget');\
	var widgetVlog=widget.querySelector('.widget');\
	var widgetVlogFirst=widgetVlog.firstChild.nextSibling;\
	widgetVlog.insertBefore(search, widgetVlogFirst);\
	var start=document.createElement('span');\
	start.className='startSearch';\
	var start_2=document.createElement('span');\
	start_2.className='startSearchPod';\
	var strokaPoiska=document.createElement('div');\
	strokaPoiska.className='blockPoiska';\
	strokaPoiska.style.transform='translate(0px, -30px)';\
	var stroka=document.createElement('input');\
	stroka.className='inputPoisk';\
	stroka.placeholder='Какой товар Вас интересует?';\
	strokaPoiska.appendChild(stroka);\
	var enter=document.createElement('span');\
	enter.className='enterPoisk';\
	var enterPod=document.createElement('span');\
	enterPod.className='enterPoiskPod';\
	strokaPoiska.appendChild(enter);\
	strokaPoiska.appendChild(enterPod);\
	search.appendChild(strokaPoiska);\
	enter.onclick=function(){\
		var strokaValue=stroka.value;\
		mp_widget.sendToParent('change_value',{v:stroka.value});\
	};\
	stroka.onkeydown=function(event){\
        event=event||window.event;\
        if(event.keyCode==13){\
			var strokaValue=stroka.value;\
            mp_widget.sendToParent('change_value',{v:stroka.value});\
        }\
    };\
	search.appendChild(start);\
	search.appendChild(start_2);\
		start.onclick=function(){\
		if (strokaPoiska.style.transform=='translate(0px, -30px)'){\
		strokaPoiska.style.transform='translate(0px, 0px)';\
		}\
		else{\
		strokaPoiska.style.transform='translate(0px, -30px)';\
		}\
	}\
	})()"
};
var plugin=new WidgetPlugin(SearchAllPlugin);