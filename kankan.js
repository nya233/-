//搜索下拉栏
var trigger =$(".selector");
var list=$(".selector-ul");

trigger.click(function(){
	trigger.toggleClass("active");
	list.slideToggle(200);
});
//轮播图
$(function(){

	$(".scroll").each(function(){
		var container="#"+this.id;//ul外一层的容器的id值。
		carousel(container);
	});
    /*
	1.自动轮播setInterval，鼠标进入停止hover
	2.小图关联大图mouseover+index.获取小图index,大图显示对应index
    */
	function carousel(container){
		var screen=$(`${container} .screen`);//大图ul[用``是为了避免多重引号嵌套]
		var controls=$(`${container} .slider li`);//小图的li
		var len=controls.length;//小图的个数
		var index=0;//index从0开始
		var timer;//在外面声明一个Timer，是因为.hover里的两个function因为作用域的原因，不能相互访问对方内部的变量，于是需要有个最外层大家都能访问到的变量作为中介
		//hover
		$(container).hover(function(){
			clearTimer();
		},function(){
			setTimer();
		}).trigger("mouseleave");
		//自动轮播设置setTimer()里面放setInterval();
		function setTimer(){
			timer=setInterval(function(){ //这里赋值给timer是为了clearInterval也可以用。要注意下。
				index++;
				if(index >= len) index=0;
				showImg(index);
			},2000);
		}
		function clearTimer(){
			if(timer)clearInterval(timer);
		}
		//小图关联大图
		controls.mouseover(function(){
			index=controls.index(this);
			showImg(index);
		});
		function showImg(index){
			var addWidth=$(`${container} .screen li`).width();
			screen.stop(true,false).animate({marginLeft:-addWidth*index+"px"},2000);
			controls.removeClass("on").eq(index).addClass("on");
		}
	}
});
