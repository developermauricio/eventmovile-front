<template >

  <div class="event wrapper" :style="'background-color:'+styles.section_color_background">

    <!-- header -->
    <div class="header-main" :style="'background-color:'+styles.section_color_background">
        <div class="font-weight-normal flex justify-content-center text-center" >
          <div class="banner-mask">
            <img v-if="styles.section_banner_register" id="logo" :src="uriImg+styles.section_banner_register"/>
          </div>
        </div>
    </div>
  <!-- header -->

    <!-- content main -->
  <main class="content-main row flex justify-content-center" :style="'background-color:'+styles.section_div_first_color">

    <div class="col-md-10 col-lg-8 col-xl-7 p-4 text-center">

          <!-- banner  -->
          <div class="row">
            <div class="col-md-12">
              <img v-if="event.pic_banner" class="event__banner--main" :src="uriImg+event.pic_banner" alt="">
            </div>

            <div class="col-md-12">
                <h4 class="event__title--main" :style="'color:'+styles.section_titles_color">{{$t('pages.Events.RegisterEvent.registrationForm')}}</h4>

              <p class="event__description--main col-9 mx-auto" :style="'color:'+styles.section_text_color">
               {{$t('pages.Events.RegisterEvent.invitationEventMessage')}}
              </p>
              <p class="event__description--main col-9 mx-auto" :style="'color:'+styles.section_text_color">
               ¡{{event.name}}!
              </p>
            </div>
          </div>
          <!-- banner  -->
          <modal
            name="habeas-data"
            :width="720"
            :adaptive="true"
            height="auto"
            :scrollable="true"
            :shiftY="0.4"
            :focusTrap="true"
            @opened="openedF"
            ref="modalref"
          >
            <div class="container">
              <div slot="top-right">
                <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('habeas-data')">
                    ❌
                </button>
              </div>
            <div class=" row">
              <div class="col-md-12 mb-3"><h3>{{$t('pages.Events.RegisterEvent.termsAndConditions')}}</h3></div> 
            </div>
            <div class="row">
              <div class="col-md-12 mb-3">
                <p style="text-align:justify">{{habeasdata.content}}</p>
              </div>
            </div>
            </div>
          </modal>

          <!-- form  -->
          <div class="row flex justify-content-center mt-4">

            <div class="col-md-9">
              
              
              <!-- form content -->
              <form class="text-left formulario-registro" @submit.prevent="registerUser">
                <!-- habeas data -->
                <div class="col-md-12" v-if="habeasdata.position == 'up'">

                    <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" v-model="checkHabeasData" type="checkbox" id="gridCheck1">
                      <label class="form-check-label" for="gridCheck1" :style="'color:'+styles.section_text_color">
                        <a target="_blank" v-if="habeasdata.type=='file'" :href="uri+'storage/'+habeasdata.content">{{$t('pages.Events.RegisterEvent.acceptTermsAndConditions')}}</a>
                        <a target="_blank" v-if="habeasdata.type=='url'" :href="habeasdata.content">{{$t('pages.Events.RegisterEvent.acceptTermsAndConditions')}}</a>
                        <span :style="'color:'+styles.section_text_color" style="cursor:pointer; color:#2D86A7; border-bottom: 1px solid;" v-if="habeasdata.type=='text'" @click="$modal.show('habeas-data')">{{$t('pages.Events.RegisterEvent.acceptTermsAndConditions')}}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- habeas data -->

                <!-- form inputs -->
                <div class="row">
                  <div class="col-12" v-if="showImageRegister">
                      <pictureInput ref="pictureInput" @change="onChange"
                        width="200" height="200" margin="16" radius="50"
                        accept="image/jpeg, image/png"
                        size="2" :customStrings="{ upload: '<h1>Upload it!</h1>', fileSize: 'El tamaño del archivo excede el límite',
                        drag: $t('pages.Events.RegisterEvent.chooseOrDragANewImage')}"/>
                  </div>
                  <div class="col-md-6">
  
                     <div class="form-group">
                      <label for="name" :style="'color:'+styles.section_text_color">{{$t('pages.Events.RegisterEvent.name')}}</label>
                      <input type="text" v-model="form.name" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEvent.name')">
                    </div>

                  </div>
                  <div class="col-md-6">

                     <div class="form-group">
                      <label for="name" :style="'color:'+styles.section_text_color">{{$t('pages.Events.RegisterEvent.lastName')}}</label>
                      <input type="text" v-model="form.lastname" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEvent.lastName')">
                    </div>

                  </div>
                </div>
                <!-- form inputs -->

                <!-- form inputs -->
                <div class="row">
                  <div class="col-md-6"  v-if="event.type && event.type.name == 'Híbrido'">

                     <div class="form-group">
                      <label for="name" :style="'color:'+styles.section_text_color">{{$t('pages.Events.RegisterEvent.email')}}</label>
                      <input :disabled="update_user ? '' : disabled" type="email" v-model="form.email" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEvent.email')">
                    </div>

                  </div>
                  <div class="col-md-12"  v-else>

                     <div class="form-group">
                      <label for="name" :style="'color:'+styles.section_text_color">{{$t('pages.Events.RegisterEvent.email')}}</label>
                      <input :disabled="update_user ? '' : disabled" type="email" v-model="form.email" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEvent.email')">
                    </div>

                  </div>

                  <div class="col-md-6"  v-if="event.type.name == 'Híbrido'">
                     <div class="form-group">
                       <label :style="'color:'+styles.section_text_color" for="type_event">{{$t('pages.Events.RegisterEvent.selectTypeOfAssistance')}}</label>
                      <select @change="valLimit" v-model="form.event_type_id" class="custom-select d-block w-100" id="type_event" required="">
                        <!-- <option v-for="mytype in eventTypes" :key="mytype.id" v-if="mytype.name != 'Híbrido'" :value="mytype.id">{{mytype.name}}</option> -->
                        <option  :key="1"  :value="1" selected>Virtual</option>
                      </select>
                      
                    </div>

                  </div>
                  <!--  
                  // <div class="col-md-6">
                  //    <div class="form-group">
                  //     <label for="name" :style="'color:'+event.third_color">Telefono</label>
                  //     <input type="text" v-model="form.phone" class="form-control" id="name" placeholder="Nombre">
                  //   </div>

                  // </div>
                  -->
                </div>

                <!-- form inputs -->

                <!-- dynamic form -->
                <div class="row" >
                  <div class="col-md-6" v-for="(field, index) in fields" :key="index">
                    <div class="form-group">
                      <label for="name" :style="'color:'+ styles.section_text_color"> {{field.name}}<template v-if="field.required === 1 ">*</template> </label>

                      <input @change="getValue($event, field.id, field)"  v-if="field.type == 'text' && field.required == true"  type="text" class="form-control"  :placeholder="field.name" required>
                      <input @change="getValue($event, field.id, field)"  v-if="field.type == 'text' && field.required == false"  type="text" class="form-control"  :placeholder="field.name">

                      <textarea @change="getValue($event, field.id, field)"  v-if="field.type == 'textarea' && field.required == true"   class="form-control" :placeholder="field.name" required/>
                      <textarea @change="getValue($event, field.id, field)"  v-if="field.type == 'textarea' && field.required == false"   class="form-control" :placeholder="field.name"/>

                      <input @change="getValue($event, field.id, field)"  v-if="field.type == 'number' && field.required == true"  type="number" class="form-control"  :placeholder="field.name" required>
                      <input @change="getValue($event, field.id, field)"  v-if="field.type == 'number' && field.required == false"  type="number" class="form-control"  :placeholder="field.name">

                      <select @change="getValue($event, field.id, field)"  v-if="field.type == 'select' && field.required == true" class="custom-select d-block w-100" required>
                        <option value="none" selected disabled hidden> 
                          {{$t('pages.Events.RegisterEvent.chooseAnOption')}}
                        </option>
                        <option v-for="option in arrayOptions(field.options)" :key="option" :value="option">{{option}}</option>

                      </select>
                      <select @change="getValue($event, field.id, field)"  v-if="field.type == 'select' && field.required == false" class="custom-select d-block w-100">
                        <option value="none" selected disabled hidden> 
                          {{$t('pages.Events.RegisterEvent.chooseAnOption')}} 
                        </option>
                        <option v-for="option in arrayOptions(field.options)" :key="option" :value="option">{{option}}</option>

                      </select>

                    </div>

                  </div>
                </div>
                <!-- dynamic form -->
                <!-- Password-->
                <div class="row" v-if="event.password == null">
                  <div class="col-md-6">

                     <div class="form-group">
                      <label for="name" :style="'color:'+styles.section_text_color">{{$t('pages.Events.RegisterEvent.password')}}</label>
                      <input :type="typeInput" v-model="form.password" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEvent.password')">
                    </div>

                  </div>
                  <div class="col-md-6">
                     <label for="name"  :style="'color:'+styles.section_text_color">{{$t('pages.Events.RegisterEvent.confirmPassword')}}</label>
                    <div class="input-group flex-nowrap">
                      <div class="input-group-prepend">
                      </div>
                      <input :type="typeInput" class="form-control" v-model="vPassword" :placeholder="$t('pages.Events.RegisterEvent.confirmPassword')" aria-label="Username" aria-describedby="addon-wrapping">
                      <button  :style="'border:none; background-color:'+styles.section_btn_color+'; color:'+styles.section_btn_text_color" @click.prevent="showPassword">
                        <span class="ti-eye"></span>
                      </button>
                     
                    </div>
                    
                  </div>
                </div>
                <!-- Password-->

                <!-- form footer -->
                <div class="row">
                  <div class="col-md-12" v-if="habeasdata.position == 'down'">
                      <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox"  v-model="checkHabeasData" id="gridCheck2">
                        <label class="form-check-label" for="gridCheck2" :style="'color:'+styles.section_text_color">
                          <a target="_blank" v-if="habeasdata.type=='file'" :href="uriImg+'storage/'+habeasdata.content">{{$t('pages.Events.RegisterEvent.acceptTermsAndConditions')}}</a>
                          <a target="_blank" v-if="habeasdata.type=='url'" :href="habeasdata.content">{{$t('pages.Events.RegisterEvent.acceptTermsAndConditions')}}</a>
                          <span :style="'color:'+styles.section_text_color" v-if="habeasdata.type=='text'" @click="$modal.show('habeas-data')">{{$t('pages.Events.RegisterEvent.acceptTermsAndConditions')}}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 flex justify-content-center">
                    <button type="submit" class="btn custom-btn block border-0 btn-block" :style="'background-color:'+styles.section_btn_color+'; color:'+styles.section_btn_text_color+'--color-hover:'+styles.section_btn_color_hover+'--text-hover:'+styles.section_btn_text_color_hover">
                      {{$t('pages.Events.RegisterEvent.signUp')}}
                      <div v-if="showLoader" class="loader"></div>
                    </button>
                  </div>
                </div>
                <!-- form footer -->


              </form>
            </div>
            <!-- form content -->

          </div>
          <!-- form -->
    </div>

  </main>
   <!-- content main -->

