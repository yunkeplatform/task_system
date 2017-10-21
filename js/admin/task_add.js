/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/10/21.
 */
require(['config'], function (){
    require(['app','jquery','app/untils'],function (app,$,until) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            // 判断是否登录，且角色是管理员
            var _id = parseInt(until.GetUrlParam('id'));
            $scope.pre_page = 10; //每页显示10条数据
            $scope.current_page = 1; //当前页码
            // 初始加载页面数据
            $http({
                method: 'GET',
                url: '../js/json/admin_tasks.json?id='+_id
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.tasks = response.data.tasks[_id];
                $scope.types = response.data.types;
                $scope.task_status = response.data.status;
                $scope.agent = response.data.agent;
                $scope.difficulty = response.data.difficulty;
                $scope.now = until.FormatTime(new Date());
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'], function () {
                    $.alert('Sorry,加载失败了', '请重试或者待会再试');
                });
            });
            $(document).ready(function () {
                require(['admin-lte'], function (lte) {
                    $('.sidebar-menu').tree()
                });
                $(function() {
                    $(".upload_img").on("change",function(){
                        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
                        if (objUrl) {
                            $(this).parent().parent().find('.pic-src').attr('src',objUrl);//将图片路径存入src中，显示出图片
                        }
                    });
                });
                //建立一個可存取到該file的url
                function getObjectURL(file) {
                    var url = null ;
                    if (window.createObjectURL!=undefined) { // basic
                        url = window.createObjectURL(file) ;
                    } else if (window.URL!=undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(file) ;
                    } else if (window.webkitURL!=undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(file) ;
                    }
                    return url ;
                }
            });
        }])
    });
});