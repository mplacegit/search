/**
 * Created by admin on 28.02.17.
 */
var WidgetPlugin=require('./../mylib/MpWidgetPlugin');


var SearchPlugin={
    name:"WidgetSearchPlugin",
    init:function(widget) {
        var self=this;
        this.widget=widget; //вот так делать нельзя.
        // если на странице несколько виджетов,то
        // в переменную сохранится ссылка на последний

        this.appendStyle({type:"link",style:"//node.market-place.su/widget-plugins/css/WidgetSearchPlugin.css"});
	widget.on('refreshed',function () {
        widget.appendInFrameJS({exec:self.change_search});
		widget.appendInFrameJS({exec:self.change_offer});
		widget.appendInFrameJS({exec:self.change_wid});
    });
        widget.once('ready',function (){
            //console.log(this,"widget");//
            var widget=this;
			widget.appendInFrameJS({exec:self.change_search});
		//	widget.appendInFrameJS({exec:self.change_wid});
			widget.Bridge.addAction('change_height', function (data) {
			widget.iframe.style.height=data.h + "px";
			});
			/*widget.iframe.parentNode.style.width=widget.iframe.width;*/
			widget.iframe.parentNode.style.width='100%';
			/*if (widget.iframe.parentNode.offsetWidth<'500'){
				var offerWid=document.querySelectorAll('.model-offer-wid');
				console.log(offerWid);
				for(var i=0; offerWid.length; i++){
					offerWid[i].style.display='none';
				}
				
			}*/
			widget.iframe.parentNode.style.height="87px";
			widget.iframe.parentNode.style.position='relative';
			widget.iframe.style.position='absolute';
			widget.iframe.style.top='55px';
			widget.iframe.style.boxShadow="rgb(161, 170, 179) 0px 3px 7px 0";
			widget.iframe.style.transform="translate(-10000px, 0px)";
			widget.iframe.style.transition="all 0.5s";
            //запоминаем текущий виджет потому что плагин один на всех
            //это нужно чтобы правильно навесить события и вызвать перезапуск поиска
            var element=self.renderSearchDiv(widget);
            widget.appendElement({id:"",className:'searchD'},element);
		    widget.Bridge.addAction('change_hh', function (data) {
			if (data.c==1){
			widget.iframe.style.transform="translate(-10000px, 0px)";
			}
			});
			var yamart=document.createElement('a');
			yamart.className='mp-copyrYamart';
			widget.Bridge.addAction('change_href', function (data) {
			yamart.href=data.a;
			});
			widget.Bridge.addAction('change_text', function (data) {
			yamart.text=data.t;
			});
			widget.appendInFrameJS({exec:self.change_offer});
           // widget.iframe.style.display='none';
		   yamart.target="_blank";
		   var poisk=widget.iframe.parentNode.querySelector('.copyr-wid')
		   poisk.appendChild(yamart);
		   console.log(poisk);
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
        copyr.className='copyr-wid';
		var copyrLogo=document.createElement('div');
		copyrLogo.className="mp-copyrLogo";
		copyrLogo.style.order='1';
		copyr.appendChild(copyrLogo);
		var aLogo=document.createElement('a');
		aLogo.href="//partner.market-place.su/index.html";
		aLogo.target="_blank";
		aLogo.className="mp-aLogo";
		copyrLogo.appendChild(aLogo);
		var imgLogo=document.createElement('img')
		imgLogo.src="//node.market-place.su/widget-plugins/css/img/logo.png";
		aLogo.appendChild(imgLogo);
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
	var clos=document.querySelector('.close-frame');\
	var height=document.querySelector('.widget--light').offsetHeight;\
	mp_widget.sendToParent('change_height',{h:height});\
	var copyright=document.querySelector('.yamart-copyright');\
	var Acopyright=document.querySelector('.yamart-copyright a').href;\
	mp_widget.sendToParent('change_href',{a:Acopyright});\
	var Textcopyright=document.querySelector('.yamart-copyright a').text;\
	mp_widget.sendToParent('change_text',{t:Textcopyright});\
	copyright.parentNode.removeChild(copyright);\
	clos.onclick = function(){\
	var closeCl=1;\
	mp_widget.sendToParent('change_hh',{c:closeCl});\
	}\
	})()",
	change_wid : "(function () {\
	console.log(document.querySelector('#widget').offsetWidth);\
	if (document.querySelector('#widget').offsetWidth<'500'){\
	var offerWid=document.querySelectorAll('.model-offer-wid');\
				for(var i=0; i<offerWid.length; i++){\
					offerWid[i].style.display='none';\
				}\
	var arrWid=document.querySelectorAll('.model-arrow-righgt');\
				for(var j=0; j<arrWid.length; j++){\
					arrWid[j].style.display='none';\
				}\
	var nameWid=document.querySelectorAll('.model-name-wid');\
				for(var k=0; k<nameWid.length; k++){\
					nameWid[k].style.width='50%';\
				}\
	var priceWid=document.querySelectorAll('.model-price-wid');\
				for(var q=0; q<priceWid.length; q++){\
					priceWid[q].style.width='40%';\
				}\
	var sumWid=document.querySelector('.sum-offers');\
	sumWid.style.display='none';\
	}\
	var lightHe=document.querySelectorAll('.widget-model');\
	var ofHe=lightHe[0].offsetHeight;\
	console.log(ofHe);\
	})()",
	change_offer : "(function offers() {\
	var offer=document.querySelectorAll('.widget-model');\
	var fullOff=document.querySelectorAll('.wid-offer-more');\
	for(var j=0; j<fullOff.length; j++){\
	fullOff[j].style.transform='translate(-10000px, 0px)';\
	fullOff[j].classList.add('for_'+j);\
	}\
	var backOffer=document.querySelectorAll('.full-offer-back');\
	for (var k=0; k<backOffer.length; k++){\
	backOffer[k].onclick=function(){\
	this.parentNode.style.transform='translate(-10000px, 0px)';\
	document.querySelector('.sum-offers i').innerHTML='Найдено товаров:';\
	 document.querySelector('.sum-offers span').innerHTML=offer.length;\
	}\
	}\
	 for(var i=0; i<offer.length; i++){\
	 offer[i].id='for_'+i;\
	 offer[i].onclick=function(){\
	 var selfId=this.id;\
	 for(var j=0; j<fullOff.length; j++){\
	 fullOff[j].style.transform='translate(-10000px, 0px)';\
	 }\
	 var selfPod=document.querySelector('.'+selfId);\
	 var lengthOff=selfPod.querySelectorAll('.more-flex-glav').length;\
	 document.querySelector('.sum-offers i').innerHTML='Найдено предложений:';\
	 document.querySelector('.sum-offers span').innerHTML=lengthOff;\
	 var qwer=document.querySelector('.'+selfId).style.transform='translate(0%, 0px)';\
	 }\
	}\
	})()",
};
var plugin=new WidgetPlugin(SearchPlugin);