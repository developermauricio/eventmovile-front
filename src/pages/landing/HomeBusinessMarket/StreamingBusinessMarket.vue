<template>
  <div class="wrapper business">

    <!-- header -->
    <!-- header -->
     <header-custom :user=user :businessMarket=businessMarket @finish-meeting="FinishMeetingInfo()"/>
    <!-- header -->
  <!-- header -->

  <!-- content main -->
  <main class="content-main">
    <div class="content-header">
        <span class="subtitle"> Rueda de Negocios</span>
        <h3 class="title-main">
          {{businessMarket.name}}
        </h3>
    </div>

    <div class="row mt-4">
      <!-- col 1 -->
      <div class="col-md-7">

        <!-- streaming -->
        <div class="row video-streaming main  py-3 bg-standar rounded">
            <!-- video -->
          <div class="col-md-12">
            <implementing-agora :meetingId="'meeting_'+meeting_id"></implementing-agora>
            <!--<div class="embed-responsive embed-responsive-16by9 " style="min-height:500px">
              
              <div class="agora-my-video">
                <StreamPlayer v-if="rendercurrentLocalStream" :stream="localScreen" :domId="localScreen.getId()" ></StreamPlayer>
                <StreamPlayer v-if="localStream" :stream="localStream" :domId="localStream.getId()" ></StreamPlayer>
                
              </div>

              
              <div class="agora-video embed-responsive-item" :key="index" v-for="(remoteStream, index) in remoteStreams">
                <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"></StreamPlayer>
              </div>

              <div class="offset-4 col-4 buttons-video-agora position-absolute " v-if="localStream">
                <div class="row ">
                  <div class="col-4 m-0 p-0">
                    <button type="button" class="btn btn-primary w-100 h-100 rounded-0 m-0 p-0 border-0 text-lowercase" :class="classesButtons.video" @click="disableVideo()"><span class="ti-video-camera"></span> {{classesButtons.messageVideo}}</button>
                  </div>
                  <div class="col-4 m-0 p-0">
                    <button type="button" class="btn btn-primary w-100 h-100 rounded-0 m-0 p-0 border-0 text-lowercase" :class="classesButtons.audio" @click="disableAudio()"><span class="ti-microphone-alt"></span> {{classesButtons.messageAudio}}</button>
                  </div>
                  <div class="col-4 m-0 p-0">
                    <button type="button" class="btn btn-primary w-100 h-100 rounded-0 m-0 p-0 border-0 text-lowercase" :class="classesButtons.screen" @click="enableShareScreen()"><span class="ti-new-window"></span> {{classesButtons.messageScreen}}</button>
                  </div>
                </div>
              </div>
            </div>-->
            
              <!-- footer options -->
            <div class="footer-option row border rounded-top mb-0">
              <!-- timer -->
                <div class="col-md-3 pl-4">
                  <div class="timer">
                    <span class="ti-timer timer-icon"></span>
                    
                      <countdown :time="timeRemain" tag="span" class="timer-count" v-if="timeRemain !== ''" @end="EndingTimeMeeting()">
                        <template slot-scope="props"> {{ props.hours }}:{{ props.minutes }}:{{ props.seconds }}</template>
                      </countdown>
                  
                    <div>
                      <span class="timer-title">
                        Tiempo disponible
                      </span>

                    </div>
                  </div>
                </div>
                <!-- timer -->

                <!-- alert timer -->
                <div class="col-md-6">
                  <div class="alert mt-3" role="alert">
                    <template v-if="nextMeeting.user === undefined">
                    <span class="ti-bell"></span>
                      No tienes proximas reuniones!!!
                    </template>
                    <template v-if="nextMeeting.user !== undefined">
                    <span class="ti-bell"></span>
                    Te quedan <countdown :time="timeRemainNextMeet" tag="span" class="timer-count" v-if="timeRemainNextMeet !== ''" >
                        <template slot-scope="props"> {{ props.hours }}h {{ props.minutes }}m</template>
                      </countdown> para tu próxima reunión
                    <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span class="ti-close" aria-hidden="true"></span>
                    </button>-->
                    </template>
                  </div>
                </div>
                <!-- alert timer -->

                <!-- Cancelar reunión -->
                <div class="col-md-3 text-right align-self-center">
                  <button   class="btn btn-primary m-0"
                            @click="endMeetingButton()" >
                    Terminar reunión
                  </button>
                </div>
                <!-- Cancelar reunión -->
            </div>

            <div class="row footer-option main row border-bottom border-right border-left rounded-bottom bg-standar">


                <!-- participantes -->
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12  px-4 py-3 participantes">

                        <div class="row ">
                          <!-- participantes item -->

                          <div class="col-md-6 participantes-content">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4 class="box-card__title">Presentando /</h4>
                                </div>
                            </div>
                            <div class="participantes-item row px-2 mt-3 border-right" v-if="userGuess.name !== undefined">
                              <div class="col-3 align-self-center">
                                <img class="avatar small" v-if="!userGuess.pic" :src="require('../../../assets/img/defaults/company.png')"> 
                                <img class="avatar small" :src="url(userGuess.pic)" v-if="userGuess.pic"/>
                              </div>
                              <div class="col-8 align-self-center">
                                <p class="subtitle-2 mb-0">
                                  {{userGuess.name}}
                                  <b class="par-small">{{userGuess.company.name}}</b>
                                  <!--<b class="par-small">9:00 - 9:30 am</b>-->
                                </p>
                              </div>

                            </div>
                          </div>
                          <!-- participantes item -->

                          <!-- participantes item -->
                          <div class="col-md-6 participantes-content">
                            <div class="row">
                                <div class="col-md-12">
                                    <h4 class="box-card__title">Próxima reunión /</h4>
                                </div>
                            </div>
                            <div class="participantes-item row px-2 mt-3" v-if="nextMeeting.user !== undefined" >
                              <div class="col-md-3">
                                <template v-if="nextMeeting.user.company">
                                  <img class="avatar small" v-if="!nextMeeting.user.company.pic" :src="require('../../../assets/img/defaults/company.png')"> 
                                  <img v-if="nextMeeting.user.company.pic" class="avatar small" :src="url(nextMeeting.user.company.pic)"/>
                                </template>
                                
                              </div>
                              <div class="col-md-9">
                                <p class="subtitle-2 mb-0">
                                  {{nextMeeting.user.name}}
                                  <b class="par-small">{{nextMeeting.user.company.name}}</b>
                                  <b class="par-small">{{ $moment(nextMeeting.meeting.start).format('LT') }} - {{ $moment(nextMeeting.meeting.end).format('LT') }}</b>
                                </p>
                              </div>

                            </div>
                          </div>
                          <!-- participantes item -->
                        </div>

                    </div>
                  </div>
                </div>
                <!-- participantes -->

                <!-- notificaciones -->
                  <div class="col-md-5">
                    <div class="row invitaciones small">
                      <div class="col-md-12  px-4 py-3">
                          <div class="row">
                            <div class="col-md-12">
                              <h4 class="box-card__title">Invitaciones pendiente</h4>
                            </div>
                          </div>

                          <div class="row mt-3">
                            <div class="col-md-12 invitaciones-content">
                              <!-- invitaciones item -->
                              <template v-for="item in invitations">
                              <participant-data :data="item"  :key="item.id" @update-invitations="updateInvitationsSchedule(user.id)"/>
                            </template><!-- invitaciones item -->
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                <!-- notificaciones -->
            </div>
    <!-- footer options -->
          </div>
              <!-- video -->
        </div>
        <!-- streaming -->

        

      </div>
      <!-- col 1 -->

      <!-- col 2 -->
      <div class="col-md-5">
        <div class="row">
          <!-- data company -->
          <div class="col-md-5 p-4 border rounded-left bg-standar">

          <!-- Company -->
            <div class="row">
                <div class="col-md-12">

                  <div class="row">
                    <div class="col-md-12 text-center border-bottom pb-4">
                      <img class="brand"  :src="url(company.pic)"/>
                    </div>
                    <div class="col-md-12 mt-4">
                      <h4 class="box-card__title">Empresa /</h4>
                    </div>
                    <div class="col-md-12 mt-2">
                      <p class="title-2"><strong>{{company.name}}</strong></p>
                    </div>
                    <div class="col-md-12">
                      <p class="par-small">
                        {{company.sort_description}}
                      </p>
                    </div>
                  </div>


                </div>
            </div>
          <!-- Company -->

          <!-- products -->
            <div class="row">
              <div class="col-md-12">
                <h4 class="box-card__title">Productos /</h4>
              </div>
            </div>

            <div class="row products-content-2 text-left">
              
               <!-- product -->
                <template v-for="item in listProducts">
                  <product :data=item :key="item.id" />
                </template>
              <!-- product -->


            </div>
          <!-- products -->

          </div>
          <!-- data company -->

          <!-- chat, document, calendar -->
          <div class="col-md-7 border-top border-right border-bottom rounded-right">
            <!-- tabs -->
            <div class="row">
              <div class="col-md-11 border-bottom m-auto">
                <div class="row p-2">
                  <!-- tab -->
                  <div class="col border-right text-center" @click="showComponent('chat')">
                    <button class="btn btn-outline-primary border-0 p-2 m-0">
                      <span class="ti-comments h3"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div class="col border-right text-center" @click="showComponent('doc')">
                    <button class="btn btn-outline-primary border-0 p-2 m-0">
                      <span class="ti-folder h3"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div class="col text-center" @click="showComponent('schedule')">
                    <button class="btn btn-outline-primary border-0 p-2 m-0">
                      <span class="ti-calendar h3"></span>
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
                <span class="chat-autor">{{mess.name}}</span>
                <span class="chat-time">{{$moment(mess.created_at).format('HH:mm')}}</span>
                <p class="chat-message mt-2">
                  {{mess.message}}
                </p>
              </div>
              <!-- chat-item -->

            </div>

            <!-- chat-footer -->
            <div class="row border-top mt-2" v-if="showChat">
              <div class="col-md-12 mt-4 chat-send">
                <div class="btn-send" @click.prevent="sendMessage()">
                  <span class="ti-location-arrow"></span>
                </div>
                <textarea @keyup.enter="sendMessage" v-model="message"  class="form-control chat-textarea" name="chat" id=""></textarea>
              </div>
              <div class="col-md-12 mt-3">
                <!--<a href="#" class="text-primary">
                  <span class="ti-comment-alt"></span>
                  Inciar chat privado</a>-->
              </div>
            </div>
            <!-- chat-footer -->
            <!-- chat -->
            
             <!-- document -->
            <div class="row document px-4 pb-4" v-if="showDoc">

              <div class="col-md-12">
                <h4 class="subtitle2">
                  <span class="ti-archive"></span>
                  Documentos para descargar
                </h4>
                <!-- Dcument item-->
                <div class="row" v-for="doc in documents" :key="doc.id">
                  <div class="col-md-11 rounded pt-4 m-2 ml-3 relative chat-box ">
                    <a target="_blank" :href="uri+'storage/'+doc.url">
                      <p class="document-name">{{doc.name}}</p>
                      <span class="document-icon ti-download">
                      </span>
                    </a>
                  </div>
                </div>
                <!-- document item -->
              </div>
            </div>
            <!-- document -->
            <!-- Agenda -->
            <div class="row timeline main mb-2" v-if="showSchedule">
              <div class="col-md-12  p-4 box-card">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Mi Agenda /</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 timeline-content">
                      <div class="row mt-4">
                          <div class="line"></div>




                          <!-- timeline-item -->
                          <div class="col-md-12 mb-2">

                            <!-- date 
                            <div class="col-md-12 mb-2 timeline-date">
                              <span class="ti-calendar timeline-date__icon"></span>
                              26 de Agosto
                              <span class="ti-minus timeline-date__btn"></span>
                            </div>
                            date -->
                            <template v-for="item in schedule">
                              <meeting :data=item :key="item.id" @appointment-delete="getSchedulle(user.id)" />
                            </template>
                            
                            <!--<div class="timeline-item row available" >
                              <div class="timeline-hour">4:30pm</div>
                              <div class="col-md-2">
                              </div>
                              <div class="col-md-10 px-4">
                                <p class="subtitle-2">
                                  <b class="par-small">Espacio disponible</b>
                                </p>
                              </div>
                            </div>-->
                          </div>
                        <!-- timeline-item -->

                      </div>
                    </div>
                  </div>

              </div>
            </div>
              <!-- Agenda -->
            
          </div>
          <!-- chat, document, calendar -->
        </div>
      </div>
      <!-- col 2 -->

        </div>

  </main>
  <!-- content main -->

  <!-- modal -->
  <modal name="modal-notification"
        :clickToClose="false"
         :width="900"
         :height="500"
         :adaptive="true">

        <!-- close section -->
        <div class="container py-3" v-if="messageFinisheMeeting.show === 'confirmEnding'">
            <div class="row my-4">
              <div class="col-md-12 text-center">
                  <h3 class="h4" style="color:#614ba4">FINALIZAR REUNIÓN</h3>
                  <p>
                   Está seguro que quiere dar por terminada la reunión?
                  </p>

              </div>
            </div>
            <div class="row flex justify-content-center">
              <div class="col-md-4">
                <button class="btn btn-outline-primary mx-1 px-5" @click="$modal.hide('modal-notification')">
                  No
                </button>

                <button class="btn btn-primary mx-1 px-5" @click="updateDinamicMeeting(4)">
                  Si
                </button>
              </div>

            </div>
        </div>

                <!-- close section -->
        <div class="container py-4" v-if="messageFinisheMeeting.show === 'infoEnding'">
            <div class="row" :class="{ 'my-4': !messageFinisheMeeting.feedback, 'mt-1':messageFinisheMeeting.feedback }">
              <div class="col-md-12 text-center" :class="{ 'p-0': messageFinisheMeeting.feedback, 'm-0': messageFinisheMeeting.feedback }">
                  <h3 class="h4" style="color:#614ba4">SE FINALIZO REUNIÓN</h3>
              </div>
            </div>
            <template v-if="messageFinisheMeeting.feedback">
              <div class="row mb-2 mt-0 pt-0">
                <div class="col-md-12 text-center pt-0 mt-0">
                    <h3 class="h4 mb-0" style="color:#614ba4">Feedback</h3>
                    <p>
                      Por favor responde las siguientes preguntas:
                    </p>
                </div>
              </div>
              <div class="row">
                <div class="col-8 offset-2">
                  <div class="row flex ">
                  <!-- participantes item -->
                  <template >
                    <div v-for="item in feedback.questions" class="col-6" :key="item.id">
                      <h6 class="mb-0">{{item.question}}</h6>
                      <div class="mb-3 mt-0 ">
                        <center>
                        <star-rating  v-model="item.answer" v-if="item.type === 'starts'" :roundedCorners="true" :star-size="20"/>
                        <template v-if="item.type === 'multiple'">
                          <div class="float-left pr-4 pt-1 pl-1" v-for="item2 in item.options" :key="item2.id">
                          <label class="radio-inline" for="exampleRadios1">
                              <input class="form-check-input" type="radio" name="exampleRadios" :value="item2" v-model="item.answer"> {{item2}}
                          </label>
                          </div>
                        </template> 
                        </center>   
                      </div>
                    </div>
                  </template>
                  <!-- participantes item -->
              </div>
                </div>
              </div>
              
               
              <div class="row justify-content-center">
                <div class="col-md-4 text-center">
                    <button class="btn btn-primary mx-1 px-5" @click="sendAnswersFeedback">
                      Enviar
                    </button>
                  
                </div>
                <div class="col-md-4 text-center">
                    <button class="btn btn-primary mx-1 px-5" @click="verifyAnsweredFeedback">
                      Omitir
                    </button> 
                </div>
              </div>
          </template>
          <template v-if="!messageFinisheMeeting.feedback">
            <div class="row flex justify-content-center">
              <div class="col-md-12 text-center">
                  <button class="btn btn-primary mx-1 px-5" @click="verifyAnsweredFeedback">
                    Aceptar
                  </button>               
              </div>
            </div>
          </template>
        </div>

        
        <!-- close section -->

        <!-- finished section -->
       
        <div class="container py-4" v-if="messageFinisheMeeting.show === 'infoFinishMeeting'">
          <div class="row" :class="{ 'my-4': !messageFinisheMeeting.feedback, 'mt-1':messageFinisheMeeting.feedback }">
              <div class="col-md-12 text-center" :class="{ 'p-0': messageFinisheMeeting.feedback, 'm-0': messageFinisheMeeting.feedback }">
                  <h3 class="h4" style="color:#614ba4">FINALIZO POR TIEMPO</h3>
              </div>
            </div>
          <template v-if="messageFinisheMeeting.feedback">
              <div class="row mb-2 mt-0 pt-0">
                <div class="col-md-12 text-center pt-0 mt-0">
                    <h3 class="h4 mb-0" style="color:#614ba4">Feedback</h3>
                    <p>
                      Por favor responde las siguientes preguntas:
                    </p>
                </div>
              </div>
              <div class="row">
                <div class="col-8 offset-2">
                  <div class="row flex ">
                  <!-- participantes item -->
                  <template >
                    <div v-for="item in feedback.questions" class="col-6" :key="item.id">
                      <h6 class="mb-0">{{item.question}}</h6>
                      <div class="mb-3 mt-0 ">
                        <center>
                        <star-rating  v-model="item.answer" v-if="item.type === 'starts'" :roundedCorners="true" :star-size="20"/>
                        <template v-if="item.type === 'multiple'">
                          <div class="float-left pr-4 pt-1 pl-1" v-for="item2 in item.options" :key="item2.id">
                          <label class="radio-inline" for="exampleRadios1">
                              <input class="form-check-input" type="radio" name="exampleRadios" :value="item2" v-model="item.answer"> {{item2}}
                          </label>
                          </div>
                        </template> 
                        </center>   
                      </div>
                    </div>
                  </template>
                  <!-- participantes item -->
              </div>
                </div>
              </div>
              
               
              <div class="row justify-content-center">
                <div class="col-md-4 text-center">
                    <button class="btn btn-primary mx-1 px-5" @click="sendAnswersFeedback">
                      Enviar
                    </button>
                  
                </div>
                <div class="col-md-4 text-center">
                    <button class="btn btn-primary mx-1 px-5" @click="verifyAnsweredFeedback">
                      Omitir
                    </button> 
                </div>
              </div>
          </template>
          <template v-if="!messageFinisheMeeting.feedback"> 
            <div class="row flex justify-content-center" v-if="nextMeeting.user !== undefined">
                <!-- participantes item -->
                  <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h4 class="box-card__title">Próxima reunión:</h4>
                        </div>
                    </div>
                    <div class="participantes-item row px-2 mt-3" v-if="nextMeeting.user !== undefined" >
                      <div class="col-md-3">
                        <img v-if="nextMeeting.user.company !== undefined" class="avatar small" :src="url(nextMeeting.user.company.pic)"/>
                      </div>
                      <div class="col-md-9">
                        <p class="subtitle-2 mb-0">
                          {{nextMeeting.user.name}}
                          <b class="par-small">{{nextMeeting.user.company.name}}</b>
                          <b class="par-small">{{ $moment(nextMeeting.meeting.start).format('LT') }} - {{ $moment(nextMeeting.end).format('LT') }}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                <!-- participantes item -->
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
                <button class="btn btn-primary mx-1 px-5" @click="verifyAnsweredFeedback">
                    Aceptar
                </button>
              </div>
            </div>
          </template>
        </div>
        <!-- finished section -->
    </modal>
    <!-- modal -->

  </div>


