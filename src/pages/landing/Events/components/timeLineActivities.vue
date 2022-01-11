<template>
    <div v-show="idNow!=data.id" class="mt-0 col-md-12">        
        <div class="row mt-0">
            <div class="line"></div>        
            <div class="col-md-12 mt-0 mb-0">
                <div class="timeline-item-line-time timeline-event row">   
                    <p></p>                                                           
                    <div v-if="isActiveNow">                        
                        <p class="col-12 timeline-hour-active" style="margin: 4% 0% 0% 3%; width: 100%;">{{$moment(data.start_date).format('DD/   hh:mm a')}}</p>
                    </div>                
                    <div v-else>                        
                        <p class="col-12  timeline-hour-no" style="margin: 4% 0% 0% 3%; width: 100%;">{{$moment(data.start_date).format('DD/   hh:mm a')}}</p>
                    </div>                 
                    <div class="col-md-10 p-1 timeline-item-info ml-0">
                        <p @click="validateAll(data.id, data.authorization)" style="cursor:pointer;" class="subtitle-1 mb-0">{{data.name}}</p>                                 
                        <p class="details_activity_cronogram" style="font-size:12px;" v-html="data.sort_description"></p>      
                    </div>
                </div>       
            </div>        
        </div>
    </div>
</template>

<script>
export default {
    name:"timeline",
    props:['data','idNow'],
    data() {
        return {        
            now:'',
            aBegin:'',
            aEnd:'',
            isActiveNow:false,    
        }
    },
    mounted(){                
        //llamamos cada 
        this.validIsNowActi()
        // console.log('activi_11111')
        console.log('activi_11111',this.data)
        //setInterval( this.isActive(), 1000);
    },
    computed: {                     
    },
    watch: {        
    },
    methods: {              
        isActive(){
            console.log('valid is now activities')
            let now = new Date()
            let d = now.getDate()
            let m = now.getMonth()+1
            let a = now.getFullYear()
            let h = now.getHours()
            let min = now.getMinutes()
            let s = now.getSeconds()
            let dateNow = a+'-'+m+'-'+d+' '+h+':'+min+':'+s                  
            let begin = this.$moment(this.data.start_date).format('YYYY-MM-DD HH:mm:ss')
            let end = this.$moment(this.data.end_date).format('YYYY-MM-DD HH:mm:ss')
            let ahora = this.$moment(dateNow).format('YYYY-MM-DD HH:mm:ss')
            this.now = ahora
            
            if( ahora > begin  && end > ahora){
                this.isActiveNow = true
            }else{
                this.isActiveNow = false
            }                                                
        },          
        validIsNowActi(){            
            const self = this;
            this.intervalid1 = setInterval(function(){
                self.isActive()
                console.log ('Activities now');
            }, 500);            
        },
        validateAll(id, authorization){            
            if(this.validateLogin()){
                if(authorization){
                    //window.location.href='/StreamingEvent/'+id
                    this.$router.push({name:'StreamingEventRedirect', params: { activityId: id }})                    
                    //this.$router.push({name:'Detail-Event', params:{id:id, type:'hall'}});        
                }else{
                // this.$swal({icon:'error', text:'No estas autorizado para este actividad'})  
                this.$swal({
                    icon:'error', text:this.$t('pages.Events.DetailEvent.messageErrorTicket')})
                }
            }else{
                this.$modal.show("modal-landing");
            }
        },
        validateLogin(){
            let user_id = localStorage.getItem('_current_user_id')
            let token = localStorage.getItem('_current_token')
            if(user_id && token){
            return true
            }
            return false
        },
        confirmRedirect(){
            this.$swal.fire({
                title: "¿Desea salir?",
                text: "Será direccionado a otra actividad",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Salir",
                cancelButtonText: "Seguir",
            })
            .then(resultado => {
                if (resultado.value) {
                    return true
                } else {
                    return false
                }
            });
        },
    },
    beforeDestroy () {
       clearInterval(this.intervalid1)
    },
}
</script>

<style scoped>
.timeline-hour-active::before {
    content: "";
    display: block;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background: #50cc04;
    position: absolute;
    bottom: 33%;
    left: 4%;
}
.timeline-hour-no::before {
    content: "";
    display: block;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background: red;
    position: absolute;
    bottom: 33%;
    left: 4%;
}

.par-small-detail > p{
    font-size: 12px;
}
.timeline-item-line-time {
    padding-left: 4rem;
    margin-bottom: 1rem;
}
.details_activity_cronogram p {
    font-size: 12px !important;
    line-height: 1.4em;
}
</style>