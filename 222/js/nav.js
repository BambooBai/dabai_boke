$(function(){
    var menu={
        init:function(){
            this.views={};
            this.defaultShowItem();
            this.navOne();
            this.navTwo();
            this.mini();
        },
        navOne:function(){
            // nav收缩展开
            $('.nav-item>a').on('click',function(){
                if (!$('.nav').hasClass('nav-mini')) {
                    if ($(this).next().css('display') == "none") {
                        //展开未展开
                        $('.nav-item').children('ul').slideUp(300);
                        $(this).next('ul').slideDown(300);
                        $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
                    }else{
                        //收缩已展开
                        $(this).next('ul').slideUp(300);
                        $('.nav-item.nav-show').removeClass('nav-show');
                    }
                }
            });
        },
        mini:function(){
            //nav-mini切换
            $('#mini').on('click',function(){
                if (!$('.nav').hasClass('nav-mini')) {
                    $('.nav-item.nav-show').removeClass('nav-show');
                    $('.nav-item').children('ul').removeAttr('style');
                    $('.nav').addClass('nav-mini');
                }else{
                    $('.nav').removeClass('nav-mini');
                }
            });
        },
        navTwo:function(){
            var self=this;
            $('.nav-item ul li a').on('click',function(e){
                $('.nav-item ul li').removeClass('active');
                $(this).parent('li').addClass('active');
                $('#content .text').css('display','none');

                var src=$(this).attr('dataSrc');
                if(!self.views[src]){
                   self.ajaxRequest(src);
                }else{
                    $('#content .text').html(self.views[src]).fadeIn();
                }
                localStorage.setItem('defaultItem',JSON.stringify({navShow:$(this).parents('.nav-item').index(),active:$(this).parent().index()}));
            })
        },
        defaultShowItem:function(){
            var item=localStorage.getItem('defaultItem');
            var curItem='';
            if(!item){
                localStorage.setItem('defaultItem',JSON.stringify({navShow:6,active:0}));
                curItem=$('.nav>ul>li').eq(6).addClass('nav-show').find('li:first-child');
            }else{
                parseItem=JSON.parse(item);
                curItem=$('.nav>ul>li').eq(parseItem.navShow).addClass('nav-show').find('li').eq(parseItem.active);
            }
            curItem.addClass('active');
            this.ajaxRequest(curItem.find('a').attr('dataSrc'));
        },
        ajaxRequest:function(src){
            var self=this;
            $.ajax({ 
                type: "get",
                url:"views/"+src+".html",
                dataType:'html',
                success : function(result) {
                    self.views[src]=result;
                    $('#content .text').html(self.views[src]).fadeIn();
                },
                //请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        }
    };
    menu.init();
});