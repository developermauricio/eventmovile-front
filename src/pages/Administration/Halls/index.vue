<template>
    <div class="row">

      <div class="col-md-8">
        <h3>Listado de Salas</h3>
      </div>
      <div class="col-md-2">
        <br>
        <br>
        <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Ver Salas...</option>
              <option>Pendientes</option>
              <option>Cerrados</option>
            </select>
      </div>
      <div class="col-md-2">
        <router-link :to="{path:'/create-hall'}">
            <p-button type="primary" block>Crear Sala</p-button>
          </router-link>
      </div>
      <div class="col-12">

        <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Sala</th>
                  <th v-if="roleName != 'guest'" scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>



                <tr v-for="hall in listHalls" :key="hall.id">
                  <th scope="row">
                    {{hall.id}}
                  </th>
                  <td>{{hall.name}}</td>
                  <td class="text-right">

                    <router-link :to="{name:'Editar Sala', params: {hallId:hall.id} }" v-if="roleName != 'guest'">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button @click="deleteHall(hall.id)" v-if="roleName != 'guest'" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>
              </tbody>
            </table>
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              @page-change="getHalls"
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
import { PaperTable } from "@/components"
import SlidingPagination from 'vue-sliding-pagination'
export default {
  components: {
    PaperTable, SlidingPagination
  },
  data() {
    return {
      currentPage:1,
      totalPages:5,
      listHalls:[],
      roleName: localStorage.getItem('_current_role_name')
    }
  },
  created(){
    this.getHalls()
  },
  methods:{
    deleteHall(hallId){
      axios.delete(`halls/${hallId}`).then(response =>{
        this.getHalls()
      }).catch(error=>{
        alert("error al eliminar, hay actividades asociadas ")
      })
    },
    getHalls(selectedPage=1){
      this.currentPage = selectedPage
      let params = {
        pagination: true,
        per_page: 5,
        page: selectedPage
      }
      axios.get('halls', {params}).then(response =>{
        this.listHalls = response.data.data
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
