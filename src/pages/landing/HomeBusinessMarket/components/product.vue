<template>
    <div class="col-md-12 products-item">
         <div class="row mt-4">
            <div class="col-md-12 bg-white text-center rounded-lg">
                <img class="producto-foto"  :src="url(data.pic)" v-if="data.pic"/>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-12">
                <p class="subtitle-2">
                    {{data.name}}
                </p>
            </div>
            <div class="col-md-12">
                <p>
                    {{data.description}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"product",
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