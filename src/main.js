/*!

 =========================================================
 * Haert Online V1.0
 =========================================================

 */
import Vue from "vue"
import App from "./App"
import router from "./router/index"

import PaperDashboard from "./plugins/paperDashboard"
import "vue-notifyjs/themes/default.css"

import VModal from 'vue-js-modal'
import "./plugins/axios"
import mqtt from "./plugins/mqtt"
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

/* import CxltToastr from 'cxlt-vue2-toastr'
Vue.use(CxltToastr)
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'; */

import Vuelidate from "vuelidate"
import moment from 'moment'
import Multiselect from 'vue-multiselect'
require('moment/locale/es')
import VueGtag from "vue-gtag";
import { isLoggedIn } from './auth'

import { Datetime } from 'vue-datetime';
///Laravel echo for websocket 
// import Echo from 'laravel-echo'

import StarRating from 'vue-star-rating'
Vue.component('star-rating', StarRating)
Vue.component('datetime', Datetime);
import 'vue-datetime/dist/vue-datetime.css'
import i18n from './i18n'
Vue.use(require('vue-moment'), {
    moment
})
Vue.component('multiselect', Multiselect)
Vue.use(VueSweetalert2)
Vue.use(PaperDashboard)
Vue.use(VModal)
Vue.use(Vuelidate)
Vue.use(mqtt)
//google tag
Vue.use(VueGtag, {
  config: { id: "G-DH5FPYXCTK" },
  // globalObjectName: 'foo'
});
/* import SmartTable from 'vuejs-smart-table'
Vue.use(SmartTable) */

window.Pusher = require('pusher-js');
let WebSocketToken = 'Bearer ' + localStorage.getItem('token');

let ssl = process.env.VUE_APP_WS_ENCRYPTED === 'true' ? true : false
//console.log("Encriptado " ,  typeof ssl)
let wsconfig ={
  broadcaster: 'pusher',
  key: '1',
  wsHost: process.env.VUE_APP_WS_URL,
  wsPort: process.env.VUE_APP_WS_PORT,
  forceTLS: ssl,
  disableStats: true,
  auth: {
    headers: {
        'Authorization': WebSocketToken
    }
  }
}

router.beforeEach((to, from, next) => {
  
  if(to.params.session){
    const session = JSON.parse(window.atob(to.params.session))
    for (const property in session){
      localStorage.setItem(property, session[property])
    }
    
    delete to.params.session
    }

  if(to.name !== 'Login' && to.meta.requireAuth && !isLoggedIn()){
    //console.log("To", to)
    next({name: 'Login'} )
  } else {
    //console.log(wsconfig);
    if(isLoggedIn() && !window.Echo || (to.name == 'Moderator-Event' || to.name == 'externalNetworking'))
      {
        //console.log("wsConfig: ", wsconfig);
        // window.Echo = new Echo(wsconfig);
        //console.log(window.Echo)
    }
    next();
  }
  // next();
})


/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");