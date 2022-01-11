<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-6 text-center">
                <router-link class="bg-dark"   :to="{name:'AlbumPrivate' }">
                    <b class="text-info"> Album private</b>
                </router-link>
            </div>
            <div class="col-12-col-md-6 text-center">
                <router-link class="bg-ligth"  :to="{name:'AlbumPublic' }" >
                    <b class="text-info"> Album public</b>
                </router-link> 
            </div>
        </div>
        <AlbumPublic></AlbumPublic>
        <AlbumPrivate></AlbumPrivate>        
    </div>
</template>
<script>
import AlbumPublic from "@/pages/WebApp/Album/Public.vue";
import AlbumPrivate from "@/pages/WebApp/Album/Private.vue";
export default {
    components:{AlbumPublic, AlbumPrivate},
    setup() {
        
    },
}
</script>