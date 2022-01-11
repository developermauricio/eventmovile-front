<template>
    <div class="row">
        <router-link class="col-1 text-right" :to="{name:'Mis Eventos' }">
            <a href="#/events" class="">
            <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                <span class="ti-arrow-left"></span>
            </button>
            </a>
        </router-link>
        <div class="col-6"></div>
        <div class="col-5"></div>
        <div class="row">
            <div class="card" style="width:400px">
                <div class="card-body">
                    <h4 class="card-title">Jane Doe</h4>
                    <p class="card-text">Some example text some example text. Jane Doe is an architect and engineer</p>
                    <a href="#" class="btn btn-primary">See Profile</a>
                </div>
                <img class="card-img-bottom" src="img_avatar6.png" alt="Card image" style="width:100%">
            </div>
        </div>
    </div>
</template>
<script>
import { required } from "vuelidate/lib/validators"

export default {
    name: 'adminAlbum',
    components:{  },
    props:{
      event_id:{        
        type: Number,
      },
    },
    mounted(){
      //alert(this.event_id)
      this.getPhotosPublic()
    },
    data(){
      return{
        activitiesSelected:[],        
      }
    },
    validations: {
      
      formFair:{
        name:{required},
        description:{required},        
        pic:{required},
        contact:{required}
      },
    },
    methods: {
      createFair(){        
        var data = new FormData
        data.append('name_company',this.formFair.name)
        data.append('description_company',this.formFair.description)
        data.append('logo_company',this.formFair.pic)
        data.append('contact_company',this.formFair.contact)
        data.append('id_event',this.event_id)
                
        axios.post('createCompany', data).then(response=>{
          this.formFair.name = ''
          this.formFair.description = '' 
          this.formFair.pic = ''
          this.formFair.contact = ''
          this.$swal('Empresa creada')
          this.getFeriaComercial()
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })
      },
      piclogo(e) {
        let files = e.target.files || e.dataTransfer.files;
        this.formFair.pic = files[0];
        let label = document.getElementById("pic");
        label.innerText = files[0].name;
      },
      getFeriaComercial(){
        axios.get(`getCompanyFair/${this.event_id}`).then(response =>{
          console.log('speaker:',response.data.data );                              
          this.feria = response.data.data 
        })                        
      },
      destroyCompany(id){
        let params = {
          id: id
        }      
        axios.put('removeCompany/',params).then(response=>{
            //this.$swal({icon:'success', text:'borrada'})
            this.getFeriaComercial()
         }).catch(error=>{
            this.$swal({icon:'error', text:error})
         })        
      }
    },
    
};


</script>

<style>
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
