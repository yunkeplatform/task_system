/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/12.
 */
define(['zepto'],function ($) {
    var GetQueryString = function (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    };
    var checkLogin = function (url) {
        localStorage.setItem('before-login-url',url);
        if(localStorage.getItem('user') && localStorage.getItem('user').id>0){
            window.location.href= url;
        }else{
            window.location.href='login.html';
            return false;
        }
    };
    var formatTime = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    };
    function formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n
    }
    return {
        GetUrlParam:GetQueryString,
        FormatTime:formatTime,
        checkLogin:checkLogin
    };
});