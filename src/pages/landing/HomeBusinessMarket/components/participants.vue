<template>
    <div class="participantes-item row p-2" >
        <div class="col-2">
            <div class="activeUser" v-if="data.revoked == 0"></div>
            <div class="inactiveUser" v-else ></div>
        </div>
        <div class="col-md-2">
            <img class="avatar" v-if="!data.pic" :src="require('./../../../../assets/img/defaults/company.png')"> 
            <img class="avatar" :src="url(data.pic)" v-if="data.pic"/>
        </div>
        <div class="col-md-5">
            <p class="subtitle-1 mt-3">
                {{data.name}}
                <br/>
                <b class="par-small">{{data.username}}</b>
            </p>
        </div>
        <div class="col-md-3">
        <router-link :to="{path:`/company-business-market/${data.id}/${business_id}`}">
            <button class="btn btn-outline-primary small">
            Ver Agenda
            </button>
        </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"participant",
    props:{
        data:{
            required:true
        },
        business_id:{
            required:true
        }
    },
    watch:{
        data:function(newVal){
            this.data = newVal
        }
    },
    methods: {
        url(src){
            return `${process.env.VUE_APP_API_URL}storage/${src}`
        },
    },
}
</script>
<style scoped>
.activeUser {
    margin-top: 80%;
    width: 10px;
    height: 10px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #5cb85c;
}
.inactiveUser {
    margin-top: 80%;
    width: 10px;
    height: 10px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #cccccc;
}
</style>