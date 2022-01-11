<template>
  <div class="wrapper business" :style="'background-color:'+event.first_color">

  <!-- header -->

  <!-- content main -->
  <main class="content-main">
    <div class="content-header">
        <h3 :style="'color:'+event.third_color" class="title-main">
          Networking
        </h3>
    </div>

    <div class="row mt-4">
      <!-- col 1 -->
      <div class="col-md-9">
        <!-- streaming -->
        <div class="row video-streaming main mb-4 py-3 bg-standar rounded">
        <!-- video -->
          <div class="col-md-12">
            <implementing-agora :meetingId="'networking_'+networking_id"></implementing-agora>
            <!--<div class="embed-responsive embed-responsive-16by9" style="min-height:500px">,
              <iframe 
                allow="microphone *; camera *; "
                :src="urlZoom()"
                ref="zoomFrame" 
                id="iframe-zoom"   
                @load="onReadyIframe"
                v-if="render">
              </iframe>
            </div>-->
          </div>
        <!-- video -->
        </div>
        <!-- streaming -->
      </div>
      <!-- col 1 -->

      <!-- col 2 -->
      <div class="col-md-3">
        <div class="row">
          
          <!-- chat, document, calendar -->
          <div class="col-md-12 border-top border-right border-bottom rounded-right" style="max-width: 100%; background-color:#fff">
            <!-- tabs -->
            <div class="row">
              <div class="col-md-11 border-bottom m-auto">
                <div class="row p-2">
                  <!-- tab -->
                  <div class="col border-right text-center" @click="showComponent('chat')">
                    <button :style="'color:'+event.third_color+'; background-color:'+event.second_color" class="btn btn-outline-primary border-0 p-2 m-0">
                      <span class="ti-comments h3"></span>
                    </button>
                  </div>
                  <!-- tab -->
                </div>
              </div>
            </div>
            <!-- tabs -->

            <!-- chat -->
            <div class="row chat main" id="scrollChat" v-if="showChat">
              <!-- chat-item -->
              <div v-for="mess in allMessages" :key="mess.id" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                <span :style="'color:'+event.second_color" class="chat-autor">{{mess.name}} {{mess.lastname}}</span>
                <span :style="'color:'+event.second_color" class="chat-time">{{$moment(mess.created_at).format('HH:mm')}}</span>
                <pre style="color:gray; font-size:12px;" class="chat-message mt-2">{{mess.message}}</pre>                
              </div>
              <!-- chat-item -->

            </div>

            <!-- chat-footer -->
            <div class="row border-top mt-2" v-if="showChat">
              <div class="col-md-12 mt-4 chat-send">
                <div :style="enableButtonSendChatVideoCall" class="btn-send" @click.prevent="sendMessage()">
                  <span class="ti-location-arrow"></span>
                </div>
                <textarea maxlength="250" :style="'border: 0.7px solid '+event.second_color+' !important; height: 100%;padding-top: 8%;'"  v-model="message" 
                 class="form-control" name="chat" id=""></textarea>
              </div>
              <div class="col-md-12 mt-3">
              </div>
            </div>
            <!-- chat-footer -->
            <!-- chat -->
  
          </div>
          <!-- chat, document, calendar -->
        </div>
      </div>
      <!-- col 2 -->

    </div>

  </main>
  <!-- content main -->


  </div>


</template>


<script>

