<template>
     <!-- participantes -->
    <div class="row  mb-3 networking" style="background-color:#fff">
        <span @click="hideNet" :style="'color:'+event.third_color+'; border-color:'+event.second_color+' ;background-color:'+event.second_color+';'" class="close">X</span>
        <div class="col-md-12  p-4 box-card">
            <div class="row">
                
                    <div class="col-md-6 pt-3 text-left">
                        <h4  :style="'color:'+event.second_color" class="box-card__title">Networking/ {{dataChat.name}}</h4>
                    </div>
                    <div class="col-md-6 pl-5 pt-3 text-right"  v-if="showChat">
                        <button class="btn-arrow"  :style="'width:30%; border-color:'+event.third_color+' ;background-color:'+event.second_color+'; border-radius: 5px;'" @click="hideChat">
                            <span class="ti-arrow-left"></span>
                        </button>
                    </div>
                
                
                <div class="row" v-if="showChat==false">
                    <div class="col-md-6 pt-3 text-right" style="padding-left: 8%;">
                        <!-- <span class="ti-search search-icon"></span> -->
                        <input type="text" :style="'color:'+event.second_color" class="search-input" :placeholder="$t('pages.Events.components.networking.searchByName')"  v-model="participantsSearch.search" @keyup="searchParticipan">
                    </div>
                    <div class="col-md-6 pl-5 pt-3 text-left">
                        
                        <select :style="'color:'+event.second_color" @change="filterOption" v-model="optionFilter"  class="search-input">
                            <option >{{ $t('pages.Events.components.networking.online') }}</option>
                            <option>{{ $t('pages.Events.components.networking.all') }}</option>
                            <option>{{ $t('pages.Events.components.networking.accepted') }}</option>
                            <option>{{ $t('pages.Events.components.networking.sent') }}</option>
                            <option>{{ $t('pages.Events.components.networking.received') }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row mt-4 participantes-content" style="height: 40vh;" v-if="showChat==false">
                <div class="col-md-12 mb-2" >
                <!-- participantes item -->
                    <div class="participantes-item row p-2"  v-for="item in participants" :key="item.id" >
                        <div class="col-2">
                            <div class="activeUser" v-if="item.revoked == 0"></div>
                            <div class="inactiveUser" v-else ></div>
                        </div>
                        <div class="col-md-7">
                            <span v-if="item.name" >
                                <span class="subtitle-1">{{item.empresa}}</span>
                                <span class="mt-1" style="font-size: 16px;">{{first_letter_uppercase_word(item.name)}} {{first_letter_uppercase_word(item.lastname)}}</span>                                
                                <p style="font-size: 12px;">{{item.cargo}}</p>
                                <!--<b style="font-size:10px;" class="par-small">{{item.email}} email ya no va </b>-->
                            </span>
                        </div>
                        <div class="col-md-3">
                            <button class="btn btn-outline-primary small" :id="item.networking"  @click.prevent="startChat(item)"
                             :style="'color:'+event.third_color+'; border-color:'+event.second_color+' ;background-color:'+event.second_color+';'"
                            v-if="item.confirmed == 1 && item.guest_id == userId || item.confirmed == 1 && item.creator_id == userId">
                                <span class="ti-comments"></span>
                            </button>
                            <button class="btn btn-outline-primary small" :id="item.networking"
                            :style="'color:'+event.third_color+'; border-color:'+event.second_color+' ;background-color:'+event.second_color+';'"
                            v-if="item.creator_id == null && item.guest_id == null"
                            @click.prevent="SendInvitation(item, item.user_id)">
                                {{ $t('pages.Events.components.networking.invite') }}
                            </button>
                            <button class="btn btn-outline-primary small" :id="item.networking"
                            :style="'color:'+event.third_color+'; border-color:'+event.second_color+' ;background-color:'+event.second_color+';'"
                            v-if="item.creator_id == userId && item.confirmed == 0">
                                {{ $t('pages.Events.components.networking.waiting') }}
                            </button>
                            <button class="btn btn-outline-primary small" @click.prevent="acceptInvitation(item, userId)" :id="item.networking"
                            v-if="item.guest_id == userId && item.confirmed == 0">
                                {{ $t('pages.Events.components.networking.accept') }}
                            </button>
                        </div>
                    </div>
                <!-- participantes item -->
                </div>
            </div>
                  <!-- chat -->
                <div class="row mt-4"  v-if="showChat">
                <div class="col-md-12">
                    <div class="row chat-content" id="scrollChatNet" style="overflow-y: scroll; height: 280px;">

                        <!-- chat-item -->
                        <div v-for="(mess, index) in allMessages" :key="index" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                            <span :style="'color:'+event.second_color" class="chat-autor">{{ first_letter_uppercase_word(mess.name)}} {{first_letter_uppercase_word(mess.lastname)}}</span>
                            <span style="color:gray" class="chat-time">{{$moment(mess.created_at).format('HH:mm')}}</span>
                            <pre style="color:gray; font-size:12px;" v-if="mess.message != 'Iniciar Video llamada'" class="chat-message mt-2">{{mess.message}}</pre>
                            <router-link target="_blank" :to="{name:'Networking', params: {networking_id:dataChat.networking, event_id:event.id, session:sessionData, activityId:activityId} }" v-else>
                                <button :style="'background-color:'+event.second_color+'; border-color:'+event.second_color" class="btn btn-primary" >Iniciar Video llamada <span class="ti-video-camera"></span></button>
                            </router-link>
                        </div>
                        <!-- chat-item -->
                    </div>
                    <!-- chat footer -->
                    <div class="row border-top mt-2 chat-footer">
                        <div class="col-md-12 mt-4 chat-send">
                            <div :style="'width:35px; higth:35px; margin-bottom: 10%; background-color:'+event.second_color" class="btn-video" @click.prevent="sendVideoCall()">
                                <span class="ti-video-camera"></span>
                            </div>
                            <div v-if="req_videocall" :style="enableButtonSendChatNetworking" class="btn-send" @click.prevent="sendMessage()">
                                <span class="ti-location-arrow"></span>
                            </div>                      
                            <textarea maxlength="250"  :style="'border: 0.7px solid '+event.second_color+' !important;'" 
                             v-model="message" class="form-control chat-textarea" name="chat">
                            </textarea>
                        </div>
                    </div>
                    <!-- chat footer -->
                </div>
                
            <!-- chat -->
            </div>
          
        </div>
    </div>
    <!-- participantes -->
</template>
<script>
import getlang from "@/lang/index.js";
export default {
    name:"networkingEvent",
    data(){
        return{
            allMessages:[],
            message:null,
            dataChat:{
                networking:null,
                name:null,
                user:null,
            },
            showChat:false,
            optionFilter:"Online",
            userId: localStorage.getItem('_current_user_id'),
            userName: localStorage.getItem('_current_user_name'),
            userLastName: localStorage.getItem('_current_user_lastname'),
            participantsSearch:{
                participants:[],
                search:""
            },
            participants:[],
            idEvent:null,
            idActivity:null,
            event:[],
            sessionData : "",
            topicUser:'',
            topic_secundary: '',
            receive_message:null,
            send_message:null,
            activeEnableButtonChatNetworking:false,
            enableButtonSendChatNetworking:'background-color: rgb(179, 177, 177); pointer-events: none;'
        }
    },
    props:{
        eventId:{
            required:true
        },
        activityId:{
            required:true
        },
        req_videocall:{
            required:true
        }
    },
    mounted(){
        this.$parent.inNetworking = true
        if(this.eventId){
            // this.listen()
            this.idEvent = this.eventId
            this.getParticipants()
            this.getEvent() 
            this.subscriptionMqtt()
            this.listenMQTT()
        }
        if(this.activityId){
            this.idActivity = this.activityId
        }
        
        let obj = {}
        Object.keys(localStorage).forEach(item => {
        
            if(item)
                obj[item] = localStorage.getItem(item) ? localStorage.getItem(item) : "";
        })
        this.sessionData = window.btoa(JSON.stringify(obj))
        //cargar online por defento
        this.loadOnline()        
    },
    beforeDestroy(){
        this.$parent.inNetworking = false
    },
    watch:{
        message:function(val){
        let messages_new=new RegExp(/([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]+[\s]{0,40})$/gm);
        let response_ = messages_new.test(val);
        if(response_){
            this.activeEnableButtonChatNetworking=true
            this.enableButtonSendChatNetworking='background-color: #8e04cc; pointer-events: auto;'
        }else{
            this.activeEnableButtonChatNetworking=false
            this.enableButtonSendChatNetworking='background-color: rgb(179, 177, 177); pointer-events: none;'
        }
        }
    },
    methods: {
        loadOnline(){            
            this.participants = this.participantsSearch.participants.filter(item =>(item.revoked == 0))
            if(this.participants.length==0){
                 setTimeout(()=>{
                     this.loadOnline()
                },100)
            }
        },
        first_letter_uppercase_word(str){                      
            if(str && str.length > 0){            
                return str.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())        
            }
        },
        getLanguage(){
            this.$i18n.locale = getlang.getLanguage();
        },
        hideNet(){
            this.$emit('showNetworking')
            this.$parent.inNetworking = false
        },
        sendVideoCall(){
            if(this.req_videocall){
                // let params = {
                //     message: 'Iniciar Video llamada',
                //     networking_id: this.dataChat.networking,
                //     user_id: this.dataChat.user
                // }
                // this.message = ''
                // axios.post('networkingMessages', params).then(item =>{
                //     console.log("videollamada:", item);
                //     this.getMessages()
                //     const topic_getMessages = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+item.data.data.guest_id+'/networking/getMessages/';
                //     const topic_getMessages2 = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+item.data.data.user_id+'/networking/getMessages/';
                //     this.mqttConection.publish(topic_getMessages, JSON.stringify({"update": true}))
                //     this.mqttConection.publish(topic_getMessages2, JSON.stringify({"update": true}))
                // }).catch(error =>{
                //     this.$swal({icon:'error', text:error.response.data.error})
                // })

                // const topic_getMessages = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+this.receive_message.user_id+'/networking/getMessages/';
                // const topic_getMessages2 = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+this.send_message.user_id+'/networking/getMessages/';
                // this.mqttConection.publish(topic_getMessages, JSON.stringify(params))
                // this.mqttConection.publish(topic_getMessages2, JSON.stringify(params))


                let params = {
                    message: 'Iniciar Video llamada',
                    networking_id: this.dataChat.networking,
                    user_id: this.dataChat.user
                }
                
                axios.post('networkingMessages', params).then(item =>{
                let params_2 = {
                    message: 'Iniciar Video llamada',
                    user_id: this.send_message.user_id,
                    name: this.send_message.name,
                    lastname: this.send_message.lastname
                }
                this.message = ''
                const topic_getMessages = this.topic_secundary+'/'+this.getTopicChatNetworking()+'/networking/getMessages';
                this.mqttConection.publish(topic_getMessages, JSON.stringify(params_2))
                }).catch(error =>{
                    this.$swal({icon:'error', text:error.response.data.error})
                })

            }

        },
        sendMessage(){
            // if(this.message == null)return
            // let params = {
            //     message: this.message,
            //     networking_id: this.dataChat.networking,
            //     user_id: this.dataChat.user
            // }
            // this.message = null
            // axios.post('networkingMessages', params).then(item =>{
            //     console.log("item cuando envio el mensaje:",item)
            //     // this.getMessages()
            //     const topic_getMessages = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+item.data.data.guest_id+'/networking/getMessages/';
            //     const topic_getMessages2 = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+item.data.data.user_id+'/networking/getMessages/';
            //     console.log('bsudusabd:',topic_getMessages2)
            //     console.log('bsudusabd1:',topic_getMessages)
            //     this.mqttConection.publish(topic_getMessages, JSON.stringify(item.data.data))
            //     this.mqttConection.publish(topic_getMessages2, JSON.stringify(item.data.data))
            // }).catch(error =>{
            //     this.$swal({icon:'error', text:error.response.data.error})
            // })
            
            // const topic_getMessages = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+this.receive_message.user_id+'/networking/getMessages/';
            // const topic_getMessages2 = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+this.send_message.user_id+'/networking/getMessages/';
            // console.log('RecibeMensaje:', topic_getMessages);
            // console.log('EnviaMensaje:', topic_getMessages2);
            // this.mqttConection.publish(topic_getMessages, JSON.stringify(params))
            // this.mqttConection.publish(topic_getMessages2, JSON.stringify(params))
            if(this.message == null)return
            if(this.message){
                let params = {
                    message: this.message,
                    networking_id: this.dataChat.networking,
                    user_id: this.dataChat.user
                }
                axios.post('networkingMessages', params).then(item =>{
                    console.log("item cuando envio el mensaje:",item.data.data)
                let params_2 = {
                    message: this.message,
                    user_id: this.send_message.user_id,
                    name: this.send_message.name,
                    lastname:this.send_message.lastname,
                    created_at: item.data.data.created_at
                }
                this.message = ''
                const topic_getMessages = this.topic_secundary+'/'+this.getTopicChatNetworking()+'/networking/getMessages';

                const topic_sendMessage = this.topic_secundary+'/'+this.receive_message.user_id+'/networking/messages_receive';

                this.mqttConection.publish(topic_getMessages, JSON.stringify(params_2))
                this.mqttConection.publish(topic_sendMessage, JSON.stringify(params_2))

                }).catch(error =>{
                    this.$swal({icon:'error', text:error.response.data.error})
                })
            }
        },
        async getMessages(){
            let params = {pagination : false}
            const response = await axios.get(`networkingMessages/${this.dataChat.networking}`, {params})
            console.log("respondiendo get:",response.data);
            if(response.data.length && response.data.length>0){
                response.data.reverse().map((e)=>{
                this.allMessages.push({
                    message: e.message,
                    user_id: e.creator_id,
                    name: e.name,
                    lastname:e.lastname,
                    created_at: e.created_at
                })
                })
                // this.allMessages = response.data
                this.scrollEnd()
                setTimeout(() => {
                    this.scrollEnd()
                }, 2000);
            }

        },
        getMessages2($data, _this){
            this.allMessages.push($data)
            this.scrollEnd()
            setTimeout(() => {
                this.scrollEnd()
            }, 500);
        },
        scrollEnd(){
            if(document.getElementById('scrollChatNet') && document.getElementById('scrollChatNet').scrollHeight){
                document.getElementById('scrollChatNet').scrollTop = document.getElementById('scrollChatNet').scrollHeight
            }
            // console.log("Holamkmkmk:",document.getElementById('scrollChatNet').scrollHeight);
            
        },
        hideChat(){
            this.dataChat.name = null
            this.dataChat.networking=null
            this.dataChat.user=null
            this.showChat=false
        },
        startChat(item){
            // this.receive_message = item;
            let  receive_message= 0
            let send_message = 0
          
            if(this.receive_message && this.receive_message.user_id){
                receive_message = this.receive_message.user_id
            }
            if(this.send_message && this.send_message.user_id){
                    send_message = this.send_message.user_id
            }
            const topic_getMessages = this.topic_secundary+'/'+this.getTopicChatNetworking()+'/networking/getMessages';
            this.unsubscriptionMqtt(topic_getMessages)
            this.allMessages= []
            this.receive_message = {
                user_id:item.user_id,
                name:item.name,
                lastname: item.lastname
            }
            this.send_message = {
                user_id:this.userId,
                name:this.userName, 
                lastname:this.userLastName
            }
            this.showChat = true
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
        //                     text: e.data.creator_name+' quiere conectar contigo',
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
        async SendInvitation(item, guest){
             console.log("item**:",item)   
            let params = {
                guest_id : guest,
                activity_id: this.idActivity,
            }
            await axios.post('networkings', params).then((data)=>{
                // console.log("SendInvitation:",data.data.data)
                 console.log("item***:",item.networking)  
                let params = {
                    item : {"networking":data.data.data.id},
                    creator_id:data.data.data.creator_id,
                    creator_name: data.data.data.creator_name,
                    guest_id:data.data.data.guest_id,
                    guest_name:data.data.data.guest_name
                }
                console.log("data.data.data:",data.data.data)
                // const topic_of_guest ='eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+params.guest_id+'/creator_invitation/'+params.creator_id
                const topic_of_guest = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+data.data.data.guest_id+'/networking/guest_invitation/';
                const topic_of_creator = this.topicUser+'/networking/creator_invitation/'
                console.log('topic guest ===>', topic_of_guest);
                console.log('topic creator ===>', topic_of_creator);
                // topic = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+params.guest_id+'/invitation'

                this.mqttConection.publish(topic_of_guest, JSON.stringify(params))
                this.mqttConection.publish(topic_of_creator, JSON.stringify(params))
                // this.mqttConection.publish(topic_of_creator, JSON.stringify(data.data.data.guest_id))
            }).catch(error=>{
                if(error.response.data.code == 422)
                    this.$swal({icon:'error', text:'Hubo un error con alguno de los datos enviados'})
                else
                    this.$swal({icon:'error', text:error.response.data.message})
            })
        },
        url(src){
            return `${process.env.VUE_APP_API_URL}storage/${src}`
        },
        async acceptInvitation(item,user_id){
            console.log('Entro a accept invitation:', item);
            let params = {
                guest_id: user_id,
                confirmed: 1,
                activity_id: this.idActivity
            }
            await axios.put(`networkings/${item.networking}`, params).then((data)=>{
                if(data.data && data.data.data && data.data.data.creator_id && data.data.data.confirmed && data.data.data.confirmed==1){
                    const topic_of_creator = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+data.data.data.creator_id+'/networking/creator_invitation/';
                     this.mqttConection.publish(topic_of_creator, JSON.stringify({data:true}))
                    console.log("Data cuando acepta la invitacion:",data);
                }
                
                
            })
            .catch(error=>{
                this.$swal({icon:'error', text:'Error al acceptar invitación'})
            })
            this.getParticipants();
        },
        getParticipants(){
            axios.get(`usersForEvent/${this.idEvent}?pagination=false`).then(response=>{
                this.participants = response.data
                this.participantsSearch.participants = response.data
            })
        },
        searchParticipan(){
            //esto es una busqueda por nombre no mas
            this.participants = this.participantsSearch.participants.filter(item =>(item.name.search(new RegExp(this.participantsSearch.search, "i")) !== -1))
        },
        filterOption(){
            if(this.optionFilter == "Online")
                this.participants = this.participantsSearch.participants.filter(item =>(item.revoked == 0))

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
        subscriptionMqtt(){
            this.mqttConection = this.$mqtt()
            this.topicUser = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking/'+this.userId;
            this.topic_secundary = 'eventmovil/'+this.eventId+'/'+this.activityId+'/networking'
            const _this = this;
            this.mqttConection.subscribe(this.topicUser+'/#', function (err, res) {    
                if (err) {
                    console.log('🚨 Error when subscribing to topic ' + _this.topicUser + ': ' + err);
                    return;
                } 
                else {
                    console.log("subscribed a user_id "+_this.topicUser)
                }    
            });

            this.mqttConection.subscribe(this.topic_secundary +'/#', function (err, res) {    
                if (err) {
                    console.log('🚨 Error when subscribing to topic ' + _this.topic_secundary + ': ' + err);
                    return;
                } 
                else {
                    console.log("subscribed a user_id "+_this.topic_secundary)
                }    
            });
        },
        unsubscriptionMqtt(topic){
            this.mqttConection.unsubscribe(topic)
        },
        listenMQTT(){
            const _this = this;
            this.mqttConection.on('message', function (topic, message) {
                console.log('=====> topic', topic)
                // if (topic==_this.topicUser+'/networking/guest_invitation/') {
                //     const msg = JSON.parse(message);
                //     _this.$swal.fire({
                //         position: 'bottom-end',
                //         text: msg.creator_name+' quiere conectar contigo',
                //         showConfirmButton: true,
                //     }).then((result)=>{
                //             const topic_of_creator = 'eventmovil/'+_this.eventId+'/'+_this.activityId+'/networking/'+msg.creator_id+'/networking/guest_i_agree/';
                //             if(result.isConfirmed){
                //                 _this.mqttConection.publish(topic_of_creator, JSON.stringify({"i_agree": true, "item":msg.item,  "guest_name":msg.guest_name,  "guest_id":msg.guest_id}))
                //             } else {
                //                 _this.mqttConection.publish(topic_of_creator, JSON.stringify({"i_agree": false, "guest_name":msg.guest_name}))
                //             }
                //     })

                //     _this.getParticipants()          
                     
                //     // console.log("message:",message)
                // }
                
                if(topic==_this.topicUser+'/networking/creator_invitation/'){
                    _this.getParticipants() 
                }
                if (topic==_this.topicUser+'/networking/guest_i_agree/') {
                    const msg = JSON.parse(message);
                    if(msg.i_agree) {
                        _this.$swal.fire({
                            position: 'bottom-end',
                            text: msg.guest_name+' acepto tu solicitud',
                            showConfirmButton: true,
                        }).then((result)=>{
                            const topic_of_creator = 'eventmovil/'+_this.eventId+'/'+_this.activityId+'/networking/'+msg.guest_id+'/networking/getParticipants/';
                            if(result.isConfirmed){
                                _this.mqttConection.publish(topic_of_creator, JSON.stringify({"update": true}))
                            }
                        })
                        console.log('=====> msg.item', msg.item)
                        _this.acceptInvitation(msg.item, msg.guest_id);
                        _this.getParticipants()
                    } else {
                        _this.$swal.fire({
                            position: 'bottom-end',
                            text: msg.guest_name+' no acepto tu solicitud',
                            showConfirmButton: true,
                        })
                    }
                    
                }
                
                if (topic==_this.topicUser+'/networking/getParticipants/') { 
                   _this.getParticipants() 
                }
                
                if (topic==_this.topicUser+'/networking/getMessages/') { 
                //    _this.getMessages()
                   const messageJSON = JSON.parse(message.toString())
                   _this.getMessages2(messageJSON, _this)
                }
                
                if(topic==_this.topic_secundary+'/'+_this.getTopicChatNetworking()+'/networking/getMessages'){
                   const messageJSON = JSON.parse(message.toString())
                   console.log("Nuevo topic:",messageJSON);
                   _this.getMessages2(messageJSON, _this)
                }
                // console.log("networking:",topic)
                // console.log("networking message:",message)
            });
      },
      getTopicChatNetworking(){
        let user_id_1=0
        let user_id_2=0
        if(this.receive_message && this.receive_message.user_id && this.send_message && this.send_message.user_id ){
            if(this.receive_message.user_id >this.send_message.user_id){
                user_id_1=this.send_message.user_id
                user_id_2=this.receive_message.user_id
            }
            else{
                user_id_1=this.receive_message.user_id
                user_id_2=this.send_message.user_id
            }
        }
        return user_id_1+'_'+user_id_2
      },
    },
}
</script>
<style scoped>
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
    margin-top: 80%;
    width: 10px;
    height: 10px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #5cb85c;
}
.inactiveUser {
    margin-top: 80%;
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