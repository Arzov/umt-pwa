import Vue from 'vue'
import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: { key: process.env.gcp.GCP_API_KEY }
})
