<template >

  <div class="event wrapper" :style="'background-color:'+styles.section_color_background">

    <!-- header -->
    <div class="header-main px-4">
        <div class="font-weight-normal flex justify-content-center text-center" >
            <!-- <img id="logo" style="width:20%" :src="uri+'storage/'+styles.home_img_logo"/> -->
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
              <img class="event__banner--main" :src="uriImg+event.pic_banner" alt="">
            </div>

            <div class="col-md-12">
                <h4 :style="'color:'+event.second_color" class="event__title--main">{{$t('pages.Events.RegisterEventToken.registrationForm')}}</h4>

              <p class="event__description--main col-9 mx-auto">
               {{$t('pages.Events.RegisterEventToken.enterInformationInvitationMessage')}}
              </p>
              <p class="event__description--main col-9 mx-auto">
                ¡{{event.name}}!
              </p>
            </div>
          </div>
          <!-- banner  -->
          <modal
            name="habeas-data"
            :width="720"
            height="auto"
            :scrollable="true"
          >
            <div class="container">
            <div class=" row">
              <div class="col-md-12 mb-3"><h3>{{$t('pages.Events.RegisterEventToken.termsAndConditions')}}</h3></div> 
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
                      <input class="form-check-input" type="checkbox" id="gridCheck">
                      <label class="form-check-label" for="gridCheck" :style="'color:'+event.second_color">
                        <a target="_blank" v-if="habeasdata.type=='file'" :href="uri+'storage/'+habeasdata.content">{{$t('pages.Events.RegisterEventToken.acceptTermsAndConditions')}}</a>
                        <a target="_blank" v-if="habeasdata.type=='url'" :href="habeasdata.content">{{$t('pages.Events.RegisterEventToken.acceptTermsAndConditions')}}</a>
                        <span style="color:#2D86A7" v-if="habeasdata.type=='text'" @click="$modal.show('habeas-data')">{{$t('pages.Events.RegisterEventToken.acceptTermsAndConditions')}}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- habeas data -->

                <!-- form inputs -->
                <div class="row">
                  <div class="col-md-6">

                     <div class="form-group">
                      <label for="name" :style="'color:'+event.third_color">{{$t('pages.Events.RegisterEventToken.name')}}</label>
                      <input type="text" v-model="form.name" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEventToken.name')">
                    </div>

                  </div>
                  <div class="col-md-6">

                     <div class="form-group">
                      <label for="name" :style="'color:'+event.third_color">{{$t('pages.Events.RegisterEventToken.lastname')}}</label>
                      <input type="text" v-model="form.lastname" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEventToken.lastname')">
                    </div>

                  </div>
                </div>
                <!-- form inputs -->

                <!-- form inputs -->
                <div class="row">
                  <div class="col-md-12">

                     <div class="form-group">
                      <label for="name" :style="'color:'+event.third_color">{{$t('pages.Events.RegisterEventToken.email')}}</label>
                      <input type="email" v-model="form.email" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEventToken.email')">
                    </div>

                  </div>
                  <!-- <div class="col-md-6">

                     <div class="form-group">
                      <label for="name" :style="'color:'+event.third_color">Telefono</label>
                      <input type="text" v-model="form.phone" class="form-control" id="name" placeholder="Nombre">
                    </div>

                  </div> -->
                </div>

                <!-- form inputs -->

                <!-- dynamic form -->
                <div class="row" >
                  <div class="col-md-6" v-for="(field, index) in fields" :key="index">
                    <div class="form-group">
                      <label for="name" :style="'color:'+event.third_color">{{field.name}}</label>

                      <input @change="getValue($event, field.id)"  v-if="field.type == 'text' && field.required == true"  type="text" class="form-control"  :placeholder="field.name" required>
                      <input @change="getValue($event, field.id)"  v-if="field.type == 'text' && field.required == false"  type="text" class="form-control"  :placeholder="field.name">

                      <textarea @change="getValue($event, field.id)"  v-if="field.type == 'textarea' && field.required == true"   class="form-control" :placeholder="field.name" required/>
                      <textarea @change="getValue($event, field.id)"  v-if="field.type == 'textarea' && field.required == false"   class="form-control" :placeholder="field.name"/>

                      <input @change="getValue($event, field.id)"  v-if="field.type == 'number' && field.required == true"  type="number" class="form-control"  :placeholder="field.name" required>
                      <input @change="getValue($event, field.id)"  v-if="field.type == 'number' && field.required == false"  type="number" class="form-control"  :placeholder="field.name" >

                      <select @change="getValue($event, field.id)"  v-if="field.type == 'select' && field.required == true" class="custom-select d-block w-100" required>
                        <option value="none" selected disabled hidden> 
                          {{$t('pages.Events.RegisterEventToken.chooseAnOption')}}
                        </option>
                        <option v-for="option in arrayOptions(field.options)" :key="option" :value="option">{{option}}</option>

                      </select>
                      <select @change="getValue($event, field.id)"  v-if="field.type == 'select' && field.required == false" class="custom-select d-block w-100">
                        <option value="none" selected disabled hidden> 
                          {{$t('pages.Events.RegisterEventToken.chooseAnOption')}} 
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
                      <label for="name" :style="'color:'+event.third_color">{{$t('pages.Events.RegisterEventToken.password')}}</label>
                      <input :type="typeInput" v-model="form.password" class="form-control" id="name" :placeholder="$t('pages.Events.RegisterEventToken.password')">
                    </div>

                  </div>
                  <div class="col-md-6">
                     <label for="name"  :style="'color:'+event.third_color">{{$t('pages.Events.RegisterEventToken.confirmPassword')}}</label>
                    <div class="input-group flex-nowrap">
                      <div class="input-group-prepend">
                      </div>
                      <input :type="typeInput" class="form-control" v-model="vPassword" :placeholder="$t('pages.Events.RegisterEventToken.confirmPassword')" aria-label="Username" aria-describedby="addon-wrapping">
                      <button  :style="'border:none; background-color:'+event.second_color+'; color:'+event.third_color" @click.prevent="showPassword">
                        <span class="ti-eye"></span>
                      </button>
                     
                    </div>
                    
                  </div>
                  <!-- <div class="col-md-6">

                     <div class="form-group">
                      <label for="name"  :style="'color:'+event.third_color">Confirm Password/contraseña</label>
                      <input type="password" v-model="vPassword" class="form-control" id="name" placeholder="Password">
                    </div>

                  </div> -->
                </div>
                <!-- Password-->

                <!-- form footer -->
                <div class="row">
                  <div class="col-md-12" v-if="habeasdata.position == 'down'">
                      <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck">
                        <label class="form-check-label" for="gridCheck" :style="'color:'+event.second_color">
                          <a target="_blank" v-if="habeasdata.type=='file'" :href="uri+'storage/'+habeasdata.content">{{$t('pages.Events.RegisterEventToken.acceptTermsAndConditions')}}</a>
                          <a target="_blank" v-if="habeasdata.type=='url'" :href="habeasdata.content">{{$t('pages.Events.RegisterEventToken.acceptTermsAndConditions')}}</a>
                          <span style="color:#2D86A7" v-if="habeasdata.type=='text'" @click="$modal.show('habeas-data')">{{$t('pages.Events.RegisterEventToken.acceptTermsAndConditions')}}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 flex justify-content-center">
                    <!-- <button type="submit" class="btn block border-0 btn-block" :style="'background-color:'+styles.home_titles_color+'; color:'+styles.home_btn_text_color"> -->
                      <button type="submit" class="btn block border-0 btn-block" :style="'background-color:'+styles.section_btn_color+'; color:'+styles.section_btn_text_color">
                      {{$t('pages.Events.RegisterEventToken.signUp')}}
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
import { required } from "vuelidate/lib/validators"
import getlang from "@/lang/index.js"
export default {
  name:'RegisterEventToken',
  components: {
  },
  data(){
    return{
      showLoader:false,
      styles:[],
      typeInput:'password',
      habeasdata:[],
      uri: process.env.VUE_APP_API_URL,
      uriImg:process.env.VUE_APP_API_URL_FILES,
      valueOptions:[],
      event:[],
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
        rol:'guest',
      }
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
    console.log('estoy en el evento con token');
    this.getLanguage()
    await this.verifyToken()
  },
  computed:{
      bgImg:function(){
        return `background-image:url('${this.uriImg}${this.event.pic_background}');
          background-color:${this.event.first_color}
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          content:'';
        `
      }
    },
  methods:{
    getLanguage(){
      this.$i18n.locale = getlang.getLanguage();
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
            this.$swal(this.$t('pages.Events.RegisterEventToken.welcome'))
            this.$router.push({path:'Landing-Event', query: {eventId:this.eventId} })
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
          icon:"error", text:this.$t('pages.Events.RegisterEventToken.incorrectEmailOrPassword')
        })
      })
    },
    getStyles(){
      axios.get(`styleEvent/${this.eventId}`).then(response =>{
        this.styles = response.data
      })
    },
    showPassword(){
      if(this.typeInput == "text") this.typeInput = "password"
      else this.typeInput = "text"
    },
    getValue(e, id){
      this.valueOptions.push({id:id, value:e.target.value})
    },
    arrayOptions(array){
      array = array.slice(1)
      array = array.slice(0, -1)
      array = array.split(',')
      return array
    },
    verifyToken(){
      this.tokenInvitation = this.$route.query.token
      axios.get('showToken/'+this.tokenInvitation).then(resposen=>{
        let data = resposen.data
        this.eventId = data.invitation.event_id
        if(data.actived == false || data.actived == null){
          this.$swal(this.$t('pages.Events.RegisterEventToken.registerToEnterTheEvent'))
          this.getFieldsEvent()
          this.getEvent()
          this.getHabeasData()
          this.getStyles()
        }else{
          this.$swal({icon:'error',text:this.$t('pages.Events.RegisterEventToken.invitationUsedMessage')})
          this.$router.push({ name: "Login" })
        }
      }).catch(error=>{
        this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.thereIsNoInvitation')})
      })
    },
    getFieldsEvent(){
      axios.get(`fieldsEventExternal/${this.eventId}`).then(response =>{
        this.fields = response.data.data
      })
    },
    getEvent(){
      axios.get(`showEvent/${this.eventId}`).then(response =>{
        this.event = response.data[0]

        let endDate = this.$moment(this.event.end_date).format('YYYY-MM-DD HH:mm:ss')
        let today = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        
        if(this.event.actived ==false || endDate <= today){
          this.$swal({icon:'error',text:this.$t('pages.Events.RegisterEventToken.registrationProcessHasAlreadyBeenClosed')})
          this.$router.push({path:'Landing-Event', query: {eventId:this.event.id} })
        }
      })
    },
    getHabeasData(){
      axios.get(`habeasdataExternal/${this.eventId}`).then(response=>{
        this.habeasdata = response.data
      })
    },
    async registerUser(){
      if(this.event.password != null){
        this.form.password = this.event.password
        this.vPassword = this.event.password
      }
      this.$v.form.$touch()
      if(this.$v.form.$error) return
      if(this.form.password != this.vPassword){
        this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.passwordsDontMatch')})
        this.form.password = ''
        this.vPassword = '' 
      }else{
        let verify = 0
        this.showLoader = true
        const response = await axios.get(`validateUser/${this.form.email}`)
        if(response.data == false){
          const resp = await axios.post('auth/register', this.form).catch(error =>{
            this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.loginError')})
          })
          const user = resp.data.data
          let dataPost = {
            user_id:user.id,
            actived:true,
            token:this.tokenInvitation
          }
          if(this.valueOptions.length > 0){
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
          }
          
          
          const verifyurl = await axios.post('verifyUrl', dataPost).catch(error=>{
            this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.failedToAssociateInvitation')})
          })
          const eventUser = {
            user_id: user.id,
            event_id: verifyurl.data[0].event_id,
            url_id: verifyurl.data[0].id,
            message_email_1: this.$t('pages.Events.RegisterEventToken.successfulRegistration'),
            message_email_2: this.$t('pages.Events.RegisterEventToken.virtualAndFacetoFace'),
            message_email_3: this.$t('pages.Events.RegisterEventToken.goToTheEventSite'),
            message_email_4: this.$t('pages.Events.RegisterEventToken.halls'),
            message_email_5: this.$t('pages.Events.RegisterEventToken.start'),
            message_email_6: this.$t('pages.Events.RegisterEventToken.ends'),
            message_email_7: this.$t('pages.Events.RegisterEventToken.addToCalendar')   
          }
          await axios.post('eventUsers', eventUser)
          // this.$swal('Usuario creado exitosamente')
          // this.$router.push({name:'Login', params: {eventId:response.data[0].event_id} })
          
        }else{

          if(response.data.status=="completar_registro"){
            const resp = await axios.post('auth/register-update', this.form).catch(error =>{
              this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.loginError')})
            })
          }

          if(this.valueOptions.length > 0){
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
          let dataPost = {
            user_id:response.data.id,
            actived:true,
            token:this.tokenInvitation
          }
          const vurl = await axios.post('verifyUrl', dataPost).catch(error=>{
            this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.thisInvitationIsAlreadyBeingUsed')})
          })
          
          const eventUser = {
            user_id: response.data.id,
            event_id: vurl.data[0].event_id,
            url_id: vurl.data[0].id,
            message_email_1: this.$t('pages.Events.RegisterEventToken.successfulRegistration'),
            message_email_2: this.$t('pages.Events.RegisterEventToken.virtualAndFacetoFace'),
            message_email_3: this.$t('pages.Events.RegisterEventToken.goToTheEventSite'),
            message_email_4: this.$t('pages.Events.RegisterEventToken.halls'),
            message_email_5: this.$t('pages.Events.RegisterEventToken.start'),
            message_email_6: this.$t('pages.Events.RegisterEventToken.ends'),
            message_email_7: this.$t('pages.Events.RegisterEventToken.addToCalendar')              
          }
          let resp1 = await axios.post('eventUsers', eventUser)
          if(resp1.data.message == "User in event exists") verify++

          if(verify == 0){
            let params = {password: this.form.password}
            await axios.put(`restorePw/${response.data.id}`, params).catch(error=>{
              this.$swal({icon:'error', text:this.$t('pages.Events.RegisterEventToken.errorUpdatingPassword')})
            })
          }
          
          // this.$swal('Ya tenias un usuario, ingresa para acceder al evento')
          // this.$router.push({name:'Login', params: {eventId:response.data[0].event_id} })
          
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
          this.$swal({title:this.$t('pages.Events.RegisterEventToken.accountIsAlreadyRegistered')})
        }
      }
    }
  }


};
</script>

<style>
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

.formulario-registro label{
  color: #fff;
}
#logo{
  margin: 5em 0 5em 0;
}

/* Tickets */

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

.banner-mask{
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  display: block;
}

</style>
