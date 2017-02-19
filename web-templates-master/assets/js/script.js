var leftReveal = {
  delay    : 200,
  distance : '500px',
  origin:'left',
  // easing   : 'ease-in-out',
  // rotate   : { z: 10 },
  // scale    : 1.1
};

var rightReveal = {
  delay    : 200,
  distance : '500px',
  origin:'right',
  // easing   : 'ease-in-out',
  // rotate   : { z: 10 },
  // scale    : 1.1
};
var downReveal = {
  delay    : 200,
  distance : '500px',
  origin:'bottom',
  // easing   : 'ease-in-out',
  // rotate   : { z: 10 },
  // scale    : 1.1
};
window.sr = ScrollReveal({reset:true});
sr.reveal('.title',{duration:1000});
// sr.reveal('.round',{duration:1000});
sr.reveal('.move',{duration:1000});
sr.reveal('.from-bottom',downReveal);

sr.reveal('.from-left',leftReveal);
// sr.reveal('.from-right',{duration:400},{opacity:0},{origin:'right'},{distance: '20px'});
sr.reveal('.from-right',rightReveal);




    
// loading加载js
$(function(){
	// var progress = $.AMUI.progress;
 //    progress.start();
 //    $(document).ready(function(){
 //  	  progress.done();

 //  	});
 	
 	$(".toUp").click(function(){
       $.smoothScroll({
          offset:-2000,
          speed:1000,
       });
   });



	var navigation = $('#nav-main').okayNav();
	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header,#nav-main').addClass('fixed');
		} else {
			$('#header,#nav-main').removeClass('fixed');
		}
	});

	// swiper 轮播图
	//
	var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay:3000/*每隔3秒自动播放*/,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
    // 如果需要滚动条
    scrollbar: '.swiper-scrollbar',
  }) 

  var mySwiper = new Swiper('.sec-swiper', {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 20,
        autoplay:3000/*每隔3秒自动播放*/,
        // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    loop:true,
    });
    var mySwiper = new Swiper('.thr-swiper', {
        pagination: '.swiper-pagination',
        slidesPerView: 6,
        paginationClickable: true,
        spaceBetween: 50,
        autoplay:3000/*每隔3秒自动播放*/,
        // 如果需要前进后退按钮
	    // nextButton: '.swiper-button-next',
	    // prevButton: '.swiper-button-prev',
	    loop:true,
    }); 


   //team-member
   $(".team-member").hover(function(){
      $(this).children('.team-filter').toggle();
      $(this).children(".team-words").toggle();
   })


   //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(113.631349,34.753488),12);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
    var map;
      initMap();
})