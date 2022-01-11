<template>
  <card class="card" title="Nuevo Evento">

  <form class="needs-validation" novalidate="">

  <!-- Step 01 -->
    <div id="step01" v-if="steps.step1">

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
        <div class="col-md-6 mb-3">
          <label for="firstName">Nombre</label><span class="copys">Max 100 carácteres</span>
          <input type="text" v-model="formEvent.name" v-model.trim="$v.formEvent.name.$model" class="form-control border-input" id="firstName" placeholder="" value="" required="">
          <div class="hasError" v-if="$v.formEvent.name.$error">
            Valid first name is required or incorrect length.
          </div>
        </div>
        <div class="col-md-6 mb-3">
            <label for="country">Tipo de evento</label>
            <select v-model="formEvent.event_type_id" class="custom-select d-block w-100" id="country" required="">
              <option v-for="vtype in eventTypes" :key="vtype.id" :value="vtype.id">{{vtype.name}}</option>
            </select>
            <div class="hasError" v-if="$v.formEvent.event_type_id.$error">
              Please select a valid type.
            </div>
          </div>
        <div class="col-md-6 mb-3">
          <br/>
          <br/>
          <div class="form-check px-4">
            <!--
            <input type="checkbox" v-model="showCertification" class="form-check-input" id="certificado">
            <label class="form-check-label" for="certificado">Habilitar Certificado</label>
