$(function(){
    var menu={
        init:function(){
            this.views={};
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

                var src=$(this).attr('dataSrc');
                if(!self.views[src]){
                   self.ajaxRequest(src);
                }else{
                    $('#content .text').html(self.views[src]);
                }
               
                
            })
        },
        ajaxRequest:function(src){
            var self=this;
            $.ajax({ 
                type: "get",
                url:"views/"+src+".html",
                dataType:'html',
                success : function(result) {
                    self.views[src]=result;
                    $('#content .text').html(self.views[src]);
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