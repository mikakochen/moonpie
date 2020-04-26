const path = require('path');
const webpack = require('webpack');   // 为什么加这一句
const { resolve }= require('path');  // 为什么加这一句
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const MiniCssExactPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const isProd = process.env.NODE_ENV === 'production';   // 获取环境变量
let isProd = false;
console.log(`是否是生产环境 ${isProd}`);

module.exports = {
  devServer: isProd? {} : {   // 开发服务器的配置
    contentBase: path.join(__dirname, 'dist'),   //告诉服务器从哪个目录中提供内容
    port: 1234,
    progress: true,
    hot: true    //启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
  },
  optimization: {  // 压缩和打包js.css都可以写在这里
    minimizer: [
        new UglifyjsPlugin({
            cache: true,
            parallel: true,   // 多个JS并发压缩
            sourceMap: true   // 当ES6=>ES5用来源码映射
        }),
        new OptimizeCSSAssetsPlugin()
    ],
  },
  mode: 'development',     // 模式，默认有development和production
  devtool: isProd? false :'inline-source-map',   // 开发环境中用来定位报错在源码中的位置，生产环境不使用
  entry: './src/main.js',    //入口
  output: {
    filename: 'main.[hash:8].js',     // 打包后的文件名,加入hash避免缓存,只8位
    path: path.resolve(__dirname, 'dist'),   // __dirname表示当前目录新建一个dist文件夹
    publicPath: isProd ? './' : '/',    // 开发和生产环境路径不同
  },
  resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js'    // 解决vue报错You are using the runtime-only build of Vue where the template compiler is not available.
    },
    extensions: ['.js', '.vue'], // import引入文件的时候不用加后缀
    modules: [ // 配置路径别名
        'node_modules',
        path.resolve(__dirname, 'src'),  
        path.resolve(__dirname, 'src/components'),
        path.resolve(__dirname, 'src/components/nav2'),   // 这里不加入nav2路径的话，webpack会报错无法解析productItem组件
    ]
  },
  plugins: [
      new VueLoaderPlugin(),   // 新版vue-loader必须在plugins中引入
      new CleanWebpackPlugin({path: path.join(__dirname, isProd?'dist':'')}),  // 每次打包前先清除掉旧文件
      new webpack.HotModuleReplacementPlugin(),    //启用热替换模块???????????
      new HtmlWebpackPlugin({   // 用来生成html文件的插件
          title: '管理输出',
          template: './index.html',     // 目标html目录
          filename: 'index.html',   // 输出后的文件名
          minify: {     // 压缩html配置要求
              removeAttributeQuotes: true,    // 去除双引号
              collapseWhitespace: true   // 去除空格不换行
          },
          hash: true
      }),
      new MiniCssExactPlugin({   // 用于将 CSS 从主应用程序中分离
          filename: 'css/main.css'
      }),
      
  ],
  module: {
    // loader的作用单一，用loader来引入除了js以外的文件类型，默认从后往前调用，注意顺序
    // use有几种写法，对象的写法配置性更强
    rules: [
        {
            test: /\.vue$/,
            use: [      
                'vue-loader',   // vue文件引入
            ]
        },
        {
            test: /\.css$/,
            use: [      
                'vue-style-loader',  // 用来解析vue文件中的<style>代码块
                'style-loader',   // 把css插入head标签中
                'css-loader'     // 用来解析@import这种语法
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1,
                    outputPath: '/img/'     // 图片资源统一打包到img路径下
                }
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    outputPath: 'font/'     // 图片资源统一打包到img路径下
                }
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory',
            exclude: '/node_modules/',
            include: resolve(__dirname, '../src')
        }
    ]
  }
};

// 常用的loader有:

// 处理样式的：style-loader,css-loader,postcss-loader,sass-loader,less-loder
// 处理es6的：babel-loader（要连同babel-core, babel-preset-env）一起用
// 处理图片的：file-loader, url-loader, image-webpack-loader

//常用的plugin有：
    // 压缩js：uglifyjs-webpack-plugin
    // 合并&压缩css： mini-css-extract-plugin，optimize-css-assets-webpack-plugin
    // 清除目录：clean-webpack-plugin
    // 生成html：html-webpack-plugin
    // postcss相关的：postcss-plugin-px2rem，postcss-preset-env，postcss-sprites，autoprefixer
    // webpack自带的方法：webpack.ProvidePlugin等