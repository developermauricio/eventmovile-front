<template>
  <card class="card" title="Editar Evento">
      <div class="col-md-12">
    <button
      @click="$modal.show('crear-invitaciones')"
      type="button"
      class="btn btn-outline-primary btn-invitaciones">Crear Invitaciones 2</button>
  </div>
    <div class="col-md-12 order-md-1">
      <h4 class="mb-3">Detalles del evento</h4>
      <form class="needs-validation" novalidate="">

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" v-model="formEvent.name" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Inicio</label>
            <input type="date" v-model="formEvent.start_date" class="form-control" id="lastName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Fin</label>
            <input type="date" v-model="formEvent.end_date" class="form-control" id="lastName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

        </div>

        <div class="row">
           <div class="col-md-3 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="formEvent.start_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Fin</label>
            <input type="time" v-model="formEvent.end_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="firstName">Imagen del evento</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="imageEvento">
              <label class="custom-file-label" for="imageEvento">Seleccionar</label>
            </div>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="firstName">Descripción del evento</label>
            <textarea v-model="formEvent.description" class="form-control"  name="" id="" cols="30" rows="3"></textarea>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

        </div>
        <div class="col-md-12">
          <button
            @click="editEvent()"
            type="button"
            class="btn btn-outline-primary btn-invitaciones">Editar evento</button>
        </div>
        <br>
        <hr>

          <hr>
      <!-- Actividades  -->
        <div class="row">
          <div class="col-12">
            <h4 class="mb-3">Actividades del evento</h4>
          </div>
        </div>

        <div class="row" v-for="activity in formActivity" :key="activity.id">
          <div class="col-12">
            <h6 class="mb-3">{{activity.name}}</h6>
          </div>
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label>
            <input type="text" v-model='activity.name' class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="country">Modalidad</label>
            <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Seleccionar...</option>
              <option>Presencial</option>
              <option>Virtual</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid country.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="country">Tipo de actividad</label>
            <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Seleccionar...</option>
              <option v-if="activity.type_activity.name == 'Abierto'" selected>Abierto</option>
              <option v-else selected>Privado</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid country.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="firstName">Fecha de la actividad</label>
            <input type="date" class="form-control" v-model="activity.start_date" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-1 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="activity.start_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-1 mb-3">
            <label for="firstName">Hora Fin</label>
            <input type="time" :value="activity.end_date" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-2 mb-3">
                <label for="firstName">Valor de la actividad</label>
                <input type="text" v-model="activity.unit_price" class="form-control" id="firstName" required>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
            </div>

            <div class="col-md-2 mb-3">
                <label for="firstName">Limite de asistentes</label>
                <input type="text" v-model="activity.guests_limit" class="form-control" id="firstName" placeholder="" value="" required="">
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
            </div>


          <div class="col-md-3 mb-3">
            <label for="firstName">Imagen de la actividad</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="imageActividad">
              <label class="custom-file-label" for="imageActividad">Seleccionar</label>
            </div>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Descripción</label>
            <textarea v-model="activity.sort_description" name="" class="form-control"  id="" cols="30" rows="3"></textarea>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Código del streaming</label>
            <textarea name="" class="form-control"  id="" cols="30" rows="2"></textarea>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-check">

              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Habilitar Actividad On Demand</label>

            </div>

          </div>



          <!-- Speaker -->

          <div class="col-12">

            <h6 class="mb-3">Detalles del Speaker</h6>
          </div>

          <div class="col-md-8 mb-3">
            <label for="lastName">Nombre completo</label>
            <input type="text"  class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <label for="firstName">Imagen</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="imageSpeaker">
              <label class="custom-file-label" for="imageSpeaker">Seleccionar</label>
            </div>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Descripción</label>
            <textarea name=""  class="form-control"  id="" cols="30" rows="3"></textarea>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
          <div class="col-12">
            <hr>
          </div>

           <!-- Speaker -->

        </div>

       <!-- Actividades  -->

       <hr>
      <!-- Encuestas  -->

        <div class="row">
          <div class="col-12">
            <h4 class="mb-3">Crear Encuesta de la Actividad</h4>
          </div>

          <div class="col-md-8 mb-3">
            <label for="lastName">Titulo de la Pregunta</label>
            <textarea name="" class="form-control"  id="" cols="30" rows="3"></textarea>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>


          <div class="col-md-4 mb-3">

            <div class="col-md-12 mb-3">
              <label for="country">Tipo</label>
              <select class="custom-select d-block w-100" id="country" required="">
                <option value="">Seleccionar...</option>
                <option>Texto corto</option>
                <option>Númerico</option>
                <option>Menú desplegable</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-check px-4">

                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Pregunta Obligatoria</label>

              </div>
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
                  <th scope="col">Pregunta</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Obligatoria</th>
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">
                      1
                  </th>
                  <td>Que edad tienes?</td>
                  <td>Númerico</td>
                  <td>No</td>
                  <td class="text-right">

                    <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <button type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      2
                  </th>
                  <td>Cuentanos que fué lo que mas te gusto de la actividad?</td>
                  <td>Texto corto</td>
                  <td>Si</td>
                  <td class="text-right">

                    <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <button type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      3
                  </th>
                  <td>Recomendarias esta actividad?</td>
                  <td>Menú desplegable</td>
                  <td>Si</td>
                  <td class="text-right">

                    <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <button type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>

                  </td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>

       <!-- Encuestas  -->
      <hr>
      <!-- Documentos del evento  -->

        <div class="row">
          <div class="col-12">
            <h4 class="mb-3">Adjuntar Material de la Actividad</h4>
          </div>

          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre del documento</label>
            <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="country">Tipo</label>
              <select class="custom-select d-block w-100" id="country" required="">
                <option value="">Seleccionar...</option>
                <option>Documento local</option>
                <option>Desde Url</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid country.
              </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="firstName">Local</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="local">
              <label class="custom-file-label" for="local">Seleccionar</label>
            </div>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="firstName">Url</label>
            <input type="text" class="form-control" id="firstName" placeholder="Ingrese la url del material a compartir" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
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
                  <th scope="col">Material</th>
                  <th scope="col">Tipo</th>
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">
                      1
                  </th>
                  <td>Introducción a la actividad</td>
                  <td>Local</td>
                  <td class="text-right">

                    <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <button type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      2
                  </th>
                  <td>Guía Interactiva</td>
                  <td>Url</td>
                  <td class="text-right">

                    <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                       <span class="ti-pencil-alt"></span>
                    </button>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                    <button type="button" class="btn btn-outline-secundary  btn-sm">
                       <span class="ti-split-v order"></span>
                    </button>

                  </td>
                </tr>



              </tbody>
            </table>

          </div>

        </div>

       <!-- Documentos del evento  -->

    </form>
    </div>


    <!-- Invitaciones -->

    <modal name="crear-invitaciones"

         :width="720"
         :height="600"
         :adaptive="true">
        <div class="container">
          <div slot="top-right">
            <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('crear-invitaciones')">
              ❌
            </button>
          </div>
            <div class="row">

            <div class="col-12">
              <h4 class="mb-3">Crear Invitaciones 2</h4>
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
        </div>
    </modal>



      <div class="row">
        <div class="col-md-9">
          </div>
          <div class="col-md-3">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Crear Evento</button>
        </div>
      </div>

  </card>

