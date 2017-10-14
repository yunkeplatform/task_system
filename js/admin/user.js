/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/10/14.
 */
require(['config'], function (){
    require(['app','zepto','app/untils'],function (app,$,untils) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            // 判断是否登录，且角色是管理员
            $scope.pre_page = 10; //每页显示10条数据
            $scope.current_page = 1; //当前页码
            $http({
                method: 'GET',
                url: '../js/json/users.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.users = response.data.users;
                $scope.total_page = response.data.total_page; // 总页数
                $scope.agents = response.data.agents;
                $scope.user_status = response.data.user_status;
                RenderPageSelect(response.data.total_page);
                if($scope.total_page == 1){
                    $('.pre-page').addClass('disabled');
                    $('.next-page').addClass('disabled');
                }else{
                    $('.pre-page').addClass('disabled');
                }
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
            // 上一页
            $('.pre-page').on('click',function () {
               var _page = $scope.current_page;
                console.log('currentPage:----'+$(this).val());
                $scope.current_page = _page-1;
                getCurrentPageData($scope.current_page);
            });
            // 下一页
            $('.next-page').on('click',function () {
                var _page = $scope.current_page;
                if(_page<$scope.total_page){
                    console.log('currentPage:----'+$(this).val());
                    $scope.current_page = _page+1;
                    getCurrentPageData($scope.current_page);
                }
            });
            // 监控分页select的变化
            $('#pagination-select').on('change',function () {
                var _page = $(this).val();
                console.log('currentPage:----'+_page);
                $scope.current_page = _page;
                getCurrentPageData(_page,$scope.agent,$scope.status);
            });
            // 监控所属商户select
            $('#agent').on('change',function () {
                var _agent = $(this).val();
                $scope.agent = _agent;
                console.log(_agent);
                getCurrentPageData(1,$scope.agent,$scope.status);
            });
            // 监控用户状态select
            $('#status').on('change',function () {
                var _status = $(this).val();
                $scope.status = _status;
                console.log(_status);
                getCurrentPageData(1,$scope.agent,$scope.status);
            });
            // 点击查询
            $('.btn-search').on('click',function () {
               var user_id = $.trim($('#user_id').val());
               var user_phone = $.trim($('#user_phone').val());
                var _url = '../js/json/users.json?'+'user_id='+user_id+'&user_phone='+user_phone;
                console.log(_url);
                $http({
                    method: 'GET',
                    url:_url
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.users = response.data.users;
                    $scope.total_page = 1; // 总页数
                    $scope.current_page = 1;
                    RenderPageSelect(response.data.total_page);
                    console.log($scope.current_page);
                    preNextRender($scope.current_page);
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    require(['sm'],function () {
                        $.alert('Sorry,加载失败了','请重试或者待会再试');
                    });
                });
            });
            // 判断上一页和下一页是否可点击
            function preNextRender(_page) {
                if(_page > 1){
                    if(_page == 2){
                        $('.pre-page').removeClass('disabled');
                        if(!$('.next-page').hasClass('disabled')) {
                            $('.next-page').addClass('disabled');
                        }
                    }else{
                        $('.pre-page').removeClass('disabled');
                        $('.next-page').removeClass('disabled');
                    }
                }else if(_page ==1){
                    if(!$('.pre-page').hasClass('disabled')) {
                        $('.pre-page').addClass('disabled');
                    }
                    if($scope.total_page>1){
                        $('.next-page').removeClass('disabled');
                    }
                }
            }
            // 获取当前页码的数据
            function getCurrentPageData(page,agent,status) {
                var _url = '../js/json/users.json?'+'page='+page+'&agent='+agent+'&status='+status;
                console.log(_url);
                $http({
                    method: 'GET',
                    url:_url
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.users = response.data.users;
                    $scope.total_page = response.data.total_page; // 总页数
                    $scope.current_page = page;
                    RenderPageSelect(response.data.total_page);
                    console.log($scope.current_page);
                    preNextRender($scope.current_page);
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    require(['sm'],function () {
                        $.alert('Sorry,加载失败了','请重试或者待会再试');
                    });
                });
            }
            // 渲染分页select
            function RenderPageSelect(total) {
                var select = $('#pagination-select');
                var options = "";
                if(total && total>0){
                    for(var i=0;i<total;i++){
                        var _page = i+1;
                        options += "<option value="+_page+" data-page="+_page+" >"+_page+"</option>";
                    }
                    $(select).html(options);
                    $(select).val($scope.current_page);
                }
            }
        }])
    });
});