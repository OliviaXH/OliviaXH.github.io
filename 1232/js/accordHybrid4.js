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
	var time = 1680 + 4000*Math.random();
	module.time = time;
	module.carAnimate();
		setTimeout(function(){
			$(".fullWrap").removeClass("opcity");
			$("#loading").fadeOut();
			setTimeout(function(){
				 var targetURL = window.location.toString();
				var targetPage = targetURL.substring(targetURL.indexOf("#")+1);
				switch(targetPage){
				    case "page2":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-1', 'title': '技术卖点-动力革新'}); 
					   break;
				    case "page2_2":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-2', 'title': '技术卖点-行驶模式'});
				           ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'EVmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1}); 
					   break;
				    case "page2_3":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-3', 'title': '技术卖点-智导互联'}); 
					   break;
				    case "page2_4":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page2-4', 'title': '技术卖点-安全超感'}); 
					   break;
					case "page3":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page3', 'title': '车型外观'});  
					   break;
					case "page4":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page4', 'title': '车型内饰'}); 
					   break;
					case "page5":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page5', 'title': '参数配置'}); 
					   break;
					case "page6":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page6', 'title': '媒体声音'});
					   break;
					case "page7":
					   ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page7-1', 'title': '预约试驾'});
					   break;
				    default:
				        ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page1', 'title': '活动首页'});
				        break;
				}

				},300)
			$('#msBackground').hide();
		},time)
}

module.fullpage = function() {
	$("#fullpage1").fullpage({
		sectionsColor: ['#fff'],
		verticalCentered: false,
		//scrollingSpeed:10,
		/*navigation:true,*/
//		autoScrolling:false,
		anchors: ['page1', 'page2','page2_2','page2_3','page2_4', 'page3', 'page4', 'page5', 'page6', 'page7'],
		menu: '.menu',
		afterLoad: function(anchorLink, index) {
			switch(index) {
				case 1:
					module.section1(module.time);
					break;
				case 2:
					module.section2();
					break;
				case 3:
					module.section2_2();
					break;
				case 4:
					module.section2_3();
					break;
				case 5:
					module.section2_4();
					break;
				case 6:
					module.section3();
					module.panduanAddDot("s3", ".section3_dotWrap");
					break;
				case 7:
					module.section4();
					module.panduanAddDot("s4", ".section4_dotWrap");
					break;
				case 8:
					module.section5();
					break;
				case 9:
					module.section6();
					break;
				case 10:
					module.section7();
					//module.input_placeholder();
					break;
			}
		},
		onLeave: function(index, direction) {
			if(index == '1') {
				$('.section1 .nextPage').animate({right: '-30%'}, 10);
			}
			if(index == '2'){
				$('.section2 .nextPage').animate({right: '-30%'}, 400);
				$('.s2_tit').animate({left: '-40%'},400);
			}
			if(index == '3'){
				$('.section2_2 .nextPage').animate({right: '-30%'}, 400);
				$('.section2_2 .s2_2_tit').animate({left: '-40%'},400);
			}
			if(index == '4'){
				$('.section2_3 .nextPage').animate({right: '-30%'}, 400);
				$('.section2_3 .s2_3_tit').animate({left: '-75%'},400);
			}
			if(index == '5'){
				$('.section2_4 .nextPage').animate({right: '-30%'}, 400);
				$('.section2_4 .s2_4_tit').animate({left: '-36%'},400);
			}
			
			if(index == '6') {
				$('.section3 .nextPage').animate({right: '-30%'}, 400);
				$('.s3_tit').animate({left: '-39%'},400);
			}
			if(index == '7') {
				$('.section4 .nextPage').animate({right: '-30%'}, 400);
				$('.s4_tit').animate({left: '-42%'},400);
			}
			if(index == '8') {
				$('.section5 .nextPage').animate({right: '-30%'}, 400);
				$('.s5_tit').animate({left: '-28%'},400);
				$('.parameter .para1').animate({left: '-14%'},400);
				$('.parameter .para2').animate({left: '-14%'},400);
				$('.parameter .para3').animate({left: '-14%'},400);
				$('.parameter .para4').animate({left: '-14%'},400);
			}
			if(index == '9') {
				$('.section6 .nextPage').animate({right: '-30%'}, 400);
				$('.s6_tit').animate({left: '-16%'},400);
			}
			if(index == '10') {
				$('.section6 .nextPage').animate({right: '-30%'}, 400);
				$('.s7_tit').animate({left: '-22%'},400);
			}
		}
	});
}

