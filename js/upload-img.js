/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/19.
 */
require(['config'], function (){
    require(['app','zepto','app/untils'],function (app,$,untils) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $scope.task_id = untils.GetUrlParam('id');
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
                $('.nav-back').on('click',function () {
                    window.history.back();
                });
            });

        }])

    });
});