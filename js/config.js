/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/14.
 */
// 简单的配置
define(function () {
    require.config({
        // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
        baseUrl: "js/",
        paths: {
            "jquery": ["lib/jquery/dist/jquery.min"],
            "zepto": ["lib/zepto/zepto.min"],
            "frozen": ['lib/frozenui/dist/js/frozen'],
            "sm":["//g.alicdn.com/msui/sm/0.6.2/js/sm.min"],
            "angular" : ["lib/angular/angular.min"],
            "angular-route" : ["lib/angular-route/angular-route.min"],
            "angular-sanitize" : ["lib/angular-sanitize/angular-sanitize.min"]
        },
        // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
        shim: {
            'zepto': {
                exports: 'zepto'
            },
            'frozen': {
                deps: ['zepto'] //依赖组件
            },
            'sm':{
              deps:['zepto']
            },
            'angular': {
                exports: 'angular'
            },
            'angular-route':{
                deps: ["angular"],
                exports: 'angular-route'
            },
            'angular-sanitize':{
                deps: ["angular"],
                exports: 'angular-sanitize'
            }
        }
    });
});