module.section1 = function(time) {
	$(".section1 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s1_ztit').animate({
			left: '15%'
		},600);
		$('.s1_ftit').animate({
			right: '15%'
		},600);
		$('.funtec').animate({
			left: '15%'
		},600);
	});
}

module.section2 = function(time) {
	$(".section2 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s2_tit').animate({left: '8%'},600);
	});
}
/*第二页的第二个页面*/
module.section2_2 = function(time) {
	$(".section2_2 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s2_2_tit').animate({left: '12%'},600);
	});
}
module.section2_3 = function(time) {
	$(".section2_3 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s2_3_tit').animate({left: '8%'},600);
	});
}
module.section2_4 = function(time) {
	$(".section2_4 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s2_4_tit').animate({left: '8%'},600);
	});
}
module.section3 = function(time) {
	$(".section3 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s3_tit').animate({left: '8%'},600);
	});
}
module.section4 = function(time) {
	$(".section4 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s4_tit').animate({left: '8%'},600);
	});
}
module.section5 = function(time) {
	$(".section5 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s5_tit').animate({left: '12%'},600);
		$('.parameter .para4').animate({left: '68%'},600);
		$('.parameter .para3').animate({left: '49%'},800);
		$('.parameter .para2').animate({left: '30.5%'},1000);
		$('.parameter .para1').animate({left: '12%'},1200);
	});
}
module.section6 = function(time) {
	$(".section6 .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.section6 .s6_tit').animate({left: '10%'},600);
	});
}
module.section7 = function(time) {
	$('.s7_tit').animate({left: '12%'},600);
}
/*第二页内弹层动效速度*/
module.section2_pop = function(time) {
	$(".sec2_pop .pop_tab").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.s2_pop_tit').animate({left: '2%'},600);
	});
}

/*第5页内弹层动效速度*/
module.section5_pop = function(time) {
	$(".sec5_pop .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.sec5_pop .s5pop_tit').animate({left: '10%'},600);
	});
}

module.swiperPop = function(time) {
	$(".pop_swiper .nextPage").delay(time).animate({
		"right": "0%",
	}, 400, function() {
		$('.saa_ztit').animate({
			left: '19%'
		},600);
	});
}

/*第5页内弹层展示*/
module.sec5Pop = function(section) {
	$(".parameter .view").on("click", function() {
		$(".sec5_pop").removeClass("hide");
		module.section5_pop();
		//GA_0018
		// $(this).attr("data") 结合标签使用
		ga('send', 'event', '201609-accordsporthybrid', 'Configuration', $(this).attr("data"),     {'dimension3': 'accord-sporthybrid', 'metric6': 1});
		//GA_0018 end
	});
	$(".sec5_pop .nextPage a").on("click", function() {
		$(".sec5_pop").addClass("hide");
	});
	$(".s5_pop_close").on("click", function() {
		$(".sec5_pop").addClass("hide");
	});
}
/*第5页内弹层展示*/