</template>
<script>

export default {
    name: 'MyComponent',
    props:['eventId'],
    data(){
      return{
        id:null,
        formActivity:[],
        formEvent:{
          name:null,
          description:null,
          start_date:null,
          end_date:null,
          start_hour:null,
          end_hour:null,
          city_id:1,
          pic:'sadad.png',
          duration_minutes:60,
          friendly_url:'asasdasddas',
          company_id:1,
        },
      }
    },
    mounted() {
      if (this.eventId) {
          this.id = this.eventId
          this.getEvent()
          this.getActivities()

      }
    },
    methods: {
      editEvent(){
        this.formEvent.start_date = this.formEvent.start_date+' '+this.formEvent.start_hour
        this.formEvent.end_date = this.formEvent.end_date+' '+this.formEvent.end_hour



        axios.put(`events/${this.id}`, this.formEvent).then(response => {
          alert(response.data)
        }).catch(error=>{
          alert("error al editar evento")
        })
      },

      getActivities(){
        let activities
        axios.get(`activities-event/${this.id}`).then(response =>{
          activities = response.data.data
          activities.map((e) => {
            let startHour = e.start_date.split(' ')
            e.start_hour=startHour[1]

            let endHour = e.end_date.split(' ')
            e.end_date=endHour[1]

            let date = e.start_date.split(' ')
            e.start_date=endHour[0]

          })
          this.formActivity = activities

        })
      },

      getEvent(){
        axios.get('events/'+this.id).then(response =>{
          const event = response.data
          this.formEvent.name = event[0].name
          this.formEvent.description = event[0].description
          this.formEvent.city = event[0].city.name
          this.formEvent.pic = event[0].pic
          this.formEvent.activities = event[0].activities

          let startEvent = event[0].start_date
          startEvent = startEvent.split(' ')
          this.formEvent.start_date = startEvent[0]
          this.formEvent.start_hour = startEvent[1]

          let endEvent = event[0].end_date
          endEvent = endEvent.split(' ')
          this.formEvent.end_date = endEvent[0]
          this.formEvent.end_hour = endEvent[1]

        })
      },
      show () {
          this.$modal.show('crear-invitaciones');
      },
      hide () {
          this.$modal.hide('crear-invitaciones');
      }
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
</style>
