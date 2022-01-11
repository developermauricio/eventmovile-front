<template>
   <div>
      <modal name="habeasDataModal"
         :clickToClose="true"
         :width="720"
         :height="500"
         :adaptive="true">
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('habeasDataModal')">
                  ❌
               </button>
            </div>
            <div class="row">
               <div class="col-12">
                  <h4 class="mb-3">Cargar política de privacidad</h4>
               </div>
             </div>
             
          <div class="col-md-12 mb-3">
            <label for="country">Tipo</label>
              <select v-model="formHd.type" class="custom-select d-block w-100" id="country" required="">
                <option value="">Seleccionar...</option>
                <option value="file">Archivo</option>
                <option value="text">Texto</option>
                <option value="url">Url</option>
              </select>
              <div class="hasError" v-if="$v.formHd.type.$error">
                Please select a valid type.
              </div>
          </div>

          <div class="col-md-12 mb-3"  v-if="formHd.type == 'file'">
            <label for="firstName">Local</label>
            <div class="custom-file">
              <input type="file" @change="fileDocument" class="custom-file-input" id="local">
              <label class="custom-file-label" id="file-text" for="local">{{formHd.content}}</label>
            </div>
            <div class="hasError" v-if="$v.formHd.content.$error">
              Valid first text or file is required.
            </div>
          </div>
          <div class="col-md-12 mb-3" v-if="formHd.type == 'text' ">
            <label for="firstName">Ingrese el texto</label>
            <textarea type="text" class="form-control" v-model="formHd.content" id="firstName" placeholder="Ingrese el texto de la política de privacidad aquí" value="" required=""></textarea>
            <div class="hasError" v-if="$v.formHd.content.$error">
              Valid first text or file is required.
            </div>
          </div>
          <div class="col-md-12 mb-3" v-if="formHd.type == 'url' ">
            <label for="firstName">Ingrese la url</label>
            <input type="text" class="form-control" v-model="formHd.content" id="firstName" placeholder="Ingrese la url de la política de privacidad aquí" value="" required="" />
            <div class="hasError" v-if="$v.formHd.content.$error">
              Valid first url or file is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="country">Posición en el formulario</label>
              <select v-model="formHd.position" class="custom-select d-block w-100" id="country" required="">
                <option value="">Seleccionar...</option>
                <option value="up">Al inicio</option>
                <option value="down">Al final</option>
              </select>
              <div class="hasError" v-if="$v.formHd.position.$error">
                Please select a valid position.
              </div>
          </div>

          <div class="col-md-12 mb-3">
            <button @click.prevent="createHabeasData" class="btn btn-outline-primary" type="button">Cargar política</button>
          </div>

         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
export default {
   name:'habeasData',
   data(){
      return{
        formHd:{
            position:null,
            type:null,
            content:null,
            event_id:null,
         },
      }
   },
   validations:{
      formHd:{
         position:{required},
         event_id:{required},
         type:{required},
         content:{required},
      },
   },
   props:['event','showModal'],
   methods:{
      createHabeasData(){
         this.formHd.event_id = this.event
         this.$v.formHd.$touch()
			if(this.$v.formHd.$error) return

         let dataDocument = new FormData
         dataDocument.append('content', this.formHd.content)
         dataDocument.append('type', this.formHd.type)
         dataDocument.append('position', this.formHd.position)
         dataDocument.append('event_id', this.formHd.event_id)

         axios.post('habeasData', dataDocument).then(response=>{
            
            this.$modal.hide('habeasDataModal')
            this.$swal('Carga exitosa')
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      editDocument(){
         this.$v.formHd.$touch()
			if(this.$v.formHd.$error) return

         let dataDocument = new FormData
         dataDocument.append('name', this.formHd.name)
         dataDocument.append('type', this.formHd.type)
         dataDocument.append('url', this.formHd.url)
         dataDocument.append('_method', 'PUT')

         axios.post('documents/'+this.formHd.id, dataDocument).then(response=>{
            this.$modal.hide('habeasDataModal')
            this.$swal('Documento actualizado')
            this.$emit("getDocuments")
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      fileDocument(e){
			let files = e.target.files || e.dataTransfer.files
         this.formHd.content=files[0]
         
         let label = document.getElementById('file-text');
         label.innerText = files[0].name
         
      },
      getHabeasData(){
         axios.get(`habeasData/${this.formHd.event_id}`).then(response=>{
            if(response.data){
               this.formHd.type = response.data.type
               this.formHd.position = response.data.position
               this.formHd.content = response.data.content
               let label = document.getElementById('file-text');
               label.innerText = response.data.content
            }
         })
      }
   },
   watch:{
      event:function(newVal){
         this.formHd.event_id = newVal
      },
      showModal:function(newVal){
         if(newVal == true) {
            this.$modal.show('habeasDataModal')
            this.formHd.event_id = this.event
            this.getHabeasData()
         }
         else this.$modal.hide('habeasDataModal')
      },
   }, 

}
</script>