/*第二页内弹层展示*/
module.sec2Pop = function(section) {
	$("#s2_2quan").on("click", function() {
		$(".sec2_pop").removeClass("hide");
		$(".fullpage-wrapper").addClass("hide");
		$("#menu").addClass("hide");
		$(".sec2_pop .tab1").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab2").removeClass("hide");
		$(".sec2_pop .tab3").removeClass("hide").addClass("hide");
		module.section2_pop();

		//GA_008
		ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'Engine',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		console.log(1,'Engine')
		//GA_008 end
	});
	$("#s2_1quan").on("click", function() {
		$(".sec2_pop").removeClass("hide");
		$(".fullpage-wrapper").addClass("hide");
		$("#menu").addClass("hide");
		$(".sec2_pop .tab1").removeClass("hide");
		$(".sec2_pop .tab2").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab3").removeClass("hide").addClass("hide");
		module.section2_pop();

		//GA_008
		ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'CVT',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		console.log(1,'CVT')
		//GA_008 end
	});
	$("#s2_3quan").on("click", function() {
		$(".sec2_pop").removeClass("hide");
		$(".fullpage-wrapper").addClass("hide");
		$("#menu").addClass("hide");
		$(".sec2_pop .tab1").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab2").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab3").removeClass("hide");
		module.section2_pop();

		//GA_008
		ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'IPU',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		console.log(1,'IPU')
		//GA_008 end
	});
	$("#pop_tab2").on("click", function() {
		$(".sec2_pop").removeClass("hide");
		$(".fullpage-wrapper").addClass("hide");
		$("#menu").addClass("hide");
		$(".sec2_pop .tab1").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab2").removeClass("hide");
		$(".sec2_pop .tab3").removeClass("hide").addClass("hide");
		//GA_008
		ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'Engine',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		console.log(2,'Engine')
		//GA_008 end
	});
	$("#pop_tab1").on("click", function() {
		$(".sec2_pop").removeClass("hide");
		$(".fullpage-wrapper").addClass("hide");
		$("#menu").addClass("hide");
		$(".sec2_pop .tab1").removeClass("hide");
		$(".sec2_pop .tab2").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab3").removeClass("hide").addClass("hide");
		//GA_008
		ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'CVT',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		console.log(2,'CVT')
		//GA_008 end
	});
	$("#pop_tab3").on("click", function() {
		$(".sec2_pop").removeClass("hide");
		$(".fullpage-wrapper").addClass("hide");
		$("#menu").addClass("hide");
		$(".sec2_pop .tab1").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab2").removeClass("hide").addClass("hide");
		$(".sec2_pop .tab3").removeClass("hide");
			//GA_008
		ga('send', 'event', '201609-accordsporthybrid', 'Technology-I', 'IPU',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
		console.log(2,'IPU')
		//GA_008 end
	});
	$(".s2_pop_close").on("click", function() {
		$(".sec2_pop").addClass("hide");
		$(".fullpage-wrapper").removeClass("hide");
		$("#menu").removeClass("hide");
		$('.sec2_pop .pop_tab').animate({right: '-45%'},400);
		$('.s2_pop_tit').animate({left: '-28%'},400);
	});
}

