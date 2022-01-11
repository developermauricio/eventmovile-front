<template>
  <card class="card" title="Nuevo Ticket">

  <form class="needs-validation" novalidate="">

  <!-- Step 01 -->
    <div id="step01">

      <h4 class="mb-3">Detalles del Ticket</h4>

        <div class="row p-3">

          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" v-model="formTicket.name" v-model.trim="$v.formTicket.name.$model" class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formTicket.name.$error">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="validationDefault04">Descripción</label>
            <input type="text" v-model="formTicket.description" v-model.trim="$v.formTicket.description.$model" class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formTicket.description.$error">
              Valid first description is required.
            </div>
          </div>
        </div>

        <div class="row p-3">

          <div class="col-md-6 mb-3">
            <label for="validationDefault04">Evento</label>
            <select @change="getActivities()" v-model="formTicket.event_id" class="custom-select" id="validationDefault04" required>
              <option selected disabled value="">Seleccione...</option>
              <option v-for="event in events" :value="event.id" :key="event.id">{{event.name}}</option>
            </select>
            <div class="hasError" v-if="$v.formTicket.event_id.$error">
              Valid first event is required.
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="firstName">Actividades</label>
            <multiselect :options="activities" v-model="activitiesSelected"  width="100px"  track-by="name"
            :multiple="true" label="name">
            </multiselect>
            <div class="hasError" v-if="$v.formTicket.activities.$error">
              Valid first activities is required.
            </div>
          </div>

          <div class="col-md-2 mb-3">
            <label for="firstName">Valor</label>
            <input type="text" v-model="formTicket.unit_price" v-model.trim="$v.formTicket.unit_price.$model" class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formTicket.unit_price.$error">
              Valid first unit price is required.
            </div>
          </div>
        </div>
        <div class="row">
        <div class="col-md-9">
          </div>
          <div class="col-md-3">
                <button @click.prevent="createTicket" class="btn btn-primary btn-lg btn-block" type="button">Crear Ticket</button>
        </div>
      </div>
    </div>
  <!-- Step 01 -->


  </form>


  </card>

</template>
<script>
import { required } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'

export default {
    name: 'MyComponent',
    components:{ multiselect },
    data(){
      return{
        activitiesSelected:[],
        activities:[], 
        events:[],
        formTicket:{
          name:'',
          description:null,
          event_id:null,
          activities:[],
          unit_price:null,
        },
      }
    },
    validations: {
      
      formTicket:{
        name:{required},
        description:{required},
        event_id:{required},
        activities:{required},
        unit_price:{required},
      },
    },
    created(){
      this.getEvents()
    },
    methods: {
      createTicket(){
        this.activitiesSelected.map(item=>{
          this.formTicket.activities.push(item.id)
        })
        this.formTicket.activities = JSON.stringify(this.formTicket.activities)
        this.$v.formTicket.$touch()
        if(this.$v.formTicket.$error) {
          this.formTicket.activities = []
          return
        }
      

        axios.post('tickets', this.formTicket).then(response=>{
          this.$swal('Ticket creado')
          this.$router.push({name:'Tickets'})
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      getEvents(){
        axios.get('events?pagination=false').then(response=>{
          this.events = response.data
        })
      },
      getActivities(){
        this.activitiesSelected=[]
        axios.get('activities-event/'+this.formTicket.event_id+'?pagination=false').then(resp => {
          this.activities = resp.data
        })
      }
      
    },
    mount () {
        this.show()
    }
};


</script>

<style>
 .btn-sm{
    font-size: 1rem !important;
    padding-right: 1rem;
    padding-left: 1rem;
   }

.btn-sm
.order{
      color: black;
      cursor: move;
    }
  .btn-invitaciones{
    position: absolute;
    top: -40px;
    right: 20px;
  }
  .hasError {
    color: red;
  }
</style>
