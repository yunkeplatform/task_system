/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/17.
 */
require(['config'], function (){
    require(['zepto','sm'],function () {
        $.init();
        $('.nav-back').on('click',function () {
            window.history.back()
        })
    })
});