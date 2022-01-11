<template>
  <div :style="'background-color:'+styles.home_color_background+';'">        
    <div id="i2y1" :style="'background-color:' + styles.home_div_first_color" class="topbar">
      <div id="isvv" class="topbar_left">
        <img
          id="iian"
          :src="uriImg+styles.email_img_logo"
          class="topbar_logo"/>
      </div>
      <div v-if="inSession" id="iqjq" class="topbar_right">
        <button @click="logOut" >Cerrar sesión</button>
        <div id="ichy" class="notification_ico">
          <img id="iamg-2" :src="uriImg+styles.pic_banner" class="notification_ico_img"/>
        </div>
        <div id="igqbem" class="profile_img"></div>
      </div>      
    </div>
    <div class="cont_gen" :style="'background-color:'+styles.home_color_background+';'">      
      <div id="impnhu" class="event_detail_cont">
        <div id="i8nezx" class="ornament_top"></div>
        <div id="ilg1eu" :style="'background-color:' + styles.home_div_first_color" class="event_detail">
          <img :src="uriImg+styles.wa_banner_one"  id="i14jgf"/>
              <div id="iw9vf" class="slider_event_cont">          
              <router-link  class="slider_event_el" :to="{name:'MapaWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Mapa
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>                            
                <router-link class="slider_event_el" :to="{name:'AlbumWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Album
                  </div>
                  <p class="slider_event_el_p"> </p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>      
                <router-link class="slider_event_el" :to="{name:'FeriaWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Feria comercial
                  </div>
                  <p class="slider_event_el_p"> </p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>  
              <router-link class="slider_event_el" :to="{name:'SpeakerWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Speakers
                  </div>
                  <p class="slider_event_el_p"> </p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>
              <router-link class="slider_event_el" :to="{name:'EventSchedule' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit"><!--{{$t('pages.Events.LandingEvent.schedule')}}-->Agenda</div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>          

              <router-link class="slider_event_el" :to="{name:'StreamingWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Transmisión
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>          
              <router-link class="slider_event_el" :to="{name:'qyaWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Q&A
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>          
              <router-link class="slider_event_el" :to="{name:'SondeosWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Sondeos
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>          
              <router-link class="slider_event_el" :to="{name:'RecursosWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Recursos
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>          
              <router-link class="slider_event_el" :to="{name:'NetworkingWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Networking
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>                                  
              <router-link class="slider_event_el" :to="{name:'EncuestaWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Encuesta
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>          
              <router-link class="slider_event_el" :to="{name:'CertificadoWA' }">
                  <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_left.png"
                  class="left_decoration" />
                  <div class="slider_event_el_cont"><img
                      src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/streaming.svg"
                      class="slider_event_el_img" />
                  <div class="slider_event_el_tit">Certificado
                  </div>
                  <p class="slider_event_el_p"></p>
                  </div><img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/ornament_right.png"
                  class="right_decoration" />              
              </router-link>                            
          </div>
          <div id="ix5yzi" class="event_detail_date">
            <img
              src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/calendar.svg"
              id="ibagxz"
              class="event_detail_date_img"
            />
            <div id="iumpvf" class="event_detail_date_cont">
              <div id="i3lbxv"  :style="'color:'+styles.home_text_color+';'" class="event_detail_date_date">{{$moment(event.start_date).format('LL')}}</div>
              <div id="i3d40g"  :style="'color:'+styles.home_text_color+';'" class="event_detail_date_hour">{{$moment(event.start_date).format("hh:mm a")}}</div>
            </div>
          </div>
          
          <div id="i1gdpj" class="event_detail_date">
            <img src="https://dyna.cooperativaespecializada.co/wp-content/uploads/2021/11/location.svg" id="i3ryef" class="event_detail_date_img"/>
            <div id="ijwgos" class="event_detail_date_cont">              
              <div class="event_detail_date_hour">
                <div :style="'color:'+styles.home_text_color+';'" id="i6fiz8">{{event.location}}</div>                
              </div>
            </div>
          </div>          
          <div id="ihrgk8" class="event_detail_txt">
            <div id="iw5fqp"  :style="'color:'+styles.home_titles_color+';'" class="event_detail_txt_tit">
              Acerca del Evento
            </div>
            <div class="text-justify" id="iw5eb7">              
              <p :style="'color:'+styles.home_text_color" class="event_detail_txt_p" v-html="event.description"></p>
            </div>
          </div>
        </div>
        <div id="iutb0k" class="ornament_bottom"></div>
      </div>
    </div>
    
    <div v-if="inSession == false" :style="'background-color:'+styles.home_color_background+';'" class="event_bottom_bar">      
      <router-link class="event_bottom_bar_btn1" :style="'color:'+styles.home_btn_text_color+'; background-color:'+styles.home_btn_color+';font-size: 20px;'+'--color-hover:'+styles.home_btn_color_hover" :to="{name:'loginWA', params:{pswd:this.contPswd}}">
        {{$t('pages.Events.LandingEvent.loginHere')}}
      </router-link>      
      <button id="ibyuns" :style="'color:'+styles.home_btn_text_color+'; background-color:'+styles.home_btn_color+';font-size: 20px;'+'--color-hover:'+styles.home_btn_color_hover" class="event_bottom_bar_btn2">registrate</button>
    </div>
    <a v-if="inSession" id="i7rmus" class="float_button">
        <vue-qr style="margin-left: -177%;" :text="dataUser" :size="200"></vue-qr>
    </a>
        
  </div>
