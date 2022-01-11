<template>
    <div>
        <div class="col-12-col-md-12 text-center">
            <router-link class="bg-ligth"  :to="{name:'indexWA' }" >
                <b class="text-info"> Atras</b>
            </router-link> 
        </div>
        <div id="il7pp" class="section">
            <div id="ih4oa" class="section_top">
                <div id="if6ev" class="section_top_tit">Speakers
                </div>
                <div id="i7ici" class="section_top_right">
                    <div id="ikzng" class="section_all_more_txt section_top_all">
                        <input class="form-control" @keyup="filterSpeakers" v-model="search" type="text" name="feriaSearch" id="">
                    </div>
                </div>
            </div>
            </div>
            <div id="igpndj" class="section_cont">
            <div class="speakers_cont" id="resultado">
                <div v-for="(spe, index) in speakers" :key="index" class="speakers_cont_el speakers_el_color1">
                    <img v-if="result == false" class="speaker_el_img" :src="urlImg+spe.speaker_photo" />
                    <div v-if="result == false" class="speakers_el_job">{{spe.speaker_description}}</div>
                    <div v-if="result == false" class="speaker_el_name">{{spe.speaker_name}}</div>                    
                </div>               
            </div>
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            eventId:0,
            speakers:[],
            urlImg : process.env.VUE_APP_API_URL_FILES,
            search:'',
            result:false,
        }
    },
    mounted(){
        this.eventId = localStorage.getItem("eventId")
        this.getSpeakersEvent()
    },
    methods:{
        getSpeakersEvent(){
            axios.get(`getSpeakers/${this.eventId}`).then(response =>{
              console.log('speaker:',response.data.data );                              
              this.speakers = response.data.data 
            })            
        },
        filterSpeakers(){
            
            const res = document.querySelector('#resultado')
            this.result = true
            res.innerHTML = ''         
            for(let spe of this.speakers ){
                let name = spe.speaker_name                
                if(name.indexOf(this.search)!== -1){
                    res.innerHTML += `
                    <div class="speakers_cont_el speakers_el_color1">
                        <img class="speaker_el_img" src="${this.urlImg+spe.speaker_photo}" />
                        <div class="speakers_el_job">${spe.speaker_description}</div>
                        <div class="speaker_el_name">${spe.speaker_name}</div>                    
                    </div>
                    `
                }
            }
            if(res.innerHTML=== ''){
                res.innerHTML += `<div class="speakers_el_job">Nada encontrado</div>`
            }
        }
    }
}
</script>