<template>
  <card class="card" title="Editar Evento">

    <form class="needs-validation" novalidate="">

      <!-- Step 01 -->
      <div id="step01">
        <div class="row">
          <div class="col-6 mb-3">
            <h4>Detalles del evento</h4>
            <div class="col-5">
              <label v-if="formEvent.actived"> Evento activo</label>
              <label v-else> Evento inactivo</label>
              <br>
              <label class="switch">
                <input type="checkbox" v-model="formEvent.actived">
                <span class="slider round"></span>
              </label>
            </div>
          </div>

          <div class="col-6 text-right">
            <router-link :to="{name:'Mis Eventos'}">
              <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                <span class="ti-arrow-left"></span>
              </button>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <jsonExcel style="margin-left: 83%;" class="btn btn-outline-primary btn-sm mx-1"
                       name="ReporteRegistrados.csv" type="csv" :fetch="fetchDataGuests">Reporte de registrados
            </jsonExcel>
          </div>
          <div class="col-4">
            <jsonExcel 
              class="btn btn-outline-primary btn-sm mx-1"
              name="ReporteCalificacionActividades.csv" 
              type="csv" 
              :fetch="getReportRateForEvent">
              Reporte calificación actividades
            </jsonExcel>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label><span class="copys">Max 100 carácteres</span>
            <input type="text" v-model="formEvent.name" v-model.trim="$v.formEvent.name.$model"
                   class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.name.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="country">Tipo de evento</label>
            <select v-model="formEvent.event_type_id" class="custom-select d-block w-100" id="country" required="">
              <option v-for="mytype in eventTypes" :key="mytype.id" :value="mytype.id">{{ mytype.name }}</option>
            </select>
            <div class="hasError" v-if="$v.formEvent.event_type_id.$error">
              Please select a valid type.
            </div>
          </div>

          <div class="col-md-6 mb-3" v-if="countrieSelect">
            <label for="country">País ubicación evento</label>
            <multiselect v-model="countrieSelect"
                         @input="getCitiesEvent"
                         :options="countriesEvent"
                         :selectLabel="'Selecciona una opción'"
                         :selectedLabel="'Selecciona una opción'"
                         :custom-label="countryName">

            </multiselect>
          </div>
          <div class="col-md-6 mb-3" v-if="countrieSelect">
            <label for="country">Selecciona la ciudad</label>
            <multiselect v-model="citySelect"
                         :options="citiesEvent"
                         :selectLabel="'Selecciona una opción'"
                         :selectedLabel="'Selecciona una opción'"
                         :custom-label="cityName">

            </multiselect>
          </div>
          <div class="col-md-6 mb-3" v-if="formEvent.address">
            <label for="country">Dirección del evento</label>
            <input type="text" v-model="formEvent.address"
                   class="form-control border-input" id="address" placeholder="" value="" required>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Inicio</label>
            <input type="date" v-model="formEvent.start_date" class="form-control border-input" id="lastName"
                   placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.start_date.$error">
              Valid last start date is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Fin</label>
            <input type="date" v-model="formEvent.end_date" class="form-control border-input" id="lastName"
                   placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.end_date.$error">
              Valid last end date is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="formEvent.start_hour" class="form-control border-input" id="firstName"
                   placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.start_hour.$error">
              Valid first start hour is required.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Fin</label>
            <input type="time" v-model="formEvent.end_hour" class="form-control border-input" id="firstName"
                   placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.end_hour.$error">
              Valid first end hour is required.
            </div>
          </div>


          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Descripción del evento</label><span class="copys">Max 800 carácteres</span>
            <editor
                v-model="formEvent.description"
                api-key="i90r59222v310rg94hbt9qqb0dylokp439xadul8v8ad9whm"
                :init="{
                max_chars: 800,
                height: 400,
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
            <!--<textarea v-model="formEvent.description" class="form-control border-input"  name="" id="" cols="30" rows="3"></textarea>-->
            <div class="hasError" v-if="$v.formEvent.description.$error">
              Valid first description is required.
            </div>
          </div>
          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Asunto del email de confirmación al evento</label><span class="copys">Max 250 carácteres</span>
            <input type="text" v-model="formEvent.subject_email" class="form-control border-input" id="firstName"
                   placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.subject_email.$error">
              Valid first description is required.
            </div>
          </div>
          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Mensaje de registro al evento (*u para indicar el nombre del usuario, *c la
              contraseña del usuario si hay una contraseña genérica y *e para el evento )</label><span class="copys">Max 3000 carácteres</span>
            <textarea v-model="formEvent.message_email" class="form-control border-input" name="" id="" cols="30"
                      rows="3"></textarea>
            <div class="hasError" v-if="$v.formEvent.message_email.$error">
              Valid first description is required.
            </div>
          </div>
          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Contraseña para todos los usuarios del evento</label> <span class="copys">Max 250 carácteres</span>
            <input readonly type="text" v-model="formEvent.password" class="form-control border-input" cols="30"
                   rows="3"/>
          </div>


        </div>

        <!-- Configurate style -->

        <div class="row">

          <div class="col-md-12 mb-3 px-3">
            <div style="padding-left:2%">
              <input type="checkbox" v-model="showTxtCode" class="form-check-input" id="streaming">
              <label class="form-check-label" for="streaming">Streaming general</label>
            </div>
            <textarea v-if="showTxtCode" v-model="formEvent.code_streaming" class="form-control border-input" name=""
                      id="" cols="30" rows="3"></textarea>
          </div>
          <div class="col-12 px-3">
            <div class="row">
              <div class="col-4 mr-3">
                <label for="firstName">Dominio externo</label>
                <input type="text" v-model="formEvent.domain_external" class="form-control border-input" id="firstName"
                       placeholder="" value="" required="">
              </div>

              <div class="col-6 pl-3">
                <div class="row">
                  <div class="col-12 pl-2">
                    <input type="checkbox" v-model="formEvent.image_on_register" class="form-check-input"
                           id="image_on_register">
                    <label class="form-check-label" for="image_on_register">Habilitar subir imagen de perfil en
                      registro</label>
                  </div>
                  <div class="col-12 pl-2">
                    <input type="checkbox" v-model="formEvent.unique_login" class="form-check-input" id="unique_login">
                    <label class="form-check-label" for="unique_login">Habilitar login unico</label>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mr-3 px-3" v-if="show_person_number">
                <label for="">Limite de asistentes</label>
                <input type="number" v-model="formEvent.person_numbers" class="form-control border-input" required>
              </div>

              <!-- Url para el btn de registro presencial, new implementation -->
              <div class="col-md-5 mr-3" v-if="formEvent.event_type_id !== null && formEvent.event_type_id !== 1">
                <label for="url-btn-register">Url formulario de registro V 1.0</label>
                <input 
                  v-model="formEvent.url_form_register" 
                  type="text" 
                  class="form-control border-input" 
                  placeholder="Ingrese la url del formulario de registro"/>
              </div>
              <!-- Url para el certificado, new implementation -->
              <div class="col-md-5 mx-3">
                <label for="url-btn-register">Url Certificado V 1.0</label>
                <input 
                  v-model="formEvent.url_certificate" 
                  type="text" 
                  class="form-control border-input" 
                  placeholder="Ingrese la url del certificado"/>
              </div>
            </div>
          </div>
          <div class="row px-3">
            <div class="col-12">
              <h4 class="mb-3">Configuración de interacciones</h4>
            </div>
          </div>
          <div class="col-12 pl-4">
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_schedule" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar Cronograma</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_chat" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar chat</label>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_make_question" class="form-check-input"
                       id="image_on_register">
                <label for="firstName">Habilitar hacer preguntas</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_files" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar archivos</label>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_probes" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar sondeo</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_survey" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar encuesta</label>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_networking" class="form-check-input"
                       id="image_on_register">
                <label for="firstName">Habilitar networking</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_chat_event" class="form-check-input"
                       id="image_on_register">
                <label for="firstName">Habilitar chat del evento</label>
              </div>
            </div>

            <div class="row">
              <!-- <div v-if="formEvent.req_networking" class="offset-1 col-5 pt-2"> -->
              <div v-if="formEvent.req_networking" class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_videocall" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar videollamada</label>
              </div>
              <!-- Check active on demand, new implementation -->
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.on_demand" class="form-check-input" id="on_demand">
                <label class="form-check-label" for="on_demand">Habilitar On Demand</label>
              </div>
            </div>

            <!-- component on demand, new implementation -->
            <list-on-demand v-if="formEvent.on_demand" :event_id="eventId" :listOnDemand="listOnDemand"></list-on-demand>

            <div class="row">
              <div class="col-6">
                <h4 class="mb-3">Configuración sistema de pago</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_payment" class="form-check-input" id="image_on_register">
                <label for="firstName">Habilitar sistema de pago (Mercadopago/Payu)</label>
              </div>
            </div>
            <div class="row" v-if="formEvent.req_payment">
              <div class="offset-1 col-4 p-0">
                <label for="country">Tiempo de reunión</label>
                <select class="custom-select d-block w-100" id="country" required="" v-model="formEvent.payment_name">
                  <option value="">Seleccionar...</option>
                  <option value="Mercadopago">Mercadopago</option>
                  <option value="Payu">Payu</option>
                </select>
              </div>
              <div class="offset-1 col-5 pt-2">
                <!-- <input type="checkbox" v-model="formEvent.payment_on_login" class="form-check-input"  id="image_on_register">
                <label for="firstName">Pago despues de registro</label><br> -->
                <input type="checkbox" v-model="formEvent.mode" class="form-check-input" id="image_on_register">
                <label for="firstName">Desarrollo</label>
              </div>

              <div class="offset-1 col-10 p-0" v-if="formEvent.mode==false && formEvent.payment_name!=''">
                <label for="firstName">Key: </label>
                <input type="text" v-model="formEvent.key" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Mercadopago'  && formEvent.mode==false">
                <label for="firstName">Token: </label>
                <input type="text" v-model="formEvent.token" class="form-control border-input" id="firstName"
                       placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode==false">
                <label for="firstName">MerchantId: </label>
                <input type="text" v-model="formEvent.merchantId" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode==false">
                <label for="firstName">AccountId: </label>
                <input type="text" v-model="formEvent.accountId" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode==false">
                <label for="firstName">Api Login: </label>
                <input type="text" v-model="formEvent.api_login" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.mode && formEvent.payment_name!=''">
                <label for="firstName">Key Desarrollo: </label>
                <input type="text" v-model="formEvent.key_dev" class="form-control border-input" id="firstName"
                       placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Mercadopago' && formEvent.mode">
                <label for="firstName">Token Desarrollo: </label>
                <input type="text" v-model="formEvent.token_dev" class="form-control border-input" id="firstName"
                       placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode">
                <label for="firstName">MerchantId Desarrollo: </label>
                <input type="text" v-model="formEvent.merchantId_dev" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode">
                <label for="firstName">AccountId Desarrollo: </label>
                <input type="text" v-model="formEvent.accountId_dev" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode">
                <label for="firstName">Api Login Desarrollo: </label>
                <input type="text" v-model="formEvent.api_login_dev" class="form-control form-control-sm border-input"
                       id="firstName" placeholder="" value="" required="">
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h4 class="mb-3">Configuración Web App</h4>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_web_app" class="form-check-input" id="req_web_app">
                <label for="req_web_app">Habilitar Web App</label>
              </div>
            </div>
            <div class="row" v-if="formEvent.req_web_app">
              <div class="col-12 col-md-6">
                <input type="checkbox" v-model="formEvent.wa_req_path" class="form-check-input" id="wa_req_path">
                <label for="wa_req_path">¿Desea crear URL con dominio propio?</label>
                <div v-if="formEvent.wa_req_path">
                  <input type="text" v-model="formEvent.wa_path_value" class="form-control"
                         placeholder="Dominio personalizado" id="wa_path_value">
                </div>
              </div>
              <div class="col-md-6 col-12">
                <input type="checkbox" v-model="formEvent.wa_req_feria_comercial" class="form-check-input"
                       id="wa_req_feria_comercial">
                <label for="wa_req_feria_comercial">Habilitar feria comercial</label>
              </div>
              <div class="col-12 col-md-6">
                <input type="checkbox" v-model="formEvent.wa_req_mapa" class="form-check-input" id="wa_req_path">
                <label for="wa_req_path">Habilitar mapa</label><span class="copys">700 x 700</span>
                <div v-if="formEvent.wa_req_mapa">
                  <input type="file" @change="mapaUp" class="form-control" placeholder="Mapa del evento"
                         id="wa_mapa_value">
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 offset-9">
            <button type="button" @click="editEvent()" class="btn btn-primary w-100 mt-1 mb-1">Editar</button>
          </div>
        </div>
        <div class="col-6 offset-6 mt-1 mb-4">
          <button class='btn btn-outline-primary mt-1 float-right ml-1' @click.prevent="showHabeasData" type="button">
            habeas Data
          </button>
          <button class='btn btn-outline-primary mt-1 float-right' @click.prevent="showRegisterEvent" type="button">
            Formulario de registro
          </button>
        </div>
      </div>

      <div class="col-md-3 mt-3">
        <router-link :to="{name:'Crear Actividad', params: {eventId:idEvent} }">
          <button type="button" class="btn btn-outline-primary btn-block mt-1">Agregar actividades</button>
        </router-link>
      </div>
      <!-- Configurate style -->

      <!-- Step 01 -->

      <!-- Step 02 -->
      <div id="step02">

        <!-- Actividades  -->

        <div class="row px-3">
          <div class="col-12">
            <h4 class="mb-3">Actividades del evento</h4>
          </div>

          <div class="col-5 offset-7">
            <div class="input-group">
              <input v-model.trim="searchActivity" placeholder="Buscar actividad" @keyup.enter="getActivities"
                     type="text" class="form-control" name="searchTable"/>
              <span class="input-group-btn">
                <button class="btn btn-default m-0" @click.prevent="getActivities"><span
                    class="ti-search"></span></button>
              </span>
            </div>
          </div>

          <div class="col-md-12">

            <table class="table table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Actividad</th>
                <th scope="col">Tipo</th>
                <th scope="col" class="text-right">Opciones</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="activity in activities" :key="activity.id">
                <th scope="row">
                  {{ activity.id }}
                </th>
                <td>{{ activity.name }}</td>
                <td>{{ activity.type_activity.name }}</td>
                <td class="text-right">
                  <button type="button" @click="showActivityMetrics(activity.id)"
                          class="btn btn-outline-primary btn-sm mx-1">
                    <span class="ti-bar-chart"></span>
                  </button>
                  <router-link :to="{name:'Editar Actividad', params: {propActivity:activity.id} }">
                    <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                      <span class="ti-pencil-alt"></span>
                    </button>
                  </router-link>
                  <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                    <span class="ti-trash"></span>
                  </button>

                  <button type="button" @click="showModerator(activity.id)" class="btn btn-outline-secundary  btn-sm">
                    <span class="ti-eye order"></span>
                  </button>

                </td>
              </tr>

              </tbody>
            </table>
            <sliding-pagination
                :current="currentPage"
                :total="totalPages"
                @page-change="getActivities"
            ></sliding-pagination>
          </div>
        </div>


        <!-- Actividades  -->


      </div>

      <!-- Certificado -->
      <div id="step05">

        <!-- Encuestas  -->

        <div class="row px-3">
          <div class="col-12">
            <h4 class="mb-3">Editar encuesta</h4>
          </div>

          <div class="col-12">
            <div class="form-check px-4">
              <input type="checkbox" v-model="formPoll.required_poll" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Quiero que esta encuesta sea obligatoria</label>
            </div>
          </div>

          <div class="col-md-8">
            <label for="lastName">Pregunta</label><span class="copys">Max 300 carácteres</span>
            <textarea name="" class="form-control" v-model="formPoll.description" id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formPoll.description.$error">
              Valid last name is required.
            </div>
          </div>


          <div class="col-md-4">

            <div class="col-md-12 mb-2">
              <label for="country">Tipo</label>
              <select v-model="formPoll.type_question_id" class="custom-select d-block w-100" id="country" required="">
                <option v-for="ctype in typeQuestions" :key="ctype.id" :value="ctype.id">{{ ctype.name }}</option>
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
                <input type="text" v-model="questionOption"
                       class="form-control"
                       id="firstName"
                       placeholder="Ingrese el valor de la repuesta" value="" required="">
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
                    <p class="form-control">
                      {{ option }}
                    </p>
                  </div>
                  <div class="col-md-3 py-0">
                    <button @click="deleteOption(index)" type="button"
                            class="btn btn-outline-primary btn-sm answer-btn">
                      <span class="ti-trash"></span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div class="col-3 offset-9 pt-0">
            <button type="button" class="btn btn-primary w-100 mt-2" @click.prevent="newQuestion()">Agregar</button>
          </div>
          <div class="col-3 offset-9 pt-0" v-if="listQuestions.length > 0">
            <jsonExcel class="btn btn-default w-100 mt-1" name="Encuesta" :fetch="fetchData">Descargar resultados
            </jsonExcel>
          </div>

          <div class="col-md-12" v-if="listQuestions.length > 0">
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
                  {{ question.id }}
                </th>
                <td>{{ question.description }}</td>
                <td>{{ question.type_question }}</td>
                <td v-if="!question.required">No</td>
                <td v-if="question.required">Si</td>
                <td class="text-right">

                  <button @click="showEditPoll(question)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                    <span class="ti-pencil-alt"></span>
                  </button>

                  <button @click="deletePoll(question.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                    <span class="ti-trash"></span>
                  </button>

                  <button @click="updatePositionPoll(question.position, question.event_id)" type="button"
                          class="btn btn-outline-secundary  btn-sm">
                    <span class="ti-split-v order"></span>
                  </button>

                </td>
              </tr>
              </tbody>
            </table>

          </div>

        </div>
        <!-- Encuestas  -->

      </div>
      <hr>
      <invitations v-if="idEvent != null" :add="1" :id="idEvent"></invitations>
    </form>

    <certificate v-if="idEvent != null" :eventId="eventId"/>
    <template v-if="idEvent != null">
      <sticker :event_id="eventId"/>
    </template>

    <editPoll :showModal="showModalPoll.show" :typeQuestions="typeQuestions"
              :questionProp="showModalPoll.poll" @getQuestions="getQuestions">
    </editPoll>
    <registerEvent v-if="idEvent != null" :showModal="regEvent" :eventId="idEvent"/>
    <habeasData v-if="idEvent != null" :showModal="habeasData" :event="idEvent"></habeasData>
    <div class="col-12 text-right">
      <router-link :to="{name:'Mis Eventos'}">
        <button type="button" class="btn btn-outline-primary btn-sm mx-1">
          <span class="ti-arrow-left"></span>
        </button>
      </router-link>
    </div>
  </card>