</template>
<script>
import "@/assets/css/style-wa.css"
import getlang from "@/lang/index.js"
import push from 'push.js'
import VueQr from 'vue-qr'
export default {
  components:{getlang, VueQr},
    props:{
        webAppPath: {
          type: String,
          default:''
        },
        inSession:{
          type:Boolean,
          default:false          
        },
        dataUser:{
          type: String,
          default:'data user'
        }
    },
    mounted(){         
      if(this.webAppPath!=='')             {
        localStorage.setItem('webAppPath',this.webAppPath)                    
      }      
      let validPath = localStorage.getItem('webAppPath')
      if(validPath!==''){        
        this.validWebApp(validPath)
      }else{
        this.validWebApp(this.webAppPath)
      } 
      setTimeout(() => this.validNotifications(), 5000);      
    },
    data() {
        return{
            event:{},
            eventId:0,
            onLogin:false,
            onRegister:false,            
            styles:[],
            uriImg: process.env.VUE_APP_API_URL_FILES,   
            contPswd:'0',         
        }
    },
    methods:{
      getLanguage(){
        this.$i18n.locale = getlang.getLanguage();
      },    
      logOut(){
        this.inSession = false
        localStorage.clear()
        this.$swal('Haz salido con éxito')
      }, 
      validNotifications(){
        let _this = this
          push.create('Sondeo!',{
              body: "Tiene un sondeo pendiente!",
              icon: '/icon.png',
              timeout:5000,            
              onClick: function () {
                  window.focus();
                  _this.$router.push({ name: "SondeosWA"})   
                  this.close();
              }
          });
      },         
      validWebApp(path_web_app){
          let data = new FormData
          data.append('path_wep_app',path_web_app)
          axios.post('validPathEvent',data).then(res=>{                
              this.eventId = res.data[0].id
              localStorage.setItem('eventId',this.eventId)
              //cargamos los styles
              this.getStyles(res.data[0].id)
              //traemos la info del evento
              this.getEvent()
          }).catch(error=>{   
              this.$swal("No existe evento asociado a este dominio")
              this.$router.push({ name: "notFoundPage"})   
          })            
      },
      getStyles(eventId){
          let checkStyle = localStorage.getItem('style-event')
          //if(checkStyle==null){ almacenar style en local storage
              axios.get(`styleEvent/${eventId}`).then(response =>{
              //console.log('this.styles:',response.data );            
                  localStorage.setItem('style-event', JSON.stringify(response.data));
                  this.styles = response.data 
              })                
          /* }else{
              this.getStyleLocalStorage()
          } */
      },    
      getStyleLocalStorage(){
          let styleEvent = localStorage.getItem('style-event')
          this.styles = JSON.parse(styleEvent)
          console.log("alma",styleEvent)
          console.log("almacenado:",this.styles)
          if(this.styles==null){
              this.getStyles()
          }
      },            
      getEvent(){            
          axios.get(`showEvent/${this.eventId}`).then(response =>{
              this.event = response.data[0]   
              this.contPswd = response.data[0].password.trim()    
              alert(this.contPswd)                  
          })
      },        
    },
};
</script>

<style>

</style>