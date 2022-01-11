<template>
   <div>
      <modal name="edit-poll"
         :width="720"
         :height="800"
         :adaptive="true">
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('edit-poll')">
                  ❌
               </button>
            </div>
            <div class="row">
               <div class="col-12">
                  <h4 class="mb-3">Editar pregunta</h4>
               </div>

               <div class="col-md-12 mb-3">
                  <label for="lastName">Pregunta</label>
                  <textarea name="" class="form-control" v-model="question.description"  id="" cols="30" rows="3"></textarea>
                  <div class="hasError" v-if="$v.question.description.$error">
                  Valid last name is required.
                  </div>
               </div>
               <div class="col-md-12 mb-3">
                  <label for="country">Tipo</label>
                  <select v-model="question.type_question_id" class="custom-select d-block w-100" id="country" required="">
                     <option v-for="mytype in typeQuestions" :key="mytype.id" :value="mytype.id">{{mytype.name}}</option>
                  </select>
                  <div class="hasError" v-if="$v.question.type_question_id.$error">
                     Please select a valid type.
                  </div>
               </div>
               <div class="col-md-12 mb-3 answer" v-if="question.type_question_id == 3">
                  <div class="row answer-wrapper">
                     <div class="col-md-3">
                        <label for="firstName"></label>
                        <input  type="text" v-model="questionOption"
                                 class="form-control"
                                 id="firstName"
                                 placeholder="Ingrese el valor de la repuesta" value="" required="" >
                     </div>
                     <div class="col-md-3">
                           <button @click="addOption(questionOption)" type="button" class="btn btn-info answer-btn">
                           <span class="ti-plus"></span>
                           </button>
                     </div>
                  </div> 

                  <div class="row"  v-for="(option, index) in listOptions" :key="index">
                     <div class="col-md-12">
                        <div class="row">
                           <div class="col-md-3">
                              <label for="firstName"></label>
                              <p class="form-control" >
                                 {{option}}
                              </p>
                           </div>
                           <div class="col-md-3">
                              <button @click="deleteOption(index)" type="button" class="btn btn-outline-primary btn-sm answer-btn">
                                 <span class="ti-trash"></span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-12">
                  <div class="form-check px-4">
                     <input type="checkbox" v-model="question.required_poll" class="form-check-input" id="exampleCheck1">
                     <label class="form-check-label" for="exampleCheck1">Quiero que esta encuesta sea obligatoria</label>
                  </div>
               </div>
               <div class="col-md-12">
                  <div class="form-check px-4">
                     <input type="checkbox" v-model="question.required" class="form-check-input" id="exampleCheck1">
                     <label class="form-check-label" for="exampleCheck1">Pregunta Obligatoria</label>
                  </div>
               </div>
               <div class="col-md-12">
                  <button @click="editQuestion" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       Editar
                  </button>
               </div>
            </div>
         </div>
      </modal>
   </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
export default {
   name:'editPoll',
   data(){
      return{
         question:{
            description:null,
            options:[],
            type_question_id:null,
            required:true,
            required_poll:true,
         },
         listOptions:[],
         questionOption:[],
      }
   },
   validations:{
      question:{
         description:{required},
         type_question_id:{required},
      },
   },
   props:['questionProp','showModal','typeQuestions'],
   methods:{
      editQuestion(){
         this.question.options = JSON.stringify(this.listOptions)
         axios.put('pollQuestions/' + this.question.id, this.question).then(response=>{
            this.$modal.hide('edit-poll')
            this.$swal('Pregunta actualizada')
            this.$emit("getQuestions", this.question.event_id)
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })
      },
      addOption(option = ''){
        if(option !== "")
        this.listOptions.push(option)
        this.questionOption = ""
      },
      deleteOption(index){
        this.listOptions.splice(index,1);
      },
   },
   watch:{
      questionProp:function(newVal){
         this.question = newVal
         if(this.question.options != null){
            this.listOptions = JSON.parse(this.question.options)
         }
      },
      showModal:function(newVal){
         if(newVal == true) this.$modal.show('edit-poll')
         else this.$modal.hide('edit-poll')
      },
      typeQuestions:function(newVal){
         this.typeQuestions = newVal
      },
   } 

}
</script>