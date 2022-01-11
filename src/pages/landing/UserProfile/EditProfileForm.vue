<template>
<div class="wrapper">
  <!-- Perfil  -->
  <card class="card" title="Perfil">

    <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Nombre"
            
                      placeholder="Nombre"
                      v-model=user.name>
            </fg-input>
            <div class="hasError" v-if="$v.user.name.$error">
              El nombre es requerido.
            </div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Apellido"
            
                      placeholder="Nombre"
                      v-model=user.lastname>
            </fg-input>
            <div class="hasError" v-if="$v.user.lastname.$error">
              El apellido es requerido.
            </div>
          </div>

          <!--<div class="col-md-4">
            <fg-input type="text"
                      label="Apellido"
                      :disabled="true"
                      placeholder="Apellido"
                      v-model=user.company>
            </fg-input>
          </div>-->
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
            <fg-input type="text"
                      label="Cargo"
                      placeholder="Cargo"
                      v-model=user.position>
            </fg-input>
      
          </div>

          <div class="col-md-4">
            <fg-input type="number"
                      label="Telefono"
                      placeholder="Telefono"
                      v-model=user.phone>
            </fg-input>
            <div class="hasError" v-if="$v.user.phone.$error">
              El numero telefonico es requerido.
            </div>
          </div>
          <div class="col-md-4">
            <fg-input type="email"
                      label="Email"
                      placeholder="Email"
                      v-model=user.email>
            </fg-input>
            <div class="hasError" v-if="$v.user.email.$error">
              El correo es requerido.
            </div>
          </div>

        </div>


        <div class="col-md-12 text-right">
          <button  class="btn btn-primary"
                  type="submit" @click.prevent="updateProfile">Editar Perfil</button>
          

        </div>
        <div class="clearfix"></div>
      </form>
    </div>

  </card>
  <!-- Perfil  -->
  <!-- Company  -->
  <card class="card" title="Empresa">

    <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Nombre"
                    
                      placeholder="Nombre de la empresa"
                      v-model=company.name>
            </fg-input>
            <div class="hasError" v-if="$v.company.name.$error">
              el nombre es requerido.
            </div>
          </div>
          <div class="col-md-3">

            <label for="firstName">Logo</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" @change="onFileChange" id="imageCompany" accept="image/*" multiple="false">
                <label class="custom-file-label" for="imageCompany" id="labelimageCompany">Seleccionar</label>
                <span class="copys">113 x 61</span>
              </div>
          
          </div>
        </div>

         <div class="row">
            <div class="col-md-4">
              <fg-input type="text"
                        label="Dirección"
                        placeholder="Dirección"
                        v-model="company.address">
              </fg-input>
              <div class="hasError" v-if="$v.company.address.$error">
                La direccion es requerida.
              </div>
            </div>

            <!--<div class="col-md-4">
              <fg-input type="text"
                        label="Departamento"
                        placeholder="Departamento"
                        v-model="user.departament">
              </fg-input>
            </div>
            <div class="col-md-4">
              <fg-input type="text"
                        label="Ciudad"
                        placeholder="Ciudad"
                        v-model="user.city">
              </fg-input>
            </div>-->
            <div class="col-md-4">
            <fg-input type="number"
                      label="Telefono"
                      placeholder="Telefono"
                      v-model="company.phone">
            </fg-input>
            <div class="hasError" v-if="$v.company.phone.$error">
                El numero de telefono es requerido.
              </div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
              label="Email"
              placeholder="Email"
              v-model="company.email">
            </fg-input>
            <div class="hasError" v-if="$v.company.email.$error">
              El correo es requerido.
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-1">
            <label for="firstName">Descripción</label>
            <textarea class="form-control"  name="" id="" cols="30" rows="3" v-model="company.sort_description"></textarea>
            <div class="hasError" v-if="$v.company.sort_description.$error">
              La descripción es requerida.
            </div>
          </div>
        </div>

        <div class="col-md-12 text-right">
          <button  class="btn btn-primary" type="submit" @click.prevent="updateCompany">
            <template v-if="todocs.id === '' || todocs.id===null">Crear empresa</template>
            <template v-if="todocs.id !== '' && todocs.id!==null">Editar empresa</template>
          </button>
          
        </div>
        <div class="clearfix"></div>
      </form>
    </div>

  </card>
  <!-- Company  -->
  <!-- Productos  -->
  <card class="card" title="Productos y/o Servicios">
    <p v-if="todocs.id === '' || todocs.id===null">Por favor crea primero la empresa</p>
    <div class="row" v-if="todocs.id !== '' && todocs.id!==null">
      <div class="col-8">
        <h4 class="mb-3">Listado de Productos y/o Servicios</h4>
      </div>
      <div class="col-md-3 mb-0">
        <button class="btn btn-outline-primary w-100" @click.prevent="resetProduct">Nuevo</button>
      </div>

      <div class="col-md-6 mb-3">
        <label for="firstName">Nombre</label>
        <input type="text" class="form-control" id="firstName" placeholder="Minimo 6 caracteres" v-model=product.name required="">
        <div class="hasError" v-if="$v.product.name.$error">
            El nombre es requerido.
        </div>
        <div class="hasError" v-if="!$v.product.name.minLength">
          Debe tener mas de 6 caracteres.
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <label for="firstName">Imagen</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" @change="onFileChange" id="imageProduct" accept="image/*" multiple="false">
            <label class="custom-file-label" for="imageProduct" id="labelimageProduct">Seleccionar</label><span class="copys">116 x 116</span>
          </div>
    
      </div>

      <div class="col-md-12 mb-1">
          <label for="firstName">Descripción</label>
          <textarea class="form-control"  name="" id="" cols="30" rows="2" placeholder="Maximo 150 caracteres" v-model=product.description></textarea>
          <div class="hasError" v-if="!$v.product.description.maxLength">
            Maximo 150 caracteres.
          </div>
        </div>



      <div class="col-md-12 mb-3">
        <button  class="btn btn-outline-primary"
                type="submit" @click.prevent="AddProduct">Agregar</button>
  
      </div>



      <!-- Table -->
      <div class="col-md-12">

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <!--<th scope="col">Imagen</th>-->
              <th scope="col" class="text-right">Opciones</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="item in listProducts" :key="item.id">
              <th scope="row">
                  {{item.id}}
              </th>
              <td>{{item.name}}</td>
              <td class="text-right">

                <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click.prevent="ProductToUpdate(item)">
                    <span class="ti-pencil-alt"></span>
                </button>

                <button type="button" class="btn btn-outline-danger btn-sm mx-1" @click.prevent="deleteProduct(item.id)">
                    <span class="ti-trash"></span>
                </button>

                <!--<button type="button" class="btn btn-outline-secundary  btn-sm">
                    <span class="ti-split-v order"></span>
                </button>-->

              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <!-- Table -->
    </div>
  </card>
  <!-- Productos  -->


  <!-- Documentos  -->
    <card class="card" title="Mis Documentos">
      <p v-if="todocs.id === '' || todocs.id===null">Por favor crea primero la empresa</p>
      <template v-if="todocs.id !== '' && todocs.id!==null">
        <documents :showForm="true" :model="todocs" :id="todocs.id" ></documents> 
      </template>
    </card>
  <!-- Documentos  -->

  <!-- Plan Evento -->
  <!---<card class="card" title="Eventos / Plan Basic" v-if="false">

    <div>
      <form @submit.prevent>
        <div class="row p-4">
          <div class="col-md-4">
            <label> Tu plan Basic incluye:</label>
            <br>
            <br>
            <ul class="list-group">
              <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Ruedas de Negocios
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Eventos publicos y privados
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              50 Invitaciones al mes
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            </ul>
          </div>
          <div class="col-md-2">

          </div>
          <div class="col-md-4">
            <div class="row p-4">
                <div class="col-md-12">
                  <label>Valor actual:</label>
                  <p class="price"> $150.000</p>
                </div>
                <div class="col-md-12">
                  <label>Próximo cobro:</label>
                  <p class="date">04 / 09 / 2020 </p>
                </div>
                <div class="col-md-12">
                    <p-button type="info"
                      round
                      >
                        Cambiar Plan
                      </p-button>
                </div>
            </div>
          </div>


        </div>

      </form>
    </div>

  </card>
  <!-- Plan Evento -->

  <!-- Plan Rueda de negocio -->
  <!--<card class="card" title="Rueda de Negocios / Plan Basic" v-if="false">

    <div>
      <form @submit.prevent>
        <div class="row p-4">
          <div class="col-md-4">
            <label> Tu plan Basic incluye:</label>
            <br>
            <br>
            <ul class="list-group">
              <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Ruedas de Negocios
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Asistencia a Eventos publicos y privados
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              50 Invitaciones al mes
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            <li class="list-group-item">
              <span class="ti-check-box"></span>
              Administración de Eventos
            </li>
            </ul>
          </div>
          <div class="col-md-2">

          </div>
          <div class="col-md-4">
            <div class="row p-4">
                <div class="col-md-12">
                  <label>Valor actual:</label>
                  <p class="price"> $150.000</p>
                </div>
                <div class="col-md-12">
                  <label>Próximo cobro:</label>
                  <p class="date">04 / 09 / 2020 </p>
                </div>
                <div class="col-md-12">
                    <p-button type="info"
                      round
                      >
                        Ver Historial de pagos
                      </p-button>
                </div>
            </div>
          </div>


        </div>

      </form>
    </div>
    
  </card>-->
  
  <!-- Plan Rueda de negocio -->
</div>
</template>
<script>

import { required, minLength, maxLength } from "vuelidate/lib/validators"
import documents from "@/components/Forms/formDocuments"
export default {
  name:"completeProfile",
  components:{
    documents
  },
  data() {
    return {
      formDocuments: true,
      company:{

        name:"",
        lastname:"",
        address:"",
        phone:"",
        email:"",
        nit:"",
        sort_description:"",
        pic:"",
        address:"",
      },
      todocs:{
        id:"",
        model:"company"
      },
      listProducts:[],
      listProductsTmp:[],
      product:{
        name:"",
        description:"",
        type: "",
        model_id:"",
        pic:"",
        id:""
      },
      user: {
        name: "",
        email: "",
        phone:"",
        pic:"",
        nit:"",
        position:"",
        company_id:""  
      }
    };
  },
  validations(){
    let form_init_val = {
      company:{
        name:{required},

        address:{required},
        phone:{required},
        email:{required},
        sort_description:{required},
      },
      product:{
        name:{required, minLength: minLength(6)},
        description: { maxLength: maxLength(150)}
      },
      user:{
        name:{required},
        lastname:{required},
        phone:{required},
        email:{required},
      }
    }
    return form_init_val
  },
  watch:{
    listProducts: function(val){
      //console.log("listProducts")
      if(val.length > 0){
        this.$emit("link_bussines", true)
      } else {
        this.$emit("link_bussines", false)
      }
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    getUserData(){
      const role = localStorage.getItem('_current_role_name')
      const id = localStorage.getItem('_current_user_id')
      
        axios.get(`users/${id}`).then(data=>{
          const label = document.getElementById('labelimageUser')
          label.innerText = data.data.pic
          this.user.name = data.data.name
          this.user.lastname = data.data.lastname
          this.user.email = data.data.email
          this.user.phone = data.data.phone
          this.user.position = data.data.position
          this.user.company_id = data.data.company_id
          this.todocs.id = this.user.company_id

          if(data.data.company_id !== null){
            const label = document.getElementById('labelimageCompany')
          label.innerText = data.data.company.pic
            this.company.name = data.data.company.name
            this.company.email = data.data.company.email
            this.company.phone = data.data.company.phone
            this.company.sort_description = data.data.company.sort_description
            this.company.address = data.data.company.address
            this.product.model_id = data.data.company_id
            
            this.getProducts()
            }
        })
    },
    ProductToUpdate(item){
      
      const label = document.getElementById('labelimageProduct')
      //const tmp = this.listProductsTmp.filter(item2 => (item2.id===item.id))
      
      label.innerText = item.pic ? item.pic : "" 
      //delete item.pic
      if(item.description === null || item.description === "null")
        item.description = "";
      
      this.product = item
    },
    getProducts(){
      axios.get(`products-by-id/${this.user.company_id}`).then(result=>{
        this.listProducts = result.data.data
        this.listProductsTmp = JSON.parse(JSON.stringify(result.data.data))
      }).catch(error=>{
					this.$swal({icon:'error',text:error})
				})
    },
    async updateCompany(){
      this.$v.company.$touch()
      if(this.$v.company.$error) return

      let final_form = new FormData()

      for ( let key in this.company) {
        final_form.append(key, this.company[key]);
      }
      final_form.append('country_id', 1)

      if(this.user.company_id === "" || this.user.company_id === null){
        const id = localStorage.getItem('_current_user_id')
        const res = await axios.post(`company`,final_form)
        axios.put(`business-market-user/${id}`,{"company_id":res.data.data.id}).then(result =>{
            this.$swal('Empresa creada')
              this.user.company_id = result.data.data.company_id
              this.product.model_id = result.data.data.company_id
              this.todocs.id = this.user.company_id
        }).catch(error=>{
					this.$swal({icon:'error',text:error})
				})
      } else {
        axios.post(`company/${this.user.company_id}?_method=PUT`,final_form).then(res=>{
          this.$swal('Compañia Actualizada')
        }).catch(error=>{
					this.$swal({icon:'error',text:error})
				})
      } 
    },
    updateProfile() {
      this.$v.user.$touch()
      if(this.$v.user.$error) return
      
      let final_form = new FormData()

      for ( let key in this.user) {
        if(key === "company_id" && this.user[key] !== null)
          final_form.append(key, this.user[key]);
        if(key !== "company_id")
          final_form.append(key, this.user[key]);
      }
      const id = localStorage.getItem('_current_user_id')
      axios.post(`business-market-user/${id}?_method=PUT`,final_form).then(result =>{
          this.$swal('Datos Actualizados')
      }).catch(error=>{
					this.$swal({icon:'error',text:error})
				})

    },
    deleteProduct(id){
      this.$swal.fire({
          'title':"Eliminar producto?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
      }).then(rta=>{
          if(rta.isConfirmed)
              axios.delete(`product/${id}`).then(res=>{
                let tmp = this.listProducts.filter(item=>item.id !== id)
                this.listProducts = tmp
              }).catch(error=>{
                this.$swal({icon:'error',text:error})
              })
      })  
    },
    resetProduct(){
      this.product={
        ...this.product,
        name:"",
        description:"",
        type: "",
        pic:"",
        id:""
      }
      let labels = document.getElementsByClassName('custom-file-label');
      for(let i=0; i<labels.length; i++){
        if(labels[i].htmlFor === "imageProduct")
          labels[i].innerText = ""
      }

      this.$v.$reset()
    },
    AddProduct(){
      this.$v.product.$touch()
      if(this.$v.product.$error) return

      if(this.user.company_id === "" || this.user.company_id === null) {
        this.$swal({icon:'error', text:'Faltan crear compañia'})
        return
      }

      let final_form = new FormData()
      for ( let key in this.product) {
        if(key !== "id"){
          if(key === "pic" && this.product[key] !== null)
            final_form.append(key, this.product[key])
          if(key !== "pic")
            final_form.append(key, this.product[key])
          }
          
          
      }

      if(this.product.id === ""){
        axios.post(`product`,final_form).then(result =>{
          this.$swal('Producto Creado').then(res=>{
            this.resetProduct()
          })
  
          this.listProducts.push(result.data.data)
        }).catch(error=>{
          this.$swal({icon:'error',text:error})
        })
      } else {
        axios.post(`product/${this.product.id}?_method=PUT`,final_form).then(result =>{
          this.$swal('Producto Actualizado').then(res=>{
            this.listProducts = this.listProducts.map(item=>{
              if(item.id === this.product.id )
                return result.data.data
              else
                return item
            })
            this.resetProduct()
          })
          
        }).catch(error=>{
					this.$swal({icon:'error',text:error})
				})
      }
    },
    onFileChange(e){
      let files = e.target.files || e.dataTransfer.files
      if(files[0].size/1024/1024 > parseInt(process.env.VUE_APP_FILE_SIZE)){
        this.$swal({icon:'error', text:`Archivos menores a ${process.env.VUE_APP_FILE_SIZE}MB`})
        return
      }

      if(e.target.id === 'imageUser')
        this.user.pic = files[0]
      if(e.target.id === 'imageCompany')
        this.company.pic=files[0]
      if(e.target.id === 'imageProduct')
        this.product.pic=files[0]
      let labels = document.getElementsByClassName('custom-file-label');
      for(let i=0; i<labels.length; i++){
        if(labels[i].htmlFor === e.target.id)
          labels[i].innerText = files[0].name
      }
    },
  }
};
</script>
<style>


.price {
  margin: 0 !important;
}

.date {
  font-size: 30px;
}
</style>
