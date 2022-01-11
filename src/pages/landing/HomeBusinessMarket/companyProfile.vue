<template>
  <div class="wrapper business">

    <!-- header -->
     <header-custom :user=user :businessMarket=businessMarket @cancel-meeting="getShedule(user.id)" />
    <!-- header -->

  <!-- content main -->
  <main class="content-main">
    <div class="content-header">
      <div class="row m-0 p-0">
        <div class="col-md-11 m-0 p-0">
            <span class="subtitle"> Rueda de Negocios</span>
            <h3 class="title-main">
              {{businessMarket.name}}
            </h3>
        </div>
        <div class="col-md-1 m-0 p-0">
          <router-link :to="{path:'/home-business-market/'+business_id}">
            <button class="btn btn-outline-primary small">
                <span class="ti-arrow-circle-left"></span>
              Volver
            </button>
          </router-link>

        </div>
      </div>



    </div>

    <div class="row ">
      <!-- col 1 -->
      <basic-profile :id="this.id"/>
      <!-- col 1 -->

      <!-- col 2 -->
      <div class="col-md-7 mt-4">
        <div class="row">
          <div class="col-md-12">
            <!-- Agenda -->
              <div class="row timeline main mb-2">
                <div class="col-md-12  p-4 box-card">
                    <div class="row">
                      <div class="col-md-12">
                        <h4 class="box-card__title">Agenda /</h4>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 timeline-content">
                        <div class="row mt-4">
                            <div class="col-md-12 text-center">
                              <modal name="make-appointment"
                                :width="520"
                                :height="200"
                                :adaptive="true">
                                  <div class="row px-3 mt-3">
                                     <div class="offset-md-1 col-md-5 mb-3">
                                      <label for="lastName">Fecha Inicio</label>
                                      <input type="date" class="form-control" id="lastName" placeholder="" v-model="appointment.date" required="">
                                      
                                    </div>
                                    <div class="col-md-5 mb-3">
                                      <label for="firstName">Hora Inicio</label>
                                      <input type="time" class="form-control" id="firstName" placeholder="" v-model="appointment.time" required="">
                                     
                                    </div>
                                    <div class="col-md-12">
                                      <button  class="btn btn-primary"
                                              type="submit" @click.prevent="createAppoinment()">Agendar</button>
                                    </div>
                                </div>
                              </modal>
                                    
                                    <vue-cal 
                                      resize-x
                                      :disable-views="['years', 'year', 'month']"
                                      :small="small"
                                      :time-from="start"
                                      :time-to="end"
                                      :showWeekNumbers=weekNumber
                                  
                                      locale='es'
                                      :time-step="businessMarket.time_meeting"
                                      :selected-date="selectedDate"
                                      :events="events"
                                      :editable-events="false"
                                      cell-contextmenu
                                  
                                      @cell-click="onEventClick"
                                      @cell-dblclick="onEventDoubleClick"
                                      >
                                      <template v-slot:event="{ event }">
                                        
                                        <div class="vuecal__event-title" v-html="event.title" />
                                        <!-- Or if your events are editable: -->
                                        
                                        <small class="vuecal__event-time">
                                          <!-- Using Vue Cal injected Date prototypes -->
                                          <strong>Inicia:</strong> <span>{{ event.start.format("HH:mm") }}</span><br/>
                                          <strong>Termina:</strong> <span>{{ event.end.format("HH:mm") }}</span>
                                        </small>
                                      </template>
                                      
                                    </vue-cal>
                            </div>
                        </div>
                      </div>
                    </div>

                </div>
              </div>
              <!-- Agenda -->

              <!-- documents -->
              <div class="row document main">
                <div class="col-md-12 p-4 box-card">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Documentos /</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 document-content">
                      <div class="row mt-4">
                        <!-- document-item -->
                        <template v-for="item in documents">
                          <document :document=item :key="item.id" />
                        </template>
                        <!-- document-item -->
                        
                      </div>

                    </div>
                  </div>
              </div>
            </div>
              <!-- documents -->
          </div>

          <div class="col-md-7 p-4">

          </div>
        </div>
      </div>
      <!-- col 2 -->

    </div>

  </main>
  <!-- content main -->


  </div>


</template>

