import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { Hub, graphqlOperation } from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Amplify.configure({
  Auth: {
    userPoolWebClientId: process.env.NUXT_ENV_AWS_COGNITO_USER_POOL_CLIENT_ID,
    userPoolId: process.env.NUXT_ENV_AWS_COGNITO_USER_POOL_ID,
    region: process.env.NUXT_ENV_AWS_DEFAULT_REGION,
    oauth: {
      domain: process.env.NUXT_ENV_AWS_COGNITO_USER_POOL_DOMAIN,
      scope: [
        'email',
        'openid'
      ],
      redirectSignIn: process.env.NUXT_ENV_ROOT_URL,
      redirectSignOut: process.env.NUXT_ENV_ROOT_URL,
      responseType: 'code'
    }
  },
  API: {
    aws_appsync_graphqlEndpoint: process.env.NUXT_ENV_AWS_APPSYNC_UMATCH_URL,
    aws_appsync_region: process.env.NUXT_ENV_AWS_DEFAULT_REGION,
    aws_appsync_authenticationType: process.env.NUXT_ENV_AWS_APPSYNC_AUTH_TYPE
  }
})

Vue.use(AmplifyPlugin, AmplifyModules)

export default (ctx, inject) => {
  const AWS = {
    Auth: Amplify.Auth,
    API: Amplify.API,
    Query: graphqlOperation,
    Hub
  }

  inject('AWS', AWS)
}
