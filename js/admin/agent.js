/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/10/22.
 */
require(['config'], function (){
    require(['app','jquery'],function (app,$) {
        app.controller('home_Ctrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            // 判断是否登录，且角色是管理员
            $scope.pre_page = 10; //每页显示10条数据
            $scope.current_page = 1; //当前页码
            // 初始加载页面数据
            $http({
                method: 'GET',
                url: '../js/json/admin_tasks.json'
            }).then(function successCallback(response) {
                // 请求成功执行代码
                $scope.tasks = response.data.tasks;
                $scope.total_page = response.data.total_page; // 总页数
                $scope.types = response.data.types;
                $scope.task_status = response.data.status;
                RenderPageSelect(response.data.total_page);
                preNextRender(1);
            }, function errorCallback(response) {
                // 请求失败执行代码
                require(['sm'],function () {
                    $.alert('Sorry,加载失败了','请重试或者待会再试');
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
            function getCurrentPageData(page) {
                var _params = {
                    "type":null,
                    "status":null
                };
                var _url = '../js/json/admin_tasks.json';
                if($scope.type && $scope.type !=undefined){
                    _params.type = $scope.type
                }
                if($scope.status && $scope.status !=undefined){
                    _params.status = $scope.status
                }
                console.log(_url);
                $http({
                    method: 'GET',
                    url:_url,
                    params:_params
                }).then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.tasks = response.data.tasks;
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
            $(document).ready(function () {
                require(['admin-lte','bootstrap'],function (lte) {
                    $('.sidebar-menu').tree()
                });
                $('.meun-item').click(function(){
                    if($(this).data('href')){
                        location.href= $(this).data('href');
                    }
                });
                // 上一页s
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
                    getCurrentPageData(_page);
                });
                // 监控所属商户select
                $('#type').on('change',function () {
                    var _type = $(this).val();
                    $scope.type = _type;
                    console.log(_type);
                    getCurrentPageData(1);
                });
                // 监控用户状态select
                $('#status').on('change',function () {
                    var _status = $(this).val();
                    $scope.status = _status;
                    console.log(_status);
                    getCurrentPageData(1);
                });
                // 点击查询
                $('.btn-search').on('click',function () {
                    var task_id = $.trim($('#task_id').val());
                    var task_name = $.trim($('#task_name').val());
                    var _url = '../js/json/admin_tasks.json?'+'task_id='+task_id+'&task_name='+task_name;
                    console.log(_url);
                    $http({
                        method: 'GET',
                        url:_url
                    }).then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.tasks = response.data.tasks;
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
                // 点击编辑
                $('.btn-add').on('click',function () {
                    $('#add-agent').modal('show');
                });
                $('.btn-edit').on('click',function () {
                    $('#edit-agent').modal('show');
                });
            })
        }])
    });
});