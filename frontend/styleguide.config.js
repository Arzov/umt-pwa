const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
title: 'Arzov Umatch',
//components: ['pages/**/*.vue', 'components/*.vue'],
pagePerSection: true,
tocMode: 'collapse',
sections: [
    {
        name: 'Vistas',
        description: 'Vistas principales por donde el usuario navegará en la aplicación.',
        sections: [
            {
                name: 'Start',
                description: 'Vista principal donde el usuario puede iniciar\
                              sesión mediante Arzov, Facebook o Google. También\
                              puede registrar una cuenta mediante Arzov.',
                components: ['pages/start/**/*.vue']
            }
        ]
    },
    {
        name: 'Componentes',
        description: 'Componentes'
    }
],
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
