<template>
  <card class="card" title="Editar Actividad">

  <form class="needs-validation" novalidate="">


  <!-- Actividades  -->
    <div>

        <div class="row px-3" v-if="showFormActivity">
          <div class="col-6">
            <h4 class="mb-3">Actividad</h4>
          </div>
          <div class="col-6 text-right">
            <router-link :to="{name:'Editar Evento', params: {eventId:formActivity.event_id} }" v-if="roleName != 'guest'">
              <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                <span class="ti-arrow-left"></span>
              </button>
            </router-link>
          </div>
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label><span class="copys">Max 200</span>
            <input type="text" v-model="formActivity.name" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.name.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-6 mb-6">
            <label for="country">Modalidad</label>
            <select v-model="formActivity.mode_id" class="custom-select d-block w-100" id="country" required="">
              <option v-for="mode in modes" :key="mode.id" :value="mode.id">{{mode.name}}</option>
            </select>
            <div class="hasError" v-if="$v.formActivity.mode_id.$error">
              Please select a valid mode.
            </div>
          </div>

          <!-- <div class="col-md-3 mb-3">
            <label for="country">Tipo de actividad</label>
            <select v-model="formActivity.type_activity_id" class="custom-select d-block w-100" id="country" required="">
              <option v-for="ctype in typesActivity" :key="ctype.id" :value="ctype.id">{{ctype.name}}</option>
            </select>
            <div class="hasError" v-if="$v.formActivity.type_activity_id.$error">
              Please select a valid type.
            </div>
          </div> -->

          <div class="col-md-6 mb-3" v-if="formActivity.onDemand==false">
            <label for="firstName">Fecha de la actividad</label>
            <input type="date" v-model="formActivity.start_date" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.start_date.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-3 mb-3" v-if="formActivity.onDemand==false">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="formActivity.start_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.start_hour.$error">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-3 mb-3" v-if="formActivity.onDemand==false">
            <label for="firstName">Hora Fin</label>
            <input type="time" v-model="formActivity.end_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.end_hour.$error">
              Valid first name is required.
            </div>
          </div>

          <!-- <div class="col-md-6 mb-3" v-if="formActivity.type_activity_id == 2">
                <label for="firstName">Valor de la actividad</label>
                <input type="text" v-model="formActivity.unit_price" class="form-control" id="firstName" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.formActivity.unit_price.$error && formActivity.type_activity_id == 2">
                  Valid first name is required.
                </div>
            </div> -->

            <div class="col-md-6 mb-3">
                <label for="firstName">Limite de asistentes</label>
                <input type="text" v-model="formActivity.guests_limit" class="form-control" id="firstName" placeholder="" value="" required="">
            </div>


          <div class="col-md-6 mb-3">
            <label for="firstName">Banner de la actividad</label><span class="copys">512x382</span>
            <div class="custom-file">
              <input type="file" @change="picActivity" class="custom-file-input" id="bannerActivity">
              <label class="custom-file-label" id="bannerText" for="imageActividad">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formActivity.pic_banner.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="firstName">Fondo de la actividad</label><span class="copys">1366x768</span>
            <div class="custom-file">
              <input type="file" @change="picActivity"  class="custom-file-input" id="backActivity">
              <label class="custom-file-label" id="backText" for="imageEvento">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formActivity.pic.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Descripción</label><span class="copys">Max 400 carácteres</span>
            <editor
              v-model="formActivity.sort_description"
              api-key="i90r59222v310rg94hbt9qqb0dylokp439xadul8v8ad9whm"
              :init="{
                height: 400,
                content_style: 'body { font-size:12px }',
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'link undo redo | bold italic | alignleft aligncenter alignright alignjustify'
              }"
            />
            <!--<textarea name="" v-model="formActivity.sort_description" class="form-control"  id="" cols="30" rows="3"></textarea>-->
            <div class="hasError" v-if="$v.formActivity.sort_description.$error">
              Valid last name is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Código del streaming</label><span class="copys">Si dejas vacío este campo se tomará el streaming general</span>
            <textarea name="" v-model="formActivity.code_streaming" class="form-control"  id="" cols="30" rows="2"></textarea>
          </div>
          <div class="col-6 pl-3 ml-3">
            <div class="row">
              <div class="col-12 pl-2">
                <input type="checkbox" v-model="formActivity.voice_participation_check" class="form-check-input"  id="voice_participation_check">
                <label class="form-check-label" for="voice_participation_check">Participación por voz</label>
              </div>
              <div class="col-6 pl-2" v-if="formActivity.mode_id==2">
                <input type="checkbox"  v-model="formActivity.onDemand" class="form-check-input"  id="onDemand">
                <label class="form-check-label" for="voice_participation_check">on Demand</label>
              </div>
            </div>
          </div>
        </div>
    </div>
