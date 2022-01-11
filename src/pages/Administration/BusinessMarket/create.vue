<template>
  <card class="card" title="Nueva Rueda de Negocio / Plan Premium">
    <!--<div class="col-md-12">
        <button
          @click="$modal.show('crear-invitaciones')"
          type="button"
          class="btn btn-outline-primary btn-invitaciones">Crear Invitaciones</button>
      </div>-->

    <div class="col-md-12 order-md-1">
      <h4 class="mb-3">Detalles Rueda de Negocio</h4>
      <form class="needs-validation" novalidate="">
        <!-- step 1 -->

      <!-- step 1 -->
          <div class="row">
            <div class="col-4">
              <jsonExcel style="margin-left: 83%;" class="btn btn-outline-primary btn-sm mx-1"  name="ReporteRegistrados.csv" type="csv" :fetch="fetchDataUsers">Reporte de registrados</jsonExcel>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Nombre</label>
              <input type="text" class="form-control" id="firstName" placeholder="" v-model="form_init.name" required="">
              <div class="hasError" v-if="$v.form_init.name.$error">
                El nombre es requerido.
              </div>
              <div class="hasError" v-if="!$v.form_init.name.minLength">
                Debe tener mas de 6 caracteres.
              </div>
            
            <div class="hasError" v-if="!$v.form_init.name.minLength">
              Debe tener mas de 6 caracteres.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Inicio</label>
            <input
              type="date"
              class="form-control"
              id="lastName"
              placeholder=""
              v-model="form_init.start_date"
              required=""
            />
            <div class="hasError" v-if="$v.form_init.start_date.$error">
              Valid last start date is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="lastName">Fecha Fin</label>
            <input
              type="date"
              class="form-control"
              id="lastName"
              placeholder=""
              v-model="form_init.end_date"
              required=""
            />
            <div class="hasError" v-if="$v.form_init.end_date.$error">
              Valid last end date is required.
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Inicio</label>
            <input
              type="time"
              class="form-control"
              id="firstName"
              placeholder=""
              v-model="form_init.start_time"
              required=""
            />
            <div class="hasError" v-if="$v.form_init.start_time.$error">
              Valid first start time is required.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Hora Fin</label>
            <input
              type="time"
              class="form-control"
              id="firstName"
              placeholder=""
              v-model="form_init.end_time"
              required=""
            />
            <div class="hasError" v-if="$v.form_init.end_time.$error">
              Valid first end time is required.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="country">Modo</label>
            <select
              class="custom-select d-block w-100"
              id="country"
              required=""
              v-model="form_init.mode"
            >
              <option value="">Seleccionar...</option>
              <option>Presencial</option>
              <option>Virtual</option>
            </select>
            <div class="hasError" v-if="$v.form_init.mode.$error">
              Please select a valid type.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="country">Tipo</label>
            <select
              class="custom-select d-block w-100"
              id="country"
              required=""
              v-model="form_init.type"
            >
              <option value="">Seleccionar...</option>
              <option>Abierto</option>
              <option>Privado</option>
            </select>
            <div class="hasError" v-if="$v.form_init.type.$error">
              Please select a valid type.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="country">Tiempo de reunión</label>
            <select class="custom-select d-block w-100" id="country" required="" v-model="form_init.time_meeting">
              <option value="">Seleccionar...</option>
              <option value="5">5min</option>
              <option value="10">10min</option>
              <option value="15">15min</option>
              <option value="20">20min</option>
              <option value="30">30min</option>
              <option value="45">45min</option>
              <option value="60">60min</option>
              <option value="90">90min</option>
              <option value="120">120min</option>
            </select>
            <div class="hasError" v-if="$v.form_init.time_meeting.$error">
              Please select a valid type.
            </div>
          </div>
          
          <div class="col-md-3 mb-3">
            <label for="firstName">Limite invitados</label>
            <input
              type="number"
              class="form-control"
              id="firstName"
              placeholder=""
              v-model="form_init.guests_limit"
              required=""
            />
            <div class="hasError" v-if="$v.form_init.guests_limit.$error">
              Valid first name is required.
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <label for="firstName">Lugar</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder=""
              v-model="form_init.location_coordinates"
              required=""
            />
            <div
              class="hasError"
              v-if="$v.form_init.location_coordinates.$error"
            >
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="firstName">Contraseña por defecto</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="Opcional"
              v-model="form_init.password"
              required=""
            />
          </div>

          <div class="col-md-12 mb-1">
            <label for="firstName">Descripción del evento</label>
            <textarea
              class="form-control"
              name=""
              id=""
              cols="30"
              rows="3"
              v-model="form_init.sort_description"
            ></textarea>
            <div class="hasError" v-if="$v.form_init.sort_description.$error">
              Debe ingresar una descripcion
            </div>
            <div
              class="hasError"
              v-if="!$v.form_init.sort_description.minLength"
            >
              La descripcion tener mas de 6 caracteres
            </div>
            <div
              class="hasError"
              v-if="!$v.form_init.sort_description.maxLength"
            >
              Maximo 400 caracteres.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="firstName"
              >Asunto del email de confirmación al evento</label
            ><span class="copys">Max 40 carácteres</span>
            <input
              type="text"
              v-model="form_init.subject_email"
              class="form-control border-input"
              id="firstName"
              placeholder=""
              value=""
              required=""
            />
            <div class="hasError" v-if="$v.form_init.subject_email.$error">
              Valid first description is required.
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <label for="firstName"
              >Mensaje de registro al evento (*u para indicar el nombre del
              usuario, *e para el evento y *c para contraseña del usuario si hay
              una contraseña genérica )</label
            ><span class="copys">Max 300 carácteres</span>
            <textarea
              v-model="form_init.message_email"
              class="form-control border-input"
              name=""
              id=""
              cols="30"
              rows="3"
            ></textarea>
            <div class="hasError" v-if="$v.form_init.message_email.$error">
              Valid first description is required.
            </div>
          </div>
        </div>

        <!-- Configurate style -->
        <div class="row">
          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Logo</label>
              <div class="custom-file">
                <input
                  type="file"
                  name="pic"
                  class="custom-file-input"
                  id="logoEvento"
                  @change="onFileChange"
                  accept="image/*"
                  multiple="false"
                />
                <label
                  class="custom-file-label"
                  for="logoEvento"
                  id="labellogoEvento"
                  >Seleccionar</label
                >
                <span class="copys">250x250</span>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Banner</label>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imageEvento"
                  @change="onFileChange"
                  accept="image/*"
                  multiple="false"
                />
                <label
                  class="custom-file-label"
                  for="imageEvento"
                  id="labelimageEvento"
                  >Seleccionar</label
                >
                <span class="copys">512x382</span>
              </div>
              <!-- <div class="hasError" v-if="$v.form_init.pic.$error">
                  File required.
                </div> -->
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Imagen de fondo</label>
              <div class="custom-file">
                <input
                  type="file"
                  name="pic"
                  class="custom-file-input"
                  id="backgroundEvento"
                  @change="onFileChange"
                  accept="image/*"
                  multiple="false"
                />
                <label
                  class="custom-file-label"
                  for="backgroundEvento"
                  id="labelbackgroundEvento"
                  >Seleccionar</label
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Color principal</label>
              <input
                type="color"
                class="form-control border-input"
                id="firstName"
                placeholder=""
                v-model="form_init.principal_color"
                required=""
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Color secundario</label>
              <input
                type="color"
                class="form-control border-input"
                id="firstName"
                placeholder=""
                v-model="form_init.secondary_color"
                required=""
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="col-md-12 mb-3">
              <label for="firstName">Color terciario</label>
              <input
                type="color"
                class="form-control border-input"
                id="firstName"
                placeholder=""
                v-model="form_init.third_color"
                required=""
              />
            </div>
          </div>
        

        <!--segementation actived -->
        
          <!-- <h4>Habilitar segmentación</h4> -->
          
            <!-- <label v-if="formEvent.segmentation_actived"> segmentación activa</label>
            <label v-else> segmentación inactiva</label>
            <br />
            <label class="switch">
              <input type="checkbox" v-model="formEvent.segmentation_actived" />
              <span class="slider round"></span>
            </label> -->
            <div class="col-5 pl-4 ml-3">
              
                <input
                  type="checkbox"
                  v-model="formEvent.segmentation_actived"
                  class="form-check-input"
                  id="streaming"
                />
                <label class="form-check-label" for="streaming">Habilitar segmentación</label>
            </div>
            <div class="col-6 " >
              <input type="checkbox" v-model="form_init.unique_login" class="form-check-input" id="unique_login">
              <label class="form-check-label" for="unique_login">Habilitar login unico</label>
            </div>
          
      </div>
        <!--segmentation actived end -->

        <!-- Configurate style -->

        <div class="col-5 offset-7" v-if="submitBusinessMarket.visibility">
          <button
            class="btn btn-primary mt-0 w-100"
            type="submit"
            @click.prevent="accionSubmitBusiness"
          >
            {{ submitBusinessMarket.name }}
          </button>
        </div>
