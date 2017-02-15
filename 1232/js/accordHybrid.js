/**
 * Created by WANG585 on 2016/8/29.
 */

var module = module || {
	index: 0,
	dotindex: 0,
	title: "",
	describe: "",
	time:0
};
var stt = $('.s_title');

//控制loading加载
module.loading = function() {
	var time = 450 + 4000*Math.random();
	module.time = time;
	module.carAnimate();
		setTimeout(function(){
			$("#loading").fadeOut();
		},time)
}

module.fullpage = function() {
	var runPage;
	runPage = new FullPage({
		id: 'pageContain',
		slideTime: 800,
		continuous : true, 
		effect: {
			transform: {
				translate: 'Y',
				scale: [1, 1],
				rotate: [0, 0]
			},
			opacity: [0, 1]
		},
		mode: 'wheel,touch,nav:navBar',
		easing: 'ease',
		afterLoad: function(anchorLink, index) {
			alert('aaa');
			switch(index) {
				case 1:
					module.section1(module.time);
					break;
				case 2:
					module.section2();
					module.panduanAddDot("s2", ".section2_dotWrap");
					break;
				case 3:
					module.section3();
					module.panduanAddDot("s3", ".section3_dotWrap");
					break;
				case 4:
					module.section4();
					module.panduanAddDot("s4", ".section4_dotWrap");
					break;
				case 5:
					module.section5();
					break;
				case 6:
					module.section6();
					break;
				case 7:
					module.section7();
					break;
			}
		}
		
	});

}

module.section1 = function(time) {
	$(".section1 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s1_ztit').animate({
			left: '19%'
		},1000);
		$('.s1_ftit').animate({
			right: '21%'
		},1000);
		$('.funtec').animate({
			left: '19%'
		},1000);
	});
}

module.section2 = function(time) {
	$(".section2 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s2_ztit').animate({
			left: '19%'
		},1000);
	});
}
module.section3 = function(time) {
	$(".section3 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s3_ztit').animate({
			left: '19%'
		},1000);
	});
}
module.section4 = function(time) {
	$(".section4 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s4_ztit').animate({
			left: '19%'
		},1000);
	});
}
module.section5 = function(time) {
	$(".section5 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s5_ztit').animate({
			left: '19%'
		},1000);
	});
}
module.section6 = function(time) {
	$(".section6 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s6_ztit').animate({
			left: '19%'
		},1000);
	});
}
module.section7 = function(time) {
	$(".section7 .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.s7_ztit').animate({
			left: '19%'
		},1000);
	});
}
module.swiperPop = function(time) {
	$(".pop_swiper .nextPage").delay(time).animate({
		"right": "0%",
	}, 800, function() {
		$('.saa_ztit').animate({
			left: '19%'
		},1000);
	});
}

