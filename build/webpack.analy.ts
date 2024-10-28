import { Configuration } from 'webpack'
import prodConfig from './webpack.prod' // 引入打包配置
import { merge } from 'webpack-merge' // 引入合并webpack配置方法

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 引入webpack包分析插件

const smp = new SpeedMeasurePlugin(); // 实例化分析插件
// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位

const analyConfig: Configuration = smp.wrap(merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin() // 使用smp.wrap方法,把生产环境配置传进去
    ]
}))


export default analyConfig