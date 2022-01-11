<template>
  <card class="card">

  <form class="needs-validation" novalidate="">

  <!-- Step 01 -->
    <div id="step01">

      <h4 class="mb-3">Crear usuario </h4>
      <router-link :to="{name:'Admin Users'}">
        <button type="button" class="btn btn-outline-primary btn-sm mx-1">
          <span class="ti-arrow-left"></span>
        </button>
      </router-link>
      <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="Nombre" placeholder="Nombre" v-model=user.name></fg-input>
            <div class="hasError" v-if="$v.user.name.$error">
              El nombre es requerido.
            </div>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Apellido" placeholder="Nombre" v-model=user.lastname> </fg-input>
            <div class="hasError" v-if="$v.user.lastname.$error">
              El apellido es requerido.
            </div>
          </div>
          <div class="col-md-4">
            <label for="firstName">Foto</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="imageUser" accept="image/*" @change="onFileChange" multiple="false">
                <label class="custom-file-label" for="imageUser" id="labelimageUser">Seleccionar</label><span class="copys">77 x 77</span>
              </div>
          </div>
        </div>

         <div class="row">
          <div class="col-md-4">
            <fg-input type="text" label="Cargo"  placeholder="Cargo" v-model=user.position></fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="number" label="Telefono" placeholder="Telefono" v-model=user.phone></fg-input>
            <div class="hasError" v-if="$v.user.phone.$error">
              El numero telefonico es requerido.
            </div>
          </div>
          <div class="col-md-4">
            <fg-input type="email" label="Email" placeholder="Email" v-model=user.email></fg-input>
            <div class="hasError" v-if="$v.user.email.$error">
              El correo es requerido.
            </div>
          </div>
          <div class="col-md-4">
            <fg-input type="text" label="Cedula o No. identificación" placeholder="Cedula o No. identificación" v-model=user.uid></fg-input>
            <div class="hasError" v-if="$v.user.uid.$error">
              El correo es requerido.
            </div>
          </div>
          <div class="col-md-8 mb-3">
            <label for="validationDefault04">Seleccionar rol</label>
            <multiselect :options="roles" v-model="roleSelected"  width="100px"  track-by="name"
            :multiple="false"  label="name">
            </multiselect>
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationDefault04">Seleccionar empresa</label>
            <multiselect :options="companies" v-model="companySelected"  width="100px"  track-by="name"
            :multiple="false"  label="name">
            </multiselect>
          </div>
          <div class="col-md-3 mb-3">
            <button @click="showCreateCompany" class="btn btn-primary">Crear empresa</button>
          </div>
          

        </div>


        <div class="col-md-12 text-right">
          <button  class="btn btn-primary" type="submit" @click.prevent="createUser">Guardar Cambios</button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
    </div>
  <!-- Step 01 -->
 
  <modalCompany @getCompanies="getCompanies" :showModal="showModal"></modalCompany>

  </form>


  </card>

</template>
<script>
import { required, minLength } from "vuelidate/lib/validators"
import multiselect from '@/components/ownMultiselect/OwnMultiselect'
import modalCompany from "./components/createCompany"

export default {
    name: 'createStaffAccess',
    components:{ multiselect, modalCompany },
    data(){
      return{
        deparments:[],
        user: {
          name: "",
          email: "",
          phone:"",
          pic:"",
          uid:"",
          password:"",
          position:"",
          company_id:"", 
          rol:"", 
        },
        showModal:false,
        showLoader:false,
        roles:[],
        roleSelected:[],
        deparmentSelected:[],
        companies:[],
        companySelected:[],
        formStaff:{
          quantity:1,
          event_id:null,
        },
        
      }
    },
    validations: {
      user:{
        name:{required},
        lastname:{required},
        phone:{required},
        email:{required},
        rol:{required},
        company_id:{required},
        uid:{required},
      }
    },
    created(){
      this.getRoles()
      this.getCompanies()
    },
    methods: {
      showCreateCompany(){
        this.showModal = !this.showModal
      },
      async getCompanies(){
        const response = await axios.get('company')
        this.companies = response.data.data
      },
      onFileChange(e){
        let files = e.target.files || e.dataTransfer.files
        if(e.target.id === 'imageUser')
          this.user.pic = files[0]
        let label = document.getElementById('labelimageUser');
        label.innerText = files[0].name
      },
      async createUser(){
        this.user.rol = this.roleSelected.name
        this.user.company_id = this.companySelected.id
        this.user.password = this.user.uid
        this.$v.user.$touch()
        if(this.$v.user.$error) return
        let dataUser = new FormData
        dataUser.append('name', this.user.name)
        dataUser.append('lastname', this.user.lastname)
        dataUser.append('email', this.user.email)
        dataUser.append('phone', this.user.phone)
        dataUser.append('pic', this.user.pic)
        dataUser.append('uid', this.user.uid)
        dataUser.append('password', this.user.password)
        dataUser.append('position', this.user.position)
        dataUser.append('company_id', this.user.company_id)
        dataUser.append('rol', this.user.rol)
        
        await axios.post('auth/register', dataUser).catch(error=>{
          this.$swal({icon:'error', text:error.response.data.error})
        })
        this.$swal("Usuario creado correctamente")
        this.$router.push({name:'Admin Users'});
      },    
      getRoles(){
        axios.get('roles?pagination=false').then(response => {
          this.roles = response.data
        })
      },
    },
};


</script>

<style>
.loader {
  margin-left: 48%;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
.btn-sm{
  font-size: 1rem !important;
  padding-right: 1rem;
  padding-left: 1rem;
}

.btn-sm
.order{
      color: black;
      cursor: move;
    }
  .btn-invitaciones{
    position: absolute;
    top: -40px;
    right: 20px;
  }
  .hasError {
    color: red;
  }
</style>
