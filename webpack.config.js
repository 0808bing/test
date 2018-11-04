const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const isDev = process.env.NODE_ENV == 'development'
// console.log(process.env)
const config = {
    // target: 'node',
    // externals: [nodeExternals()], //报错
    entry: {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            //下面是添加的 css 的 loader，也即是 css 模块化的配置方法，大家可以拷贝过去直接使用
            {
                test: /\.css$/,
                //如果使用style-loader将样式添加到js文件中，在编写样式的时候可以享受热更新的效果，如果使用extract-text-webpack-plugin 将样式提取，此组件并不支持热更新。只会重新打包但是并不会刷新页面。
                //官方建议在开发环境中关闭ExtractText组件。
                // use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: 'css-loader'
                // })),
                //css-hot-loader css更新时刷新页面，webpack4中需用MiniCssExtractPlugin抽取css,若使用ExtractTextPlugin会报错
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                  ],
                // use: [ //style-loader要在css-loader前面
                //     'style-loader',
                //     'css-loader'
                // ]
                // 或者可以用loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.styl/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true 
                            },
                        },
                        'stylus-loader'
                    ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                use: [{
                    loader : 'url-loader',
                    options: {
                        limit: 5000,
                        options: {
                            name: 'imgs/[path][name]-[hash].[ext]'
                        }
                    }
                }]
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin('css/bundle.[hash].css'), //写{filename:...}是绝对路径，启动不了css热更新
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                },
                runtime: {
                    name: "runtime",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
}
module.exports = (env, argv) =>{
    const isDev = argv.mode === 'development';
    if(isDev){
        config.watchOptions = {
            poll: 1000
          };
        //帮助代码调试
        config.devtool = '#cheap-module-eval-source-map'
        config.devServer = {
            port: 8000,
            host: '0.0.0.0',
            contentBase: './dist',
            // overlay: {
            //     errors: ture,//编译时有任何错误可显示在网页中
            // },
            // open: true, //打开页面
            // histroyFallBack: {
    
            // },
            hot: true,
            // contentBase: path.join(__dirname, "dist"),
            // publicPath: 'dist'
        }
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        )
    }
    return config;
} 