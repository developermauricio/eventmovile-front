<template>
   <div>
      <modal name="register-event"
         :width="720"
         height="auto"
         :scrollable="true"
         >
         <div class="container">
            <div slot="top-right">
               <button style="margin-left: 97%; border: none; border-radius: 10px;" @click="$modal.hide('register-event')">
                  ❌
               </button>
            </div>
            <div class="row">
               <div class="col-12">
                  <h4 class="mb-3">Campos del formulario de registro</h4>
               </div>

               <div class="col-md-12 mb-3">
                  <label for="lastName">Nombre del campo</label>
                  <input type="text" class="form-control" v-model="form.name"  id="" cols="30" rows="3"></textarea>
                  <div class="hasError" v-if="$v.form.name.$error">
                  Valid last name is required or incorrect length  (Max 50).
                  </div>
               </div>
               <div class="col-md-12 mb-3">
                  <label for="country">Tipo</label>
                  <select v-model="form.type" class="custom-select d-block w-100" id="country" required="">
                     <option value="text">Texto corto</option>
                     <option value="textarea">Texto largo</option>
                     <option value="number">Número</option>
                     <option value="select">Menu desplegable</option>
                  </select>
                  <div class="hasError" v-if="$v.form.type.$error">
                     Please select a valid type.
                  </div>
               </div>
               <div class="col-md-12 mb-3 answer" v-if="form.type == 'select'">
                  <label  for="name">Opciones de respuesta separadas por coma</label> 
                  <Tags  :model.sync="form.options"></Tags>    
               </div>
               <div class="col-md-12">
                  <div class="form-check px-4">
                     <input type="checkbox" v-model="form.required" class="form-check-input" id="exampleCheck1">
                     <label class="form-check-label" for="exampleCheck1">Pregunta Obligatoria</label>
                  </div>
               </div>
               <div class="col-md-12" v-if="showAdd">
                  <button @click="createColumn" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       Agregar campo
                  </button>
               </div>
               <div class="col-md-12" v-else>
                  <button @click="editColumn(editCol)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                       Editar campo
                  </button>
               </div>
               <table class="table table-striped">
                  <thead>
                     <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Opciones</th>
                        <th scope="col" class="text-right">Eliminar</th>
                     </tr>
                  </thead>
                  <tbody>

                     <tr v-for="col in columns" :key="col.id">
                        <th scope="row">
                           {{col.id}}
                        </th>
                        <td>{{col.name}}</td>
                        <td v-if="col.type == 'select'">Menu desplegable</td>
                        <td v-if="col.type == 'text'">Texto corto</td>
                        <td v-if="col.type == 'textarea'">Texto largo</td>
                        <td v-if="col.type == 'number'">Número</td>
                        <!-- <td>{{col.options}}</td> -->
                        <td >{{getFormatText(col.options)}}</td>
                        <td class="text-right">
                           <button type="button" @click="showDataEdit(col)" class="btn btn-outline-success btn-sm mx-1">
                              <span class="ti-pencil"></span>
                           </button>
                           <button type="button" @click="deleteColumn(col.id)" class="btn btn-outline-danger btn-sm mx-1">
                              <span class="ti-trash"></span>
                           </button>
                        </td>
                     </tr>
                  </tbody>
            </table>
            </div>
         </div>
      </modal>
   </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Tags from "@/components/Tags";
export default {
  name: "regEvent",
  components: { Tags },
  data() {
    return {
      showAdd: true,
      editCol: null,
      columns: null,
      event: null,
      form: {
        name: null,
        options: "",
        type: null,
        required: true,
        event_id: null,
      },
      listOptions: [],
      formOption: [],
    };
  },
  validations: {
    form: {
      name: { required, maxLength: maxLength(50) },
      type: { required },
      event_id: { required },
    },
  },
  props: ["eventId", "showModal"],
  methods: {
    showDataEdit(col) {
      this.showAdd = false;
      this.editCol = col.id;
      this.form.name = col.name;
      this.form.type = col.type;
      if (col.type == "select") {
        this.form.options = JSON.parse(col.options);
      }
    },
    editColumn(id) {
      this.form.options = this.form.options.toString();
      this.form.options = JSON.stringify(this.form.options);
      this.form.event_id = this.eventId;
      if (this.form.type != "select") this.form.options = "";
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
      axios
        .put(`registerEvent/${id}`, this.form)
        .then((response) => {
          this.$swal("Campo editado exitosamente");
          this.form.name = null;
          this.form.type = null;
          this.form.options = "";
          this.$v.form.$reset();
          this.getColumns();
          this.showAdd = true;
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error.response.data.message });
        });
    },
    getColumns() {
      axios.get(`fieldsEvent/${this.eventId}`).then((response) => {
        this.columns = response.data.data;
      });
    },
    getFormatText(opt) {
      if (opt) {
        var settings = /,/g;
        var sep = opt.replace(settings, ", ");
        var result = "";
        if (opt.length > 100) {
          result = sep.substr(0, 100) + "...";
        } else {
          result = sep + "...";
        }

        return result;
      } else {
        return "";
      }
    },
    createColumn() {
      this.form.options = this.form.options.toString();
      this.form.options = JSON.stringify(this.form.options);
      this.form.event_id = this.eventId;
      if (this.form.type != "select") this.form.options = "";
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
      axios
        .post("registerEvent", this.form)
        .then((response) => {
          this.$swal("Campo agregado al formulario");
          this.form.name = null;
          this.form.type = null;
          this.form.options = "";
          this.$v.form.$reset();
          this.getColumns();
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error.response.data.message });
        });
    },
    deleteColumn(id) {
      axios
        .delete(`registerEvent/${id}`)
        .then((reponse) => {
          this.getColumns();
          this.$swal("Campo eliminado del formulario");
        })
        .catch((error) => {
          console.log(error);
          this.$swal({ icon: "error", text: error.response.data.message });
        });
    },
  },
  watch: {
    eventId: function (newVal) {
      this.event = newVal;
    },
    showModal: function (newVal) {
      this.getColumns();
      if (newVal == true) this.$modal.show("register-event");
      else this.$modal.hide("register-event");
    },
  },
  computed() {
    if (this.eventId) {
      this.getColumns();
    }
  },
};
</script>