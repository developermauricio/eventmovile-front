<template>
   <div>
      <modal name="register-fields"
         :width="720"
         height="auto"
         :scrollable="true"
         >
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('register-fields')">
                  ❌
               </button>
            </div>
            <div class="row" style="overflow-y: auto;">
               <div class="col-12">
                  <h4 class="mb-3">Campos del formulario de registro</h4>
               </div>

               <div class="col-md-12 mb-3">
                  <label for="lastName">Nombre</label>
                  <input type="text" class="form-control" v-model="form.name"  id="" cols="30" rows="3"></textarea>
                  <div class="hasError" v-if="$v.form.name.$error">
                     Valid last name is required.
                  </div>
               </div>
               <div class="col-md-12 mb-3">
                  <label for="country">Tipo</label>
                  <select v-model="form.type" class="custom-select d-block w-100" id="country" required="">
                     <option value="text">Texto corto</option>
                     <option value="textarea">Texto largo</option>
                     <option value="number">Número</option>
                     <option value="select">Menu desplegable</option>
                  </select>
                  <div class="hasError" v-if="$v.form.type.$error">
                     Please select a valid type.
                  </div>
               </div>
               <div class="col-md-12 mb-3 answer" v-if="form.type == 'select'">
                  <label  for="name">Opciones de respuesta separadas por coma</label> 
                  <Tags  :model.sync="form.options"></Tags>    
               </div>
               <div class="col-md-12">
                  <div class="form-check px-4">
                     <input type="checkbox" v-model="form.required" class="form-check-input" id="exampleCheck1">
                     <label class="form-check-label" for="exampleCheck1">Pregunta Obligatoria</label>
                  </div>
               </div>
               <div class="col-md-12" v-if="showAdd">
                  <button @click="createColumn" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       Agregar campo
                  </button>
               </div>
               <div class="col-md-12" v-else>
                  <button @click="editColumn(editCol)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       Editar campo
                  </button>
               </div>
               <table class="table table-striped">
                  <thead>
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Opciones</th>
                        <th scope="col" class="text-right">Eliminar</th>
                     </tr>
                  </thead>
                  <tbody>

                     <tr v-for="col in columns" :key="col.id">
                        <th scope="row">
                           {{col.id}}
                        </th>
                        <td>{{col.name}}</td>
                        <td v-if="col.type == 'select'">Menu desplegable</td>
                        <td v-if="col.type == 'text'">Texto corto</td>
                        <td v-if="col.type == 'textarea'">Texto largo</td>
                        <td v-if="col.type == 'number'">Número</td>
                        <td>{{col.options}}</td>
                        <td class="text-right">
                           <button type="button" @click="showDataEdit(col)" class="btn btn-outline-success btn-sm mx-1">
                              <span class="ti-pencil"></span>
                           </button>
                           <button type="button" @click="deleteColumn(col.id)" class="btn btn-outline-danger btn-sm mx-1">
                              <span class="ti-trash"></span>
                           </button>
                        </td>
                     </tr>
                  </tbody>
            </table>
            </div>
         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
import Tags from '@/components/Tags'
export default {
   name:'cRegConfigForm',
   components:{Tags},
   data(){
      return{
         showAdd:true,
         columns:null,
         event:null, 
         form:{
            name:null,
            options:'',
            type:null,
            required:true,
            business_id:null,
         },
         listOptions:[],
         formOption:[],
      }
   },
   validations:{
      form:{
         name:{required},
         type:{required},
         business_id:{required},
      },
   },
   props:{
      business_id:{
         required:true
      },
      showModal:{
         type:Boolean,
         required:true,
      },
   },
   methods:{
      editColumn(id){
         
         this.form.options = this.form.options.toString()
         this.form.options = JSON.stringify(this.form.options)
         this.form.event_id = this.eventId

         
         if(this.form.type != 'select') this.form.options =  ''
         this.$v.form.$touch()

         if(this.$v.form.$error) {
            
            return}
         axios.put(`bm-register-fields/${id}`, this.form).then(response =>{
            this.$swal('Editado exitosamente')
            this.form.name = null
            this.form.type = null
            this.form.options = ''
            this.$v.form.$reset()
            this.getColumns()
            this.showAdd = true
         }).catch(error=>{
            this.$swal({icon:'error', text:error.response.data.message})
         })
      },
      showDataEdit(col){
         this.showAdd = false
         this.editCol = col.id
         this.form.name = col.name
         this.form.type = col.type
         this.form.business_id = parseInt(this.business_id)
         if(col.type == 'select'){
            this.form.options = JSON.parse(col.options)
         }

      },
      getColumns(){
         axios.get(`bmr-fields-business/${this.business_id}`).then(response=>{
            this.columns = response.data.data
         })
      },
      createColumn(){
         this.form.options = this.form.options.toString()
         this.form.options = JSON.stringify(this.form.options)
         this.form.business_id = parseInt(this.business_id)

         this.$v.form.$touch()
         if(this.$v.form.$error) {
         this.$swal('Faltan datos por ingresar')
         return}

         axios.post('bm-register-fields', this.form).then(response=>{
            this.$swal('Campo agregado al formulario')
            this.form.name = null
            this.form.type = null

            this.$v.$reset()
            this.getColumns()
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      deleteColumn(id){
         this.$swal.fire({
            'title':"Eliminar Campo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
         }).then(rta=>{
            if(rta.isConfirmed)
               axios.delete(`bm-register-fields/${id}`).then(reponse=>{
                  this.getColumns()
                  this.$swal('Campo eliminado del formulario')
               }).catch(error=>{
                  this.$swal({icon:'error', text:error})
               })
         }) 
         
      }
   },
   watch:{
      business_id:function(newVal){
         this.event = newVal
      },
      showModal:function(newVal){
         this.getColumns()
         if(newVal == true) this.$modal.show('register-fields')
         else this.$modal.hide('register-fields')
      },
   }

}
</script>