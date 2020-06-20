import Vue from 'vue'
import {
  Notification,
  Button,
  Table,
  TableColumn,
  Dialog,
  Form,
  Input,
  FormItem
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false

locale.use(lang)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$notify = Notification

new Vue({
  render: h => h(App),
}).$mount('#app')
