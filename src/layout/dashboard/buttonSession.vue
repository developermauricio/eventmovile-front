<template>
<div class="col-5 col-sm-5 col-xl-2">
  <!-- div style="width:100%; margin-right:10%;" :style="'list-style: none; background-color:'+color+'; color:'+secondColor+'; border:none; heigth:20px;'" class="float-right btn"> -->
    <drop-down style="width:100%; margin-right:10%;" :style="'list-style: none; background-color:'+color+'; color:'+secondColor+' !important; border:none; heigth:20px;'" class="float-right btn"
              :title="user.name"
              title-classes="nav-link"
              icon="ti-user">
      <!-- <router-link :to="{name:'Mi Cuenta'}">
        <a class="dropdown-item" href="#">Mi cuenta</a>
      </router-link> -->
      <!--<a class="dropdown-item" :href="urlCerticate()" target="_blanck">Certificado</a>-->
      <a class="dropdown-item" href="#" @click="closeSession">{{$t('layout.dashboard.buttonSession.logOut')}}</a><!--cierre sesión landing-->
    </drop-down>

  <!-- </div> -->
</div>
</template>
<script>
import logout from '@/pages/Auth/Login/logout';
import getlang from "@/lang/index.js"
export default {
  mixins: [logout],
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      activeNotifications: false,
      user:{}
    };
  },
  props:['color','secondColor','event'],
  created() {
    this.user = {
      notifications:false,
      id: localStorage.getItem('_current_user_id'),
      name: localStorage.getItem('_current_user_name'),
      role: localStorage.getItem('_current_role_name'),
    }
  },
  methods: {
    getLanguage(){
      this.$i18n.locale = getlang.getLanguage();
    },
    urlCerticate(){
      const token = localStorage.getItem('_current_token')
      let lastname = localStorage.getItem('_current_user_lastname')
      lastname = lastname ? (' '+lastname) : ''
      const user = encodeURIComponent(localStorage.getItem('_current_user_name')+lastname)
      const event = encodeURIComponent(this.event.name)
      const model_id = this.event.id
      const action = 'gen-certificate'
      const route = "certificate"
      const url = process.env.VUE_APP_API_URL+'editor/index'
      const mode = process.env.VUE_APP_MODE
      const ToReturn = url+'?token='+token+'&action='+action+'&model_id='+model_id+'&event='+event+'&user='+user+'&mode='+mode+'&route='+route
      return ToReturn
    },
    //aqui no es 
    async closeSession(){

      
      await this.logoutTracking()
      let event = 0;
      if(localStorage.getItem('_current_event_id')){
        event  = localStorage.getItem('_current_event_id');
      }
      const eventId = localStorage.eventId;
      localStorage.clear()
      localStorage.setItem('eventId',eventId)
      this.redirect(event)
   
    },
    async redirect(event){
      console.log(event)
      if(event != 0){
       this.$router.push({name:'Login', query: {eventId:event} })        
      }else{
        this.$router.push({name:'Login'});
      }
      

    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>
<style>
</style>
