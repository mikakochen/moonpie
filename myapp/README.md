# first-project

## 如何搭建后台

## 新建目录myapp
$ cd myapp

<!-- 法一，太简单，不适合 -->
<!-- ## 创建一个package.json文件夹,输入参数，按几个回车
$ npm init

## 安装 Express 并将其保存到依赖列表中
$ npm install express --save

## 新增一个文件app.js，填入代码  -->

<!-- 法二，搭建骨架 -->
## 通过应用生成器工具 express-generator 可以快速创建一个应用的骨架（D盘已全局安装过，此处不用安装）
$ npm install express-generator -g

## 在根目录下 (/first-project) 快速搭建骨架，创建一系列文件，包括app.js、package.json等
$ express myapp

## 默认的模板为jade, 把模板引擎改为html
$ express --no-view

## 然后进入新目录myapp, 安装所有依赖包
$ cd myapp
$ npm install

## 修改启动命令，报错？？？
$ set DEBUG=myapp:* & npm start  

## 起服务（需在后台目录中）
$ node app/ npm start

## 打开本地地址3000端口
http://127.0.0.1:3000/


## 安装monk， 用来连接数据库， 进行数据的增删改查
$ cnpm install --save monk

## 在vuejs中安装插件vue-resource用来发送http请求
$ cnpm install vue-resource --save-dev