<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">

          <!--<drop-down class="nav-item"
                     title="4 Notifications"
                     title-classes="nav-link"
                     icon="ti-bell">
            <a class="dropdown-item" href="#">Notificación 1</a>
            <a class="dropdown-item" href="#">Notificación 2</a>
            <a class="dropdown-item" href="#">Notificación 3</a>
            <a class="dropdown-item" href="#">Notificación 4</a>
            <a class="dropdown-item" href="#">Notificación 5</a>
          </drop-down>-->

          <drop-down class="nav-item"
                     :title="user.name"
                     title-classes="nav-link"
                     icon="ti-user">
            <router-link :to="{name:'Mi Cuenta'}">
              <a class="dropdown-item" href="#">Mi cuenta</a>
            </router-link>
            <a class="dropdown-item" href="#" @click="closeSession">Cerrar sesión</a><!--cierre sesión usuario admin-->
          </drop-down>

        </ul>
      </div>
    </div></nav>
</template>
<script>
import logout from '@/pages/Auth/Login/logout';
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
      user:{},      
    };
  },
  created() {
    this.user = {
      notifications:false,
      id: localStorage.getItem('_current_user_id'),
      name: localStorage.getItem('_current_user_name'),
      role: localStorage.getItem('_current_role_name'),
    }
  },
  methods: {
    async closeSession(){
      //await this.logoutTracking()
      console.log("kill "+localStorage._current_role_name+" session")
      let send = this.getRol()
      let idE = 0
      if(localStorage.eventId ){
        console.log('entro guest init')       
        idE = localStorage.eventId
      }
      
      console.log("Hola rol:",send)
      localStorage.clear()
      this.redirect(send,idE)

    },
    getRol(){        
        return localStorage._current_role_name;
    },
    redirect(send,eId){
      console.log('entro redirect')      
      switch(send){
      case 'guest':    
          console.log('entro guest')      
          this.$router.push({name:'Login', query: {eventId:eId} })
        break;
      case 'super admin':
          this.$router.push({name:'Login', query: {superAdmin:true} })
        break;
      case 'admin':
        this.$router.push({name:'Login', query: {admin:true} })                  
        break;
      default:
        this.$router.push({ name: "notFoundPage"})        
        break;
    }
        //this.$router.push({ name: "Login" }) borrar si el cerrar sesión esta funcionando ok        
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
