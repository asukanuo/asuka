import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import baseConfig from "./webpack.base";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { only } from "node:test";

const globAll = require('glob-all')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const glob = require('glob')


const prodConfig: Configuration = merge(baseConfig, {
    mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"), // 复制public下文件
                    to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
                    filter: (source) => !source.includes("index.html"), // 忽略index.html
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
        }),
        new PurgeCSSPlugin({
            paths: globAll.sync(
                [`${path.join(__dirname, '../src')}/**/*`, path.join(__dirname,
                    '../public/index.html')],
                {
                    nodir: true,
                }
            ),
            only: ["dist"],
            safelist: {
                standard: [/^ant-/]
            }
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/, // 只生成css,js压缩文件
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩格式,默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率,默认值是 0.8
        })
    ],
    optimization: {
        // splitChunks: {
        // chunks: "all",
        // },
        runtimeChunk: {
            name: 'mainifels'
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), // 压缩css
            new TerserPlugin({
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 删除console.log
                    }
                }
            })
        ],
    },
    performance: { // 配置与性能相关的选项的对象
        hints: false, // 设置为false将关闭性能提示。默认情况下，Webpack会显示有关入口点和资产大小的警告和错误消息。将hints设置为false可以禁用这些消息。
        maxAssetSize: 4000000, // 设置一个整数，表示以字节为单位的单个资源文件的最大允许大小。如果任何资源的大小超过这个限制，Webpack将发出性能警告。在你提供的配置中，这个值被设置为4000000字节（约4MB）。
        maxEntrypointSize: 5000000 // 设置一个整数，表示以字节为单位的入口点文件的最大允许大小。入口点是Webpack构建产生的主要JS文件，通常是应用程序的主要代码。如果入口点的大小超过这个限制，Webpack将发出性能警告。在你提供的配置中，这个值被设置为5000000字节（约5MB）。
    }
});
module.exports = {
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    splitChunks: { // 分隔代码
        cacheGroups: {
            vendors: { // 提取node_modules代码
                test: /node_modules/, // 只匹配node_modules里面的模块
                name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                minChunks: 1, // 只要使用一次就提取出来
                chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                minSize: 0, // 提取代码体积大于0就提取出来
                priority: 1, // 提取优先级为1
            },
            commons: { // 提取页面公共代码
                name: 'commons', // 提取文件命名为commons
                minChunks: 2, // 只要使用两次就提取出来
                chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                minSize: 0, // 提取代码体积大于0就提取出来
            }
        }
    }
}
export default prodConfig;