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
            require(['sm','app/upload-image'],function (sm1,UploadImage) {
                $.init();
                console.log('========');
                $('.nav-back').on('click',function () {
                    window.history.back();
                });
                $('input').change(function () {
                    if($(this).val().length>0){
                        $(this).css({"background-color":"#fff"});
                    }else{
                        $(this).css({"background-color":"#e0e0e0"});
                    }
                });
                var params = {
                    fileInput: $("#uploaderFiles").get(0),
                    upButton: $("#fileSubmit").get(0),
                    url: $("#uploadForm").attr("action"),
                    filter: function(files) {
                        var arrFiles = [];
                        for (var i = 0, file; file = files[i]; i++) {
                            if (file.type.indexOf("image") == 0) {
                                if (file.size >= 1024000) {
                                    alert('您这张"'+ file.name +'"图片大小过大，应小于1M');
                                } else {
                                    arrFiles.push(file);
                                }
                            } else {
                                alert('文件"' + file.name + '"不是图片。');
                            }
                        }
                        return arrFiles;
                    },
                    onSelect: function(files) {
                        console.log('----select---');
                        var i = 0;
                        var funAppendImage = function() {
                            var file = files[i];
                            console.log(file);
                            if (file) {
                                var reader = new FileReader();
                                reader.onload = function(e) {
//                        console.log(e);
                                    var _file = $('.weui-uploader__file').get(i);
                                    $(_file).css("background-image","url("+e.target.result+")");
                                    $(_file).find('.progress').attr('id','uploadProgress_'+i);
                                    $(_file).find('.delete').show().on('click',function () {
                                        console.log('delete-this----'+i);
                                        UploadImage.funDeleteFile(file);
                                        $(_file).css("background-image","url(http://placeholder.qiniudn.com/150x250)");
                                        $(_file).find('.delete').hide();
                                        return false;
                                    });
                                    i++;
                                    $('.weui-uploader__info').html(i+'/3');
                                    funAppendImage();
                                };
                                reader.readAsDataURL(file);
                            } else {
                                //删除方法
                                $(".upload_delete").click(function() {
                                    UploadImage.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
                                    return false;
                                });
                            }
                        };
                        funAppendImage();
                    },
                    onDelete: function(file) {
                        console.log('----delete-index--'+file.index);
                        $('#uploadForm')[0].reset();
                    },
                    onProgress: function(file, loaded, total) {
                        var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
                        eleProgress.show().html(percent);
                    },
                    onSuccess: function(file, response) {
                        $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
                    },
                    onFailure: function(file) {
                        $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");
                        $("#uploadImage_" + file.index).css("opacity", 0.2);
                    },
                    onComplete: function() {
                        //file控件value置空
                        $('#uploadForm')[0].reset();
                        // 成功提示
                        $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
                    }
                };
                UploadImage = $.extend(UploadImage.UploadImage, params);
                UploadImage.init();
            });

        }])

    });
});