<script>
  import VueCal from "vue-cal";
  import 'vue-cal/dist/i18n/es.js'
  import basicProfile from './components/basicProfile'
  import calendar from './components/calendar'
  import document from './components/documentMD6'
  import headerCustom from './components/header'

  export default {
    components:{
      basicProfile, calendar, VueCal, document, headerCustom
    },
    props:{
      id:{
        required:true
      },
      business_id:{
        required:true
      }
    },
    computed: {
      start: function(){
        if(this.businessMarket.start_date)
        {  const time = this.$moment(this.businessMarket.start_date).format('HH')
          return time * 60}
        else 
          return 3 * 60
      },
      end: function(){
        if(this.businessMarket.end_date)
        {  const time = this.$moment(this.businessMarket.end_date).format('HH')
          return time * 60}
        else
          return 20 * 60
      },
    },
    data(){
      return {
        appointment:{
          date:"",
          time:""
        },
        events: [],
        selectedDate: null,
        small: true,
        weekNumber: false,
        showModal:false,
        user:{},
        company:{},
        documents:[],
        businessMarket:{}
      }
    },
    watch: {
      id:function(newVal){
        console.log(newVal)
      },
      showModal:function(newVal){
         if(newVal == true) this.$modal.show('edit-poll')
         else this.$modal.hide('edit-poll')
      },
    },
    created() {
      this.getShedule(this.id)
      this.getUserData()
      this.getBusinessMarketData(this.business_id)
    },
    methods: {
      
      getBusinessMarketData(id){
        axios.get(`business-market/${id}`).then(res=>{
          this.businessMarket = res.data
        })
      },
       getDocuments(id){
        axios.get(`modelDocuements/company/${id}`).then(data=>{
          this.documents = data.data.data
        })
      },
      getUserData(){
      const role = localStorage.getItem('_current_role_name')
      const id = localStorage.getItem('_current_user_id')
      if(role === "business market")
        axios.get(`business-market-user/${id}`).then(data=>{
          this.user = data.data[0]
    
          if(data.data[0].company_id !== null){
            this.company = data.data[0].company
            this.getDocuments(data.data[0].company_id)
          }
        })
    },
      getShedule(id){
        axios.get(`schedule/${id}/${this.business_id}/1`).then((data)=>{
          this.events = data.data.data.map(item=>{
            return {
              ...item,
              title:item.state==='2'?item.title:'Por confirmar',
              class:item.state==='2'?'confirmed':'waiting'
            }
          })
        })
      },
      onEventCreate (event, deleteEventFunction) {
        return event
      },
      onEventClick(e){
        
        this.appointment.date = this.$moment(e).format('YYYY-MM-DD')

        let time = this.$moment(e).format('HH:mm:ss')
        time = this.$moment(time,'HH:mm:ss')
        let  start = this.$moment(this.businessMarket.start_date).format('HH:mm:ss')
        start = this.$moment(start,'HH:mm:ss')
        //console.log("Start meetings: ",start)
        const diference = time.diff(start, 'minutes')
        //console.log("Diference: ",diference)
        const toSum = Math.trunc(diference/this.businessMarket.time_meeting)*this.businessMarket.time_meeting
        this.appointment.time = start.add(toSum, 'minutes').format('HH:mm:ss')
        
        this.$modal.show('make-appointment')
      },
      onEventDoubleClick(e){
        console.log("Double click en calendar")
      },
      async createAppoinment(){
        const name = localStorage.getItem('_current_user_name')
        const id = localStorage.getItem('_current_user_id')
        const start = this.$moment(`${this.appointment.date} ${this.appointment.time}`).format('YYYY-MM-DD HH:mm:SS')
        const end = this.$moment(start).add(this.businessMarket.time_meeting, 'minutes').format('YYYY-MM-DD HH:mm:SS')
        const toCreate = {
          title: "Meeting with " + name,
          start,
          end,
          creator_id: id,
          business_id:this.business_id
        }

        const res = await axios.post(`meeting`,toCreate)
        //console.log("REsponse: ", res.data)
        if(res.data.message === 'FueraDeBM'){
          this.$swal('Fuera de fechas de rueda de negocio')
          this.$modal.hide('make-appointment')
          return
        }
        this.events.push({
          ...toCreate,
          class:'waiting'
        })
        //console.log("Res: ", res)
        const toCreate2 = {
          user_id: this.id,
          meeting_id: res.data.data.id
        }
        axios.post(`meeting-rel-users`,toCreate2).then(res=>{
          this.$modal.hide('make-appointment')
          this.$swal('Cita creada... (A espera de confirmacion)')
          this.getShedule(this.id)
        })

      }
    },
  }
</script>

<style>
  .vuecal__event.waiting {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
  .vuecal__event.confirmed {background-color: #008000;border: 1px solid #1f491f;color: #fff;}
</style>

<style scoped>

  .timeline.main {
    height: 600px !important;
  }
  .timeline-content{
    height: 500px !important;
  }
  
</style>
