<template >
  <div class="wrapper event" :style='bgImg'>
    <!-- header -->
        <div class="logo-container logo-landing">
            <img style="color:red;" :src="uriImg+styles.home_img_logo"/>
        </div>

    <div class="main-header-container" :style="'background-color:' + styles.home_div_first_color">
      <div class="logo-nobackground-container">
        <img :src="uriImg+styles.home_img_logo">
      </div>
        <TopNavbar  :color="styles.home_btn_color" :secondColor="styles.home_btn_text_color" v-if="topNavbar && styles.home_btn_color" :event="event"></TopNavbar>        
        <div class="dropdown" v-else>                   
           <router-link  :to="{name:'Login', query: {eventId:event.id} }" v-if="valEndDate(event.end_date)">
            <ul :style="'list-style: none; background-color:'+styles.home_btn_color+'; color:'+styles.home_btn_text_color+'; border:none; heigth:20px; align-items:center;'" class="btn">
                <span :style="'color:'+styles.home_btn_text_color">{{$t('pages.Events.LandingEvent.login')}}</span>
                <span :style="'color:'+styles.home_btn_text_color" class="ti-user"></span>            
            </ul>
           </router-link>
        </div>        
    </div>

    <div class="banner-container">
        <div class="img-mask-banner">
          <img :src="uriImg+styles.home_img_banner">          
    </div>

    </div>

  <!-- header -->

    <!-- content main -->
  <main class="content-main">

    <div class="title-container">            
      <span :style="'color:'+styles.home_titles_color" class="event__label" >{{$t('pages.Events.LandingEvent.event')}}</span>

          <h4 :style="'color:'+styles.home_titles_color" class="event__title--main">{{event.name}}</h4>

          <span :style="'color:'+styles.home_titles_color" class="event__date--main">

          <span class="ti-calendar"></span>

              {{$moment(event.start_date).lang(lang).format('LL')}}

          </span>

         <p :style="'color:'+styles.home_text_color" class="event__description--main" v-html="event.description">
         </p>         
        <div class="row" v-if="topNavbar == false">
          <div class="col-md-12" v-if="event.actived">
            <router-link v-if="showSignUp" :to="{path:'Register-Event', query:{eventId:event.id}}">

              <button style="border:0px" :style="'color:'+styles.home_btn_text_color+'; background-color:'+styles.home_btn_color+';font-size: 20px;'+'--color-hover:'+styles.home_btn_color_hover"
              class="btn btn-primary tickets__btn">{{$t('pages.Events.LandingEvent.register')}}</button>

            </router-link><br>
            
            <p :style="'color:'+styles.home_titles_color">{{$t('pages.Events.LandingEvent.ifYouAlreadyRegistered')}}
              <router-link  :to="{name:'Login', query: {eventId:event.id} }" v-if="valEndDate(event.end_date)">
                  <u><b :style="'color:'+styles.home_titles_color"> {{$t('pages.Events.LandingEvent.loginHere')}}</b></u>
              </router-link>
           </p>
           
          </div>
          

        </div>

    </div>
    <!-- banner main -->

    <div class="row">
      <div class="offset-4 col-md-4 text-center">
        <img class="event__banner--main" :src="uriImg+event.pic_banner" alt="">
        <button  v-if="showCerButton" :href="urlCerticate()" target="_blanck" @click="tracking()" style="border:none" :style="'color:'+event.third_color+'; background-color:'+event.second_color+';font-size: 18px;'" class="event__link btn btn-primary mt-2">
          {{$t('pages.Events.LandingEvent.generateCertificate')}}
        </button>
      </div>

      <div class="col-md-5">        
      </div>
    </div>

    <!-- banner main -->
    
    <!-- modal login -->

      <modal
        name="modal-notification"
        :width="400"
        :height="250"
        :adaptive="true"
      >
        <div class="container py-3">
          <div slot="top-right">
            <button
              style="
                margin-left: 97%;
                border: none;
                border-radius: 10px;
                margin-top: 7px;
                "
              @click="$modal.hide('modal-notification')"
            >
              ❌
            </button>
            <div class="row my-4">
              <div class="col-md-12 text-center">
                <h3 class="h4" style="color: #614ba4">{{$t('pages.Events.DetailEvent.welcome')}}</h3>

                  <!-- <router-link :to="{ name: 'Register-Event',query: { eventId: event.id },}"> -->
                    <button @click="redirectRegister()" class="btn custom-btn btn-primary mt-2" :style="'color:'+styles.home_btn_text_color+'; background:'+styles.home_btn_color+';--color-hover:'+styles.home_btn_color_hover+';--text-hover:'+styles.home_btn_text_color_hover">
                      <span>{{$t('pages.Events.DetailEvent.register')}}</span>
                    </button>
                  <!-- </router-link> -->
                <p>
                  {{$t('pages.Events.DetailEvent.ifYouAreAlreadyRegistered')}}
                  <!-- <router-link
                    :to="{
                    name: 'Login',
                    params: { eventId: event.id },
                    }"

                  > -->
                  <button @click="redirectLogin()" style="border:none;">
                    <u :style="'color:#000'"
                    ><b :style="'color:#000'">
                    {{$t('pages.Events.DetailEvent.logInHere')}}</b
                    ></u
                      ></button>
                  <!-- </router-link> -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </modal>
      <!-- End modal login -->



    <!-- modal payment -->

      <div class="card-deck mb-3 text-center">
        <modal name="modal-activities"
            :width="400"
            :height="250"
            :adaptive="true"
            @closed="closeModalF()"
            >
          
            <div class="container py-3" >
              <div slot="top-right">
                  <button style="margin-left: 97%; border: none; border-radius: 10px; margin-top:7px" @click="closeModalF()">
                      ❌
                  </button>
                </div>
                <div class="row my-4">
                  <div class="col-md-12 text-center">
                      <h3 class="h4" style="color:#614ba4">{{currentTicket.name}}</h3>
                      <p>{{currentTicket.description}}</p>
                      <h6 class="h6" style="color:#614ba4">{{$t('pages.Events.LandingEvent.activities')}}</h6>
                      <ul class="list-group list-group-flush">
                        <li v-for="activity in activities" :key="activity.id" class="list-group-item">{{activity.name}}</li>
                      </ul>                                    
                      
                      
                  </div>
                </div>
            </div>
        </modal>
    </div> 
    <!-- END modal payment -->
    <!-- Tickets --> 
    <div class="row mt-4" v-if="showTicket">
       <div class="col-md-12 text-center">
         <h4 :style="'color:'+styles.home_titles_color" class="event__title--main">{{$t('pages.Events.LandingEvent.ourTickets')}}</h4>
       </div>
    </div>
    <div class="wrap-salas-container" v-if="showTicket">
      <div class="card wrap-sala" :styles ="'background-color:'+styles.home_div_first_color+';'" v-for="ticket in tickets" :key="ticket.id">
        <div class="card-header" :styles ="'background-color:'+styles.home_div_first_color+';'">
          <center><h4 class="my-0 font-weight-normal">{{ticket.name}}</h4></center>
        </div>
        <div class="card-body">
          <center><h1 class="card-title pricing-card-title">${{ticket.unit_price}} <!--<small class="text-muted">/ mo</small>--></h1></center>
          <center><p class="p-1">{{ticket.description}}</p></center>
          <center><a  @click="seeActivitities(ticket)" class="btn btn-outline-primary m-0 py-1" >{{$t('pages.Events.LandingEvent.showActivities')}}</a></center>
          <button v-if="ticket.unit_price>0" type="button" class="btn btn-block btn-primary mb-2" :styles ="'background-color:'+styles.home_div_first_color+';'" :id="'ticket'+ticket.id" @click="clickComprar('ticket'+ticket.id,ticket)">{{$t('pages.Events.LandingEvent.buy')}}</button>
        </div>
      </div>
    </div>
    <!-- End Tickets -->
    <!-- Salas -->

     <div v-if="hasHall" class="row mt-4">
       <div class="col-md-12 text-center">
         <h4 :style="'color:'+styles.home_titles_color" class="event__title--main">{{$t('pages.Events.LandingEvent.ourHalls')}}</h4>
       </div>
     </div>
    <div v-if="hasHall" class="wrap-salas-container">

      <!-- col 1 -->
      <div class="wrap-sala" v-for="hall in halls" :key="hall.id">

        <div class="img-sala-mask">
          <span v-if="hasHall">
            <a   v-if="hall.hall_type_id==2 || hall.id==103" href="#" @click.prevent="urlExternal(hall.domain_external, hall.id)">
              <img class="img-sala" :src="uriImg+hall.pic" alt="">
            </a>
            <router-link  v-else :to="{name:'Detail-Event', params:{id:hall.id, type:'hall'}}">
              <img class="img-sala" :src="uriImg+hall.pic" alt="">
            </router-link>
          </span>
          <span v-else>
            <router-link   :to="{name:'Detail-Event', params:{id:event.id, type:'event'}}">
              <img class="img-sala" :src="uriImg+hall.pic" alt="">
            </router-link>
          </span>

        </div>

        <h4 :style="'color:'+styles.home_titles_color" class="event__title">{{hall.name}}</h4>
        <p class="event__description" :style="'color:'+styles.home_text_color" v-html="hall.description"></p>
        <span v-if="hasHall">          
          <a v-if="hall.hall_type_id==2 || hall.id== 103" class="event__link custom-btn" :style="'color:'+styles.home_btn_text_color+'; background:'+styles.home_btn_color+';--color-hover:'+styles.home_btn_color_hover+';--text-hover:'+styles.home_btn_text_color_hover" href="#" @click.prevent="urlExternal(hall.domain_external,hall.id)">{{$t('pages.Events.LandingEvent.showDetails')}}</a>
          <router-link v-else  :to="{name:'Detail-Event', params:{id:hall.id, type:'hall'}}">
            <a class="event__link custom-btn" :style="'color:'+styles.home_btn_text_color+'; background:'+styles.home_btn_color+';--color-hover:'+styles.home_btn_color_hover+';--text-hover:'+styles.home_btn_text_color_hover" href="#">{{$t('pages.Events.LandingEvent.showDetails')}}</a>
          </router-link>
          
        </span >
        <span v-else>
          <router-link   :to="{name:'Detail-Event', params:{id:event.id, type:'event'}}">
            <a class="event__link custom-btn" :style="'color:'+styles.home_btn_text_color+'; background:'+styles.home_btn_color+';--color-hover:'+styles.home_btn_color_hover+';--text-hover:'+styles.home_btn_text_color_hover" href="#">{{$t('pages.Events.LandingEvent.showDetails')}}</a>
          </router-link>
        </span >



      </div>
      <!-- col 1 -->
    </div>
    <!-- Salas -->




  <div class="main-footer">

    <div class="wrap-footer" :style="'background-color:' + styles.home_footer_color">

      <div class="container-icono-footer logo-landing">
        <img id="icono-footer" :src="uriImg+styles.home_img_logo"/>
      </div>

      <div class="container-icono-footer logo-nobackground-container">
        <img id="icono-footer" :src="uriImg+styles.home_img_logo"/>
      </div>

