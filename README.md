# 前端项目使用说明

## 如何使用

项目使用了gulp和bower

拉取代码后，先执行 

        npm install
        
再执行

        bower install
        
然后执行

        gulp

## css
这个目录里面存放sass编译过的css样式文件，此时的文件未压缩
## js
* app

  存放项目js文件
 
* lib
 
  需要的组件（大多数为js组件，所以放到了这里）
  
 ## node_module
 项目打包，压缩，前端调试等需要的node组件
 
## sass
 未编译过的.scss 格式的样式表
 
## admin
 后台管理前端模板
 
## 拉取线上最新代码到本地
    git fetch --all
    git pull origin master
    
   > 如果本地提示本地有内容没有commit，那么就说明你本地的代码落后于线上，具体操作
   * 先 fetch 使用编辑器工具栏实现 " VCS > Git > fetch "
   * 后merged master to 本地分支 " VCS > GIT Merger changes"
   * 选择要merger 的线上分支
   * 然后继续根据提示框操作（注意绿色和红色都需要处理，不要落下任务本地与线上的差异）
   
## 特别注意
 > css 目录下的文件是生成的文件，千万不要修改下面的文件，否则会被覆盖掉。
 
 > js>json 此目录里面是模拟的json数据，写接口和建表的时候可以参考，这样我修改前端内容会容易些。
