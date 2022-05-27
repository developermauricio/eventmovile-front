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
              <router-link :to="{path:'/create-event'}">
                <p-button type="primary" block>Crear nuevo evento</p-button>
              </router-link>

            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h3>Listado de Eventos</h3>
      </div>
      <div class="col-md-4">
        <br>
        <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Ver eventos...</option>
              <option>Pendientes</option>
              <option>Cerrados</option>
            </select>
      </div>
      <div class="col-12">

        <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Evento</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Inicia</th>
                  <th scope="col">Termina</th>
                  <th v-if="roleName != 'guest'" scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                

                <tr v-for="event in listEvents" :key="event.id">
                  <th scope="row">
                    {{event.id}}
                  </th>
                  <td>{{event.name}}</td>
                  <td>{{event.company.name}}</td>
                  <td>{{event.start_date}}</td>
                  <td>{{event.end_date}}</td>
                  <td class="text-right">   
                    <!-- TODO: add btn webApp -->                 
                    <button v-if="event.req_web_app == 1" @click="showWebApp(event)" type="button" class="btn btn-outline-primary btn-sm mx-1" title="link WebApp" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
                      </svg>
                    </button>  

                    <button v-if="event.wa_req_feria_comercial" @click="goToFeriaAdmin(event.id,event.name)" type="button" class="btn btn-outline-primary btn-sm mx-1" title="Registro feria comercial" >
                      <span class="ti-briefcase"></span>
                    </button>                    
                    <button @click="switchDesignComponent(event.id)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                            <span class="ti-palette"></span>
                    </button>
                    <button @click="eventNotification(event)" type="button" data-toggle="modal" data-target="#modal-admin-notifications" class="btn btn-outline-primary btn-sm mx-1">
                      <span class="ti-bell"></span>
                    </button>
                    <router-link  target="_blank" :to="{path:'Landing-Event', query: {eventId:event.id} }" v-if="roleName == 'guest'">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1" title="Ver landing" >
                        <span class="ti-eye"></span>
                      </button>
                    </router-link>

                    <button type="button" @click="showMetrics(event.id)" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-bar-chart"></span>
                    </button>
                    <button type="button" @click="showLanding(event.id)" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-eye"></span>
                    </button>

                    <router-link :to="{name:'Editar Evento', params: {eventId:event.id} }" v-if="roleName != 'guest'">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1" title="editar">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button @click="deleteEvent(event.id)" v-if="roleName != 'guest'" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table> 
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              @page-change="getEvents"
            ></sliding-pagination>


<!--
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">

            </paper-table>
          </div>
        </card> -->
      </div>
      <design :showModal="showDesign" :eventID="eventID" @close-modal="oncloseModal()" />
      <!--=====================================
		   MÓDULO NOTIFICACIONES
      ======================================-->
      <div class="modal fade bd-example-modal-lg" id="modal-admin-notifications" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <h1>Modal</h1>
          </div>
        </div>
      </div>
      <notification-new :eventName="eventName" :eventId="eventIdNotification" :showModalNotification="showModalNotification" @close-modal-notification="onCloseModalNotification()"></notification-new>
    </div>
</template>
<script>
import Vue from 'vue'
import { PaperTable } from "@/components";
import SlidingPagination from 'vue-sliding-pagination'
import design from '../../landing/Events/components/design'
import NotificationNew from "../components/NotificationNew";


export default {
  components: {
    PaperTable, SlidingPagination, design,
    NotificationNew
  },
  data() {
    return {
      uri: process.env.VUE_APP_URL_FRONT,
      currentPage:1,
      totalPages:5,
      listEvents:[],
      roleName: localStorage.getItem('_current_role_name'),
      showDesign:false,
      showModalNotification:false,
      eventID:null,
      eventName:null,
      eventIdNotification:null,
      urlWebApp: process.env.VUE_APP_URL_WEBAPP,
    }
  },
  created(){
    this.getEvents()
  },
  methods:{
    eventNotification(event){
      this.showModalNotification = true
      this.eventIdNotification = event.id
      this.eventName = event.name
    },
    onCloseModalNotification(){
      this.showModalNotification = false
    },
    oncloseModal(){
      this.showDesign = false
    },
    goToFeriaAdmin(idEvent, nameEvent){
      this.$router.push({ name: 'FeriaAdmin', params: {event_id: idEvent, event_name:nameEvent }})
    },
    switchDesignComponent(event){
      this.eventID = event
      this.showDesign = !this.showDesign
    },
    showDesignComponent:function(newVal){
      if(newVal == true) this.$modal.show('edit-poll')
      else this.$modal.hide('edit-poll')
    },
    showMetrics(id){
      axios.get(`eventMetrics/${id}`).then(response=>{
        let metrics = response.data.data
        if(metrics.length == 0){
          this.$swal({icon:'error', text:'No hay datos aún'})
        }else{
          let stringAlert = ''
          metrics.map((item, index) =>{
            if(item.type == 'Registrados')stringAlert =  stringAlert+item.type+':  <b>'+item.total+'</b><br>'
            else stringAlert =  stringAlert+item.type+':  <b>'+item.porcentaje.slice(0, 4)+'% - '+item.cantidad+'</b><br>'
          })
          this.$swal.fire({title: '<strong>Métricas</strong>',  html:stringAlert })
        }
      }).catch(error=>{
        
      })
    },
    async fetchDataGuests(event){
      let response
      response = await axios.get(`reportEventUsers/${event}`)
      if(response.data.data.length == 0) this.$swal({icon:'error', text:'No hay datos'})
      return response.data.data
    },
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
    showWebApp( event ) {
      let aux = document.createElement("input");
      let text = this.urlWebApp + event.wa_path_value;
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$swal({icon:'success', text:'Url copiada en portapapeles'})
    },
    deleteEvent(eventId){
      axios.delete(`events/${eventId}`).then(response =>{
        this.getEvents()        
      }).catch(error=>{
        alert("error al elimanar, hay actividades asociadas ")
      })
    },
    getEvents(selectedPage=1){
      this.currentPage = selectedPage
      let params = {
        pagination: true,
        per_page: 10,
        page: selectedPage
      }
      
      axios.get('events', {params}).then(response =>{
        this.listEvents = response.data.data
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
