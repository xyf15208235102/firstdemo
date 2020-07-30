// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Hellow from './components/HelloWord'
import moment from 'moment'
import { Button, Icon } from 'vant'
import './libs/rem'
import Enum from './enum'
// import './mock/list'
import './mock/about'
// import './mock/serve'
import axios from 'axios'
const myPlugin = {
  install (vue) {
    vue.prototype.myPlugin = this
  },
  aaa: () => {
  }
}
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
// Vue.prototype.$Enum = Enum
Object.assign(Vue.prototype, { ...Enum })
Vue.use(myPlugin)
Vue.use(Hellow)
Vue.use(Button)
Vue.use(Icon)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
