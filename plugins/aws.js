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
  },
  API: {
    aws_appsync_graphqlEndpoint: process.env.aws.APPSYNC_UMATCH_URL,
    aws_appsync_region: process.env.aws.APPSYNC_REGION,
    aws_appsync_authenticationType: process.env.aws.APPSYNC_AUTH_TYPE,
    endpoints: [
      {
        name: process.env.aws.APIGATEWAY_UMATCH_NAME,
        endpoint: process.env.aws.APIGATEWAY_UMATCH_ENDPOINT,
        custom_header: async () => {
          return { Authorization: (await Amplify.Auth.currentSession()).idToken.jwtToken }
        }
      }
    ]
  }
})

Vue.use(AmplifyPlugin, AmplifyModules)
