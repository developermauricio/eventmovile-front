<template >
  <div class="event wrapper" :style="bgImg">
    <!-- header -->
    <div class="header-main px-4">
      <div class="font-weight-normal flex justify-content-center text-center">
        <img
          v-if="BMData !== undefined"
          style="width: 20%"
          :src="uri + 'storage/' + BMData.logo"
        />
      </div>
    </div>
    <!-- header -->

    <!-- content main -->
    <main class="content-main row flex justify-content-center">
      <div
        class="col-md-10 col-lg-8 col-xl-7 p-4 text-center"
        :style="
          'background-color:' + BMData.principal_color + '; border-radius:15px'
        "
      >
        <!-- banner  -->
        <div class="row">
          <div class="col-md-12">
            <img
              class="event__banner--main"
              :src="uri + 'storage/' + BMData.pic"
              alt=""
            />
          </div>

          <div class="col-md-12">
            <h4
              class="event__title--main"
              :style="'color:' + BMData.secondary_color"
            >
              Formulario de Registro
            </h4>

            <p
              class="event__description--main col-9 mx-auto"
              :style="'color:' + BMData.secondary_color"
            >
              Ingresa los siguientes datos. <br />{{ BMData.name }}!
            </p>
          </div>
        </div>
        <!-- banner  -->
        <modal name="habeas-data" :width="720" height="auto" :scrollable="true">
          <div class="container">
            <div class="row">
              <div class="col-md-12 mb-3"><h3>Términos y condiciones</h3></div>
            </div>
            <div class="row">
              <div class="col-md-12 mb-3">
                <p style="text-align: justify">{{ habeasdata.content }}</p>
              </div>
            </div>
          </div>
        </modal>

        <!-- form  -->
        <div class="row flex justify-content-center mt-4">
          <div class="col-md-9">
            <!-- form content -->
            <form class="text-left">
              <!-- habeas data -->
              <div class="col-md-12" v-if="habeasdata.position == 'up'">
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      v-model="checkHabeasData"
                      type="checkbox"
                      id="gridCheck1"
                    />
                    <label
                      class="form-check-label"
                      for="gridCheck1"
                      :style="'color:' + BMData.second_color"
                    >
                      <a
                        :style="'color:' + BMData.second_color"
                        target="_blank"
                        v-if="habeasdata.type == 'file'"
                        :href="uri + 'storage/' + habeasdata.content"
                        >Aceptar términos y condiciones</a
                      >
                      <a
                        :style="'color:' + BMData.second_color"
                        target="_blank"
                        v-if="habeasdata.type == 'url'"
                        :href="habeasdata.content"
                        >Aceptar términos y condiciones</a
                      >
                      <span
                        :style="'color:' + BMData.second_color"
                        v-if="habeasdata.type == 'text'"
                        @click="$modal.show('habeas-data')"
                        >Aceptar términos y condiciones</span
                      >
                    </label>
                  </div>
                </div>
              </div>
              <!-- habeas data -->

              <!-- form inputs -->
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Nombre</label
                    >
                    <input
                      type="text"
                      v-model="form.name"
                      class="form-control"
                      id="name"
                      placeholder="Nombre"
                    />
                    <div class="hasError" v-if="$v.form.name.$error">
                      Por favor ingrese un nombre
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Apellido</label
                    >
                    <input
                      type="text"
                      v-model="form.lastname"
                      class="form-control"
                      id="name"
                      placeholder="Nombre"
                    />
                    <div class="hasError" v-if="$v.form.lastname.$error">
                      Por favor ingrese un apellido
                    </div>
                  </div>
                </div>
              </div>
              <!-- form inputs -->

              <!-- form inputs -->
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Email</label
                    >
                    <input
                      type="email"
                      v-model="form.email"
                      class="form-control"
                      id="name"
                      placeholder="Nombre"
                    />
                    <div class="hasError" v-if="$v.form.email.$error">
                      Por favor ingrese un correo electronico
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Telefono</label
                    >
                    <input
                      type="number"
                      v-model="form.phone"
                      class="form-control"
                      id="name"
                      placeholder="Nombre"
                    />
                    <div class="hasError" v-if="$v.form.phone.$error">
                      Por favor ingrese un numero celular
                    </div>
                  </div>
                </div>
              </div>
              <!-- form --->
              <!-- company and job title-->

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Empresa</label
                    >
                    <input
                      type="text"
                      v-model="form.company"
                      class="form-control"
                      id="name"
                      placeholder="Empresa"
                    />
                    <div class="hasError" v-if="$v.form.company.$error">
                      Por favor ingrese la empresa
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Cargo</label
                    >
                    <input
                      type="text"
                      v-model="form.position"
                      class="form-control"
                      id="name"
                      placeholder="Cargo"
                    />
                    <div class="hasError" v-if="$v.form.position.$error">
                      Por favor ingrese su cargo
                    </div>
                  </div>
                </div>
              </div>
              <!-- company and job title-->
              <!-- form -->

              <!-- segmentation -->
              <div class="row" v-if="this.BMData.segmentation_actived">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Seleccione tipo de usuario</label
                    >
                    <select
                      class="custom-select d-block w-100"
                      id="country"
                      required=""
                      v-model="form.user_type"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="offerer">Vendedor</option>
                      <option value="claimant">Comprador</option>
                    </select>
                    <div class="hasError" v-if="$v.form.user_type.$error">
                      Por favor selecciona una opción valida.
                    </div>
                  </div>
                </div>
              </div>
              <!-- segmentation -->

              <!-- dynamic form -->
              <div class="row">
                <div
                  class="col-md-6"
                  v-for="(field, index) in fields"
                  :key="index"
                >
                  <div class="form-group">
                    <label
                      for="name"
                      :style="'color:' + BMData.secondary_color"
                      >{{ field.name }}</label
                    >

                    <input
                      @change="getValue($event, field.id)"
                      v-if="field.type == 'text'"
                      type="text"
                      class="form-control"
                      :placeholder="field.name"
                      :required="field.required"
                    />

                    <textarea
                      @change="getValue($event, field.id)"
                      v-if="field.type == 'textarea'"
                      class="form-control"
                      :placeholder="field.name"
                      :required="field.required"
                    />

                    <input
                      @change="getValue($event, field.id)"
                      v-if="field.type == 'number'"
                      type="number"
                      class="form-control"
                      :placeholder="field.name"
                      :required="field.required"
                    />

                    <select
                      @change="getValue($event, field.id)"
                      v-if="field.type == 'select'"
                      class="custom-select d-block w-100"
                    >
                      <option value="">Seleccione...</option>
                      <option
                        v-for="option in arrayOptions(field.options)"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- dynamic form -->
              <!-- Password-->
              <div class="row" v-if="!this.BMData.password">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Password</label
                    >
                    <input
                      type="password"
                      v-model="form.password"
                      class="form-control"
                      id="name"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" :style="'color:' + BMData.secondary_color"
                      >Confirmar password</label
                    >
                    <input
                      type="password"
                      v-model="vPassword"
                      class="form-control"
                      id="name"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <!-- Password-->

              <!-- form footer -->
              <div class="row">
                <div class="col-md-12" v-if="habeasdata.position == 'down'">
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="checkHabeasData"
                        id="gridCheck2"
                      />
                      <label
                        class="form-check-label"
                        for="gridCheck2"
                        :style="'color:' + BMData.second_color"
                      >
                        <a
                          :style="'color:' + BMData.second_color"
                          target="_blank"
                          v-if="habeasdata.type == 'file'"
                          :href="uri + 'storage/' + habeasdata.content"
                          >Aceptar términos y condiciones</a
                        >
                        <a
                          :style="'color:' + BMData.second_color"
                          target="_blank"
                          v-if="habeasdata.type == 'url'"
                          :href="habeasdata.content"
                          >Aceptar términos y condiciones</a
                        >
                        <span
                          :style="'color:' + BMData.second_color"
                          v-if="habeasdata.type == 'text'"
                          @click="$modal.show('habeas-data')"
                          >Aceptar términos y condiciones</span
                        >
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 flex justify-content-center">
                  <button
                    :disabled="disabledButton"
                    @click.prevent="registerUser"
                    class="btn block border-0 btn-block"
                    :style="
                      'background-color:' +
                      BMData.third_color +
                      '; color:' +
                      BMData.secondary_color
                    "
                  >
                    Registrarme
                  </button>
                </div>
                <a
                  :href="`${front}login-bm/${business_id}`"
                  :style="'color:' + BMData.secondary_color"
                  >Ya tienes cuenta? Inicia sesion</a
                >
              </div>
              <!-- form footer -->
            </form>
          </div>
          <!-- form content -->
        </div>
        <!-- form -->
      </div>
    </main>
    <!-- content main -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "CustomRegisterFormBM",
  components: {},
  props: ["business_id"],
  data() {
    return {
      BMData: {},
      checkHabeasData: false,
      habeasdata: [],
      uri: process.env.VUE_APP_API_URL,
      front: process.env.VUE_APP_URL_FRONT,
      valueOptions: [],
      event: [],
      fields: [],
      eventId: null,
      tokenInvitation: null,
      vPassword: "",
      form: {
        name: "",
        phone: "",
        lastname: "",
        email: "",
        password: "",
        business_id: "",
        company: "",
        position: "",
        user_type: "",
      },
      disabledButton: false,
    };
  },
  validations: {
    vPassword: { required },
    form: {
      lastname: { required },
      name: { required },
      phone: { required },
      email: { required },
      password: { required },
      company: { required },
      position: { required },
      user_type: { required },
    },
  },
  created() {
    this.getBMData();
    this.getFieldsEvent();
    this.getHabeasData();
  },
  computed: {
    bgImg: function () {
      return `background-image:url('${this.uri}storage/${this.BMData.background_banner}');
          background-color:${this.BMData.principal_color}
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          content:'';
        `;
    },
  },
  methods: {
    getValue(e, id) {
      this.valueOptions.push({ id: id, value: e.target.value });
    },
    arrayOptions(array) {
      array = array.slice(1);
      array = array.slice(0, -1);
      array = array.split(",");
      return array;
    },

    getFieldsEvent() {
      axios.get(`bmr-fields-business/${this.business_id}`).then((response) => {
        this.fields = response.data.data;
      });
    },
    getBMData() {
      axios.get(`business-market/${this.business_id}`).then((response) => {
        this.BMData = response.data;
        console.log("this.BMData:",this.BMData);
        if (this.BMData.segmentation_actived != true) {
          this.form.user_type = "not_apply";
        }
        console.log("this.BMData:", this.BMData);
      });
    },
    getHabeasData() {
      axios.get(`bm-habeas-outside/${this.business_id}`).then((response) => {
        this.habeasdata = response.data;
      });
    },
    registerBeforeAsync() {},
    async registerUser() {
      if (this.BMData.password) {
        this.form.password = this.BMData.password;
        this.vPassword = this.BMData.password;
      }
      if (this.habeasdata.id)
        if (this.checkHabeasData == false) {
          this.$swal("Debes aceptar términos y condiciones");
          return;
        }
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$swal("Faltan datos por ingresar");
        return;
      }
      if (this.form.password != this.vPassword) {
        this.$swal({ icon: "error", text: "Las contraseñas no coiciden" });
        this.form.password = "";
        this.vPassword = "";
        return;
      } else {
        this.form.business_id = this.business_id;
        let response;
        let user;
        try {
          this.disabledButton = true;
          response = await axios.post("auth/register", this.form);
          //console.log(response)
          if (response.data.message === "User register already") {
            this.$swal({
              icon: "error",
              text: "Usuario ya registrado en rueda de negocios",
            });
            this.disabledButton = false;
            return;
          } else user = response.data;
        } catch (error) {
          this.disabledButton = false;
          //console.log(error.response)
          if (error.response.status === 409)
            this.$swal({ icon: "error", text: "Correo ya registrado" });
          if (error.response.status === 500)
            this.$swal({
              icon: "error",
              text: "Ocurrio un error en nuestro servidor",
            });

          return;
        }

        let count = 0;
        this.valueOptions.map((item) => {
          const dataValue = {
            bmr_field_id: item.id,
            user_id: user.id,
            value: item.value,
          };
          axios.post("bm-register-fields-data", dataValue).then((res) => {
            count++;
            if (this.valueOptions.length === count) {
              //Opcional mensaje de correcto o error en datos adicionales
            }
          });
        });

        if (response) {
          localStorage.setItem("_current_user_name", user.name);
          localStorage.setItem("_current_user_lastname", user.lastname);
          localStorage.setItem("_current_user_id", user.id);
          localStorage.setItem("_current_user_email", user.email);
          localStorage.setItem("_current_role_id", user.roles[0].id);
          localStorage.setItem("_current_role_name", user.roles[0].name);
          localStorage.setItem("_current_token", user.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;
          this.$router.push({
            name: "userProfileBM",
            params: {
              id: this.business_id,
              modal: 1,
            },
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  border: #e0e0e0 !important;
}
/* Tickets */

.tickets__wrapper {
  background: white;
  border-radius: 10px;
  padding: 20px 10px;
}
.tickets__header {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
}
.tickets__icon {
  font-size: 3rem;
}
.tickets__label {
  display: block;
}
.tickets__title {
  font-weight: bold;
  font-size: 1.5rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
.tickets__description {
  font-size: 0.9rem;
}
.tickets__num {
  font-size: 7rem;
  text-align: center;
  font-weight: bold;
  display: block;
  margin: -2rem 0 0;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.tickets__subtitle {
  font-size: 1.2rem;
  text-align: center;
  display: block;
  margin: -30px 0 -20px;
}

.tickets__footer {
  border-top: 1px dotted #e0e0e0;
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
}

.tickets__price {
  font-size: 2rem;
  font-weight: bold;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.tickets__btn {
  margin: 1rem 0 !important;
  width: 100%;
}

/* Events */

.event__label {
  color: #f161e1;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.event__date {
  color: #f161e1;
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.event__date--main {
  color: #f161e1;
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
  margin: 1rem 0;
}

.event__title--main {
  font-size: 2rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
}

.event__title {
  font-size: 1.5rem;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.event__description {
  color: white;
}

.event__description--main {
  color: white;
  font-size: 1.2rem;
}

.event__banner {
  width: 100%;
  border-radius: 20px;
}

.event__banner--main {
  width: 100%;
  border-radius: 20px;
}

.event__link {
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  width: auto;
  margin-top: 1rem;
}

.event::before {
  background-color: transparent !important;
}
</style>
