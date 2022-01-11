<template>

  <div class="wrapper event main-login-container" :style="imgBackgroudn()">
  <div  class="container login-wrapper">
    <div class="row">
      <div class="col-md-6 mx-auto">

        <form class="box-login" action="#" v-if="sendEmail == false">
            <div>
              <h3 v-if="eventLogin" :style="'color:'+styles.home_titles_color" class="title">{{$t('pages.Auth.Login.welcome')}}</h3>
              <h3 v-else style="color:#000;" class="title">{{$t('pages.Auth.Login.welcome')}}</h3>
              <P  v-if="eventLogin" :style="'color:'+styles.home_text_color" >{{$t('pages.Auth.Login.enterTheFollowingInformation')}}</P>
              <P  v-else >{{$t('pages.Auth.Login.enterTheFollowingInformation')}}</P>
            </div>
            <div  class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-user" id="addon-wrapping"></span>
              </div>
              <input style="border:none"  type="text" v-model="form.email" class="form-control" :placeholder="$t('pages.Auth.Login.email')" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap" v-if="showInputPw">
              <div class="input-group-prepend">
                <span class="input-group-text ti-lock" id="addon-wrapping"></span>
              </div>
              <input :type="typeInput" class="form-control" v-model="form.password" :placeholder="$t('pages.Auth.Login.password')" aria-label="Username" aria-describedby="addon-wrapping">
              <button v-if="eventLogin"  @click.prevent="showPassword" :style="'border:none;background-color:'+styles.home_btn_color+';color:'+styles.home_btn_text_color"><span class="ti-eye"></span></button>
              <button v-else @click.prevent="showPassword" style="border:none;background-color: #000;color: #fff;"><span class="ti-eye"></span></button>
            </div>


            <button v-if="eventLogin" :style="'border:none;background-color:'+styles.home_btn_color+';color:'+styles.home_btn_text_color" class="btn btn-primary btn-block" @click.prevent="onSubmit">{{$t('pages.Auth.Login.login')}}</button>
            <button v-else class="btn btn-primary btn-block" style="background-color:#000;" @click.prevent="onSubmit">{{$t('pages.Auth.Login.login')}}</button>

            <div class="row" v-if="showInputPw">
              <div class="col-md-6">
                <a  class="link" v-if="eventLogin" :style="'color:'+styles.home_text_color"
                  @click="goToPassword()"> {{$t('pages.Auth.Login.recoverPassword')}}
                </a>
                <a  class="link" v-else
                  @click="goToPassword()"> {{$t('pages.Auth.Login.recoverPassword')}}
                </a>
              </div>
              <!--<div class="col-md-6 text-right">
                  <router-link :to="{path:'/Register'}">
                      <a  class="link"> Registrarme </a>
                  </router-link>
              </div>-->
            </div>

        </form>

        <form action="#" v-if="sendEmail">
            <div>
              <H3 v-if="eventLogin" :style="'color:'+styles.home_text_color">{{$t('pages.Auth.Login.recoverPassword')}}</H3>
              <H3 v-else >Recuperar contraseña</H3>
              <P  v-if="eventLogin" :style="'color:'+styles.home_text_color">
                {{$t('pages.Auth.Login.enterTheFollowingInformation2')}}
              </P>
              <P v-else>
                {{$t('pages.Auth.Login.enterTheFollowingInformation2')}}
              </P>
            </div>
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-user" id="addon-wrapping" :style="'background-color:'+styles.home_div_first_color"></span>
              </div>
              <input type="text" class="form-control" v-model="email" :placeholder="$t('pages.Auth.Login.email')" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div>

            </div>
            <button v-if="eventLogin" :style="'border:none;background-color:'+styles.home_btn_color+';color:'+styles.home_btn_text_color" @click="sendEmailRestore" class="btn btn-primary btn-block">{{$t('pages.Auth.Login.send')}}</button>
            <button v-else @click="sendEmailRestore" class="btn btn-primary btn-block">{{$t('pages.Auth.Login.send')}}</button>
        </form>

      </div>
    </div>
  </div>

 </div>
</template>

