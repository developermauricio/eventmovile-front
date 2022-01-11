<template>

  <div id="login">

  <div  class="container login-wrapper">
    <div class="row">
      <div class="col-md-6 mx-auto">

        <form class="box-login" action="#" v-if="sendEmail == false">
            <div>

              <h3 class="title">Bienvenido</h3>
              <P>
                Ingresa los siguientes datos
              </P>
            </div>
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-user" id="addon-wrapping"></span>
              </div>
              <input type="text" v-model="form.email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-lock" id="addon-wrapping"></span>
              </div>
              <input :type="typeInput" class="form-control" v-model="form.password" placeholder="Contraseña" aria-label="Username" aria-describedby="addon-wrapping">
              <button @click.prevent="showPassword" style="border:none;background-color: #614ba4;color: #fff;"><span class="ti-eye"></span></button>
            </div>


            <button class="btn btn-primary btn-block" @click.prevent="onSubmit">Ingresar</button>

            <div class="row">
              <div class="col-md-6">
                <a  class="link"
                    @click="goToPassword()"> Recuperar contraseña </a>
              </div>
              <!--<div class="col-md-6 text-right">
                  <router-link :to="{path:'/Register'}">
                      <a  class="link"> Registrarme </a>
                  </router-link>
              </div>-->
            </div>

        </form>

        <form action="#" v-if="sendEmail">
            <div>
              <H3>Recuperar contraseña</H3>
              <P>
                Ingresa los siguientes datos, y te enviaremos un correo con los pasos a seguir
              </P>
            </div>
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-user" id="addon-wrapping"></span>
              </div>
              <input type="text" class="form-control" v-model="email" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div>

            </div>
            <button @click.prevent="sendEmailRestore" class="btn btn-primary btn-block">Enviar</button>
        </form>

      </div>
    </div>
  </div>

 </div>
</template>

<script>
export default {
  components: {
  },
  props:['business_id'],
  data(){
    return{
      email:null,
      sendEmail: false,
      typeInput:"password",
      
      form:{
        email:'',
        password:''
      }
    }
  },
  mounted(){
    
  },
  methods:{
    async sendEmailRestore(){
      let params = {
        email:this.email,
        action:'bm',
        id:this.business_id
      }
      await axios.post('emailRestorePw', params)
      this.$swal("Revisa tu bandeja de entrada o spam")
    },
    goToPassword(){
      this.sendEmail = true
    },
    showPassword(){
      if(this.typeInput == "text") this.typeInput = "password"
      else this.typeInput = "text"
    },
    onSubmit(){
    
    this.form.business_id = this.business_id
    console.log("Formulario de envio:", this.form)
    window.axios.post('auth/basic', this.form).then(response=>{
        const user = response.data
        localStorage.setItem("_current_user_name", user.name)
        localStorage.setItem("_current_user_lastname", user.lastname)
        localStorage.setItem("_current_user_id", user.id)
        localStorage.setItem("_current_user_email", user.email)
        localStorage.setItem("_current_role_id", user.roles[0].id)
        localStorage.setItem("_current_role_name", user.roles[0].name)
        localStorage.setItem("_current_model_id", user.model_id)
        localStorage.setItem("_current_token", user.token)
        localStorage.setItem("_current_bussines_id", this.business_id)
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        switch(user.roles[0].name){
            case 'business market': console.log("Entro aqui:",user.roles[0].name);this.$router.push({name:'userProfileBM', params : {id:this.business_id} }); break;
            case 'guest': console.log("Entro aqui:",user.roles[0].name);this.$router.push({name:'userProfileBM', params : {id:this.business_id} }); break;
            case 'admin': console.log("Entro aqui:",user.roles[0].name);this.$router.push({ name: "Mis Rueda de Negocios" }); break;
            default: console.log("Entro aqui:",user.roles[0].name);this.$router.push({ name: "Mis Rueda de Negocios" }); break;
        } 
    }).catch(error =>{
        this.$swal({
        icon:"error", text:"Email o contraseña incorrecto"
        })
    })
    }
  }


};
</script>

<style>

#login {
  background: url('./../../../assets/img/bg-login.jpg') no-repeat center bottom;
  height: 100vh;
  color: white;
}
.box-login{
  padding: 40% 0;
}
.input-group-text{
  background:   #8e04cc;
  color: white;
}

.link{
  text-decoration: underline !important;
  color: black;
  display: block;
  margin: 0.5rem 0;
  cursor: pointer;
}

.title{
  color:    #8e04cc;
  font-size: 30px;
}

.btn{

  margin: 2rem 0;
}
</style>
