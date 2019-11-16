import Vuex from 'vuex'
import login from './login/login'
import user from './user/user'
import geoloc from './geoloc/geoloc'
import popup from './popup/popUp'

const store = () => {
  return new Vuex.Store({
    modules: {
      login,
      user,
      geoloc,
      popup
    }
  })
}

export default store