<!-- Actividades  -->
<!-- Speaker -->
    <div>
        <div class="row px-3">

          <div class="col-12">
            <br>
             <hr v-if="showFormActivity">
            <h4 class="mb-3">Speakers</h4>
          </div>
          <div class="col-md-12">
            <button type="button"  class="btn btn-outline-primary btn-invitaciones"
            @click="showSpeakerForm">Nuevo</button>
          </div>
          <div class="col-md-12 mb-3">
            <label for="country">Seleccionar speaker</label>
            <multiselect :options="speakers" v-model="listSpeakers"  width="100px"  track-by="name"
            :multiple="true" label="name">
            </multiselect>
            <div class="hasError" v-if="$v.listSpeakers.$error">
              Please select a valid speaker.
            </div>
          </div>
          <div v-if="showSpeaker" class="col-md-8 mb-3">
            <label for="lastName">Nombre completo</label><span class="copys">Max 50 carácteres</span>
            <input  maxlength="50"  type="text" v-model="formSpeaker.name" class="form-control" id="firstName" placeholder="" value="" required=""/>
            <span class='copys'>{{countCharacters.remainingCount.Speaker.name}}</span> 
            <div class="hasError" v-if="$v.formSpeaker.name.$error">
              Valid last name is required.
            </div>
          </div>

          <div v-if="showSpeaker" class="col-md-4 mb-3">
            <label for="firstName">Imagen</label><span class="copys">82X82</span>
            <div class="custom-file">
              <input type="file" @change="picSpeaker" class="custom-file-input" id="imageSpeaker">
              <label class="custom-file-label" for="imageSpeaker">Seleccionar (82 px X 82 px)</label>
            </div>
            <div class="hasError" v-if="$v.formSpeaker.pic.$error">
              Valid first name is required.
            </div>
          </div>

          <div v-if="showSpeaker" class="col-md-12 mb-3">
            <label for="lastName">Descripción</label><span class="copys">Max 200 carácteres</span>             
            <textarea placeholder="" maxlength="200" v-model="formSpeaker.sort_description" class="form-control"  id="" cols="30" rows="3"></textarea>
            <span class='copys'>{{countCharacters.remainingCount.Speaker.description}}</span> 
            <div class="hasError" v-if="$v.formSpeaker.sort_description.$error">
              Valid last name is required.
            </div>
          </div>

        </div>

        <div class="row px-3">
            <div class="col-md-9">
              <div v-if="showSpeaker" class="col-md-4">
                <button @click="createSpeaker()"
                  type="button"
                  class="btn btn-primary ">Crear Speaker</button>
              </div>
            </div>
            <div class="col-md-3">
            </div>
        </div>
        <div class="col-md-12">
          <button type="button"  class="btn btn-outline-primary btn-invitaciones" @click="editActivity">Editar actividad</button>
        </div>
        
    </div>
<!-- Speaker -->

    <probe :activity_id="propActivity" />
    <documents :showForm="true" :model="model"></documents>

    <div class="col-6 text-right">
      <router-link :to="{name:'Editar Evento', params: {eventId:formActivity.event_id} }" v-if="roleName != 'guest'">
        <button type="button" class="btn btn-outline-primary btn-sm mx-1">
          <span class="ti-arrow-left"></span>
        </button>
      </router-link>
    </div>
  </form>

  </card>

