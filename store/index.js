import Vuex from 'vuex'
import login from './modules/login'
import user from './modules/user'
import geoloc from './modules/geoloc'
import home from './modules/home'
import match from './modules/match'
import chat from './modules/chat'
import recoverPassword from './modules/recover-password'
import resetPassword from './modules/reset-password'

const store = () => {
  return new Vuex.Store({
    modules: {
      login,
      user,
      geoloc,
      home,
      match,
      chat,
      recoverPassword,
      resetPassword
    }
  })
}

export default store
