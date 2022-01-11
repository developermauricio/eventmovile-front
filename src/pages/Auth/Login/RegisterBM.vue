<template>

  <div id="login">

  <div  class="container login-wrapper">
    <div class="row">
      <div class="col-md-6 mx-auto">

        <form class="box-login" action="#" v-if="true">
            <div class="row">
              <div class="col-md-12">
                <h3 class="title">Nuevo Registro</h3>
                <P>
                  Ingresa los siguientes datos
                </P>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Nombre (*)</label>
                <input type="text"  class="form-control border-input border-input" id="firstName" placeholder="" v-model="form_init.name" required="">
                <div class="hasError" v-if="$v.form_init.name.$error">
                    Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Apellido (*)</label>
                <input type="text"  class="form-control border-input border-input" id="lastName" placeholder="" v-model="form_init.lastname" required="">
                <div class="hasError" v-if="$v.form_init.lastname.$error">
                    Valid first Lastname is required.
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Telefono (*)</label>
                <input type="text"  class="form-control border-input border-input" id="phone" placeholder="" v-model="form_init.phone" required="">
                <div class="hasError" v-if="$v.form_init.lastname.$error">
                    Valid first phone is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Correo (*)</label>
                <input type="text"  class="form-control border-input border-input" id="email" placeholder="" v-model="form_init.email" required="">
                <div class="hasError" v-if="$v.form_init.email.$error">
                    Valid first Email is required.
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="firstName">Contraseña (*)</label>
                <input type="password"  class="form-control border-input border-input" id="password" placeholder="" v-model="form_init.password" required="">
                <div class="hasError" v-if="$v.form_init.password.$error">
                    Valid first password is required.
                </div>
              </div>
            </div>
            <div>

            </div>
            <button class="btn btn-primary btn-block" @click.prevent="onSubmit">Registrarme</button>

            <router-link :to="{path:'/Login'}">
                <a  class="link"> Ir al login </a>
            </router-link>

        </form>

        <form action="#" v-if="false">
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
              <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
            </div>
            <div>

            </div>
            <button class="btn btn-primary btn-block" type="submit">Enviar</button>
        </form>

      </div>
    </div>
  </div>

 </div>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
    name:'RegisterBM',
    props:{
        business_id:{},
    },
    components: {
    },
    data(){
        return{
            form_init:{
                name:'',
                email:'',
                password:'',
                lastname:'',
                phone:'',
                rol:'business market',
                business:''
            }
        }
    },
    validations(){
        let form_init_val = {form_init:{
            name:{required},
            email:{required},
            password:{required},
            lastname:{required},
            phone:{required},
        }}

        return form_init_val
    },
  methods:{
      
    onSubmit(){
        this.$v.form_init.$touch()
        if(this.$v.form_init.$error) return
        this.form_init.business = this.business_id
        axios.post('auth/register-bm', this.form_init).then(response=>{
            const user = response.data
            console.log("user ", user)
            localStorage.setItem("_current_user_name", user.name)
            localStorage.setItem("_current_user_lastname", user.lastname)
            localStorage.setItem("_current_user_id", user.id)
            localStorage.setItem("_current_user_email", user.email)
            localStorage.setItem("_current_role_id", user.roles[0].id)
            localStorage.setItem("_current_role_name", user.roles[0].name)
            localStorage.setItem("_current_token", user.token)
            localStorage.setItem("_current_bussines_id", this.business_id)
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            //this.redirect()
            }).catch(error =>{
                console.error(error)
        })
    },
    redirect(){
        this.$router.push({ name: "Mi Cuenta" })
    }

  }


};
</script>

<style>

#login {
  background:  #8e04cc url('./../../../assets/img/bg-login.jpg') no-repeat center bottom;
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
