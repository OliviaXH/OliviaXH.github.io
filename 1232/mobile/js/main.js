var laod_images = [
  {
    "src": "mobile\\images\\big.png",
    "id": "big"
  },
  {
    "src": "mobile\\images\\big_active.png",
    "id": "big_active"
  },
  {
    "src": "mobile\\images\\down.png",
    "id": "down"
  },
  {
    "src": "mobile\\images\\loading\\bg.jpg",
    "id": "bg"
  },
  {
    "src": "mobile\\images\\logo.png",
    "id": "logo"
  },
  {
    "src": "mobile\\images\\menu\\bg.jpg",
    "id": "bg"
  },
  {
    "src": "mobile\\images\\menu\\close.png",
    "id": "close"
  },
  {
    "src": "mobile\\images\\menu\\line.png",
    "id": "line"
  },
  {
    "src": "mobile\\images\\menu.png",
    "id": "menu"
  },
  {
    "src": "mobile\\images\\next.png",
    "id": "next"
  },
  {
    "src": "mobile\\images\\prev.png",
    "id": "prev"
  },
  {
    "src": "mobile\\images\\s1\\bg.jpg",
    "id": "bg"
  },
  {
    "src": "mobile\\images\\s1\\car.png",
    "id": "car"
  },
  {
    "src": "mobile\\images\\s1\\content.png",
    "id": "content"
  },
  {
    "src": "mobile\\images\\s1\\layout.png",
    "id": "layout"
  },
  {
    "src": "mobile\\images\\s2-1\\bg.jpg",
    "id": "bg"
  },
  {
    "src": "mobile\\images\\s2-1\\car.png",
    "id": "car"
  },
  {
    "src": "mobile\\images\\s2-1\\layout.png",
    "id": "layout"
  },
  {
    "src": "mobile\\images\\s2-1\\title.png",
    "id": "title"
  },
  {
    "src": "mobile\\images\\s2-1\\txt\\1.png",
    "id": "1"
  },
  {
    "src": "mobile\\images\\s2-1\\txt\\2.png",
    "id": "2"
  },
  {
    "src": "mobile\\images\\s2-1\\txt\\3.png",
    "id": "3"
  },
  {
    "src": "mobile\\images\\s2-1\\txt\\4.png",
    "id": "4"
  },
  {
    "src": "mobile\\images\\s2-2\\1.png",
    "id": "1"
  },
  {
    "src": "mobile\\images\\s2-2\\2.png",
    "id": "2"
  },
  {
    "src": "mobile\\images\\s2-2\\3.png",
    "id": "3"
  },
  {
    "src": "mobile\\images\\s2-2\\bg.jpg",
    "id": "bg"
  },
  {
    "src": "mobile\\images\\s2-2\\layout.png",
    "id": "layout"
  },
  {
    "src": "mobile\\images\\s2-2\\next.png",
    "id": "next"
  },
  {
    "src": "mobile\\images\\s2-2\\prev.png",
    "id": "prev"
  },
  {
    "src": "mobile\\images\\s2-2\\title.png",
    "id": "title"
  },
  {
    "src": "mobile\\images\\s4\\car.png",
    "id": "title"
  },
  {
    "src": "mobile\\images\\menu\\bg.jpg",
    "id": "title"
  },
  {
    "src": "mobile\\images\\s2-4\\bg.jpg",
    "id": "title"
  },
  {
    "src": "mobile\\images\\s5\\bg.jpg",
    "id": "title"
  },
  {
    "src": "mobile\\images\\s6\\bg.jpg",
    "id": "title"
  },
  {
    "src": "mobile\\images\\s7\\bg.png",
    "id": "title"
  },
]
var $s6 = $('.s6');
var $s5 = $('.s5');
var $menu_layout = $('.menu-layout');
var active = 0;
var clearTime;
// common
function scroll(){
  var myScroll = new IScroll('.tab-scroll',{scrollbars: 'custom',resizeScrollbars: false});
  var myScroll2 = new IScroll('.tab-scroll2',{scrollbars: 'custom',resizeScrollbars: false});
  var myScroll3 = new IScroll('.tab-scroll3',{scrollbars: 'custom',resizeScrollbars: false});
  window.myScroll = myScroll;
}


