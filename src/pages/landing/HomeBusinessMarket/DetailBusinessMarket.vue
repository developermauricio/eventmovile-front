<template>


  <div class="wrapper business" :style="{'background-color':businessMarket.principal_color}">

    <!-- header -->
    <header-custom :user="user" :businessMarket=businessMarket />
  <!-- header -->

  <!-- content main -->
  <div class="content-main">


    <!-- row 1 -->
    <div class="row mt-4  px-4">

      <!-- col 1 -->
      <div class="col-md-6">

        <span class="rueda__label" >Rueda de negocios /</span>

        <img class="rueda__banner" :src="url(businessMarket.pic)" alt="" v-if="businessMarket.pic">

        <h4 class="rueda__title">{{businessMarket.name}}</h4>
        <span class="rueda__date">{{BusinessMarketDate}}</span>
        <p class="rueda__description">
          {{businessMarket.sort_description}}
        </p>

          <a class="rueda__link" style="background-color: white; color:#614ba4 "  @click.prevent="enterFunction">
            <template v-if="user.name">Entrar</template>
            <template v-if="!user.name">Registrarse</template>
          </a><br>
          <a v-if="!user.name" :href="`${front}login-bm/${business_id}`" style="color:#fff ; margin-left:32%;">Ya tienes cuenta? Inicia sesión</a>
      </div>
      <!-- col 1 -->

      <!-- col 2 -->
      <div class="col-md-5 ml-5">

        <!-- participantes -->
        <div class="row rueda-participantes">

          <div class="col-md-12">

            <div class="row rueda-participantes__header">
              <div class="col-md-12">
                <span class="rueda__label" >Participantes /</span>
              </div>
            </div>

          </div>

          <div class="col-md-12 rueda-participantes__content">

            <!-- items -->
            <template v-for="item in participants">
              <participant-landing :data="item" :key="item.id" />
            </template>
            <!-- items -->
          </div>

        </div>
        <!-- participantes -->
      </div>
      <!-- col 2 -->
    </div>
    <!-- row 1 -->
  </div>
  <!-- content main -->
</div>

</template>

<script>
  import participantLanding from './components/participantLanding'
 import headerCustom from './components/header'

export default {
  components:{
    participantLanding, headerCustom
  },
  props:{
    business_id:{},
    meeting_id:{}
  },
  data() {
    return {
      businessMarket:{},
      participants:[],
      user:{},
      front:process.env.VUE_APP_URL_FRONT
    }
  },
  created() {
    this.getBusinessMarketData(this.business_id)
    this.getParticipants(this.business_id)
    if(localStorage.getItem('_current_user_id')){
      this.user = {
        id: localStorage.getItem('_current_user_id'),
        name: localStorage.getItem('_current_user_name'),
        role: localStorage.getItem('_current_role_name'),
      }
    }
  },
  computed: {
    BusinessMarketDate: function(){
      return this.$moment(this.businessMarket.start_date).format('Do MMMM [de] YYYY')
    }
  },
  methods: {
    enterFunction(){
      if(localStorage.getItem('_current_user_id'))
        this.$router.push({ name: "HomeBusinessMarket",params:{
          id: this.business_id
        } })
      else
        this.$router.push({
          name:'BMRegister',params:{
            business_id:this.business_id
          }
        })
    },
    url(src){
      return `${process.env.VUE_APP_API_URL}storage/${src}`
    },
    getBusinessMarketData(id){
      axios.get(`business-market/${id}`).then(res=>{
        this.businessMarket = res.data
      })
    },
    getParticipants(id){
      axios.get(`participants/${id}`).then(data=>{
        this.participants = data.data.data
      })
    },
  },
}

</script>

<style>

.bnt_register{
  background-color: lime;
}

.rueda-participantes__content {
  height: 80vh;
  overflow-y: scroll;
}

.rueda-participantes__item {

  background: white;
  border: 0.7px solid gray;
  border-radius: 8px;
  padding: 1rem;
  margin: 0 0 1rem;

}

.rueda-participantes__title {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.rueda-participantes__description {
  font-size: 0.9rem;
}

.rueda__label {
  color:#f161e1;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.rueda__date {
  color:#f161e1;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.rueda__title {
  font-size: 2rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.rueda__description {
  color: white;
}

.rueda__banner {
    width: 100%;
    border-radius: 20px;
}

.rueda__link {
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  width: 150px;
  text-align: center;
  margin-top: 1rem;
  margin-left: 35%;
}

</style>
