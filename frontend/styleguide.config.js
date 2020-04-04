const { resolve } = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = {
    title: ' ',
    version: require('./package.json').version,
    pagePerSection: true,
    usageMode: 'expand',
    styles: './styleguide/styles.js',
    require: ['./styleguide/style.css'],
    styleguideComponents: {
        LogoRenderer: path.join(__dirname, 'styleguide/components/Logo')
    },
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
                },
                {
                    name: 'Login',
                    description: 'Vista donde el usuario puede iniciar sesión mediante Arzov (AWS Cognito).\
                                También puede recuperar su contraseña.',
                    components: ['pages/login/**/*.vue']
                },
                {
                    name: 'Register',
                    description: 'Vista donde el usuario registra su email en Arzov\
                                (AWS Cognito maneja la autenticación).',
                    components: ['pages/register/**/*.vue']
                },
                {
                    name: 'Email Verification',
                    description: 'Vista donde el usuario debe verificar su email de\
                                registro mediante el código enviado por Arzov. También\
                                puede pedir un nuevo código en caso de no recibirlo.',
                    components: ['pages/email_verification/**/*.vue']
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
                },
                {
					test: /\.png$/,
					use: ['url-loader']
				}
            ]
        },
        plugins: [new VueLoaderPlugin()]
    }
}
