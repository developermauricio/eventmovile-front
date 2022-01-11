<template>
    <div class="invitaciones-item row px-2 mb-2" >
        <div class="col-md-1 p-0">
            <img class="avatar" v-if="!verifyPic()" :src="require('./../../../../assets/img/defaults/company.png')"> 
            <img class="avatar"  v-if="verifyPic()" :src="url(userData.company.pic)"/>
        </div>
        <div class="col-md-7">
            <p class="subtitle-1">
               {{userData.name}}  <b class="par-small">{{userData.position}}</b>
                <b class="par-small">Comienza: {{data.start}}</b>
            </p>
        </div>
        <div class="col-md-4 text-right">
            <button class="invitaciones-btn cancel" @click.prevent="clickCloseF(data)">
                <span class="ti-close"></span>
            </button>
            <button class="invitaciones-btn accept" @click.prevent="clickAcceptF(data)">
                <span class="ti-check"></span>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name:"ParticipantData",
    props:{
        data:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            userData:{}
        }
    },
    created() {
        this.getUserData()
    },
    methods: {
        verifyPic(){
            
            if(this.userData.company){
                if(this.userData.company.pic)
                    return true;
                else return false
            }   else {
                return false
            }
        },
        getUserData(){
            axios.get(`business-market-user/${this.data.creator_id}`).then(data=>{
                //console.log(data.data)
                this.userData= data.data[0]
            }).catch(e=>{
                console.error(e)
            })
        },
        url(src){
            return `${process.env.VUE_APP_API_URL}storage/${src}`
        },
        clickCloseF(data){
            axios.put(`meeting-rel-users/${data.idRel}`,{acceptance:3}).then(res=>{
                this.$emit("update-invitations")
            })
        },
        clickAcceptF(data){
            axios.put(`meeting-rel-users/${data.idRel}`,{acceptance:2}).then(res=>{
                this.$emit("update-invitations")
            })
        }

    },
}
</script>