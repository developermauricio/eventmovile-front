<template>
 
</template>

<script>

export default {
    name: 'StreamingEventRedirect',
    props:['activityId'],
    components: {},
    data(){
      return{       
      }
    },
    computed:{
      
    },
    created() {
      
    },
    watch:{
      
    },
    async mounted(){      
      this.$router.push({name:'StreamingEvent', params: { activityId: this.activityId}})                    
    },
    destroyed(){
      this.unsubscriptionMqtt()
    },
    methods: {
    }
};


</script>