import implementingAgora from '@/components/Agora/agoraComponent'


  export default {
    props:{
      networking_id:{},
      event_id:{},
      activityId:{},
    },
    components:{
      implementingAgora
    },
    data(){
      return {
        event:[],
        userId:null,
        schedule:[],
        messageFinisheMeeting:{
          show:''
        },
        readyMeet:{
          iframe: false,
          meetingData: false
        },
        nextMeeting:{},
        documents:[],
        uri: process.env.VUE_APP_API_URL,
        allMessages:[],
        message:null,
        showChat:true,
        showDoc:false,
        showSchedule:false,
        businessMarket:{},
        networking:{},
        user:{},
        userGuess:{},
        invitations:{},
        company:{},
        listProducts:[],
        zoomFrame:{},
        render:false,
        timeRemain:'',
        timeRemainNextMeet:'',
        feedback:{
          answered:"false"
        },
        topicUser:'',
        topic_secundary:'',
        user_id_1:0,
        user_id_2:0,
        activeEnableButtonChatVideoCall:false,
        enableButtonSendChatVideoCall:'background-color: rgb(179, 177, 177); pointer-events: none;'
      }
    },
    created() {

      this.getNetworkingData(this.networking_id)
      this.user = {
        id: localStorage.getItem('_current_user_id'),
        name: localStorage.getItem('_current_user_name'),
        role: localStorage.getItem('_current_role_name'),
      }
      this.render = true
      this.getMessages()
      this.subscriptionMqtt()
      this.listenMQTT()
    },
    mounted() {
    //   window.addEventListener("keypress", function(event){
    // if (event.keyCode == 13){
    //     event.preventDefault();
    // }
    // }, false);
      this.messageFinisheMeeting.show = 'infoFinishMeeting'
      if(this.networking_id){
        // this.listen()
      }
      if(this.event_id){
        this.getEvent()
      }        
    },
    beforeDestroy() {
      this.render = false
    },
    watch:{
      message: function (val){
        let messages_new=new RegExp(/([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]+[\s]{0,40})$/gm);
        let response_ = messages_new.test(val);
        if(response_){
          this.activeEnableButtonChatVideoCall = true
          this.enableButtonSendChatVideoCall = 'background-color: rgb(5, 5, 5); pointer-events: auto;'
        }else{
          this.activeEnableButtonChatVideoCall = false
          this.enableButtonSendChatVideoCall = 'background-color: rgb(179, 177, 177); pointer-events: none;'
        }
      }
    },
    methods: {
      async getEvent(){
        const response = await axios.get(`events/${this.event_id}`).catch(error=>{
            this.$swal({icon:'error', text:error.response.data.message})
        })
        this.event = response.data[0]
      },
      verifyAnsweredFeedback(){
        if(this.feedback.answered === "false"){
          this.messageFinisheMeeting.show = "feedback"
        } else {
          this.$router.push({ name: "HomeBusinessMarket", params:{
            id:this.business_id
          } })
        }
      },
      validateSurveyAnswers(data){
        console.log("To validate", data)
        let activeMessageError = false
        data.map(item=>{
          if(item.answer === 0){
            activeMessageError = true
          }
        })

        if(activeMessageError){
          return false
          }
        else 
          return true
      },
      sendAnswersFeedback(){
        if(!this.validateSurveyAnswers(this.feedback.questions)){
          this.$swal({icon:'error', text:'Falta campos por llenar'})
          return
        }

        let count = 0 
        const self = this
        this.feedback.questions.map(async item=>{
          const forSend = {
            business_id: this.business_id,
            user_id:this.user.id,
            feedback_question_id: item.id,
            value:item.answer
          }
          let res = ""
          if(item.answer !== '')
            res = await axios.post(`feedback-answer`,forSend)

          if(res !== ""){
              this.feedback.answered = "true"
              count++
          }
          
          if(this.feedback.questions.length === count){
              
              this.$swal('Respuestas enviadas')
              self.$router.push({ name: "HomeBusinessMarket", params:{
                id:self.business_id
              }})
              
            }
        })
      },
      getFeedBackQuestions(user_id){
        axios.get(`feedback-question/${this.business_id}`).then(data=>{
          const tmp2 = data.data.questions.map(item=>{
            return {
              ...item,
              options:JSON.parse(item.options),
              answer:0
            }
          })

          this.feedback = {
            questions:tmp2,
            answered:data.data.questions.length === 0 ? "true" : data.data.answered 
          }

        })
      },
      endMeetingButton(){
        this.messageFinisheMeeting.show ='confirmEnding'
        this.$modal.show('modal-notification')
      },
      EndingTimeMeeting(){
        axios.put(`meeting/${this.networking_id}`,{
          state:3
        }).then(res=>{
          this.messageFinisheMeeting.show = 'infoFinishMeeting'
          this.$modal.show('modal-notification')
          //this.$swal("Cita terminda correctamente")
        })
      },
      FinishMeetingInfo(){
        this.messageFinisheMeeting.show = 'infoEnding'
        this.$modal.show('modal-notification')
      },
      updateDinamicMeeting(state){
        axios.put(`meeting/${this.networking_id}`,{
          state
        }).then(res=>{
          this.$router.push({ name: "HomeBusinessMarket", params:{
            id:this.business_id
          } })
          //this.$swal("Cita terminda correctamente")
        })
      },
      urlZoom(){
        return `${process.env.VUE_APP_API_URL}zoom?close=true`
      },
      onReadyIframe(){
        this.readyMeet.iframe=true
        this.beforeSendDatatoIframe()
      },
      
      // listen(){
      //   Echo.channel('Chat'+this.networking_id)
      //   .listen('ChatMeet', (e) =>{
      //     this.getMessages()
      //   })
      // },
      async getMessages(){
        let params = {
          pagination : false
        }
        const response = await axios.get(`networkingMessages/${this.networking_id}`, {params})
        this.allMessages = []
        if(response.data && response.data.length>0){
          this.allMessages = response.data.reverse()
          this.scrollEnd()
          setTimeout(() => {
            this.scrollEnd()
          }, 500);
        }

        
        
        // let scroll = document.getElementById('scrollChat')
        // scroll.scrollTop=999
      },
      getMessages2($data){
        console.log("data",$data)
        this.allMessages.push($data)
        this.scrollEnd()
        setTimeout(() => {
          this.scrollEnd()
        }, 500);
      },
       sendMessage(){
        let user
        if(this.networking.creator_id == this.user.id) user = this.networking.guest_id
        else user = this.networking.creator_id
        
        let params = {
            message: this.message,
            networking_id: this.networking.id,
            user_id: user
        }
        console.log("hola mensaje:",this.message);
        if(this.message!='\r' || this.message!='\n'){
          if(this.message){
        //             axios.post('networkingMessages', params).then(item =>{
        //     // this.getMessages()
        //     let guest_id = 0
        //     let creator_id = 0
        //     console.log("Hola data:",item.data.data);
        //     if(item.data.data.guest_id !=item.data.data.creator_id){
        //       guest_id = item.data.data.guest_id
        //       creator_id = item.data.data.creator_id
        //     }else{
        //       if(item.data.data.guest_id!=item.data.data.user_id){
        //           guest_id = item.data.data.guest_id
        //           creator_id = item.data.data.user_id
        //       }else{
        //         guest_id = item.data.data.user_id
        //         creator_id = item.data.data.creator_id
        //       }
        //     }
        //     const topic_getMessages = 'eventmovil/'+this.event_id+'/'+this.activityId+'/networking/'+guest_id+'/networking/getMessages/';
        //     const topic_getMessages2 = 'eventmovil/'+this.event_id+'/'+this.activityId+'/networking/'+creator_id+'/networking/getMessages/';
        //     console.log("topic_getMessages:",topic_getMessages)
        //     console.log("topic_getMessages2:",topic_getMessages2)
        //     let userName= localStorage.getItem('_current_user_name')
        //     let userLastName= localStorage.getItem('_current_user_lastname')
        //     let params_2 = {
        //       message:this.message,
        //       name:userName+' '+userLastName,
        //       user_id:item.data.data.user_id
        //     }
        //     this.message = ''
        //     this.mqttConection.publish(topic_getMessages, JSON.stringify(params_2))
        //     this.mqttConection.publish(topic_getMessages2, JSON.stringify(params_2))
        // }).catch(error =>{
        //     this.$swal({icon:'error', text:error.response.data.error})
        // })
             axios.post('networkingMessages', params).then(item =>{
              let userName= localStorage.getItem('_current_user_name')
              let userLastName= localStorage.getItem('_current_user_lastname')
              let params_2 = {
                message:this.message,
                name:userName,
                lastname:userLastName ,
                user_id:item.data.data.user_id,
                created_at: item.data.data.created_at
              }
              let guest_id = 0
              let creator_id = 0
              if(item.data.data.guest_id !=item.data.data.creator_id){
                guest_id = item.data.data.guest_id
                creator_id = item.data.data.creator_id
              }else{
                if(item.data.data.guest_id!=item.data.data.user_id){
                  guest_id = item.data.data.guest_id
                  creator_id = item.data.data.user_id
                }else{
                  guest_id = item.data.data.user_id
                  creator_id = item.data.data.creator_id
                }
              }
              const topic_getMessages=this.topic_secundary+'/'+this.getTopicChatNetworking(guest_id, creator_id)+'/networking/getMessages';
              this.message= ''
              console.log('topic_getMessages:', params_2);
              this.mqttConection.publish(topic_getMessages, JSON.stringify(params_2))

              }).catch(error =>{
                  this.$swal({icon:'error', text:error})
              })

          }

        }
        

      },
      getTopicChatNetworking($user_id_1=0, $user_id_2=0){
        if($user_id_1<$user_id_2){
          this.user_id_1 = $user_id_1
          this.user_id_2 = $user_id_2
        }else{
          this.user_id_2 = $user_id_1
          this.user_id_1 = $user_id_2
        }
        return this.user_id_1+'_'+this.user_id_2
      },
      url(src){
        return `${process.env.VUE_APP_API_URL}storage/${src}`
      },
      updateInvitationsSchedule(id){
        this.$swal('Lista de invitaciones actualizada')
        this.getInvitations(this.user.id)
      },
      getInvitations(id){
        axios.get(`meeting-by-user/${id}`).then((data)=>{
          this.invitations = data.data.data[0]
        })
      },
      getBusinessMarketData(id){
        axios.get(`business-market/${id}`).then(res=>{
          this.businessMarket = res.data   
        })
      },
      getNetworkingData(id){
        axios.get(`networkings/${id}`).then(res=>{
          this.networking = res.data
          console.log('this.networking:', this.networking);
          this.getTopicChatNetworking(this.networking.creator_id,this.networking.guest_id);
          //console.log('RemainTime', this.timeRemain)
          this.readyMeet.meetingData = true
          
        })
      },
     
      scrollEnd(){
            if(document.getElementById('scrollChat') && document.getElementById('scrollChat').scrollHeight){
                document.getElementById('scrollChat').scrollTop = document.getElementById('scrollChat').scrollHeight
            }
            // console.log("Holamkmkmk:",document.getElementById('scrollChatNet').scrollHeight);
            
        },

      showComponent(type){
        if(type == 'chat'){
          this.showChat =! this.showChat
          this.showDoc = false
          this.showSchedule = false
          // this.getMessages()
        }
        if(type == 'doc'){
          this.showDoc =! this.showDoc
          this.showChat = false
          this.showSchedule = false
          this.getDocuments()
        }
        if(type == 'schedule'){
          this.showSchedule =! this.showSchedule
          this.showDoc = false
          this.showChat = false
          this.getSchedulle(this.user.id)
        }
       },
        subscriptionMqtt(){
            this.mqttConection = this.$mqtt()
            this.topicUser = 'eventmovil/'+this.event_id+'/'+this.activityId+'/networking/'+this.user.id;
            this.topic_secundary = 'eventmovil/'+this.event_id+'/'+this.activityId+'/networking'
            const _this = this;
            this.mqttConection.subscribe(this.topic_secundary+'/#', function (err, res) {    
                if (err) {
                    console.log('🚨 Error when subscribing to topic ' + _this.topic_secundary + ': ' + err);
                    return;
                } 
                else {
                    console.log("subscribed a netZoom "+_this.topic_secundary)
                }    
            });
        },
        listenMQTT(){
            const _this = this;
            this.mqttConection.on('message', function (topic, message) {
                console.log('=====> topic', topic)
                if (topic==_this.topicUser+'/networking/getMessages/') { 
                  const messageJSON = JSON.parse(message.toString())
                  //  _this.getMessages()
                  _this.getMessages2(messageJSON)
                }

                if(topic==_this.topic_secundary+'/'+_this.user_id_1+'_'+_this.user_id_2+'/networking/getMessages'){
                  
                  const messageJSON = JSON.parse(message.toString())
                  console.log("Mensaje del topic:",messageJSON);
                  _this.getMessages2(messageJSON)
                }
            });
      },
       
    },
  }
</script>