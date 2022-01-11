<template>
    <div>
        <div class="col-12-col-md-12 text-center">
            <router-link class="bg-ligth"  :to="{name:'indexWA' }" >
                <b class="text-info"> Atras</b>
            </router-link> 
        </div>
        <div  class="container">
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <img id="idMapa" :src="urlImg+mapa" alt="">
                </div>
                <div class="col-1"></div>
            </div>
        </div>            
    </div>
</template>
<script>
export default {
    data() {
        return{
            eventId:0,    
            urlImg : process.env.VUE_APP_API_URL_FILES,
            mapa:'',        
        }
    },
    mounted(){
        this.eventId = localStorage.getItem("eventId")        
        this.getMapa()
    },
    methods:{  
        getMapa(){
            //ASA
            axios.get('getMapa/'+this.eventId).then(response=>{
                console.log(response.data.data)                
                this.mapa = response.data.data
            }).catch(error=>{
                this.$swal({icon:'error', text:error})
            })
        }      
    }
}
</script>

<style>
#idMapa{
    width: 100%;
    height: 100%;
}
</style>