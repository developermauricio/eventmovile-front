<template>
  <div>
    
    <div class="flex xs12 md12" v-if="searchable">
        <va-input v-model="querySearch" placeholder="Buscar cualquier cosa" v-debounce:1000ms="sendSearch">
          <va-icon name="fa fa-search" slot="prepend"/>
        </va-input>
    </div>
    <div class="markup-tables">
        <va-data-table
        :fields="columns"
        :data="rows"
        :perPage="perPage"
        :loading="loading"
        :totalPages="totalPages"
        @page-selected="toggleFunction"
        v-if="drawComponent"
        api-mode
            >
                
                    <template slot="actions" slot-scope="todo">
                        <slot name="pagination_buttons" v-bind:todo="todo">
                            
                        </slot>
                    </template>
                    <template slot="avatar" slot-scope="todo">
                        <slot name="imagen" v-bind:todo="todo">
                            
                        </slot>
                    </template>
                
        </va-data-table>
    </div>
  </div>

  
</template>

<script>

import Vue from 'vue'
import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)
export default {
  props:{
    color:{
      type:String,
      default:'dark'
    },
    columns:{
      type:Array,
      required:true
    },

    stateText:{
      default:false
    },
    uri:{
      type:String,
      required:true
    },
    searchable:{
      default:true
    },
    team:{
      type:String,
      default:''
    },
    value: ''
  
  },
  data () {
    return {
      querySearch:'', 
      perPage: 6,
      totalPages:2,
      items: [],
      loading: false,
      rows:[],
      drawComponent:true 
    }
  },
  watch:{
    uri:{
      handler:function(newVal){
          if(newVal !== ''){
            
            this.getRows()}
        },
      deep: true}
  },
  created(){
    this.getRows()
    this.$bus.$on('updatePagination',() => {
      this.resetDataTable();
      this.getRows(1)
    })
  },

  methods: {
    resetDataTable(){
      let vm = this;
      vm.drawComponent = false;
      Vue.nextTick(function() {
        vm.drawComponent = true;
    })
    },
    toggleFunction(pagina = 1){
      if(this.querySearch != ''){
        this.getSearch(pagina)
      }else{
        this.getRows(pagina);
      }
    },
    sendSearch(){
        this.Page = 1            
        this.getSearch()
    },
    getSearch(pageSelected = 1){
      
        if(this.querySearch === ''){
          this.getRows()
        }else{
          let url = 'searchTable'
          this.loading = true
          let campaigns = localStorage.getItem('_campaigns');
          let listCampaigns = JSON.parse(campaigns)
          let campaign_id = listCampaigns[0]['id']
          let api = this.uri.split('/')
          api = api[0]
          let dataSearch = []
          dataSearch = {
            method: api,
            campaign_id: campaign_id,
            search: this.querySearch,
            pagination: true,
            team:this.team,
            per_page: this.perPage,
            page: pageSelected,
            value: this.value
          }
          axios.post(url, dataSearch).then(response => {
              this.loading = false
              if(response.data.data.data){
                var dataInfoSerch = response.data.data.data
                let total = dataInfoSerch.total
              }else{
                if(response.data.data){
                  var dataInfoSerch = response.data.data
                  let total = dataInfoSerch.pagination.total
                }else{
                  if(response.data){
                    var dataInfoSerch = response.data
                    let total = dataInfoSerch.pagination.total
                  }
                }
              }
              this.totalPages = Math.ceil(Number(total)/Number(this.perPage))
              if(this.stateText === true ){
                this.rows = dataInfoSerch.map(item=> {
                    if(item.hasOwnProperty('winnered')){
                                        if(item.winnered === null){
                                            item.winnered = 'Sin datos'
                                        }else if(item.winnered === 0){
                                            item.winnered = 'No'
                                        }else{
                                            item.winnered = 'Si'
                                        }
                                  } 
                  if(item.hasOwnProperty('category')){
                    if(item.category === null){
                        item.category ={
                          'name' : 'No aplica'
                        }
                    }
                } 
                  if(item.hasOwnProperty('mrchispa')){
                    if(item.mrchispa=="1"){
                      item.mrchispa='Actualizado'
                    }else{
                      item.mrchispa='Sin actulizar'
                    }
                  }
                  if(item.hasOwnProperty('delivered')){
                    if(item.delivered==1){
                      item.delivered='Entregado'
                    }else{
                      item.delivered='No entregado'
                    }
                  }
                    if(item.estado == 0){
                      item.estado = 'Inactivo'
                    }else{
                      item.estado = 'Activo'
                    }
                    if(item.state == 0){
                      item.state = 'Inactivo'
                    }else{
                      item.state = 'Activo'
                    }
                  return item
                })
              }else{
                this.rows = dataInfoSerch
              }
              //console.log(this.rw
          })
        } 
    },
    getRows(pageSelected = 1){
      if(this.uri !== ''){
        let params = {
            pagination: true,
            per_page: this.perPage,
            page: pageSelected,
        }

        this.url = this.uri
        this.loading = true
        axios.get(this.url,{params}).then(response => {
            this.loading = false
            if(response.data.data.data){
              var dataInfo = response.data.data.data
              var total = response.data.data.total
            }else{
              if(response.data.data){
                var dataInfo = response.data.data
                var total = response.data.pagination.total
                
              }else{
                var dataInfo = response.data
                var total = response.pagination.total
              }
              
            }
            this.totalPages = Math.ceil(Number(total)/Number(this.perPage))
            if(this.stateText === true ){
              this.rows = dataInfo.map(item=> {
                  if(item.hasOwnProperty('winnered')){
                                        if(item.winnered === null){
                                            item.winnered = 'Sin dato'
                                        }else if(item.winnered == 0){
                                            item.winnered = 'No'
                                        }else{
                                            item.winnered = 'Si'
                                        }
                                  } 
                if(item.hasOwnProperty('category')){
                    if(item.category === null){
                        item.category ={
                          'name' : 'No aplica'
                        }
                    }
                }  
                if(item.hasOwnProperty('delivered')){
                  if(item.delivered==1){
                    item.delivered='Entregado'
                  }else{
                    item.delivered='No entregado'
                  }
                }
                if(item.hasOwnProperty('mrchispa')){
                  if(item.mrchispa=="1"){
                    item.mrchispa='Actualizado'
                  }else{
                    item.mrchispa='Sin actulizar'
                  }
                }
                  if(item.estado == 0){
                    item.estado = 'Inactivo'
                  }else{
                    item.estado = 'Activo'
                  }
                    if(item.state == 0){
                      item.state = 'Inactivo'
                    }else{
                      item.state = 'Activo'
                    }
                return item
                })
            }else{
              this.rows = dataInfo
            }
        })
        }

    },
  },
}
</script>
<style>
</style>
