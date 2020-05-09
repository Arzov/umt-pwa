const { resolve } = require('path')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

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
                },
                {
                    name: 'Required Attributes',
                    description: 'Vista donde el usuario debe, obligatoriamente, ingresar atributos extras\
                                para poder filtrar la búsqueda de sus rivales (esta vista es sólo necesaria\
                                para los usuarios que ingresan por primera vez mediante Facebook o Google).',
                    components: ['pages/required_attributes/**/*.vue']
                },
                {
                    name: 'Required Filters',
                    description: 'Vista donde se le pregunta al usuario por filtros necesarios para la\
                                búsqueda de rivales en la app según su preferencia.',
                    components: ['pages/required_filters/**/*.vue']
                },
                {
                    name: 'Reset Password',
                    description: 'Vista donde el usuario puede cambiar su contraseña una vez enviada\
                                la solicitud en la vista [RecoverPassword](#recoverpassword). El usuario deberá ingresar\
                                un código enviado a su email registrado y la nueva contraseña.',
                    components: ['pages/reset_password/**/*.vue']
                },
                {
                    name: 'Recover Password',
                    description: 'Vista donde el usuario puede restablecer su contraseña en caso de que\
                                la olvide (comportamiento sólo para autenticación con Arzov).\
                                El usuario deberá ingresar su email registrado para poder acceder a la\
                                vista de cambio de contraseña.',
                    components: ['pages/recover_password/**/*.vue']
                },
                {
                    name: 'Home',
                    description: 'Vista inicial de la app donde el usuario tiene la funcionalidad de buscar\
                                rivales cercanos y enlistarlos. El usuario puede enviar una solicitud\
                                de _match_ a cada rival.',
                    components: ['pages/home/**/*.vue']
                },
                {
                    name: 'Profile',
                    description: 'Vista donde el usuario puede revisar sus datos de la cuenta y\
                                eventualmente modificar sus valores (filtros de búsqueda,\
                                atributos personales, etc.).',
                    components: ['pages/profile/**/*.vue']
                },
                {
                    name: 'Match',
                    description: 'Vista donde el usuario puede ver las solicitudes enviadas y las\
                                solicitudes activas con otros usuarios.\
                                En las **enviadas** o **pendientes** el usuario puede aceptar o\
                                rechazar las solicitudes.\
                                En las **activas** puede acceder a un chat para acordar una fecha y\
                                cancha del partido a jugar.',
                    components: ['pages/match/**/*.vue']
                },
                {
                    name: 'Chat',
                    description: 'Vista donde el usuario puede conversar con sus rivales y acordar fechas\
                                y canchas donde realizar el partido de fútbol o _match_.',
                    components: ['pages/chat/**/*.vue']
                },
                {
                    name: 'Map',
                    description: 'Vista donde el usuario puede buscar canchas disponibles que estén cerca\
                                de su radio de búsqueda.',
                    components: ['pages/map/**/*.vue']
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