$(function(){

  var point_list = [{
    index: 1,
    name : 's2-1'
  },{
    index: 4,
    name: 's2-4'
  },{
    index: 5,
    name: 's3'
  },{
    index: 6,
    name: 's4'
  }];
  var unlock = false;
  //每屏小点闪烁
  function points(elem, double){
    var two = 2000;
    var point = $('.' + elem + ' .point');
    var lastElem = point.eq(0);
    point.addClass('bg');
    lastElem.removeClass('bg');
    clearInterval(clearTime);
    clearTime = setInterval(function(){
      var temp_elem = lastElem.next();
      lastElem = temp_elem.length != 0 ? lastElem.next() : point.eq(0);
      point.addClass('bg');
      lastElem.removeClass('bg');
    }, two)
  }
  var frist = 0;
  var the_one = false;
  var the_one_s5 = false;
  var bol_2=true;
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    initialSlide: 0,
    noSwiping : true,
    onSlideChangeEnd: function(swiper){
      //获取当前页的active.用于menu字体高亮
      active = $('.swiper-slide-active .menu').data('active');
      for(var i in point_list){
        if(point_list[i].index == swiper.activeIndex){
          if(swiper.activeIndex == 6){
            if(flag == 2){ points('iiiii');}else{points('sssss'); }
          }else{
            points(point_list[i].name);
          }
        }
      }
        var swiperActiveIndex = mySwiper.activeIndex;

        var appendIndex = swiperActiveIndex + 3;
        var $appendDom = $('#page' + appendIndex);
        if($appendDom.length > 0 && swiperActiveIndex != 0){
          mySwiper.appendSlide($appendDom.html());
          mySwiper.update();
          $appendDom.remove();
        }
        if(swiperActiveIndex == 2){
          if(bol_2){xingshi_swiper()}
            bol_2=false;
        }else if(swiperActiveIndex == 7 && !the_one_s5){
          peizhi_swiper();
          setTimeout(function(){
            scroll();
          }, 500);
          s5_fun();
          the_one_s5 = true;
        }else if(swiperActiveIndex == 8){
          news_swiper();
        }else if(swiperActiveIndex == 9 && !the_one){
          reserv.init();
          the_one = true;
        }
        //console.log(swiperActiveIndex)
        // xingshiSwiper.update();
        // peizhiSwiper.update();
        // newsSwiper.update();
      // }
      if(swiper.activeIndex == 6){
        if(frist == 0){
          unlock = true;
          frist++;
          s4_fun();
        }
        mySwiper.lockSwipes();
        //   $('.s4 .slide-box').animate({'left':'-420'}, 1000);
      }
//GHAC埋码
	if(swiperActiveIndex==0){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page1', 'title': '活动首页'});
	}else if(swiperActiveIndex==1){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-1', 'title': '技术卖点-动力革新'});
	}else if(swiperActiveIndex==2){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-2', 'title': '技术卖点-行驶模式'});
        ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'EVmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
	}else if(swiperActiveIndex==3){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-3', 'title': '技术卖点-智导互联'});
	}else if(swiperActiveIndex==4){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-4', 'title': '技术卖点-安全超感'});
	}else if(swiperActiveIndex==5){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page3', 'title': '车型外观'});
	}else if(swiperActiveIndex==6){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page4', 'title': '车型内饰'});
	}else if(swiperActiveIndex==7){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page5', 'title': '参数配置'});
	}else if(swiperActiveIndex==8){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page6', 'title': '媒体声音'});
	}else if(swiperActiveIndex==9){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page7-1', 'title': '预约试驾'});
	}


      ga(function(tracker) {
        // Logs the trackers name.
        // (Note: default trackers are given the name "t0")
        console.log(tracker.get('name'));

        // Logs the client ID for the current user.
        console.log(tracker.get('clientId'));

        // Logs the URL of the referring site (if available).
        console.log(tracker.get('referrer'));
      });
//GHAC埋码 end



    },
    onSlideChangeStart: function(){
      if(clearTime){
        clearInterval(clearTime);
        $('.point').addClass('bg');
      }
    }
  });
  var _point = {};
  var flag = 1;
  var runing = false;
  function s4_fun(){
    $('.s4').on('touchstart', function(ev){
      console.log('s')
      var e = ev.originalEvent;
      _point.y = e.touches[0].screenY;
    });

    $('.s4').on('touchmove', function(ev){
      if(runing){
        return false;
      }
      var e = ev.originalEvent;
      if(e.touches[0].screenY > _point.y){
        //为真是up,false是down
        points('sssss');
        if(flag == 1){
          console.log('here')
          mySwiper.unlockSwipes();
          mySwiper.slidePrev();
          points('s3');
        }
        if(flag == 2){
          $('.s4 .slide-box').animate({'left':'0'}, 1000, function(){
            flag = 1;
          });
        }
      }else{
        points('iiiii');
        if(flag == 1){
          $('.s4 .slide-box').animate({'left':'-9.5rem'}, 1000, function(){
            flag = 2;
          });
        }else{
          flag = 2;
          mySwiper.unlockSwipes();
          mySwiper.slideNext();
          var swiperActiveIndex = mySwiper.activeIndex;
          var appendIndex = swiperActiveIndex + 3;
          var $appendDom = $('#page' + appendIndex);
          if($appendDom.length > 0 && swiperActiveIndex != 0){
            mySwiper.appendSlide($appendDom.html());
            mySwiper.update();
            $appendDom.remove();
          }
          if(swiperActiveIndex==7){
          		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page5', 'title': '参数配置'});
          		console.log(7)
          }
        }
      }
      runing = true;
      setTimeout(function(){
        runing = false;
      }, 500);
    });
  }


  window.mySwiper = mySwiper;
  function news_swiper(){
    var newsSwiper = new Swiper('.swiper-news',{
      prevButton:'.s6 .prev',
      nextButton:'.s6 .next',
    });
    window.newsSwiper = newsSwiper;
  }

  function peizhi_swiper(){
    var peizhiSwiper = new Swiper('.swiper-peizhi',{
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
      onInit: function(){
      }
    });
    window.peizhiSwiper = peizhiSwiper;
  }

  function xingshi_swiper(){
    var xingshiSwiper = new Swiper('.swiper-xingshi',{
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
      onInit: function(){
      },
      onSlideChangeEnd: function(Swiper){
      	 var swiperActiveIndex = xingshiSwiper.activeIndex;
      	 if(swiperActiveIndex==0){
      	 	ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'EVmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
            console.log("ga"+swiperActiveIndex+"EVmode")
      	 }else if(swiperActiveIndex==1){
      	 	ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'Hybridmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
            console.log("ga"+swiperActiveIndex+"Hybridmode")
      	 }else if(swiperActiveIndex==2){
      	 	ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'Enginemode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
            console.log("ga"+swiperActiveIndex+"Enginemode")
      	 }
      }

    });
    window.xingshiSwiper = xingshiSwiper;
  }




  // s5配置表

  function s5_fun(){
    var $peizhi = $('.swiper-peizhi', $('.s5'));
    var $tab_item = $('.tab-scroll', $('.s5'));
    var $xinghaoBtn = $('.xinghao-btn', $('.s5'));
    var $xinghaoItem = $('#xinghao-item', $('.s5'));
    var $curXinghao = $('#curXinghao');
    var $Item = $('p', $xinghaoItem);
    var $down = $('.down', $('.s5'));
    var $close = $('.close', $('.s5'));
    var $config = $('.config-wrapper', $('.s5'));
    $('.swiper-slide', $(".s5")).on('click', function(){
    	console.log($(this), $(this).index())
      $down.hide();
      $close.show();
      $config.show();
      mySwiper.lockSwipes();
      var index = $(this).index();
      $tab_item.eq(index).show();
      $curXinghao.text($Item.eq(index).text())
      new IScroll('.tab-scroll' + (index+1),{scrollbars: 'custom',resizeScrollbars: false});
      $peizhi.hide();
    });

    $xinghaoBtn.on('click', function(){
      console.log('ss')
      $xinghaoItem.toggle();
    });
    $Item.on('click',function(){
      $config.show();
      $curXinghao.text($(this).text())
      $xinghaoItem.toggle();
      var index = $(this).index();
      $tab_item.hide().eq(index).show();
      new IScroll('.tab-scroll' + (index+1),{scrollbars: 'custom',resizeScrollbars: false});
    });
    $close.on('click', function(){
      $peizhi.show();
      $config.hide();
      $tab_item.hide();
      $down.show();
      $close.hide();
      mySwiper.unlockSwipes();
    });
  }
  // s6媒体声音
  +function(){
    $('.next', $('.s6')).on('click', function(){
      newsSwiper.slideNext();
    });

    $('.prev', $('.s6')).on('click', function(){
      newsSwiper.slidePrev();
    });
  }();

  // menu
  +function(){
    var $close = $('.close', $menu_layout);
    var $menu_li = $('li', $menu_layout);
    $close.on('click', function(){
      $menu_layout.hide();

    });
    $(document).on('click', '.menu', function(){
      var _active = $(this).data('active') ? $(this).data('active') : active;
      $menu_li.removeClass('active').eq(_active).addClass('active');
      $menu_layout.show();
    });
    $menu_li.on('click', function(){
      $('.second-page').remove();
      $menu_layout.hide();
      mySwiper.unlockSwipes();
      var page = $(this).data('mpage') ? $(this).data('mpage') : $(this).data('page');
      var _page = $(this).data('page');
      for(var i = 0 ; i <= page + 2; i++){
        var $appendDom = $('#page' + i);
        if($appendDom.length > 0){
          mySwiper.appendSlide($appendDom.html());
          mySwiper.update();
          $appendDom.remove();
        }
      }
      if(frist == 0 && page > 7){
        unlock = true;
        frist++;
        s4_fun();
        $('.s4 .slide-box').animate({'left':'-9.5rem'}, 1000, function(){
          flag = 2;
        });
      }
      mySwiper.slideTo(_page);
    });
  }();



  + function(){
    var length = laod_images.length;
    var num = 100 / length;
    var c = document.getElementById('process');
    var process = c.getAttribute('data-process');
    var ctx = c.getContext('2d');
    var lastNumber = 1;
    console.log('加载'+lastNumber);
//GHAC埋码 加载时
console.log('加载时');
	ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page0', 'title': '加载页面'});
//GHAC埋码 加载时 end
    $('.loading .en').addClass('en' + lastNumber + ' anime-left').css('animation');
    $('.loading .cn').addClass('cn' + lastNumber + ' anime-right').css('animation');
    // 画灰色的圆
    $('.loading .en').on('animationend webkitAnimationEnd', function(){
      $('.loading .en', '.loading .cn').css('animation','');
      $('.loading .en').removeClass('en'+lastNumber +' anime-left');
      $('.loading .cn').removeClass('cn'+ lastNumber + ' anime-right');
      lastNumber++;
      console.log('加载'+lastNumber);
      setTimeout(function(){
        $('.loading .en').addClass('en' + lastNumber + ' anime-left').css('animation');
        $('.loading .cn').addClass('cn' + lastNumber + ' anime-right').css('animation');
        if(lastNumber == 4 && length == 0){
          setTimeout(function(){
            $('.loading .text').fadeIn(function(){
              setTimeout(function(){
                $('.loading').fadeOut(function(){
                  $(this).remove();
                  $('.swiper-container').show();
                  mySwiper.update();
                  $('.point').addClass('bg');
                  setTimeout(function(){ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page1', 'title': '活动首页'}); console.log("加载完")},100)
                });
              },2000);
          });
          }, 3000);
        }
      },1000);
    });

    function randomNumber(){
      return ~~(Math.random() * 4);
    }

    for(var i = 0; i < length; i++){
      var img = new Image();
      img.src = laod_images[i].src;
      img.onload = function(){
        length--;
        // var number = parseInt(100 - num * length);
        // dawr(number * 2.69)
        // $('.number').text(number);
        // if(length == 0){
        //   loading_end = true;
        //   $('.loading .info').text('');
        // }
        if(lastNumber >= 4 && length == 0){
          setTimeout(function(){
            $('.loading .text').fadeIn(function(){
              setTimeout(function(){
                $('.loading').fadeOut(function(){
                  $(this).remove();
                  $('.swiper-container').show();
                  mySwiper.update();
                  $('.point').addClass('bg');
                });
              },2000);
          });
          }, 3000);
        }
      }
    }

    var ppp = 100;
    timer = setInterval(function(){
        ppp--;
        var number = parseInt(100 - ppp);
        dawr(number * 2.69)
        $('.number').text(number + '%');
        if(ppp == 0){
          $('.loading .info').text('');
          clearInterval(timer)
        }
      },150)

    function dawr(angle){
      // 画灰色的圆
      ctx.clearRect(0,0,200,200);
      ctx.beginPath();
      ctx.arc(100, 100, 80, 1.5* Math.PI, angle * Math.PI/ 180, false);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#6db7f1';
      ctx.stroke();
    }
  }();

  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // video
  +function(){
    var $s1 = $('.s1');
    var $player = $('.player');
    var $close = $('.close', $player);
    var $play = $('#play', $player);
    var $video1 = $('.video1', $s1);
    var $video2 = $('.video2', $s1);
    var video1 = $('video', $s1)[0];
    var video2 = $('video', $s1)[1];
    var video_name="";//用于判断那个视频
    $video1.on('click', function(){
      if(isAndroid){
        $play.attr('src', video1.src);
        $player.fadeIn();
        $play[0].play();
      }else{
        video1.play();
      }
      ga('send', 'event', '201609-accordsporthybrid', 'Index', 'video-全新TVC',     {nonInteraction: false});
      video_name="全新TVC";
      console.log(video_name)

    });
    $video2.on('click', function(){
      if(isAndroid){
        $play.attr('src', video2.src);
        $player.fadeIn();
        $play[0].play();
      }else{
        video2.play();
      }
      ga('send', 'event', '201609-accordsporthybrid', 'Index', 'video-上市发布会',     {nonInteraction: false});
      video_name="上市发布会";
      console.log(video_name)
    });
    $close.on('click', function(){
    	var video=document.getElementById('play')
      alert(video.currentTime)
      $player.fadeOut();
      $play[0].pause();
      ga('send', 'event', '201609-accordsporthybrid', 'Index', 'video-'+video_name, '视频时长');
    });

  }();
});


