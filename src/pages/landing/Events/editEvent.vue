<template>
  <card class="card" title="Nuevo Evento">

  <form class="needs-validation" novalidate="">

  <!-- Step 01 -->
    <div id="step01" v-if="steps.step1">

      <h4 class="mb-3">Detalles del evento</h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" v-model="formEvent.name" v-model.trim="$v.formEvent.name.$model" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.name.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-6 mb-3"></div>



        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Inicio</label>
            <input type="date" v-model="formEvent.start_date" class="form-control border-input" id="lastName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.start_date.$error">
              Valid last start date is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Fin</label>
            <input type="date" v-model="formEvent.end_date" class="form-control border-input" id="lastName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.end_date.$error">
              Valid last end date is required.
            </div>
          </div>

           <div class="col-md-3 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="formEvent.start_hour" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.start_hour.$error">
              Valid first start hour is required.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Fin</label>
            <input type="time" v-model="formEvent.end_hour" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.end_hour.$error">
              Valid first end hour is required.
            </div>
          </div>



          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Descripción del evento</label>
            <textarea v-model="formEvent.description" class="form-control border-input"  name="" id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formEvent.description.$error">
              Valid first description is required.
            </div>
          </div>


        </div>

        <!-- Configurate style -->

        <div class="row">

          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Logo del evento</label>
              <div class="custom-file">
                <input type="file" name="pic" @change="onFileChange" class="custom-file-input" id="imageEvento">
                <label class="custom-file-label" for="imageEvento">Seleccionar</label>
              </div>
              <div class="hasError" v-if="$v.formEvent.pic.$error">
                Valid first image file is required.
              </div>
            </div>

          <div class="col-md-12 mb-3">
            <label for="firstName">Banner del Evento</label>
            <div class="custom-file">
              <input type="file" name="banner" @change="onFileChange"  class="custom-file-input" id="imageEvento">
              <label class="custom-file-label" for="imageEvento">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formEvent.pic_banner.$error">
                Valid first image file is required.
              </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="firstName">Imagen de fondo</label>
            <div class="custom-file">
              <input type="file"  name="background" @change="onFileChange"  class="custom-file-input" id="imageEvento">
              <label class="custom-file-label" for="imageEvento">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formEvent.pic_background.$error">
                Valid first image file is required.
            </div>
          </div>

          </div>
          <div class="col-md-1"></div>
          <div class="col-md-5">

            <div class="col-md-12 mb-3">
              <label for="firstName">Color principal</label>
              <input type="color" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            </div>

            <div class="col-md-12 mb-3">
              <label for="firstName">Color secundario</label>
              <input type="color" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            </div>

          </div>

        </div>
        <!-- Configurate style -->

        <div class="row">
            <div class="col-md-9"></div>
            <div class="col-md-3">
              <button
                @click="createEvent()"
                type="button"
                class="btn btn-outline-primary btn-block">Siguiente</button>
            </div>
        </div>
    </div>
  <!-- Step 01 -->

  <!-- Step 02 -->
    <div id="step02" v-if="steps.step2">
        <div class="row px-3" v-if="showFormActivity">
          <div class="col-12">
            <h4 class="mb-3">Actividad del evento</h4>
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

            <div class="col-md-3 mb-3">
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
  <!-- Step 02 -->

  <!-- Step 03 -->
    <div id="step03" v-if="steps.step2">

        <div class="row px-3">

          <!-- Speaker -->

          <div class="col-12">
            <br>
             <hr v-if="showFormActivity">
            <h4 class="mb-3">Detalles del Speaker</h4>
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
            <label for="lastName">Nombre completo</label>
            <input type="text" v-model="formSpeaker.name" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formSpeaker.name.$error">
              Valid last name is required.
            </div>
          </div>

          <div v-if="showSpeaker" class="col-md-4 mb-3">
            <label for="firstName">Imagen</label>
            <div class="custom-file">
              <input type="file" @change="picSpeaker" class="custom-file-input" id="imageSpeaker">
              <label class="custom-file-label" for="imageSpeaker">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formSpeaker.pic.$error">
              Valid first name is required.
            </div>
          </div>

          <div v-if="showSpeaker" class="col-md-12 mb-3">
            <label for="lastName">Descripción</label>
            <textarea v-model="formSpeaker.sort_description" class="form-control"  id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formSpeaker.sort_description.$error">
              Valid last name is required.
            </div>
          </div>


          <!-- Speaker -->

        </div>
        <div class="row">
            <div class="col-md-2 md-3" v-if="showSpeaker == false">
              <button
                @click="showMenus('invitation')"
                type="button"
                class="btn btn-outline-primary btn-block">Crear invitaciones</button>
            </div>
            <div class="col-md-2 md-3" v-if="showSpeaker == false">
              <button
                @click="showMenus('material')"
                type="button"
                class="btn btn-outline-primary btn-block">Adjuntar material</button>
            </div>
            <div class="col-md-4 md-3 ml-auto" v-if="showSpeaker == false">
              <button
                @click="createActivity()"
                type="button"
                class="btn btn-outline-primary btn-block">Crear actividad</button>
            </div>
            </div>

        <div class="row px-3">
            <div class="col-md-9">

               <div v-if="showSpeaker" class="col-md-4">
            <button @click="createSpeaker()"
              type="button"
              class="btn btn-outline-primary ">Crear Speaker</button>
          </div>
            </div>
        </div>

    </div>
  <!-- Step 03 -->

  <!-- Step 04 -->
    <documents :showForm=steps.step4 :model="'activity'" :modelId=2></documents>
    <div class="row">

      <div class="col-md-9">
        <h4 class="mb-3">Listado de Actividades</h4>
      </div>
      <div class="col-md-3 text-right">
        <button class="btn btn-primary" type="submit">Crear Nueva Actvidad</button>
      </div>

      <div class="col-md-12">

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Actividad</th>
              <th scope="col">Fecha</th>
              <th scope="col" class="text-right">Opciones</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="activity in listActivities" :key="activity.id">
              <th scope="row">
                {{activity.id}}
              </th>
              <td>{{activity.name}}</td>
              <td>{{activity.start_date}}</td>
              <td class="text-right">

                <router-link :to="{path:'/actividad'}">
                  <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                    <span class="ti-pencil-alt"></span>
                  </button>
                </router-link>

                <button type="button" @click="deleteActivity(activity.id)" class="btn btn-outline-danger btn-sm mx-1">
                    <span class="ti-trash"></span>
                </button>

              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
    
  <!-- Step 04 -->

  <!-- Step 05 -->
    <div id="step05" v-if="steps.step5">

              <!-- Encuestas  -->

        <div class="row px-3"  v-if="showFormActivity">
          <div class="col-12">
            <h4 class="mb-3">Crear encuesta</h4>
          </div>

          <div class="col-12">
            <div class="form-check px-4">
                <input type="checkbox" v-model="formPoll.required_poll" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Quiero que esta encuesta sea obligatoria</label>
              </div>
          </div>

          <div class="col-md-8 mb-3">
            <label for="lastName">Pregunta</label>
            <textarea name="" class="form-control" v-model="formPoll.description"  id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formPoll.description.$error">
              Valid last name is required.
            </div>
          </div>


          <div class="col-md-4 mb-3">

            <div class="col-md-12 mb-3">
              <label for="country">Tipo</label>
              <select v-model="formPoll.type_question_id" class="custom-select d-block w-100" id="country" required="">
                <option v-for="type in typeQuestions" :key="type.id" :value="type.id">{{type.name}}</option>
              </select>
              <div class="hasError" v-if="$v.formPoll.type_question_id.$error">
                Please select a valid type.
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-check px-4">

                <input type="checkbox" v-model="formPoll.required" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Pregunta Obligatoria</label>

              </div>
          </div>

          </div>

          <div class="col-md-12 mb-3 answer" v-if="formPoll.type_question_id == 3">
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
            <button class="btn btn-outline-primary" @click="createPoll()" >Agregar</button>
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

                <tr v-for="question in listQuestions" :key="question.id">
                  <th scope="row">
                      {{question.id}}
                  </th>
                  <td>{{question.description}}</td>
                  <td>{{question.type_question}}</td>
                  <td v-if="!question.required">No</td>
                  <td v-if="question.required">Si</td>
                  <td class="text-right">

                    <button @click="showEditPoll(question)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button @click="deletePoll(question.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <button @click="updatePositionPoll(question.position, question.event_id)" type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>

                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
        <div class="row px-3">
          <div class="col-md-9">
          </div>

          <div class="col-md-3">
              <button
                
                type="button"
                class="btn btn-outline-primary btn-block">Siguiente</button>
            </div>
        </div>

       <!-- Encuestas  -->

    </div>
  <!-- Step 05 -->

  <!-- Step 06 -->
    <div id="step06" v-if="steps.step6">

        <!-- Invitaciones  -->

        <div class="row px-3" v-if="showFormActivity">

            <div class="col-12">
              <h4 class="mb-3">Crear Invitaciones</h4>
            </div>

            <div class="col-md-6 mb-3">
              <label for="firstName">Nombre</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="firstName">Email</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="country">Tipo</label>
              <br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">Todo el evento</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">Por Actividad</label>
                  </div>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="country">Actividad</label>
                  <select class="custom-select d-block w-100" id="country" required="">
                    <option value="">Seleccionar...</option>
                    <option>Introducción</option>
                    <option>Desarrollo de negocios</option>
                    <option>Como avanzar en tiempos de crisis?</option>
                  </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
            </div>
            <div class="col-md-2 mb-3">
                <label for="country">Cantidad</label>
                  <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
            </div>

            <div class="col-md-3 mb-3">
              <button class="btn btn-outline-primary" type="submit">Agregar</button>
            </div>

              <div class="col-md-9 mb-3">
              </div>

              <div class="col-md-12">

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

                    <tr>
                      <th scope="row">
                          1
                      </th>
                      <td>Roberto Durán</td>
                      <td>roberto.dura@hotmail.com</td>
                      <td>Por actividad</td>
                      <td>5</td>
                      <td class="text-right">

                        <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                          <span class="ti-pencil-alt"></span>
                        </button>

                        <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                          <span class="ti-trash"></span>
                        </button>

                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                          2
                      </th>
                      <td>Dayanna Piloa</td>
                      <td>dayyana2890@gmail.com</td>
                      <td>Todo el evento</td>
                      <td>1</td>
                      <td class="text-right">

                        <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                          <span class="ti-pencil-alt"></span>
                        </button>

                        <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                          <span class="ti-trash"></span>
                        </button>

                      </td>
                    </tr>


                  </tbody>
                </table>

              </div>
            </div>

       <!-- Invitaciones  -->

        <div class="row">
          <div class="col-md-9">
            </div>
            <div class="col-md-3">
                  <button class="btn btn-primary btn-lg btn-block" type="submit">Crear Evento</button>
          </div>
      </div>
    </div>
  <!-- Step 06 -->
    
  </form>

  <editPoll :showModal="showModalPoll.show" :typeQuestions="typeQuestions" 
    :questionProp="showModalPoll.poll" @getQuestions="getQuestions">
  </editPoll>
  </card>

</template>
<script>
import { required } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
import documents from "@/components/Forms/formDocuments"
import editPoll from "@/components/Modals/editPoll"
import probe from './components/probe'

export default {
    name: 'MyComponent',
    components:{ multiselect, documents, editPoll },
    data(){
      return{
        steps: {
          step1: true,
          step2: true,
          step3: true,
          step4: true,
          step5: true,
          step6: false,
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
        questionOption:'',
        listOptions:[],
        showDivSpeaker:false,
        showSpeaker:false,
        listSpeakers:[],
        speakers:[],
        typesActivity:[],
        showFormActivity:true,
        
        formActivity:{
          name:null,
          sort_description:null,
          type_activity_id:null,
          start_date:null,
          end_date:null,
          start_hour:null,
          end_hour:null,
          unit_price:0,
          guests_limit:null,
          city_id:1,
          country_id:1,
          mode_id:1,
          pic:{},
          pic_banner:{},
          tags:'text',
          location_coordinates:'321321',
          address:'aasdasd',
          duration_minutes:60,
          code_streaming:null,
          friendly_url:'asasdasddas',
          company_id:1,
          speaker_id:1,
          pic_banner:[],
          pic_background:[],
          first_color:'',
          second_color:'',
        },
        eventId:null,
        formEvent:{
          name:'',
          description:null,
          start_date:null,
          end_date:null,
          start_hour:null,
          end_hour:null,
          city_id:1,
          pic:{},
          duration_minutes:60,
          friendly_url:'asasdasddas',
          company_id:1,
        },
        modes:[],
        typeQuestions:[],
        listQuestions:[],
        allDocuments:[],
        listActivities:[],
        showModalPoll:{
          poll:{},
          show:false,
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
      formEvent:{
          name:{required},
          description:{required},
          start_date:{required},
          end_date:{required},
          start_hour:{required},
          end_hour:{required},
          pic:{required},
          pic_banner:{required},
          pic_background:{required},
          first_color:{required},
          second_color:{required},
          duration_minutes:{required},
          friendly_url:{required},
          company_id:{required},
        },
        listSpeakers:{required},
        formActivity:{
          name:{required},
          sort_description:{required},
          type_activity_id:{required},
          start_date:{required},
          start_hour:{required},
          end_hour:{required},
          unit_price:{required},
          mode_id:{required},
          pic:{required},
          pic_banner:{required},
          code_streaming:{required},
        },
    },
    props:{
     idEvent:{
      type:Number,
      required:true
     }
    },
    watch:{
     idEvent:function(newVal){
      this.eventId = newVal
     }
    },
    created(){
      this.getTypesActivity()
      this.getSpeakers()
      this.getModes()
      this.getTypeQuestions()
      this.getQuestions(2)
      this.getDocuments()
    },
    methods: {
      showEditPoll(poll){
        this.showModalPoll.poll = poll
        this.showModalPoll.show =! this.showModalPoll.show
      },
      addOption(option = ''){
        if(option !== "")
        this.listOptions.push(option)
        this.questionOption = ""
      },
      deleteOption(index){
        this.listOptions.splice(index,1);
      },
      getActivities(){
        axios.get('activities-event/'+2).then(response =>{
          this.listActivities = response.data.data
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      showMenus(element){
        if(element == 'material') {
          this.steps.step4 =! this.steps.step4
          this.steps.step6 = false 
        }
        if(element == 'invitation') {
          this.steps.step6 =! this.steps.step6
          this.steps.step4 = false 
        }
      },
      getDocuments(){
        axios.get('modelDocuements/activity/'+2).then(response=>{
          this.allDocuments = response.data.data
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
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
      createPoll(){
        this.$v.formPoll.$touch()
        if(this.$v.formPoll.$error) return
        this.formPoll.options = JSON.stringify(this.listOptions)
        axios.post('pollQuestions', this.formPoll).then(response =>{
          this.$swal('Encuesta creada')
          this.formPoll.description = null,
          this.formPoll.type_activity_id = null,
          this.listOptions = [],
          this.getQuestions(2)
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      deletePoll(id){
        axios.delete(`pollQuestions/${id}`).then(response =>{
          this.getQuestions(2)
          this.$swal('Pregunta eliminada')
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      getQuestions(id){
        axios.get('pollQuestionsEvent/'+id).then(response =>{
            this.listQuestions = response.data.data
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      getTypeQuestions(){
        axios.get('typeQuestions').then(response => {
          this.typeQuestions = response.data.data
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
        if(e.target.name=="pic") this.formEvent.pic=files[0]
        if(e.target.name=="banner") this.formEvent.pic_banner=files[0]
        if(e.target.name=="background") this.formEvent.pic_background=files[0]

      },
      picActivity(e){
        let files = e.target.files || e.dataTransfer.files
        if(e.target.name=="banner") this.formActivity.pic_banner=files[0]
        if(e.target.name=="background") this.formActivity.pic=files[0]
      },
      createSpeaker(){
        this.$v.formSpeaker.$touch()
        if(this.$v.formSpeaker.$error) return

        let data = new FormData()

        data.append('name', this.formSpeaker.name)
        data.append('sort_description', this.formSpeaker.sort_description)
        data.append('pic', this.formSpeaker.pic)

        axios.post('speakers', data).then(response=>{
          this.getSpeakers()
          this.showSpeaker = false
        })

      },
      createEvent(){

        this.$v.formEvent.$touch()

        if(this.$v.formEvent.$error) return

        this.formEvent.start_date = this.formEvent.start_date+' '+this.formEvent.start_hour
        this.formEvent.end_date = this.formEvent.end_date+' '+this.formEvent.end_hour

        let data = new FormData()

        data.append('name', this.formEvent.name)
        data.append('description', this.formEvent.description)
        data.append('start_date', this.formEvent.start_date)
        data.append('end_date', this.formEvent.end_date)
        data.append('city_id', this.formEvent.city_id)
        data.append('pic', this.formEvent.pic)
        data.append('duration_minutes', this.formEvent.duration_minutes)
        data.append('friendly_url', this.formEvent.friendly_url)
        data.append('company_id', this.formEvent.company_id)
        data.append('pic_banner', this.formEvent.pic_banner)
        data.append('pic_background', this.formEvent.pic_background)
        data.append('first_color', this.formEvent.first_color)
        data.append('second_color', this.formEvent.second_color)
        axios.post('events', data).then(response => {
          this.showFormActivity = true
          this.idEvent = response.data.data.id
          this.$swal('Evento creado')
          this.steps.step4=true
        }).catch(error=>{
          this.$swal({
            icon:'error',text:error,
          })
        })
      },
      getTypesActivity(){
        axios.get('typesActivities').then(response =>{
          this.typesActivity = response.data.data
        })
      },
      async createActivity(){
        
        this.$v.formActivity.$touch()
        if(this.$v.formActivity.$error) return
        this.$v.listSpeakers.$touch()
        if(this.$v.listSpeakers.$error) return
        
        const dateStart = this.formActivity.start_date
        this.formActivity.start_date = this.formActivity.start_date+' '+this.formActivity.start_hour
        this.formActivity.end_date = dateStart+' '+this.formActivity.end_hour
        
        let data = new FormData()
        data.append('event_id', 2)
        data.append('name',this.formActivity.name)
        data.append('sort_description', this.formActivity.sort_description)
        data.append('type_activity_id', this.formActivity.type_activity_id)
        data.append('start_date', this.formActivity.start_date)
        data.append('end_date',this.formActivity.end_date)
        data.append('unit_price',this.formActivity.unit_price)
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


        await axios.post('activities', data).then(response => {
          this.showFormActivity = true
          this.steps.step4 = true
          let activityId = response.data.data.id
          this.getActivities()
          this.listSpeakers.map(item =>{
            let dataForm = {speaker_id: item.id, activity_id: activityId}
            axios.post('activitySpeakers', dataForm).catch(error => {
              this.$swal({icon:'error', text:error});
            })
          })
          this.$swal('Actividad creada')
        }).catch(error=>{
          this.$swal({icon:'error', text:error});
        })
      },
      deleteActivity(id){
        axios.delete('activities/'+id).then(response=>{
          this.getActivities()
          this.$swal('Actividad eliminada')
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      getSpeakers(){
        axios.get('speakers').then(response => {
          this.speakers = response.data.data
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

  .answer-btn {
    margin-top: 20px !important;
  }
</style>
