import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'

Vue.use(Notifications)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
