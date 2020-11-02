const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


//  Adding multi HTML files 
const HtmlPages = ['index']
const MultiHtmlPlugins = HtmlPages.map( name => {
    return new HtmlWebpackPlugin({
        template: `./${name}.html`,
        filename: `${name}.html`,
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
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin() //     Clean old files
    ].concat(MultiHtmlPlugins), //   Here set ALL HTML files as amended
    module: {
        rules: [
            {
                test: /\.css$/,
                use : ['style-loader', 'css-loader'] //     css-loader reader file | style-loader put in head | npm install
            },                                       //     From right to left | CSS import in index.js file 
            {
                test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'IMG/'
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'FONTS/'
                    }
                }]
            }
        ]
    }
}