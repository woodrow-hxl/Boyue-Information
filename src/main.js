import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import antConfig from '../ant.design.config'
import 'ant-design-vue/lib/table/style/css'


Vue.use(VueAxios, axios)
Vue.use(antConfig)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// eslint-disable-next-line
router.afterEach((to, from, next) => {
  
})

// eslint-disable-next-line
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})