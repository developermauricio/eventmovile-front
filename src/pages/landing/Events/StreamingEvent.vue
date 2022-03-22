<template>
  <div class="event" :style="bgImg">
    <!-- header -->
    <AgoraOnlyAudio v-if="activity.voice_participation_check === 1 && voiceCall.stateVoice==='Authorized'" :dataId="'activiy'+activityId" :userId="user_id" initAudio="enabled" :leaveVoice="voiceCall.leaveVoice"/>
    <div class="row" 
      :style="'background-color:' + styles.home_div_first_color">
        <div class="col-2 col-sm-1 col-xl-1">
          <router-link :to="{ name: 'landingEvent', query: { eventId: event.id } }">
          <a :style="'border:none;background-color:'+styles.section_btn_color+'; color:'+styles.section_btn_text_color+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover"  class="btn custom-btn btn-outline-primary btn-sm mx-1">
            <span class="ti-arrow-left"></span>
          </a>
          </router-link>
        </div>
        <div class="col-5 col-sm-5 col-xl-8 p-1" >
            <img  class="img-responsive" width="100" height="100" :src="uriImg+styles.home_img_logo"/>
        </div>

        <TopNavbar  :color="styles.section_btn_color" :secondColor="styles.section_btn_text_color" v-if="topNavbar && styles.section_btn_color" :event="event"> </TopNavbar>
    </div>
  <!-- header -->

  <!-- content main -->
  <main class="content-main">
    <div class="content-header">
        <span class="subtitle" :style="'color:'+styles.section_titles_color"> {{$t('pages.Events.StreamingEvent.event')}}</span>
        <h3 class="title-main" :style="'color:'+styles.section_titles_color">
          {{event.name}}
        </h3>
    </div>

    <div class="row mt-4">
      <!-- col 1 -->
      <div class="col-md-9 px-4">

        <!-- streaming -->
        <div class="row video-streaming main mb-4 py-3 bg-standar rounded">
            <!-- video -->
              <div class="col-md-12">
                  <div class="embed-responsive embed-responsive-16by9" v-html="activity.code_streaming">

                  </div>
              </div>
              <!-- video -->
        </div>
        <!-- streaming -->
      </div>
      <!-- col 1 -->

      <!-- col 2 -->
      <div class="col-md-3">

        <div class="row" v-if="showInteractions">

          <!-- chat, document, calendar -->
          <div class="col-md-12 border-top border-right border-bottom rounded-right col-side">
            <!-- tabs -->
            <div class="row">
              <div class="col-md-12 border-bottom m-auto">
                <div class="row p-1">
                  <!-- tab -->
                  <div class="col-1 m-1 text-center" v-if="event.req_chat_event">
                    <button :title="$t('pages.Events.StreamingEvent.chat_event')" @click="showComponent('chat_evento')" :style="'background-color:'+backgroundIsChatEvent+';'+'border-radius:5px;'+'--color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn custom-btn border-0 p-2 m-0">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-comment h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div class="col-1 m-1 text-center" v-if="event.req_chat">
                    <button :title="$t('pages.Events.StreamingEvent.chat')" @click="showComponent('chat')" :style="'border-radius:5px;'+'background-color:'+backgroundIsChat+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn custom-btn border-0 p-2 m-0">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-comments h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div class="col-1 m-1 text-center" alt="Texto" v-if="event.req_make_question">
                    <button :title="$t('pages.Events.StreamingEvent.makeAQuestion')" @click="showComponent('uphand')" :style="isActiveIn+';'+'border-radius:5px;'+'background-color:'+backgroundIsHands+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn custom-btn border-0 p-2 m-0" alt="Texto">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-hand-open h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <div class="col-1 m-1 text-center" v-if="event.req_files">
                    <button :title="$t('pages.Events.StreamingEvent.files')" @click="showComponent('doc')" :style="isActiveIn+';'+'border-radius:5px;'+'background-color:'+backgroundIsFiles+'; --color-hover:'+styles.section_btn_color_hover" class="btn custom-btn border-0 p-2 m-0">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-folder h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <div class="col-1 m-1 text-center" v-if="event.req_schedule">
                    <button :title="$t('pages.Events.StreamingEvent.schedule')" @click="showComponent('timeline')" :style="isActiveIn+';'+'border-radius:5px;'+'background-color:'+backgroundIsCrono+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover"  class="btn custom-btn border-0 p-2 m-0">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-calendar h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                   <!-- tab -->
                  <div :title="$t('pages.Events.StreamingEvent.probes')" class="col-1 m-1 text-center" v-if="probes !== 'answered' && event.req_probes">
                    <button @click="showComponent('quiz')" :style="isActiveIn+';'+'border-radius:5px;'+'background-color:'+backgroundIsSon+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn custom-btn border-0 p-2 m-0">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-layout-list-thumb h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                  <!-- tab -->
                  <div :title="$t('pages.Events.StreamingEvent.survey')" class="col-1 m-1 text-center" v-if="questions !== 'answered' && event.req_survey">
                    <button :style="isActiveIn+';'+'border-radius:5px;'+'background-color:'+backgroundIsEnc+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn custom-btn border-0 p-2 m-0"
                            @click="showComponent('poll')">
                      <span :style="'color:'+styles.section_btn_text_color" class="ti-bar-chart h5"></span>
                    </button>
                  </div>
                  <!-- tab -->
                </div>
              </div>
            </div>
            <!-- tabs -->

            <!-- Up hand -->
            <div class="row chat" v-if="showUpHand && event.req_make_question">
              <div class="col-md-12" style="height: 500px;">
                <div class="row chat-content" id="scrollChatHand" style="overflow-y: scroll; height: 60%;">

                  <!-- chat-item -->
                  <div v-for="question in upHands" :key="question.id" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                    <span style="color: #191619;" class="chat-autor" >{{first_letter_uppercase_word(question.name)}} {{first_letter_uppercase_word(question.lastname)}}</span>
                    <span style="color:gray" class="chat-time">{{$moment(question.created_at).format('hh:mm a')}}</span>
                    <pre style="color:gray: font-size:12px;" class="chat-message mt-2">{{question.question}}</pre>
                    <b><span v-if="question.answer" :style="'color:'+styles.section_titles_color" >{{$t('pages.Events.StreamingEvent.answer')}}</span></b>
                    <pre v-if="question.answer" style="color:gray; font-size:12px;" class="chat-message mt-2">{{question.answer}}</pre>
                    <!--<button :style="'border:none; color:'+styles.section_btn_text_color+'; background-color:'+styles.section_btn_color"
                        @click="sendAnswer(question.id, 'Authorized')" class="btn btn-primary my-0 mx-1 pt-2" v-if="question.type=='voice' && valideteTime(question)">
                        Comenzar</button>-->
                  </div>
                  <!-- chat-item -->
                </div>
                <!-- chat footer -->
                <div class="row border-top mt-2 chat-footer">
                  <div class="col-md-12 mt-4 chat-send">
                    <div :style="'border:none;background-color:'+styles.section_btn_color+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn-voice" @click.prevent="voiceQuestion()" title="Preguntar por voz" v-if="voiceCall.stateVoice=='init' && activity.voice_participation_check === 1">
                      <span class="ti-microphone" ></span>
                    </div>
                    <div :style="'border:none;background-color:#057920; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover" class="btn-voice" @click.prevent="voiceStateActive()" title="Preguntar por voz" v-if="voiceCall.stateVoice=='active'">
                      <span class="ti-microphone" ></span>
                    </div>
                    <div :style="enableButtonSendChatQuestion" class=" btn-send" @click.prevent="sendQuestion()">
                      <span class="ti-location-arrow" ></span>
                    </div>
                    
                    <span>{{$t('pages.Events.StreamingEvent.askTheSpeaker')}}</span>                    
                    <textarea maxlength="250"  :style="'border: 0.7px solid '+styles.section_text_color+' !important;'"  v-model="textUpHand" class="form-control chat-textarea" name="chat" id=""></textarea>
                  </div>
                </div>
                <!-- chat footer -->
              </div>
            </div>
            <!-- Up hand -->

            <!-- chat -->
            <div class="row chat" v-if="showChat && event.req_chat">
              <div class="col-md-12" style="height: 500px;">
                <div class="row chat-content" id="scrollChat" style="overflow-y: scroll; height: 60%;">

                  <!-- chat-item -->
                  <div v-for="(mess,index) in allMessages" :key="mess.id" :id="'message'+(index+1)" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                    <span style="color: #191619;" class="chat-autor">{{first_letter_uppercase_word(mess.name)}} {{first_letter_uppercase_word(mess.lastname)}}</span>
                    <span style="color:gray;background:#fff" class="chat-time">{{$moment(mess.created_at).format('hh:mm a')}}</span>
                    <pre style="color:gray;font-size:12px;" class="chat-message mt-2">{{mess.message}}</pre>
                  </div>
                  <!-- chat-item -->
                </div>
                <!-- chat footer -->
                <div class="row border-top mt-2 chat-footer">
                  <div class="col-md-12 mt-4 chat-send">
                    <div :style="enableButtonSendChatActivity" class="btn-send" @click.prevent="sendMessagesMQTT()">
                      <span class="ti-location-arrow"></span>
                    </div> 
                    <span>{{$t('pages.Events.StreamingEvent.sendAMessageToEveryone')}}</span>                   
                    <textarea maxlength="250" :style="'border: 0.7px solid '+styles.section_div_first_color+' !important;'" 
                    v-model="message" class="form-control chat-textarea" name="chat">
                    </textarea>
                  </div>
                </div>
                <!-- chat footer -->
              </div>
            </div>
            <!-- chat -->


          <!-- chat-event -->
            <div class="row chat" v-if="showChatEvent && event.req_chat_event">
              <div class="col-md-12" style="height: 500px;">
                <div class="row chat-content" id="scrollChat" style="overflow-y: scroll; height: 60%;">

                  <!-- chat-item -->
                  <div v-for="(mess,index) in allMessagesEvent" :key="mess.id" :id="'message'+(index+1)" class="col-md-11 border rounded pt-4 m-2 ml-3 relative chat-box ">
                    <span style="color: #191619;" class="chat-autor">{{first_letter_uppercase_word(mess.name)}} {{first_letter_uppercase_word(mess.lastname)}}</span>
                    <span style="color:gray;background:#fff" class="chat-time">{{$moment(mess.created_at).format('hh:mm a')}}</span>
                    <pre style="color:gray; font-size:12px;" class="chat-message mt-2">{{  mess.message }}</pre>
                  </div>
                  <!-- chat-item -->
                </div>
                <!-- chat footer -->
                <div class="row border-top mt-2 chat-footer">
                  <div class="col-md-12 mt-4 chat-send">
                    <div :style="enableButtonSendChatEvent" class="btn-send" @click.prevent="sendMessagesEventMQTT()">
                      <span class="ti-location-arrow"></span>
                    </div> 
                    <span>{{$t('pages.Events.StreamingEvent.sendAMessageToEveryone')}}</span>                   
                    <textarea maxlength="250"  :style="'border: 0.7px solid '+styles.section_div_first_color+' !important;'" 
                    v-model="messageEvent" class="form-control chat-textarea" name="chat">
                    </textarea>
                  </div>
                </div>
                <!-- chat footer -->
              </div>
            </div>
            <!-- chat-event -->

            <!-- document -->
            <div class="row document px-4 pb-4" v-if="showDoc && event.req_files">

              <div class="col-md-12">
                <h4 :style="'color:'+styles.section_titles_color" class="subtitle2">
                  <span class="ti-archive"></span>
                  {{$t('pages.Events.StreamingEvent.resources')}}
                </h4>
                <!-- Dcument item-->
                <div class="row" v-for="doc in documents" :key="doc.id">
                  <div class="col-md-11 rounded pt-4 m-2 ml-3 relative chat-box ">
                    <a v-if="doc.type == 'local'" target="_blank" :href="uri+doc.url">
                      <p class="document-name">{{doc.name}}</p>
                      <span class="document-icon ti-download">
                      </span>
                    </a>
                    <a v-if="doc.type == 'url'" target="_blank" :href="doc.url">
                      <p class="document-name">{{doc.name}}</p>
                      <span class="document-icon ti-link">
                      </span>
                    </a>
                  </div>
                </div>
                <!-- document item -->
              </div>
            </div>
            <!-- document -->

            <!-- timeline -->
            <div class="row timeline main mb-2" v-if="showTimeline && event.req_schedule">
              <div class="col-md-12  p-4 box-card">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 :style="'color:'+styles.section_titles_color" class="box-card__title">{{$t('pages.Events.StreamingEvent.timeLine')}}</h4>
                    </div>
                  </div>
                  <div class="row">
                    <!-- halls in time line -->
                    <div v-if="hasHall" class="col-md-12 timeline-content">
                      <div class="row">                          
                          <!-- timeline-item -->
                          <div class="col-md-12 mb-2">      
                            <template  v-for="(hall, index) in halls">                   
                              <div class="row" :key="index">                                
                                <div class="col-md-12">                                
                                  <div v-if="hall.hall_type_id==2">
                                    <a href="#" @click.prevent="urlExternal(hall.domain_external)">
                                      <button class="btn btn-primary w-100 mt-1">{{hall.name}}</button>
                                    </a>     
                                  </div> 
                                  <div v-else>                                                                
                                    <button class="btn btn-primary w-100 mt-1" @click="redirecToHallInternal(hall.id)">{{hall.name}}</button>                                                                  
                                  </div>
                                </div>  
                                <!-- activities by halls-->
                                  <!--<timeline v-if="ifShowProbes(index)" :data="getActTimeLine(hall.id)"></timeline>-->
                                  <div>
                                    <div v-for="(item, index2) in hall.activities1" :key="index2">                                
                                      <timeline :idNow="activityNow" :data="item"  v-model="item.id"/>  
                                    </div> 
                                  </div>
                              </div>
                            </template>
                          </div>
                      </div>
                    </div>                    
                  </div>
                  <!-- chat, document, calendar -->
                </div>
              </div>
              <!-- col 2 -->
              <!-- poll -->
              <!-- TODO: aqui van el sondeo -->
              <div class="row poll px-1 pb-4" v-if="showQuiz && event.req_probes">
                <template v-if="probes !== 'answered'">
                  <div class="col-md-12">
                    <h4 class="subtitle2">
                      {{$t('pages.Events.StreamingEvent.weInviteYouToFillOutTheSurvey')}}
                    </h4>
                  </div>

                  <div class="col-md-12 poll-content">
                    <template v-for="(item,index) in probes">
                      <div :key="item.index">
                        <button class="btn btn-primary w-100 mt-1" type="button" @click="functionShowProbe(index)">
                          {{item.name}}
                        </button>
                         
                        <div v-show="item.display">
                          <div class="card card-body p-0 pr-1" v-if="ifShowProbes(index)">
                            <template v-for="item2 in item.questions">
                              <question :data="item2" :key="item2.id" v-model="item2.answer"/>  
                            </template>
                            <button class="btn btn-outline-primary mt-0" @click="probesAnswersFunction(index)">
                            {{$t('pages.Events.StreamingEvent.send')}}
                          </button>
                          </div>
                          <div class="card card-body" v-if="!ifShowProbes(index)">
                            <answers-probe :probe_id="probes[index].id"/>
                          </div>
                        </div>
                      </div>
                      
                    </template>
                
                    <!-- items -->
                      <div class="row mt-0">
                        <!-- document-footer -->
                        
                        <!-- document-footer -->

                      </div>
                    <!-- items -->
                  </div>
                </template>
              </div>
              
              <div class="row poll px-4 pb-4" v-if="showPoll && event.req_survey">
                <template v-if="questions !== 'answered'">
                  <div class="col-md-12">
                    <h4 class="subtitle2">
                      {{$t('pages.Events.StreamingEvent.weInviteYouToFillOutTheFollowingSurvey')}}
                    </h4>
                  </div>
                  <div class="col-md-12 poll-content">
                  <!-- Survey-Questions-->
                    <template v-for="item in questions">
                      <question :data="item" :key="item.id" v-model="item.answer"/>  
                    </template>
                    <!-- Survey-Questions-->
                        <!-- document-item -->
                      <div class="row mt-0">
                        <!-- document-footer -->
                        <div class="col-md-12" >
                          <button class="btn btn-outline-primary btn-block" @click="surveyAnswersFunction">
                            {{$t('pages.Events.StreamingEvent.send')}}
                          </button>
                        </div>
                        <!-- document-footer -->

                      </div>
                    <!-- items -->
                  </div>
                </template>
              </div>
            </div>
        </div>
      </div>
    </div>

  <!-- footer options -->

    


  </main>
  <!-- content main -->

    <!-- footer options -->

        <div class="footer-option mt-4" :style="'background-color:'+styles.section_div_first_color">
          <div class="col-md-10 mx-auto">
            <div class="row py-4">
              <!-- col 1 -->
              <div class="col-md-6">
                <span class="subtitle2" :style="'color:'+styles.section_text_color">{{$t('pages.Events.StreamingEvent.activity')}}</span>
                <h3 class="title-main" :style="'color:'+styles.section_titles_color">
                  {{activity.name}}
                </h3>
                <span class="speakers" v-for="speaker in activity.speakers" :key="speaker.id" :style="'color:'+styles.section_titles_color">
                  <b :style="'color:'+styles.section_text_color" class="speakers__title">{{$t('pages.Events.StreamingEvent.speaker')}}</b> {{first_letter_uppercase_word(speaker.name)}}
                </span>

                <span class="subtitle2" :style="'color:'+styles.section_text_color"> {{$t('pages.Events.StreamingEvent.hour')}}</span>
                <h3 class="title-main" :style="'color:'+styles.section_titles_color">
                  {{$moment(activity.start_date).format('hh:mm a')}} - {{$moment(activity.end_date).format('hh:mm a')}}
                </h3>
                <p class="description" style="color:white">
                  {{activity.description}}
                </p>

            </div>
            <!-- col 1 -->

            <!-- col 2 -->
            <div class="col-md-6 position-relative" v-if="event.req_networking">
              <button style="width:50%" v-if="!showNet" :style="'border:none; color:'+styles.section_btn_text_color+'; background-color:'+styles.section_btn_color+'; --color-hover:'+styles.section_btn_color_hover+'; --text-hover:'+styles.section_btn_text_color_hover"  class="btn custom-btn btn-outline-primary btn-block" @click="showNetworking">
                {{$t('pages.Events.StreamingEvent.networking')}}
              </button>
              <networking @showNetworking=showNetworking :eventId="event.id" :activityId="activityId" :req_videocall="event.req_videocall"  v-if="showNet"/>
                <img class="logo-event-main" src="@/assets/img/heartOnline-white.png" alt="">
            </div>
            <!-- col 2 -->

            </div></div>



    <!-- footer options -->


  </div>
  </div>


