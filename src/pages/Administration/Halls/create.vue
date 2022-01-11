<template>
  <card class="card" title="Nueva Sala">
    <form class="needs-validation" novalidate="">
      <!-- Step 01 -->
      <div id="step01">
        <h4 class="mb-3">Detalles de la Sala</h4>
        <div class="row">
          <div class="col-md-6">
            <div class="row p-3">
              <div class="col-md-12 mb-3">
                <label for="hallType">Tipo de sala</label>
                <select
                  v-model="formHall.hall_type_id"
                  @change="changeHallType()"
                  class="custom-select d-block w-100"
                  name="hall_type"
                  id="hall_type"
                >
                  <option
                    v-for="mytype in hallTypes"
                    :key="mytype.id"
                    :value="mytype.id"
                  >
                    {{ mytype.name }}
                  </option>
                </select>
                <div class="hasError" v-if="$v.formHall.hall_type_id.$error">
                  Please select a valid type.
                </div>
              </div>
              <div v-if="show.domain_external" class="col-md-12 mb-3">
                <label for="firstName">Link externo</label>
                <input
                  type="text"
                  v-model="formHall.domain_external"
                  v-model.trim="$v.formHall.domain_external.$model"
                  class="form-control border-input border-input"
                  id="firstName"
                  placeholder=""
                  value=""
                  required=""
                />
                <div class="hasError" v-if="$v.formHall.domain_external.$error">
                  Valid domain external is required.
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <label for="firstName">Nombre</label>
                <input
                  type="text"
                  v-model="formHall.name"
                  v-model.trim="$v.formHall.name.$model"
                  class="form-control border-input border-input"
                  id="firstName"
                  placeholder=""
                  value=""
                  required=""
                />
                <div class="hasError" v-if="$v.formHall.name.$error">
                  Valid first name is required or incorrect length.
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label for="firstName"
                  >Imagen de la Sala en el home del evento</label
                >
                <div class="custom-file">
                  <input type="file" @change="picBg" class="custom-file-input" id="imageEvento" />
                  <label
                    class="custom-file-label"
                    id="picHall"
                    for="imageEvento"
                    >Seleccionar</label
                  >
                </div>
                <div class="hasError" v-if="$v.formHall.pic.$error">
                  Valid first pic is required.
                </div>
              </div>

              <div v-if="show.pic_banner" class="col-md-12 mb-3">
                <label for="firstName">Banner la Sala</label>
                <div class="custom-file">
                  <input
                    type="file"
                    @change="picBanner"
                    class="custom-file-input"
                    id="bannerEvento"
                  />
                  <label
                    class="custom-file-label"
                    id="picHallBanner"
                    for="bannerEvento"
                    >Seleccionar</label
                  >
                </div>
                <div class="hasError" v-if="$v.formHall.pic_banner.$error">
                  Valid first pic is required.
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label for="firstName">Descripción de la Sala</label>
                <editor
                  v-model="formHall.description"
                  api-key="i90r59222v310rg94hbt9qqb0dylokp439xadul8v8ad9whm"
                  :init="{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'link undo redo | bold italic | alignleft aligncenter alignright alignjustify',
                  }"
                />
                <!--<textarea v-model="formHall.description" class="form-control border-input"  name="" id="" cols="30" rows="3"></textarea>-->
                <div class="hasError" v-if="$v.formHall.description.$error">
                  Valid first description is required or incorrect length.
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6"></div>
        </div>
        <div class="row p-3">
          <div class="col-md-9">
            <label for="validationDefault04">Ubicación (mostrar ubicación de las salas presenciales)</label>
              <input type="text" v-model="formHall.location" class="form-control border-input border-input" id="location" placeholder="" value="" required=""/>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-md-6 mb-3">
            <label for="validationDefault04">Seleccionar evento</label>
            <multiselect
              :options="events"
              v-model="eventSelected"
              width="100px"
              track-by="name"
              :multiple="false"
              @select="getActivities"
              label="name"
            >
            </multiselect>
            <div class="hasError" v-if="$v.formHall.event_id.$error">
              Valid first event is required or incorrect length.
            </div>
          </div>

          <div class="col-md-6 mb-3" v-if="show.activities">
            <label for="validationDefault04">Agregar Actividades</label>
            <multiselect
              :options="activities"
              v-model="listActivities"
              width="100px"
              track-by="name"
              :multiple="true"
              label="name"
            >
            </multiselect>
            <div class="hasError" v-if="$v.formHall.activities.$error">
              Valid first activities is required or incorrect length.
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12" v-if="this.show.encryptionSignature" >
            <label class="col-md-12 ml-3" for="encryptionSignature">Firma para evento 3D: </label>                   
            <input
              class="col-md-8 ml-3"
              id="encryptionSignature" 
              disabled="disabled" 
              type="text" 
              style="width: 100%; height: 20%; padding:3px;" 
              v-model="this.show.idEventForEncryption"
            />              
            <button 
              type="button" 
              v-on:click="this.copyEncrypInfo"
              class="col-md-1 btn btn-outline-primary btn-sm mx-1">
                <span class="ti-eye"></span>
            </button>      
            <a class="col-md-12 ml-3 link " target="_blank" :href="enlaceManual">Manual integración</a>                            
          </div>
          <div class="col-md-9"></div>                      
          <div class="col-md-3">
            <button
              class="btn btn-primary btn-lg btn-block"
              @click.prevent="createHall"
              type="button"
            >
              Crear Sala
            </button>
          </div>
        </div>
      </div>
      <!-- Step 01 -->
    </form>
  </card>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
