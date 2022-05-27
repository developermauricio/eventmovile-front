<template>
<div>
   <div class="row px-3" v-if="eventId != null">
      <div class="col-12">
         <h4 class="mb-3">Crear Invitaciones</h4>         
      </div>
      <div class="col-md-6 mb-3">
         <label for="firstName">Nombre</label>
         <input type="text" v-model="formInvitation.name" class="form-control" id="firstName" placeholder="" value="" required="">
         <div class="hasError" v-if="$v.formInvitation.name.$error">
            Valid first name is required.
         </div>
      </div>
      <div class="col-md-6 mb-3">
         <label for="firstName">Email</label>
         <input type="text"  v-model="formInvitation.email"  class="form-control" id="firstName" placeholder="" value="" required="">
         <div class="hasError" v-if="$v.formInvitation.email.$error">
            Valid first email is required.
         </div>
      </div>
      <div class="col-md-6 mb-3">
            <label for="country">Actividad</label>
            <multiselect :options="activities" v-model="listActivities"  width="100px"  track-by="name"
            :multiple="true" label="name">
            </multiselect>
            <div class="hasError" v-if="$v.formInvitation.activities.$error">
               Required field.
            </div>
      </div>
      <div class="col-md-2 mb-3">
            <label for="country">Cantidad</label>
            <input type="text"  v-model="formInvitation.quantity"  class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formInvitation.quantity.$error">
                Required field.
            </div>
      </div>
      <div class="offset-1 col-3 mb-3">
         <button class="btn btn-primary p-2 w-100 mt-4 mb-0" @click.prevent="createInvitation" type="button">Agregar</button>
         <!-- <div class="custom-file">
            <input type="file" name="pic" @change="onFileChange" class="custom-file-input" id="logoEvent">
            <label class="custom-file-label" id="logoText" for="imageEvento">Cargar invitaciones</label>
         </div> -->
      </div>
   </div>
      <div class="row">
         <div class="col-3 ">
            <jsonExcel class="btn btn-default p-1 w-100 mt-1"  type="xls"  name="plantillaRegistro.xls"  :fetch="fetchData" >Plantilla de registro <span class="ti-download"></span></jsonExcel>
         </div>
         <div class="col-3 mt-1" >   
            <div class="custom-file ">               
               <input @change="getFileExcel" class="custom-file-input"  name="p1" type="file" id="usersExcel" accept=".xls,.xlsx">
               <label class="custom-file-label" id="logoText" for="imageEvento">Seleccionar</label>
            </div>
         </div>
         <!-- Check active envio de correos, new implementation  -->
         <template v-if="showBtnCargar1">
            <div class="col-2 ml-4 pt-3">
                  <label class="form-check-label label-logos">
                     <input v-model="sendEmailRegister" type="checkbox" class="form-check-input">
                     Enviar correo
                  </label>
            </div>
            <div class="col-3">
               <button  class="btn btn-default mt-1" @click.prevent="excelToJson(1)">
                  <div v-if="showLoader1" class="loader"></div>
                  <span v-if="showLoader1 == false">Cargar usuarios</span> 
               </button>
            </div>
         </template>
      </div>

      <div class="row">
         <div class="col-3">
            <jsonExcel class="btn btn-default p-1 w-100 mt-1" type="xls" name="plantillaInvitaciones.xls"  :fetch="fetchData" >Plantilla de invitaciones <span class="ti-download"></span></jsonExcel>
         </div>
         <div class="col-3 mt-1" >   
            <div class="custom-file">
               <input @change="getFileExcel" name="p2" class="custom-file-input"  type="file" id="usersExcel" accept=".xls,.xlsx">
               <label class="custom-file-label" id="logoText" for="imageEvento">Seleccionar</label>
            </div>
         </div>
         <template v-if="showBtnCargar2">
            <!-- Check active envio de correos, new implementation   -->
            <div class="col-2 ml-4 pt-3">
                  <label class="form-check-label label-logos">
                     <input v-model="sendEmailInvitation" type="checkbox" class="form-check-input">
                     Enviar correo
                  </label>
            </div>
            <div class="col-3">
               
               <button class="btn btn-default mt-1" @click.prevent="excelToJson(2)">
                  <div v-if="showLoader2" class="loader"></div>
                  <span v-if="showLoader2 == false">Cargar usuarios</span> 
               </button>
            </div>
         </template>
         <div class="col-12">
            <h5 class="txt-import-status" v-if="totalFields > 0">Se han cargado {{successFields}} de {{totalFields}} registros</h5>
            <p v-if="listErrors.length > 0" style="padding-left: 45%;">Tabla de errores</p>
            <table class="table" v-if="listErrors.length > 0">
               <thead>
                  <tr>
                  <td>Fila</td>
                  <td>Error</td>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="error in listErrors" :key="'error'+error.field">
                     <td>{{error.field}}</td>
                     <td>{{error.error}}</td>
                  </tr>
               </tbody>
            </table>
         </div>
         
      </div>
         <div class="col-md-9 mb-3">
         </div>

         <div class="col-md-12">
            <div class="row">
               <div class="col-5 offset-7">
                  <div class="input-group">
                     <input style="width:70%" v-model="searchText" placeholder="Buscar" @keyup.enter="getInvitations"  type="text" class="form-control" name="searchTable" />
                     <span class="input-group-btn">
                        <button class="btn btn-default m-0" @click.prevent="getInvitations"><span class="ti-search"></span></button>
                     </span>
                  </div>
               </div>
            </div>
            
            <table class="table table-striped">
            <thead>
               <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col" class="text-right">Opciones</th>
               </tr>
            </thead>
            <tbody>

               <tr v-for="inv in invitations" :key="inv.id">
                  <th scope="row">
                     {{inv.id}}
                  </th>
                  <td>{{inv.name}}</td>
                  <td>{{inv.email}}</td>
                  <td>Actividades</td>
                  <td>{{inv.quantity}}</td>
                  <td class="text-right">

                  <button type="button" @click='showModalInv(inv)' class="btn btn-outline-primary btn-sm mx-1">
							<span class="ti-pencil-alt"></span>
						</button>

                  <!-- <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                     <span class="ti-trash"></span>
                  </button> -->
                  </td>
               </tr>
            </tbody>
            </table>
            <sliding-pagination
              :current="currentPage"
              :total="totalPages"
              @page-change="getInvitations"
            ></sliding-pagination>
         </div>
         <editInvitation @getInvitations=getInvitations :invitation="showInvitation.invitation" :activities="activities" :showModal="showInvitation.show"></editInvitation>
         
         
      </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
