<template>
   <div>
      <modal name="edit-invitation"
         :width="720"
         :height="880"
         :adaptive="true">
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('edit-invitation')">
                  ❌
               </button>
            </div>
            <div class="row">
               <div class="col-12">
                  <h4 class="mb-3">Editar invitación</h4>
               </div>
            </div>
            <div class="row">
               <div class="col-md-6 mb-3">
                  <label for="firstName">Nombre</label>
                  <input type="text" v-model="formInvitation.name" class="form-control" id="firstName" placeholder="" value="" required="">
                  <div class="hasError" v-if="$v.formInvitation.name.$error">
                     Valid first name is required.
                  </div>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="firstName">email</label>
                  <input type="text" v-model="formInvitation.email" class="form-control" id="firstName" placeholder="" value="" required="">
                  <div class="hasError" v-if="$v.formInvitation.email.$error">
                     Valid first name is required.
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-6 mb-3">
                  <label for="firstName">Cantidad</label>
                  <input type="text" v-model="formInvitation.quantity" class="form-control" id="firstName" placeholder="" value="" required="">
                  <div class="hasError" v-if="$v.formInvitation.quantity.$error">
                     Valid first name is required.
                  </div>
               </div>
               <div class="col-md-6 mb-3">
                  <label for="country">Actividad</label>
                  <multiselect :options="allActivities" v-model="listActivities"  width="100px"  track-by="name"
                  :multiple="true" label="name">
                  </multiselect>
                  <div class="hasError" v-if="$v.formInvitation.activities.$error">
                     Required field.
                  </div>
               </div>
            </div>

         

          <div class="col-md-12 mb-3">
            <button @click.prevent="editInvitation" class="btn btn-outline-primary" type="button">Editar</button>
          </div>

         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
export default {
   name:'editInv',
   components:{multiselect},
   data(){
      return{
         listActivities:[],
         allActivities:[],
         formInvitation:{
            id:null,
            name:null,
            email:null,
            quantity:null,
            activities:[],
         },
      }
   },
   validations:{
      formInvitation:{
         id:{required},
         name:{required},
         email:{required},
         quantity:{required},
         activities:{required},
      },
   },
   props:{
      activities:{
         type:Array,
         required:true
      },
      invitation:{
         type:Object,
         required:true
      },
      showModal:{
         type:Boolean,
         required:true,
      },
   },
   methods:{
      getActivities(){
         this.formInvitation.activities = JSON.parse(this.formInvitation.activities)
         this.formInvitation.activities.map(item =>{
            axios.get(`activities/${item}`).then(response=>{
               this.listActivities.push({id:response.data.id, name:response.data.name})
            })
         })

      },
      editInvitation(){
         this.formInvitation.activities = [];
         this.listActivities.map(item=>{
            this.formInvitation.activities.push(item.id)
         })
         this.formInvitation.activities = JSON.stringify(this.formInvitation.activities)
         this.$v.formInvitation.$touch()
			if(this.$v.formInvitation.$error) return
         axios.put('eventInvitations/'+this.formInvitation.id, this.formInvitation).then(response=>{
            
            this.$modal.hide('edit-invitation')
            this.$swal('Invitación actulizada')
            this.formInvitation.activities = []
            this.$emit("getInvitations")
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
   },
   watch:{
      invitation:function(newVal){
         this.formInvitation = newVal
         this.getActivities()
      },
      activities:function(newVal){
         this.allActivities = newVal
      },
      showModal:function(newVal){
         if(newVal == true) this.$modal.show('edit-invitation')
         else this.$modal.hide('edit-invitation')
      },
   }, 

}
</script>