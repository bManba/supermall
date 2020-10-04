import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClcik from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
//安装toast
Vue.use(toast)
//解决移动端300ms延迟
FastClcik.attach(document.body)
//使用vue懒加载插件
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')

})

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