</form>
</div>
        <div class="col-md-12" id="message-create-bussiness-market">
            <div class="alert alert-success" role="alert" v-if="submitBusinessMarket.postMessage.visibility">
              <strong>Excelente!</strong> {{submitBusinessMarket.postMessage.message}}.
            </div>
        </div>
      
      
   
      <div class="col-md-12 mb-0 " v-if="idBM != null">
        <h4 class="mb-0">Formulario de registro</h4>
        
            <button style="margin-left:4px;" class='btn btn-outline-primary' @click.prevent="showRegisterForm" type="button">Formulario de registro</button>
          <button
                class="btn btn-outline-primary ml-2"
                @click.prevent="showHabeasFormFunction"
                type="button"
              >
                habeas Data
              </button>

        

        
        <div class="col-md-12 mb-0" v-if="idBM != null">
          <h4 class="mb-2">Encuesta feedback</h4>
          <feedback :business_id="idBM" />
        </div>

        <div class="col-md-12 mb-2" v-if="idBM != null">
          <h4 class="mb-3">Asociar usuarios a rueda de negocios</h4>
          <multiselect
            :options="listUsers"
            v-model="listUsersSelected"
            width="100px"
            track-by="name"
            :multiple="true"
            label="name"
            :close-on-select="false"
            :clear-on-select="false"
          />
          <div class="col-md-3 mb-3">
            <button class="btn btn-outline-primary" @click.prevent="addBM">
              Guardar
            </button>
          </div>
        </div>
        <!-- step 2 -->

        <!-- step 2 -->
      
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h4 class="">Control de correos</h4>
        </div>
        <div class="col-12">
          <jsonExcel
            style="margin-left: 83%"
            class="btn btn-outline-primary btn-sm mx-1"
            name="emails.xlsx"
            :fetch="EmailRegistro"
            >Correos de registro</jsonExcel
          >
        </div>
      </div>
    </div>

    <!-- Invitaciones -->

    <registerFieldsForm :showModal="showCustomFieldsForm" :business_id="idBM" />
    <habeasData :showModal="showHabeasForm" :business_id="idBM" />
  </card>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import multiselect from "@/components/ownMultiselect/OwnMultiselect";