<!--
        <ul class="data-contact-container">
          <li>Contacto:</li>
          <li>XXXXXXXXX</li>
        </ul>
-->
        <ul class="social-links">
          <li v-if="styles.link_facebook"><a :href='`${this.styles.link_facebook}`'><img src="./../../../assets/img/icons/facebook-white.png"></a></li>
          <li v-if="styles.link_instagram"><a :href='`${this.styles.link_instagram}`'><img src="./../../../assets/img/icons/instagram-white.png"></a></li>
          <li v-if="styles.link_twitter"><a :href='`${this.styles.link_twitter}`'><img src="./../../../assets/img/icons/twitter-white.png"></a></li>
        </ul>

    </div>

  </div>


  </main>
   <!-- content main -->

</div>



</template>

<script>
import TopNavbar from "@/layout/dashboard/buttonSession.vue";
import getlang from "@/lang/index.js"
export default {
  name: 'LandingEvent',
  components:{TopNavbar},
  props:['event_id'],
  data() {
    return {
      showCerButton:false,
      hasHall:true,
      tickets:[],
      halls:[],
      event:{
        end_date: new Date('2021 01 01')
      },
      styles:[],
      uri:process.env.VUE_APP_API_URL,
      uriImg:process.env.VUE_APP_API_URL_FILES,
      listEvents:[],
      lang:"es",
      showTicket:false,
      currentTicket:{},
      activities:[],
      paymentActive: false,
      ticket_id:0,
      quanty:0,
      tickets:{},
      quanty_external: 0,
      ticket_id_external:"",
      paymentActive_external:false,
      showSignUp: true
    }
  },
  async created(){
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/6164498e157d100a41abd94e/1fhnrulpu';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    //corrección diferenciación de login para evento 
    this.eventId = this.$route.query.eventId        
    if(this.event_id)
      this.eventId = this.event_id
      if(this.eventId>0){        
        if(localStorage.eventId && localStorage.eventId!=this.eventId.toString()){          
          localStorage.clear()            
        } 
        localStorage.setItem('eventId',this.eventId)
      }
      
    
    this.payment = this.$route.query.payment
    if(this.payment){
      this.paymentNotification()
    }
    await this.getEvent()
    await this.getStyles()
    await this.getActivities()
    this.getHalls()
    this.getTickets()
    this.getCerticateData()
    this.displayIcon()
    this.getLanguage();
  },
  computed:{
    
    topNavbar(){
      let id = localStorage.getItem('_current_user_id')
      if(id == null){
        if( this.$route.query.showTicket){
          this.showTicket = this.$route.query.showTicket
        }else{
          this.showTicket=true
        }
        return false
      }
      else{
        if( this.$route.query.showTicket){
          this.showTicket = this.$route.query.showTicket
        }else{
          this.showTicket=false
        }
        return true
      }
    },
    bgImg:function(){
      if(this.styles.home_img_background == 'null'){
        return `background-color:${this.styles.home_color_background}`;
      }else{
        // return `background-image:url('${this.uriImg}${this.styles.home_img_background}');
        //   background-color:${this.styles.home_color_background}
        //   background-position: center center;
        //   background-size: cover;
        //   background-repeat: repeat;
        //   position: relative;
        //   content:'';
        // `
        return `background-image:url('${this.uriImg}${this.styles.home_img_background}');
          background-position: center center;
          background-size: cover;
          background-repeat: repeat;
          position: relative;
          content:'';
        `
      }
    }

  },
  methods:{
    verifyForPayment(){
      console.log("entro verifyForPayment")
      let payment = this.$route.query.payment
      let ticket_id = this.$route.query.ticket_id
      let quanty = this.$route.query.quanty
      if(payment=='true' || payment==true){
        if(this.event && this.event.tickets){
          this.event.tickets.map((e)=>{
            if(e.id==ticket_id && typeof parseInt(quanty)=='number' && parseInt(quanty)>0){
              this.paymentActive_external = true
              console.log('viene desde afuera');
              this.tickets={
                ...e
              }
              this.quanty_external = quanty
              this.ticket_id_external = 'ticket'+e.id
            }
          })
        }
      }
      if(this.paymentActive_external && this.validateLogin()){
        this.$swal({icon:'info', text:this.$t('pages.Events.LandingEvent.youWillBeRedirectedToPayment')})
        this.sendDataPayment(this.quanty_external,this.tickets,this.ticket_id_external);
      }
    },
 sendDataPayment(data,ticket,id){
      let user_id = localStorage.getItem('_current_user_id')
      const orderData = {
        quantity: data,
        price: ticket.unit_price,
        ...ticket,
        payment_gateway: this.event.payment_name,
        ticket_id: ticket.id,
        user_id:user_id
      };
      console.log("orderData:", orderData);
      console.log("ticket:", ticket);
      console.log("id:", id);
      if(this.event.payment_name === 'Mercadopago'){
        axios.post('payment',orderData).then(res=>{
          this.createCheckoutButton(res.data,'ticket'+id)
        }).catch(e=>{
          console.error(e)
        })}
    },
    createCheckoutButton(preference,id) {
      let script = document.createElement("script");
      const opcion = (payment)=>{ return payment.mode === 1 ? payment.key_dev : payment.key }
      const mp = new MercadoPago(opcion(this.event.payment), {
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
    redirectRegister(){
      if(this.paymentActive){
        this.paymentActive = false
        this.$router.push({ name: "Register-Event",query:{ eventId: this.event.id, payment:true,ticket_id:this.ticket_id, quanty:this.quanty}})
      }else{
        this.paymentActive = false
        this.$router.push({ name: "Register-Event",query:{ eventId: this.event.id }})
      }
    },
    redirectLogin(){
      if(this.paymentActive){
        this.paymentActive = false
        this.$router.push({ name: "Login",params:{ eventId: this.event.id }, query:{payment:true,ticket_id:this.ticket_id, quanty:this.quanty}})
      }else{
        this.paymentActive = false
        this.$router.push({ name: "Login",params:{ eventId: this.event.id }})
      }
      
    },
    async clickComprar(id, ticket){
      const { value: data } = await this.$swal.fire({
        title: this.$t('pages.Events.LandingEvent.buyTicketsmessage'),
        input: 'text',
        inputLabel: this.$t('pages.Events.LandingEvent.numberTickets'),
        inputValue: 1,
        showCancelButton: true,
        inputValidator: (value) => {
        if (!value) {
            return this.$t('pages.Events.LandingEvent.enterAnAmount')
          }
          if(isNaN(value))
            return this.$t('pages.Events.LandingEvent.enterANumber')
          if(value>0){
            this.getEmail(id, ticket,value)
          }
          if(value==0){
            return this.$t('pages.Events.LandingEvent.enterANumberHigherZero')
          }
        }
      })
      
    },
    async getEmail(id, ticket,data){
      if(this.validateLogin()){
        let user_email = localStorage.getItem('_current_user_email')
        if(user_email){
          this.sendDataPayment(data,ticket,id,user_email)
        }
      }else{
        const { value: email } = await this.$swal.fire({
        title: "Email",
        input: 'email',
        inputLabel: this.$t('pages.Events.LandingEvent.enterYourEmail'),
        inputValue: "",
        showCancelButton: true
      })
      if(email){        
          this.sendDataPayment(data,ticket,id,email)
      }
      }


    },
    sendDataPayment(data,ticket,id, email){
      // let user_id = localStorage.getItem('_current_user_id')
      const orderData = {
        quantity: data,
        price: ticket.unit_price,
        ...ticket,
        payment_gateway: this.event.payment_name,
        ticket_id: ticket.id,
        email:email
      };
      if(this.event.payment_name === 'Mercadopago'){
        axios.post('payment/Mercadopago',orderData).then(res=>{
          console.log('mercadopago');
          this.createCheckoutButton(res.data,id)
        }).catch(e=>{
          console.error(e)
        })}
      else if(this.event.payment_name === 'Payu'){
        console.log("Se valida que esta entrando a payu")
        axios.post('payment/Payu',orderData).then(res=>{
          console.log('payu');
          let params = res.data;
          console.log("Aqui estan los datos")
          console.log(params);
          // return null
          const form = document.createElement('form');
          form.method = 'post';
          if(params.test){
            form.action = 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu';
          }else{
            form.action = 'https://checkout.payulatam.com/ppp-web-gateway-payu';
          }
          
          for (const key in params) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];
            form.appendChild(hiddenField);
          }
          console.log("Se valida que esta redirigiendo a a payu")
          document.body.appendChild(form);
          form.submit();
        }).catch(e=>{
          console.error(e)
        })}
      
    },
    createCheckoutButton(preference,id) {
      console.log("Preference:",preference);
      console.log("id:",id);
      let script = document.createElement("script");
      const opcion = (payment)=>{ return payment.mode === 1 ? payment.key_dev : payment.key }
      const mp = new MercadoPago(opcion(this.event.payment), {
        locale: 'es-CO'
      });

        // Inicializa el checkout
        mp.checkout({
          preference: {
            id: preference.id_payment_gateway
          },
          autoOpen: true,
        });
        this.paymentActive = false
    },
    validateLogin(){
        let user_id = localStorage.getItem('_current_user_id')
        let token = localStorage.getItem('_current_token')
        if(user_id && token){
          return true
        }
        return false
    },
    renderMercadoPago(){
      var script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = "text/javascript";
      document.querySelector(`body`).appendChild(script);
    },
    closeModalF(){
        this.activities = []
        this.$modal.hide('modal-activities')
    },
    async seeActivitities(ticket){
      this.currentTicket = ticket
      const activities = JSON.parse(ticket.activities)
      try{
        await Promise.all(activities.map(async item=>{
          await axios.get(`activityExternal/${item}`).then(resp=>{
            this.activities.push(resp.data)
          })
        }))
        this.$modal.show('modal-activities')
        this.paymentActive = false
      }catch(e){
        this.$swal({icon:'error', text:e})
      }
    },
    getLanguage(){
      this.$i18n.locale = getlang.getLanguage();
      this.lang = this.$i18n.locale
    },
    async urlExternal(opt, id_hall='NOT_DEFINED'){
      if(id_hall!=103){
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
      }else{
        let user_id=localStorage.getItem('_current_user_id')
        if(user_id){
          await axios.get(`userVip/${user_id}`).then(resp=>{
            if(resp && resp.data && resp.data && resp.data!=null){
              this.$router.push({ path: `/Detail-Event/103/hall`});
            }else{
              this.$swal({icon:'error', text:'Este correo no está registrado para esta sesión'})
            }
            
          })
        }else{
          this.$swal({icon:'error', text:'Este correo no está registrado para esta sesión'})
        }

      }
    },
    paymentNotification(){
      this.status = this.$route.query.status
      if(!this.status)
        return
      if(this.status == 'approved')
          this.$swal.fire({
            title: this.$t('pages.Events.LandingEvent.purchaseApproved'),
            icon: 'success',
            text: this.$t('pages.Events.LandingEvent.youWillReceiveAnEmail'),
            confirmButtonText: `Ok`,
          }).then((result)=>{
              this.$router.push({ name: "landingEvent", query: { eventId: this.$route.query.eventId }});
          })

      if(this.status == 'in_process')
        this.$swal.fire({
          title:this.$t('pages.Events.LandingEvent.purchaseInProgress'),
          icon: 'warning',
          text:this.$t('pages.Events.LandingEvent.ApprovedEmailMessage')
        }).then((result)=>{
            this.$router.push({ name: "landingEvent", query: { eventId: this.$route.query.eventId }});
        })
      if(this.status == 'rejected'){
        this.$swal.fire({
          title: this.$t('pages.Events.LandingEvent.purchaseRejected'),
          icon: 'error',
          text: this.$t('pages.Events.LandingEvent.thePurchaseRejectedMesssage')
        }).then((result)=>{
            this.$router.push({ name: "landingEvent", query: { eventId: this.$route.query.eventId }});
        })
      }
    },
    imgBackgroudn(){
      if(this.styles && this.styles.home_img_background)
        return { backgroundImage: `url('${this.uriImg}${this.styles.home_img_background}')`}
      else
        return {}
    },
    valEndDate(date){
      let endDate = this.$moment(date).format('YYYY-MM-DD HH:mm:ss')
      let today = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      if(endDate >= today) return true
      else return false
    },
    tracking(){
      const token = localStorage.getItem('_current_token')
      let lastname = localStorage.getItem('_current_user_lastname')
      lastname = lastname ? (' '+lastname) : ''
      const user = encodeURIComponent(localStorage.getItem('_current_user_name')+lastname)
      const event = encodeURIComponent(this.event.name)
      const model_id = this.event.id
      const action = 'gen-certificate'
      const url = process.env.VUE_APP_API_URL+'editor/index'
      //const url = 'http://localhost:4000'
      const mode = process.env.VUE_APP_MODE
      const ToReturn = url+'?token='+token+'&action='+action+'&model_id='+model_id+'&event='+event+'&user='+user+'&mode='+mode+'&route=certificate'
      
      const thisWindow = window.open(ToReturn, "Test", "resizable,scrollbars,status")
      let cont = 0
      window.addEventListener("message", (event) => {
					// Do we trust the sender of this message?
          if(cont === 0){
					  
            this.functionDownload(event.data)
            }
					cont++
			}, false);
      axios.get(`certificate-tracking/${this.eventId}`)
    },
    functionDownload(file){
      this.$nextTick(()=>{
        const anchorEl = document.createElement('a');
        anchorEl.href = file;
        anchorEl.download = `file.png`;
        document.body.appendChild(anchorEl); // required for firefox
        anchorEl.click();
        anchorEl.remove();
      })
      
    },
    getCerticateData(){
      const user = localStorage.getItem("_current_event_id")
      if(user)
        axios.get(`certificate/${this.eventId}`).then(res=>{
          this.showCerButton=true
        }).catch(e=>{

        })
    },
    urlCerticate(){
      const token = localStorage.getItem('_current_token')
      let lastname = localStorage.getItem('_current_user_lastname')
      lastname = lastname ? (' '+lastname) : ''
      const user = encodeURIComponent(localStorage.getItem('_current_user_name')+lastname)
      const event = encodeURIComponent(this.event.name)
      const model_id = this.event.id
      const action = 'gen-certificate'
      const url = process.env.VUE_APP_API_URL+'editor/index'
      const mode = process.env.VUE_APP_MODE
      const ToReturn = url+'?token='+token+'&action='+action+'&model_id='+model_id+'&event='+event+'&user='+user+'&mode='+mode+'&route=certificate'
      return ToReturn
      },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    getEvent(){
      console.log('Entro aqui');
      axios.get(`showEvent/${this.eventId}`).then(response =>{
        this.event = response.data[0]
        if(this.event.payment_name === 'Mercadopago'){
          this.verifyForPayment()
          this.renderMercadoPago()
        }else if(this.event.payment_name === 'Payu'){
          this.verifyForPayment()
        }
      })
    },
    getHalls(){
      axios.get(`hallsEvent/${this.eventId}`).then(response =>{
        if(response.data.data.length > 0){
          console.log("Hi landing:", response.data.data);
          this.halls = response.data.data
        }
        else{
          this.halls[0] = this.event
          this.hasHall = false
        }
      })

    },

    displayIcon(){

        const iconos = document.getElementsByClassName('logo-landing');
        const iconosNoBackground = document.getElementsByClassName('logo-nobackground-container');
        const headerContainer = document.getElementsByClassName('main-header-container');
      
      if(this.eventId == 34){

        for(let i = 0; i < iconosNoBackground.length; i++){
          iconosNoBackground[i].style.display = 'none';
        }

        for(let i = 0; i < iconos.length; i++){
          iconos[i].style.display = "flex";
        }

        headerContainer[0].style.justifyContent = "flex-end";

      }else{

          for(let i = 0; i < iconosNoBackground.length; i++){
          iconosNoBackground[i].style.display = 'block';
        }

        for(let i = 0; i < iconos.length; i++){
          iconos[i].style.display = "none";
        }

        headerContainer[0].style.justifyContent = "space-between";

      }
    },

    getStyles(){
        axios.get(`styleEvent/${this.eventId}`).then(response =>{
          // console.log('this.styles:',response.data );
          this.styles = response.data
          console.log("this.styles:",this.styles);
        })
      },

    async getTickets(){
      const response = await axios.get(`ticketsEventExternal/${this.eventId}`)
      this.tickets = response.data.data
      console.log("tickets:", this.tickets);
      if(!this.tickets[0]){
        this.showTicket=false
        const data = await axios.get(`activitiesEventExternal/${this.eventId}`)
        console.log('activities:');
        console.log(data.data.data);
        this.tickets = data.data.data.map(item=>{
          return {
            id:item.id,
            name:item.name,
            description:item.name,
            unit_price:item.unit_price,
            activities:['1', '2', '3']
          }
        })
      }
      this.validatePriceOfTicket();
    },
   async getActivities(){

    // const data = await axios.get(`activitiesEventExternal/${this.eventId}`)
    // console.log('activities:');
    // console.log(data.data.data);
      await axios
        .get(`activitiesEventExternal/${this.eventId}`)
        .then((response) => {
          console.log("activities:")
          console.log(response)
        }).catch((error)=>{
          console.log("Error:");
          console.log(error);
        });
    },
    validatePriceOfTicket(){
      if(this.tickets && this.tickets.length>0){
        this.tickets.map((e)=>{
          if(e.unit_price>0){
            this.showSignUp = false;
          }
        })
          
      }
    }
  }

};
</script>

<style scope>

/* Creategica */
*{
  padding: 0;
  margin: 0;
}

.logo-nobackground-container{
  margin-left: 3em;
  background-color: transparent !important;
}

.logo-nobackground-container img{
  width: 50%;
}

.event{
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: none !important;
}

.content-main{
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  position: relative;
  z-index: 9;
}

h1, .h1, h2, .h2, h3, .h3, h4, .h4{
  margin: 0 !important;
}

.main-header-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3em 0 3em 0;
}

