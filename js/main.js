 'use strict';

 $(document).ready(function() {

     var interval;
     var counter = 1;
     var sliderContainer = $(".slider-container ul");
     var slidesElem = sliderContainer.find("li");
     var slidesElemSize = slidesElem.length;
     var slideTabs = $(".slider-tabs");
     var defaultNum;
	 var windowWidth = $(window).width();

	 function sliderDefaultPosition() {
         slidesElem.find("img").css({ "opacity": 0 });
		 slideTabs.find("a").eq(0).addClass("current");	
		 slideTabs.find("a").eq(0).siblings("a").removeClass("current");		 		 
         sliderContainer.css({ "margin-left": 0 });
         slidesElem.eq(0).find("img").animate({ "opacity": 1 }, 1000);
     };

     function setSlidesParam(leftPosition) {
         slidesElem.each(function(index, value) {
             return $(this).css({ "left": leftPosition * index, "width": leftPosition });
         });
     };

     function setAnimateToSlider(value, animateDirection, imgNumber) {
         sliderContainer.animate({ "margin-left": animateDirection + value }, 500);
         slidesElem.eq(imgNumber).find("img").animate({ "opacity": 1 }, 2000);
         slidesElem.eq(imgNumber).find("img").animate({ "opacity": 0 }, 2000);
     };

     function startSlider(movingParam) {
         slidesElem.eq(0).find("img").animate({ "opacity": 1 }, 2000);
         slidesElem.eq(0).find("img").animate({ "opacity": 0 }, 2000);
         interval = setInterval(function() {
             if (slidesElemSize > counter) {
				 slideTabs.find("a").eq(counter).addClass("current");
			     slideTabs.find("a").eq(counter).siblings("a").removeClass("current");
                 setAnimateToSlider(movingParam, '-=', counter);
                 counter++;
             } else {
                 counter = 1;
                 sliderDefaultPosition();
             }
         }, 4000);
     };

     function stopSlider() {
         clearInterval(interval);
     };

     function createSlidePaging() {
         for (var i = 0; i < slidesElemSize; i++) {
             var increased = i;
             ++increased;
             slideTabs.append("<a href='#' data-id=" + increased + ">" + increased + "<i></i></a>");
             slideTabs.find("a").eq(0).addClass("current");
             slidesElem.eq(0).find("img").animate({ "opacity": 1 }, 2000);
             slidesElem.eq(0).find("img").animate({ "opacity": 0 }, 2000);
         }
     };

     function stopOnEvent(element) {
		element.mouseover(function(){
		  element.on("click", function(event){
	        addActionOnPagingClick(event);
			element.off('click');				
		  });
		  stopSlider();
		});
		element.mouseleave(function(){
		  startSlider(windowWidth);
		});		
     };

     function addActionOnPagingClick(event) {
			 event.preventDefault();		 
             defaultNum = counter;
             var target = $(event.target);
			 target.addClass("current");
			 target.siblings("a").removeClass("current");
             var elemNumber = +(target.attr('data-id'));
             var currentPosition;
             var param;
             if (elemNumber) {
                 if (elemNumber > defaultNum) {
                     currentPosition = elemNumber - defaultNum;
                     param = '-=';
                 } else {
                     currentPosition = defaultNum - elemNumber;
                     param = '+=';
                 }
                 var currentStep = windowWidth * currentPosition;
                 counter = elemNumber;	
                 setAnimateToSlider(currentStep, param, elemNumber - 1);
                 defaultNum = elemNumber;
             }
     };
	 
     setSlidesParam(windowWidth);
     createSlidePaging();
     startSlider(windowWidth); 
     stopOnEvent(slideTabs.find("a"));
	 
     $(window).resize(function() {
         counter = 1;
	     windowWidth = $(window).width();
	     setSlidesParam(windowWidth);
	     sliderDefaultPosition();
	     stopSlider();
		 startSlider(windowWidth);
     });
	 
 });