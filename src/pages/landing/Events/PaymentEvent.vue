<template >

  <div class="wrapper event" :style="bgImg">
    <!-- header -->
    <div class="px-4 d-flex flex-column flex-md-row align-items-center" :style="">
      
      <div class="logo-main my-0 mr-md-auto font-weight-normal" >
        <img v-if="Object.keys(this.event).length" :src="media+event.style.home_img_logo"/>
      </div>
      <div class="dropdown">
        <button @click="toLanding()" class="btn btn-outline-primary btn-sm mx-1">
          <span>{{$t('pages.Events.PaymentEvent.goHomePage')}}</span>
        </button>
      </div>
    </div>
    
    <div class="banner-container">
      <div class="img-mask-banner">
        <img v-if="Object.keys(this.event).length" :src="media+event.style.section_banner_register">
      </div>
    </div>
    <!-- header -->
    <div class="container mt-4" v-if="Object.keys(this.event).length">
      <div class="card-deck mb-3 text-center">
        <modal name="modal-notification"
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
                      <h6 class="h6" style="color:#614ba4">{{$t('pages.Events.PaymentEvent.activities')}}</h6>
                      <ul class="list-group list-group-flush">
                        <li v-for="activity in activities" class="list-group-item">{{activity.name}}</li>
                      </ul>                                    
                      
                      
                  </div>
                </div>
            </div>
        </modal>

        <div class="card mb-4 box-shadow" v-for="item in this.event.tickets" >
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">{{item.name}}</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">${{item.unit_price}} <!--<small class="text-muted">/ mo</small>--></h1>
            <p class="p-1">{{item.description}}</p>
            <a href="#" @click="seeActivitities(item)" class="btn btn-outline-primary m-0 py-1" >{{$t('pages.Events.PaymentEvent.showActivities')}}</a>
            <!--<ul class="list-unstyled mt-3 mb-4">
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>-->
            <button type="button" class="btn btn-lg btn-block btn-primary mb-2" :id="'ticket'+item.id" @click="clickComprar('ticket'+item.id,item)">{{$t('pages.Events.PaymentEvent.buy')}}</button>
          </div>
        </div>
        
      </div>

    </div> 
  </div>

</template>

<script>
import getlang from "@/lang/index.js"

  export default{
    name:"PaymentEvent",
    data(){
      return {
        eventId:null,
        event:{},
        media: process.env.VUE_APP_API_URL + 'storage/',
        activities:[], 
        currentTicket:{}
      }
    },
    computed:{
      bgImg:function(){
        if(Object.keys(this.event).length)
          if(!this.event.style.home_img_background){
            return `background-color:${this.event.style.home_color_background}`;
          } else {
            return `background-image:url('${process.env.VUE_APP_API_URL}storage/${this.event.style.home_img_background}');
              background-color:${this.event.style.home_color_background}
              background-position: center center;
              background-size: cover;
              background-repeat: repeat;
              position: relative;
              content:'';
            `
          }
      }
    },
    async created() {
      this.getLanguage();
      this.eventId = this.$route.query.eventId
      this.getEvent()  
    },
    methods: {
      getLanguage(){
        this.$i18n.locale = getlang.getLanguage();
      },
      toLanding(){
        this.$router.push({ path:'Landing-Event', query: { eventId: this.event.id } });
      },
      closeModalF(){
        this.activities = []
        this.$modal.hide('modal-notification')
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
          this.$modal.show('modal-notification')
        }catch(e){
          this.$swal({icon:'error', text:e})
        }
      },
      renderMercadoPago(){
        var script = document.createElement("script");
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.type = "text/javascript";
        document.querySelector(`body`).appendChild(script);
      },
      getEvent(){
        axios.get(`showEvent/${this.eventId}`).then(response =>{
          this.event = response.data[0]

          if(this.event.payment_name === 'Mercadopago'){
            this.renderMercadoPago()
          }
        })
      },
      async clickComprar(id, ticket){
        const { value: data } = await this.$swal.fire({
          title: this.$t('pages.Events.PaymentEvent.buyTicketsmessage'),
          input: 'text',
          inputLabel: this.$t('pages.Events.PaymentEvent.numberTickets'),
          inputValue: 1,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return this.$t('pages.Events.PaymentEvent.enterAnAmount')
            }
            if(isNaN(value))
              return this.$t('pages.Events.PaymentEvent.enterANumber')
          }
        })

        if (!data) {  
          return
        }

        const price = data*ticket.unit_price

        const user_id = localStorage.getItem('_current_user_id')
        const CustomItem = {
          "items": [
            {
              "id": "item-ID-1234",
              "title": "Title of what you are paying for. It will be displayed in the payment process.",
              "currency_id": "CLP",
              "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
              "description": "Item description",
              "category_id": "art", // Available categories at https://api.mercadopago.com/item_categories
              "quantity": 1,
              "unit_price": 100
            }
          ],
          "payer": {
            "name": "user-name",
            "surname": "user-surname",
            "email": "user@email.com",
            "date_created": "2015-06-02T12:58:41.425-04:00",
            "phone": {
              "area_code": "11",
              "number": "4444-4444"
            },
          }
        }
        
        const orderData = {
          quantity: data,
          price: ticket.unit_price,
          ...ticket,
          payment_gateway: this.event.payment_name,
          ticket_id: ticket.id,
          user_id:user_id
        };

        if(this.event.payment_name === 'Mercadopago'){
          axios.post('payment',orderData).then(res=>{
            this.createCheckoutButton(res.data,id)
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
      }
    },
  }
</script>

<style>


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



</style>
