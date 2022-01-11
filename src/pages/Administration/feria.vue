<template>
<div>
  <router-link class="col-1 text-right" :to="{name:'Mis Eventos' }">
    <a href="#/events" class="">
      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
        <span class="ti-arrow-left"></span>
      </button>
    </a>
  </router-link>
  <div class="col-6"></div>
  <div class="col-5"></div>
  <card class="card" :title="'Feria comercial - '+event_name">
  <form class="needs-validation" novalidate="">  
    <div id="step01">
      <h4 class="mb-3">Registro empresas</h4>
        <div class="row p-3">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" maxlength="100" v-model="formFair.name" v-model.trim="$v.formFair.name.$model" class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formFair.name.$error">
             Valid first name is required.
            </div> 
          </div>
          <div class="col-md-6 mb-3">
            <label for="validationDefault04">Descripción</label>
            <input type="text" maxlength="200" v-model="formFair.description"  class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formFair.description.$error">
              Valid first description is required.
            </div>
          </div>
        </div>
        <div class="row p-3">

          <div class="col-md-6 mb-3">
            <label for="validationDefault04">Logo</label>
            <input @change="piclogo" class="form-control border-input border-input" type="file" name="pic" id="pic"/>
            <div class="hasError" v-if="$v.formFair.pic.$error">
              logo is required.
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="firstName">Contacto</label>            
            <input type="number" class="form-control border-input border-input" min="7" max="10" v-model="formFair.contact" name="contact" id="contact">
            <div class="hasError" v-if="$v.formFair.contact.$error">
              Valid first activities is required.
            </div> 
          </div>          
        </div>
        <div class="row">   
          <div class="col-md-9">
          </div>
            <div class="col-md-3">
              <button @click.prevent="createFair" class="btn btn-primary btn-lg btn-block" type="button">Crear Empresa</button>
            </div>
        </div>
    </div>      
  </form>  
  </card>
  <div class="container">
      <table class="col-12">
        <thead>
          <th>id</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Logo</th>
          <th>Contacto</th>
          <th>Borrar</th>
        </thead>
        <tbody>
          <tr v-for="(fer, index) in feria" :key="index">
            <td>{{fer.id}}</td>
            <td>{{fer.name_company}}</td>
            <td>{{fer.description_company}}</td>
            <td>
              <img class="speaker_el_img" :src="urlImg+fer.logo_company" />
            </td>
            <td>{{fer.contact_company}}</td>
            <td>
              <button @click="destroyCompany(fer.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                <span class="ti-trash"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"

export default {
    name: 'FeriaAdmin',
    components:{  },
    props:{
      event_id:{        
        type: Number,
      },
      event_name:{        
        type: String,
      },
    },
    mounted(){
      //alert(this.event_id)
      this.getFeriaComercial()
    },
    data(){
      return{
        activitiesSelected:[],
        activities:[], 
        feria:[],
        urlImg : process.env.VUE_APP_API_URL_FILES,
        formFair:{
          name:'',
          description:null,          
          pic:'',
          contact:0
        },
      }
    },
    validations: {
      
      formFair:{
        name:{required},
        description:{required},        
        pic:{required},
        contact:{required}
      },
    },
    methods: {
      createFair(){        
        var data = new FormData
        data.append('name_company',this.formFair.name)
        data.append('description_company',this.formFair.description)
        data.append('logo_company',this.formFair.pic)
        data.append('contact_company',this.formFair.contact)
        data.append('id_event',this.event_id)
                
        axios.post('createCompany', data).then(response=>{
          this.formFair.name = ''
          this.formFair.description = '' 
          this.formFair.pic = ''
          this.formFair.contact = ''
          this.$swal('Empresa creada')
          this.getFeriaComercial()
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      piclogo(e) {
        let files = e.target.files || e.dataTransfer.files;
        this.formFair.pic = files[0];
        let label = document.getElementById("pic");
        label.innerText = files[0].name;
      },
      getFeriaComercial(){
        axios.get(`getCompanyFair/${this.event_id}`).then(response =>{
          console.log('speaker:',response.data.data );                              
          this.feria = response.data.data 
        })                        
      },
      destroyCompany(id){
        let params = {
          id: id
        }      
        axios.put('removeCompany/',params).then(response=>{
            //this.$swal({icon:'success', text:'borrada'})
            this.getFeriaComercial()
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })        
      }
    },
    
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
