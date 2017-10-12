/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/12.
 */
require(['config'], function (){
    require(['app','zepto','app/untils'],function (app,$,untils) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            // 判断是否登录，且角色是管理员
            $http({
                method: 'GET',
                url: '../js/json/admin.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.admin = response.data.admin;
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'],function () {
                    $.alert('Sorry,加载失败了','请重试或者待会再试');
                });
            });
            $('.meun-item').click(function(){
                if($(this).data('href')){
                    location.href= $(this).data('href');
                }
            });
        }])
    });
});