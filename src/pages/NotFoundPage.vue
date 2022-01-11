<template>
  <div class="contact-us full-screen">
    <nav class="navbar navbar-ct-default" role="navigation-demo">
      <div class="container">        
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navigation-example-2">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link :to="{path:'/'}">Home</router-link>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-->
    </nav>
    <div class="wrapper wrapper-full-page section content">
      <div class="">
        <div class="container" style="margin: 10% auto; text-align: center;">
          <div>
            <div>
              <h2>404 Not Found</h2>
              <h2>Oops! It seems that this page does not exist.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  mounted(){
    //validamos si existen datos de sesión
    let validIs = false
    let validTypeVal = ""
    let inSession = ""
    if(localStorage.getItem('eventId')){
      validTypeVal = "eventId"
      validIs=true;
      inSession = localStorage.getItem('eventId')
    }
    if(localStorage.getItem('_current_role_name')){
      validIs=true;
      
      validTypeVal = localStorage.getItem('_current_role_name')
    }     
      

    if(validIs)
      switch(validTypeVal){
        case 'guest':    
            console.log('guest')      
            this.$router.push({name:'landingEvent', params: {eventId:inSession} })
          break;
        case 'super admin':
          console.log('validado super admin')      
            this.$router.push({name:'Mis Eventos', })
          break;
        case 'admin':
          console.log('validado admin')      
          this.$router.push({name:'Mis Eventos', })                  
          break;
        case 'eventId':
          this.$router.push({name:'landingEvent', params: {eventId:inSession} })
          break;
        default:
          this.$router.push({ name: "notFoundPage"})        
          break;
      }        
  }
};
</script>