</template>


<script>
import headerCustom from './components/header'
import participantData from './components/participantData'
import product from './components/product'
import countdown from '@chenfengyuan/vue-countdown'
import meeting from './components/meeting'
import start from './components/starts'
import implementingAgora from '@/components/Agora/agoraComponent'

  export default {
    props:{
      business_id:{},
      meeting_id:{}
    },
    components:{
      headerCustom,participantData, product, countdown, meeting, start, implementingAgora
    },
    data(){
      return {
        userId:null,
        schedule:[],
        messageFinisheMeeting:{
          show:'',
          feedback:false
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
        meeting:{},
        user:{},
        userGuess:{},
        invitations:{},
        company:{},
        listProducts:[],
        render:false,
        timeRemain:'',
        timeRemainNextMeet:'',
        feedback:{
          answered:"false"
        },

      }
    },
    computed:{
      
    },
    created() {
      this.getMeetingData(this.meeting_id),
      this.getBusinessMarketData(this.business_id)
      this.user = {
        id: localStorage.getItem('_current_user_id'),
        name: localStorage.getItem('_current_user_name'),
        role: localStorage.getItem('_current_role_name'),
      }
      this.getInvitations(this.user.id)
      this.getFeedBackQuestions(this.user.id)
      this.render = true
      this.getMessages()

    },
    mounted() {
      this.messageFinisheMeeting.show = 'infoFinishMeeting'
      this.getNextMeeting()
      if(this.meeting_id){
        // this.listen()
      }     
    },
    beforeDestroy() {
      this.render = false

    },
      
    methods: {

      verifyAnsweredFeedback(){
        //#if(this.feedback.answered === "false"){
         // this.messageFinisheMeeting.feedback = true
        //} else {
          this.$router.push({ name: "HomeBusinessMarket", params:{
            id:this.business_id
          } })
        //}
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
      sendAnswersFeedback(noAnswer = false){
        
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
          if(this.feedback.answered === "false"){
            this.messageFinisheMeeting.feedback = true
          }
        })
      },
      endMeetingButton(){
        this.messageFinisheMeeting.show ='confirmEnding'
        this.$modal.show('modal-notification')
      },
      getNextMeeting(){
        axios.get('next-meeting').then(res=>{
          //console.log(res.data)
          if(res.data.message){
            return
          }
          if(res.data.creator_id === this.user.id)
            this.nextMeeting = {
              meeting:res.data,
              user:res.data.guests_user[0]
            }
          else
            this.nextMeeting = {
              meeting:res.data,
              user:res.data.creator
            }
          if(res.data.end){
            let end = this.$moment(res.data.end).format('HH:mm:ss')
            end = this.$moment(end,'HH:mm:ss')
            //console.log("EndTime: ", end)
            let now = this.$moment(res.data.currentTime).format('HH:mm:ss')
            now= this.$moment(now,'HH:mm:ss')
            //console.log("EndTimeMoment: ", now)
            let tmp = end.diff(now,'second')
            this.timeRemainNextMeet = tmp * 1000
          } else 
          this.timeRemainNextMeet = 0 
        }).catch(e=>{
          console.log(e)
        })
      },
      EndingTimeMeeting(){
        axios.put(`meeting/${this.meeting_id}`,{
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
        axios.put(`meeting/${this.meeting_id}`,{
          state
        }).then(res=>{
          this.$router.push({ name: "HomeBusinessMarket", params:{
            id:this.business_id
          } })
          //this.$swal("Cita terminda correctamente")
        })
      },
      
            
      async getDocuments(){
        this.documents = []
        let response = await axios.get(`companyToMeet/${this.meeting_id}`)
        const companies = response.data.data
        await companies.forEach(element => {
          axios.get(`modelDocuements/company/${element.company_id}`).then(response=>{
            this.documents.push(response.data.data[0])
          })
        });
      },
      // listen(){
      //   Echo.channel('Chat'+this.meeting_id)
      //   .listen('ChatMeet', (e) =>{
      //     this.getMessages()
      //   })
      // },
      async getMessages(){
        let params = {
          pagination : false
        }
        const response = await axios.get(`meetMessages/${this.meeting_id}`, {params})

        this.allMessages = response.data
        
        let scroll = document.getElementById('scrollChat')
        scroll.scrollTop=999
      },
      sendMessage(){
        let params = {
          message: this.message,
          meet_id: Number(this.meeting_id)
        }
        this.message = ''
        axios.post('meetChat', params).then(item =>{
          this.getMessages()
        }).catch(error =>{
          this.$swal({icon:'error', text:error})
        })

      },
      
      url(src){
        if(src)
          return `${process.env.VUE_APP_API_URL}storage/${src}`
      },
      updateInvitationsSchedule(id){
        this.$swal('Lista de invitaciones actualizada')
        this.getInvitations(this.user.id)
      },
      getInvitations(id){
        axios.get(`meeting-by-user/${id}/${this.business_id}`).then((data)=>{
          this.invitations = data.data.data[0]
        })
      },
      getBusinessMarketData(id){
        axios.get(`business-market/${id}`).then(res=>{
          this.businessMarket = res.data   
        })
      },
      getMeetingData(id){
        axios.get(`meeting/${id}`).then(res=>{
          this.meeting = res.data
          let end = this.$moment(this.meeting.end).format('HH:mm:ss')
          end = this.$moment(end,'HH:mm:ss')
          //console.log("EndTime: ", end)
          let now = this.$moment(res.data.currentTime).format('HH:mm:ss')
          now= this.$moment(now,'HH:mm:ss')
          //console.log("EndTimeMoment: ", now)
          let tmp = end.diff(now,'second') 
          tmp = tmp <= 0 ? 0 : tmp
          tmp = res.data.state === "3" ? 0 : tmp
          res.data.state === "4" ? this.FinishMeetingInfo() : 0
          this.timeRemain = tmp * 1000
          //console.log('RemainTime', this.timeRemain)
          
          if(this.user.id == this.meeting.creator_id)
            {
            this.userGuess = this.meeting.guests_user[0]
            if(this.userGuess.company){
            this.company = this.userGuess.company
            this.getProducts(this.company.id)}}
          else
            {
              this.userGuess = this.meeting.creator
              if(this.userGuess.company){
              this.company = this.userGuess.company
              this.getProducts(this.company.id)}
            }
        })
      },
      getUserData(id){
        axios.get(`business-market-user/${id}/`).then(data=>{
          this.user = data.data[0]
          if(data.data[0].company_id !== null){
            this.company = data.data[0].company
            this.getProducts(data.data[0].company_id)
          }
        })
      },
      getProducts(id){
        axios.get(`products-by-id/${id}`).then(result=>{
          this.listProducts = result.data.data
        })
      },

      showComponent(type){
        if(type == 'chat'){
          this.showChat =! this.showChat
          this.showDoc = false
          this.showSchedule = false
          this.getMessages()
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
       getSchedulle(id){
        axios.get(`schedule/${id}/${this.business_id}`).then((data)=>{
          this.schedule = data.data.data
        })
      },
    },
  }
</script>

<style scoped>
  .agora-my-video{
    position:absolute;
    z-index:100;
    width: 200px;
    height:110px;
    right: 3px;
    bottom:3px
  }

 .buttons-video-agora{
   bottom:0px;
  }
  .agora-video {
    width: 100%;
    margin:0
  }
  .enable-video {
    background-color: #eb5e28;
  }
  .disable-video {
    background-color: #942e06;
  }

  .enable-audio {
    background-color: #C119BF;
  }
  .disable-audio {
    background-color: #500b4f;
  }
</style>