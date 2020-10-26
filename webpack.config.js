const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


//  Adding multi HTML files 
const HtmlPages = ['example']
const MultiHtmlPlugins = HtmlPages.map( name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`,
        filename: `${name}.html`,
        chunks: [`${name}`]
      })
})



module.exports = {
    mode: 'development',
    entry: {
        main: './src/JS/index.js',     //   MAIN name
        analytics: './src/JS/analytics.js' //   ANALYTICS name
    },
    output: {
        filename: 'JS/[name].[contenthash].js', //  Here use [name] from entry
        path: path.resolve(__dirname, 'public') 
    },
    plugins: [
        new HtmlWebpackPlugin({   
            template: './src/index.html',
            chunks: ['main']
        }),
        new CleanWebpackPlugin() //     Clean old files
    ].concat(MultiHtmlPlugins) //   Here u set ALL HTML files as amended
}



// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')

// const isDev = process.env.NODE_ENV === 'development'
// const isProd = !isDev
// console.log('Is DEV:', isDev)

// const optimization = () => {
//     const config = {
//         splitChunks: {
//             chunks: 'all'
//         }
//     }
//     if(isProd) {
//         config.minimizer = [
//             new OptimizeCssAssetPlugin(),
//             new TerserWebpackPlugin()
//         ]
//     }

//     return config
// }

// module.exports = {
//     context: path.resolve(__dirname, 'src'),
//     mode: 'development',
//     entry: {
//         main: './index.js',
//         analytics: './analytics.js'
//     },
//     output: {
//         filename: '[name].[contenthash].js',
//         path: path.resolve(__dirname, 'public')
//     },
//     resolve: {
//         extensions: ['.js', '.json', '.png'],
//     },
//     optimization: optimization(),
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './index.html',
//             minify: {
//                 collapseWhitespace: isProd
//             }
//         }),
//         new CleanWebpackPlugin(),
//         new CopyWebpackPlugin({
//             patterns: [
//                 {
//                     from: path.resolve(__dirname, 'src/IMG'),
//                     to: path.resolve(__dirname, 'public/IMG/ICONS')
//                 }
//             ]
//         }),
//         new MiniCssExtractPlugin({
//             filename: '[name].[contenthash].css',
//         })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [
//                     {
//                         loader: MiniCssExtractPlugin.loader,
//                         options: {
//                             hmr: isDev,
//                             reloadAll: true,
//                         },
//                     }, 'css-loader'],
//             },
//             {
//                 test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
//                 use: [{
//                     loader: 'file-loader',
//                     options: {
//                       name: '[name].[ext]',
//                       outputPath: 'IMG/'
//                     }
//                   }]
//             },
//             {
//                 test: /\.(ttf|woff|woff2|eot)$/,
//                 use: [{
//                     loader: 'file-loader',
//                     options: {
//                       name: '[name].[ext]',
//                       outputPath: 'FONTS/'
//                     }
//                   }]
                
//             }
//         ],
//     },
// }