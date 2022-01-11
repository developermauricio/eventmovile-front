<template>
  <div :style="'background-color:' + styles.home_color_background + ';'">
    <div id="isziud" class="event_register_top">      
      <button
        :style="
          'border:none;background-color:' +
          styles.home_btn_color +
          ';color:' +
          styles.home_btn_text_color
        "
        class="event_bottom_bar_btn1 float_right"        
      >
        {{$t('pages.Events.LandingEvent.register')}}
      </button>
      <div id="i2pcku" class="event_register_cont">
        <img
          :src="uriImg + styles.email_img_logo"
          class="event_register_cont_img"
        />
        <p id="icl9bt" class="event_register_cont_p">
          Ingresa tu correo para validar tu identidad
        </p>
        <form class="form register_event_form">
          <div class="form-group">
            <input
              placeholder="Correo"
              type="email"
              required
              v-model="form.email"
              name="correo"
              class="input event_register_cont_input"
            />
          </div>
          <button
            :style="
              'border:none;background-color:' +
              styles.home_btn_color +
              ';color:' +
              styles.home_btn_text_color
            "
            class="event_bottom_bar_btn2"
            @click.prevent="onSubmit"
          >
            {{ $t("pages.Auth.Login.login") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import getlang from "@/lang/index.js";

export default {
  name: "loginWA",
  components: {},
  props: {
    webAppPath:{
      type:String
    },    
  },
  data() {
    return {
      uriImg: process.env.VUE_APP_API_URL_FILES,
      styles: [],
      form: {
        email: "",
        password: "",
      },
      eventId: 0,
      pswd:''
    };
  },
  mounted() {
    alert(this.pswd)
    this.getLanguage();
    this.eventId = localStorage.getItem("eventId")
    let styleEvent = localStorage.getItem("style-event")
    this.styles = JSON.parse(styleEvent)    
  },
  methods: {
    getLanguage() {
      this.$i18n.locale = getlang.getLanguage();
    },
    async sendEmailRestore() {
      let params = {
        email: this.email,
      };
      await axios.post("emailRestorePw", params);
      this.$swal(this.$t("pages.Auth.Login.checkYourInboxOrSpam"));
    },
    goToPassword() {
      this.sendEmail = true;
    },
    onSubmit() {
      axios.get(`showEvent/${this.eventId}`).then(response =>{          
          this.pswd = response.data[0].password.trim()                                
          let data = {
            email:this.form.email,
            password:this.pswd,
            eventId: this.eventId,
          };
            window.axios.post("auth/basic", data)
                .then((response) => {
                  const user = response.data;
                  localStorage.setItem("_current_user_name", user.name);
                  localStorage.setItem("_current_user_company", user.company_id);
                  localStorage.setItem("_current_user_lastname", user.lastname);
                  localStorage.setItem("_current_user_id", user.id);
                  localStorage.setItem("_current_user_email", user.email);
                  localStorage.setItem("_current_model_id", user.model_id);
                  localStorage.setItem("_current_token", user.token);
                  axios.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${user.token}`;          
                  let dataUserQr = JSON.stringify(user)
                  this.$router.push({ name: "indexWA", params:{inSession:true,dataUser:dataUserQr}});
                })
                .catch((error) => {
                  if (error.response.status == 401) {
                    this.$swal({
                      icon: "error",
                      text: this.$t("pages.Auth.Login.emailOrPasswordWasNotCorrect"),
                    });
                  }
                  //target="_blanck" href='#/Register-Event?eventId=${this.event}'
                  if (
                    error.response.status == 422 &&
                    typeof error.response.data.error.email !== "undefined"
                  ) {
                    if (
                      error.response.data.error.email[0] ==
                      "The selected email is invalid."
                    ) {
                      this.$swal
                        .fire({
                          icon: "info",
                          text: this.$t("pages.Auth.Login.weDidNotFindAccount"),
                          showCancelButton: false,
                          confirmButtonText: this.$t("pages.Auth.Login.signUp"),
                          showCloseButton: true,
                          preConfirm: () => {
                            return { event: this.event };
                          },
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            if (this.paymentActive) {
                              this.$router.push({
                                name: "Register-Event",
                                query: {
                                  eventId: result.value.event,
                                  payment: true,
                                  ticket_id: this.ticket_id,
                                  quanty: this.quanty,
                                },
                              });
                            } else {
                              window.location.href =
                                "#/Register-Event?eventId=" + result.value.event;
                            }
                          }
                        });
                    } else {
                      this.$swal({
                        icon: "error",
                        text: this.$t("pages.Auth.Login.emailOrPasswordWasNotCorrect"),
                      });
                    }
                  } else {
                    this.$swal({
                      icon: "error",
                      text: this.$t("pages.Auth.Login.emailOrPasswordWasNotCorrect"),
                    });
                  }
                });            
      })      
    },
    redirect() {
      //alert("Hola")
    },
  },
};
</script>

<style>
#login {
  background: url("./../../../assets/img/bg-login.jpg") no-repeat center bottom;
  height: 100vh;
  color: white;
}
.box-login {
  padding: 40% 0;
}
.input-group-text {
  background: #8e04cc;
  color: white;
}

.link {
  text-decoration: underline !important;
  color: black;
  display: block;
  margin: 0.5rem 0;
  cursor: pointer;
}

.title {
  font-size: 30px;
}

.btn {
  margin: 2rem 0;
}

.main-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
}
</style>
