/**
 * Created by WCY on 2016/11/22.
 */

$(document).ready(function () {


    //回到顶部
    $("#top-button").click(function () {
        $('html,body').animate({
            scrollTop:$($.attr(this,'href')).offset().top
        },500);
        return false;
    });


    //判断新闻轮播图iIndex值显示文字内容
    window.setInterval(function () {
        $(".poster-item").each(function () {
            var self=$(this);
            if (self.css('z-index')==4){
                self.find(".news-message").css("display","block");
            }else {
                self.find(".news-message").css("display","none");
            }
        });
    },1);

    //动态获取商品板块高度
    var height=$(".shop-box-pic").width();
    $("#shop-s-box").css("height",height*2);
    $(".shop-box-pic").css("height",height);

    $(window).resize(function() {
        var height=$(".shop-box-pic").width();
        $("#shop-s-box").css("height",height*2);
        $(".shop-box-pic").css("height",height);
    });
    var height=$(window).height();

    //设置top位置
    $(".top").css({
        top:height-90,
    });

    //鼠标滚轮滚动时触发
    $(window).scroll(function () {
        //设置top的显示和隐藏
        if ($(window).scrollTop()>=($(window).height())+80){
            $(".top").fadeIn(1000);
        }else if ($(window).scrollTop()<($(window).height())+80){
            $(".top").fadeOut(1000);
        }
    });
});
;(function ($) {
    $.fn.loadings = function() {
        setTimeout(function(){
            var loader = document.getElementsByClassName("loader")[0];
            loader.className="loader fadeout" ;//使用渐隐的方法淡出loading page
            $("#header").css({
                position:"fixed"
            });
            setTimeout(function(){
                loader.style.display="none"
            },1000)
        },1000);//强制显示loading page 1s
    }
})(jQuery);
