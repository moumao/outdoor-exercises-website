;(function ($) {
    var Carousel=function (poster) {
        var self=this;

        var browser_width = $(document.body).width();
        this.poster=poster;
        this.posterItemMain=poster.find("ul.poster-list");
        this.prevBtn=poster.find("div.poster-prev-btn");
        this.nextBtn=poster.find("div.poster-next-btn");
        this.posterItems=poster.find("li.poster-item");
        this.posterFirstItem=this.posterItems.eq(0);
        this.posterLastItem=this.posterItems.last();
        this.rotateFlag=true;
      //  this.posterFirstItemmessage=this.posterFirstItem.find(".news-message");


        //配置参数
        this.setting={
            "width":browser_width,
            "height":270,
            "posterWidth":640,
            "posterHeight":270,
            "scale":0.8,
            "verticalAlign":"middle",
            "speed":300,
            "autoPlay":false,
            "delay":2000,
        }

        //获取人工配制参数用extend方法追加
        $.extend(this.setting,this.getSetting());

        this.setSettingValue();
        this.setPosterPos();

        //右按钮，判断rotateFlag防止bug
        this.nextBtn.click(function () {
            if (self.rotateFlag===true){
                self.carouseRotate("right");
                self.rotateFlag=false;
            }

        });
        //左按钮，判断rotateFlag防止bug
        this.prevBtn.click(function () {
            if (self.rotateFlag===true){
                self.carouseRotate("left")
                self.rotateFlag=false;
            }
        });

        //是否自动旋转 鼠标经停停止setInterval
        if(this.setting.autoPlay){
            self.autoPlay();
            this.poster.hover(function(){
                window.clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });
        }

    };


    Carousel.prototype={
        //自动旋转
        autoPlay:function(){
            var self = this;
              this.timer = window.setInterval(function(){
                self.nextBtn.click();
            },this.setting.delay);

        },

        //旋转
        carouseRotate:function (dir) {
            var _this_=this;
            var zIndexArr=[];

            if(dir==="right"){

                    this.posterItems.each(function () {
                            var self=$(this),
                            prev=self.prev().get(0)?self.prev():_this_.posterLastItem,
                            width=prev.css("width"),
                            height=prev.css("height"),
                            zIndex=prev.css("zIndex"),
                            opacity=prev.css("opacity"),
                            left=prev.css("left"),
                            top=prev.css("top");
                        zIndexArr.push(zIndex);

                        self.animate({
                            width:width,
                            height:height,
                            opacity:opacity,
                            left:left,
                            top:top,
                            },function () {
                            _this_.rotateFlag=true;
                        });

                    });
                this.posterItems.each(function (i) {
                    var self=$(this);
                    self.css("zIndex",zIndexArr[i]);
                })

            }else if(dir==="left"){
                    this.posterItems.each(function () {
                        var self=$(this),
                            next=self.next().get(0)?self.next():_this_.posterFirstItem,
                            width=next.css("width"),
                            height=next.css("height"),
                            zIndex=next.css("zIndex"),
                            opacity=next.css("opacity"),
                            left=next.css("left"),
                            top=next.css("top");
                        zIndexArr.push(zIndex);

                        self.animate({
                            width:width,
                            height:height,
                            opacity:opacity,
                            left:left,
                            top:top
                        },function () {
                            _this_.rotateFlag=true;
                        });
                    });
                    this.posterItems.each(function (i) {
                        var self=$(this);
                        self.css("zIndex",zIndexArr[i]);
                    })

            }
        },


        //设置左右两侧的排列
        setPosterPos:function () {
            var self=this
            var sliceItems=this.posterItems.slice(1),
                sliceSize=sliceItems.length/2,
                rightSlice=sliceItems.slice(0,sliceSize),
                leftSlice=sliceItems.slice(sliceSize),
                level= Math.floor(this.posterItems.length/2);
            //设置右边帧的位置关系和宽度高度
            var rw=this.setting.posterWidth,
                rh=this.setting.posterHeight,
                gap=((this.setting.width-this.setting.posterWidth)/2)/level,
                firstLeft=(this.setting.width-this.setting.posterWidth)/2,
                fixOffsetLeft=firstLeft+rw;

            rightSlice.each(function (i) {
                rw=rw*self.setting.scale;
                rh=rh*self.setting.scale;
                level--;
                j=i;
                $(this).css({
                    width:rw,
                    height:rh,
                    zIndex: level,
                    opacity: 1/(++i),
                    top:(self.setting.height-rh)/2,
                    left:fixOffsetLeft+(++j)*gap-rw
                });
            });
            //设置左边的位置关系
            var lw = rightSlice.last().width(),
                lh  =rightSlice.last().height(),
                oloop = Math.floor(this.posterItems.length/2);
            leftSlice.each(function(i){
                $(this).css({
                    zIndex:i,
                    width:lw,
                    height:lh,
                    opacity:1/oloop,
                    left:i*gap,
                    top:(self.setting.height-lh)/2
                });
                lw = lw/self.setting.scale;
                lh = lh/self.setting.scale;
                oloop--;
            });

        },

        //控制宽度高度等值
        setSettingValue:function () {
            this.poster.css({
                width:this.setting.width,
                height:this.setting.height
            });
            this.posterItemMain.css({
                width:this.setting.width,
                height:this.setting.height
            });
            var w=(this.setting.width-this.setting.posterWidth)/2;

            this.nextBtn.css({
                width:w,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.length/2)
            });
            this.prevBtn.css({
                width:w,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.length/2)
            });

            this.posterFirstItem.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight,
                left:w,
                top:0,
                zIndex:Math.floor(this.posterItems.length/2),
            });

        },

        //获取配置参数
        getSetting:function () {
        var setting=this.poster.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }else{
                return {};
            };
         },


    };

    //初始化
    Carousel.in=function (posters) {
        var _this_=this;
        posters.each(function () {
            new _this_($(this))
        })
    };

    //传递出去
    window["Carousel"]=Carousel ;

})(jQuery);