</div>



</template>

<script>

import pictureInput from 'vue-picture-input'
import { required } from "vuelidate/lib/validators"
import getlang from "@/lang/index.js"

export default {
  name:'RegisterEvent',
  components: {
    pictureInput
  },
  data(){
    return{
      eventTypes:[],
      showLoader:false,
      typeInput:'password',
      checkHabeasData:false,
      habeasdata:[],
      uri: process.env.VUE_APP_API_URL,
      uriImg:process.env.VUE_APP_API_URL_FILES,
      valueOptions:[],
      event:{
        type:{
          name:""
        }
      },
      styles:[],
      fields:[],
      eventId:null,
      tokenInvitation:null,
      vPassword:'',
      uri: process.env.VUE_APP_API_URL,
      uriImg:process.env.VUE_APP_API_URL_FILES,
      form:{
        name:'',
        phone:'',
        lastname:'',
        email:'',
        password:'',
        event:'',
        event_type_id:null,
      },
      paymentActive:false,
      tickets:{},
      quanty: 0,
      ticket_id:"",
      authorizationRegister:true,
      update_user: false
    }
  },
  validations:{
    vPassword:{required},
    form:{
      lastname:{required},
      name:{required},
      email:{required},
      password:{required},
    }
  },
  async created(){
    this.getLanguage()
    this.eventId = this.$route.query.eventId
    if(this.$route.query.email){
      this.form.email = this.$route.query.email
      this.update_user = true 
    }
    await this.getEvent()
    this.getFieldsEvent()
    this.getHabeasData()
    await this.getStyles()
    this.getEventTypes()
  },
  computed:{
      bgImg:function(){
        if(this.event.pic_background)
          return `background-image:url('${this.uriImg}${this.event.pic_background}');
            background-color:${this.event.first_color}
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            content:'';
          `;
        else
          return ""
      },
      showImageRegister:function(){
        if(this.event.image_on_register){
          if(this.event.image_on_register == 1)
            return true
          else
            return false
        }
        else
          return false
      }
    },
  methods:{
    verifyForPayment(){
      let payment = this.$route.query.payment
      let ticket_id = this.$route.query.ticket_id
      let quanty = this.$route.query.quanty
      if(payment=='true' || payment==true){
        if(this.event && this.event.tickets){
          this.event.tickets.map((e)=>{
            if(e.id==ticket_id){
              this.paymentActive = true
              this.tickets={
                ...e
              }
              this.quanty = quanty
              this.ticket_id = e.id
            }
          })
        }
      }
    },
    getLanguage(){
      this.$i18n.locale = getlang.getLanguage();
    },
    openedF(e){
      
    },
    onChange(image){
      if (image) {
        //console.log("Picture loaded.");
        this.image = image
      } else {
        this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEvent.fileNotSupported')})  
      }

    },
    async valLimit(){
      const limit = this.event.people_limit-this.event.people_event 
      if(limit <= 0 && this.form.event_type_id == 2){
        this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEvent.sorryWeReached')+
         $t('pages.Events.RegisterEvent.theVirtualModeMessage')})
      }
    },
    async getEventTypes(){
      const response = await axios.get('eventTypesExt').catch(error=>{
        this.$swal({icon:'error', text:error.request.response})
      })
      this.eventTypes = response.data.data
    },
    async onSubmit(form){
      window.axios.post('auth/basic', form).then(response=>{
        const user = response.data
        localStorage.setItem("_current_user_name", user.name)
        localStorage.setItem("_current_user_lastname", user.lastname)
        localStorage.setItem("_current_user_id", user.id)
        localStorage.setItem("_current_user_email", user.email)
        localStorage.setItem("_current_role_id", user.roles[0].id)
        localStorage.setItem("_current_role_name", user.roles[0].name)
        localStorage.setItem("_current_model_id", user.model_id)
        localStorage.setItem("_current_token", user.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        switch(user.roles[0].name){
          case 'guest': 
            localStorage.setItem("_current_event_id", this.eventId)
            this.$swal(this.$t('pages.Events.RegisterEvent.welcome'))
            // if(this.paymentActive){
              // if(this.event.payment_on_login === 0 || !this.event.payment_on_login)
              //   this.$router.push({path:'Landing-Event', query: {eventId:this.eventId,payment:true,ticket_id:this.ticket_id, quanty:this.quanty} })
              // else
              //   this.$router.push({name:'Payment-Event', query: {eventId:this.event.id} })
              // this.$router.push({name:'Payment-Event', query: {eventId:this.event.id} })
            // }else{
              // if(this.event.payment_on_login === 0 || !this.event.payment_on_login)
              //   this.$router.push({path:'Landing-Event', query: {eventId:this.eventId} })
              // else
              //   this.$router.push({name:'Payment-Event', query: {eventId:this.event.id} })
              // this.$router.push({path:'Landing-Event', query: {eventId:this.eventId} })
            // }
            if(this.paymentActive){
              this.$router.push({path:'Landing-Event', query: {eventId:this.eventId,payment:true,ticket_id:this.ticket_id, quanty:this.quanty} })
            }else{
              this.$router.push({path:'Landing-Event', query: {eventId:this.eventId} })
            }
            

            let params = {
              event_id:this.eventId,
              user_id:user.id
            }
            axios.post('loginTracking', params).then(resp=>{
              localStorage.setItem("_current_tracking_login", resp.data.data.id)
            }).catch(error => {
              console.log(error)
            })
          break;
          default: this.$router.push({ name: "Mis Eventos" }); break;
        }
        
      }).catch(error =>{
        this.$swal({
          icon:"error", text:this.$t('pages.Events.RegisterEvent.incorrectEmailOrPassword')
        })
      })
    },
    showPassword(){
      if(this.typeInput == "text") this.typeInput = "password"
      else this.typeInput = "text"
    },
    getValue(e, id, field = null){
      this.valueOptions.push({id:id, value:e.target.value})
    },
    arrayOptions(array){
      array = array.slice(1)
      array = array.slice(0, -1)
      array = array.split(',')
      return array
    },
      
    getFieldsEvent(){
      axios.get(`fieldsEventExternal/${this.eventId}`).then(response =>{
        this.fields = response.data.data
      })
    },
    async getEvent(){
      console.log("entro a get event");
      axios.get(`showEvent/${this.eventId}`).then(response =>{
        this.event = response.data[0]
        console.log("entro a get event 1:");
        console.log(this.event)
        let endDate = this.$moment(this.event.end_date).format('YYYY-MM-DD HH:mm:ss')
        let today = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        console.log("entro a get event 2");
        this.verifyForPayment();
        if(this.event.actived ==false || endDate <= today){
          this.$swal({icon:'error',text:this.$t('pages.Events.RegisterEvent.theRegistrationProcess')})
          this.$router.push({path:'Landing-Event', query: {eventId:this.event.id} })
        }
      })
    },

    getStyles(){
      axios.get(`styleEvent/${this.eventId}`).then(response =>{
        this.styles = response.data
      })
    },

    getHabeasData(){
      console.log("this.eventId:",this.eventId);
      axios.get(`habeasdataExternal/${this.eventId}`).then(response=>{
        this.habeasdata = response.data
        console.log("this.habeasdata:",response.data);
      })
    },
    async registerUser(){
      if(this.checkHabeasData == false){
        this.$swal(this.$t('pages.Events.RegisterEvent.obligatoryAcceptTermsAndConditions'))
        return
      }



      if(this.event.password != null){
        this.form.password = this.event.password
        this.vPassword = this.event.password
      }
      this.$v.form.$touch()
      if(this.$v.form.$error) return

      
      let FieldsRequireds = 1
      //console.log(this.fields)
      if(Array.isArray(this.fields))
        this.fields.map(field=>{
          
          if(field.required === 1){
            
            const value = this.valueOptions.filter(item=> item.id === field.id)
            //console.log(value)
            if(value.length > 0){
              if(value[0].value === '')
                FieldsRequireds = 0
            } else {
              FieldsRequireds = 0
            }
          }
        })

        if(FieldsRequireds !== 1){
          this.$swal(this.$t('pages.Events.RegisterEvent.fillInAllTheRequiredFields'))
          return
        }
      
      const peopleLimit = await axios.get(`peopleLimit/${this.event.id}`)

      if(peopleLimit.data <= 0 && this.form.event_type_id == 2) {
        this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEvent.sorryWeReached')+
         this.$t('pages.Events.RegisterEvent.theVirtualModeMessage')})
        return
      }

      if(this.form.password != this.vPassword){
        this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEvent.passwordsDontMatch')})
        this.form.password = ''
        this.vPassword = '' 
      }else{
        let verify = 0
        this.showLoader = true
        this.form.event = this.eventId
         const response = await axios.get(`validateUser/${this.form.email}`)
         console.log("Reconocer");
         console.log(response);
        if(response.data == false ){
          //  const user = response.data.data
          if(this.image)
            this.form.pic = this.image
          const response = await axios.post('auth/register', this.form).catch(error =>{
            this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEvent.failedToRegisterUser')})
          })
         const user = response.data.data
          // let dataPost = {
          //   user_id:user.id,
          //   actived:true,
          //   token:this.tokenInvitation
          // }
          if(this.valueOptions.length == 0){
            const eventUser = {
              user_id: user.id,
              event_id: this.form.event,
              event_type_id: this.form.event_type_id,
              message_email_1: this.$t('pages.Events.RegisterEvent.successfulRegistration'),
              message_email_2: this.$t('pages.Events.RegisterEvent.virtualAndFacetoFace'),
              message_email_3: this.$t('pages.Events.RegisterEvent.goToTheEventSite'),
              message_email_4: this.$t('pages.Events.RegisterEvent.halls'),
              message_email_5: this.$t('pages.Events.RegisterEvent.start'),
              message_email_6: this.$t('pages.Events.RegisterEvent.ends'),
              message_email_7: this.$t('pages.Events.RegisterEvent.addToCalendar')
            }
            await axios.post('eventUsers', eventUser).catch(error=>{
              this.$swal({icon:'error', text:error.request.response})
            })
          }else{
            await Promise.all(this.valueOptions.map(async item=>{
              let dataValue = {
                register_id:item.id,
                user_id:user.id,
                value:item.value
              }
              
              await axios.post('dataRegistersExternal', dataValue).catch(error=>{
                console.log(error)
              })
            }))
            const eventUser = {
              user_id: user.id,
              event_id: this.form.event,
              event_type_id: this.form.event_type_id,
              message_email_1: this.$t('pages.Events.RegisterEvent.successfulRegistration'),
              message_email_2: this.$t('pages.Events.RegisterEvent.virtualAndFacetoFace'),
              message_email_3: this.$t('pages.Events.RegisterEvent.goToTheEventSite'),
              message_email_4: this.$t('pages.Events.RegisterEvent.halls'),
              message_email_5: this.$t('pages.Events.RegisterEvent.start'),
              message_email_6: this.$t('pages.Events.RegisterEvent.ends'),
              message_email_7: this.$t('pages.Events.RegisterEvent.addToCalendar')
            }
            await axios.post('eventUsers', eventUser).catch(error=>{
              this.$swal({icon:'error', text:error.request.response})
            })
          }
          
        }else{
          console.log('responder');
          console.log(response);
          if(response.data.status=="completar_registro"){

            await Promise.all(this.valueOptions.map(async item=>{
                let dataValue = {
                  register_id:item.id,
                  user_id:response.data.id,
                  value:item.value
                }
                await axios.post('dataRegistersExternal', dataValue).catch(error=>{
                  console.log(error)
                })                

            }))
            
          }else{
            await Promise.all(this.valueOptions.map(async item=>{
              let dataValue = {
                register_id:item.id,
                user_id:response.data.id,
                value:item.value
              }
              await axios.post('dataRegistersExternal', dataValue).catch(error=>{
                console.log(error)
              })
              

            }))
          }

          
          const eventUser = {
            user_id: response.data.id,
            event_id: this.form.event,
            event_type_id: this.form.event_type_id,
            message_email_1: this.$t('pages.Events.RegisterEvent.successfulRegistration'),
            message_email_2: this.$t('pages.Events.RegisterEvent.virtualAndFacetoFace'),
            message_email_3: this.$t('pages.Events.RegisterEvent.goToTheEventSite'),
            message_email_4: this.$t('pages.Events.RegisterEvent.halls'),
            message_email_5: this.$t('pages.Events.RegisterEvent.start'),
            message_email_6: this.$t('pages.Events.RegisterEvent.ends'),
            message_email_7: this.$t('pages.Events.RegisterEvent.addToCalendar')            
          }
          let resp1 = await axios.post('eventUsers', eventUser).catch(error=>{
            this.$swal({icon:'error', text:error.request.response})
          })
          if(resp1.data.message == "User in event exists") verify++
          if(this.update_user){
            verify = 0;
          }
          if(verify == 0){
            let params = {password: this.form.password}
            if(this.update_user){
              params.name = this.form.name
              params.lastname = this.form.lastname
            }
            await axios.put(`restorePw/${response.data.id}`, params).catch(error=>{
              this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEvent.errorUpdatingPasswordMessage')})
            })
          }
        }
        this.showLoader = false
        let form = {
          email: this.form.email,
          password: this.form.password
        }
        if(verify == 0){
          await this.onSubmit(form)
        }else{
          this.$router.push({name:'Login', params: {eventId:this.eventId} })
          this.$swal({title:this.$t('pages.Events.RegisterEvent.theAccountIsAlreadyRegisteredMessage')})
        }
      }
    },
    async getTickets(){

      const response = await axios.get(`ticketsEventExternal/${this.eventId}`)
      response.data.data
      this.validatePriceOfTicket(response.data.data);
    },
    validatePriceOfTicket(tickets){
      if(tickets && tickets.length>0){
        tickets.map((e)=>{
          if(e.unit_price>0){
            this.authorizationRegister = false;
          }
        })
          
      }
    }
  }


};
</script>

