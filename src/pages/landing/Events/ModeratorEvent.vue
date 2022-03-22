<template>
  <div class="wrapper event" :style="'background-color:'+style.section_color_background">
    <!-- <AgoraOnlyAudio v-if="activity.voice_participation_check === 1" :dataId="'activiy'+activityId" :userId="'moderator'+activityId" initAudio="muted"/> -->
    <!-- header -->
    <div class="header-main px-4 d-flex flex-column flex-md-row align-items-center" :style="'background-color:'+style.section_color_background">
        <div class="logo-main my-0 mr-md-auto font-weight-normal" >
            <img style="height: 100px; padding-top: 10px;" :src="uriImg+this.style.home_img_logo"/>
        </div>
    </div>
  <!-- header -->

  <!-- content main --><br>
  <main class="content-main">
    <div :style="'color:'+style.section_titles_color" class="content-header">
        <span class="subtitle"> Evento /</span>
        <h3 class="title-main">
          {{this.event.name}}
        </h3>
    </div>

    <div class="row mt-4">

      <!-- col 1 -->
      <div class="col-md-6">

        <div class="row">

          <!-- chat, document -->
          <div class="col-md-12 border-top border-right border-bottom rounded-right col-side">
            <!-- tabs -->
            <div class="row">
              <div class="col-md-11 border-bottom m-auto">
                <div class="row p-2">
                  <!-- tab -->
                  <div class="col border-right text-center" @click="showComponentChat('chatEvent')">
                    <button :style="'border-radius:5px; background-color:'+backgroundIsChatEvent" class="border-0 p-2 m-0">
                      <span :style="'color:'+style.section_btn_text_color" class="ti-comment h3"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div class="col border-right text-center" @click="showComponentChat('chatActivity')">
                    <button :style="'border-radius:5px; background-color:'+backgroundIsChat" class="border-0 p-2 m-0">
                      <span :style="'color:'+style.section_btn_text_color" class="ti-comments h3"></span>
                    </button>
                  </div>
                  <!-- tab -->

                  <!-- Search -->
                  <div class="col-10 text-right">
                    <input class="px-4 py-1 border rounded mt-2 hidden" type="text" name="search" placeholder="Buscar participante"/>
                  </div>
                  <!-- Search -->
                </div>
              </div>
            </div>
            <!-- tabs -->

            <!-- chat -->
            <div v-if="showChat" class="row chat moderator ">

              <div class="col-md-12" style="height:450px;">
                <div class="row chat-content" id="scrollChat" style="overflow-y: scroll; height: 100%;">

                  <!-- chat-item -->
                  <div v-for="mess in allMessages" :key="mess.id" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                    <!--1<span :style="'color:'+style.section_titles_color" class="chat-autor">{{mess.name}}</span> se inahabilita color fuente por mejora UX-->
                    <span style="color: #191619;" class="chat-autor">{{ first_letter_uppercase_word(mess.name)}} {{first_letter_uppercase_word(mess.lastname)}}</span> 
                    <span style="color:gray" class="chat-time">{{$moment(mess.created_at).format('HH:MM')}}</span>
                    <pre style="color:gray; font-size:12px;" class="chat-message mt-2">{{mess.message}}</pre>
                  </div>
                  <!-- chat-item -->

                    
                </div>
                
              </div>

            </div>

            <!-- chat-event -->

            <div v-if="showChatEvent" class="row chat moderator ">

              <div class="col-md-12" style="height:450px;">
                <div class="row chat-content" id="scrollChat" style="overflow-y: scroll; height: 100%;">

                  <!-- chat-item -->
                  <div v-for="mess in allMessagesEvent" :key="mess.id" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                    <!--1<span :style="'color:'+style.section_titles_color" class="chat-autor">{{mess.name}}</span> se inahabilita color fuente por mejora UX-->
                    <span style="color: #191619;" class="chat-autor">{{first_letter_uppercase_word(mess.name)}} {{first_letter_uppercase_word(mess.lastname)}}</span> 
                    <span style="color:gray" class="chat-time">{{$moment(mess.created_at).format('HH:MM')}}</span>
                    <pre style="color:gray; font-size:12px;" class="chat-message mt-2">{{mess.message}}</pre>
                  </div>
                  <!-- chat-item -->

                    
                </div>
                
              </div>

            </div>

            <!-- chat-event -->



          </div>
          <!-- chat, document -->
        </div>

      </div>
      <!-- col 1 -->

      <div class="col-md-1">

      </div>

      <!-- col 2 -->
      <div class="col-md-5">

        <div class="row moderator-options">
          <!-- chat, document -->
          <div class="col-md-12 border-top border-right border-bottom rounded-right col-side">
            <!-- tabs -->
            <div class="row">
              <div class="col-md-11 border-bottom m-auto">
                <div class="row p-2">
                  <!-- tab -->
                  <div @click="showComponent('uphand')" class="col border-right text-center">
                    <button :style="'border-radius:5px; background-color:'+backgroundIsHands" class="border-0 p-2 m-0" title="Preguntas realizadas">
                      <span :style="'color:'+style.section_btn_text_color" class="ti-hand-open h3"></span>
                    </button>
                  </div>
                  <div @click="showComponent('uphandVoice')" class="col border-right text-center" v-if="activity.voice_participation_check === 1">
                    <button :style="'border-radius:5px; background-color:'+backgroundIsEnc" class="border-0 p-2 m-0" title="Preguntas realizadas">
                      <span :style="'color:'+style.section_btn_text_color" class="ti-headphone-alt h3"></span>
                    </button>
                  </div>
                  <!-- tab -->
    
                  <!-- tab -->
                  <div @click="showComponent('probe')" class="col text-center" v-if="event.req_probes === 1" >
                    <button :style="'border-radius:5px; background-color:'+backgroundIsSon"  class="border-0 p-2 m-0" title="Sondeos realizados">
                      <span :style="'color:'+style.section_btn_text_color" class="ti-layout-list-thumb h3"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <div class="col text-center" v-if="event.req_probes === 1">
                    <router-link :to="{path:'/Poll-Event/poll/'+activity.event_id+'/'+activity.event_id}">
                      <button :style="'border-radius:5px; background-color:'+style.section_btn_color" class="border-0 p-2 m-0" title="Encuestas realizadas">
                        <span :style="'color:'+style.section_btn_text_color" class="ti-bar-chart h3"></span>
                      </button>
                    </router-link>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div class="col text-center">
                  </div>
                  <!-- tab -->
                </div>
              </div>
            </div>
            <!-- tabs -->

            <!-- question text-->
            <div class="row question px-4 pb-4" v-show="showUpHand">

              <div class="col-md-12">
                <!-- 2 <h4 :style="'color:'+style.section_titles_color" class="subtitle2">-->
                  <h4 style="color: #191619;" class="subtitle2">
                  Preguntas para los Speakers
                </h4>
              </div>

              <div class="col-md-12 question-content" id="scrollChatHand">
                <!-- items -->
                <div class="row mt-0">
                    <!-- question-item -->
                  <div v-for="question in handsUpText" :key="question.id" class="col-md-11 border rounded pt-4 m-2 ml-3 relative question-box">
                    <span style="color: #191619;" class="chat-autor"><b>{{ first_letter_uppercase_word(question.name) }} {{ first_letter_uppercase_word(question.lastname)}}</b></span>
                    <span :style="'color:'+style.section_titles_color" class="question-time">{{$moment(question.created_at).format('HH:MM')}}</span>
                    <pre style="color:gray; font-size:12px;" class="question-message mt-3 pt-2 border-top">{{question.question}}</pre>
                    <b><p>Respuesta:</p></b>
                    <pre style="color:gray; font-size:12px;"  class="question-message mt-3 pt-2">{{question.answer}}</pre>
                    <div v-if="showAnswer != question.id" class="question-footer text-right pb-2">
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color" 
                      @click="deleteUpHand(question.id)" class="btn btn-outline-primary my-0 mx-1">Omitir
                      </button>
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color"
                      @click="showDivAnswer(question.id)" class="btn btn-primary my-0 mx-1" v-if="question.type=='text'">Responder</button>
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color"
                      @click="sendAnswer(question.id, 'Authorized')" class="btn btn-primary my-0 mx-1" v-if="question.type=='voice' && question.answer==null">Autorizar pregunta por voz</button>
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color"
                      @click="sendAnswer(question.id, 'Overrule')" class="btn btn-primary my-0 mx-1" v-if="question.type=='voice' && question.answer=='Authorized'">Desautorizar audio</button>
                    </div>
                    <div class="row" v-if="showAnswer == question.id">
                      <div class="col-10">
                        <textarea maxlength="250" @keyup.enter="sendAnswer(question.id)"  :style="'border: 0.7px solid '+style.section_btn_color+' !important;'"
                          type="text" class="form-control mb-2" v-model="answer"></textarea>
                      </div>
                      <div class="col-2">
                        <button :style="'background-color:'+style.section_btn_color+'; border:none'" @click="sendAnswer(question.id)" class="btn btn-primary my-0 mx-1">
                          <span :style="'color:'+style.section_btn_text_color" class="ti-location-arrow"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- question-item -->
                </div>
                <!-- items -->
              </div>
            </div>
            <!-- question text-->
            <!-- question voice-->
            <div class="row question px-4 pb-4" v-show="showUpHandVoice">

              <div class="col-md-12">
                <!-- 3<h4 :style="'color:'+style.section_titles_color" class="subtitle2">-->
                <h4 style="color: #191619;" class="subtitle2">
                  Solicitudes de participacion por voz
                </h4>
              </div>

              <div class="col-md-12 question-content" id="scrollChatHand">
                <!-- items -->
                <div class="row mt-0">
                    <!-- question-item -->
                  <div v-for="question in handsUpVoice" :key="question.id" class="col-md-11 border rounded pt-4 m-2 ml-3 relative question-box">
                    <span :style="'color:'+style.section_titles_color" class="question-autor">
                      <span class="ti-help"></span>
                      {{first_letter_uppercase_word(question.name)}} {{first_letter_uppercase_word(question.lastname)}}
                    </span>
                    <span :style="'color:'+style.section_titles_color" class="question-time">{{$moment(question.created_at).format('HH:MM')}}</span>
                    <pre style="color:gray; font-size:12px;" class="question-message mt-3 pt-2 border-top">
                      {{question.question}}
                    </pre>
                    <b><p>Respuesta:</p></b>
                    <pre style="color:gray; font-size:12px;" class="question-message mt-3 pt-2">
                      {{question.answer}}
                    </pre>
                    <div v-if="showAnswer != question.id" class="question-footer text-right pb-2">
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color" 
                      @click="deleteUpHand(question.id)" class="btn btn-outline-primary my-0 mx-1">Omitir
                      </button>
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color"
                      @click="showDivAnswer(question.id)" class="btn btn-primary my-0 mx-1" v-if="question.type=='text'">Responder</button>
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color"
                      @click="sendAnswer(question.id, 'Authorized')" class="btn btn-primary my-0 mx-1" v-if="question.type=='voice' && question.answer==null">Autorizar pregunta por voz</button>
                      <button :style="'border:none; color:'+style.section_btn_text_color+'; background-color:'+style.section_btn_color"
                      @click="sendAnswer(question.id, 'Overrule')" class="btn btn-primary my-0 mx-1" v-if="question.type=='voice' && question.answer=='Authorized'">Desautorizar audio</button>
                    </div>
                    <div class="row" v-if="showAnswer == question.id">
                      <div class="col-10">
                        <textarea maxlength="250" @keyup.enter="sendAnswer(question.id)"  :style="'border: 0.7px solid '+style.section_btn_color+' !important;'"
                          type="text" class="form-control" v-model="answer"></textarea>
                      </div>
                      <div class="col-2">
                        <button :style="'background-color:'+style.section_btn_color+'; border:none'" @click="sendAnswer(question.id)" class="btn btn-primary my-0 mx-1">
                          <span :style="'color:'+style.section_btn_text_color" class="ti-location-arrow"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- question-item -->
                </div>
                <!-- items -->
              </div>
            </div>
            <!-- question voice-->

            <!-- document -->
            <div class="row document px-4 pb-4 " v-if="toShow">
              <div class="col-md-12 pt-3">
                <h4 class="subtitle2" :style="'color:'+style.section_titles_color">
                  <span class="ti-layout-list-thumb"></span>
                  Sondeos realizados
                </h4>
              </div>
              <div class="col-md-12 pt-3 document-content">
                <!-- items -->
                <div class="row mt-0">
                  <!-- document-item -->
                  <div class="col-md-12 mb-2" v-for="item in probes" :key="item.id">
                    <router-link :to="{path:'/Poll-Event/probe/'+item.id+'/'+activity.event_id}">
                      <button class="btn btn-outline-primary p-2 m-0">
                        {{item.name}}
                      </button>
                    </router-link> 
                  </div>
                  <!-- document-item -->
                </div>
                <!-- items -->
              </div>
            </div>
            <!-- document -->
          </div>
          <!-- chat, document -->
        </div>
      </div>
      <!-- col 2 -->

    </div>



  </main>
  <!-- content main -->

  </div>