.logo-container{
  display: flex;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 0 0 100% 0;
  align-items: flex-start;
  justify-content: start;
  position: absolute;
  top: 0;
}

.logo-container img{
  width: 60%;
  display: block;
  margin: 1em;
}

.main-header-container ul{
  display: flex;
  margin: 0 4em 0 0;
  list-style: none;
  z-index: 5;
}


.menu-links li a{
  color:#fff;
  padding: 1em 2em 1em 2em;
}

.banner-container{
  width: 100%;
  height: 600px;
}

.img-mask-banner{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.img-mask-banner img{
  width:100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
/*
.optional-image{
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  margin: 3em;
}
*/


.title-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4em auto 4em auto;
  width: 50%;
  text-align: center;
}

.wrap-salas-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 1em auto 0 auto;
}

.wrap-sala{
  margin: 3em;
  z-index: 9;
  width: 450px;
}

.img-sala-mask{
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 25px;
}

.img-sala-mask img{
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.main-footer{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}

.wrap-footer{
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
    border-radius: 0px 0px 0px 200px;
  justify-content: space-between;
  align-items: center;
  padding-left: 15em;
    z-index: 9;
    margin: 5em 0 5em 0;
}

.wrap-footer ul{
  margin: 3em;
  list-style: none;
}

#icono-footer{
  width: 160px;
}

