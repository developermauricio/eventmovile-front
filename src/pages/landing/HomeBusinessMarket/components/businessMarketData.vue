<template>
    <div class="col-md-4">

        <span class="rueda__label" >Rueda de negocios /</span>

        <img class="rueda__banner" :src="url(data.pic)" alt="" v-if="data.pic">

        <h4 class="rueda__title">{{data.name}}</h4>
        <span class="rueda__date">{{BusinessMarketDate}}</span>
        <p class="rueda__description">
          {{data.sort_description}}
        </p>
        <router-link :to="{path:'/landing-business-market/'+data.id}">
          <a class="rueda__link" style="background-color: white; color:#614ba4 "  href="#">Ver más</a>
        </router-link>

      </div>
</template>
<script>
export default {
    name:"business-market-data",
    props:{
        data:{}
    },
    computed: {
    BusinessMarketDate: function(){
      return this.$moment(this.data.start_date).format('Do MMMM [de] YYYY')
    }
  },
    methods: {
        url(src){
        return `${process.env.VUE_APP_API_URL}storage/${src}`
      },
    },
}
</script>