/**
 * Author johnnyZhang
 * Site johnnyzhang.cn
 * CreateTime 2017/9/11.
 */
var gulp = require('gulp');
var sass =  require('gulp-sass');//sass 编译
var uglify = require("gulp-uglify");//压缩js
var minifyCss = require("gulp-minify-css");//压缩css
var rename = require('gulp-rename');//重命名
var rimraf = require('rimraf');//删除文件
var sourcemaps = require('gulp-sourcemaps');// css.map
var autoprefixer = require('gulp-autoprefixer');//添加css浏览器前缀
var browserSync = require('browser-sync');//浏览器刷新

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(gulp.dest('./css'))
        // .pipe(minifyCss()) //压缩css
        // .pipe(rename({suffix: '.min'}))//添加min后缀
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});
gulp.task('min-js', function () {
    gulp.src(['./js/app/*.js','!./js/app/*min.js']) // 要压缩的js文件
        .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js/app')); //压缩后的路径
});
// 压缩css
gulp.task('min-css', function () {
    gulp.src('./css/*.css') // 要压缩的css文件
        .pipe(minifyCss()) //压缩css
        .pipe(rename({suffix: '.min'}))//添加min后缀
        .pipe(gulp.dest('dist/css'));
});
// 移除dist目录
gulp.task('clean:dist', function (cb) {
    rimraf('./dist', cb);
});
// 监控以及浏览器刷新
gulp.task('watch', function() {
    // browserSync.init({
    //     server: { baseDir: "./" }
    // });
    gulp.watch(['./sass/**/*.scss','./js/app/*.js'], ['sass'])
        // .on('change', browserSync.reload);
});
//默认
gulp.task('default', ['sass','min-js']);