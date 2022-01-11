<template>
    <div class="col-1 ml-2 p-0"  v-if="isActiveNow">
        <div class="timeline-hour-active"></div>        
    </div>                
    <div class="col-1 ml-2 p-0"  v-else>
        <div class="timeline-hour-no"></div>
    </div>        
</template>

<script>
export default {
    name:"activitiesLiveInHalls",
    props:['data',],
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
            console.log("now",this.now)
            

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


/*boton en vivo */
.timeline-hour-active::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background: #50cc04;
    position: absolute;
    bottom: 75%;
    left: 31%;
}
.timeline-hour-no::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background: red;
    position: absolute;
    bottom: 75%;
    left: 31%;
}
/**end boton en vivo */
</style>