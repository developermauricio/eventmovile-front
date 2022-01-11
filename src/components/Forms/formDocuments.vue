<template>
 <div v-if="showForm==true">
        <!-- Documentos del evento  -->

        <div class="row px-3">
          <div class="col-12">
            <h4 class="mb-3">Adjuntar Material de la Actividad</h4>
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
              <input type="file" @change="fileDocument" class="custom-file-input" id="fileDoc">
              <label class="custom-file-label" id="fileText" for="local">Seleccionar</label><span class="copys">Maximo 5Mb</span>
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
            <button @click.prevent="createDocuments" class="btn btn-outline-primary" type="submit">Agregar</button>
          </div>

           <div class="col-md-12">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Material</th>
                  <th scope="col">Tipo</th>
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="document in allDocuments" :key="document.id">
					<th scope="row">
						{{document.id}}
					</th>
					<td>{{document.name}}</td>
					<td>{{document.type}}</td>
					<td class="text-right">
							<a v-if="document.type == 'local'" target="_blanck" :href="getUrl(document.url)" class="btn btn-outline-primary btn-sm mx-1">
								<span class="ti-download"></span>
							</a>
							<a v-if="document.type == 'url'"   target="_blanck" :href="document.url" class="btn btn-outline-primary btn-sm mx-1">
								<span class="ti-link"></span>
							</a>
							<button type="button" @click='showModalDocument(document)' class="btn btn-outline-primary btn-sm mx-1">
								<span class="ti-pencil-alt"></span>
							</button>
							<button type="button" @click="deleteDocument(document.id)" class="btn btn-outline-danger btn-sm mx-1">
								<span class="ti-trash"></span>
							</button>
					</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>

       <!-- Documentos del evento  -->
							<editDocument @getDocuments=getDocuments :document="showDocument.document" :showModal="showDocument.show"></editDocument>
    </div>
</template>
<script>
	import { required } from "vuelidate/lib/validators"
	import editDocument from "@/components/Modals/editDocument"
	export default {
		name: 'formDocument',
		components: {editDocument},
		data(){
			return{
				idModel:0,
				typeModel:null,
				showDocument:{
					show:false,
					document:{}
				},
				allDocuments:[],
				formDocument:{
					name:null,
					type:null,
					url:'',
					type:'',
				},
			}
		},
		validations: {
			formDocument:{
				name:{required},
				type:{required},
				url:{required},
				type:{required},
			},
		},
		watch:{
			model:function (newVal) {
        this.typeModel= newVal.model
        this.idModel = newVal.id
			},
			showForm:function (newVal) {
				this.showForm= newVal
			},
    },
    mounted(){
      if(this.model){
        this.typeModel= this.model.model
        this.idModel = this.model.id
        this.getDocuments()
      }
    },
		methods:{
			getUrl(url){
            	return `${process.env.VUE_APP_API_URL}storage/${url}`
        	},
			showModalDocument(document){
				this.showDocument.document = document
        this.showDocument.show =! this.showDocument.show
			},
			getDocuments(){

				axios.get('modelDocuements/'+this.typeModel+'/'+this.idModel).then(response=>{
					this.allDocuments = response.data.data
				}).catch(error=>{
					this.$swal({icon:'error', text:error})
				})
			},
			createDocuments(){
        
				this.$v.formDocument.$touch()
        if(this.$v.formDocument.$error) return
        
				let data = new FormData
				data.append('name', this.formDocument.name)
				data.append('type', this.formDocument.type)
				data.append('url', this.formDocument.url)
				data.append('model_type', this.typeModel)
				data.append('model_id', this.idModel)

				axios.post('documents', data).then(response =>{
     this.getDocuments()
     this.$swal('Archivo adjuntado')
     this.formDocument.name = null
     this.formDocument.type = null
     this.formDocument.url = null
     this.$v.formDocument.$reset()
				}).catch(error=>{
					this.$swal({icon:'error', text:error})
				})
			},
			deleteDocument(id){
				axios.delete(`documents/${id}`).then(response =>{
					this.getDocuments()
					this.$swal('Documento eliminado')
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
				let label = document.getElementById('fileText');
				label.innerText = files[0].name
			},
		},
		props:{
			showForm:{
				type:Boolean,
				required:true
			},
			model:{
        type:Object,
        required:true,
      },
		},
	}
</script>