-->
          </div>
        </div>
      </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Inicio</label>
            <input type="date" v-model="formEvent.start_date" class="form-control border-input" id="lastName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.start_date.$error">
              Valid last start date is required or incorrect length.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Fin</label>
            <input type="date" v-model="formEvent.end_date" class="form-control border-input" id="lastName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.end_date.$error">
              Valid last end date is required or incorrect length.
            </div>
          </div>

           <div class="col-md-3 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="formEvent.start_hour" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.start_hour.$error">
              Valid first start hour is required or incorrect length.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Fin</label>
            <input type="time" v-model="formEvent.end_hour" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.end_hour.$error">
              Valid first end hour is required or incorrect length.
            </div>
          </div>



          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Descripción del evento</label><span class="copys">Max 800 carácteres</span>
            <textarea maxlength="800" v-model="formEvent.description" class="form-control border-input"  name="" id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formEvent.description.$error">
              Valid first description is required or incorrect length.
            </div>
          </div>

          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Asunto del email de confirmación al evento</label><span class="copys">Max 40 carácteres</span>
            <input type="text" v-model="formEvent.subject_email" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formEvent.subject_email.$error">
              Valid first subject is required or incorrect length.
            </div>
          </div>
          <div class="col-md-12 mb-3 px-3">
            <label for="firstName">Email de confirmación registro al evento (*u para indicar el nombre del usuario, *c la contraseña del usuario si hay una contraseña genérica y *e para el evento )</label> <span class="copys">Max 3000 carácteres</span>
            <textarea v-model="formEvent.message_email" class="form-control border-input"  name="" id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formEvent.message_email.$error">
              Valid first message is required or incorrect length.
            </div>
          </div>
          <div class="col-md-6 mb-3 px-3">
            <label for="firstName">Contraseña para todos los usuarios del evento</label> <span class="copys">Max 250 carácteres</span>
            <input type="text" v-model="formEvent.password" class="form-control border-input" cols="30" rows="3"/>
            <div class="hasError" v-if="$v.formEvent.password.$error">
              Valid first password is required or incorrect length.
            </div>
          </div>
          <div class="col-5 mr-3">
              <label for="firstName">Dominio externo</label>
              <input type="text" v-model="formEvent.domain_external" class="form-control border-input" id="firstName" placeholder="" value="" required="">
            </div>
            <div class="col-md-6 mr-3 px-3" v-if="show_person_number">
              <label for="">Limite de asistentes</label>
              <input type="number" v-model= "formEvent.person_numbers" class="form-control border-input" required>
            </div>
        </div>

        <!-- Configurate style -->

        <div class="row">

          <div class="col-md-12 mb-3 px-3">
          <div style="padding-left:2%">
              <input type="checkbox" v-model="formEvent.image_on_register" class="form-check-input" id="image_on_register">
              <label class="form-check-label" for="image_on_register">Habilitar subir imagen de perfil en registro</label>
            </div>
            <div style="padding-left:2%">
              <input type="checkbox" v-model="formEvent.unique_login" class="form-check-input" id="unique_login">
              <label class="form-check-label" for="unique_login">Habilitar login unico</label>
            </div>
            <div style="padding-left:2%">
              <input type="checkbox" v-model="showTxtCode" class="form-check-input" id="streaming">
              <label class="form-check-label" for="streaming">Streaming general</label>
            </div>

            <textarea v-if="showTxtCode" v-model="formEvent.code_streaming" class="form-control border-input"  name="" id="" cols="30" rows="3"></textarea>
          </div>
          <div class="row px-3">
            <div class="col-12">
              <h4 class="mb-3">Configuración de interacciones</h4>
            </div>
         </div>
          <div class="col-12 pl-4" >
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_schedule" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar Cronograma</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_chat" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar chat</label>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_make_question" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar hacer preguntas</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_files" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar archivos</label>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_probes" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar sondeo</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_survey" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar encuesta</label>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_networking" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar networking</label>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_chat_event" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar chat del evento</label>
              </div>
            </div>
            <div class="row" v-if="formEvent.req_networking">
              <div class="offset-1 col-5 pt-2">
                <input type="checkbox" v-model="formEvent.req_videocall" class="form-check-input"  id="image_on_register">
                <label for="firstName">Habilitar videollamada</label>
              </div> 
            </div>            
            <div class="row">
              <div class="col-6">
                <h4 class="mb-3">Configuración sistema de pago</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_payment" class="form-check-input"  id="image_on_register">
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
              <div class="offset-1 col-5 pt-2" >
                <!-- <input type="checkbox" v-model="formEvent.payment_on_login" class="form-check-input"  id="image_on_register">
                <label for="firstName">Pago despues de registro</label> -->
                <input type="checkbox" v-model="formEvent.mode" class="form-check-input"  id="image_on_register">
                <label for="firstName">Desarrollo</label>
              </div> 

              <div class="offset-1 col-10 p-0" v-if="formEvent.mode==false && formEvent.payment_name!=''">
                <label for="firstName">Key: </label>
                <input type="text" v-model="formEvent.key" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Mercadopago' && formEvent.mode==false">
                <label for="firstName">Token: </label>
                <input type="text" v-model="formEvent.token" class="form-control border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode==false">
                <label for="firstName">MerchantId: </label>
                <input type="text" v-model="formEvent.merchantId" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode==false">
                <label for="firstName">AccountId: </label>
                <input type="text" v-model="formEvent.accountId" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode==false">
                  <label for="firstName">Api Login: </label>
                  <input type="text" v-model="formEvent.api_login" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.mode && formEvent.payment_name!=''">
                <label for="firstName" >Key Desarrollo: </label>
                <input type="text" v-model="formEvent.key_dev" class="form-control border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Mercadopago' && formEvent.mode">
                <label for="firstName" >Token Desarrollo: </label>
                <input type="text" v-model="formEvent.token_dev" class="form-control border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode">
                <label for="firstName">MerchantId Desarrollo: </label>
                <input type="text" v-model="formEvent.merchantId_dev" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode">
                <label for="firstName">AccountId Desarrollo: </label>
                <input type="text" v-model="formEvent.accountId_dev" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="offset-1 col-10 p-0" v-if="formEvent.payment_name=='Payu' && formEvent.mode">
                  <label for="firstName">Api Login Desarrollo: </label>
                  <input type="text" v-model="formEvent.api_login_dev" class="form-control form-control-sm border-input" id="firstName" placeholder="" value="" required="">
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h4 class="mb-3">Configuración Web App</h4>
              </div>
              <div class="col-6 pl-4">
                <input type="checkbox" v-model="formEvent.req_web_app" class="form-check-input"  id="req_web_app">
                <label for="req_web_app">Habilitar Web App</label>
              </div>  
            </div>
            <div class="row" v-if="formEvent.req_web_app">              
              <div class="col-12 col-md-6">
                <input type="checkbox" v-model="formEvent.wa_req_path" class="form-check-input"  id="wa_req_path">
                <label for="wa_req_path">¿Desea crear URL con dominio propio?</label>                
                <div v-if="formEvent.wa_req_path">
                  <input type="text" v-model="formEvent.wa_path_value" class="form-control" placeholder="Dominio personalizado"  id="wa_path_value">
                </div>
              </div>         
              <div class="col-md-6 col-12">
                <input type="checkbox" v-model="formEvent.wa_req_feria_comercial" class="form-check-input"  id="wa_req_feria_comercial">
                <label for="wa_req_feria_comercial">Habilitar feria comercial</label>
              </div>
              <div class="col-12 col-md-6">
                <input type="checkbox" v-model="formEvent.wa_req_mapa" class="form-check-input"  id="wa_req_path">
                <label for="wa_req_path">Habilitar mapa</label>                
                <div v-if="formEvent.wa_req_mapa">
                  <input type="file" @change="mapaUp" class="form-control" placeholder="Mapa del evento"  id="wa_mapa_value">
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 pl-6" >
            
            <button v-if="steps.step2" class='btn' @click.prevent="showHabeasData" type="button">habeas Data</button>
            <button v-if="steps.step2" style="margin-left:4px;" class='btn' @click.prevent="showRegisterEvent" type="button">Formulario de registro</button>
          </div>

        </div>
        <!-- Configurate style -->


      <!-- Certificado -->
        <div class="row" v-if="showCertification">

          <div class="col-md-12">


          <h4 class="mb-3">Certificado del Evento</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Titulo</label>
              <input type="text" v-model="formEvent.name" v-model.trim="$v.formEvent.name.$model" class="form-control border-input" id="firstName" placeholder="" value="" required="">
              <div class="hasError" v-if="$v.formEvent.name.$error">
                Valid first name is required or incorrect length.
              </div>
            </div>

            <div class="col-md-6 mb-3"></div>



          </div>


            <!-- Configurate style -->

            <div class="row">

              <div class="col-md-6">
                <div class="col-md-12 mb-3">
                  <label for="firstName">Logo</label>
                  <div class="custom-file">
                    <input type="file" @change="onFileChange" class="custom-file-input" id="imageEvento" accept="image/*">
                    <label class="custom-file-label" for="imageEvento">Seleccionar</label>
                  </div>
                  <div class="hasError" v-if="$v.formEvent.pic.$error">
                    Valid first image file is required or incorrect length.
                  </div>
                </div>

                <div class="col-md-12 mb-3">
                  <label for="firstName">Imagen de fondo</label>
                  <div class="custom-file">
                    <input type="file"  class="custom-file-input" id="imageEvento">
                    <label class="custom-file-label" for="imageEvento">Seleccionar</label>
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

            <div class="col-md-12 mb-3 add">
              <div class="row add-wrapper">
                <div class="col-md-3">
                  <label for="firstName">Agregar Firma</label>
                  <div class="custom-file">
                    <input type="file"  class="custom-file-input" id="imageEvento">
                    <label class="custom-file-label" for="imageEvento">Seleccionar</label>
                  </div>
                </div>
                <div class="col-md-3">
                    <button type="button" class="btn btn-info add-btn">
                      <span class="ti-plus"></span>
                    </button>
                </div>
              </div>

            <hr/>

              <div class="row add-list">
                <div class="col-md-12">

                  <div class="row">

                    <div class="col-md-3 py-0">
                      <label for="firstName"></label>
                      <p class="form-control" >
                        Firma 1
                      </p>
                    </div>
                    <div class="col-md-3 py-0">
                        <button type="button" class="btn btn-outline-primary btn-sm add-btn mx-1">
                          <span class="ti-pencil-alt2"></span>
                        </button>

                        <button type="button" class="btn btn-outline-primary btn-sm add-btn">
                          <span class="ti-trash"></span>
                        </button>
                    </div>

                  </div>

                  <div class="row">

                    <div class="col-md-3">
                      <label for="firstName"></label>
                      <p class="form-control" >
                        Firma 2
                      </p>
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-outline-primary btn-sm add-btn mx-1">
                          <span class="ti-pencil-alt2"></span>
                        </button>

                        <button type="button" class="btn btn-outline-primary btn-sm add-btn">
                          <span class="ti-trash"></span>
                        </button>
                    </div>

                  </div>



                </div>
              </div>



          </div>
          </div>
        </div>
      <!-- Fin Certificado -->

     

        <div class="row" v-if="showBtnCreate">
            <div class="col-md-9"></div>
            <div class="col-md-3">
              <button
                @click="createEvent()"
                type="button"
                class="btn btn-outline-primary btn-block">Crear evento</button>
            </div>
        </div>
    </div>
  <!-- Step 01 -->

  <!-- Step 02 -->
    <div id="step02" v-if="steps.step2">

      <!-- Actividades  -->

        <div class="row px-3">
          <div class="col-12">
            <h4 class="mb-3">Actividad del evento</h4>
          </div>
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre</label><span class="copys">Max 200</span>
            <input type="text" v-model="formActivity.name" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.name.$error">
              Valid first name is required or incorrect length.
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
              <option v-for="ctype in typesActivity" :key="ctype.id" :value="ctype.id">{{ctype.name}}</option>
            </select>
            <div class="hasError" v-if="$v.formActivity.type_activity_id.$error">
              Please select a valid type.
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="firstName">Fecha de la actividad</label>
            <input type="date" v-model="formActivity.start_date" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.start_date.$error">
              Valid first name is required or incorrect length.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input type="time" v-model="formActivity.start_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.start_hour.$error">
              Valid first name is required or incorrect length.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Fin</label>
            <input type="time" v-model="formActivity.end_hour" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formActivity.end_hour.$error">
              Valid first name is required or incorrect length.
            </div>
          </div>

          <!-- <div class="col-md-1 mb-3"></div> -->

            <div class="col-md-3 mb-3" v-if="formActivity.type_activity_id == 2">
                <label for="firstName">Valor de la actividad</label>
                <input type="text" v-model="formActivity.unit_price" class="form-control" id="firstName" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.formActivity.unit_price.$error && formActivity.type_activity_id == 2">
                  Valid first name is required or incorrect length.
                </div>
            </div>

            <div class="col-md-3 mb-3">
                <label for="firstName">Limite de asistentes</label>
                <input type="text" v-model="formActivity.guests_limit" class="form-control" id="firstName" placeholder="" value="" required="">
            </div>




          <div class="col-md-3 mb-3">
            <label for="firstName">Banner de la actividad</label><span class="copys">512x382</span>
            <div class="custom-file">
              <input type="file" name="banner" @change="picActivity" class="custom-file-input" id="actBanner" accept="image/*">
              <label class="custom-file-label" id="bannerAct" for="actBanner">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formActivity.pic.$error">
              Valid first name is required or incorrect length.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="firstName">Fondo de la actividad</label><span class="copys">1366x768</span>
            <div class="custom-file">
              <input type="file" name="background" @change="picActivity" class="custom-file-input" id="actBg" accept="image/*">
              <label class="custom-file-label" id="bgAct" for="actBg">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formActivity.pic_banner.$error">
              Valid first name is required or incorrect length.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Descripción</label><span class="copys">Max 400 carácteres</span>
            <textarea name="" v-model="formActivity.sort_description" class="form-control"  id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formActivity.sort_description.$error">
              Valid last name is required or incorrect length.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="lastName">Código del streaming</label><span class="copys">Si dejas vacío este campo se tomará el streaming general</span>
            <textarea name="" v-model="formActivity.code_streaming" class="form-control"  id="" cols="30" rows="2"></textarea>
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
             <hr>
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
            <label for="lastName">Nombre completo</label><span class="copys">Max 100 carácteres</span>
            <input type="text" v-model="formSpeaker.name" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="hasError" v-if="$v.formSpeaker.name.$error">
              Valid last name is required or incorrect length.
            </div>
          </div>

          <div v-if="showSpeaker" class="col-md-4 mb-3">
            <label for="firstName">Imagen</label><span class="copys">77 X 77</span>
            <div class="custom-file">
              <input type="file" @change="picSpeaker" class="custom-file-input" id="imageSpeaker" accept="image/*">
              <label class="custom-file-label" id="speakerImage" for="imageSpeaker">Seleccionar</label>
            </div>
            <div class="hasError" v-if="$v.formSpeaker.pic.$error">
              Valid first name is required or incorrect length.
            </div>
          </div>

          <div v-if="showSpeaker" class="col-md-12 mb-3">
            <label for="lastName">Descripción</label><span class="copys">Max 400 carácteres</span>
            <textarea v-model="formSpeaker.sort_description" class="form-control"  id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formSpeaker.sort_description.$error">
              Valid last name is required or incorrect length.
            </div>
          </div>


          <!-- Speaker -->

        </div>
        <div class="row">
            <div class="col-md-2 md-3" v-if="showSpeaker == false && showBtnsAct==true">
              <button
                @click="showMenus('invitation')"
                type="button"
                class="btn btn-outline-primary btn-block">Crear invitaciones</button>
            </div>
            <div class="col-md-2 md-3" v-if="showSpeaker == false && showBtnsAct==true">
              <button
                @click="showMenus('material')"
                type="button"
                class="btn btn-outline-primary btn-block">Adjuntar material</button>
            </div>
            <div class="col-md-4 md-3 ml-auto" v-if="showSpeaker == false">
              <button
                @click.prevent="createActivity()"
                type="button"
                class="btn btn-outline-primary btn-block">Crear actividad</button>
            </div>
            </div>

        <div class="row px-3">
            <div class="col-md-9">

               <div v-if="showSpeaker" class="col-md-4">
            <button @click.prevent="createSpeaker()"
              type="button"
              class="btn btn-outline-primary ">Crear Speaker</button>
          </div>
            </div>
        </div>

    </div>
  <!-- Step 03 -->

  <!-- Step 04 -->
    <documents v-if="dataDocs.id != 0" :showForm="steps.step2" :model="dataDocs"></documents>


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
    <div id="step05" v-if="steps.step2">

              <!-- Encuestas  -->

        <div class="row px-3" >
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
            <label for="lastName">Pregunta</label><span class="copys">Max 300 carácteres</span>
            <textarea name="" class="form-control" v-model="formPoll.description"  id="" cols="30" rows="3"></textarea>
            <div class="hasError" v-if="$v.formPoll.description.$error">
              Valid last name is required or incorrect length.
            </div>
          </div>


          <div class="col-md-4 mb-3">

            <div class="col-md-12 mb-3">
              <label for="country">Tipo</label>
              <select v-model="formPoll.type_question_id" class="custom-select d-block w-100" id="country" required="">
                <option v-for="cutype in typeQuestions" :key="cutype.id" :value="cutype.id"> {{cutype.name}} </option>
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
            <button type="button" class="btn btn-outline-primary" @click.prevent="addQuestion()" >Agregar</button>
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

    </div>
  
    <invitations v-if="steps.step3" :add="addAct" :id="idEnvInv" /> </invitations>

  </form>

  <habeasData v-if="steps.step2"  :showModal="habeasData" :event="idEvent"></habeasData>

  <editPoll :showModal="showModalPoll.show" :typeQuestions="typeQuestions"
    :questionProp="showModalPoll.poll" @getQuestions="getQuestions">
  </editPoll>
  <registerEvent v-if="steps.step2"  :showModal="regEvent"  :eventId="idEvent" />
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
import {
  required,
  minLength,
  maxLength,
  between,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";
import multiselect from "@/components/ownMultiselect/OwnMultiselect";
import documents from "@/components/Forms/formDocuments";
import editPoll from "@/components/Modals/editPoll";
import registerEvent from "@/components/Modals/registerEvent";
import habeasData from "@/components/Modals/habeasData";
import invitations from "@/components/Forms/formInvitations";

export default {
  name: "MyComponent",
  components: {
    multiselect,
    documents,
    editPoll,
    invitations,
    habeasData,
    registerEvent,
  },
  data() {
    return {
      eventTypes: [],
      showTxtCode: false,
      showBtnCreate: true,
      addAct: 1,
      habeasData: false,
      idEnvInv: null,
      showCertification: false,
      steps: {
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
        step6: false,
      },
      formDocument: {
        name: null,
        type: null,
        url: "",
        type: "",
      },
      formPoll: {
        event_id: null,
        description: null,
        options: [],
        type_question_id: null,
        required: true,
        required_poll: true,
      },
      formSpeaker: {
        name: null,
        sort_description: null,
        pic: {},
      },
      dataDocs: {
        id: 0,
        model: "activity",
      },
      showBtnsAct: false,
      questionOption: "",
      listOptions: [],
      showDivSpeaker: false,
      showSpeaker: false,
      listSpeakers: [],
      speakers: [],
      typesActivity: [],
      idEvent: 0,
      formActivity: {
        name: null,
        sort_description: null,
        type_activity_id: null,
        start_date: null,
        end_date: null,
        start_hour: null,
        end_hour: null,
        unit_price: 0,
        guests_limit: 0,
        city_id: 1,
        country_id: 1,
        mode_id: 1,
        pic: {},
        pic_banner: {},
        tags: "text",
        location_coordinates: "321321",
        address: "aasdasd",
        duration_minutes: 60,
        code_streaming: null,
        friendly_url: "asasdasddas",
        company_id: 1,
        speaker_id: 1,
        domain_external: null,
        pic_banner: [],
        pic_background: [],
      },
      formEvent: {
        name: "",
        event_type_id: null,
        description: null,
        start_date: null,
        end_date: null,
        start_hour: null,
        end_hour: null,
        city_id: 1,
        duration_minutes: 60,
        friendly_url: "asasdasddas",
        company_id: 1,
        message_email:
          "Hola *u, te has registrado exitosamente al evento *e. Tu contraseña para iniciar sesión es: *c",
        subject_email: "Confirmación de registro",
        code_streaming: null,
        password: null,
        actived: true,
        image_on_register: null,
        unique_login: null,
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
        merchantId :'',
        accountId :'',
        api_login :'',
        merchantId_dev :'',
        accountId_dev :'',
        api_login_dev :'',
        req_web_app:0,
        wa_req_path:0,
        wa_path_value:'',
        wa_req_feria_comercial:0,
        wa_req_mapa:0,
        wa_mapa_value:'',
        wa_banner_one:'',
        wa_banner_two:'',
      },
      waConfiguration:{
        idEventlasd:0,
      },
      modes: [],
      typeQuestions: [],
      listQuestions: [],
      allDocuments: [],
      listActivities: [],
      regEvent: false,
      showModalPoll: {
        poll: {},
        show: false,
      },
      show_person_number: false,      
    };
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
      deep: true,
    },
    path_wa(){
      var domain = this.formEvent.wa_path_value.replace(/[^a-zA-Z_0-9]/g, '')        
      this.formEvent.wa_path_value = domain
    }
  },
  validations: {
    formDocument: {
      name: { required },
      type: { required },
      url: { required },
      type: { required },
    },
    formPoll: {
      event_id: { required },
      description: { required },
      type_question_id: { required },
    },
    formSpeaker: {
      name: { required },
      sort_description: { required },
      pic: { required },
    },
    formEvent: {
      name: { required, maxLength: maxLength(500) },
      event_type_id: { required },
      description: { required, maxLength: maxLength(800) },
      start_date: { required },
      end_date: { required },
      start_hour: { required },
      end_hour: { required },
      duration_minutes: { required },
      friendly_url: { required },
      company_id: { required },
      message_email: { required },
      subject_email: { required },
      password: { maxLength: maxLength(250) },
      person_numbers: { required },
    },
    listSpeakers: { required },
    formActivity: {
      name: { required, minLength: minLength(10), maxLength: maxLength(199) },
      sort_description: { required, maxLength: maxLength(400) },
      type_activity_id: { required },
      start_date: { required },
      start_hour: { required },
      end_hour: { required },
      unit_price: { required },
      mode_id: { required },
      pic: { required },
      pic_banner: { required },
    },
  },
  created() {
    console.log("Buscando:", this.$v);
    this.getTypesActivity();
    this.getSpeakers();
    this.getModes();
    this.getTypeQuestions();
    this.getEventType();
    this.getLastIdEvent();
  },
  methods: {    
    mapaUp(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.formEvent.wa_mapa_value = files[0];
      let label = document.getElementById("wa_mapa_value");
      label.innerText = files[0].name;
    },
    async getLastIdEvent(){
      const response = await axios.get("lastedIdEvent").catch((error) => {
        //this.$swal({ icon: "error", text: error });
      });
      this.waConfiguration.idEventlasd = response.data.data.id;
    },
    async getEventType() {
      const response = await axios.get("eventType").catch((error) => {
        this.$swal({ icon: "error", text: error });
      });
      this.eventTypes = response.data.data;
    },
    showHabeasData() {
      this.habeasData = !this.habeasData;
    },
    showRegisterEvent() {
      this.regEvent = !this.regEvent;
    },
    showEditPoll(poll) {
      this.showModalPoll.poll = poll;
      this.showModalPoll.show = !this.showModalPoll.show;
    },
    addOption(option = "") {
      if (option !== "") this.listOptions.push(option);
      this.questionOption = "";
    },
    deleteOption(index) {
      this.listOptions.splice(index, 1);
    },
    getActivities() {
      axios
        .get("activities-event/" + this.idEvent)
        .then((response) => {
          this.listActivities = response.data.data;
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    showMenus(element) {
      if (element == "material") {
        this.steps.step4 = !this.steps.step4;
        this.steps.step6 = false;
      }
      if (element == "invitation") {
        this.steps.step6 = !this.steps.step6;
        this.steps.step4 = false;
      }
    },
    getDocuments() {
      axios
        .get("modelDocuements/activity/" + this.idActivity)
        .then((response) => {
          this.allDocuments = response.data.data;
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    updatePositionPoll(position, eventId) {
      let data = new FormData();

      data.append("position", position);
      data.append("event_id", eventId);

      axios
        .post("postionQuestionPoll", data)
        .then((response) => {
          this.getQuestions(eventId);
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    addQuestion() {
      this.formPoll.event_id = this.idEvent;
      this.$v.formPoll.$touch();
      if (this.$v.formPoll.$error) return;
      this.formPoll.options = JSON.stringify(this.listOptions);
      axios
        .post("pollQuestions", this.formPoll)
        .then((response) => {
          this.$swal("Encuesta creada");
          (this.formPoll.description = null),
            (this.formPoll.type_question_id = null),
            (this.listOptions = []),
            this.$v.formPoll.$reset();
          this.getQuestions(this.idEvent);
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    deletePoll(id) {
      axios
        .delete(`pollQuestions/${id}`)
        .then((response) => {
          this.getQuestions(this.idEvent);
          this.$swal("Pregunta eliminada");
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    getQuestions(id) {
      axios
        .get("pollQuestionsEvent/" + id)
        .then((response) => {
          this.listQuestions = response.data.data;
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    getTypeQuestions() {
      axios.get("typeQuestions").then((response) => {
        this.typeQuestions = response.data.data;
      });
    },
    getModes() {
      axios.get("modeActivities").then((response) => {
        this.modes = response.data.data;
      });
    },
    showSpeakerForm() {
      this.showSpeaker = !this.showSpeaker;
    },
    picSpeaker(e) {
      let label;
      let files = e.target.files || e.dataTransfer.files;
      this.formSpeaker.pic = files[0];
      label = document.getElementById("speakerImage");
      //console.log(files[0].name)
      label.innerText = files[0].name;
    },
    onFileChange(e) {
      let label;
      let files = e.target.files || e.dataTransfer.files;
      if (e.target.name == "pic") {
        this.formEvent.pic = files[0];
        label = document.getElementById("logoText");
        label.innerText = files[0].name;
      }
      if (e.target.name == "banner") {
        this.formEvent.pic_banner = files[0];
        label = document.getElementById("bannerText");
        label.innerText = files[0].name;
      }
      if (e.target.name == "background") {
        label = document.getElementById("backimgText");
        label.innerText = files[0].name;
        this.formEvent.pic_background = files[0];
      }
    },
    picActivity(e) {
      let label;
      let files = e.target.files || e.dataTransfer.files;
      if (e.target.name == "banner") {
        this.formActivity.pic_banner = files[0];
        label = document.getElementById("bannerAct");
        label.innerText = files[0].name;
      }
      if (e.target.name == "background") {
        this.formActivity.pic = files[0];
        label = document.getElementById("bgAct");
        label.innerText = files[0].name;
      }
    },
    createSpeaker() {
      this.$v.formSpeaker.$touch();
      if (this.$v.formSpeaker.$error) return;

      let data = new FormData();

      data.append("name", this.formSpeaker.name);
      data.append("sort_description", this.formSpeaker.sort_description);
      data.append("pic", this.formSpeaker.pic);

      axios.post("speakers", data).then((response) => {
        this.getSpeakers();
        this.showSpeaker = false;
      });
    },
    createEvent() {
      this.$v.formEvent.$touch();
      if (this.$v.formEvent.$error) return;
      let date_start =
        this.formEvent.start_date + " " + this.formEvent.start_hour;
      let date_end = this.formEvent.end_date + " " + this.formEvent.end_hour;
      if (date_start > date_end) {
        this.$swal({
          icon: "error",
          text: "La fecha de inicio es mayor a la fecha de finalización",
        });
        return;
      }

      if (this.formEvent.actived === true || this.formEvent.actived === 1)
        this.formEvent.actived = 1;
      else this.formEvent.actived = 0;

      if (
        this.formEvent.image_on_register === true ||
        this.formEvent.image_on_register === 1
      )
        this.formEvent.image_on_register = 1;
      else this.formEvent.image_on_register = 0;

      if (
        this.formEvent.image_on_register === true ||
        this.formEvent.image_on_register === 1
      )
        this.formEvent.image_on_register = 1;
      else this.formEvent.image_on_register = 0;

      if (
        this.formEvent.req_payment === true ||
        this.formEvent.req_payment === 1
      )
        this.formEvent.req_payment = 1;
      else this.formEvent.req_payment = 0;

      if (this.formEvent.unique_login === true) this.formEvent.unique_login = 1;
      else this.formEvent.unique_login = 0;

      if (this.formEvent.mode === true || this.formEvent.mode === 1)
        this.formEvent.mode = 1;
      else this.formEvent.mode = 0;

      if (
        this.formEvent.payment_on_login === true ||
        this.formEvent.payment_on_login === 1
      )
        this.formEvent.payment_on_login = 1;
      else this.formEvent.payment_on_login = 0;

      if (
        this.formEvent.req_networking === false ||
        this.formEvent.req_networking === 0
      )
        this.formEvent.req_networking = 0;
      else this.formEvent.req_networking = 1;

      if (
        this.formEvent.req_videocall === false ||
        this.formEvent.req_videocall === 0
      )
        this.formEvent.req_videocall = 0;
      else this.formEvent.req_videocall = 1;

      if (this.formEvent.req_chat === false || this.formEvent.req_chat === 0)
        this.formEvent.req_chat = 0;
      else this.formEvent.req_chat = 1;

      if (this.formEvent.req_chat_event === false || this.formEvent.req_chat_event === 0)
        this.formEvent.req_chat_event = 0;
      else this.formEvent.req_chat_event = 1;

      if (
        this.formEvent.req_make_question === false ||
        this.formEvent.req_make_question === 0
      )
        this.formEvent.req_make_question = 0;
      else this.formEvent.req_make_question = 1;

      if (this.formEvent.req_files === false || this.formEvent.req_files === 0)
        this.formEvent.req_files = 0;
      else this.formEvent.req_files = 1;

      if (
        this.formEvent.req_schedule === false ||
        this.formEvent.req_schedule === 0
      )
        this.formEvent.req_schedule = 0;
      else this.formEvent.req_schedule = 1;

      if (
        this.formEvent.req_probes === false ||
        this.formEvent.req_probes === 0
      )
        this.formEvent.req_probes = 0;
      else this.formEvent.req_probes = 1;

      if (
        this.formEvent.req_survey === false ||
        this.formEvent.req_survey === 0
      )
        this.formEvent.req_survey = 0;
      else this.formEvent.req_survey = 1;

      if (
        this.formEvent.person_numbers === false ||
        this.formEvent.person_numbers === 0
      )
        this.formEvent.person_numbers = 0;
      
      //wa path domain
      if(this.formEvent.wa_path_value == ''){
        this.formEvent.wa_path_value = 'webapp'+this.waConfiguration.idEventlasd
      }
      let data = new FormData();
      for (var key in this.formEvent) {
        if (this.formEvent[key] === true) data.append(key, 1);
        else if (this.formEvent[key] === null) data.append(key, 0);
        else data.append(key, this.formEvent[key]);
      }

      data.append("start_date", date_start);
      data.append("end_date", date_end);

      // data.append('name', this.formEvent.name)
      // data.append('event_type_id', this.formEvent.event_type_id)
      // data.append('description', this.formEvent.description)
      // data.append('start_date', date_start)
      // data.append('end_date', date_end)
      // data.append('city_id', this.formEvent.city_id)
      // data.append('duration_minutes', this.formEvent.duration_minutes)
      // data.append('friendly_url', this.formEvent.friendly_url)
      // data.append('company_id', this.formEvent.company_id)
      // data.append('message_email', this.formEvent.message_email)
      // data.append('subject_email', this.formEvent.subject_email)
      // data.append('code_streaming', this.formEvent.code_streaming)
      // data.append('domain_external', this.formEvent.domain_external)
      // data.append('password', this.formEvent.password)
      // data.append('image_on_register', (this.formEvent.image_on_register ? 1 : 0))
      // data.append('unique_login',(this.formEvent.unique_login ? 1: 0))
      // if(this.formEvent.actived == true ) this.formEvent.actived = 1
      // else this.formEvent.actived = 0
      // data.append('actived', this.formEvent.actived) SI PARA FEBRERO DE 2022 TODO OK BORRAR
      this.showBtnCreate = false;      
      // return;      

      axios
        .post("events", data)
        .then((response) => {
          this.steps.step2 = true;
          this.idEvent = response.data.data.id;          
          this.$swal("Evento creado");
        })
        .catch((error) => {
          this.showBtnCreate = true;
          if (error.response.status == 422) {
            const errorObj = error.response.data.error;
            const errorKeys = Object.keys(errorObj);
            let textError = "";
            errorKeys.forEach((element) => {
              textError = textError + "* " + errorObj[element][0] + "<br>";
            });
            this.$swal({
              icon: "error",
              html: "<p style='color:red'>" + textError + "</p>",
            });
          } else {
            this.$swal({ icon: "error", text: error });
          }
        });
    },
    getTypesActivity() {
      axios.get("typesActivities").then((response) => {
        this.typesActivity = response.data.data;
      });
    },
    createActivity() {
      this.$v.formActivity.$touch();
      if (this.$v.formActivity.$error) return;
      this.$v.listSpeakers.$touch();
      if (this.$v.listSpeakers.$error) return;

      let date_start =
        this.formActivity.start_date + " " + this.formActivity.start_hour;
      let date_end =
        this.formActivity.start_date + " " + this.formActivity.end_hour;

      if (
        this.formActivity.start_date < this.formEvent.start_date ||
        this.formActivity.end_date > this.formEvent.end_date
      ) {
        this.$swal({
          icon: "error",
          text: "Las fechas no corresponden a las del evento",
        });
        return;
      }
      if (date_start > date_end) {
        this.$swal({
          icon: "error",
          text: "La fecha de inicio es mayor a la fecha de finalización",
        });
        return;
      }

      let data = new FormData();
      data.append("event_id", this.idEvent);
      data.append("name", this.formActivity.name);
      data.append("sort_description", this.formActivity.sort_description);
      data.append("type_activity_id", this.formActivity.type_activity_id);
      data.append("start_date", date_start);
      data.append("end_date", date_end);
      data.append("unit_price", this.formActivity.unit_price);
      data.append("guests_limit", this.formActivity.guests_limit);
      data.append("city_id", this.formActivity.city_id);
      data.append("mode_id", this.formActivity.mode_id);
      data.append("country_id", this.formActivity.country_id);
      data.append("pic", this.formActivity.pic);
      data.append("pic_banner", this.formActivity.pic_banner);
      data.append("tags", this.formActivity.tags);
      data.append(
        "location_coordinates",
        this.formActivity.location_coordinates
      );
      data.append("address", this.formActivity.address);
      data.append("duration_minutes", this.formActivity.duration_minutes);
      data.append("code_streaming", this.formActivity.code_streaming);
      data.append("friendly_url", this.formActivity.friendly_url);
      data.append("company_id", this.formActivity.company_id);

      axios
        .post("activities", data)
        .then((response) => {
          this.steps.step4 = true;
          this.showBtnsAct = true;
          let activityId = response.data.data.id;
          this.idActivity = activityId;
          this.dataDocs.id = response.data.data.id;
          this.idEnvInv = this.idEvent;
          this.steps.step3 = true;
          this.getActivities();
          this.addAct++;
          this.listSpeakers.map((item) => {
            let dataForm = { speaker_id: item.id, activity_id: activityId };
            axios.post("activitySpeakers", dataForm).catch((error) => {
              this.$swal({ icon: "error", text: error });
            });
          });
          this.formActivity.name = null;
          this.formActivity.mode_id = null;
          this.formActivity.type_activity_id = null;
          this.formActivity.start_date = null;
          this.formActivity.start_hour = null;
          this.formActivity.end_hour = null;
          this.formActivity.sort_description = null;
          this.formActivity.code_streaming = null;
          this.listSpeakers = [];
          this.$v.listSpeakers.$reset();
          this.$v.formActivity.$reset();

          this.$swal("Actividad creada");
        })
        .catch((error) => {
          if (error.response.status == 422) {
            const errorObj = error.response.data.error;
            const errorKeys = Object.keys(errorObj);
            let textError = "";
            errorKeys.forEach((element) => {
              textError = textError + "* " + errorObj[element][0] + "<br>";
            });
            this.$swal({
              icon: "error",
              html: "<p style='color:red'>" + textError + "</p>",
            });
          } else {
            this.$swal({ icon: "error", text: error });
          }
        });
    },
    deleteActivity(id) {
      axios
        .delete("activities/" + id)
        .then((response) => {
          this.getActivities();
          this.$swal("Actividad eliminada");
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });
    },
    getSpeakers() {
      axios.get("speakers?pagination=false").then((response) => {
        this.speakers = response.data;
      });
    },
  },
  mount() {
    this.show();
  },
};
</script>
<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #9b3ea0;
}

input:focus + .slider {
  box-shadow: 0 0 1px #9b3ea0;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
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

.btn-sm .order {
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

.add-btn {
  margin-top: 20px !important;
}
</style>
