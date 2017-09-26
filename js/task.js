/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/15.
 */
require(['config'], function (){
    require(['app','zepto','app/untils'],function (app,$,untils) {
        // window.onload = function () {
        //     // 此处判断是否登录
        //     untils.checkLogin(window.location.href);
        // };
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.preCount = 2;
            $scope.currentCount = 5;
            if(localStorage.getItem('task_data') && JSON.parse(localStorage.getItem('task_data')).length>1){
                $scope.tasks = JSON.parse(localStorage.getItem('task_data'));
                $scope.currentCount = JSON.parse(localStorage.getItem('task_data')).length;
                $('.ui-loading-block').hide();
            }else{
                $http({
                    method: 'GET',
                    url: './js/json/task.json'
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.tasks = response.data.tasks.slice(0,$scope.currentCount);
                    $scope.maxCount = response.data.tasks.length;
                    console.log( $scope.maxCount);
                    localStorage.setItem('task_data',JSON.stringify($scope.tasks));
                    $('.ui-loading-block').hide();
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    require(['sm'],function () {
                        $.alert('Sorry,加载失败了','请重试或者待会再试');
                    });
                });
            }
            require(['sm'],function () {
                $.init();
                // 无限滚动
                $(function() {
                    var loading = false;
                    $(document).on('infinite', '.infinite-scroll-bottom',function() {
                        console.log('current----'+$scope.currentCount);
                        console.log('---scroll----');
                        // 如果正在加载，则退出
                        if (loading|| $scope.currentCount >= $scope.maxCount) return;
                        loading = true;
                        function addItems() {
                            // 重置加载flag
                            loading = false;
                            $http({
                                method: 'GET',
                                url: './js/json/task.json'
                                // 获取不同类型（easy,n）
                            }).then(function successCallback(response) {
                                // 请求成功执行代码
                                $scope.tasks = response.data.tasks.slice(0,$scope.currentCount+$scope.preCount);
                                $scope.currentCount += $scope.preCount;
                                $scope.maxCount = response.data.tasks.length;
                                localStorage.setItem('task_data',JSON.stringify($scope.tasks));
                                if ($scope.currentCount >= $scope.maxCount) {
                                    $('.infinite-scroll-preloader').hide();
                                }
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                $.alert('Sorry,加载失败了','请重试或者待会再试');
                            });
                        }
                        if ($scope.currentCount >= $scope.maxCount) {
                            $.detachInfiniteScroll($('.infinite-scroll'));
                            // 删除加载提示符
                            $('.infinite-scroll-preloader').hide();
                            return;
                        }
                        addItems();
                        $.refreshScroller();
                    });
                    $.init();
                });
                // 下拉刷新
                $(document).on('refresh', '.pull-to-refresh-content',function(e) {
                    console.log('------------');
                    $http({
                        method: 'GET',
                        url: './js/json/task.json'
                    }).then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.tasks = response.data.tasks.slice(0,$scope.currentCount);
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