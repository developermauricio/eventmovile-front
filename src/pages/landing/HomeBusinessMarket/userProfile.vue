<template>
  <div class="wrapper business" >

    <!-- header -->
    <header-custom :user=user :businessMarket=businessMarket @update-invitations="getInvitations(user.id)" @cancel-meeting="getSchedulle(user.id)"/>
    <!-- header -->

  <!-- content main -->
  <main class="content-main h-fixed">
    <div class="content-header">
        <div class="row m-0 p-0">
            <div class="col-10 m-0 p-0">
                <span class="subtitle">Rueda de Negocios /</span>
                <h3 class="title-main">
                {{businessMarket.name}}
                </h3>
            </div>
        
            <!--<div class="col-2 m-0 p-0 ">
                <router-link :to="{path:'/home-business-market/'+businessMarket.id}">
                    <button class="btn btn-outline-primary">
                        <span class="ti-arrow-circle-left"> </span>
                    Ir a ruedas de negocio
                    </button>
                </router-link>
            </div>-->
        </div>
    </div>
    
    <complete-profile @link_bussines="changeValueFunction"/>

    <div class="content-custom">
    <card class="card" title="">
        <div class="row"> 
            <div class=" col-12 m-0 p-0 ">
              <center>   
                <!--<router-link :to="{path:'/home-business-market/'+businessMarket.id}">-->
                    <button class="btn btn-outline-primary btn-lg" @click="toBusinessFunction()">
                        <span class="ti-arrow-circle-left">  </span>
                         Ir a ruedas de negocio
                    </button>
                <!--</router-link>-->
              </center>
            </div>  
        </div>
    </card>
    </div>
 
    <modal name="modal-notification"
         :width="900"
         :height="250"
         :adaptive="true"
         >
      
         <div class="container py-3" >
           <div slot="top-right">
              <button style="margin-left: 97%; border: none; border-radius: 10px; margin-top:7px" @click="$modal.hide('modal-notification')">
                  ❌
              </button>
            </div>
            <div class="row my-4">
              <div class="col-md-12 text-center">
                  <h3 class="h4" style="color:#614ba4">Bienvenido</h3>
                  <p>
                   Te invitamos a <b>completar tu perfil</b> en el siguente formulario<br>Podras mostrar tus productos y servicios relacionados de tu empresa a los demas asistentes
                  </p><br>
                  <h3 v-if="businessMarket.password"><b>Recuerda que tu contraseña de ingreso es: {{businessMarket.password}}</b></h3>
              </div>
            </div>
         </div>
    </modal>
  </main>
  <!-- content main -->


  </div>


</template>

<script>
    import completeProfile from "../UserProfile/EditProfileForm";
    import headerCustom from './components/header'

  export default {
    components:{
      headerCustom, completeProfile
    },
    props:['id','modal'],
    data(){
      return {
        link_bussines:false,
        company:{},
        listProducts:{},
        product:{},
        user: {},
        invitations:{},
        schedule:[],
        participants:[],
        participantsSearch:{
          participants:[],
          search:""
        },
        documents:[],
        businessMarket:{}
      }
    },
    watch: {

    },
    created() {
        
        this.user.id = localStorage.getItem('_current_user_id')
        this.getBusinessMarketData(this.id)
        this.getUserData()
    },
    mounted() {
       if(this.modal){
            this.$modal.show('modal-notification')
        } 
    },
    methods: {
        changeValueFunction(val){
          console.log("link:",val)
          this.link_bussines=val
        },
        toBusinessFunction(){
          if(this.link_bussines)
            this.$router.push({path:'/home-business-market/'+this.businessMarket.id})
          else
            this.$swal('Por favor registra al menos un producto')
        },
        getBusinessMarketData(id){
            axios.get(`business-market/${id}`).then(res=>{
            this.businessMarket = res.data
            })
        },
    
        url(src){
            return `${process.env.VUE_APP_API_URL}storage/${src}`
        },
        getUserData(){
        const role = localStorage.getItem('_current_role_name')
        const id = localStorage.getItem('_current_user_id')
        
            axios.get(`business-market-user/${id}`).then(data=>{
            this.user = data.data[0]

            })
        },
    
    },
  }
</script>
<style scoped>
  .wrapper{
    height: auto;
  }
  
</style>

