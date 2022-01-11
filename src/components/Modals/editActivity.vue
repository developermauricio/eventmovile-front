<template>
   <div>
      <modal name="edit-document"
         :width="720"
         :height="880"
         :adaptive="true">
         <div id="step02" v-if="steps.step2">
         <div class="row px-3">
            <div class="col-12">
               <h4 class="mb-3">Editar actividad</h4>
            </div>
            <div class="col-md-6 mb-3">
               <label for="firstName">Nombre</label>
               <input type="text" v-model="formActivity.name" class="form-control" id="firstName" placeholder="" value="" required="">
               <div class="hasError" v-if="$v.formActivity.name.$error">
               Valid first name is required.
               </div>
            </div>

            <div class="col-md-3 mb-3">
               <label for="country">Modalidad</label>
               <select v-model="formActivity.mode_id" class="custom-select d-block w-100" id="country" required="">
               <option v-for="mode in modes" :key="mode.id" :value="mode.id">{{mode.name}}</option>
               </select>
               <div class="hasError" v-if="$v.formActivity.mode_id.$error">
               Please select a valid mode.
               </div>
            </div>

            <div class="col-md-3 mb-3">
               <label for="country">Tipo de actividad</label>
               <select v-model="formActivity.type_activity_id" class="custom-select d-block w-100" id="country" required="">
               <option v-for="type in typesActivity" :key="type.id" :value="type.id">{{type.name}}</option>
               </select>
               <div class="hasError" v-if="$v.formActivity.type_activity_id.$error">
               Please select a valid type.
               </div>
            </div>

            <div class="col-md-6 mb-3">
               <label for="firstName">Fecha de la actividad</label>
               <input type="date" v-model="formActivity.start_date" class="form-control" id="firstName" placeholder="" value="" required="">
               <div class="hasError" v-if="$v.formActivity.start_date.$error">
               Valid first name is required.
               </div>
            </div>

            <div class="col-md-3 mb-3">
               <label for="firstName">Hora Inicio</label>
               <input type="time" v-model="formActivity.start_hour" class="form-control" id="firstName" placeholder="" value="" required="">
               <div class="hasError" v-if="$v.formActivity.start_hour.$error">
               Valid first name is required.
               </div>
            </div>
            <div class="col-md-3 mb-3">
               <label for="firstName">Hora Fin</label>
               <input type="time" v-model="formActivity.end_hour" class="form-control" id="firstName" placeholder="" value="" required="">
               <div class="hasError" v-if="$v.formActivity.end_hour.$error">
               Valid first name is required.
               </div>
            </div>

            <!-- <div class="col-md-1 mb-3"></div> -->
            
               <div class="col-md-3 mb-3" v-if="formActivity.type_activity_id == 2">
                  <label for="firstName">Valor de la actividad</label>
                  <input type="text" v-model="formActivity.unit_price" class="form-control" id="firstName" placeholder="" value="" required="">
                  <div class="hasError" v-if="$v.formActivity.unit_price.$error && formActivity.type_activity_id == 2">
                     Valid first name is required.
                  </div>
               </div>

               <div class="col-md-3 mb-3" >
                  <label for="firstName">Limite de asistentes</label>
                  <input type="text" v-model="formActivity.guests_limit" class="form-control" id="firstName" placeholder="" value="" required="">
               </div>
            
            


            <div class="col-md-3 mb-3">
               <label for="firstName">Banner de la actividad</label>
               <div class="custom-file">
               <input type="file" name="banner" @change="picActivity" class="custom-file-input" id="imageActividad">
               <label class="custom-file-label" for="imageActividad">Seleccionar</label>
               </div>
               <div class="hasError" v-if="$v.formActivity.pic.$error">
               Valid first name is required.
               </div>
            </div>

            <div class="col-md-3 mb-3">
               <label for="firstName">Fondo de la actividad</label>
               <div class="custom-file">
               <input type="file" name="background" @change="picActivity" class="custom-file-input" id="imageEvento">
               <label class="custom-file-label" for="imageEvento">Seleccionar</label>
               </div>
               <div class="hasError" v-if="$v.formActivity.pic_banner.$error">
               Valid first name is required.
               </div>
            </div>

            <div class="col-md-12 mb-3">
               <label for="lastName">Descripción</label>
               <textarea name="" v-model="formActivity.sort_description" class="form-control"  id="" cols="30" rows="3"></textarea>
               <div class="hasError" v-if="$v.formActivity.sort_description.$error">
               Valid last name is required.
               </div>
            </div>

            <div class="col-md-12 mb-3">
               <label for="lastName">Código del streaming</label>
               <textarea name="" v-model="formActivity.code_streaming" class="form-control"  id="" cols="30" rows="2"></textarea>
               <div class="hasError" v-if="$v.formActivity.code_streaming.$error">
               Valid last name is required.
               </div>
            </div>

         </div>

         <!-- Actividades  -->


      </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
export default {
   name:'editActivity',
   data(){

   },
   
}
</script>