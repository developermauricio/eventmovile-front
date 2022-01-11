<template>
   <div>
      <modal name="habeasDataModal"
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
                  <h4 class="mb-3 ml-3">Cargar política de privacidad</h4>

               </div>
             </div>
             
          <!--<div class="col-md-12 mb-3">
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
          </div>-->

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
          <div class="col-md-12 mb-3" v-if="formHd.type === 'text' ">
            <label for="firstName">Ingrese el texto</label>
            <textarea type="text" class="form-control" v-model="formHd.content" id="firstName" placeholder="Ingrese el texto de la política de privacidad aquí" value="" required="" rows="7"></textarea>
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

          <!--<div class="col-md-12 mb-3">
            <label for="country">Posición en el formulario</label>
              <select v-model="formHd.position" class="custom-select d-block w-100" id="country" required="">
                <option value="">Seleccionar...</option>
                <option value="up">Al inicio</option>
                <option value="down">Al final</option>
              </select>
              <div class="hasError" v-if="$v.formHd.position.$error">
                Please select a valid position.
              </div>
          </div>-->

          <div class="col-md-12 mb-3">
            <button @click.prevent="createHabeasData" class="btn btn-outline-primary" type="button">Cargar política</button>
            <br><small>* Se sobreescribe la anterior politica y configuracion</small>
          </div>

         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
export default {
   name:'BMhabeasData',
   data(){
      return{
        formHd:{
            position:"down",
            type:"text",
            content:null,
            business_id:null,
         },
      }
   },
   validations:{
      formHd:{
         position:{required},
         business_id:{required},
         type:{required},
         content:{required},
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
      createHabeasData(){
         console.log(this.event)
         this.formHd.event_id = this.event
         this.$v.formHd.$touch()
			if(this.$v.formHd.$error) return

         let dataDocument = new FormData
         dataDocument.append('content', this.formHd.content)
         dataDocument.append('type', this.formHd.type)
         dataDocument.append('position', this.formHd.position)
         dataDocument.append('business_id', this.formHd.business_id)

         axios.post('bm-habeas', dataDocument).then(response=>{
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
            this.$swal('Documento actulizado')
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
            let label = document.getElementById('file-text');
            
            axios.get(`bm-habeas/${this.formHd.business_id}`).then(response=>{
                if(response.data.length > 0){
                this.formHd.type = response.data.type
                this.formHd.position = response.data.position
                this.formHd.content = response.data.content
                if(label)
                    label.innerText = response.data.content
                }
            })
      }
   },
   watch:{
      business_id:function(newVal){
         this.formHd.business_id = newVal
      },
      showModal:function(newVal){
         if(newVal == true) {
            this.$modal.show('habeasDataModal')
            this.formHd.business_id = this.business_id
            this.getHabeasData()
         }
         else this.$modal.hide('habeasDataModal')
      },
   }, 

}
</script>