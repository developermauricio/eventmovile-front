<template>


  <div class="wrapper business" style="background-color:#614ba4">

    <!-- header -->
    <div class="header-main px-4 d-flex flex-column flex-md-row align-items-center">
        <div class="logo-main my-0 mr-md-auto font-weight-normal" >
            <img src="@/assets/img/heartOnline-white.png"/>
        </div>

       <div class="dropdown" v-if="user.name">
          <router-link :to="{name:'Mi Cuenta'}">
            <button class="btn btn-menu btn-outline-primary bg-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="ti-user"></span>
              {{user.name}}
            </button>
          </router-link>
          
          <!--<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>-->
        </div>
    </div>
  <!-- header -->

  <!-- content main -->
  <div class="content-main">

     <div class="content-header px-4 mt-5">
        <span class="subtitle" style="color:white"> Bienvenido</span>
        <h3 class="title-main" style="color:white" v-if="user.name">
          {{user.name}}
        </h3>
        <p style="color:white">
          A continuación encontrarás el listado de las ruedas de negocios disponibles.
        </p>
    </div>


    <!-- row 1 -->
    <div class="row mt-4  px-4">

      <!-- col 1 -->
      <template v-for="item in listBM">
        <business-market-data :data=item :key="item.id"/>
      </template>
       
      <!-- col 1 -->





    </div>
    <!-- row 1 -->

  </div>
  <!-- content main -->


  </div>


</template>

<script>
import businessMarketData from './components/businessMarketData'

export default {
  name:"landingBM",
  components:{
    businessMarketData
  },
  data(){
    return{
      user:{},
      listBM:[]
    }
  },
  created() {
    if(localStorage.getItem('_current_user_id')){
      this.user = {
        id: localStorage.getItem('_current_user_id'),
        name: localStorage.getItem('_current_user_name'),
        role: localStorage.getItem('_current_role_name'),
      }
    }
    this.getListBM()
  },
  methods: {
    getListBM(){
      axios.get(`business-market-without-log`).then(data=>{
        this.listBM = data.data.data
      })
    }
  },
}



</script>

<style>

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
  width: auto;
  margin-top: 1rem;
}

</style>
