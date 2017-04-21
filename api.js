(function() {
    function async_load(args){
		  if(typeof window.myOpenRaquestRegister=='undefined'){
		   window.myOpenRaquestRegister=1;
		  }else{
		  return;
		  }
		  	var s = document.getElementsByTagName('head')[0];
            var spp = document.createElement('script'); 
            spp.type = 'text/javascript'; 
			spp.async = true;
            spp.src = "//node.market-place.su/build/mpwidget.js?v=1.js?rnd="+Math.random();
            spp.charset = 'UTF-8';
			spp.defer=true;
			spp.onload=function(){
			startMyWidget(22);
			}
			s.appendChild(spp);
	        }
	 function startMyWidget(cnt){
	 if(cnt <= 0){
	 console.log('Не загрузилась библиотека myPublicOpenRequest');
	 return;
	 }
	 if(typeof window.MPWidgetLibDispatcher == "undefined"){
	        cnt--;
			console.log('ожидание '+cnt);
	        window.setTimeout(function () {
            startMyWidget(cnt);
            }, 95);
            return;
	 }

	 var tmp=new window.MPWidgetLibDispatcher();
	 tmp.startKeySelector('div.mpwidget',22);
	  window.MPWidgetBackRef = function(obj) {
      obj = obj || {};
	  action = obj.action || 'test';
	  switch(action){
	  case "getContainer":
	  if(tmp.collection[obj.index] !='undefined'){
	  return tmp.collection[obj.index];
	  }
	  break;
	  }
	  //console.log([155,obj]);
	  //console.log([156,tmp]);
	  
      };	
	 
	 }	  
	 if(typeof window.myOpenRaquestNumber=='undefined'){
		  window.myOpenRaquestNumber=1;
		  }else{
		  window.myOpenRaquestNumber++;
		  }
     var myArgs={test:window.myOpenRaquestNumber};
	 async_load(myArgs);
	 return;
	 if (typeof window.attachEvent!='undefined'){
     window.attachEvent('onload', function(){async_load(myArgs);});
	 }
     else{
	 if(typeof window.addEventListener!='undefined'){
	 window.addEventListener('load', function(){async_load(myArgs);}, false);
	 }else{
	 setTimeout( // если страница не заканчивается
     function(){
     async_load(myArgs);
     },
     1000);
	 }
     }


})(); 
