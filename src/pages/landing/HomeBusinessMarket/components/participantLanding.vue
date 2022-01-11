<template>
    <div class="row rueda-participantes__item">
        <div class="col-md-2">
        <img class="rueda__banner" v-if="!data.pic" :src="require('./../../../../assets/img/defaults/company.png')"> 
        <img class="rueda__banner" :src="url(data.pic)" alt="" v-if="data.pic">
        </div>
        <div class="col-md-10">
            <h4 class="rueda-participantes__title">{{data.name}}</h4>
            <p class="rueda-participantes__description">
            {{data.sort_description}}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name:"participant-landing",
    props:{
        data:{}
    },
    methods: {
        url(src){
            return `${process.env.VUE_APP_API_URL}storage/${src}`
        },
    },
}
</script>