</template>

<script>
//import AgoraOnlyAudio from '../../../components/Agora/agoraAudioComponent'

export default {
  name:'ModeratorEvent',
  //components:{AgoraOnlyAudio},
  data(){
    return{
      uri: process.env.VUE_APP_API_URL,
      uriImg:process.env.VUE_APP_API_URL_FILES,
      event:[],
      style:[],
      showAnswer:null,
      answer:null,
      showUpHand:false,
      showUpHandVoice:false,
      showChatEvent:true,
      showChat:false,
      upHands:[],
      activityId:null,
      allMessages: [],
      allMessagesEvent: [],
      message:null,
      probes:[],
      toShow : false,
      activity:{
        event_id:""
      },
      mqttConection:null,
      hoverStyleMenu:'#8e04cc',
      backgroundIsChat:'',
      backgroundIsChatEvent:'#8e04cc',
      backgroundIsHands:'',
      backgroundIsCrono:'',
      backgroundIsSon:'',
    }
  },
  computed:{
    handsUpVoice:function(){
      return this.upHands.filter(item=>item.type==='voice')
    },
    handsUpText:function(){
      return this.upHands.filter(item=>item.type==='text')
    }
  },
  created(){
    this.activityId = this.$route.query.activityId
    console.log('activityId: ', this.activityId)
  },
  mounted(){
    var a = new Array()
    a[1] = 0
    a[2] = 21
    a[4] = 14

    console.log('mounted:.. ', this.id)
    
    if(this.id){
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
      }
    if(this.activityId){
      // this.listen()
      this.getActivity()
      // this.getMessages()
      
      this.getUphands()
      this.getProbes(this.activityId)
      // this.subscriptionMqtt()
    }
    this.loadStyleMenu();
  },
  destroyed(){
    this.unsubscriptionMqtt()
  },
  methods:{
    loadStyleMenu(){
      console.log('entro loadStyleMenu()')
      //styles buttons
      this.backgroundIsChat = this.style.section_btn_color
      this.backgroundIsHands = this.style.section_btn_color
      this.backgroundIsCrono = this.style.section_btn_color
      this.backgroundIsSon = this.style.section_btn_color
      console.log('valor',this.backgroundIsSon)
      if(this.backgroundIsSon ==undefined || this.backgroundIsSon == 'undefined'){
          setTimeout(() => this.loadStyleMenu(), 500);
        }  
    },
    first_letter_uppercase_word(str){                
      return str.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())        
    },
    async sendAnswer(id, answer=null){
      let params = {
        answer:this.answer
      }
      if(answer){
        params.answer = answer
      }
      let reponseAnswer=await axios.put(`sendAnswer/${id}`, params)
      console.log("reponseAnswer:", reponseAnswer);
      this.showAnswer = null
      const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/question';
      this.mqttConection.publish(topic, JSON.stringify(reponseAnswer.data.data))
      this.answer = ''
    },
    showDivAnswer(id){
      this.showAnswer = id
    },
    deleteUpHand(id){
      axios.delete('questionActivities/'+id).then(item=>{
        const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/question';
        this.mqttConection.publish(topic, JSON.stringify(item.data.data))
        this.$swal('Pregunta omitida')
      })
    },
    getProbes(id){
        axios.get(`probe-questions-activity-whExt/${id}`).then(res=>{
            this.probes = res.data.data
        })
      },
    // listen(){
    //     Echo.channel('Chat'+this.activityId)
    //     .listen('ChatEvent', (e) =>{
    //       this.getMessages()
    //     })
    //     .listen('ProbeEvent',e=>{
    //       this.getProbes(this.activityId)
    //     })

    //     Echo.channel('Question'+this.activityId)
    //     .listen('QuestionEvent', (e) =>{
    //       this.getUphands()
    //     })
    //   },
      async getUphands(){
        const user = localStorage.getItem('_current_user_id')
        //let url =`questionsForActivity/${this.activityId}/0?per_page=500`
        let url =`questionsForActivityExt/${this.activityId}/0?per_page=500`
        const response = await axios.get(url)
        if(response.data && response.data.data && response.data.data.length>0){
          this.upHands = response.data.data.reverse()
          this.scrollEndHand()
          setTimeout(() => {
            this.scrollEndHand()
          }, 1000);
        }


      },
      async getMessages(){
        let params = {
          pagination : false
        }
        const response = await axios.get(`activityMessagesExtLand/${this.activityId}`, {params})

        this.allMessages = response.data.reverse()
        
        // let scroll = document.getElementById('scrollChat')
        // scroll.scrollTop = 1000
        this.scrollEnd()
        setTimeout(() => {
          this.scrollEnd()
        }, 1000);
      },
      async getMessagesEvent(){
      console.log('Esto es el chat del evento');
        let params = {
          pagination : false
        }
        //const response = await axios.get(`eventChat/${this.activity.event_id}`, {params})
        const response = await axios.get(`eventChatext/${this.activity.event_id}`, {params})
        if(response.data.length && response.data.length>0){
          this.allMessagesEvent = response.data.reverse()
        }
        this.scrollEnd()
        setTimeout(() => {
          this.scrollEnd()
        }, 1000);
        
      },
      scrollEnd(){
        const scroll = document.getElementById('scrollChat')
        if(scroll)
        document.getElementById('scrollChat').scrollTop = document.getElementById('scrollChat').scrollHeight
      },
      scrollEndHand(){
        const scroll = document.getElementById('scrollChatHand')
        if(scroll)
        document.getElementById('scrollChatHand').scrollTop = document.getElementById('scrollChatHand').scrollHeight
      },
      
      sendMessage(){
        let params = {
          message: this.message,
          activity_id: this.activityId
        }
        this.message = ''
        axios.post('sendMessage', params).then(item =>{
          this.getMessages()
        }).catch(error =>{
          this.$swal({icon:'error', text:error})
        })
      },
      getActivity(){
        axios.get(`activityExternal/${this.activityId}`).then(response =>{
          this.activity = response.data
          this.getEvent()
          this.subscriptionMqtt()
          this.getMessagesEvent()
          this.listenMQTT()
        })
      },
      getEvent(){
        axios.get(`showEvent/${this.activity.event_id}`).then(response=>{
          this.event = response.data[0]
        })
        this.getEventStyle()
        
      },
      getEventStyle(){
        axios.get(`styleEvent/${this.activity.event_id}`).then(response=>{
          this.style = response.data
        })        
      },
      showComponent(type){
        //style        
        switch(type){
          case'doc':
            this.backgroundIsHands = this.style.section_btn_color
            this.backgroundIsFiles = this.hoverStyleMenu                      
            this.backgroundIsSon = this.style.section_btn_color
            this.backgroundIsEnc = this.style.section_btn_color
          break;
          case'probe':
            this.backgroundIsHands = this.style.section_btn_color
            this.backgroundIsFiles = this.style.section_btn_color                   
            this.backgroundIsSon = this.hoverStyleMenu
            this.backgroundIsEnc = this.style.section_btn_color
          break;
          case'uphandVoice':
            this.backgroundIsHands = this.style.section_btn_color
            this.backgroundIsFiles = this.style.section_btn_color               
            this.backgroundIsSon = this.style.section_btn_color
            this.backgroundIsEnc = this.hoverStyleMenu
          break;
          case'uphand':
            this.backgroundIsHands = this.hoverStyleMenu
            this.backgroundIsFiles = this.style.section_btn_color
            this.backgroundIsSon = this.style.section_btn_color
            this.backgroundIsEnc = this.style.section_btn_color
          break;
        }

        if(type == 'doc'){
          this.showDoc =! this.showDoc          
          this.showUpHand = false
          this.showUpHandVoice = false
          this.toShow = false
          this.getDocuments()
        }
        if(type == 'uphand'){
          this.showUpHand =! this.showUpHand
          this.showDoc = false
          this.showUpHandVoice = false
          this.toShow = false
          this.getUphands()
        }
        if(type == 'uphandVoice'){
          this.showUpHand = false
          this.showDoc = false
          this.showUpHandVoice = !this.showUpHandVoice
          this.toShow = false
          this.getUphands()
        }
        if(type == 'probe'){
          this.toShow =! this.toShow
          this.showDoc = false
          this.showUpHandVoice = false
          this.showUpHand = false
        }
      },
      showComponentChat(type){
        //style        
        switch(type){         
          case'chatActivity':
            this.backgroundIsChat = this.hoverStyleMenu
            this.backgroundIsChatEvent = this.style.section_btn_color
          break;
          case 'chatEvent':
            this.backgroundIsChat = this.style.section_btn_color
            this.backgroundIsChatEvent = this.hoverStyleMenu
          break;
        }

        if(type=='chatEvent'){
          this.showChatEvent =! this.showChatEvent
          this.showChat = false
          this.getMessagesEvent()
        }
        if(type=='chatActivity'){
          this.showChat =! this.showChat
          this.showChatEvent = false
          this.getMessages()
        }
      },
      unsubscriptionMqtt(){
        const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId;
        this.mqttConection.unsubscribe(topic)
      },
      subscriptionMqtt(){
        this.mqttConection = this.$mqtt()
        this.mqttConection.activityId = this.activityId

        console.log("subscriptionMqtt:",this.activity.event_id)
        const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/#';
        const topic_secundary = 'eventmovil/'+this.activity.event_id+'/#';
        console.log("subscribe moderator:", topic)
         this.mqttConection.subscribe(topic_secundary, function (err, res) {    
          if (err) {
            console.log('🚨 Error when subscribing to topic ' + topic_secundary + ': ' + err);
            return;
          } 
          else {
            console.log("subscribed a moderator ")
          }    
        });

      },
      listenMQTT(){
        const _this = this;
        console.log(this.activityId);
        this.mqttConection.on('message', function (topic, message) {
          console.log("topic->",topic);
          switch (topic) {
            case 'eventmovil/'+_this.activity.event_id+'/'+this.activityId+'/chat':
              _this.getMessages()
              break;
            case 'eventmovil/'+_this.activity.event_id+'/'+this.activityId+'/question':
              _this.getUphands()
              break;
            case 'eventmovil/'+_this.activity.event_id+'/'+this.activityId+'/probes':
              console.log('hola probe')
              _this.getProbes(this.activityId)
              break;
            case 'eventmovil/'+_this.activity.event_id+'/chat':
              _this.getMessagesEvent()
              break;
            default:
              console.log(topic);
              break;
          }
        });
      }
  }
}
</script>

<style scope>
.event .subtitle {
  color: gray !important;
}
.event .title-main {
  color: gray !important;
}
</style>
