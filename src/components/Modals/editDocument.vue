<template>
   <div>
      <modal name="edit-document"
         :width="720"
         :height="880"
         :adaptive="true">
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('edit-document')">
                  ❌
               </button>
            </div>
            <div class="row">
               <div class="col-12">
                  <h4 class="mb-3">Editar documento</h4>
               </div>
             </div>
             <div class="col-md-6 mb-3">
            <label for="firstName">Nombre del documento</label>
            <input type="text" v-model="formDocument.name" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formDocument.name.$error">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="country">Tipo</label>
              <select v-model="formDocument.type" class="custom-select d-block w-100" id="country" required="">
                <option value="">Seleccionar...</option>
                <option value="local">Documento local</option>
                <option value="url">Desde Url</option>
              </select>
              <div class="hasError" v-if="$v.formDocument.type.$error">
                Please select a valid type.
              </div>
          </div>

          <div class="col-md-6 mb-3"  v-if="formDocument.type == 'local'">
            <label for="firstName">Local</label>
            <div class="custom-file">
              <input type="file" @change="fileDocument" class="custom-file-input" id="local">
              <label class="custom-file-label" id="file-text" for="local">{{formDocument.url}}</label>
            </div>
            <div class="hasError" v-if="$v.formDocument.url.$error">
              Valid first url or file is required.
            </div>
          </div>
          <div class="col-md-6 mb-3" v-if="formDocument.type == 'url'">
            <label for="firstName">Url</label>
            <input type="text" class="form-control" v-model="formDocument.url" id="firstName" placeholder="Ingrese la url del material a compartir" value="" required="">
            <div class="hasError" v-if="$v.formDocument.url.$error">
              Valid first url or file is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <button @click="editDocument" class="btn btn-outline-primary" type="submit">Editar</button>
          </div>

         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
export default {
   name:'editDoc',
   data(){
      return{
        formDocument:{
            name:null,
            type:null,
            url:null,
            type:null,
         },
      }
   },
   validations:{
      formDocument:{
         name:{required},
         type:{required},
         url:{required},
      },
   },
   props:{
      document:{
         type:Object,
         required:true
      },
      showModal:{
         type:Boolean,
         required:true,
      },
   },
   methods:{
      editDocument(){
         this.$v.formDocument.$touch()
			if(this.$v.formDocument.$error) return

         let dataDocument = new FormData
         dataDocument.append('name', this.formDocument.name)
         dataDocument.append('type', this.formDocument.type)
         dataDocument.append('url', this.formDocument.url)
         dataDocument.append('_method', 'PUT')

         axios.post('documents/'+this.formDocument.id, dataDocument).then(response=>{
            
            this.$modal.hide('edit-document')
            this.$swal('Documento actulizado')
            this.$emit("getDocuments")
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      fileDocument(e){
			let files = e.target.files || e.dataTransfer.files
         if(files[0].size/1024/1024 > parseInt(process.env.VUE_APP_FILE_SIZE))
					this.$swal({icon:'error', text:`Archivos menores a ${process.env.VUE_APP_FILE_SIZE}MB`})
				else
			this.formDocument.url=files[0]
         let label = document.getElementById('file-text');
         label.innerText = files[0].name
         
	   },
   },
   watch:{
      document:function(newVal){
         this.formDocument = newVal
      },
      showModal:function(newVal){
         if(newVal == true) this.$modal.show('edit-document')
         else this.$modal.hide('edit-document')
      },
   }, 

}
</script>