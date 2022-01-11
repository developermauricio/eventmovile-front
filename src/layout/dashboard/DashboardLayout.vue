<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        
        <sidebar-link to="/admin-users" name="Admin usuarios" icon="ti-id-badge" v-if="user.role === 'admin' || user.role === 'super admin'" />
        <!--<sidebar-link to="/dashboard" name="Dashboard" icon="ti-stats-up" v-if="user.role === 'admin' || user.role === 'super admin' || user.role === 'guest'"/>-->
        <sidebar-link to="/Ticket" name="Tickets" icon="ti-ticket" v-if="user.role === 'admin' || user.role === 'super admin'" />
        <sidebar-link to="/Halls" name="Salas" icon="ti-layout-grid2" v-if="user.role === 'admin' || user.role === 'super admin' || user.role === 'guest'" />
        <sidebar-link to="/events" name="Eventos" icon="ti-receipt" v-if="user.role === 'admin' || user.role === 'super admin' || user.role === 'guest'" />
        <sidebar-link to="/business-market" name="Ruedas de Negocios" icon="ti-world" v-if="user.role === 'admin' || user.role === 'super admin' || user.role === 'business market'" />
        <sidebar-link to="/mi-cuenta" name="Mi Cuenta" icon="ti-user" v-if="user.role === 'admin' || user.role === 'super admin' || user.role === 'business market'" />
        <sidebar-link to="/staff-access" name="Staff Accesos" icon="ti-user" v-if="user.role === 'admin' || user.role === 'super admin'" />
        <!--<sidebar-link to="/notifications" name="Notificaciones" icon="ti-bell" v-if="user.role === 'admin' || user.role === 'super admin'"/>-->
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell" :v-if="null">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>{{user.name}}</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbar from "./TopNavbar.vue";
  import ContentFooter from "./ContentFooter.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      user:{}
    }
  },
  created() {
    this.user = {
      id: localStorage.getItem('_current_user_id'),
      name: localStorage.getItem('_current_user_name'),
      role: localStorage.getItem('_current_role_name'),
    }
    /*
    // Echo.channel('User'+this.user.id)
    //     .listen('NotificationMeetingEvent', (e) =>{
         
    //     })*/
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
