<template>
    <div id="step05">

              <!-- Encuestas  -->

        <div class="row px-3">
          <div class="col-12">
            <h4 class="mb-3">Administrar sondeos</h4>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-4" v-for="item in probes" :key="item.id">
                <div class="card border-dark" >
                  <div class="card-header">{{item.name}}</div>
                  <div class="card-body">
                    <!--<h5 class="card-title">{{item.name}}</h5>-->
                    <!--<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>-->
                    
                    <a class="card-link" @click="beforeGetQuestions(item)">Editar</a>
                    <a class="card-link" @click="launchProbe(item,'launched')" v-if="item.status === 'ready'">Lanzar</a>
                    <a class="card-link" @click="launchProbe(item,'ready')" v-if="item.status === 'launched'">Desactivar</a>
                    <a class="card-link" @click="deleteProbe(item.id)">Eliminar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mb-3" id="formAction">
            <label for="firstName">Titulo</label>
            <input type="text" class="form-control border-input" v-model="form_init_probe.name" id="firstName" placeholder="" value="" required="">
            <!--<div class="hasError" v-if="$v.formEvent.name.$error">
              Valid first name is required.
            </div>-->
          </div>
          <div class="col-12">
            <div class="form-check">
                <input type="checkbox" v-model="form_init_probe.required_probe" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Quiero que este sondeo sea obligatorio</label>
              </div>
          </div>

          <div class="col-2">
            <button class="btn btn-outline-primary" @click.prevent="accionButtonProbe()" >{{form_init_probe.accionButton}}</button>
          </div>
          <div class="col-5">
            <button class="btn btn-outline-primary" @click.prevent="resetProbe()" v-if="form_init_probe.name !== ''" >Reset</button>
          </div>
        <template v-if="form_init_probe.id !== undefined">  
          <div class="col-md-8 mb-3">
            <label for="lastName">Pregunta</label>
            <textarea name="" class="form-control" v-model.trim="form_init.description"  id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.form_init.description.$error">
              Pregunta es requerida.
            </div>
          </div>


          <div class="col-md-4 mb-3">

            <div class="col-md-12 mb-3">
              <label for="country">Tipo</label>
              <select v-model="form_init.type_question_id" class="custom-select d-block w-100" id="country" required="">
                <option v-for="type in typeQuestions" :key="type.id" :value="type.id">{{type.name}}</option>
              </select>
              <div class="hasError" v-if="$v.form_init.type_question_id.$error">
                Seleccione un tipo.
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-check px-4">

                <input type="checkbox" v-model="form_init.required" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Pregunta Obligatoria</label>

              </div>
          </div>

          </div>

          <div class="col-md-12 mb-3 answer" v-if="form_init.type_question_id == 3">
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

          <div class="col-md-3 mb-3">
            <button class="btn btn-outline-primary" @click.prevent="accionButton()" >Agregar</button>
          </div>

          <div class="col-md-9 mb-3">
          </div>

          <div class="col-md-12">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Pregunta</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Obligatoria</th>
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="question in questions" :key="question.id">
                  <th scope="row">
                      {{question.id}}
                  </th>
                  <td>{{question.description}}</td>
                  <td>{{question.type_question}}</td>
                  <td v-if="!question.required">No</td>
                  <td v-if="question.required">Si</td>
                  <td class="text-right">

                    <button @click="updateQuestionBefore(question)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button @click="deleteQuestion(question.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <!--<button @click="updatePositionPoll(question.position, question.event_id)" type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>-->

                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </template>
        </div>

       <!-- Encuestas  -->

    </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators"
export default {
    name:"probe",
    props:['activity_id'],
    data() {
        return {
            form_init_probe:{
              name:"",
              activity_id:"",
              required_probe:false,
              status:'ready',
              accionButton:"Crear"
            },
            form_init:{
              probe_id:"",
              description:null,
              options:[],
              type_question_id:null,
              required:true,
            },
            probes:[],
            questions:[],
            questionOption:'',
            listOptions:[],
            typeQuestions:[],
            mqttConection:null
        }
    },
    validations: {
        form_init:{
            probe_id:{required},
            description:{required},
            type_question_id:{required},
        },
    },
    created() {
       
        this.form_init_probe.activity_id = this.activity_id     
        this.getTypeQuestions()      
        this.getProbes(this.activity_id)
        this.getActivity(this.activity_id)
    },
    destroyed(){
      this.unsubscriptionMqtt()
    },
    methods: {
        resetProbe(){
          this.form_init_probe = {
              activity_id: this.form_init_probe.activity_id,
              name:"",
              required_probe:false,
              accionButton:"Crear"
            }
          this.form_init.description = null
          this.form_init.type_activity_id = null
          this.listOptions = []
          this.questions = []
          this.form_init.type_question_id = null
          if(this.form_init.id) delete this.form_init.id
        },
        accionButtonProbe(action = 'default'){
         
          if(this.form_init_probe.id)
              this.updateProbe()
          else
            this.createProbe()
          const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activity_id+'/probes';
          this.mqttConection.publish(topic, JSON.stringify({update:true}))
        },
        accionButton(){
            if(this.form_init.id)
                this.updateQuestion()
            else
                this.createQuestion()
        },
        createProbe(){
          axios.post(`probe`,this.form_init_probe).then(response =>{
                this.$swal('Sondeo creado')
                this.form_init_probe = response.data.data
                this.form_init.probe_id = response.data.data.id
                this.form_init_probe.accionButton = " Actualizar"
                this.getProbes(this.activity_id)
          }).catch(error=>{
            this.$swal({icon:'error', text:"Error creando sondeo"})
          })
        },
        updateProbe(action = 'default'){
          if(this.form_init_probe.status === "")
            this.form_init_probe.status = 'ready'

          let toSend = this.form_init_probe
      
          axios.put('probe/'+this.form_init_probe.id, toSend).then(response =>{
              this.$swal('Sondeo actualizado')
              this.getProbes(this.activity_id)
          }).catch(error=>{
          this.$swal({icon:'error', text:error})
          })
        },
        updateQuestionBefore(question){
            this.form_init = question
            if(question.options !== "[]")
                {
                    this.listOptions = JSON.parse(question.options)
                }    
        },
        getTypeQuestions(){
            axios.get('typeQuestions').then(response => {
            this.typeQuestions = response.data.data
            })
        },
        deleteProbe(id){
          this.$swal.fire({
                'title':"Eliminar sondeo?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then(rta=>{
                if(rta.isConfirmed)
                    axios.delete(`probe/${id}`).then(response =>{
                      const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activity_id+'/probes';
                      this.mqttConection.publish(topic, JSON.stringify({update:true}))
                      this.getProbes(this.activity_id )
                      this.$swal('Sondeo eliminado')
                    }).catch(error=>{
                      this.$swal({icon:'error', text:error})
                    })
            })   
          
        },
        deleteQuestion(id){
          axios.delete(`probe-questions/${id}`).then(response =>{
            this.getQuestionProbes(this.form_init.probe_id)
            this.$swal('Pregunta eliminada')
          }).catch(error=>{
            this.$swal({icon:'error', text:error})
          })
        },
        updateQuestion(){
            this.$v.form_init.$touch()
            if(this.$v.form_init.$error) return

            const tmp = this.listOptions.map(item=>{
                return item.trim()
              })
            this.listOptions = tmp
            
            this.form_init.options = JSON.stringify(this.listOptions)
            axios.put('probe-questions/'+this.form_init.id, this.form_init).then(response =>{
                this.$swal('Pregunta actualizada')
                this.form_init.description = null
                this.form_init.type_activity_id = null
                this.form_init.type_question_id = null
                this.listOptions = []
                delete this.form_init.id
                this.getQuestionProbes(this.form_init_probe.id)
                this.$v.form_init.$reset()
            }).catch(error=>{
            this.$swal({icon:'error', text:error})
            })
        },
        createQuestion(){
            this.$v.form_init.$touch()
            if(this.$v.form_init.$error) return

            
              const tmp = this.listOptions.map(item=>{
                return item.trim()
              })
              this.listOptions = tmp
            
            this.form_init.options = JSON.stringify(this.listOptions)
            axios.post('probe-questions', this.form_init).then(response =>{
                this.$swal('Pregunta creada')
                this.form_init.description = null
                this.form_init.type_activity_id = null
                this.form_init.type_question_id = null
                this.listOptions = []
                this.getQuestionProbes(this.form_init.probe_id)
                this.$v.form_init.$reset()
            }).catch(error=>{
            this.$swal({icon:'error', text:error})
            })
        },
        deleteOption(index){
            this.listOptions.splice(index,1);
        },
        addOption(option = ''){
            if(option !== "")
            this.listOptions.push(option)
            this.questionOption = ""
        },
        getProbes(id){
          axios.get(`probe-questions-activity/${id}`).then(res=>{
              this.probes = res.data.data
          })
        },
        beforeGetQuestions(item){
          this.form_init_probe = item
          this.form_init.probe_id = item.id
          this.form_init_probe.required_probe = item.required_probe == 0 ? false : true
          this.form_init_probe.accionButton = " Actualizar"
          this.getQuestionProbes(item.id)
        },
        launchProbe(item,status){
          const toSend = {status}
          axios.put('probe/'+item.id, toSend).then(response =>{
          const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activity_id+'/probes';
          this.mqttConection.publish(topic, JSON.stringify({update:true}))
            this.$swal('Sondeo Actualizado')
            this.getProbes(this.activity_id)
          }).catch(error=>{
          this.$swal({icon:'error', text:error})
          })
        },
        getQuestionProbes(id){
          axios.get(`probe-questions-probe/${id}`).then(res=>{
              this.questions = res.data.data.map(item=>{
                return {
                  ...item,
                  answer:""
                }
              })          
          })
      },

      subscriptionMqtt(){
        this.mqttConection = this.$mqtt()
        this.mqttConection.activity_id = this.activity_id
        const topic = 'eventmovil/'+this.activity.event_id+'/'+this.activity_id+'/#';

          console.log("subscription in probe:",topic)
         this.mqttConection.subscribe(topic, function (err, res) {    
          if (err) {
            console.log('🚨 Error when subscribing to topic ' + topic + ': ' + err);
            return;
          } 
          else {
            console.log("subscribed a ")
          }    
        });
      },
      unsubscriptionMqtt(){
        const topic = 'eventmovil/activity/'+this.activity_id;
        this.mqttConection.unsubscribe(topic)
      },
      getActivity(activityId){
        axios.get(`activities/${activityId}`).then(response =>{
          this.activity = response.data
          console.log("EventId:",this.activity.event_id)
          this.subscriptionMqtt()
        })
      }

    },
}
</script>
<style scoped>
  .card-link{
    color: #8e04cc;
    cursor: pointer;
  }
</style>