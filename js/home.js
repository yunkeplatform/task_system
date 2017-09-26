/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/12.
 */
require(['config'], function (){
    require(['app','zepto','app/untils'],function (app,$,untils) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.preCount = 2;
            $scope.currentCount = 5;
            if(localStorage.getItem('home_data') && JSON.parse(localStorage.getItem('home_data')).length>1){
                $scope.tasks = JSON.parse(localStorage.getItem('home_data'));
                $('.ui-loading-block').hide();
            }else{
                $http({
                    method: 'GET',
                    url: './js/json/data.json'
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.tasks = response.data.tasks.slice(0,$scope.currentCount);
                    $scope.maxCount = response.data.tasks.length;
                    console.log( $scope.maxCount);
                    localStorage.setItem('home_data',JSON.stringify($scope.tasks));
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
                // 对跳转链接添加点击事件
                $('.task-item a').on('click',function () {
                    // 此处判断是否登录
                    untils.checkLogin($(this).attr('data-href'));
                });
                $('.bar-tab .tab-task').on('click',function () {
                    untils.checkLogin('task.html');
                });
                $('.bar-tab .tab-me').on('click',function () {
                    untils.checkLogin('me.html');
                });

                $('.buttons-tab').fixedTab({offset:44});
                // 无限滚动
                $(function() {
                    var loading = false;
                    $(document).on("pageInit",  function(e, id, page) {
                        var type = null;
                        var tabIndex = 0;
                        function addItems(type) {
                            loading = false;
                            // type 加载的任务类型
                            $http({
                                method: 'GET',
                                url: './js/json/data.json'
                                // url: './js/data.json？type='+type
                                // 获取不同类型（easy,n）
                            }).then(function successCallback(response) {
                                // 请求成功执行代码
                                $scope.tasks = response.data.tasks.slice(0,$scope.currentCount+$scope.preCount);
                                $scope.currentCount += $scope.preCount;
                                $scope.maxCount = response.data.tasks.length;
                                localStorage.setItem('home_data',JSON.stringify($scope.tasks));
                                if ($scope.currentCount >= $scope.maxCount) {
                                    $('.infinite-scroll-preloader').eq(tabIndex).hide();
                                }
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                $.alert('Sorry,加载失败了','请重试或者待会再试');
                            });
                        }
                        $(page).on('infinite', function() {
                            if (loading) return;
                            loading = true;
                            type = $(this).find('.infinite-scroll.active').attr('id');
                            switch(type){
                                case 'easy':
                                    tabIndex = 0;
                                    break;
                                case 'normal':
                                    tabIndex = 1;
                                    break;
                                case 'hard':
                                    tabIndex = 2;
                                    break;
                                default:
                                    tabIndex = 0;
                            }
                            if ($scope.currentCount >= $scope.maxCount) {
                                $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                                $('.infinite-scroll-preloader').eq(tabIndex).hide();
                                return;
                            }
                            addItems(type);
                            $.refreshScroller();
                        });
                    });
                    $.init();
                });
                // 下拉刷新
                $(document).on('refresh', '.pull-to-refresh-content',function(e) {
                    $('.ui-loading-block').show();
                    $('.pull-to-refresh-layer').show();
                    // type
                    $http({
                        method: 'GET',
                        url: './js/json/data.json'
                    }).then(function successCallback(response) {
                        // 请求成功执行代码
                        console.log('---refresh ---success');
                        $scope.tasks = response.data.tasks.slice(0,$scope.currentCount);
                        localStorage.setItem('home_data',JSON.stringify($scope.tasks));
                        $('.pull-to-refresh-layer').hide();
                        $('.ui-loading-block').hide();
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