import editInvitation from "@/components/Modals/editInvitation"
import jsonExcel from "vue-json-excel"
import XLSX from 'xlsx';
import SlidingPagination from 'vue-sliding-pagination'
import getlang from "@/lang/index.js";
export default {
   name:'formInvitations',
   components:{ multiselect, editInvitation, jsonExcel, XLSX, SlidingPagination },
   data(){
      return{
         searchText:null,
         showErrorTable:false,
         successFields:0,
         totalFields:0,
         listErrors:[],
         currentPage:1,
         totalPages:5,
         showBtnCargar1:false,
         showLoader1:false,
         showBtnCargar2:false,
         showLoader2:false,
         jsonData:[],
         jsonFields:[],
         eventId:null,
         listActivities:[],
         activities:[],
         invitations:[],
         formInvitation:{
            event_id:null,
            name:null,
            email:null,
            activities:[],
            quantity:null,
            language:'es',
            youHaveInvitationsToAnEvent:'',
            useInvitation:'',
            messageUrlShared:'',
         },
         showInvitation:{
					show:false,
					invitation:{}
			},
         sendEmailRegister: false,
         sendEmailInvitation: false,
      }
   },
   validations:{
      formInvitation:{
         name:{required},
         email:{required},
         activities:{required},
         quantity:{required},
      },
   },
   props:['id','add'],
   watch:{
      id: function(newVal){
         this.eventId = newVal
      },
      add: function(newVal){
         this.getActivities()
      }
   },
   mounted(){
      this.getLanguage();
      if(this.id){
         this.eventId = this.id
         this.getActivities()
         this.getInvitations()
         //this.getFields()
      }
   },
   methods:{
      getLanguage(){
         this.formInvitation.language = getlang.getLanguage();
         this.$i18n.locale = getlang.getLanguage();
         this.formInvitation.youHaveInvitationsToAnEvent=this.$t('components.formInvitations.youHaveInvitationsToAnEvent');
         this.formInvitation.useInvitation=this.$t('components.formInvitations.useInvitation');;
         this.formInvitation.messageUrlShared=this.$t('components.formInvitations.messageUrlShared');;
      },
      getFileExcel(e){
         this.selectedFile = e.target.files[0];
         if(e.target.name=="p1") this.showBtnCargar1 = true
         if(e.target.name=="p2") this.showBtnCargar2 = true
         this.showErrorTable = true
         this.totalFields = 0
         this.showLoader1 = false
      },
      excelToJson(type){
         this.totalFields = 0
         this.successFields = 0
         this.listErrors = []
         let jsonData 
         let data=[{
            "name":"jayanth",
            "data":"scd",
            "abc":"sdef"
         }]
         XLSX.utils.json_to_sheet(data, 'out.xlsx');
         if(this.selectedFile){
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(this.selectedFile);
            fileReader.onload = (event)=>{
               let data = event.target.result;
               let workbook = XLSX.read(data,{type:"binary"});
               
               workbook.SheetNames.forEach(sheet => {
                  let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                  
                  this.totalFields = rowObject.length
                  rowObject.map(async (item, index)=>{
                     let params = {
                        data: item,
                        event_id: this.eventId,
                        send_email: (type == 1) ? this.sendEmailRegister : this.sendEmailInvitation,
                     }
                     if(type == 1){
                        this.showLoader1 = true
                        await axios.post('importUsers', params).then(response =>{
                           
                           this.successFields++
                           this.getInvitations()
                        }).catch(error=>{
                           if(error.response.status == 422){
                              const errorObj = error.response.data.error
                              const errorKeys = (Object.keys(errorObj))
                              let textError = ''
                              errorKeys.forEach(element => {
                                 textError = errorObj[element][0]
                              });
                              this.listErrors.push({field:index+1, error:textError})
                           }else{
                              this.$swal({icon:'error', text:error})
                           }
                           this.getInvitations()
                        })
                     }else{
                        this.showLoader2 = true
                        await axios.post('importInvitations', params).then(response =>{
                           this.successFields++
                           this.getInvitations()
                        }).catch(error=>{
                           if(error.response.status == 422){
                              const errorObj = error.response.data.error
                              const errorKeys = (Object.keys(errorObj))
                              let textError = ''
                              errorKeys.forEach(element => {
                                 textError = errorObj[element][0]
                              });
                              this.listErrors.push({field:index+1, error:textError})
                           }else{
                              this.$swal({icon:'error', text:error})
                           }
                           this.getInvitations()
                        })                        
                     }
                  })
                 
                 
               });
            }
         }
      },
      
      async fetchData(){
        const response = await axios.get(`fieldsEvent/${this.eventId}`)
        if(response.data.data.length == 0) this.$swal(this.$t('components.formInvitations.templateDoesNotDynamicFields'))
        let array = []
        let obj = {}
        obj['name'] = ''
        array.push(obj)
        obj['lastname'] = ''
        array.push(obj)
        obj['email'] = ''
        array.push(obj)
        response.data.data.map(item=>{
           name = item.name
           obj[name] = ''
           array.push(obj)
        })
        return array
      },
      async fetchDataInv(){
        
        let array = []
        let obj = {}
        obj['name'] = ''
        array.push(obj)
        obj['lastname'] = ''
        array.push(obj)
        obj['email'] = ''
        array.push(obj)
   
        return array
      },
      showModalInv(invitation){
			this.showInvitation.invitation = invitation
         this.showInvitation.show =! this.showInvitation.show
		},
      getActivities(){
         axios.get('activities-event/'+this.eventId+'?pagination=false').then(resp => {
            this.activities = resp.data
         })
      },
      createInvitation(){
         console.log("this.formInvitation.activities:",this.formInvitation.activities);
         console.log("this.listActivities:",this.listActivities);
         this.listActivities.map(item=>{
            this.formInvitation.activities.push(item.id)
         })
         this.formInvitation.activities = JSON.stringify(this.formInvitation.activities)
         this.formInvitation.event_id = this.eventId
         this.$v.formInvitation.$touch()
         if(this.$v.formInvitation.$error) return
         axios.post('eventInvitations', this.formInvitation).then(response=>{
            this.formInvitation.name = null
            this.formInvitation.email = null
            this.formInvitation.activities = []
            this.formInvitation.quantity = null
            this.listActivities = []
            this.quantity = null
            this.getInvitations()
            this.$swal(this.$t('components.formInvitations.invitationCreated'))
            this.$v.formInvitation.$reset()
         }).catch(error=>{
            this.$swal({icon:'error', text:error.response.data.error})
         })
      },
      async getInvitations(selectedPage=1){
         this.currentPage = selectedPage
         let params
         if(this.searchText === null || this.searchText == '' ){
            params = {
               pagination: true,
               per_page: 5,
               page: selectedPage
            }
         }else{
            params = {
               pagination: true,
               per_page: 5,
               page: selectedPage,
               search:this.searchText,
            }
         }
         const  response = await axios.get('invitations/'+this.eventId, {params})
         this.invitations = response.data.data
         this.totalPages = Math.ceil(Number(response.data.pagination.total)/Number(params.per_page))
         if(this.listErrors.length+this.successFields == this.totalFields){
            this.showBtnCargar1 = false
            this.showBtnCargar2 = false
            this.showLoader1=false
            this.showLoader2=false
         }
      }
   }
 
}
</script>
<style>
.txt-import-status{
   color:#9D3D9D;
}
.search-btn{
   background-color: #ce95e8;
   border: none;
   color:#ffffff;
   border-radius: 5px;

}
.search-btn:hover{
   background-color: #9D3D9D;
   border: none;
   color:#ffffff;
   border-radius: 5px;
}
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>