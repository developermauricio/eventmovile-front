<template>
     <!-- participantes -->
    <div class="row p-2">
        <div class="col-12  box-card">
            <div class="row">
                <div class="col-6 pt-3 text-left">
                    <h4 class="box-card__title">Networking/ {{dataChat.name}}</h4>
                </div>
                <div class="col-6 pl-5 pt-3 text-right"  v-if="showChat">
                    <button class="btn-arrow"  :style="'width:30%; border-radius: 5px;'" @click="hideChat">
                        <span class="ti-arrow-left"></span>
                    </button>
                </div>
            </div>
            
            <div class="row mt-3" v-if="showChat==false">
                <div class="col-6 text-right ">
                    <!-- <span class="ti-search search-icon"></span> -->
                    <input type="text" class="form-control float-left" placeholder="Buscar por nombre"  v-model="participantsSearch.search" @keyup="searchParticipan">
                </div>
                <div class="col-6 text-left">
                    <select  @change="filterOption" v-model="optionFilter"  class="custom-select float-right custom-sec-heart" style="">
                        <option>Todas</option>
                        <option>Aceptadas</option>
                        <option>Enviadas</option>
                        <option>Recibidas</option>
                    </select>
                </div>
            </div>
            <div class="row mt-4" v-if="showChat==false">
                <div class="col-md-12 mb-2" >
                <!-- participantes item -->
                        <div class="row p-0 border-top  justify-content-center align-self-center" v-for="item in participants" :key="item.id">
                            <div class="col-2 justify-content-center align-self-center">
                                <div class="activeUser align-middle" v-if="item.revoked == 0"></div>
                                <div class="inactiveUser" v-else ></div>
                            </div>
                            <div class="col-7 justify-content-center align-self-center">
                                <p class="subtitle-1 mt-3">
                                    {{item.name}}
                                    <br/>
                                    <b style="font-size:10px;" class="par-small">{{item.email}}</b>
                                </p>
                            </div>
                            <div class="col-3 justify-content-center align-self-center">
                                <button class="btn btn-outline-primary small" :id="item.networking"  @click.prevent="startChat(item)"
                                v-if="item.confirmed == 1 && item.guest_id == userId || item.confirmed == 1 && item.creator_id == userId">
                                    <span class="ti-comments"></span>
                                </button>
                                <button class="btn btn-outline-primary small m-0" :id="item.networking"
                                v-if="item.creator_id == null && item.guest_id == null"
                                @click.prevent="SendInvitation(item.user_id)">
                                    Invitar
                                </button>
                                <button class="btn btn-outline-primary small" :id="item.networking"
                                v-if="item.creator_id == userId && item.confirmed == 0">
                                    Esperando
                                </button>
                                <button class="btn btn-outline-primary small" @click.prevent="acceptInvitation(item)" :id="item.networking"
                                v-if="item.guest_id == userId && item.confirmed == 0">
                                    Aceptar
                                </button>
                            </div>
                        </div>  
                <!-- participantes item -->
                </div>
            </div>
                  <!-- chat -->
            <div class="row mt-4"  v-if="showChat">
                <div class="col-md-12">
                    <!-- streaming -->
                    <div class="row video-streaming main py-3 bg-standar rounded" v-if=render>
                        <div class="col-md-12">
                            <div class="embed-responsive embed-responsive-16by9">,
                                <iframe 
                                allow="microphone *; camera *; "
                                :src="urlZoom()"
                                ref="zoomFrame" 
                                id="iframe-zoom"   
                                @load="onReadyIframe"
                                v-if=render></iframe>
                            </div>
                        </div>
                    </div>
                    <!-- streaming -->
                    <div class="row chat-content" :class="{'chat-content-over': render}" id="scrollChat">
                        <!-- chat-item -->
                        <div v-for="mess in allMessages" :key="mess.id" class="col-11 border rounded pt-4 ml-3 mt-1 mb-1 relative chat-box ">
                            <span class="chat-autor">{{mess.name}}</span>
                            <span style="color:gray" class="chat-time">{{$moment(mess.created_at).format('HH:mm')}}</span>
                            <p style="color:gray" v-if="mess.message != 'Iniciar Video llamada'" class="chat-message mt-0">
                            {{mess.message}}
                            </p>
                            <button class="btn btn-primary m-1 p-1" @click="actionAfterClickZoomMeeting()" v-else>Iniciar Video llamada <span class="ti-video-camera"></span></button>

                        </div>
                        <!-- chat-item -->
                        
                    </div>
                    <div class="row border-top mt-2 chat-footer mb-1 p-0">
                        <div class="col-12 mt-2 chat-send">
                            <div :style="''" class="btn-video" @click.prevent="sendVideoCall()">
                                <span class="ti-video-camera"></span>
                            </div>
                            <div class="btn-send" @click.prevent="sendMessage()">
                                <span class="ti-location-arrow"></span>
                            </div>                      
                            <textarea 
                            @keyup.enter="sendMessage" v-model="message" class="form-control chat-textarea" name="chat">
                            </textarea>
                        </div>
                    </div>
                </div>  
            <!-- chat -->
            </div>
          
        </div>
        
    </div>
    <!-- participantes -->