/*添加点点*/
module.addDot = function(section, section_dotWrap) {
	var html1, html2 = "",
		html3, html;;
	for(var i = 0; i < data.section.length; i++) {
		if(data.section[i].name == section) {
			var si = data.section[i]
			for(var j = 0; j < si.dots.length; j++) {
				for(var k = 0; k < si.dots[j].code.length; k++) {
					var sdj = si.dots[j]
					html1 = "<i class='dot" + j + " dot'><img src='img/dot.png' class='dotPic'/><img src='img/bg_ly.png' class='quan'/><ul class='dot_text css3Menu'><em></em>";
					
					var tt = sdj.code[k];
					html2 += "<li>" + tt.title + "</li>";
					html3 = "</ul></i>";
					html = html1 + html2 + html3;
				}
				$(section_dotWrap).append(html);
				html2 = "";
			}
			break;
		}
	}
}
/*判断是否已经存在点点*/
module.panduanAddDot = function(section, section_dotWrap) {
	if($(section_dotWrap).children().length <= 0) {
		module.addDot(section, section_dotWrap);
	}
}
module.JSswiper = function(src) {
	html = "<div class='swiper-slide'><img src='img/" + src + ".jpg' class='percentW'/></div>";
	$("#swiper-wrapper").append(html);
}
/*点击点点*/
module.dot_textClick = function() {
	$(document).on("click", ".quan", function(e) {
		module.swiperPop();
		var index, src = "",
			$src = [],
			$this = $(this),
			$section, $dotIndex;
		var hmlBig = "<div class='swiper-container' id='swiper-container1'><div class='swiper-wrapper' id='swiper-wrapper'></div></div><a class='arrow-left css3Menu' href='#'></a><a class='arrow-right css3Menu' href='#'></a>"
		$section = $this.closest(".section_dotWrap").attr("data-s");
		$dotIndex = $this.parent().attr("class").split(" ")[0].split("t")[1];
		module.dotindex = $dotIndex;
		module.title = "";
		module.describe = "";
		for(var i = 0; i < data.section.length; i++) {
			if(data.section[i].name == $section) {
				/*index = data.section[i].dots[$dotIndex].code.length;*/ //点点之间不轮播
				index = data.section[i].dots.length; //点点之间轮播
				for(var j = 0; j < index; j++) {
					for(var k = 0; k < data.section[i].dots[j].code.length; k++) {
						if(data.section[i].dots[j].code[k].src != "") {
							src = src + data.section[i].dots[j].code[k].src + "&&//&&";
							module.title = module.title + data.section[i].dots[j].code[k].title + "&&//&&";
							module.describe = module.describe + data.section[i].dots[j].code[k].describe + "&&//&&";
						}
					}
				}
				break;
			}
		}
		$src = src.split("&&//&&");
		/*e.stopPropagation();*/
		$("#pop_swiper").removeClass("hide").animate({"left":"0"},300);
		$(".toBottom").addClass("hide");
		$("#pop_swiper").find(".percent").append(hmlBig);
		for(var i = 0; i < $src.length - 1; i++) {
			module.JSswiper($src[i]);
		}
		module.panduanTxt($section, $dotIndex)
		module.index = index;
		module.swiperStart($dotIndex);
		$("#fullpage1").fullpage.setAllowScrolling(false);
	})
}
module.swiperStart = function($dotIndex) {
	var $dotIndex = module.dotindex
	var mySwiper = new Swiper('#swiper-container1', {
		/*autoplay : 5000,//可选选项，自动滑动
		loop : true,//可选选项，开启循环*/
		calculateHeight: true,
		initialSlide :$dotIndex,
		onSlidePrev:function() {
			var $section;
			var $index = mySwiper.activeIndex;
			$section = $("#swiper-wrapper").find(".swiper-slide-active img").attr("src").split("/")[1].split("_")[0];

			if($index <= module.index) {
				module.panduanTxt($section, $index);
			}
		},
		onSlideNext: function() {
			var $section;
			var $index = mySwiper.activeIndex;
			$section = $("#swiper-wrapper").find(".swiper-slide-active img").attr("src").split("/")[1].split("_")[0];
			if($index >= 0)
				module.panduanTxt($section, $index);
		}
	})
	$(".arrow-left").on('click', function(e) {
		e.preventDefault();
		mySwiper.swipePrev();
	})
	$(".arrow-right").on('click', function(e) {
		e.preventDefault()
		mySwiper.swipeNext()
	})
}
module.panduanTxt = function($section, $index) {
	var src, title = [],
		describe = [];
	title = module.title.split("&&//&&");
	describe = module.describe.split("&&//&&");
	for(var i = 0; i < data.section.length; i++) {
		if(data.section[i].name == $section) {
			src = "img/" + $section + "_title.png";
			$("#pop_swiperTxt").find(".pop_swiperTitle").attr("src", src);
			$("#pop_swiperTxt").find("h4").html(title[$index]);
			$("#pop_swiperTxt").find("p").html(describe[$index]);
		}
	}
}


module.pop_close = function() {
	$(".pop_close").on("click", function() {
		var $this = $(this);
		$this.parent().addClass("hide");
		if($this.siblings("#play_box").length) {
			$("#play_box video").get(0).pause()
		}
		$("#fullpage1").fullpage.setAllowScrolling(true);
	})
}

/*媒体声音 [[*/
var main_a_arr=["http://www.baidu.com","http://www.baidu.com","http://www.baidu.com","http://www.baidu.com"]
var main_title_arr=["主aaaaaaaaaaa","主bbbbbbbbbbbb","主ccccccccccccccc","主ddddddddddddddd"];
var main_titf_arr=["副aaaaaaaaaaa","副bbbbbbbbbbbb","副ccccccccccccccc","副ddddddddddddddd"];
var maina_arr=["查看详情","查看详情","查看详情","查看详情"];
var $main_title=$("#main_title");
var $main_titf=$("#main_titf");
var $main_a=$("#main_a a");
module.swiperVoice = function($dotIndex) {
	var swiper2 = new Swiper ('#swiper-container2', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
		onSlideChangeStart: function(){
			updateNavVoice();
		},	
	});
	
	$(".section6 .swiper-prev").on('click', function(e) {
		e.preventDefault();
		swiper2.swipePrev();
	})
	$(".section6 .swiper-next").on('click', function(e) {
		e.preventDefault()
		swiper2.swipeNext()
	})
	function updateNavVoice(){
		// 主标题
		var currentIndex=swiper2.activeIndex;
		$main_title.text(main_title_arr[currentIndex]);	
		$main_titf.text(main_titf_arr[currentIndex]);
		$main_a.text(maina_arr[currentIndex])
					 .attr('href',''+main_a_arr[currentIndex]+'');
	}
}
/*媒体声音 ]]*/

/*关闭图片展示弹层*/
module.swiperClose = function() {
	$(".swiperClose").on("click", function() {
		$(this).parent().animate({"left":"100%"},300,function(){
			$(this).addClass("hide");
		});
		$(this).siblings(".percent").children().remove();
		$(".toBottom").removeClass("hide");

		$("#fullpage1").fullpage.setAllowScrolling(true);
	})
}

//loading初始动画
module.carAnimate = function() {
	var i = 0,
		src;
	setInterval(function() {
		i++;
		src = "img/s1_car" + i + ".png"
		if(i > 2) {
			i = 0;
		};
		$(".s1_car").attr("src", src);
	}, 100)	
}


$(function() {
	module.loading();
	module.fullpage();

	
	/*module.menuHover();*/
	
	module.pop_close();
	module.swiperClose();
	module.dot_textClick();
	module.swiperVoice();
})