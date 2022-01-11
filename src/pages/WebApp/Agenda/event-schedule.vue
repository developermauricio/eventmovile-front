<template>    
    <div class="container">
      <h1>Agenda</h1>            
      <div class="row">
        <div class="col-12">
          <input type="text" v-on:keyup="findInSchedule" v-model="findq" name="q" id="q">
          <div id="conentq">
            <div class="col-12">
              <span class="col-12">Speakers:</span>
              <div v-for="(spe,index) in speakerQ" :key="index">{{spe.name}}
              </div>
              <span class="col-12">Actividades:</span>
              <div v-for="(act,index) in activityQ" :key="index">{{act.name}}
              </div>              
            </div>
          </div>
        </div>
      </div>
      <ul class="nav text-center row mt-3">
        <li v-for="stre in streamingList" :key="stre.id" class="nav-item disabled col-3">
          <img :src="urlImg+stre.pic" class="img-fluid rounded-circle" :alt="stre.name" style="width:50px;height:auto;">
          <a style="font-size:10px;" class="nav-link disabled"><b>{{stre.name}}</b></a>
        </li>
      </ul>      
      <div v-if="viewFavo == false" id="content_days">      
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">  
          <ul class="navbar-nav">
            <li v-for="(day,index ) in days" :key="index" class="nav-item col-4">
              <a class="nav-link" :href="paginateDay(index)">Día {{index}}</a>
            </li>
          </ul>
        </nav>
        <div v-for="(day,index) in days" :key="index" :id="'section'+index" class="container-fluid bg-dark" style="padding-top:70px;padding-bottom:70px; border:1px solid #fff;">
          <h1> Día {{index}}</h1>
          <span><b>Actividades: </b></span>
          <div v-for="d in day" :key="d.id">
            <div class="row">
              <div class="col-4">
                <span>Sala: Sala x</span>
                <h5 class="text-info">{{d.name}}</h5>
                <span>{{$moment(d.start_date).format('DD/ hh:mm a')}}</span>            
              </div>
              <div class="col-2">
                <button v-on:click="addFavoSchedule('activity',d.id)">♥</button>
              </div>
              <div class="col-6"></div>
            </div>            
          </div>
        </div>        
      </div>
      <div class="container bg-dark mt-5" v-if="viewFavo">
         <div class="mt-3" style="border-top:1px solid #fff;" v-for="(fav, index) in favorities" :key="fav.id">
          <div class="row">
            <div class="col-4">
              <span>Sala: Sala x</span>
              <h5 class="text-info"> {{fav.name}} </h5>
              <span>{{$moment(fav.start_date).format('DD/ hh:mm a')}}</span>            
            </div>
            <div class="col-2">
              <button v-on:click="removeFavoSchedule(fav.id_fav, index)">quitar</button>
            </div>
            <div class="col-6"></div>
          </div>            
        </div> 
      </div>
      <button v-on:click="viewFav()">Mis ♥</button>
    </div>
</template>

<script>
import "@/assets/css/style-schedule.css"
export default {
  name: 'EventSchedule',
  components:{},
  props:{},    
  data() {
    return{
      days:[],
      streamingList:[],
      urlImg : process.env.VUE_APP_API_URL_FILES,
      event_id:0,
      user_id:0,
      viewFavo:false,
      favorities:[],
      findq:'',
      speakerQ:[],
      activityQ:[],      
    }
  },
  mounted(){
    this.event_id = localStorage.getItem('eventId'),
    this.user_id = localStorage.getItem('_current_user_id'),
    this.getGeneralSchedule()
    this.getActivitiesEventOnSchedule()
    this.getFavoritesSchedule()
  },
  computed:{
    
  },
  methods:{
    findInSchedule(){
      if(this.findq !== '' && this.findq !== ' '){
        let q = this.findq
      }else{
        let q = ""
      }
      axios.get('searchInSchedule/'+this.event_id+'/'+q).then(response=>{
					console.log(response.data)
          this.days = response.data
				}).catch(error=>{
					this.$swal({icon:'error', text:error})
				})
      
    },
    viewFav(){
      if(this.viewFavo){
        this.viewFavo = false;
      }else{
        this.viewFavo = true;
      }
    },
    getGeneralSchedule(){
      axios.get('showSchedule/'+this.event_id).then(response=>{
					console.log(response.data)
          this.days = response.data
				}).catch(error=>{
					this.$swal({icon:'error', text:error})
				})
    },
    getFavoritesSchedule(){
      axios.get('listScheduleFavorites/'+this.user_id+'/'+this.event_id).then(response=>{
					console.log(response.data)
          this.favorities = response.data.data
				}).catch(error=>{
					this.$swal({icon:'error', text:error})
				})
    },    
    paginateDay(day){
      return "#section"+day
    },
    async addFavoSchedule(item,itemId){
      let data = {
        "user_id":this.user_id,
        "type_item":item,
        "item_id":itemId,
        "event_id":this.event_id,
        }    
      await axios.post('addScheduleFavorites', data).then(response => {        
        if(response.status == 200){
          this.$swal({icon:'error', text:response.data.error})
        }else{
          this.$swal({icon:'success', text:response.data.message})
        }          
        }).catch(error=>{
          
        })
        this.getFavoritesSchedule();   
    },
    async removeFavoSchedule(id,index){
      let data = {
        "id":id,
        }    
      await axios.put('removeScheduleFavorites', data).then(response => {          
          this.$swal({icon:'success', text:response.data.message})
        }).catch(error=>{
          this.$swal({icon:'error', text:error})
        })        
        const indexArr = this.favorities.indexOf(index);
        if (indexArr > -1) {
          this.favorities.splice(indexArr, 1);
        }       
        this.getFavoritesSchedule(); 
    },
    async getActivitiesEventOnSchedule(){
      await axios.get('listActivitiesEventOnSchedule/'+this.event_id).then(response=>{
					this.streamingList = response.data.data
				}).catch(error=>{
					this.$swal({icon:'error', text:error})
				})
    }
  }

};
</script>
