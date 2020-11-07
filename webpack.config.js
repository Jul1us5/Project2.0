const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (dir,ext) => isDev ? `${dir}/[name].${ext}` : `${dir}/[name].[contenthash].${ext}` 

// -----------------------------------
const optimization = () => {
    const config = {
        // splitChunks: {
        //     chunks: 'all'
        // }
    }
    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}
// -----------------------------------
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev, // Hot Module Replacement
                reloadAll: true,
                publicPath: '../' // ADD -> for in .css links
            },
        },
        'css-loader'
    ]

    if(extra) {
        loaders.push(extra)
    }

    return loaders
}
// -----------------------------------
const fileLoaders = (dir) => {
    const fileLoad = [
        {
            loader: `file-loader`,
            options: {
                name: '[name].[ext]',  // If delete use img like hash
                outputPath: `${dir}/`
            }
        }
    ]

    return fileLoad
}
// -----------------------------------


//  Adding multi HTML files 
const HtmlPages = ['index']
const MultiHtmlPlugins = HtmlPages.map( name => {
    return new HtmlWebpackPlugin({
        template: `./${name}.html`,
        filename: `${name}.html`,
        minify: {
            collapseWhitespace: isProd // Minify .html files
        }
      })
})




module.exports = {
    context: path.resolve(__dirname, 'src'), //     Location where we work
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './JS/index.js'],     //   MAIN [name]
        analytics: './JS/analytics.js' //   ANALYTICS [name]
    },
    output: {
        filename: filename('JS', 'js'), //  Here use [name] from entry
        path: path.resolve(__dirname, 'public') 
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.svg'], // Can write file names without .ending
        alias: {
            '@': path.resolve(__dirname, 'src/JS') // Directory in main.js
        }
    },
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(), //     Clean old files
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/IMG/FAV/box.png'),
                    to: path.resolve(__dirname, 'public/IMG/FAV')  // CopyWebpackPlugin copy FOLDERS or FILES to dir
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('CSS', 'css'), // Where files deploy !!!!!!
        })
    ].concat(MultiHtmlPlugins), //   Here set ALL HTML files as amended
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
                use: fileLoaders('IMG')
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: fileLoaders('FONTS')
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/, // Dont include this
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env'], // Presets HERE | Plugins set ( Bundle ) for JS
                    plugins: [
                        '@babel/plugin-proposal-class-properties' // This plugin know about all features
                    ]
                  },
                }
              }
        ]
    }
}