import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
//import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import axios from 'axios'
import Antd from 'ant-design-vue'; //增加
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd) //Vue.use(Button)修改
Vue.prototype.$tinymce = tinymce
Vue.use(VueTinymce)

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
    // import { createApp } from 'vue'
    // import App from './App.vue'
    // //import 'element-plus/dist/index.css'
    // import router from './router'
    // //import ElementPlus from 'element-plus'
    // //import ElementUI from 'element-ui';
    // //import 'element-ui/lib/theme-chalk/index.css';
    // //import store from './store'
    // //import axios from 'axios'
    // import ElementUI from 'element-ui'
    // import 'element-ui/lib/theme-chalk/index.css'
    // import './plugins/element.js'
    // import axios from 'axios'




// Vue.use(ElementUI)
// Vue.prototype.$axios = axios
// Vue.config.productionTip = false

// //createApp(App).use(ElementUI).use(ElementPlus).use(router).mount('#app')
// createApp(App).use(ElementUI).use(router).mount('#app')
// // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
// //   App.component(key, component)
// // }