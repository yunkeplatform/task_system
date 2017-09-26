/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/20.
 */
require(['config'], function (){
    require(['app','zepto'],function (app,$) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            // 重置密码
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
            });
            require(['zepto','frozen'],function ($) {

            });
        }])

    });
});