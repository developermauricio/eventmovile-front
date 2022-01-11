<template>
  <card class="card" title="Nueva Sala">

  <form class="needs-validation" novalidate="">

  <!-- Step 01 -->
    <div id="step01">

      <h4 class="mb-3">Crear códigos para staff </h4>
      <div class="row p-3">

              <div class="col-md-6 mb-3">
                <label for="validationDefault04">Seleccionar evento</label>
                <multiselect :options="events" v-model="eventSelected"  width="100px"  track-by="name"
                :multiple="false"  label="name">
                </multiselect>
              </div>
              

            </div>
        <div class="row">
          

          <div class="col-md-6">
            <div class="row p-3">

              <div class="col-md-12 mb-3">
                <label for="firstName">Cantidad de códigos para crear </label>
                <input type="number" min="1" v-model="formStaff.name" v-model.trim="$v.formStaff.quantity.$model" class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.formStaff.quantity.$error">
                  Valid first name is required or incorrect length.
                </div>
              </div>

            </div>

          </div>

          <div class="col-md-6">

          </div>


        </div>
        <div class="row">
        <div class="col-md-9">
          </div>
          <div class="col-md-3">
            <button class="btn btn-primary btn-lg btn-block" @click.prevent="createStaffAccess" type="button">
              Crear códigos
              <div v-if="showLoader" class="loader"></div>
            </button>
        </div>
      </div>
    </div>
  <!-- Step 01 -->


  </form>


  </card>

</template>
<script>
import { required, minLength } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'

export default {
    name: 'createStaffAccess',
    components:{ multiselect },
    data(){
      return{
        showLoader:false,
        events:[],
        eventSelected:[],
        formStaff:{
          quantity:1,
          event_id:null,
        },
        
      }
    },
    validations: {
      formStaff:{
          quantity:{required, minLength: minLength(1)},
          event_id:{required},
      },
    },
    created(){
      this.getEvents()
    },
    methods: {
      async createStaffAccess(){
        if(this.formStaff.quantity < 1 || this.formStaff.quantity > 50){
          this.$swal({icon:'error',text:"La cantidad de códigos para crear debe ser mayor que cero y menor que 51"})
          return
        }
        this.formStaff.event_id = this.eventSelected.id
        this.$v.formStaff.$touch()
        if(this.$v.formStaff.$error) return
        let arrayCodes = []
        let response 
        this.showLoader = true
        for (let index = 0; index < this.formStaff.quantity; index++) {
          response = await axios.post('staffAccess', this.formStaff).catch(error=>{
            this.$swal({icon:'error',text:"Error al crear un acceso. "+error.response.data.error,})
          }) 
          arrayCodes += '<p style="color:green">'+response.data.data.token+'</p>'
        }
        this.showLoader = false
        this.$swal.fire({
          title:'Estos son los códigos generados',
          icon:'success',
          showCloseButton: true,
          html: arrayCodes,
        }).then(function(result){
          if(result){
            window.location.href = '#/staff-access'
          }
        })
        
        
      },
      
      getEvents(){
        axios.get('events?pagination=false').then(response => {
          this.events = response.data
        })
      },
    },
};


</script>

<style>
.loader {
  margin-left: 48%;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
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