</template>
<script>
import {required} from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
import editPoll from "@/components/Modals/editPoll"
import invitations from "@/components/Forms/formInvitations"
import registerEvent from "@/components/Modals/registerEvent"
import habeasData from "@/components/Modals/habeasData"
import certificate from "../../landing/Events/components/certificate"
import jsonExcel from "vue-json-excel"
import sticker from "../../landing/Events/components/stickerForm"
import SlidingPagination from 'vue-sliding-pagination'
import Editor from '@tinymce/tinymce-vue'
import ListOnDemand from './components/list-on-demand.vue'
import axios from 'axios'

export default {
  name: 'MyComponent',
  props: ['eventId'],
  components: {
    multiselect,
    editPoll,
    invitations,
    registerEvent,
    habeasData,
    certificate,
    jsonExcel,
    sticker,
    SlidingPagination,
    'editor': Editor,
    ListOnDemand
  },
  data() {
    return {
      countriesEvent: [],
      countrieSelect: null,

      citiesEvent: [],
      citySelect: null,

      eventTypes: [],
      currentPage: 1,
      totalPages: 5,
      dataForExcel: [],
      showTxtCode: false,
      uri: process.env.VUE_APP_URL_FRONT,
      regEvent: false,
      habeasData: false,
      listOptions: [],
      questionOption: '',
      searchActivity: '',
      activities: [],
      idEvent: null,
      modes: [],
      typeQuestions: [],
      listQuestions: [],

      showModalPoll: {
        show: false,
        poll: {},
      },
      formPoll: {
        event_id: null,
        description: null,
        options: [],
        type_question_id: null,
        required: true,
        required_poll: true,
      },
      formEvent: {
        name: '',
        event_type_id: null,
        address: '',
        description: null,
        start_date: null,
        end_date: null,
        start_hour: null,
        end_hour: null,
        city_id: null,
        domain_external: null,
        duration_minutes: 60,
        friendly_url: 'asasdasddas',
        company_id: 1,
        message_email: null,
        subject_email: null,
        code_streaming: null,
        password: null,
        actived: null,
        image_on_register: null,
        unique_login: null,
        req_payment: null,
        payment_on_login: null,
        payment_name: "",
        key: "",
        token: "",
        key_dev: "",
        token_dev: "",
        mode: true,
        req_networking: true,
        req_make_question: true,
        req_files: true,
        req_schedule: true,
        req_probes: true,
        req_survey: true,
        req_chat: true,
        req_chat_event: true,
        req_videocall: true,
        person_numbers: 0,
        merchantId: '',
        accountId: '',
        api_login: '',
        merchantId_dev: '',
        accountId_dev: '',
        api_login_dev: '',
        req_web_app: 0,
        wa_req_path: 0,
        wa_path_value: '',
        wa_req_feria_comercial: 0,
        wa_req_mapa: 0,
        wa_mapa_value: '',
        wa_banner_one: '',
        wa_banner_two: '',
        url_form_register: '',
        url_certificate: '',
        on_demand: false,
      },
      listOnDemand: [],
      show_person_number: false,
    }
  },
  watch: {
    formEvent: {
      handler: function (val, oldVal) {
        if (val.event_type_id == 2 || val.event_type_id == 3) {
          this.show_person_number = true;
        } else {
          this.show_person_number = false;
        }
      },
      deep: true
    }
  },
  validations: {
    formPoll: {
      event_id: {required},
      description: {required},
      type_question_id: {required},
    },
    formEvent: {
      name: {required},
      event_type_id: {required},
      description: {required},
      start_date: {required},
      end_date: {required},
      start_hour: {required},
      end_hour: {required},
      duration_minutes: {required},
      friendly_url: {required},
      company_id: {required},
      message_email: {required},
      subject_email: {required},
      person_numbers: {required},
    },
  },
  mounted() {
    if (this.eventId) {
      this.idEvent = this.eventId
      this.getEvent()
      this.getActivities()
      this.getQuestions(this.idEvent)
      this.getTypeQuestions()
      this.getEventTypes()
    }
  },
  created() {
    console.log("buscando:", this.$v);
    this.getCountriesEvent()
    this.getEventTypes()
  },
  methods: {
    countryName({name}) {
      return `${name}`
    },

    cityName({name}) {
      return `${name}`
    },

    getCountriesEvent() {
      axios.get('get-countries-event').then(res => {
        this.countriesEvent = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },

    getCitiesEvent(country) {
      setTimeout(() => {
        if (country === null) {
        } else {
          this.citySelect = null
          axios.get('get-cities-event/' + country.alpha2Code).then(res => {
            this.citiesEvent = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }
      }, 500)
    },

    bannerOne(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.formEvent.wa_banner_one = files[0];
      let label = document.getElementById("webAppBanner1Label");
      label.innerText = files[0].name;
    },
    bannerTwo(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.formEvent.wa_banner_two = files[0];
      let label = document.getElementById("webAppBanner2Label");
      label.innerText = files[0].name;
    },
    mapaUp(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.formEvent.wa_mapa_value = files[0];
      let label = document.getElementById("wa_mapa_value");
      label.innerText = files[0].name;
    },
    async getEventTypes() {
      const response = await axios.get('eventType').catch(error => {
        this.$swal({icon: 'error', text: error})
      })
      this.eventTypes = response.data.data
    },
    showActivityMetrics(id) {
      axios.get(`activityMetrics/${id}`).then(response => {
        let metrics = response.data
        if (metrics.length == 0) {
          this.$swal({icon: 'error', text: 'No hay datos aún'})
        } else {
          let stringAlert = ''
          stringAlert = 'Total de invitaciones: <b>' + metrics.invitations + '</b><br>' +
              'Total de registrados a la actividad: <b>' + metrics.registers + ' - ' + ((metrics.registers * 100) / metrics.invitations).toFixed(1) + '%</b><br>' +
              'Visualizaciones a la actividad: <b>' + metrics.tracking + ' - ' + ((metrics.tracking * 100) / metrics.invitations).toFixed(1) + '%</b><br>'

          this.$swal.fire({title: '<strong>Métricas</strong>', html: stringAlert})
        }
      }).catch(error => {

      })
    },
    async fetchDataGuests() {
      let response
      response = await axios.get(`reportEventUsers/${this.eventId}?pagination=false`)
     
      if (typeof response.data.data !== 'undefined') {
        if (response.data.data.length == 0) this.$swal({icon: 'error', text: 'No hay datos'})
        return response.data
      } else {
        return response.data
      }

    },
    // Metodo para descargar un reporte de la calificcion de las actividades.
    async getReportRateForEvent() {
      const { data } = await axios.get(`get-report-rate-for-event/${this.eventId}`)
      const { dataReport, status } = data
      
      if ( status == 200 ) {
        return dataReport
      } else {
        this.$swal({icon: 'error', text: 'No hay datos dispónibles.'})
      }
    },
    async fetchData() {
      const response = await axios.get(`exportPoll/${this.eventId}`)
      if (response.data.data.length == 0) this.$swal({icon: 'error', text: 'No hay respuestas registradas'})
      return response.data.data
    },
    showModerator(id) {
      let aux = document.createElement("input");
      let text = this.uri + 'Moderator-event?activityId=' + id
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$swal({icon: 'success', text: 'Url copiada en el portapapeles'})
    },
    showHabeasData() {
      this.habeasData = !this.habeasData
    },
    showRegisterEvent() {
      this.regEvent = !this.regEvent
    },
    showEditPoll(poll) {
      this.showModalPoll.poll = poll
      this.showModalPoll.show = !this.showModalPoll.show
    },
    addOption(option = '') {
      if (option !== "")
        this.listOptions.push(option)
      this.questionOption = ""
    },
    deleteOption(index) {
      this.listOptions.splice(index, 1);
    },
    getTypeQuestions() {
      axios.get('typeQuestions').then(response => {
        this.typeQuestions = response.data.data
      })
    },
    updatePositionPoll(position, eventId) {
      let data = new FormData()

      data.append('position', position)
      data.append('event_id', eventId)

      axios.post('postionQuestionPoll', data).then(response => {
        this.getQuestions(eventId);
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })

    },
    newQuestion() {
      this.formPoll.event_id = this.eventId
      this.$v.formPoll.$touch()
      if (this.$v.formPoll.$error) return
      this.formPoll.options = JSON.stringify(this.listOptions)
      axios.post('pollQuestions', this.formPoll).then(response => {
        this.$swal('Encuesta creada')
        this.formPoll.description = null,
            this.formPoll.type_question_id = null,
            this.listOptions = [],
            this.$v.formPoll.$reset()
        this.getQuestions(this.idEvent)
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    deletePoll(id) {
      axios.delete(`pollQuestions/${id}`).then(response => {
        this.getQuestions(this.idEvent)
        this.$swal('Pregunta eliminada')
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    getQuestions(id) {
      axios.get('pollQuestionsEvent/' + id).then(response => {
        this.listQuestions = response.data.data
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    async getActivities(selectedPage = 1) {
      this.currentPage = selectedPage
      let params
      if (!this.searchActivity || this.searchActivity === '') {
        params = {
          pagination: true,
          per_page: 10,
          page: selectedPage
        }
      } else {
        params = {
          pagination: true,
          per_page: 10,
          page: selectedPage,
          search: this.searchActivity,
        }
      }
      axios.get(`activities-event/${this.idEvent}`, {params}).then(response => {
        this.activities = response.data.data
        this.totalPages = Math.ceil(Number(response.data.pagination.total) / Number(params.per_page))
      })
    },
    getEvent() {
      setTimeout(() =>{
      axios.get('events/' + this.idEvent).then(response => {
      
        const event = response.data
        console.log('datos de la consulta: ', event)
      if(event[0].event_type_id !== 1){
        // alert('joasas');
        this.countrieSelect = event[0].city_event ? event[0].city_event.country_event : {}
        this.citySelect = event[0].city_event || {}
        this.formEvent.address = event[0].address
       }
        this.formEvent.name = event[0].name
        this.formEvent.event_type_id = event[0].event_type_id
        this.formEvent.description = event[0].description
        //this.formEvent.city = event[0].city.name
        this.formEvent.city = event[0].city ? event[0].city.name : ''

        this.formEvent.activities = event[0].activities
        this.formEvent.domain_external = event[0].domain_external
        this.formEvent.unique_login = event[0].unique_login
        this.formEvent.message_email = event[0].message_email
        this.formEvent.subject_email = event[0].subject_email
        this.formEvent.code_streaming = event[0].code_streaming
        this.formEvent.password = event[0].password
        this.formEvent.actived = event[0].actived

        this.formEvent.payment_name = event[0].payment_name
        this.formEvent.unique_login = event[0].unique_login
        this.formEvent.req_payment = event[0].req_payment
        this.formEvent.payment_on_login = event[0].payment_on_login
        this.formEvent.person_numbers = (event[0].person_numbers == null) ? 0 : event[0].person_numbers;


        if (this.formEvent.code_streaming != null) this.showTxtCode = true

        this.formEvent.image_on_register = event[0].image_on_register

        let startEvent = event[0].start_date
        startEvent = startEvent.split(' ')
        this.formEvent.start_date = startEvent[0]
        this.formEvent.start_hour = startEvent[1]

        let endEvent = event[0].end_date
        endEvent = endEvent.split(' ')
        this.formEvent.end_date = endEvent[0]
        this.formEvent.end_hour = endEvent[1]
        this.validateConfStreamingEvent(event[0])
        if (event[0].payment) {
          //Fields of mercadopago
          this.formEvent.key = event[0].payment.key == 0 ? '' : event[0].payment.key
          this.formEvent.token = event[0].payment.token == 0 ? '' : event[0].payment.token
          this.formEvent.key_dev = event[0].payment.key_dev == 0 ? '' : event[0].payment.key_dev
          this.formEvent.token_dev = event[0].payment.token_dev == 0 ? '' : event[0].payment.token_dev

          //Fields of Payu
          this.formEvent.merchantId = event[0].payment.merchantId == 0 ? '' : event[0].payment.merchantId
          this.formEvent.accountId = event[0].payment.accountId == 0 ? '' : event[0].payment.accountId
          this.formEvent.api_login = event[0].payment.api_Login == 0 ? '' : event[0].payment.api_Login
          this.formEvent.merchantId_dev = event[0].payment.merchantId_dev == 0 ? '' : event[0].payment.merchantId_dev
          this.formEvent.accountId_dev = event[0].payment.accountId_dev == 0 ? '' : event[0].payment.accountId_dev
          this.formEvent.api_login_dev = event[0].payment.api_Login_dev == 0 ? '' : event[0].payment.api_Login_dev

          this.formEvent.mode = event[0].payment.mode

        }

        if (this.formEvent.event_type_id == 2 || this.formEvent.event_type_id == 3) {
          this.show_person_number = true
        } else {
          this.show_person_number = false
        }
        //add functionality web app configuration
        this.formEvent.req_web_app = event[0].req_web_app
        this.formEvent.wa_req_path = event[0].wa_req_path
        this.formEvent.wa_path_value = event[0].wa_path_value
        this.formEvent.wa_req_feria_comercial = event[0].wa_req_feria_comercial
        this.formEvent.wa_banner_one = event[0].wa_banner_one
        this.formEvent.wa_banner_two = event[0].wa_banner_two
        this.formEvent.wa_req_mapa = event[0].wa_req_mapa
        this.formEvent.wa_mapa_value = event[0].wa_mapa_value
        this.formEvent.url_form_register = event[0].url_form_register
        this.formEvent.url_certificate = event[0].url_certificate
      })
      }, 1000)
    },
    createDocument() {
      this.$v.formDocument.$touch()
      if (this.$v.formDocument.$error) return

      let data = new FormData

      data.append('name', this.formDocument.name)
      data.append('type', this.formDocument.type)
      data.append('url', this.formDocument.url)
      data.append('model_type', 'activity')
      data.append('model_id', 2)

      axios.post('documents', data).then(response => {
        this.getDocuments()
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    getDocuments() {
      axios.get('modelDocuements/activity/' + 2).then(response => {
        this.allDocuments = response.data.data
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    updatePositionPoll(position, eventId) {
      let data = new FormData()

      data.append('position', position)
      data.append('event_id', eventId)

      axios.post('postionQuestionPoll', data).then(response => {
        this.getQuestions(eventId);
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })

    },
    editEvent() {
      console.log('lalalaaa', this.formEvent.description)
      let date_start = this.formEvent.start_date + ' ' + this.formEvent.start_hour
      let date_end = this.formEvent.end_date + ' ' + this.formEvent.end_hour
      if (this.formEvent.actived === true || this.formEvent.actived === 1) this.formEvent.actived = 1
      else this.formEvent.actived = 0

      if (this.formEvent.image_on_register === true || this.formEvent.image_on_register === 1) this.formEvent.image_on_register = 1
      else this.formEvent.image_on_register = 0

      if (this.formEvent.image_on_register === true || this.formEvent.image_on_register === 1) this.formEvent.image_on_register = 1
      else this.formEvent.image_on_register = 0

      if (this.formEvent.req_payment === true || this.formEvent.req_payment === 1) this.formEvent.req_payment = 1
      else this.formEvent.req_payment = 0

      if (this.formEvent.unique_login === true) this.formEvent.unique_login = 1
      else this.formEvent.unique_login = 0

      if (this.formEvent.mode === true || this.formEvent.mode === 1) this.formEvent.mode = 1
      else this.formEvent.mode = 0

      if (this.formEvent.payment_on_login === true || this.formEvent.payment_on_login === 1) this.formEvent.payment_on_login = 1
      else this.formEvent.payment_on_login = 0

      if (this.formEvent.req_networking === false || this.formEvent.req_networking === 0) this.formEvent.req_networking = 0
      else this.formEvent.req_networking = 1

      if (this.formEvent.req_videocall === false || this.formEvent.req_videocall === 0) this.formEvent.req_videocall = 0
      else this.formEvent.req_videocall = 1

      if (this.formEvent.req_chat === false || this.formEvent.req_chat === 0) this.formEvent.req_chat = 0
      else this.formEvent.req_chat = 1

      if (this.formEvent.req_chat_event === false || this.formEvent.req_chat_event === 0) this.formEvent.req_chat_event = 0
      else this.formEvent.req_chat_event = 1

      if (this.formEvent.req_make_question === false || this.formEvent.req_make_question === 0) this.formEvent.req_make_question = 0
      else this.formEvent.req_make_question = 1

      if (this.formEvent.req_files === false || this.formEvent.req_files === 0) this.formEvent.req_files = 0
      else this.formEvent.req_files = 1

      if (this.formEvent.req_schedule === false || this.formEvent.req_schedule === 0) this.formEvent.req_schedule = 0
      else this.formEvent.req_schedule = 1

      if (this.formEvent.req_probes === false || this.formEvent.req_probes === 0) this.formEvent.req_probes = 0
      else this.formEvent.req_probes = 1

      if (this.formEvent.req_survey === false || this.formEvent.req_survey === 0) this.formEvent.req_survey = 0
      else this.formEvent.req_survey = 1

      if (this.formEvent.person_numbers === false || this.formEvent.person_numbers === 0) this.formEvent.person_numbers = 0

      if(this.formEvent.on_demand === false || this.formEvent.on_demand === 0){
        this.formEvent.on_demand = '0'
      }else{
        this.formEvent.on_demand = '1';
      }

      let data = new FormData()
      for (var key in this.formEvent) {
        if (this.formEvent[key] === true)
          data.append(key, 1);

        else if (this.formEvent[key] === null)
          data.append(key, 0);

        else
          data.append(key, this.formEvent[key]);
      }

      data.append('start_date', date_start)
      data.append('end_date', date_end)
      // JSON.stringify(this.citySelect)
      data.append("city_event_id", this.citySelect ? this.citySelect.id : 0);

      // data.append('name', this.formEvent.name)
      // data.append('event_type_id', this.formEvent.event_type_id)
      // data.append('description', this.formEvent.description)
      // data.append('start_date', date_start)
      // data.append('end_date', date_end)
      // data.append('city_id', this.formEvent.city_id)
      // data.append('image_on_register', (this.formEvent.image_on_register ? 1 : 0))
      // data.append('unique_login',(this.formEvent.unique_login ? 1 : 0))
      // data.append('duration_minutes', this.formEvent.duration_minutes)
      // data.append('friendly_url', this.formEvent.friendly_url)
      // data.append('company_id', this.formEvent.company_id)
      // data.append('message_email', this.formEvent.message_email)
      // data.append('subject_email', this.formEvent.subject_email)
      // data.append('code_streaming', this.formEvent.code_streaming)
      // data.append('domain_external', this.formEvent.domain_external)
      // if(this.formEvent.actived == true ) this.formEvent.actived = 1
      // else this.formEvent.actived = 0
      // data.append('actived', this.formEvent.actived)

      data.append('_method', 'PUT')
      console.log('data:', data)
      axios.post(`events/${this.idEvent}`, data).then(response => {
        this.$swal("Evento editado")
      }).catch(error => {
        if (error.response.status == 422) {
          const errorObj = error.response.data.error
          const errorKeys = (Object.keys(errorObj))
          let textError = ''
          errorKeys.forEach(element => {
            textError = textError + "* " + errorObj[element][0] + "<br>"
          });
          this.$swal({icon: 'error', html: "<p style='color:red'>" + textError + "</p>"})
        } else {
          this.$swal({icon: 'error', text: error})
        }
      })
    },
    deletePoll(id) {
      axios.delete(`pollQuestions/${id}`).then(response => {
        this.getQuestions(this.idEvent)
        this.$swal('Pregunta eliminada')
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    deleteDocument(id) {
      axios.delete(`documents/${id}`).then(response => {
        this.getDocuments()
        this.$swal('Documento eliminado')
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    getQuestions(id) {
      axios.get('pollQuestionsEvent/' + id).then(response => {
        this.listQuestions = response.data.data
      }).catch(error => {
        this.$swal({icon: 'error', text: error})
      })
    },
    getTypeQuestions() {
      axios.get('typeQuestions').then(response => {
        this.typeQuestions = response.data.data
      })
    },
    getModes() {
      axios.get('modeActivities').then(response => {
        this.modes = response.data.data
      })
    },
    showSpeakerForm() {
      this.showSpeaker = !this.showSpeaker
    },
    picSpeaker(e) {
      let files = e.target.files || e.dataTransfer.files
      this.formSpeaker.pic = files[0]
    },
    onFileChange(e) {
      let label
      let files = e.target.files || e.dataTransfer.files
      if (e.target.name == "pic") {
        this.formEvent.pic = files[0]
        label = document.getElementById('logoText')
        label.innerText = files[0].name
      }
      if (e.target.name == "banner") {
        this.formEvent.pic_banner = files[0]
        label = document.getElementById('bannerText')
        label.innerText = files[0].name
      }
      if (e.target.name == "background") {
        label = document.getElementById('backimgText')
        label.innerText = files[0].name
        this.formEvent.pic_background = files[0]
      }

    },
    fileDocument(e) {
      let files = e.target.files || e.dataTransfer.files
      this.formDocument.url = files[0]
    },
    picActivity(e) {
      let files = e.target.files || e.dataTransfer.files
      this.formActivity.pic = files[0]
    },
    createSpeaker() {
      this.$v.formSpeaker.$touch()
      if (this.$v.formSpeaker.$error) return

      let data = new FormData()

      data.append('name', this.formSpeaker.name)
      data.append('sort_description', this.formSpeaker.sort_description)
      data.append('pic', this.formSpeaker.pic)

      axios.post('speakers', data).then(response => {
        this.getSpeakers()
        this.showSpeaker = false
      })

    },
    createEvent() {

      this.$v.formEvent.$touch()

      if (this.$v.formEvent.$error) return

      this.formEvent.start_date = this.formEvent.start_date + ' ' + this.formEvent.start_hour
      this.formEvent.end_date = this.formEvent.end_date + ' ' + this.formEvent.end_hour

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

      data.append('image_on_register', (this.formEvent.image_on_register ? 1 : 0))
      data.append('unique_login', (this.formEvent.unique_login ? 1 : 0))

      axios.post('events', data).then(response => {
        this.idEvent = response.data.data.id
        this.$swal('Evento creado')
      }).catch(error => {
        this.$swal({
          icon: 'error', text: error,
        })
      })
    },
    getTypesActivity() {
      axios.get('typesActivities').then(response => {
        this.typesActivity = response.data.data
      })
    },
    async createActivity() {

      this.$v.formActivity.$touch()
      if (this.$v.formActivity.$error) return
      this.$v.listSpeakers.$touch()
      if (this.$v.listSpeakers.$error) return

      const dateStart = this.formActivity.start_date
      this.formActivity.start_date = this.formActivity.start_date + ' ' + this.formActivity.start_hour
      this.formActivity.end_date = dateStart + ' ' + this.formActivity.end_hour

      let data = new FormData()
      data.append('event_id', 2)
      data.append('name', this.formActivity.name)
      data.append('sort_description', this.formActivity.sort_description)
      data.append('type_activity_id', this.formActivity.type_activity_id)
      data.append('start_date', this.formActivity.start_date)
      data.append('end_date', this.formActivity.end_date)
      data.append('unit_price', this.formActivity.unit_price)
      data.append('guests_limit', this.formActivity.guests_limit)
      data.append('city_id', this.formActivity.city_id)
      data.append('mode_id', this.formActivity.mode_id)
      data.append('country_id', this.formActivity.country_id)
      data.append('pic', this.formActivity.pic)
      data.append('tags', this.formActivity.tags)
      data.append('location_coordinates', this.formActivity.location_coordinates)
      data.append('address', this.formActivity.address)
      data.append('duration_minutes', this.formActivity.duration_minutes)
      data.append('code_streaming', this.formActivity.code_streaming)
      data.append('friendly_url', this.formActivity.friendly_url)
      data.append('company_id', this.formActivity.company_id)


      await axios.post('activities', data).then(response => {
        let activityId = response.data.data.id
        this.listSpeakers.map(item => {
          let dataForm = {speaker_id: item.id, activity_id: activityId}
          axios.post('activitySpeakers', dataForm).catch(error => {
            alert("Error speaker");
          })
        })
      }).catch(error => {
        alert("Error al crear actividad");
      })
      alert("Actividad creada")
    },
    getSpeakers() {
      axios.get('speakers').then(response => {
        this.speakers = response.data.data
      })
    },
    getDataOnDemand() {
      axios.get(`on-demand/${ this.idEvent }`)
        .then( resp => {
          this.listOnDemand = resp.data;
        })
    },
    validateConfStreamingEvent(confEvent) {
      if (confEvent) {

        if (typeof confEvent.req_networking !== 'undefined' && confEvent.req_networking == 0) this.formEvent.req_networking = false
        else this.formEvent.req_networking = true

        if (typeof confEvent.req_videocall !== 'undefined' && confEvent.req_videocall == 0) this.formEvent.req_videocall = false
        else this.formEvent.req_videocall = true

        if (typeof confEvent.req_make_question !== 'undefined' && confEvent.req_make_question == 0) this.formEvent.req_make_question = false
        else this.formEvent.req_make_question = true

        if (typeof confEvent.req_files !== 'undefined' && confEvent.req_files == 0) this.formEvent.req_files = false
        else this.formEvent.req_files = true

        if (typeof confEvent.req_schedule !== 'undefined' && confEvent.req_schedule == 0) this.formEvent.req_schedule = false
        else this.formEvent.req_schedule = true

        if (typeof confEvent.req_probes !== 'undefined' && confEvent.req_probes == 0) this.formEvent.req_probes = false
        else this.formEvent.req_probes = true

        if (typeof confEvent.req_survey !== 'undefined' && confEvent.req_survey == 0) this.formEvent.req_survey = false
        else this.formEvent.req_survey = true

        if (typeof confEvent.req_chat !== 'undefined' && confEvent.req_chat == 0) this.formEvent.req_chat = false
        else this.formEvent.req_chat = true

        if (typeof confEvent.req_chat_event !== 'undefined' && confEvent.req_chat_event == 0) this.formEvent.req_chat_event = false
        else this.formEvent.req_chat_event = true

        if(typeof confEvent.on_demand !== 'undefined' && confEvent.on_demand == 0) {
          this.formEvent.on_demand = false 
        } else {
          this.formEvent.on_demand = true; 
          this.getDataOnDemand();
        }  
      }
    }
  },
  mount() {
    this.show()
  }
};


</script>

<style>
.copys {
  color: red;
  font-size: 10px;
  padding-left: 1%;
}

.btn-sm {
  font-size: 1rem !important;
  padding-right: 1rem;
  padding-left: 1rem;
}

.btn-sm
.order {
  color: black;
  cursor: move;
}

.btn-invitaciones {
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
