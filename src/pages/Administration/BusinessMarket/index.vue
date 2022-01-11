<template>
<div class="wrapper">

  <!-- Plans -->
  <div class="row plans-container" v-bind:class="{ hidden: true }">
    <div class="col-md-12 text-center my-4">
      <h3 class="title">No cuentas con este servicio</h3>
      <p class="subtitle2">Te invitamos a adquirir uno de nustros planes</p>
    </div>

    <div class="col-md-12">
      <div class="row">


      <div class="col-md-9 m-auto">
        <div class="row">


      <div class="col-md-4">
        <div class="plan-box">

          <ul class="list-group">
            <li class="list-group-item active">
                <h5 class="plan-name">Plan Basic</h5>
                <span class="price">
                  $150.000
                </span>
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Ruedas de Negocios
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Eventos publicos y privados
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              50 Invitaciones al mes
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            <li class="list-group-item">
              <p-button type="primary" block>Adquirir</p-button></li>
          </ul>
        </div>
      </div>

      <div class="col-md-4">
        <div class="plan-box">

          <ul class="list-group">
            <li class="list-group-item active">
                <h5 class="plan-name">Plan Standar</h5>
                <span class="price">
                  $250.000
                </span>
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Ruedas de Negocios
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Eventos publicos y privados
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              50 Invitaciones al mes
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            <li class="list-group-item">
              <p-button type="primary" block>Adquirir</p-button></li>
          </ul>
        </div>
      </div>

      <div class="col-md-4">
        <div class="plan-box">

          <ul class="list-group">
            <li class="list-group-item active">
                <h5 class="plan-name">Plan Premium</h5>
                <span class="price">
                  $500.000
                </span>
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Ruedas de Negocios
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Eventos publicos y privados
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              50 Invitaciones al mes
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            <li class="list-group-item">
              <p-button type="primary" block>Adquirir</p-button></li>
          </ul>
        </div>
      </div>
      </div>
        </div>
    </div>
    </div>

  </div>

<!-- Plans -->

    <div class="row" v-bind:class="{ hidden: false }">
      <div class="col-12" v-if="user.role === 'super admin' || user.role === 'admin'">
        <div class="box-header">
          <div class="row">
            <!--<div class="col-4">
              <div class="num-title">
               Total Ruedas de negocios:
              </div>
              <div class="num-count">
              23
              </div>
            </div>
            <div class="col-4">
              <div class="num-title">
               Proxima Ruedas de negocios:
              </div>
              <div class="num-count">
              24:25:12
              </div>
            </div>-->
            <div class="col-4">
               <router-link :to="{path:'/create-business-market'}">
                  <p-button type="primary" block>Crear nueva rueda de negocios</p-button>
               </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- List -->
       <div class="col-12">
        <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Rueda</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Modo</th>
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                
                <tr v-for="item in table1.data" :key="item.id">
                  <th scope="row">
                      {{item.id}}
                  </th>
                  <td>{{ item.nombre }}</td>
                  <td>{{item.tipo}}</td>
                  <td>{{item.modo}} </td>
                  <td class="text-right">

                    <button type="button" @click="showLanding(item.id)" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-eye"></span>
                    </button>
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click.prevent="updateFunction(item.id)" v-if="user.role === 'super admin' || user.role === 'admin'">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    
                    <button type="button" class="btn btn-outline-danger btn-sm mx-1"  @click.prevent="deleteFunction(item.id)" v-if="user.role === 'super admin' || user.role === 'admin'">
                       <span class="ti-trash"></span>
                    </button>
                    
                    
                   <router-link :to="{name:'HomeBusinessMarket', params: {id:item.id} }" v-if="user.role === 'business market'">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-eye"></span>
                      </button>
                    </router-link>

                  </td>
                </tr>

              </tbody>
            </table>
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              @page-change="getBusinessMarket"
            ></sliding-pagination>



      </div>
      <!-- List -->

    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import SlidingPagination from 'vue-sliding-pagination'

const tableColumns = ["Id", "Nombre", "Tipo", "Modo"];
import jsonExcel from "vue-json-excel"

export default {
  components: {
    PaperTable, SlidingPagination,jsonExcel
  },
  data() {
    return {
      uri:process.env.VUE_APP_URL_FRONT,
      currentPage:1,
      totalPages:5,
      table1: {
        title: "Rueda de Negocios",
        subTitle: "Listado de rueda de negocios",
        columns: [...tableColumns],
        data: []
      },
      user:{}
    };
  },
  created() {
    this.getBusinessMarket()
    this.user.role = localStorage.getItem('_current_role_name') 
  },
  methods: {
   
    showLanding(id){
      let aux = document.createElement("input");
      let text = this.uri+'landing-business-market/'+id
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$swal({icon:'success', text:'Enlace copiado en portapapeles'})
    },
    updateFunction(id){
      
      this.$router.push({
        path:`create-business-market/${id}`
      })
    },
    deleteFunction(id){
      this.$swal.fire({
          'title':"Eliminar rueda de negocio?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
      }).then(rta=>{
          if(rta.isConfirmed)
              axios.delete(`business-market/${id}`).then(res=>{
                this.$swal('Rueda eliminada')
                this.getBusinessMarket()
              })
      })  
      
    },
    getBusinessMarket(selectedPage=1){
      this.currentPage = selectedPage
      let params = {
        pagination: true,
        per_page: 5,
        page: selectedPage
      }
      axios.get('business-market', {params}).then(data=>{
        this.totalPages = Math.ceil(Number(data.data.pagination.total)/Number(params.per_page))
        this.table1.data = data.data.data.map(item =>{
          return {
            id:item.id,
            nombre:item.name,
            tipo: item.type,
            modo:item.mode,
            fecha: this.$moment(item.start_date).format('YYYY-MM-DD')
          }
        })
      }).catch(e=>{
        console.error(e)
      })
    }
  },
};
</script>
<style>
.hidden{
  display: none;
}
.box-header{
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.num-title{
  font-size: 0.8rem;
}
.num-count{
  font-size: 3rem;
  font-weight: bold;
  color:  #8e04cc
}

.title{
  font-size: 1.5rem;
  font-weight: bold;
  color:  #8e04cc
}
.subtitle2{
  font-size: 1rem;
  font-weight: bold;
  color:  #8e04cc;
  margin-bottom: 50px;
}
.plan-name {
  font-size: 20px!important;
  font-weight: bold;
}

.price {
  font-size: 45px !important;
  font-weight: bold;
  margin: -23px 0 0;
  display: block;
}

.list-group-item {
  padding: 1rem 1.25rem !important;
  font-size: 17px !important;
}

.list-group-item.active {
  background-color: #ae09ae !important;
  border-color: #ae09ae !important;
}

</style>
