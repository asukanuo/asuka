import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as dotenv from "dotenv";
import webpackBar from "webpackbar";

const path = require("path");
const envConfig = dotenv.config({
    path: path.resolve(__dirname, "../env/.env." + process.env.BASE_ENV),
});
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";

const styleLoadersArray = [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用stylelooader,打包模式抽离css
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "[path][name]__[local]--[hash:5]",
            },
        },
    },
    'postcss-loader'
];


const baseConfig: Configuration = {
    entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
    // 打包出口文件
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 加上[chunkhash:8]
        path: path.join(__dirname, "../dist"), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: "/", // 打包后文件的公共前缀路径
    },
    // loader 配置
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                exclude: /node_modules/, // 排除node_modules目录
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            Workers: 4,
                        }
                    },
                    'babel-loader']
            },
            {
                test: /.css$/, //匹配 css 文件
                use: ["style-loader", "css-loader", 'postcss-loader'],
            },
            {
                test: /\.less$/, // 匹配less文件
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/, // 匹配sass文件
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            },
            //解析图片资源文件1
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 200 * 1024, // 小于10kb转base64
                    }
                },
                generator: {
                    filename:'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "less", "css"],
        alias: {
            "@": path.join(__dirname, "../src"),
        },
    },
    // plugins 的配置
    plugins: [
        new DefinePlugin({
            "process.env": JSON.stringify(envConfig.parsed),
        },
        ),
        new HtmlWebpackPlugin({
            title: "webpack5-react-ts",
            filename: "index.html",
            // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
            template: path.join(__dirname, "../public/index.html"),
            inject: true, // 自动注入静态资源
            hash: true,
            cache: false,
            // 压缩html资源
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true, //去空格
                removeComments: true, // 去注释
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true, // 缩小CSS样式元素和样式属性
            }
        }),
        new webpackBar({
            color: "#85d", // 默认green，进度条颜色支持HEX
            basic: false, // 默认true，启用一个简单的日志报告器
            profile: false, // 默认false，启用探查器。
        }),
    ].filter(Boolean),
};

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)


export default baseConfig