import registerFieldsForm from "./components/CustomRegisterConfigForm";
import habeasData from "./components/BMHabeas";
import feedback from "./components/Feedback";
import jsonExcel from "vue-json-excel";

export default {
  name: "MyComponent",
  components: {
    multiselect,
    registerFieldsForm,
    habeasData,
    feedback,
    jsonExcel,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showCustomFieldsForm: false,
      showHabeasForm: false,
      uri: process.env.VUE_APP_URL_FRONT,
      form_init: {
        name: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        pic: "",
        type: "",
        mode: "",
        guests_limit: "",
        location_coordinates: "",
        sort_description: "",
        logo: "",
        background_banner: "",
        principal_color: "",
        secondary_color: "",
        third_color:"",
        time_meeting:"",
        subject_email:"",
        message_email:"",
        password:"",
        unique_login:""
      },
      submitBusinessMarket: {
        name: "Crear rueda de negocio",
        visibility: true,
        postMessage: {
          visibility: false,
          message: "Creado...",
        },
      },
      formEvent: {
        segmentation_actived: false,
      },
      idBM: "",
      listUsers: [],
      listUsersSelected: [],
    };
  },
  validations() {
    let form_init_val = {
      form_init: {
        name: { required, minLength: minLength(6) },
        start_date: { required },
        end_date: { required },
        start_time: { required },
        end_time: { required },
        message_email: { required },
        subject_email: { required },
        mode: { required },
        type: { required },
        guests_limit: { required },
        location_coordinates: { required },
        sort_description: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(400),
        },
        time_meeting: { required },
      },
    };

    if (this.id !== null) {
      form_init_val.form_init.pic = "";
    }

    return form_init_val;
  },
  watch: {
    idBM: function (newid) {
      if (newid) this.getParticipants(newid);
    },
  },
  created() {
    if (this.id !== null) {
      this.submitBusinessMarket = {
        name: "Actualizar rueda de negocio",
        visibility: true,
        postMessage: {
          visibility: false,
          message: "Actualizado...",
        },
      };
      this.getBussinesMarket();
    }
    this.getListUsers();
  },
  methods: {
    async fetchDataUsers(){
        let response
        response = await axios.get(`bm-report/${this.id}?pagination=false`)
        if(typeof response.data.data !== 'undefined'){
          if(response.data.data.length == 0) this.$swal({icon:'error', text:'No hay datos'})
          return response.data
        }else{
          return response.data
        }
        
      },
    async EmailRegistro(){
            let response
                response = await axios.get(`email-track-report/bm/${this.idBM}?pagination=false`)
            if(response.data.data.length == 0) this.$swal({icon:'error', text:'No hay datos'})
            return response.data.data
      },
    showLanding(id){
      let aux = document.createElement("input");
      let text = this.uri + "landing-business-market/" + id;
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.$swal({ icon: "success", text: "Enlace copiado en portapapeles" });
    },
    showRegisterForm() {
      this.showCustomFieldsForm = !this.showCustomFieldsForm;
    },
    showHabeasFormFunction() {
      this.showHabeasForm = !this.showHabeasForm;
    },
    getParticipants(id) {
      console.log("Funciona particpantes");
      axios.get(`participants/${id}`).then((data) => {
        let participants = data.data.data;

        participants.map((item) => {
          const found = this.listUsers.filter((el) => el.id === item.id);
          //console.log(found)
          if (found) this.listUsersSelected.push(found[0]);
        });
      });
    },
    addBM() {
      if (this.idBM === "" && this.id === null) {
        this.$swal({ icon: "error", text: "Falta crear rueda de negocio" });
        return;
      }

      let toSave = (toSave = {
        data: this.listUsersSelected,
        action: "associate",
      });

      if (this.id !== null)
        toSave = {
          ...toSave,
          business_id: this.id,
        };
      else
        toSave = {
          ...toSave,
          business_id: this.idBM,
        };

      axios
        .post(`business-market-rel-user`, toSave)
        .then((res) => {
          this.$swal("Asociados los usuarios");
        })
        .catch((e) => {
          console.error("Ocurrio un error");
        });
    },
    getListUsers() {
      const user = localStorage.getItem("_current_user_id");
      axios.get(`users`).then((res) => {
        this.idBM = this.id;
        this.listUsers = res.data.data.filter((item) => {
          if (item.id != user) return item;
        });
      });
    },
    accionSubmitBusiness() {
      console.log("Hello");
      if (this.idBM === null) {
        this.makeBusinessMarket();
      } else {
        this.updateBusinessMarket();
      }
    },
    updateBusinessMarket() {
      if (this.id !== null) this.idBM = this.id;

      this.$v.form_init.$touch();
      if (this.$v.form_init.$error) return;

      let tmp_start = this.form_init.start_date
      let tmp_end = this.form_init.end_date
      this.form_init.start_date = this.form_init.start_date+' '+this.form_init.start_time
      this.form_init.end_date = this.form_init.end_date+' '+this.form_init.end_time
      this.form_init.unique_login = this.form_init.unique_login ? 1 : 0

      let final_form = new FormData()
      for ( var key in this.form_init) {
          final_form.append(key, this.form_init[key]);
      }

      for (var key in this.formEvent) {
        final_form.append(key, this.formEvent[key] == true ? 1 : 0);
      }
      this.form_init.start_date = tmp_start;
      this.form_init.end_date = tmp_end;

      axios
        .post(`business-market/${this.idBM}?_method=PUT`, final_form)
        .then((result) => {
          this.$swal("Rueda de negocios actualizada");
        })
        .catch((e) => {
          this.$swal({ icon: "error", text: e });
        });
    },
    getBussinesMarket() {
      console.log(`ID del business market:${this.id}`);
      axios.get(`business-market/${this.id}`).then((data) => {
        const allData = data.data;
        console.log("toda la data:", allData);
        this.formEvent.segmentation_actived =
          allData.segmentation_actived == null ||
          allData.segmentation_actived == false
            ? false
            : true;
        //Coloco nombres de archivo en label
        const labelbackgroundEvento = document.getElementById(
          "labelbackgroundEvento"
        );
        labelbackgroundEvento.innerText = allData.background_banner;
        const labelimageEvento = document.getElementById("labelimageEvento");
        labelimageEvento.innerText = allData.pic;
        const labellogoEvento = document.getElementById("labellogoEvento");
        labellogoEvento.innerText = allData.logo;

        this.form_init = allData;
        this.form_init = {
          ...this.form_init,
          start_date: this.$moment(allData.start_date).format("YYYY-MM-DD"),
          end_date: this.$moment(allData.end_date).format("YYYY-MM-DD"),
          start_time: this.$moment(allData.start_date).format("HH:mm:ss"),
          end_time: this.$moment(allData.end_date).format("HH:mm:ss"),
        };
      });
    },
    makeBusinessMarket(){
      this.$v.form_init.$touch()
      if(this.$v.form_init.$error) return

      let tmp_start = this.form_init.start_date
      let tmp_end = this.form_init.end_date
      this.form_init.start_date = this.form_init.start_date+' '+this.$moment(this.form_init.start_time,'HH:mm').format('HH:mm:ss')
      //console.log(this.form_init.start_date)
      this.form_init.end_date = this.form_init.end_date+' '+this.$moment(this.form_init.end_time,'HH:mm').format('HH:mm:ss')
      this.form_init.unique_login = this.form_init.unique_login ? 1 : 0

      let final_form = new FormData()

      for ( var key in this.form_init) {
        final_form.append(key, this.form_init[key]);
      }

      for (var key in this.formEvent) {
        final_form.append(key, this.formEvent[key] == true ? 1 : 0);
      }

      this.form_init.start_date = tmp_start;
      this.form_init.end_date = tmp_end;

      axios
        .post("business-market", final_form)
        .then((result) => {
          this.idBM = result.data.data.id;
          this.$swal("Rueda de negocios creada");

          this.submitBusinessMarket.name = "Actualizar rueda de negocio";
        })
        .catch((e) => {
          this.$swal({ icon: "error", text: e });
        });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (e.target.id === "logoEvento") this.form_init.logo = files[0];
      if (e.target.id === "imageEvento") this.form_init.pic = files[0];
      if (e.target.id === "backgroundEvento")
        this.form_init.background_banner = files[0];
      let labels = document.getElementsByClassName("custom-file-label");
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor === e.target.id)
          labels[i].innerText = files[0].name;
      }
    },
    show() {
      this.$modal.show("crear-invitaciones");
    },
    hide() {
      this.$modal.hide("crear-invitaciones");
    },
  },
  mount() {
    this.show();
  },
};
</script>
<style>
.count {
  display: block;
  font-size: 40px;
  text-align: center;
  background: #f2f2f2;
  border-radius: 10px;
  padding: 5px 20px;
  color: blueviolet;
  font-weight: bold;
}
.countRest {
  font-size: 20px;
  color: #545252;
}
td {
  padding: 0;
}
</style>
