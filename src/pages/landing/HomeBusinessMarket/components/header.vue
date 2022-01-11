<template>
        <!-- header -->
    <div class="header-main px-4 d-flex flex-column flex-md-row align-items-center">
        <div class="logo-main my-0 mr-md-auto font-weight-normal" >
            <img :src="url(businessMarket.logo)" v-if="businessMarket.logo"/>
        </div>
        <div class="dropdown" v-if="user.name">
          <ul :style="'list-style: none; background-color:'+businessMarket.principal_color+'; color:'+businessMarket.secondary_color+'; border:none; '" class="btn">
            <drop-down class="nav-item"
                  :title="user.name"
                  title-classes="nav-link"
                  icon="ti-user">
              <button class="dropdown-item" @click="clickProfile()">Perfil</button>
              <button class="dropdown-item" @click="closeSession">Cerrar sesión</button>
            </drop-down>
          </ul>
        </div>
        
    </div>
</template>
<script>
import logout from '@/pages/Auth/Login/logout';
export default {
  mixins: [logout],
    name:"headerCustom",
    props:{
      user:{},
      businessMarket:{}
    },
    created() {
      const idUser = localStorage.getItem('_current_user_id')
      
      // if(idUser)  
      //   Echo.channel('User'+idUser)
      //       .listen('NotificationMeetingEvent', (e) =>{
      //         this.$swal.fire({
      //             title:"Tiene una reunion en este momento?",
      //             showCancelButton: true,
      //             confirmButtonColor: '#3085d6',
      //             confirmButtonText:'Ingresar ahora',
      //             cancelButtonColor: '#d33',
      //             cancelButtonText:"No asistir",
      //             allowOutsideClick: false
      //         }).then(rta=>{
      //             if(rta.isConfirmed)
      //               this.sendToMeeting(e.data.id,this.businessMarket.id)
      //             else
      //               this.$swal("Cita rechazada")
      //         })    
      //       })
      //       .listen('FinishMeeting',e=>{
      //         //alert("Aqui")
      //         this.$emit("finish-meeting",e)
      //       })
      //       .listen('CreateMeetingEvent',e=>{
      //         this.$swal("Tienes una novedad en tus invitaciones!")
      //         this.$emit("update-invitations",e)
      //       })
      //       .listen('CancelMeetingEvent', e=>{
      //         this.$swal(e.data.title+" ha sido cancelada!")
      //         this.$emit("cancel-meeting",e)
      //       })
    },
    methods: {
      async closeSession(){
        //await this.logoutTracking()
        let params = {user: localStorage.getItem('_current_user_id')} 
        await axios.post('logout', params)
        localStorage.clear()
        this.$router.push({ name: "DetailBusinessMarket", params:{
          business_id: this.businessMarket.id
        } })
      },
      clickProfile(){
        this.$router.push({name:'userProfileBM', params:{id: this.businessMarket.id}})
      },
      sendToMeeting(meeting_id, business_id){
        this.$router.push({ name: "StreamingBusinessMarket", params:{
          business_id,meeting_id
        } })
      },
      url(src){
        return `${process.env.VUE_APP_API_URL}storage/${src}`
      },
    },
}
</script>