</template>

<script>
import { isLoggedIn } from '@/auth'
import TopNavbar from "@/layout/dashboard/buttonSession.vue";
import question from './components/question'
import networking from './components/networking'
import answersProbe from './components/answersProbes'
import AgoraOnlyAudio from '../../../components/Agora/agoraAudioComponent'
import timeline from './components/timeLineActivities'
import getlang from "@/lang/index.js";

export default {
    name: 'StreamingEvent',
    props:['activityId'],
    components: {question, TopNavbar, networking, answersProbe, AgoraOnlyAudio,timeline},
    data(){
      return{
        hasHall:true,
        halls:[],
        activitiesTime:[],
        uriFront:process.env.VUE_APP_URL_FRONT,
        uriImg:process.env.VUE_APP_API_URL_FILES,
        showNet:false,
        textUpHand:null,
        showUpHand:false,
        upHands:[],
        allMessages:[],
        allMessagesEvent:[],
        message:null,
        messageEvent:null,
        showChat:false,
        showChatEvent:true,
        showTimeline:false,
        activities:[],
        showDoc:false,
        showPoll:false,
        showQuiz:false,
        invitations:[],
        activity:[],
        event:[],
        documents:[],
        questions:[],
        probes:[],
        questionsProbes:[],
        styles:[],
        uri: process.env.VUE_APP_URL_BASE,
        uriImg:process.env.VUE_APP_API_URL_FILES,
        voiceCall:{
          idRequest:null,
          stateVoice: "init",
          leaveVoice:false
        },
        user_id:null,
        authorizeNetworking: 1,
        authorizeMakeQuestion: 1,
        authorizeFiles: 1,
        authorizeSchedule: 1,
        authorizeProbes: 1,
        authorizeSurvey: 1,
        authorizeChat: 1 ,
        showInteractions: true   ,
        authorizationActivity:[],
        mqttConection:null,
        activityNow:0,
        isActiveIn:'',
        hoverStyleMenu:'#8e04cc',
        backgroundIsChat:'',
        backgroundIsChatEvent:'#8e04cc',
        backgroundIsHands:'',
        backgroundIsFiles:'',
        backgroundIsCrono:'',
        backgroundIsSon:'',
        backgroundIsEnc:'',
        activeEnableButtonChatActivity: false,
        activeEnableButtonChatEvent: false,
        enableButtonSendChatActivity:'background-color: rgb(179, 177, 177); pointer-events: none;',
        enableButtonSendChatEvent:'background-color: rgb(179, 177, 177); pointer-events: none;',
        activeEnableButtonChatQuestion:false,
        enableButtonSendChatQuestion:'background-color: rgb(179, 177, 177); pointer-events: none;',
        inNetworking:false,
      }
    },
    computed:{
      bgImg:function(){
        return `background-image:url('${this.uriImg}${this.styles.home_img_background}');
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          content:'';
        `
      },
      
    },
    created() {

      this.user_id = localStorage.getItem('_current_user_id')      
    },
    watch:{
    message:function(val){
        let messages_new=new RegExp(/([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]+[\s]{0,40})$/gm);
        let response_ = messages_new.test(val);
        if(response_){
          this.activeEnableButtonChatActivity= true
          this.enableButtonSendChatActivity = 'background-color: rgb(5, 5, 5); pointer-events: auto;'
        }
        else{
          this.activeEnableButtonChatActivity= false
          this.enableButtonSendChatActivity = 'background-color: rgb(179, 177, 177); pointer-events: none;'
        }
      },
      messageEvent:function(val){
        let messages_new=new RegExp(/([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]+[\s]{0,40})$/gm);
        let response_ = messages_new.test(val);
        if(response_){
          this.activeEnableButtonChatEvent=true
          this.enableButtonSendChatEvent = 'background-color: rgb(5, 5, 5); pointer-events: auto;'
        }else{
          this.activeEnableButtonChatEvent=false
          this.enableButtonSendChatEvent = 'background-color: rgb(179, 177, 177); pointer-events: none;'
        }
      },  
      textUpHand:function(val){
        let messages_new=new RegExp(/([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!]+[\s]{0,40})$/gm);
        let response_ = messages_new.test(val);
        if(response_){
          this.activeEnableButtonChatQuestion=true
          this.enableButtonSendChatQuestion = 'background-color: rgb(5, 5, 5); pointer-events: auto;'
        }else{
          this.activeEnableButtonChatQuestion=false
          this.enableButtonSendChatQuestion = 'background-color: rgb(179, 177, 177); pointer-events: none;'
        }
      },
      'voiceCall.stateVoice':function(newVal){
        console.log("VoiceCall", newVal)
        if(this.voiceCall.stateVoice === 'Authorized'){
          this.$swal.fire({
            title:this.$t('pages.Events.StreamingEvent.endParticipation'),
            position:'bottom-end',
            html:this.$t('pages.Events.StreamingEvent.clickOnFinishToEndParticipation'),
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: `Finalizar`,
            allowOutsideClick:false      
          }).then(rta=>{
            if(rta.isConfirmed){
              this.sendAnswer(this.voiceCall.idRequest, 'UserEnded')
              this.endVoiceParticipation()
            }
          })
        }
      }
    },
    async mounted(){
      // window.addEventListener("keypress", function(event){
      // if (event.keyCode == 13){
      //   event.preventDefault();
      // }
      // }, false);
      if(this.mqttConection==null) console.log('Hola mounted');
      
      this.activityNow = this.activityId
      console.log(this.activityId)
      console.log('hoa')
      if(this.activityId){
        this.getLanguage()
        this.tracking()
        // this.listen()
        await this.getActivity() //quitar si para enero 2022 funciona todo bien
        await this.getStyles()
        // this.getMessages()
        // this.getMessagesEvent()
        //this.getUphands()
        this.getProbes(this.activityId)
        this.getQuestionProbes(this.activityId)
      }
           
      
    },
    destroyed(){
      this.unsubscriptionMqtt()
    },
    methods: {
      first_letter_uppercase_word(str){                
        return str.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase())        
      },
      getLanguage(){
        this.$i18n.locale = getlang.getLanguage();
      },
      async sendAnswer(id, answer=null){
        if(!answer){
          return 
        }
        let params = {
          answer
        }
        try{
          await axios.put(`sendAnswer/${id}`, params)
        }catch(e){
          console.log("Error en respuesta de haundUp", e)
        }
        this.showAnswer = null
      },
      validateTime(question){
        const currentTime = this.$moment(question.currentTime)
        const timeUpdated = this.$moment(question.updated_at)
        let diff = currentTime.diff(timeUpdated,'seconds')
        //console.log(diff)
        if(diff>15 || diff<-15)
          return false
        return true
      },
      async getHalls (){
        //traemos las salas
        try {
          let user_id = localStorage.getItem('_current_user_id')    
          const halls = await axios.get(`showHallsInLineTime/${this.event.id}/${user_id}`)  
          const hallsList = halls.data.data          
          this.halls = hallsList
          // console.log("hallsList:",hallsList);
          // if(hallsList.length > 0){
          //   for(let $i=0;$i<hallsList.length;$i++){
          //     this.halls[$i] =hallsList[$i].hall
          //     //this.halls[$i]['activities']['visible'] = false              
          //   }
          // }else{
          //   this.halls[0] = this.event
          //   this.hasHall = false
          // }          
          console.log('** HALLS ****',this.halls)                    
        } catch (error) {
          console.log(error)
        }
        console.log(this.halls)

      },
      async clearIdActivity(idAct){        
        console.log(idAct)
        //quitar []
        let pIdAct = idAct.slice(1,-1)
        pIdAct = pIdAct+','
        console.log(pIdAct)
        //agrupar en arrays los IDs        
        let arrIds = pIdAct.split(',')
        for(let i=0;i<arrIds.length;i++){
          console.log(arrIds[i])
        }
        //localStorage.setItem('_id_activity_for_hall',actId)
        //return this.getActTimeLine()
      },
      async getActTimeLine(activity){
        //campos necesarios para traer actividades            
        //let activity = localStorage.getItem('_id_activity_for_hall')                  
        let user_id = localStorage.getItem('_current_user_id')                  
        console.log(activity)
        //actividades por sala 
        try {
          const activities = await axios.get(`activityExternal/${activity}/${user_id}`)                     
          console.log(activities.data);
          return activities.data;
        } catch (error) {
          console.log(error)
        }
      },
      confirmRedirect(){
        this.$swal.fire({
            title: "¿Desea salir?",
            text: "Será direccionado a una sala externa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Salir",
            cancelButtonText: "Seguir",
        })
        .then(resultado => {
            if (resultado.value) {
                return true
            } else {
                return false
            }
        });
      },
      urlExternal(opt){                  
        let user_id = localStorage.getItem('_current_user_id')
        let token = localStorage.getItem('_current_token')      
        if(opt && user_id && token){        
            //integracion con event 3d 
            let tockenExternal = ""
            let evenId = localStorage.getItem('eventId')          
            console.log( localStorage.getItem('eventId'))          
            axios.post('createTokenTo3d',{            
                id_user:   user_id,
                id_event: localStorage.getItem('eventId'),            
            })
              .then(response=>{
                  tockenExternal = response.data
                  console.log('token generado, redirigendo...')
                  console.log(tockenExternal)
                  if(tockenExternal!==""){
                    let redirect = opt+'?token='+tockenExternal                                
                    window.location.replace(redirect)                
                  }
              })
              .catch(error=>{
                //no aplica token ya que no tiene info que encriptar
                  console.log('no aplica token ya que no tiene info que encriptar')
                  console.log(error)
                  window.location.replace(opt)                   
              })          
        }else{
          this.$modal.show("modal-notification");
            //  this.$router.push({name:"Login", params:{eventId:this.event.id}});
        }
      },
      voiceQuestion(){
        const self = this
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
            self.sendQuestion('voice')
          })
          .catch(function(err) {
            self.$swal({icon:'error', text:this.$t('pages.Events.StreamingEvent.failedToActivateMicrophone')})
          });
      },
      endVoiceParticipation(){
        this.voiceCall.leaveVoice=true
        setTimeout(()=>{
          this.voiceCall.stateVoice = 'init'
          this.voiceCall.leaveVoice=false
        },1000)
      },
      ifShowProbes(index){
        if(this.probes[index].answers.length > 0){
          const user_id = localStorage.getItem('_current_user_id')
          for(let i=0; i<this.probes[index].answers.length; i++){
            if(this.probes[index].answers[i].user_id == user_id)
              {
                return false;
                break;
              }
          }
        }
        return true
      },
      tracking(){
        let params = {activity_id: this.activityId}
        axios.post('trackingActivity', params)
      },
      showNetworking(){
        this.showNet =! this.showNet
      },
      async sendQuestion(type = "text"){

        // let params = {
        //   activity_id: this.activityId,
        //   question: this.textUpHand,
        //   user_id: localStorage.getItem('_current_user_id'),
        //   type
        // }

        // if(type == 'voice')
        //   params.question = "Quisiera preguntar por voz!"

        // await axios.post('questionActivities', params)
        // const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/question';
        // console.log('aqui estamos:', topic);
        // this.mqttConection.publish(topic, JSON.stringify(params))
        // this.textUpHand = null
        // setTimeout(() => {
        //   this.scrollEndHand()
        // }, 1000);


        let params = {
            activity_id: this.activityId,
            question: this.textUpHand,
            user_id: localStorage.getItem('_current_user_id'),
            type
        }
        let userName=localStorage.getItem('_current_user_name')
        let userLastname=localStorage.getItem('_current_user_lastname')
        if(type == 'voice')
          params.question = "Quisiera preguntar por voz!"
        let response_question=await axios.post('questionActivities', params)
        let params_2 = {
            activity_id: this.activityId,
            question: this.textUpHand,
            user_id: localStorage.getItem('_current_user_id'),
            name:userName,
            lastname:userLastname,
            answer:null,
            id:response_question.data.data.id,
            type
          }
          const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/question';
          this.mqttConection.publish(topic, JSON.stringify(params_2))
          this.textUpHand = null
          setTimeout(() => {
            this.scrollEndHand()
          }, 1000);
      
      },
      fireMessage(){
        let timerInterval
        this.$swal.fire({
          'title':this.$t('pages.Events.StreamingEvent.authorizedQuestion'),
          html: this.$t('pages.Events.StreamingEvent.clickOkToStartRemainingTime'),
          icon: 'warning',
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          timer: 10000,
          timerProgressBar: true,
          didOpen: ()=> {
            //this.$swal.showLoading()
              timerInterval = setInterval(() => {
                const content = this.$swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = this.$moment(this.$swal.getTimerLeft()).format('s')
                  }
                }
              }, 100)
          },
          willClose:()=> {
            clearInterval(timerInterval)
          }
        }).then(rta=>{
          if(rta.isConfirmed){
            this.voiceCall.stateVoice="Authorized"
          } else if (rta.isDenied) {
            this.sendAnswer(this.voiceCall.idRequest, 'UserReject')
            this.$swal.fire(this.$t('pages.Events.StreamingEvent.youHaveCanceledYourRequest'), '', 'info')
          } else {
            this.sendAnswer(this.voiceCall.idRequest, 'LoseRequest')
              this.$swal.fire(this.$t('pages.Events.StreamingEvent.notRespondInTimeForVoiceQuestion'), '', 'info')
          }
        })
      },
      async getUphands(){
        let params = {
          pagination : false
        }
        const user = localStorage.getItem('_current_user_id')
        let url = `questionsForActivity/${this.activityId}/${user}`
        try{
          const response = await axios.get(url, {params})
          if(response.data && response.data.length>0){
              this.upHands = response.data.reverse()         
              this.$nextTick(()=>{
                
                if(Array.isArray(this.upHands)){
                  let fireMessage= false
                  this.upHands.map(item=>{
                    //console.log(item)
                    if(this.validateTime(item) && item.answer ==='Authorized'){
                      fireMessage = true
                      this.voiceCall.idRequest = item.id
                    }

                    if(this.validateTime(item) && item.answer ==='Overrule'){
                      this.endVoiceParticipation()
                    }
                    return item
                  })

                  if(fireMessage)
                    this.fireMessage()
                }
              })
          }

        } catch(e){
          console.log(e)
        }
        setTimeout(() => {
          this.scrollEndHand()
        }, 1000);
      },
      getUphands2($data){
        this.upHands.push($data)
        if(Array.isArray(this.upHands)){
              let fireMessage= false
              this.upHands.map(item=>{
                //console.log(item)
                if(this.validateTime(item) && item.answer ==='Authorized'){
                  console.log('Authorized');
                  fireMessage = true
                  this.voiceCall.idRequest = item.id
                }

                if(this.validateTime(item) && item.answer ==='Overrule'){
                  console.log('Overrule');
                  this.endVoiceParticipation()
                }
                return item
              })

              if(fireMessage)
                this.fireMessage()
        }
        

      },
      functionShowProbe(id){
        if(this.probes[id].display)
          this.probes[id].display = false
        else
          this.probes[id].display = true
      },
      redirecToHallInternal(id){
        console.log(id)
        this.$router.push({name:'Detail-Event', params:{id:id, type:'hall'}});        
      },
      topNavbar(){
        let id = localStorage.getItem('_current_user_id')
        if(id == null){
          return false
        }
        else{
          return true
        }
      },
      // listen(){
      //   Echo.channel('Chat'+this.activityId)
      //   .listen('ChatEvent', (e) =>{
      //     // this.getMessages()
      //   })
      //   .listen('ProbeEvent',e=>{
      //     this.getProbes(this.activityId)
      //   })
      //   Echo.channel('Question'+this.activityId)
      //   .listen('QuestionEvent', (e) =>{
      //     this.getUphands()
      //   })
        
      // },
      subscriptionMqtt(){
        this.mqttConection = this.$mqtt()
        this.mqttConection.activityId = this.activityId

        console.log("subscriptionMqtt:",this.activity.event_id)
        const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/#';
        console.log("subscribe:", topic)
         this.mqttConection.subscribe(topic, function (err, res) {    
          if (err) {
            console.log('🚨 Error when subscribing to topic ' + topic + ': ' + err);
            return;
          } 
          else {
            console.log("subscribed a ")
          }    
        });

        const topic_second = 'eventmovil/'+this.activity.event_id+'/#';
        this.mqttConection.subscribe(topic_second, function (err, res) {    
          if (err) {
            console.log('🚨 Error when subscribing to topic ' + topic_second + ': ' + err);
            return;
          } 
          else {
            console.log("subscribed a "+topic_second)
          }    
        });

      },
      unsubscriptionMqtt(){
        const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId;
        this.mqttConection.unsubscribe(topic)
      },
      listenMQTT(){
        const _this = this;
        console.log(this.activityId);
        this.mqttConection.on('message', function (topic, message) {

          switch (topic) {
            case 'eventmovil/'+_this.activity.event_id+'/'+this.activityId+'/chat':
              const messageJSON = JSON.parse(message.toString())
              _this.getMessages2(messageJSON)
              // _this.getMessages()
              break;
            case 'eventmovil/'+_this.activity.event_id+'/chat':
              const messageJSONEvent = JSON.parse(message.toString())
              _this.getMessages2Event(messageJSONEvent)
              // _this.getMessages()
            break;
            case 'eventmovil/'+_this.activity.event_id+'/'+this.activityId+'/question':
              const questionAnswer = JSON.parse(message.toString())
              if(questionAnswer.user_id==localStorage.getItem('_current_user_id')){
                  if(questionAnswer.answer && questionAnswer.answer!=null){
                    _this.getUphands()
                  }else{
                    _this.getUphands2(questionAnswer);
                  }
              }

              break;
            case 'eventmovil/'+_this.activity.event_id+'/'+_this.activityId+'/probes':
              _this.getProbes(this.activityId)
              break;
            case 'eventmovil/'+_this.activity.event_id+'/'+_this.activityId+'/networking/'+_this.user_id+'/networking/guest_invitation/':
              const msg = JSON.parse(message);

                _this.$swal.fire({
                        position: 'bottom-end',
                        text: msg.creator_name+' quiere conectar contigo. Ve a Networking para iniciar la conversación.',
                        showConfirmButton: true,
                    }).then((result)=>{
                            const topic_of_creator = 'eventmovil/'+_this.activity.event_id+'/'+_this.activityId+'/networking/'+msg.creator_id+'/networking/guest_i_agree/';
                            if(result.isConfirmed){
                                _this.mqttConection.publish(topic_of_creator, JSON.stringify({"i_agree": true, "item":msg.item,  "guest_name":msg.guest_name,  "guest_id":msg.guest_id}))
                            } else {
                                _this.mqttConection.publish(topic_of_creator, JSON.stringify({"i_agree": false, "guest_name":msg.guest_name}))
                            }
                    })

              break;
              case 'eventmovil/'+_this.activity.event_id+'/'+_this.activityId+'/networking/'+_this.user_id+'/networking/messages_receive':
                const msg2 = JSON.parse(message);

                if(_this.inNetworking==false){
                _this.$swal.fire({
                  toast: true,
                  icon: 'info',
                  title: msg2.name+' '+msg2.lastname+' te escribió',
                  animation: false,
                  position: 'bottom-start',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', _this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', _this.$swal.resumeTimer)
                  }
                })
                }
                // console.log("Mensaje de alguien:", msg2);


                    // _this.$swal.fire({
                    //     position: 'bottom-end',
                    //     text: msg2.name+' '+msg2.lastname+' te escribio',
                    //     showConfirmButton: true,
                    // }).then((result)=>{

                    // })
              break;
            default:
              console.log(topic);
              break;
          }
        });
      },
      sendMessagesMQTT(){
        // const mqtt = this.$mqtt()
        // const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/chat';
        // let params = {
        //   message: this.message,
        //   activity_id: this.activityId
        // }
        // this.message = ''
        // axios.post('activityChat', params).then(item =>{
        //   if(item.data){
        //     if(item.data.data==null){
        //       this.$swal({icon:'error', text:'Error in to send  message'})
        //     }else{
        //       this.mqttConection.publish(topic, JSON.stringify(item.data.data[0]))
        //     }
        //   }
        // }).catch(error =>{
        //   this.$swal({icon:'error', text:error})
        // })
        const mqtt = this.$mqtt()
          if(this.message){
            const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activityId+'/chat';
            let params = {
              message: this.message,
              activity_id: this.activityId
            }
            axios.post('activityChat', params).then(item =>{
              if(item.data){
                if(item.data.data==null){
                  this.$swal({icon:'error', text:'Error in to send  message'})
                }else{
                  let userName = localStorage.getItem('_current_user_name')
                  let userLastName= localStorage.getItem('_current_user_lastname')
                  let params_1 = {
                    message: this.message,
                    lastname:userLastName,
                    name: userName,
                    user_id: item.data.data[0].user_id,
                    created_at:item.data.data[0].created_at
                  }
                  this.message = ''
                  this.mqttConection.publish(topic, JSON.stringify(params_1))

                }
              }
            }).catch(error =>{
              this.$swal({icon:'error', text:error})
            })

          }
        // 
        // 
      },
      sendMessagesEventMQTT(){
        const mqtt = this.$mqtt()
        if(this.messageEvent){
        let params = {
              message: this.messageEvent,
              event_id: this.activity.event_id
        }
        axios.post('eventChat', params).then(item =>{

          const topic = 'eventmovil/'+this.activity.event_id+'/chat';
          let userName = localStorage.getItem('_current_user_name')
          let userLastName= localStorage.getItem('_current_user_lastname')
          let userId= localStorage.getItem('_current_user_id')
          let params_1 = {
            message: this.messageEvent,
            lastname:userLastName,
            name: userName,
            user_id: userId,
            created_at: item.data.data.created_at
          }
          this.messageEvent = ''
          this.mqttConection.publish(topic, JSON.stringify(params_1))


        }).catch(error =>{
            this.$swal({icon:'error', text:error})
        })

        }

      }, 
      async getMessages(){
        console.log('Esto es el chat de la actividad');
        let params = {
          pagination : false
        }
        const response = await axios.get(`activityMessages/${this.activityId}`, {params})

        if(response.data.data.length && response.data.data.length>0){
          console.log('LA DATA', response.data.data)
          this.allMessages = response.data.data.reverse()
        }
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
        const response = await axios.get(`eventChat/${this.activity.event_id}`, {params})

        if(response.data.data.length && response.data.data.length>0){
          this.allMessagesEvent = response.data.data.reverse()
        }
        this.scrollEnd()
        setTimeout(() => {
          this.scrollEnd()
        }, 1000);
        
      },
      getMessages2($data){                
        this.allMessages.push($data)
        this.scrollEnd()
        setTimeout(() => {
          this.scrollEnd()
        }, 1000);
      }, 
      getMessages2Event($data){                        
        this.allMessagesEvent.push($data)
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
        axios.post('activityChat', params).then(item =>{
          // this.getMessages()
        }).catch(error =>{
          this.$swal({icon:'error', text:error})
        })

      },
      validateSurveyAnswers(data){
        
        let activeMessageError = false
        data.map(item=>{
          if(item.required === 1 && item.answer === ""){
            activeMessageError = true
          }
        })

        if(activeMessageError){
          return false
          }
        else 
          return true
      },
      surveyAnswersFunction(index){
        const user_id = localStorage.getItem('_current_user_id')
        
        if(!this.validateSurveyAnswers(this.questions)){
          this.$swal({icon:'error', text:this.$t('pages.Events.StreamingEvent.missingFieldsToFill')})
          return
        }
        let count
        let emit = 0 
        this.questions.map(async item=>{
          const forSend = {
            event_id: this.event.id,
            user_id,
            poll_question_id: item.id,
            value:item.answer
          }
          let res
          if(item.answer !== '')
            res = await axios.post(`pollAnswers`,forSend)

          if(res){
              this.questions = "answered"
              count++
          }
           
          if(this.questions === "answered" && emit === 0){
              emit = 1
              this.$swal(this.$t('pages.Events.StreamingEvent.answersSent'))
            }
        })

      },
      probesAnswersFunction(index){
        const user_id = localStorage.getItem('_current_user_id')
        
        if(!this.validateSurveyAnswers(this.probes[index].questions)){
          this.$swal({icon:'error', text:this.$t('pages.Events.StreamingEvent.missingFieldsToFill')})
          return
        }
        let cont = 0;
        this.probes[index].questions.map(async item=>{
          const forSend = {
            question_id: item.id,
            user_id,
            probe_id: item.probe_id,
            value:item.answer
          }
          let res
          if(item.answer !== '')
            res = await axios.post(`probe-answers`,forSend)
            if(res)
              cont ++
        if(cont === this.probes[index].questions.length)
          {
            this.getProbes(this.activityId)
            this.$swal(this.$t('pages.Events.StreamingEvent.answersSent'))}
        })
        

      },
      
      getActivities(){
        axios.get(`activities-event/${this.event.id}`).then(response =>{
          this.activities = response.data.data          
        })
      },
      loadStyleMenu(){        
        this.backgroundIsChat = this.styles.section_btn_color
        //this.backgroundIsChatEvent = this.styles.section_btn_color esta por default al inicio en data()
        this.backgroundIsHands = this.styles.section_btn_color
        this.backgroundIsFiles = this.styles.section_btn_color       
        this.backgroundIsCrono = this.styles.section_btn_color
        this.backgroundIsSon = this.styles.section_btn_color
        this.backgroundIsEnc = this.styles.section_btn_color
        if(this.backgroundIsEnc ==undefined || this.backgroundIsEnc == 'undefined'){
          setTimeout(() => this.loadStyleMenu(), 500);
        }        
      },
      showComponent(type){
        console.log('click',type)
        //style        
        switch(type){
          case'doc':
            this.backgroundIsChat = this.styles.section_btn_color
            this.backgroundIsChatEvent = this.styles.section_btn_color
            this.backgroundIsHands = this.styles.section_btn_color
            this.backgroundIsFiles = this.hoverStyleMenu          
            this.backgroundIsCrono = this.styles.section_btn_color
            this.backgroundIsSon = this.styles.section_btn_color
            this.backgroundIsEnc = this.styles.section_btn_color
          break;
          case'timeline':
            this.backgroundIsChat = this.styles.section_btn_color
            this.backgroundIsChatEvent = this.styles.section_btn_color
            this.backgroundIsHands = this.styles.section_btn_color
            this.backgroundIsFiles = this.styles.section_btn_color          
            this.backgroundIsCrono = this.hoverStyleMenu
            this.backgroundIsSon = this.styles.section_btn_color
            this.backgroundIsEnc = this.styles.section_btn_color
          break;
          case'chat':
            this.backgroundIsChat = this.hoverStyleMenu
            this.backgroundIsChatEvent = this.styles.section_btn_color
            this.backgroundIsHands = this.styles.section_btn_color
            this.backgroundIsFiles = this.styles.section_btn_color          
            this.backgroundIsCrono = this.styles.section_btn_color
            this.backgroundIsSon = this.styles.section_btn_color
            this.backgroundIsEnc = this.styles.section_btn_color
          break;
          case'poll':
            this.backgroundIsChat = this.styles.section_btn_color
            this.backgroundIsChatEvent = this.styles.section_btn_color
            this.backgroundIsHands = this.styles.section_btn_color
            this.backgroundIsFiles = this.styles.section_btn_color          
            this.backgroundIsCrono = this.styles.section_btn_color
            this.backgroundIsSon = this.styles.section_btn_color
            this.backgroundIsEnc = this.hoverStyleMenu
          break;
          case'quiz':
            this.backgroundIsChat = this.styles.section_btn_color
            this.backgroundIsChatEvent = this.styles.section_btn_color
            this.backgroundIsHands = this.styles.section_btn_color
            this.backgroundIsFiles = this.styles.section_btn_color          
            this.backgroundIsCrono = this.styles.section_btn_color
            this.backgroundIsSon = this.hoverStyleMenu
            this.backgroundIsEnc = this.styles.section_btn_color
          break;
          case'uphand':
            this.backgroundIsChat = this.styles.section_btn_color
            this.backgroundIsChatEvent = this.styles.section_btn_color
            this.backgroundIsHands = this.hoverStyleMenu
            this.backgroundIsFiles = this.styles.section_btn_color          
            this.backgroundIsCrono = this.styles.section_btn_color
            this.backgroundIsSon = this.styles.section_btn_color
            this.backgroundIsEnc = this.styles.section_btn_color
          break;
          case 'chat_evento':
            this.backgroundIsChat = this.styles.section_btn_color
            this.backgroundIsChatEvent = this.hoverStyleMenu
            this.backgroundIsHands = this.styles.section_btn_color
            this.backgroundIsFiles = this.styles.section_btn_color          
            this.backgroundIsCrono = this.styles.section_btn_color
            this.backgroundIsSon = this.styles.section_btn_color
            this.backgroundIsEnc = this.styles.section_btn_color
          break;
        }

        if(type == 'doc'){
          this.showDoc =! this.showDoc
          this.showChat = false
          this.showTimeline = false
          this.showPoll = false
          this.showQuiz = false
          this.showUpHand = false
          this.isActiveIn = 'rgb(6 44 40);'
          console.log('ent doc',this.isActiveIn)
          this.getDocuments()
        }
        if(type == 'timeline'){
          this.showTimeline =! this.showTimeline
          this.showChat = false
          this.showDoc = false
          this.showPoll = false
          this.showQuiz = false
          this.showUpHand = false
          this.showChatEvent = false
          this.isActiveIn = 'background-color: rgb(6 44 40);'
          console.log('ent timeline',this.isActiveIn)
          this.getActivities()
          
        }
        if(type == 'chat'){
          this.showChat =! this.showChat
          this.showDoc = false
          this.showTimeline = false
          this.showPoll = false
          this.showQuiz = false
          this.showUpHand = false
          this.showChatEvent = false                              
          this.getMessages()
        }
        if(type == 'poll'){
          this.showPoll =! this.showPoll
          this.showDoc = false
          this.showTimeline = false
          this.showChat = false
          this.showQuiz = false
          this.showUpHand = false
          this.showChatEvent = false
          this.isActiveIn = 'background-color: rgb(6 44 40);'
          console.log('ent poll',this.isActiveIn)
          this.getActivities()
        }
        if(type == 'quiz'){
          this.showQuiz =! this.showQuiz
          this.showDoc = false
          this.showTimeline = false
          this.showChat = false
          this.showPoll = false
          this.showUpHand = false
          this.showChatEvent = false
          this.isActiveIn = 'background-color: rgb(6 44 40);'
          console.log('ent quuiz',this.isActiveIn)
        }
        if(type == 'uphand'){
          this.showUpHand =! this.showUpHand
          this.showQuiz = false
          this.showDoc = false
          this.showTimeline = false
          this.showChat = false
          this.showPoll = false
          this.showChatEvent = false
          this.isActiveIn = 'background-color: rgb(6 44 40);'
          console.log('ent uphand',this.isActiveIn)
          this.getUphands()          
        }
        if(type=='chat_evento'){
          this.showChatEvent =! this.showChatEvent
          this.showChat = false
          this.showDoc = false
          this.showTimeline = false
          this.showPoll = false
          this.showQuiz = false
          this.showUpHand = false
          this.isActiveIn = 'background-color: rgb(6 44 40);'
          console.log('ent chat_evento',this.isActiveIn)
          this.getMessagesEvent()
        }
      },
      getInvitations(){
        axios.get(`activitiesInvitation/${this.activityId}`).then(response=>{
          this.invitations = response.data.data
          this.activityActive = this.invitations[0]
          this.getDocuments()
        })
      },
      getActivity(){
        axios.get(`activities/${this.activityId}`).then(response =>{
          this.activity = response.data
          console.log("EventId:",this.activity.event_id)
          this.getEvent()
          this.getStyles()
          this.getAuthorizationActivity();
          // this.getMessagesEvent()
          this.subscriptionMqtt()
          this.listenMQTT()
        })
      },
      verifyInteractionsAll(req){
          if(!req.req_chat && 
          !req.req_files && 
          !req.req_make_question && 
          !req.req_probes && 
          !req.req_schedule && 
          !req.req_survey && 
          !req.req_chat_event){
            this.showInteractions = false
          }          
          this.loadStyleMenu()
      },
      getEvent(){
        axios.get(`events/${this.activity.event_id}`).then(response=>{
          this.event = response.data[0]
          console.log("this.event:",this.event);
          this.verifyInteractionsAll(this.event)
          if(this.activity.code_streaming == 'null') this.activity.code_streaming = this.event.code_streaming
          this.getQuestions()
          this.getHalls()
          if(this.event && this.event &&  this.event.req_chat_event==1){
            this.getMessagesEvent()
            this.showChat = false
            this.showChatEvent = true
          }else{
            if(this.event && this.event &&  this.event.req_chat==1){
              this.getMessages()
              this.showChat = true
              this.showChatEvent = false
            }
          }
        })
      },

      getStyles(){
        axios.get(`styleEvent/${this.activity.event_id}`).then(response =>{
          this.styles = response.data
        })
      },

      getDocuments(){
        axios.get(`modelDocuements/activity/${this.activity.id}`).then(response=>{
          this.documents = response.data.data
        })
      },
      getProbes(id){
        /* TODO: aqui se traen el sondeo de la DB */
        //axios.get(`probe-questions-activity/${id}`).then(res=>{
        axios.get(`probe-questions-activity-wh/${id}`).then(res=>{
          console.log('probe-questions-activity: ', res)
            this.probes = res.data.data.map(item=>{
              const temp = item.questions.map(item2=>{
                return {
                  ...item2,
                  answer:""
                }
              })
              item.questions = temp
              return {...item, display: false}
            })
        })
        console.log('probes...', this.probes)
      },
      getQuestionProbes(id){
        //axios.get(`probe-questions-probe/${id}`).then(res=>{
        axios.get(`probe-questions-activity-wh/${id}`).then(res=>{
          console.log('response q p', res)
          /* if(res.data === "answered"){
            this.questionsProbes.push(res.data)
          } else {
            const temp = res.data.data.map(item=>{
              return {
                ...item,
                answer:""
              }
            })
            this.questionsProbes.push(temp)
          } */
        })
      },
      getQuestions () { 
        //axios.get(`pollQuestionsEvent/${this.eventId}`).then(response=>{
          axios.get(`pollQuestionsEvent/${this.event.id}`).then(response=>{
            console.log('pollQuestionsEvent: ', response)
          const res = response.data.data
          
          if(response.data === "answered"){
            this.questions = response.data
          } else {
            this.questions = res.map(item=>{
              return {
                ...item,
                answer:""
              }
            })
          }
          //this.$modal.show('encuesta-modal');
        })

      },
      hide () {
          this.$modal.hide('encuesta-modal');
      },
      async getAuthorizationActivity(){
        
        let params = {
          user_id : this.user_id,
          event_id: this.activity.event_id,
          activity: this.activityId
        }
        const response = await axios.get(`authorization-activity`, {params})
        this.authorizationActivity = response.data
        let eventid= this.activity.event_id
        if(this.validateLogin()){
          if(this.authorizationActivity!=true){
            this.$router.push({name:'landingEvent', query: {eventId:eventid} })
          }
        }else{
          this.$router.push({name:'login', query: {eventId:eventid} })
        }
      },
      validateLogin(){
        let user_id = localStorage.getItem('_current_user_id')
        let token = localStorage.getItem('_current_token')
        if(user_id && token){
          return true
        }
        return false
      },
    },
    mount () {
        this.show()
    }
};


</script>

<style scoped>
.timeline-item{
  height: auto !important;
}

.event:before{
  content:'';
	position: absolute;
  top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	/* background-color: hsla(240, 90%, 4%, 0.1); */
}

.content-header{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 5em 0 5em 0;
}

.custom-btn:hover{
  background: var(--color-hover) !important;
  color: var(--text-hover) !important;
}

</style>