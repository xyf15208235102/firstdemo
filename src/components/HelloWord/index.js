// @ts-nocheck
import HelloWorld from './HelloWorld.vue'
const Hellow = {
  install: (vue) => {
    vue.component('Hellow', HelloWorld)
  }
}
export default Hellow
