const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}



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
        main: './JS/index.js',     //   MAIN [name]
        analytics: './JS/analytics.js' //   ANALYTICS [name]
    },
    output: {
        filename: 'JS/[name].[contenthash].js', //  Here use [name] from entry
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
            filename: 'CSS/[name].[contenthash].css', // Where files deploy !!!!!!
        })
    ].concat(MultiHtmlPlugins), //   Here set ALL HTML files as amended
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev, // Hot Module Replacement
                            reloadAll: true,
                            publicPath: '../' // ADD -> for in .css links
                        },
                    }, 'css-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // If delete use img like hash
                            outputPath: '/IMG'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'FONTS/'
                        }
                    }
                ]
            }
        ]
    }
}