//排行榜
//开启计时器
setInterval(function(){
	getColumn();
},5000)
setInterval(function(){
	getBarrage();
},15000)
//排行榜网络请求
function getColumn(){
	$.ajax({
		url: "/horseracing/product/queryProductsAndScore.action",
		timeout: 30000,
		data: "",
		type: 'POST',
		async: true,
		cache: false,
		dataType: 'JSON',
		success: function(data, textStatus) {
			setColumn(data.data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//请求失败再次请求
//			getColumn();
		}
	});
}
//排行榜设置数据
function setColumn(data){
	$('.column').remove();
	for (var i = 0; i <data.REC.length; i++) {
        var oli=$('<li class="column"><span class="order">'+data.REC[i].ranking+'<div class="column_img"></div></span>'+
        		'<span class="name">'+data.REC[i].productName+'</span>'+
        		'<span class="num">'+data.REC[i].score+'</span>'+
        		'<div class="column_bg"></div><div class="column_line"></div></li>');		
        $('.column_ul').append(oli);
        //前三个设置图片
        if(data.REC[i].ranking==1){
        	$(".column_ul").children(".column").eq(i).find(".column_img").css({"background":"url(img/first.png)","background-size": "100% 100%"});
        }else if(data.REC[i].ranking==2){
        	$(".column_ul").children(".column").eq(i).find(".column_img").css({"background":"url(img/second.png)","background-size": "100% 100%"});
        }else if(data.REC[i].ranking==3){
        	$(".column_ul").children(".column").eq(i).find(".column_img").css({"background":"url(img/third.png)","background-size": "100% 100%"});
        }
        //设置背景宽度
        $(".column_ul").children(".column").eq(i).find(".column_bg").css({"width":data.REC[i].score/data.REC[0].score*583+"px"});
    };
}
//弹幕
(function(){
	$("#danmu").danmu({
		left:"840px",
		top:"590px",
		height:"430px",
		width:"1000px",
	    speed:25000,
	    opacity:1,
	    font_size_small:30,
	    font_size_big:30,
	    top_botton_danmu_time:6000
	}
  );
})(jQuery);
$('#danmu').danmu('danmu_start'); 


getBarrage();
//请求弹幕数据
function getBarrage(){
	  $.ajax({
        url:"/horseracing/comment/queryCommentsByTime.action",
        data: {
        	data: "{seconds:10000}"
        },
        type: 'POST',
		async: true,
		cache: false,
        timeout:"30000",
        dataType:'json',
        success:function (data){
        	var aa=JSON.stringify(data.data)
        	console.log(aa)
        	setBarrage(data.data);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown){
        }
    });
}
//生成随机时间
function suiji(){
	var tim=Math.floor(Math.random()*150);
	return tim;
}
//显示弹幕
function setBarrage(data){
	for (var i = 0; i < data.REC.length; i++) {
  		var time = $('#danmu').data("nowtime")+suiji();
  		console.log($('#danmu').data("nowtime"))
		a_danmu={ "text":data.REC[i].productName +"："+data.REC[i].commentContent, "color":"#7A2F11" ,"size":"30px","position":"0","time":time};
		$('#danmu').danmu("add_danmu",a_danmu);
    }
}