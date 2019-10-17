import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Amplify.configure({
  Auth: {
    userPoolWebClientId: process.env.aws.COGNITO_USER_POOL_CLIENT_ID,
    userPoolId: process.env.aws.COGNITO_USER_POOL_ID,
    region: process.env.aws.COGNITO_USER_POOL_REGION,
    oauth: {
      domain: process.env.aws.COGNITO_USER_POOL_DOMAIN,
      scope: [
        'email',
        'openid'
      ],
      redirectSignIn: process.env.app.ROOT_URL,
      redirectSignOut: process.env.app.ROOT_URL,
      responseType: 'token'
    }
  }
})

Vue.use(AmplifyPlugin, AmplifyModules)
