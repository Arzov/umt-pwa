import Vuex from 'vuex'
import login from './modules/login'
import user from './modules/user'
import geoloc from './modules/geoloc'
import home from './modules/home'
import match from './modules/match'
import chat from './modules/chat'

const store = () => {
  return new Vuex.Store({
    modules: {
      login,
      user,
      geoloc,
      home,
      match,
      chat
    }
  })
}

export default store