/*第二页的第二个页面 pop*/
module.sec2_2Pop = function(section) {
	$(".tab li").click(function(){
        $(".tab li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
		$(".c_d").hide().eq($(this).index()).show();
       //另一种方法: $("div").eq($(".tab li").index(this)).addClass("on").siblings().removeClass('on'); 
       var GA_0010_id=$(this).index();
       if(GA_0010_id==0){
       		ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'EVmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
       }else if (GA_0010_id==1) {
       		ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'Hybridmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
       }else{
       		ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'Enginemod',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
       }
    });
}

/*第二页的第二个页面 pop*/
module.sec_munu = function(section) {
	$("#menu li").on("click", function() {
		$(".pop_swiper").addClass("hide");
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
					html1 = "<i class='dot" + j + " dot'><img src='img/dot.png' class='dotPic'/><img src='img/bg_ly.png' class='quan'/><ul class='dot_text css3Menu hide'><em></em>";
					
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
/*点点移入*/
module.dot = function() {
	$(document).on("mouseover", ".dot", function() {
		var $this = $(this);
		$this.addClass("active").siblings().removeClass("active");
		$this.find(".dot_text").show(300).removeClass("hide");
		$this.find(".dot_text li").show(300).removeClass("hide");
		$this.siblings().find(".dot_text").hide(100).addClass("hide").css("z-index");
		$this.siblings().find(".dot_text li").hide(100).addClass("hide").css("z-index");

		$this.find(".quan").addClass("hide");
		$this.siblings().find(".quan").removeClass("hide")
	})
}
module.JSswiper = function(src) {
	html = "<div class='swiper-slide'><img src='img/" + src + ".jpg' class='percentW'/></div>";
	$("#swiper-wrapper").append(html);

}
var GA_section="";//用于判断是车型外观还是车型内饰
/*点击点点*/
module.dot_textClick = function() {
	$(document).on("click", ".dotPic", function(e) {

		var index, src = "",
			$src = [],
			$this = $(this),
			$section, $dotIndex;
		var hmlBig = "<div class='swiper-container' id='swiper-container'><div class='swiper-wrapper' id='swiper-wrapper'></div></div><a class='arrow-left css3Menu' href='#'></a><a class='arrow-right css3Menu' href='#'></a>"

		$section = $this.closest(".section_dotWrap").attr("data-s");
		GA_section=$section;

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
	var mySwiper = new Swiper('#swiper-container', {
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
		},
		onSlideChangeStart:function(){
			GA_14_16(mySwiper)
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

GA_14_16(mySwiper)

//GA_014,GA_016 函数
function GA_14_16(mySwiper){
	// 获取当前活动页
	var slide =mySwiper.activeIndex;
	if(GA_section=="s3"){
		if(Math.abs(slide)==4){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'SharkFin',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		}else if(Math.abs(slide)==0){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'HybridIcon',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		}else if(Math.abs(slide)==1){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'WingHeadlight',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		}else if(Math.abs(slide)==3){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'PlumpFence',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		}else if(Math.abs(slide)==6){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'StrengthRim',     {'dimension3': 'accord-sporthybrid', 'metric2': 1});
		}
		console.log("车型外观")
	}else if(GA_section=="s4"){
		if(Math.abs(slide)==4){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'Purifier',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		}else if(Math.abs(slide)==1){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'Dashboard',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		}else if(Math.abs(slide)==3){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'DecelerationSelector',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		}else if(Math.abs(slide)==2){
			ga('send', 'event', '201609-accordsporthybrid', 'Exterior', 'SBWShift',     {'dimension3': 'accord-sporthybrid', 'metric1': 1});
		}
		console.log("车型内饰")
	}
}


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
var GA_006_name="";
//GA_006_name 用来记录当前播放的视频名称
module.pop_close = function() {
	
	$(".pop_close").on("click", function() {
		var $this = $(this);
		$this.parent().addClass("hide");
		var video=document.getElementById('video_player')
		var videoTime=video.currentTime;
	    console.log(videoTime)
	//GA_006
	
	ga('send', 'event', '201609-accordsporthybrid', 'Index', 'video-'+GA_006_name, videoTime); 
	//GA_006 end

		if($this.siblings("#play_box").length) {
			$("#play_box video").get(0).pause()
		}
		$("#fullpage1").fullpage.setAllowScrolling(true);

	//关闭后清空 GA_006_name  的值
	GA_006_name=""
	})
}

module.select = function() {
	$(".video_k").on("click", function() {
		var $this = $(this).find(".selectList");
		$this.is(":hidden") ? $this.show() : $this.hide().addClass("video_option_hide");
		$(".video_option_hide").hide();
		$this.removeClass("video_option_hide");
		$(this).addClass("active");
	})

	$(document).on("click", ".selectList p", function() {
		var $this = $(this);
		/*$this.addClass("active").siblings(".video_option_p").removeClass("active");*/
		var value = $this.attr("value");
		/*$this.closest(".video_k").find(".video_k_top").text($this.text());*/
		$this.parent().siblings("select").find("option").each(function() {

			if(value == $(this).attr("value")) {
				$(this).attr("selected", "").siblings().removeAttr("selected");
				return false;
			}

		})
		$this.closest(".video_k").find(".video_k_top").text($this.parent().siblings("select").find("option:selected").text());
		$this.parent().siblings("select").trigger("change");
	})

	$(document).on("click", function(e) {
		var targetObj = $(e.target);

		var xx = targetObj.closest(".video_k");

		if(xx.length == 0) {
			$(".selectList").hide();
		}

	});
}

/*媒体声音 [[*/
var main_a_arr=["http://drive.xcar.com.cn/201609/news_1952425_1.html ",
"http://news.bitauto.com/drive/20160913/2306636498.html",
"http://www.autohome.com.cn/drive/201609/893046.html",
"http://www.pcauto.com.cn/pingce/875/8751433.html"]
var main_title_arr=["好饭不怕晚 本田新雅阁 锐·混动试驾体验","1.5L的油耗 3.0L的动力 试驾新雅阁 锐·混动","混动也玩性能 试驾广汽本田新雅阁 锐·混动","试驾广汽本田新雅阁 锐·混动 要熊掌亦要鱼"];
var main_titf_arr=["昨天我们为您带来了雅阁锐·混动在设计与配置上的变化，今天我们将与您分享新车在动力操控方面的特点。",
"如果提起最能展现Sport与Hybrid结合的车型，那必然是今年刚刚推出的混动超跑——讴歌NSX",
"混合动力车型的价格跨度现在越来越大，入门级别的混动车型十几万就可以买，而高端混动普通人肯定消费不起。",
"两全其美是人之所求，无奈现实中却缺受到种种制肘而难以实现，即使汽车中的豪华品牌也需要权衡操控与舒适，取舍油耗与性能。"];
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
        autoplay : 4000,//可选选项，自动滑动
		loop : true,//可选选项，开启循环
		onSlideChangeStart: function(){
			// console.log(1);
			updateNavVoice(swiper2.activeIndex -1);
		},
		onSlideChangeEnd:function(){
		// 	var targetURL = window.location.toString();
		// 	var targetPage = targetURL.substring(targetURL.indexOf("#")+1);
		// 	if(targetPage!="page6"){
		// 		return;
		// 	}
		// 	if(swiper2.activeIndex==1 || swiper2.activeIndex==5){
		// 		ga('send', 'event', '201609-accordsporthybrid', 'Media', 'Article-1',     {'dimension3': 'accord-sporthybrid', 'metric7': 1}); 
		// 		console.log(swiper2.activeIndex,"1")
		// 	}else if(swiper2.activeIndex==2){
		// 		ga('send', 'event', '201609-accordsporthybrid', 'Media', 'Article-2',     {'dimension3': 'accord-sporthybrid', 'metric7': 1}); 
		// 		console.log(swiper2.activeIndex,"2")
		// 	}else if(swiper2.activeIndex==3){
		// 		ga('send', 'event', '201609-accordsporthybrid', 'Media', 'Article-3',     {'dimension3': 'accord-sporthybrid', 'metric7': 1}); 
		// 		console.log(swiper2.activeIndex,"3")
		// 	}else if(swiper2.activeIndex==4 || swiper2.activeIndex==0){
		// 		ga('send', 'event', '201609-accordsporthybrid', 'Media', 'Article-4',     {'dimension3': 'accord-sporthybrid', 'metric7': 1}); 
		// 		console.log(swiper2.activeIndex,"4")
		// 	}
		}
	});
	
	$(".section6 .swiper-prev").on('click', function(e) {
		e.preventDefault();
		swiper2.swipePrev();
	})
	$(".section6 .swiper-next").on('click', function(e) {
		e.preventDefault()
		swiper2.swipeNext()
	})
	function updateNavVoice(currentIndex){
		// 主标题
		// var currentIndex=(swiper2.activeIndex - 2);
		if (currentIndex>3){
			currentIndex = 0;
		}else if(currentIndex <0){
			currentIndex = 3;
		}
		$main_title.text(main_title_arr[currentIndex]);	
		$main_titf.text(main_titf_arr[currentIndex]);
		$main_a.text(maina_arr[currentIndex])
					 .attr('href',''+main_a_arr[currentIndex]+'')
					 .attr('data',currentIndex)
					 .attr('onclick',"javascript:ga('send', 'event', '201609-accordsporthybrid', 'Media', 'Article-"+(currentIndex+1)+"'"+",     {'dimension3': 'accord-sporthybrid', 'metric7': 1}); ");
	}
//hxm end
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

/** 留资提示 **/
module.input_placeholder = function() {
	$('.txtName').val("你的真实姓名");
	$('.txtMobile').val("你的手机号码");
	$('.txtArea').val("区号");
	$('.txtPhone').val("座机号码");
	$('.txtSubPhone').val("分机号");
	$('input').on('click', function() {
		$(this).val("");
	})
	$('input').on('blur', function() {
		if($(this).val() == "") {
			$(this).val($(this).attr('name'));
		}
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
//视频弹层
module.playVideo = function(videoData, videoHeight) {
	var playerSwf = "js/ckplayer/ckplayer.swf";
	var containerId = "play_box";
	var flashvars = {
		f: videoData.flashaddr, //使用flash播放器时视频地址的
		c: 0, //风格配置参数
		p: 1 //1默认播放0暂停
			//i: preImg,//预览图
	};
	var params = {
		bgcolor: '#FFF',
		allowFullScreen: true,
		allowScriptAccess: 'always',
		wmode: 'transparent'
	};
	var html5video = [];
	html5video.push(videoData.html5addr);
	CKobject.embed(playerSwf, containerId, 'video_player', '100%', videoHeight, true, flashvars, html5video, params);
	// function loadedHandler(){
	//     if(CKobject.getObjectById('video_player').getType()){
	//       CKobject.getObjectById('video_player').addListener('time',timeHandler);
	//     }
	//     else{
	//       CKobject.getObjectById('video_player').addListener('time','timeHandler');
	//     }
	//   }
	//   function timeHandler(t){
	//     if(t>-1){
	//        console.log('当前video_player播放的时间点是(此值精确到小数点后三位，即毫秒)：'+t)
	//     }
	//   }
}

module.pop_video = function() {
	$(".pop_videoIcon1").on("click", function() {
		$(".pop_video").removeClass("hide");
//GA_005
		GA_006_name="全新TVC";
		ga('send', 'event', '201609-accordsporthybrid', 'Index', 'video-全新TVC',     {nonInteraction: false});
//GA_005 end
		var videoData = {
			flashaddr: "",
			html5addr: "video/" + $(this).attr("data-s") + ".mp4->video/mp4"
		};
		var videoHeight = $(".pop_video").height();
		module.playVideo(videoData, videoHeight);
		$("#fullpage1").fullpage.setAllowScrolling(false);
	});
	$(".pop_videoIcon2").on("click", function() {
		$(".pop_video").removeClass("hide");
//GA_005
		GA_006_name="上市发布会";
		ga('send', 'event', '201609-accordsporthybrid', 'Index', 'video-上市发布会',     {nonInteraction: false});
//GA_005 end
		var videoData = {
			flashaddr: "",
			html5addr: "video/" + $(this).attr("data-s") + ".mp4->video/mp4"
		};
		var videoHeight = $(".pop_video").height();
		module.playVideo(videoData, videoHeight);
		$("#fullpage1").fullpage.setAllowScrolling(false);
	})
}

$(function() {
	module.loading();
	module.fullpage();
	/*module.menuHover();*/
	module.swiperVoice();
	module.sec2Pop();
	module.sec2_2Pop();
	module.sec_munu();
	module.dot();
	module.pop_video();
	module.select();
	module.sec5Pop();
	module.pop_close();
	module.swiperClose();
	module.dot_textClick();
})


//input 获取焦点时间
$(document).ready(function(){
	//姓名 文本框
  $("#txtName").focus(function(){
  	 ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page7-2', 'title': '试驾留资',      'dimension3': 'accord-sporthybrid', 'metric8': 1}); 
  });
 //手机号v文本框
   $("#txtMobile").focus(function(){
  	 ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page7-3', 'title': '试驾留资',      'dimension3': 'accord-sporthybrid', 'metric8': 1}); 
  });
   //电话号码 区号文本框
   $("#txtPhone").focus(function(){
  	 ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page7-3', 'title': '试驾留资',      'dimension3': 'accord-sporthybrid', 'metric8': 1}); 
  });
//城市 下拉框
   $("#optProvince").change(function(){
		ga('send', 'pageview',    {'page': '/Layouts/Activity/2016/09/accord-sporthybrid/page7-4', 'title': '试驾留资',      'dimension3': 'accord-sporthybrid', 'metric8': 1}); 
   })

   $(window).bind("scroll", function(){ 
		var sTop = document.body.scrollTop || document.documentElement.scrollTop;
		console.log(sTop,$(".section2_2").offset().top)
    	if($(".section2_2").offset().top==sTop){
	    	ga('send', 'event', '201609-accordsporthybrid', 'Techology-II', 'EVmode',     {'dimension3': 'accord-sporthybrid', 'metric4': 1});
	    	console.log("section2_2")
	    }
		}); 
});

