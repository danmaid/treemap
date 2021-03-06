import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

export interface Hierarchy<T = unknown> {
  label?: string;
  children?: T[] | Hierarchy[];
}
