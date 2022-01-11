<template>
    <div>
        <div class="col-12-col-md-12 text-center">
            <router-link class="bg-ligth"  :to="{name:'indexWA' }" >
                <b class="text-info"> Atras</b>
            </router-link> 
        </div>
        <div id="il7pp" class="section">
            <div id="ih4oa" class="section_top">
                <div id="if6ev" class="section_top_tit">Feria empresarial
                </div>
                <div id="i7ici" class="section_top_right">
                    <div id="ikzng" class="section_all_more_txt section_top_all">
                        <input class="form-control" v-model="search" @keyup="filterFeria" type="text" name="feriaSearch" id="">
                    </div>
                </div>
            </div>
            </div>
            <div id="igpndj" class="section_cont">
            <div class="speakers_cont row" id="resultado">                                
                <div v-for="(fer, index) in feria" :key="index" class="col-12 speakers_cont_el speakers_el_color1">                        
                    <img v-if="result == false"  class="speaker_el_img" :src="urlImg+fer.logo_company" />
                    <div v-if="result == false"  class="speakers_el_job">{{fer.name_company}}</div>
                    <div v-if="result == false"  class="speaker_el_name">{{fer.description_company}}</div>                    
                    <div v-if="result == false"  class="speaker_el_name">{{fer.contact_company}}</div>                                           
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
            feria:[],
            urlImg : process.env.VUE_APP_API_URL_FILES,
            search:'',
            result:false
        }
    },
    mounted(){
        this.eventId = localStorage.getItem("eventId")
        this.getFeriaComercial()
    },
    methods:{
        getFeriaComercial(){
            axios.get(`getCompanyFair/${this.eventId}`).then(response =>{
              console.log('speaker:',response.data.data );                              
              this.feria = response.data.data 
            })            
        },
        filterFeria(){
            
            const res = document.querySelector('#resultado')
            this.result = true
            res.innerHTML = ''         
            for(let fer of this.feria ){
                let name = fer.name_company                
                if(name.indexOf(this.search)!== -1){
                    res.innerHTML += `
                    <div class="col-12 speakers_cont_el speakers_el_color1">
                        <img class="speaker_el_img" src="${this.urlImg+fer.logo_company}" />
                        <div class="speakers_el_job">${fer.name_company}</div>
                        <div class="speaker_el_name">${fer.description_company}</div>                    
                        <div class="speaker_el_name">${fer.contact_company}<div>   
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