</template>
<script>
export default {
    name:"externalNetworking",
    data(){
        return{
            allMessages:[],
            message:null,
            dataChat:{
                networking:null,
                name:"Init event",
                user:null,
            },
            showChat:false,
            optionFilter:"Todas",
            userId: localStorage.getItem('_current_user_id'),
            participantsSearch:{
                participants:[],
                search:""
            },
            participants:[],
            idEvent:null,
            idActivity:null,
            event:{},
            render:false,
            networking:{},
            readyMeet:{
                iframe: false,
                meetingData: false
            },
        }
    },
    props:['token'],
    mounted(){
        if(this.token){
            this.authByToken()
        }
    },
    beforeDestroy() {
      this.render = false
    },
    methods: {
        authByToken(){
            const toSend = {
                token: this.token
            }
            axios.post('loginCxsummit',toSend).then(res =>{
                const user = res.data
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
                localStorage.setItem("_current_user_name", user.name)
                localStorage.setItem("_current_user_lastname", user.lastname)
                localStorage.setItem("_current_user_id", user.id)
                localStorage.setItem("_current_user_email", user.email)
                localStorage.setItem("_current_role_id", user.roles[0].id)
                localStorage.setItem("_current_role_name", user.roles[0].name)
                localStorage.setItem("_current_model_id", user.model_id)
                localStorage.setItem("_current_token", user.token)
                this.userId = user.id
                this.idEvent = user.event_id
                this.idActivity = user.activity_id
                this.actionsAfterToken()
            })
        },
        actionsAfterToken(){
            // this.listen()
            this.getParticipants()
            this.getEvent()
        },
        sendVideoCall(){
            let params = {
                message: 'Iniciar Video llamada',
                networking_id: this.dataChat.networking,
                user_id: this.dataChat.user
            }
            this.message = ''
            axios.post('networkingMessages', params).then(item =>{
                this.getMessages()
            }).catch(error =>{
                this.$swal({icon:'error', text:error.response.data.error})
            })
        },
        sendMessage(){
            if(this.message == null)return
            let params = {
                message: this.message,
                networking_id: this.dataChat.networking,
                user_id: this.dataChat.user
            }
            this.message = null
            axios.post('networkingMessages', params).then(item =>{
                this.getMessages()
            }).catch(error =>{
                this.$swal({icon:'error', text:"Error al guardar informacíon: "+error})
            })

        },
        async getMessages(){
            let params = {pagination : false}
            const response = await axios.get(`networkingMessages/${this.dataChat.networking}`, {params})
            this.allMessages = response.data
            
            let scroll = document.getElementById('scrollChat')
            scroll.scrollTop=999
        },
        hideChat(){
            this.dataChat.name = null
            this.dataChat.networking=null
            this.dataChat.user=null
            this.showChat=false
            this.render = false
        },
        startChat(item){
            this.showChat = true
            this.render = false
            this.dataChat.networking = item.networking
            this.dataChat.name = item.name
            this.dataChat.user = item.user_id
            this.getMessages()
        },
        // listen(){
        //     Echo.channel('Networking'+this.userId)
        //         .listen('NetworkingEvent', (e) =>{
        //             if(e.data.guest_id == this.userId && e.data.confirmed == 0){
        //                 this.$swal.fire({
        //                     position: 'bottom-end',
        //                     text: e.data.creator_name+' te invita a un networking',
        //                     showConfirmButton: true,
        //                 })
        //             }
        //             if(e.data.creator_id == this.userId && e.data.confirmed == 1){
        //                 this.$swal.fire({
        //                     position: 'bottom-end',
        //                     text: e.data.guest_name+' acepto tu solicitud',
        //                     showConfirmButton: true,
        //                 })
        //             }
                    
        //             this.getParticipants()
        //         })
        //         .listen('NetworkingChatEvent', (ele) =>{
        //             if(this.dataChat.networking == null){
        //                 let btn = document.getElementById(ele.data.networking_id)
        //                 btn.classList.add("intermitente");
        //             }else{
        //                 this.getMessages()
        //             }
        //         })
        // },
        async SendInvitation(guest){
            let params = {
                guest_id : guest,
                activity_id: this.idActivity
            }
            await axios.post('networkings', params).catch(error=>{
                if(error.response.data.code == 422)
                    this.$swal({icon:'error', text:'Hubo un error con alguno de los datos enviados'})
                else
                    this.$swal({icon:'error', text:error.response.data.message})
            })
        },
        url(src){
            return `${process.env.VUE_APP_API_URL}storage/${src}`
        },
        async acceptInvitation(item){
            let params = {
                guest_id: this.userId,
                confirmed: 1,
                activity_id: this.idActivity
            }
            await axios.put(`networkings/${item.networking}`, params).catch(error=>{
                this.$swal({icon:'error', text:'Error al acceptar invitación'})
            })

        },
        getParticipants(){
            axios.get(`usersForEvent/${this.idEvent}?pagination=false`).then(response=>{
                this.participants = response.data
                this.participantsSearch.participants = response.data
            })
        },
        searchParticipan(){
            this.participants = this.participantsSearch.participants.filter(item =>(item.name.search(new RegExp(this.participantsSearch.search, "i")) !== -1))
        },
        filterOption(){
            if(this.optionFilter == "Aceptadas")
                this.participants = this.participantsSearch.participants.filter(item =>(item.confirmed == 1))
            
            if(this.optionFilter == "Recibidas")
                this.participants = this.participantsSearch.participants.filter(item =>(item.confirmed == 0 && item.guest_id == this.userId))
        
            if(this.optionFilter == "Enviadas")
                this.participants = this.participantsSearch.participants.filter(item =>(item.confirmed == 0 && item.creator_id == this.userId))

            if(this.optionFilter == "Todas")
                this.getParticipants()
        },
        async getEvent(){
            const response = await axios.get(`events/${this.idEvent}`).catch(error=>{
                this.$swal({icon:'error', text:error.response.data.message})
            })
            this.event = response.data[0]
        },
        urlZoom(){
        return `${process.env.VUE_APP_API_URL}zoom?close=true`
        },
        onReadyIframe(){
            this.readyMeet.iframe=true
            this.beforeSendDatatoIframe()
        },
        beforeSendDatatoIframe(){
            if(this.readyMeet.iframe && this.readyMeet.meetingData){
            this.sendDatatoIframe(this.networking.zoom_id, this.networking.zoom_pw)
            }
        },
        sendDatatoIframe(idZoom, pwZoom){
            const iframe = document.getElementById('iframe-zoom')
            const message = JSON.stringify({
            meetId: idZoom,
            username: 'Guest',
            passWord: pwZoom,
            leaveURL: 'https://google.com.co'})
            //console.log("String creado", message)
            iframe.contentWindow.postMessage(message,'*')
        },
        getNetworkingData(id){
            axios.get(`networkings/${id}`).then(res=>{
                this.networking = res.data
    
                this.readyMeet.meetingData = true
                this.render= true
                this.beforeSendDatatoIframe()
            })
        },
        actionAfterClickZoomMeeting(){
            this.getNetworkingData(this.dataChat.networking)
        }
    },
}
</script>
<style scoped>
.btn-video{
    width:35px;
    height: 35px;
    margin-bottom: 30px;
}
.btn-send{
    bottom: 0px !important;
}
.chat-autor{
    top:3px !important;
}
.chat-time{
    top: 3px !important;
}
.chat-content{
    max-height: 66vh;
    overflow-y: auto;
}
.chat-content-over{
    max-height: 50% !important;
    padding-bottom: 90px !important;
}
.chat-footer{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
}
.chat-textarea{
    max-height: 60px;
}
.custom-sec-heart{
    border: 0.7px solid #BE73E1; 
    box-shadow: 2px 2px 1px #9e97a13f;

}
.close {
    margin-left: 95%;
    border-radius: 10px;
    display:inline-block;
    padding:2px 5px;
    cursor: pointer;
}
.btn-arrow {
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}
.intermitente{
  box-shadow: 0px 0px 20px #4b4b4b;
  animation: infinite resplandorAnimation 2s;
  
}
@keyframes resplandorAnimation {
  0%,100%{
    box-shadow: 0px 0px 20px #4b4b4b;
  }
  50%{
  box-shadow: 0px 0px 0px #4b4b4b;
  
  }

}
.activeUser {
    
    width: 10px;
    height: 10px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #5cb85c;
}
.inactiveUser {
    
    width: 10px;
    height: 10px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #cccccc;
}
.networking {
    border-radius: 8px;
    width: 80%;
}
</style>