<template>
    <div class="row">
      <div class="col-12">
        <div class="box-header">
          <div class="row">
            <div class="col-2">
              <!-- <div class="num-title">
               Total Eventos:
              </div> -->
              <!-- <div class="num-count">
              23
              </div> -->
            </div>
            <div class="col-6">
              <!-- <div class="num-title">
               Proximo Evento:
              </div>
              <div class="num-count">
              24:25:12
              </div> -->
            </div>
            <div class="col-3" v-if="roleName != 'guest'">
              <router-link :to="{path:'/staff-access-create'}">
                <p-button type="primary" block>Crear codigos para staff</p-button>
              </router-link>

            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h3>Listado de accesos</h3>
      </div>
      <div class="col-md-4">
        <br>
        
      </div>
      <div class="col-5 offset-7">
        <div class="input-group">
          <input v-model="searchAccess" placeholder="Buscar registro" @keyup.enter="getStaffAccess" type="text" class="form-control" name="searchTable" />
          <span class="input-group-btn">
            <button class="btn btn-default m-0" @click.prevent="getStaffAccess"><span class="ti-search"></span></button>
          </span>
        </div>
      </div>
      <div class="col-12">
        <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Token</th>
                  <th scope="col">Evento</th>
                  <th scope="col">Usuario asociado</th>
                  <th scope="col">Activo</th>
                  <th v-if="roleName != 'guest'" scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                

                <tr v-for="staff in listStaffAccess" :key="staff.id">
                  <th scope="row">
                    {{staff.id}}
                  </th>
                  <td>{{staff.token}}</td>
                  <td>{{staff.event}}</td>
                  <td>{{staff.user_staff}}</td>
                  <td v-if="staff.actived == true">Activo</td>
                  <td v-else>Inactivo</td>
                  <td class="text-right">
                    <button @click="deleteAccess(staff.id)" v-if="roleName != 'guest'" type="button" class="btn btn-outline-danger btn-sm mx-1">
                        <span class="ti-close"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              @page-change="getStaffAccess"
            ></sliding-pagination>


<!--
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">

            </paper-table>
          </div>
        </card> -->
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { PaperTable } from "@/components";
import SlidingPagination from 'vue-sliding-pagination'

export default {
  components: {
    PaperTable, SlidingPagination
  },
  data() {
    return {
      searchAccess:null,
      uri: process.env.VUE_APP_URL_FRONT,
      currentPage:1,
      totalPages:5,
      listStaffAccess:[],
      roleName: localStorage.getItem('_current_role_name')
    }
  },
  created(){
    this.getStaffAccess()
  },
  methods:{
    showLanding(id){
      let aux = document.createElement("input");
      let text = this.uri+'Landing-Event?eventId='+id
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$swal({icon:'success', text:'Url copiada en portapapeles'})
    },
    deleteAccess(staffId){
      this.$swal({
        icon:'warning',
        title: 'Estas seguro de eliminar el acceso',
        showCancelButton:true,
        confirmButtonText:'Si',
        cancelButtonText:'Cancelar',
      }).then((result)=>{
        if(result.isConfirmed){
          axios.delete(`staffAccess/${staffId}`).then(response =>{
            this.getStaffAccess()        
          }).catch(error=>{
            this.$swall({icon:'error', text:'Error al eliminar'})
          })
        }
      })
      
    },
    getStaffAccess(selectedPage = 1){
      this.currentPage = selectedPage
      let params
      if(this.searchAccess === null || this.searchAccess == ''){
        params = {
          pagination: true,
          per_page: 5,
          page: selectedPage
        }
      } else {
        params = {
          pagination: true,
          per_page: 5,
          page: selectedPage,
          search:this.searchAccess,
        }
      }
      axios.get('staffAccess', {params}).then(response =>{
        this.listStaffAccess = response.data.data
        this.totalPages = Math.ceil(Number(response.data.pagination.total)/Number(params.per_page))
      })
    }
  }

};
</script>
<style>

@import "~vue-sliding-pagination/dist/style/vue-sliding-pagination.css";
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

</style>
