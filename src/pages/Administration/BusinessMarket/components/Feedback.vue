<template>
     <div class="row px-3">
        <div class="col-md-8 mb-3">
            <label for="lastName">Pregunta</label>
            <input name="" class="form-control" v-model="form.question"  id="" cols="30" rows="3" />
            <div class="hasError" v-if="$v.form.question.$error">
                La pregunta es requerida
            </div>
        </div>


        <div class="col-md-4 mb-3">

          <div class="col-md-12 mb-3">
            <label for="country">Tipo</label>
            <select v-model="form.type" class="form-control d-block w-100" required="">
              <option value="starts">Calificacion</option>
              <option value="multiple">Opcion multiple</option>
            </select>
            <div class="hasError" v-if="$v.form.type.$error">
              Por favor seleccione un tipo.
            </div>
          </div>

        </div>

        <div class="col-md-12 mb-3 answer" v-if="form.type == 'multiple'">
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

          <div class="row answer-list" v-for="(option, index) in listOptions" :key="index">
            <div class="col-md-12">

              <div class="row">

                <div class="col-md-3 py-0">
                  <label for="firstName"></label>
                  <p class="form-control" >
                    {{option}}
                  </p>
                </div>
                <div class="col-md-3 py-0">
                    <button @click="deleteOption(index)" type="button" class="btn btn-outline-primary btn-sm answer-btn">
                      <span class="ti-trash"></span>
                    </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div class="col-3 offset-9 mb-3">
          <button type="button" class="btn btn-primary mt-0 mb-0 ml-0 w-100" @click.prevent="accionButtonFunction()" >{{accionButton}}</button>
        </div>

       

          <div class="col-md-12" >

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Pregunta</th>
                  <th scope="col">Tipo</th>
                  
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="question in questions" :key="question.id">
                  <th scope="row">
                      {{question.id}}
                  </th>
                  <td>{{question.question}}</td>
                  <td>{{question.type}}</td>
                  
                  <td class="text-right">
                    <button @click="updateQuestionBefore(question)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>                    

                    <button @click="deleteQuestion(question.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          
          <answersReport v-if="questions.length > 0" :business_id="business_id" :questions="questions" />
           
        </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"
import answersReport from "./AnswersFeedback"
export default {
    props:['business_id'],
    components:{
      answersReport
    },
    watch: {
      business_id:function(newVal){
        this.getQuestions()
      }
    },
    data() {
        return {
            accionButton:"Agregar",
            questions:[],
            listOptions:[],
            questionOption:[],
            form:{
                business_id:null,
                question:null,
                type:null,
                options:""
            }
        }
    },
    validations:{
        form:{
            question:{required},
            type:{required}
            }
    },
    
    mounted() {
      this.getQuestions()
    },
    methods: {
      accionButtonFunction(){
            if(this.accionButton === "Agregar")
                this.newQuestion()
            else
                this.updateQuestion()
        },
      updateQuestionBefore(question){
        this.form = question
        this.accionButton = "Actualizar"
        if(question.options !== "[]")
          {
            this.listOptions = JSON.parse(question.options)
          }    
      },
      updateQuestion(){
            this.$v.form.$touch()
            if(this.$v.form.$error) return

            const tmp = this.listOptions.map(item=>{
                return item.trim()
              })
            this.listOptions = tmp
            
            this.form.options = JSON.stringify(this.listOptions)
            axios.put('feedback-question/'+this.form.id, this.form).then(response =>{
                this.$swal('Pregunta actualizada')
                this.form.question = null
                this.form.type = null
                this.options = ""
                this.listOptions = []
                this.accionButton = "Agregar"
                this.$v.$reset()
                this.getQuestions()
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
        newQuestion(){
        this.form.business_id = this.business_id
        this.$v.form.$touch()
        if(this.$v.form.$error) return

        this.form.options = JSON.stringify(this.listOptions)
        axios.post('feedback-question', this.form).then(response =>{
          this.$swal('Pregunta creada')
          this.form.question = null
          this.form.type = null
          this.options = ""
          this.listOptions = []
          this.$v.$reset()
          this.getQuestions()
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
        },
        getQuestions(){
            axios.get('feedback-question/'+this.business_id).then(response =>{
              this.questions = response.data.questions !== undefined ? response.data.questions : []
            }).catch(error=>{
            this.$swal({icon:'error', text:error})
            })
        },
        deleteQuestion(id){
         this.$swal.fire({
            'title':"Eliminar Pregunta?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
         }).then(rta=>{
            if(rta.isConfirmed)
               axios.delete(`feedback-question/${id}`).then(reponse=>{
                  this.getQuestions()
                  this.$swal('Pregunta eliminada')
               }).catch(error=>{
                  this.$swal({icon:'error', text:error})
               })
         }) 
         
      }
    },
}
</script>