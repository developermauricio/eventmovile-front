<template>

  <div id="login">

  <div  class="container login-wrapper">
    <div class="row">
      <div class="col-md-6 mx-auto">

        <form class="box-login" action="#" v-if="true">
            <div>
              <h3 class="title">Restablecer Contraseña</h3>
              <P>
                Ingresa la nueva contraseña
              </P>
            </div>
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-lock" id="addon-wrapping"></span>
              </div>
              <input :type="typeInput" class="form-control" v-model="form.password" placeholder="Constraseña" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text ti-lock" id="addon-wrapping"></span>
              </div>
              <input :type="typeInput" class="form-control" v-model="form.vPassword" placeholder="Validar contraseña" aria-label="Username" aria-describedby="addon-wrapping">
            </div>


            <button class="btn btn-primary btn-block" @click.prevent="changePassword">Restablecer</button>

            

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
  props:{
    token:{
      default: 0
    },
    action:{},
    id:{}
  },
  data(){
    return{
      userId:null,
      restoreToken:null,
      typeInput:"password",
      event:null,
      form:{
        password:'',
        vPassword:''
      }
    }
  },
  mounted(){
    if(this.token != 0){
      this.restoreToken = this.token
      this.validateToken()
    }
  },
  methods:{
    validateToken(){
      
      axios.get(`validateTokenRestore/${this.restoreToken}`).then(response=>{
        this.userId = response.data.id
      }).catch(error=>{
        this.$swal({icon:'error', text:"Error de validación de permisos"})
        if(!this.action)
          this.$router.push({ name: "Login" })
        else 
          this.$router.push({name:"LoginBM", params:{
            business_id:this.id
          }})
      })
    },
    showPassword(){
      if(this.typeInput == "text") this.typeInput = "password"
      else this.typeInput = "text"
    },
    changePassword(){
      if(this.form.password != this.form.vPassword) this.$swal({icon:"error", text:"Las contraseñas no coinciden"})
      let params = {
        password: this.form.password
      }
      axios.put(`restorePw/${this.userId}`, params).then(response=>{
        this.$swal({icon:"success", text:"Contraseña restablecida con exito"})
        this.$router.push({name:"LoginBM", params:{
          business_id:this.id
        }})
      }).catch(error=>{
        this.$swal({icon:"error", text:"Error al cambiar contraseña"})
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
