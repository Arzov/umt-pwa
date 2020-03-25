const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
title: 'Default Style Guide',
components: 'components/*.vue',
webpackConfig: {
    resolve: {
        alias: {
            '~': resolve(__dirname, ''),
            '@': resolve(__dirname, '')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'vue-svg-loader']
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
},
exampleMode: 'expand'
}
