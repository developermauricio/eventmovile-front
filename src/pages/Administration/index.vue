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
              <router-link :to="{path:'/admin-users-create'}">
                <p-button type="primary" block>Crear Usuario</p-button>
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
          <input v-model="searchUser" placeholder="Buscar registro" @keyup.enter="getUser" type="text" class="form-control" name="searchTable" />
          <span class="input-group-btn">
            <button class="btn btn-default m-0" @click.prevent="getUser"><span class="ti-search"></span></button>
          </span>
        </div>
      </div>
      <div class="col-12">
        <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Email</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Estado</th>
                  <th v-if="roleName != 'guest'" scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                

                <tr v-for="user in listUsers" :key="user.id">
                  <td>{{user.name}}</td>
                   <td>{{user.lastname}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.company}}</td>
                  <td>{{user.role}}</td>
                  <td v-if="user.actived">Activo</td>
                  <td v-else>Inactivo</td>
                  <td>
                    <router-link  :to="{name:'Admin Users Edit', params:{user_id:user.id} }" >
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1" title="Editar usuario" >
                        <span class="ti-pencil"></span>
                      </button>
                    </router-link>
                    

                  

                    <button @click="inactiveUser(user)" v-if="roleName != 'guest'" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-close"></span>
                    </button>

                  </td>
                </tr>
              </tbody>
            </table>
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              @page-change="getUser"
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
      searchUser:null,
      uri: process.env.VUE_APP_URL_FRONT,
      currentPage:1,
      totalPages:5,
      listUsers:[],
      roleName: localStorage.getItem('_current_role_name')
    }
  },
  created(){
    this.getUser()
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
    inactiveUser(user){
      this.$swal({
        icon:'warning',
        title: 'Estas seguro de cambiar el estado el usuario?',
        showCancelButton:true,
        confirmButtonText:'Si',
        cancelButtonText:'Cancelar',
      }).then((result)=>{
        if(result.isConfirmed){
          user.password = user.uid
          user.actived = !user.actived 
          axios.put(`users/${user.id}`, user).then(response =>{
            this.getUser()        
          }).catch(error=>{
            this.$swall({icon:'error', text:'Error al inactivar'})
          })
        }
      })
      
    },
    getUser(selectedPage = 1){
      this.currentPage = selectedPage
      let params
      if(this.searchUser === null || this.searchUser == ''){
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
          search:this.searchUser,
        }
      }
      axios.get('showAdminUsers', {params}).then(response =>{
        this.listUsers = response.data.data
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
