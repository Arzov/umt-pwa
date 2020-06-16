const routes = require('./static/routes')

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
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i&display=swap' }
        ],
        script: [
            {
                src: 'https://maps.googleapis.com/maps/api/js?key=' + process.env.NUXT_ENV_GCP_API_KEY,
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
        theme_color: '#151515',
        display: 'fullscreen'
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
        },

        babel: {
            presets ({ isServer }) {
              return [
                [
                  require.resolve('@nuxt/babel-preset-app'),
                  {
                    buildTarget: isServer ? 'server' : 'client',
                    corejs: { version: 3 }
                  }
                ]
              ]
            }
        },

        postcss: {
            preset: {
              autoprefixer: {
                grid: 'autoplace',
                flexbox: true
              }
            }
        }
    },

    generate: {
        subFolders: false
    }
}
