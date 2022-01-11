<template>
   
      <!-- col 1 -->
      <div class="col-md-5 p-4">
        <!-- profaile -->
        <div class="row company main mb-3">
          <div class="col-md-12  p-4 box-card">



              <div class="row">

                <!-- Company -->
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Empresa /</h4>
                    </div>
                  </div>


                  

                  <div class="row mt-4">
                    <div class="col-md-12">
                      <img class="brand" v-if="company.pic === undefined" :src="require('./../../../../assets/img/defaults/company.png')"> 
                      <img class="brand"  :src="url(company.pic)" v-if="company.pic !== undefined"/>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-md-12">
                      <p class="title-2"><strong>{{company.name}}</strong></p>
                    </div>
                  </div>

                  <div class="row mt-2">
                    <div class="col-md-12">
                      <p class="par-small">
                        {{company.sort_description}}
                      </p>
                      <p>
                        <b class="subtitle-2">
                          {{company.address}}
                        </b>
                        <!--<b class="subtitle-2">
                          Bogotá - Colombia
                        </b>-->
                      </p>
                    </div>
                  </div>

                </div>
                <!-- Company -->

                <!-- Perfil -->
                <div class="col-md-6">

                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Mi Perfil /</h4>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-md-12">
                      <img class="avatar" v-if="user.pic === undefined" :src="require('./../../../../assets/img/defaults/person.jpeg')"> 
                      <img class="avatar" :src="url(user.pic)" v-if="user.pic !== undefined && user.pic !== null"/>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-md-12">
                      <p class="subtitle-1">
                        {{user.name}}
                        <br/>
                        <b class="par-small">{{user.position}}</b>
                      </p>
                    </div>
                  </div>

                  <div class="row mt-0">
                    <div class="col-md-12">
                      <p>
                        <b class="subtitle-2">
                          {{user.phone}}
                        </b>
                        <b class="subtitle-2">
                          {{user.email}}
                        </b>
                      </p>
                    </div>
                  </div>

                </div>
                <!-- Perfil -->



              </div>


          </div>
        </div>
        <!-- profaile -->

        <!-- products -->
        <div class="row products main">
          <div class="col-md-12 p-4 box-card mt-0">

            <div class="row">
              <div class="col-md-12">
                <h4 class="box-card__title">Productos /</h4>
              </div>
            </div>

            <div class="row products-content">
              <!-- product -->
              <div class="col-md-4 products-item" v-for="item in listProducts" :key="item.id">
                  <div class="row mt-4">
                    <div class="col-md-12">
                      <img class="producto-foto"  :src="url(item.pic)" v-if="item.pic"/>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <p class="subtitle-2">
                          {{item.name}}
                      </p>
                    </div>
                    <div class="col-md-12">
                      <p >
                          {{item.description}}
                      </p>
                    </div>
                  </div>
              </div>
               <!-- product -->

                          </div>
          </div>
        </div>
        <!-- products -->

      </div>
      <!-- col 1 -->

</template>
<script>
export default {
    name: "BasicProfile",
    props:{
        id:{
            required: true,
        }
    },
    data(){
      return {
        company:{},
        listProducts:{},
        product:{},
        user: {}
      }
    },
    watch: {
      
    },
    created() {
      this.getUserData()
    },
    methods: {
      url(src){
        return `${process.env.VUE_APP_API_URL}storage/${src}`
      },
      getUserData(id){
      
        axios.get(`business-market-user/${this.id}`).then(data=>{
          this.user = data.data[0]
          if(data.data[0].company_id !== null){
            this.company = data.data[0].company
            this.getProducts()
          }
        })
        },
        getProducts(){
            axios.get(`products-by-id/${this.user.company_id}`).then(result=>{
                this.listProducts = result.data.data
            })
        },
    
    },
}
</script>
<style scoped>
    .products-content{
 
    height: 38vh !important;
  
    
  }
</style>