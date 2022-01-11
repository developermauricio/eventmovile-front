<template>
    <div class="timeline-item row" >
        <div class="line"></div>

        <div class="timeline-hour">{{time}}</div>
        <div class="col-md-2">
            <img class="avatar" v-if="data.pic === undefined" :src="require('./../../../../assets/img/defaults/person.jpeg')"> 
            <img class="avatar" :src="url(data.pic)" v-if="data.pic !== undefined"/>
        </div>
        <div class="col-md-10 px-4">
            <p class="subtitle-2">
            {{data.username}}
            <br/>
            <b class="par-small">{{data.company}}</b>
            <button v-if="data.state =='2'" class="btn btn-outline-primary small m-1" @click="cancel(data.meeting_id)">
                Cancelar
            </button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name:"meeting",
    props:{
        data:{
            required:true
        }
    },
    data(){return{
        
    }
    },
    computed: {
        date: function(){
            return this.$moment(this.data.start).format('DD / MM')
        },
        time: function(){
            return this.$moment(this.data.start).format('hh:mm A')
        }
    },
    created() {
        
    },
    methods: {
        cancel(id){
            this.$swal.fire({
                'title':"Cancelar cita de la agenda?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then(rta=>{
                if(rta.isConfirmed)
                    axios.put(`meeting/${id}`,{
                        state:0
                    }).then(res=>{
                        this.$swal("Cita cancelada correctamente")
                        this.$emit("appointment-delete")
                    })
            })    
        },
        url(src){
        return `${process.env.VUE_APP_API_URL}storage/${src}`
      },
    },
}
</script>
<style scoped>
    .line{
        top:0 !important;
        height: 60px !important;
    }
</style>