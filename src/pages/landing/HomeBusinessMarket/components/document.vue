<template>
    <div class="col-md-12 mb-2">
        <div class="document-item" >
            <a target="_blank" :href="getUrl(document.url)">
                <p class="document-name">{{document.name}}</p>
                <span class="document-icon ti-download">
                </span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:"document",
    props:{
        document:{
            required:true
        }
    },
    methods: {
        getUrl(url){
            return `${process.env.VUE_APP_API_URL}storage/${url}`
        }
    },
}
</script>