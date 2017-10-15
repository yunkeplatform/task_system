/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/15.
 */
require(['config'], function (){
    require(['app','zepto'],function (app,$) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $http({
                method: 'GET',
                url: './js/json/balance_lists.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.tasks = response.data.orders;
                $('#loading-block').hide();
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'],function () {
                    $.alert('Sorry,加载失败了','请重试或者待会再试');
                });
            });
            require(['sm'],function () {
                $.init();
                console.log('========');
                $('.nav-back').on('click',function () {
                    window.history.back();
                });
                // 下拉刷新
                $(document).on('refresh', '.pull-to-refresh-content',function(e) {
                    console.log('------------');
                    $http({
                        method: 'GET',
                        url: './js/json/balance_lists.json?status=finish'
                    }).then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.tasks = response.data.orders;
                        console.info('-----refresh--success');
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        require(['sm'],function () {
                            $.alert('Sorry,加载失败了','请重试或者待会再试');
                        });
                    });
                    // 加载完毕需要重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                });
            });

        }])

    });
});