<script>
import getlang from "@/lang/index.js";
export default {
  name:'login',
  components: {
  },
  props:{
    eventId:{
      default: 0
    },      
  },
  data(){
    return{
      showInputPw:true,
      styles:[],
      frontConfig:null,
      eventLogin:false,
      uri:process.env.VUE_APP_API_URL,
      imgBg:`background: #8e04cc url(/img/bg-login.ebfe3d64.jpg) no-repeat center bottom;
        height: 100vh;
        color: white;`,
      email:null,
      sendEmail: false,
      typeInput:"password",
      event:null,
      form:{
        email:'',
        password:''
      },
      halls:[],
      fromEmail:false,
      eventIdFromEmail: false,
      hallIdFromEmail: false,
      typeHall: false,
      domain_external:false,
      paymentActive:false,
      tickets:{},
      quanty: 0,
      ticket_id:"",      
    }
  },
  async mounted(){
    this.getLanguage();
    //validar tipo de login    
    let inUrl = this.$route.query                  
    switch(Object.keys(inUrl)[0]){
      case 'eventId':
          //cuando existe id de evento        
          this.event = this.$route.query.eventId                
          if(this.$route.query.eventId!=undefined){      
            this.eventId = this.event               
            if(localStorage.eventId && localStorage.eventId!=this.eventId.toString()){                     
              localStorage.clear()   
            }               
            localStorage.setItem('eventId',this.eventId) 

          }else if(localStorage.eventId){
            this.eventId = localStorage.eventId;
          }else{
            this.$router.push({ name: "notFoundPage"})        
          }
          if(this.eventId != 0){      
            this.event = this.eventId
          }
          await this.getStyles()
          this.getBackground(this.event)
          this.getHalls()
        break;
      case 'superAdmin':
        console.log('is admin login')     
        break;
      case 'admin':
        console.log('is admin login')                
        break;
      default:
        if(localStorage.eventId){
            // this.eventId = localStorage.eventId;
            this.$router.push({path:'Landing-Event', query: {eventId:localStorage.eventId} })
          }else{
            //this.$router.push({ name: "notFoundPage"})        
            window.location.href='/#/login?admin';        
          }        
        break;
    }    
  },
  methods:{
    getHalls(){
      axios.get(`hallsEvent/${this.event}`).then(response =>{
        if(Array.isArray(response.data.data) && response.data.data.length > 0){
          this.halls = response.data.data
          this.verifyFromEmail()
        }
      })
    },
    verifyFromEmail(){
      let eventId = this.$route.query.eventId
      let hallId = this.$route.query.hallId
      let typeHall = this.$route.query.typeHall
      if(eventId && hallId &&  typeHall){
        if(Array.isArray(this.halls) && this.halls.length>0){
            this.halls.map((e)=>{
                if(eventId==e.event_id && hallId==e.id && typeHall==e.hall_type_id){
                  this.fromEmail = true;
                  this.eventIdFromEmail = eventId;
                  this.hallIdFromEmail = hallId;
                  this.typeHall = typeHall
                  this.domain_external = e.domain_external
                }
            })
        }
      }

    },
    verifyForPayment(){
      let payment = this.$route.query.payment
      let ticket_id = this.$route.query.ticket_id
      let quanty = this.$route.query.quanty
      if(payment==true){
        if(this.frontConfig && this.frontConfig.tickets){
          this.frontConfig.tickets.map((e)=>{
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
    sendDataPayment(data,ticket,id){
      let user_id = localStorage.getItem('_current_user_id')
      const orderData = {
        quantity: data,
        price: ticket.unit_price,
        ...ticket,
        payment_gateway: this.frontConfig.payment_name,
        ticket_id: ticket.id,
        user_id:user_id
      };
      console.log("orderData:", orderData);
      console.log("ticket:", ticket);
      console.log("id:", id);
      if(this.frontConfig.payment_name === 'Mercadopago'){
        axios.post('payment',orderData).then(res=>{
          this.createCheckoutButton(res.data,'ticket'+id)
        }).catch(e=>{
          console.error(e)
        })}
    },
    createCheckoutButton(preference,id) {
      let script = document.createElement("script");
      const opcion = (payment)=>{ return payment.mode === 1 ? payment.key_dev : payment.key }
      const mp = new MercadoPago(opcion(this.frontConfig.payment), {
        locale: 'es-CO'
      });
        console.log("checkout")
        // Inicializa el checkout
        mp.checkout({
          preference: {
            id: preference.id_payment_gateway
          },
          autoOpen: true,
        });
        this.paymentActive = false
    },
    renderMercadoPago(){
      var script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = "text/javascript";
      document.querySelector(`body`).appendChild(script);
    },
    getLanguage(){
      this.$i18n.locale = getlang.getLanguage();
    },
    imgBackgroudn(){
      if(this.styles && this.styles.home_img_background)
        return { backgroundImage: `url('${this.uri}storage/${this.styles.home_img_background}')`}
      else
        return {}
    },
        getStyles(){
        axios.get(`styleEvent/${this.event}`).then(response =>{
          this.styles = response.data
          console.log("this.styles:", response.data);
        })
      },
      
    getBackground(event){
      this.eventLogin=true
      window.axios.get(`showEvent/${event}`).then(response=>{
        this.frontConfig = response.data[0]
        console.log("this.styles 1:", response.data);
        if(this.frontConfig.password != null){
          this.form.password = this.frontConfig.password.trim()
          this.showInputPw = false
        }
        this.imgBg = `background: url('${this.uri}storage/${this.frontConfig.pic_background}');
        background-color:${this.frontConfig.first_color}
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        content:'';`
        this.verifyForPayment();
      })
    },
    async sendEmailRestore(){
      let params = {
        email:this.email
      }
      await axios.post('emailRestorePw', params)
      this.$swal(this.$t('pages.Auth.Login.checkYourInboxOrSpam'))
    },
    goToPassword(){
      this.sendEmail = true
    },
    showPassword(){
      if(this.typeInput == "text") this.typeInput = "password"
      else this.typeInput = "text"
    },
    
    onSubmit(){
      if(this.frontConfig){
        if(this.frontConfig.password)
          this.form = {
            ...this.form,
            eventId: this.eventId
          }
      }
      window.axios.post('auth/basic', this.form).then(response=>{
        const user = response.data
        localStorage.setItem("_current_user_name", user.name)
        localStorage.setItem("_current_user_company", user.company_id)
        localStorage.setItem("_current_user_lastname", user.lastname)
        localStorage.setItem("_current_user_id", user.id)
        localStorage.setItem("_current_user_email", user.email)
        if(user.roles.length > 0){
          localStorage.setItem("_current_role_id", user.roles[0].id)
          localStorage.setItem("_current_role_name", user.roles[0].name)}

        localStorage.setItem("_current_model_id", user.model_id)
        localStorage.setItem("_current_token", user.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        if(user.roles.length > 0){
          switch(user.roles[0].name){
            case 'business market': this.$router.push({ name: "Mis Rueda de Negocios" }); break;
            case 'admin': this.$router.push({ name: "Mis Eventos" }); break;
            case 'guest': 
            console.log("invitado");
              localStorage.setItem("_current_event_id", this.event)

              if(this.fromEmail==true){
                if(this.typeHall==1){
                  this.$router.push({name:'Detail-Event', params: {id:this.hallIdFromEmail,type:'hall'} })
                }else if(this.typeHall==2){
                  window.location.href = this.domain_external;
                }else{
                  this.$router.push({path:'Landing-Event', query: {eventId:this.event} })
                }
              }else{
                if(this.paymentActive){
                  this.$router.push({path:'Landing-Event', query: {eventId:this.event,payment:true,ticket_id:this.ticket_id, quanty:this.quanty} })
                }else{
                  this.$router.push({path:'Landing-Event', query: {eventId:this.event} })
                }
                
              }
              console.log("Llego aqui");
              let params = {
                event_id:this.event,
                user_id:user.id
              }
              axios.post('loginTracking', params).then(resp=>{
                localStorage.setItem("_current_tracking_login", resp.data.data.id)
                console.log("resp.data.data:",resp.data.data);
              }).catch(error => {
                console.log("error error error");
                console.log(error)
              })
              console.log("Llego aqui 2");
            break;
            default: this.$router.push({ name: "Mis Eventos" }); break;
          }
        } else {
          localStorage.setItem("_current_event_id", this.event)
          this.$router.push({path:'Landing-Event', query: {eventId:this.event} })
          let params = {
            event_id:this.event,
            user_id:user.id
          }
          axios.post('loginTracking', params).then(resp=>{
            localStorage.setItem("_current_tracking_login", resp.data.data.id)
          }).catch(error => {
            console.log(error)
          })
        }
        
      }).catch(error =>{
        if(error.response.status == 401){
          this.$swal({
            icon:"error", text:this.$t('pages.Auth.Login.emailOrPasswordWasNotCorrect')
          })
        }
        //target="_blanck" href='#/Register-Event?eventId=${this.event}'
        if(error.response.status == 422 && typeof error.response.data.error.email !== 'undefined'){
          if(error.response.data.error.email[0] == 'The selected email is invalid.'){
              this.$swal.fire({
                icon: 'info',
                text: this.$t('pages.Auth.Login.weDidNotFindAccount'),
                showCancelButton: false,
                confirmButtonText: this.$t('pages.Auth.Login.signUp'),
                showCloseButton: true,
                preConfirm: () => {
                  return {event:this.event}
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  if(this.paymentActive){
                    this.$router.push({ name: "Register-Event",query:{ eventId: result.value.event, payment:true,ticket_id:this.ticket_id, quanty:this.quanty}})
                  }else{
                    window.location.href = '#/Register-Event?eventId='+result.value.event
                  }
                }
              })
          }else{
            this.$swal({
              icon:"error", text:this.$t('pages.Auth.Login.emailOrPasswordWasNotCorrect')
            })
          }
          
        }else{
          this.$swal({
            icon:"error", text:this.$t('pages.Auth.Login.emailOrPasswordWasNotCorrect')
          })
        }
      })
    },
    redirect(){
      //alert("Hola")
    }
  },
  


};
</script>

<style>

#login {
  background: url('./../../../assets/img/bg-login.jpg') no-repeat center bottom;
  height: 100vh;
  color: white;
}
.box-login{
  padding: 40% 0;
}
.input-group-text{
  background:   #8e04cc;
  color: white;
}

.link{
  text-decoration: underline !important;
  color: black;
  display: block;
  margin: 0.5rem 0;
  cursor: pointer;
}

.title{
  font-size: 30px;
}

.btn{

  margin: 2rem 0;
}


.main-login-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
}
</style>