<style >

.loader {
  margin-left: 48%;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}


.tickets__wrapper {

  background: white;
  border-radius: 10px;
  padding: 20px 10px;

}
.tickets__header {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
}
.tickets__icon {
  font-size: 3rem;
}
.tickets__label {
  display: block;
}
.tickets__title {
  font-weight: bold;
  font-size: 1.5rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.tickets__description {
  font-size: 0.9rem;
}
.tickets__num {
  font-size: 7rem;
  text-align: center;
  font-weight: bold;
  display: block;
  margin: -2rem 0 0;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.tickets__subtitle {
  font-size: 1.2rem;
  text-align: center;
  display: block;
  margin: -30px 0 -20px;
}

.tickets__footer {
  border-top: 1px dotted #e0e0e0;;
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
}

.tickets__price {
  font-size: 2rem;
  font-weight: bold;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.tickets__btn {
  margin: 1rem 0 !important;
  width: 100%;
}


/* Events */

.event__label {
  color:#f161e1;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.event__date {
  color:#f161e1;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.event__date--main {
  color:#f161e1;
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.event__title--main {
  font-size: 2rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
}

.event__title {
  font-size: 1.5rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.event__description {
  color: white;
}

.event__description--main {
  color: white;
  font-size: 1.2rem;
}

.event__banner {
    width: 100%;
    border-radius: 20px;
}

.event__banner--main {
    width: 100%;
    border-radius: 20px;
}

.event__link {
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  width: auto;
  margin-top: 1rem;
}


/* CREATEGICA */

.formulario-registro label{
  color: #fff;
}

#logo{
  width: 100%;
  height: 100%;
  margin: 0 !important;
  object-fit: cover;
  object-position: center;
}

.custom-btn:hover{
  background: var(--color-hover) !important;
  color: var(--text-hover) !important;
}

.banner-mask{
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  display: block;
}

/** link terminos condiciones */
#linkFalse:hover {
  color:rgb(10, 10, 128);
  cursor: pointer;
}
</style>