</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
import documents from "@/components/Forms/formDocuments"
import probe from '../../landing/Events/components/probe'
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'MyComponent',
    props:['propActivity'],
    components:{ multiselect, documents, probe, 'editor': Editor },
    data(){
      return{
        roleName:null,
        eventStart:null,
        eventEnd:null,
        model:{
          model:'activity',
          id:1,
        },
        formDocument:{
          name:null,
          type:null,
          url:'',
          type:'',
        },
        formPoll:{
          event_id:2,
          description:null,
          options:[],
          type_question_id:null,
          required:true,
          required_poll:true,
        },
        formSpeaker:{
          name:null,
          sort_description:null,
          pic:{}
        },
        showDivSpeaker:false,
        showSpeaker:false,
        listSpeakers:[],
        oldListSpeakers:[],
        speakers:[],
        typesActivity:[],
        showFormActivity:true,
        idEvent:null,
        formActivity:{
          event_id:"",
          name:null,
          sort_description:null,
          // type_activity_id:null,
          start_date:null,
          end_date:null,
          start_hour:null,
          end_hour:null,
          // unit_price:0,
          guests_limit:0,
          city_id:1,
          country_id:1,
          mode_id:null,
          pic:{},
          pic_banner:{},
          tags:'text',
          location_coordinates:'321321',
          address:'aasdasd',
          duration_minutes:60,
          code_streaming:null,
          friendly_url:'asasdasddas',
          company_id:1,
          voice_participation_check:null,
          onDemand:0
        },
        modes:[],
        typeQuestions:[],
        listQuestions:[],
        allDocuments:[],
        countCharacters:{
          maxCount: 400,
          remainingCount:{
            Speaker:{
              description:400,
              name:100,
            }
          },
          hasError: false
        }
      }
    },
    validations: {
      formDocument:{
          name:{required},
          type:{required},
          url:{required},
          type:{required},
      },
      formPoll:{
        event_id:{required},
        description:{required},
        type_question_id:{required},
      },
      formSpeaker:{
          name:{required},
          sort_description:{required},
          pic:{required},
      },
      listSpeakers:{required},
      formActivity:{
        name:{required, minLength: minLength(10), maxLength: maxLength(100)},
        sort_description:{required, maxLength: maxLength(400)},
        // type_activity_id:{required},
        start_date:{required},
        start_hour:{required},
        end_hour:{required},
        // unit_price:{required},
        mode_id:{required},
        pic:{required},
        pic_banner:{required},
      },
    },
    watch:{
      propActivity: function(newVal){
        this.modal.id = newVal
      },
      formActivity:{
        handler(val){
          if(val.mode_id==1 || val.mode_id==3){
            this.formActivity.onDemand=false
          }
        },
        deep: true
      }

    },
    beforeMount(){
      this.model.id = this.propActivity
      this.model.model = 'activity'
    },
    mounted() {
      this.roleName = localStorage.getItem('_current_role_name')
      if (this.propActivity) {
          this.getActivity()
          this.getDocuments()
          this.getModes()
          this.getTypesActivity()
          this.getSpeakers()
      }
    },
    methods: {
      /**contador de caracteres 
       * maxCount = max characters
       * type = element to validate
      */
      countdown(maxCount,type) {
        let thiss = this
        switch(type){
          case "name":
            console.log('ha 2')
            //console.log(thiss.formSpeaker.name)
            thiss.countCharacters.remainingCount = maxCount - thiss.formSpeaker.name.length;
          break;
          case "description":
            console.log('ha 3')
            this.countCharacters.remainingCount = maxCount - thiss.formSpeaker.sort_description.length;
          break;
        }
        console.log('ha 4 ')
        this.countCharacters.hasError = this.countCharacters.remainingCount < 0;
      },
      getActivity(){
        this.idActivity = this.propActivity
        axios.get('activities/'+this.idActivity).then(response =>{
          const act = response.data
          this.formActivity.event_id = act.event_id
          this.formActivity.name = act.name
          this.formActivity.sort_description = act.sort_description
          this.formActivity.pic = act.pic
          this.formActivity.type_activity_id = act.type_activity_id
          this.formActivity.pic_banner = act.pic_banner
          this.formActivity.unit_price = act.unit_price
          this.formActivity.guests_limit = act.guests_limit
          this.formActivity.code_streaming = act.code_streaming
          this.formActivity.mode_id = act.mode_id
          this.formActivity.voice_participation_check = act.voice_participation_check
          this.formActivity.onDemand = act.onDemand

          let picLabel1 = document.getElementById('bannerText')
          picLabel1.innerText = this.formActivity.pic_banner
          picLabel1 = document.getElementById('backText')
          picLabel1.innerText = this.formActivity.pic

          let startAct = act.start_date
          startAct = startAct.split(' ')
          this.formActivity.start_date = startAct[0]
          this.formActivity.start_hour = startAct[1]

          let endAct = act.end_date
          endAct = endAct.split(' ')
          this.formActivity.end_date = endAct[0]
          this.formActivity.end_hour = endAct[1]

          axios.get(`events/${act.event_id}`).then(response=>{
            const event = response.data
            this.eventStart = event[0].start_date
            this.eventEnd = event[0].end_date
          })

        })
        
      },
      createDocument(){
        this.$v.formDocument.$touch()
        if(this.$v.formDocument.$error) return

        let data = new FormData

        data.append('name', this.formDocument.name)
        data.append('type', this.formDocument.type)
        data.append('url', this.formDocument.url)
        data.append('model_type', 'activity')
        data.append('model_id', 2)

        axios.post('documents', data).then(response =>{
          this.getDocuments()
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      getDocuments(){
        this.model.id = this.idActivity
        this.model.model = 'activity'
      },
      updatePositionPoll(position, eventId){
        let data = new FormData()

        data.append('position', position)
        data.append('event_id', eventId)

        axios.post('postionQuestionPoll', data).then(response =>{
          this.getQuestions(eventId);
        }).catch(error =>{
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
      getModes(){
        axios.get('modeActivities').then(response => {
          this.modes = response.data.data
        })
      },
      showSpeakerForm(){
        this.showSpeaker =! this.showSpeaker
      },
      picSpeaker(e){
        let files = e.target.files || e.dataTransfer.files
        this.formSpeaker.pic=files[0]
      },
      onFileChange(e){
        let files = e.target.files || e.dataTransfer.files
        this.formEvent.pic=files[0]
      },
      fileDocument(e){
        let files = e.target.files || e.dataTransfer.files
        this.formDocument.url=files[0]
      },
      picActivity(e){ 
        let files = e.target.files || e.dataTransfer.files
        if(e.target.id == 'bannerActivity') {
          this.formActivity.pic_banner=files[0]
          let label = document.getElementById('bannerText');
          label.innerText = files[0].name
        }
        if(e.target.id == 'backActivity'){
          this.formActivity.pic=files[0]
          let label = document.getElementById('backText');
          label.innerText = files[0].name
        }
      },
      createSpeaker(){
        this.$v.formSpeaker.$touch()
        if(this.$v.formSpeaker.$error) return

        let data = new FormData()

        data.append('name', this.formSpeaker.name)
        data.append('sort_description', this.formSpeaker.sort_description)
        data.append('pic', this.formSpeaker.pic)

        axios.post('speakers', data).then(response=>{          
          if(response.data.data){
            this.getSpeakers()
            this.showSpeaker = false
            this.$swal('¡Creado!')
          }else{
            this.$swal({icon:'error', text:'Ups! Fallo al crear!'})
          }
          
        })

      },
      getTypesActivity(){
        axios.get('typesActivities').then(response =>{
          this.typesActivity = response.data.data
        })
      },
      async editActivity(){
        console.log(this.formActivity.sort_description)
        this.$v.formActivity.$touch()
        if(this.$v.formActivity.$error) return
        this.$v.listSpeakers.$touch()
        if(this.$v.listSpeakers.$error) return

        let date_start = this.formActivity.start_date+' '+this.formActivity.start_hour+':00';
        let date_end= this.formActivity.start_date+' '+this.formActivity.end_hour+':00';
        let date_start_edit = date_start        
        if(date_start < this.eventStart || date_end> this.eventEnd){
          this.$swal({icon:'error', text:`Las fechas no corresponden a las del evento. El evento inicia: ${this.eventStart} Finaliza:${this.eventEnd}`})
          return
        }
        date_start = this.formActivity.start_date+' '+this.formActivity.start_hour
        date_end= this.formActivity.start_date+' '+this.formActivity.end_hour
        if(date_start > date_end){
          this.$swal({icon:'error', text:'La fecha de inicio es mayor a la fecha de finalización'})
          return
        }
        if(this.formActivity.onDemand) this.formActivity.onDemand=1
        else 
          this.formActivity.onDemand=0

        let data = new FormData()
        data.append('event_id', this.formActivity.event_id)
        data.append('name',this.formActivity.name)
        data.append('sort_description', this.formActivity.sort_description)
        // data.append('type_activity_id', this.formActivity.type_activity_id)
        data.append('type_activity_id', 1)
        // data.append('start_date', date_start)
        data.append('start_date', (this.formActivity.onDemand?"2000-11-12 00:01":date_start))
        // data.append('end_date', date_end)
        data.append('end_date', (this.formActivity.onDemand?"2000-11-12 00:02":date_end))
        // data.append('unit_price',this.formActivity.unit_price)
        data.append('unit_price',0)
        data.append('guests_limit',this.formActivity.guests_limit)
        data.append('city_id',this.formActivity.city_id)
        data.append('mode_id',this.formActivity.mode_id)
        data.append('country_id',this.formActivity.country_id)
        data.append('pic',this.formActivity.pic)
        data.append('pic_banner',this.formActivity.pic_banner)
        data.append('tags',this.formActivity.tags)
        data.append('location_coordinates',this.formActivity.location_coordinates)
        data.append('address',this.formActivity.address)
        data.append('duration_minutes',this.formActivity.duration_minutes)
        data.append('code_streaming',this.formActivity.code_streaming)
        data.append('friendly_url',this.formActivity.friendly_url)
        data.append('company_id',this.formActivity.company_id)
        data.append('voice_participation_check',(this.formActivity.voice_participation_check ? 1 : 0))
        data.append('onDemand',(this.formActivity.mode_id==2?this.formActivity.onDemand:0))
        data.append('_method', 'PUT')

        await axios.post('activities/'+this.idActivity, data).then(async response => {
          this.showFormActivity = true
          let activityId = response.data.data.id
          await axios.delete('activitySpeakers/'+activityId)
          // this.oldListSpeakers.map(item =>{
          //   console.log(item.id)
          //   axios.delete('activitySpeakers/'+item.table_id)
          // })
          this.listSpeakers.map(item =>{
            let dataForm = {speaker_id: item.id, activity_id: activityId}
            axios.post('activitySpeakers', dataForm)
          })
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
        
        this.$swal('Actividad editada')
      },
      getSpeakers(){
        axios.get('speakers?pagination=false').then(response => {
          if(response.data.data)
            this.speakers = response.data.data
          else
            this.speakers = response.data
        })
        axios.get('activities-speakers/'+this.idActivity).then(response=>{
          this.listSpeakers = response.data.data
          this.oldListSpeakers = response.data.data
        })
      },
    },
    mount () {
        this.show()
    }
};


</script>

<style>
 .btn-sm{
    font-size: 1rem !important;
    padding-right: 1rem;
    padding-left: 1rem;
   }

.btn-sm
.order{
      color: black;
      cursor: move;
    }
  .btn-invitaciones{
    position: absolute;
    top: -40px;
    right: 20px;
  }
  .hasError {
    color: red;
  }

  .add-btn {
    margin-top: 20px !important;
  }
</style>