import multiselect from "@/components/ownMultiselect/OwnMultiselect";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "createHall",
  components: { multiselect, editor: Editor },
  data() {
    return {
      hallTypes: [
        { name: "Internal", id: 1 },
        { name: "External", id: 2 },
      ],
      activities: [],
      listActivities: [],
      events: [],
      eventSelected: [],
      hallId: null,
      formHall: {
        name: null,
        description: null,
        pic: [],
        pic_banner: [],
        activities: [],
        event_id: null,
        hall_type_id: 1,
        domain_external: null,
        location:''
      },
      show: {
        domain_external: false,
        pic_banner: true,
        activities: true,
        encryptionSignature:false,
        idEventForEncryption:0,
      },
      enlaceManual:process.env.VUE_APP_API_URL+'storage/Integracion_eventos_3d.pdf',
    };
  },
  // validations: {
  //   formHall: {
  //     name: { required, maxLength: maxLength(100) },
  //     description: { required, maxLength: maxLength(200) },
  //     activities: { required },
  //     pic: { required },
  //     pic_banner: { required },
  //     event_id: { required },
  //   },
  // },

  validations() {
    if (this.formHall.hall_type_id == 1) {
      return {
        formHall: {
          name: { required, maxLength: maxLength(100) },
          description: { required, maxLength: maxLength(200) },
          activities: { required },
          pic: { required },
          pic_banner: { required },
          event_id: { required },
          hall_type_id: { required },
        },
      };
    } else {
      return {
        formHall: {
          name: { required, maxLength: maxLength(100) },
          description: { required, maxLength: maxLength(200) },
          pic: { required },
          event_id: { required },
          hall_type_id: { required },
          domain_external: { required, maxLength: maxLength(200) },
        },
      };
    }
  },
  created() {
    this.getEvents();
  },
  methods: {
    changeHallType() {
      if (this.formHall.hall_type_id == 2) {
        this.show.domain_external = true;
        this.show.encryptionSignature = true;
        this.show.activities = false;
        this.show.pic_banner = false;
        this.formHall.activities = null;
        this.formHall.pic_banner = null;
      } else {
        this.show.domain_external = false;
        this.show.encryptionSignature = false;
        this.show.activities = true;
        this.show.pic_banner = true;
        this.formHall.domain_external = null;
      }
    },
    copyEncrypInfo(){      
      let aux = document.createElement("input");
      let text = this.show.idEventForEncryption
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);

      if(this.show.idEventForEncryption !=0){
        this.$swal({icon:'success', text:'Copiado al portapapeles'})  
      }else{
        this.$swal({icon:'error', text:'Selecciona un evento'})  
      }
    },
    getEncryptInfo(eventId){
      this.show.idEventForEncryption = "4pp3v3ntm0v1lC0m"+eventId+"*f2ec0h421"
    },
    async getActivities(event) {
      //pasamos parametro para crear firma de evento externo
      this.getEncryptInfo(event.id)      
      this.listActivities = [];
      let id = localStorage.getItem("_current_user_id");
      console.log("_current_user_id:", id);
      let acts;
      await axios
        .get(`activities-event/${event.id}?pagination=false`)
        .then((response) => {
          acts = response.data;
          this.activities = acts.map((item) => {
            return { id: item.id, name: item.name };
          });
        });
    },
    createBanner() {
      let data = new FormData();

      data.append("name", this.formHall.name);
      data.append("type", "local");
      data.append("url", this.formHall.pic);
      data.append("model_type", "hall");
      data.append("model_id", this.hallId);

      axios.post("documents", data).catch((error) => {
        this.$swal({ icon: "error", text: error });
      });
    },
    picBanner(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.formHall.pic_banner = files[0];
      let label = document.getElementById("picHallBanner");
      label.innerText = files[0].name;
    },
    picBg(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.formHall.pic = files[0];
      let label = document.getElementById("picHall");
      label.innerText = files[0].name;
    },
    createHall() {
      this.listActivities.map((item) => {
        this.formHall.activities.push(item.id);
      });
      this.formHall.event_id = this.eventSelected.id;
      this.formHall.activities = JSON.stringify(this.formHall.activities);
      this.$v.formHall.$touch();
      if (this.$v.formHall.$error) {
        this.formHall.activities = [];
        return;
      }

      let data = new FormData();

      data.append("name", this.formHall.name);
      data.append("description", this.formHall.description);
      data.append("pic", this.formHall.pic);
      data.append("pic_banner", this.formHall.pic_banner);
      data.append("event_id", this.formHall.event_id);
      data.append("activities", this.formHall.activities);
      data.append("hall_type_id", this.formHall.hall_type_id);
      data.append("domain_external", this.formHall.domain_external);
      data.append("location", (this.formHall.location==null)?'':this.formHall.location);
      

      axios
        .post("halls", data)
        .then((response) => {
          this.hallId = response.data.data.id;
          this.$swal("Sala creada");
          this.$router.push({ name: "Halls" });
        })
        .catch((error) => {
          this.$swal({
            icon: "error",
            text: error,
          });
        });
    },

    getEvents() {
      axios.get("events?pagination=false").then((response) => {
        this.events = response.data;
      });
    },
  },
  mount() {
    this.show();
  },
};
</script>

<style>
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
</style>
