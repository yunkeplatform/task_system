/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/20.
 */
require(['config'], function (){
    require(['app','zepto'],function (app,$) {
        app.controller('register_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            // 注册
            $scope.pass_message = '两次输入的密码不一致哦！';
            // 获取验证码函数
            $scope.getCaptcha = function () {
                var phone = $('input[name="phone"]').val();//手机号码
            };
            //提交表单信息
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
                $('input').change(function () {
                   if($(this).val().length>0){
                       $(this).css({"background-color":"#fff","border": "1px solid #e0e0e0"});
                       var p = $('input[name="password"]').val(),p1 = $('input[name="password1"]').val();
                       console.log(p,p1);
                       if(p != p1){
                           console.log('---no---');
                           $('.pass_check').show();
                       }else{
                           console.log('---yes---');
                           $('.pass_check').hide();
                       }
                   }else{
                       $(this).css({"background-color":"#e0e0e0"});
                   }
                });
            });
            require(['zepto','frozen'],function ($) {

            });
        }])

    });
});