.data-contact-container{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.data-contact-container li{
  color: #fff;
  margin: 0 2em 0 2em;
}

.container-icono-footer{
  margin: 2em;
  padding: 1em;
  background-color: #fff;
  border-radius: 25px;
}

.social-links{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.social-links li{
  margin: 1em;
}

.social-links li a img{
  width: 50px;
}

/* RESPONSIVE */

@media screen and (max-width:1440px){

  .banner-container{
    height: 530px;
  }

@media screen and (max-width:1280px){
  .banner-container{
    height: 480px;
  }
}

@media screen and (max-width:800px){
  .wrap-footer{
    width: 95%;
    padding-left:5em;
    margin: 2em 0 2em 0;
  }

  .banner-container{
    height: 300px;
  }

  .title-container{
    width: 70%;
    text-align: center;
  }

  .wrap-salas-container{
    flex-direction: column;
    align-items: center;
  }

  .wrap-sala{
    margin: 3em auto 3em auto;
  }
}

@media screen and (max-width:500px){
  .logo-container{
    width: 100px;
    height: 100px;
  }

  .main-header-container{
    padding: 1em 0 1em 0;
  }

  .banner-container{
    height: 180px;
  }

  .wrap-footer{
    padding-left: 3em;
    margin: 1em 0 1em 0;
  }

  #icono-footer{
    width: 70px;
  }

  .social-links li a img{
    width: 40px;
  }
}

@media screen and (max-width:414px){
  .wrap-footer{
    width: 100%;
    border-radius: 0;
    padding: 0;
  }

  .wrap-footer ul{
    margin: 0;
  }

  .wrap-sala{
    width: 90%;
  }

  .banner-container{
    height: 130px;
  }
}

@media screen and (max-width:320px){
  .social-links li a img{
    width: 35px;
  }

  .container-icono-footer{
    margin: .7em;
  }
}

}

/* CREATEGICA END */

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
  width: 250px;
  height: 50px;
  font-size: 30px;

}
.event::before {

    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: hsla(0, 0%, 100%, 0.6); */

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
  text-align: center;
}

.event__title {
  font-size: 1.5rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin-top: 1em !important;
}

.event__description {
  color: white;
  margin: 0 !important;
}

.event__description p{
  overflow-wrap: break-word;
      
}

.event__description--main {
  color: white;
  font-size: 1.2rem;

}

.event__banner {
    width: 100%;
    border-radius: 20px;
}
.event__halls {
    width: 100%;
    height: 60%;
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

.custom-btn:hover{
  background: var(--color-hover) !important;
  color: var(--text-hover) !important;
  transition: all 150ms linear;
}

</style>
