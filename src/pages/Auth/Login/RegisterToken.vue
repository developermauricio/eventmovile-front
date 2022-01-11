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
                <label for="firstName">Nombres</label>
                <input type="text" v-model="form.name"  class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.name.$error">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Apellidos</label>
                <input type="text"  v-model="form.lastname" class="form-control border-input border-input" id="firstName" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.lastname.$error">
                  Valid first name is required.
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Telefono</label>
                <input type="text" v-model="form.phone" class="form-control border-input border-input" id="phone" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.phone.$error">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Correo</label>
                <input type="text"  v-model="form.email" class="form-control border-input border-input" id="email" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.email.$error">
                  Valid first name is required.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">NIT o #identificación</label>
                <input type="text" v-model="form.uid" class="form-control border-input border-input" id="password" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.uid.$error">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Genero</label>
                <select class="form-control" v-model="form.gender">
                  <option>Femenino</option>
                  <option>Masculino</option>
                </select>
               <div class="hasError" v-if="$v.form.gender.$error">
                  Valid first name is required.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Especialidad</label>
                <input type="text" v-model="form.specialty"  class="form-control border-input border-input" id="password" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.specialty.$error">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Cargo de trabajo</label>
                <input type="text" v-model="form.job_title"  class="form-control border-input border-input" id="password" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.job_title.$error">
                  Valid first name is required.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Contraseña</label>
                <input type="text" v-model="form.password"   class="form-control border-input border-input" id="password" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.form.password.$error">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="firstName">Confirmar contraseña</label>
                <input type="text" v-model="vPassword"   class="form-control border-input border-input" id="password" placeholder="" value="" required="">
                <div class="hasError" v-if="$v.vPassword.$error">
                  Valid first name is required.
                </div>
              </div>
            </div>
            <div>
              <input type="checkbox"><label style="margin-left:2%">Autorizo la política de tratamiendo de datos</label>
            </div>
            <button class="btn btn-primary btn-block" @click.prevent="registerUser">Registrarme</button>

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
  name:'RegisterToken',
  components: {
  },
  data(){
    return{
      tokenInvitation:null,
      vPassword:'',
      form:{
        name:'Cristian Camilo',
        phone:'3134329248 ',
        lastname:'Narvaez U',
        email:'camilo.narv13@gmail.com',
        password:'',
        gender:'Masculino',
        specialty:'Backend developer',
        job_title:'Developer senior',
        uid:'4888107',
      }
    }
  },
  validations:{
    vPassword:{required},
    form:{
      lastname:{required},
      name:{required},
      phone:{required},
      email:{required},
      password:{required},
      gender:{required},
      specialty:{required},
      job_title:{required},
      uid:{required},
    }
  },
  created(){
    this.verifyToken()
  },
  methods:{
    verifyToken(){
      this.tokenInvitation = this.$route.query.token
      axios.get('showToken/'+this.tokenInvitation).then(resposen=>{
        let data = resposen.data
        if(data.actived == false || data.actived == null){
          this.$swal('Registrate para porder ingresar al evento')
        }else{
          this.$swal({icon:'error',text:'Esta invitación ya esta siendo usuada'})
          this.$router.push({ name: "Login" })
        }
      }).catch(error=>{
        this.$swal({icon:'error', text:'No existe ninguna invitación'})
      })
    },
    registerUser(){
      this.$v.form.$touch()
      if(this.$v.form.$error) return
      if(this.form.password != this.vPassword){
        this.$swal({icon:'error', text:'Las contraseñas no coiciden'})
        this.form.password = ''
        this.vPassword = '' 
      }else{
        axios.post('auth/register', this.form).then(response=>{
          const user = response.data.data
          let dataPost = {
            user_id:user.id,
            actived:true,
            token:this.tokenInvitation
          }
          axios.post('verifyUrl', dataPost).then(response =>{
            this.$router.push({ name: "login" })
          }).catch(error=>{
            this.$swal({icon:'error', text:'Error al asociar invitación'})
          })
        }).catch(error =>{
          this.$swal({icon:'error', text:'Error al ingresar'})
        })
      }
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
  padding: 0.5% 0;
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
