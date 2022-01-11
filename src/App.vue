<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"App",
  data() {
    return {
     
    }
  },
  mounted() {    
    localStorage.removeItem('_current_bussines_id')
    localStorage.removeItem('_current_event_id')

    axios.interceptors.response.use((response) => {
    
        return response;
    }, (error) => {
        console.log("Error response",error.response)
        if(error.response)
        if (error.response.status == 401){
            this.closeSession401()
        }
        
        return Promise.reject(error);
    })
  },
  methods: {
    async closeSession401(){
      //await this.logoutTracking()
      let res
      
      const event = await localStorage.getItem('_current_event_id')
      if(event)
        res = await localStorage.setItem('_current_event_id',event)
      const bm = await localStorage.getItem('_current_bussines_id')
      if(bm)
        res = await localStorage.setItem('_current_bussines_id',bm)
      localStorage.clear()

      const eventl = await localStorage.getItem('_current_event_id')
      const bml = await localStorage.getItem('_current_bussines_id')
      if(eventl){
        this.$router.push({ name: "landingEvent", query: { eventId: new Number(eventl) }, params:{event_id:new Number(eventl)} },()=>{
          //localStorage.clear()
        });
        return
      } else if(bml){
        
        this.$router.push({ name: "DetailBusinessMarket",params:{
          business_id: new Number(bml)
        } },()=>{
          //localStorage.clear()
        });
        return
      } else  {  
        
        this.$router.push({ name: "Login" });}
    },
    
  },
};
</script>

<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
