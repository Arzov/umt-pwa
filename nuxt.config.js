const routes = require('./static/routes')
const aws = require('./static/aws')
const app = require('./static/app')
const gcp = require('./static/gcp')

export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1' },
            { name: 'theme-color', content: '#151515' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i&display=swap' }
        ],
        script: [
            {
                src: 'https://maps.googleapis.com/maps/api/js?key=' + gcp.GCP_API_KEY,
                body: true
            }
        ],
        htmlAttrs: {
            lang: 'es'
        }
    },
    manifest: {
        lang: 'es',
        name: 'Umatch',
        short_name: 'Umatch',
        start_url: '/',
        orientation: 'portrait-primary',
        background_color: '#151515',
        theme_color: '#6457e3',
        display: 'fullscreen',
        icons: [
            {
            'src': '/static/icons/icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-96x96.png',
            'sizes': '96x96',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-152x152.png',
            'sizes': '152x152',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
            },
            {
            'src': '/static/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
            }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: false,
    /*
    ** Global CSS
    */
    css: [
        'ant-design-vue/dist/antd.css',
        '@/assets/style/app.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/mask',
        '@/plugins/mq',
        '@/plugins/aws',
        '@/plugins/storage',
        '@/plugins/umatch-ui'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
    },
    /*
    ** Router options
    */
    router: {
        middleware: ['auth', 'geoloc', 'routing'],
        extendRoutes (routes, resolve) {
            routes.push({
                name: 'custom',
                path: '*',
                redirect: '/start'
            })
        }
    },
    /*
    ** Environment variables
    */
    env: {
        app,
        aws,
        routes
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
