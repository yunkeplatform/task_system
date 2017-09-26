/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/12.
 */
require(['config'], function (){
    require(['app','zepto'],function (app,$) {
        window.onload = function () {
            // 此处判断是否登录
            untils.checkLogin(window.location.href);
        };
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $http({
                method: 'GET',
                url: './js/json/data.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.tasks = response.data.tasks;
                $('#loading-block').hide();
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'],function () {
                    $.alert('Sorry,加载失败了','请重试或者待会再试');
                });
            });
            require(['sm'],function () {
                $.init();
                $('.nav-back').on('click',function () {
                    window.history.back();
                });
                // 下拉刷新
                $(document).on('refresh', '.pull-to-refresh-content',function(e) {
                    console.log('------------');
                    $http({
                        method: 'GET',
                        url: './js/data.json'
                    }).then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.tasks = response.data.tasks;
                        console.info('-----refresh--success');
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        require(['zepto','frozen'],function ($) {
                            var dia=$.dialog({
                                title:'温馨提示',
                                content:'信息加载失败，请下拉刷新',
                                button:["好的知道了"]
                            });
                        })
                    });
                    // 加载完毕需要重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                });
            });
            require(['zepto','frozen'],function ($) {
                $('#contact_me').on('click', function () {
                    $('#contact-dialog').dialog('show');
                });
                $('.close-con-dia').on('click',function () {
                    $('#contact-dialog').dialog('hide');
                })
            });
        }])

    });
});