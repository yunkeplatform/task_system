/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/17.
 */
require(['config'], function (){
    require(['app','zepto','app/untils'],function (app,$,untils) {
        // 先判断是否登录
        // 否，进入登录界面
        // window.onload = function () {
        //     // 此处判断是否登录
        //     untils.checkLogin(window.location.href);
        // };
        // 既要获取任务的详细信息，
        // 也要获取当前用户对此任务的申请状态
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $http({
                method: 'GET',
                url: './js/json/data.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.task = response.data.tasks[untils.GetUrlParam('id')-1];
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'],function () {
                    $.alert('Sorry,加载失败了','请重试或者待会再试');
                });
            });
            require(['sm'],function () {
                $.init();
                console.log('========');
                // $('.nav-back').on('click',function () {
                //     window.history.back();
                // });
                $('.task-apply').on('click',function () {
                    // 点击申请任务
                   $('.task-applyed').show();
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
                        $.alert('Sorry,加载失败了','请重试或者待会再试');
                    });
                    // 加载完毕需要重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                });
            });

        }])

    });
});