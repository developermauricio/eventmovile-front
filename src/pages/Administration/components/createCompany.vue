<template>
   <div>
      <modal name="companyModal"
         :clickToClose="true"
         :width="720"
         height="auto"
         :scrollable="true">
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('companyModal')">
                  ❌
               </button>
            </div>
            <div class="row">
               <div class="col-12">
                  <h4 class="mb-3">Crear empresa</h4>
               </div>
             </div>
            <div class="row">
               <div class="col-md-6 mb-3">
                  <label for="country">Nombre *</label>
                  <fg-input type="text"  placeholder="Nombre" v-model=company.name></fg-input>
                  <div class="hasError" v-if="$v.company.name.$error">
                     Please select a valid name.
                  </div>
               </div>

               <div class="col-md-12 mb-3">
                  <label for="firstName">Descripción *</label>
                  <fg-input type="text"  placeholder="Descripción" v-model=company.sort_description></fg-input>
                  <div class="hasError" v-if="$v.company.sort_description.$error">
                     Please select a valid descripción.
                  </div>
               </div>

               <div class="col-md-6 mb-3">
                  <label for="firstName">Email *</label>
                  <fg-input type="email"  placeholder="Email" v-model=company.email></fg-input>
                  <div class="hasError" v-if="$v.company.email.$error">
                     Please select a valid email.
                  </div>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="firstName">Telefono *</label>
                  <fg-input type="text"  placeholder="Telefono" v-model=company.phone></fg-input>
                  <div class="hasError" v-if="$v.company.phone.$error">
                     Please select a valid phone.
                  </div>
               </div>

               <div class="col-md-6 mb-3">
                  <label for="firstName">Dirección *</label>
                  <fg-input type="text"  placeholder="Dirección" v-model=company.address></fg-input>
                  <div class="hasError" v-if="$v.company.address.$error">
                     Please select a valid address.
                  </div>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="firstName">Localización geográfica</label>
                  <fg-input type="text" placeholder="Localización geográfica" v-model=company.location_coordinates></fg-input>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="firstName">Imagen</label>
                  <div class="custom-file">
                     <input type="file" @change="fileDocument" class="custom-file-input" id="pic">
                     <label class="custom-file-label" id="file-text" for="pic">{{company.pic}}</label>
                  </div>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="validationDefault04">Seleccionar departamento</label>
                  <multiselect :options="deparments" v-model="deparmentSelected"  width="100px"  track-by="name"
                  :multiple="false" @select="getCities" label="name">
                  </multiselect>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="validationDefault04">Seleccionar ciudad</label>
                  <multiselect :options="cities" v-model="company.city_id"  width="100px"  track-by="name"
                  :multiple="false" label="name">
                  </multiselect>
               </div>

               <div class="col-md-16 offset-md-3">
                  <button @click.prevent="createCompany" class="btn btn-outline-primary" type="button">Crear empresa</button>
               </div>
            </div>
         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
export default {
   name:'createCompany',
   components: {multiselect},
   data(){
      return{
         cities:[],
         deparments:[],
         deparmentSelected:[],
         company:{
            name:null,
            sort_description:null,
            email:null,
            phone:null,
            pic:null,
            address:null,
            location_coordinates:null,
            city_id:null,
            
         },
      }
   },
   validations:{
      company:{
         name:{required},
         sort_description:{required},
         email:{required},
         phone:{required},
         address:{required},
         city_id:{required},
      },
   },
   props:{
      showModal:{
         type:Boolean,
         required:true,
      },
   },
   methods:{
      async getCities(deparment){
        const response = await axios.get(`citys-by-deparment/${deparment.id}`)
        this.cities = response.data
      },
      async getDepartments(){
        const response = await axios.get('deparments')
        this.deparments = response.data
      },   
      createCompany(){
         this.company.event_id = this.event
         this.$v.company.$touch()
			if(this.$v.company.$error) return

         let dataDocument = new FormData
         dataDocument.append('name', this.company.name)
         dataDocument.append('sort_description', this.company.sort_description)
         dataDocument.append('phone', this.company.phone)
         dataDocument.append('email', this.company.email)
         dataDocument.append('address', this.company.address)
         dataDocument.append('pic', this.company.pic)

         axios.post('company', dataDocument).then(response=>{
            this.$modal.hide('companyModal')
            this.$emit("getCompanies")
            this.$swal('Empresa creada correctamente')
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      editDocument(){
         this.$v.company.$touch()
			if(this.$v.company.$error) return

         let dataDocument = new FormData
         dataDocument.append('name', this.company.name)
         dataDocument.append('type', this.company.type)
         dataDocument.append('url', this.company.url)
         dataDocument.append('_method', 'PUT')

         axios.post('documents/'+this.company.id, dataDocument).then(response=>{
            this.$modal.hide('companyModal')
            this.$swal('Documento actualizado')
            this.$emit("getDocuments")
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      fileDocument(e){
			let files = e.target.files || e.dataTransfer.files
         this.company.pic=files[0]
         let label = document.getElementById('file-text');
         label.innerText = files[0].name
         
      },
      
   },
   watch:{
      showModal:function(newVal){
         if(newVal == true) {
            this.$modal.show('companyModal')
            this.getDepartments()
         }
         else this.$modal.hide('companyModal')
      },
   }, 

}
</script>