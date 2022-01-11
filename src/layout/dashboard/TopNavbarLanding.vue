<template>
  <nav class="navbar navbar-expand-lg navbar-light" :style="'background-color:'+color">
    <div class="container-fluid">
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
            <a class="dropdown-item" href="#" @click="closeSession">Cerrar sesión aquí</a>
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
      user:{}
    };
  },
  props:{
    color:{
      type:String,
      required:true
    }
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
      localStorage.clear()
      //this.redirect()
    },
    redirect(){
        this.$router.push({ name: "Login" })
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
