import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    mobile: 690,
    tablet: 1023,
    desktop: Infinity
  }
})
