<template>
    <div class="main-content-on-demand">
        <h4>Contenido On Demand</h4> 
        <div class="row"> 
            <div class="col-12 text-right">
                <button @click="addNewVideo" type="button" class="btn btn-primary btn-add-video">Agregar nuevo vídeo</button>
            </div>      

            <div class="col-md-12 mt-3" v-if="listOnDemand.length">
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Iframe</th>
                        <th scope="col">Descripción</th>
                        <th scope="col" class="text-right">Opciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in listOnDemand" :key="index">
                        <td scope="row">{{ index + 1 }}</td>
                        <td>{{ item.title_video }}</td>
                        <td>{{ item.iframe_video }}</td>
                        <td>{{ item.description_video ? item.description_video : '--' }}</td>
                        <td class="text-right">
                            <button @click="updateItemVideo(item)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                                <span class="ti-pencil-alt"></span>
                            </button>

                            <button @click="removeItemVideo(item.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                                <span class="ti-trash"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <modal-on-demand :event_id="event_id" 
            :showModal="showModal" 
            :itemOnDemand="itemOnDemand" 
            @reloadList="reloadList"
            @closeModalOnDemand="closeModalOnDemand"></modal-on-demand>
    </div>
</template>

<script>
import ModalOnDemand from './modal-on-demand.vue';
export default {
    name: "ListOnDemand",
    components: {
        ModalOnDemand
    },
    props: {
        listOnDemand: {
            type: Array,
            default: function () {
                return [];
            },
        }, 
        event_id: {
            type: String,
            default: 0
        }        
    },
    data() {
        return {  
            showModal: false,
            itemOnDemand: null,
        }
    },
    methods: {    
        addNewVideo() {
            this.showModal = true
        },          
        updateItemVideo( item ) {
            this.showModal = true
            this.itemOnDemand = Object.assign({}, item);
        },
        removeItemVideo( itemID ) {
            axios.delete(`delete-on-demand/${itemID}`)
                .then( resp => {
                    //console.log('se elimino... ', resp)
                    this.newQueryListOnDemand()
                }).catch(error => {
                    console.log('error al editar on demand: ', error)
                })
        },    
        reloadList() {
            this.closeModalOnDemand()           
            this.newQueryListOnDemand()
        },
        closeModalOnDemand() {    
            this.showModal = false
            this.itemOnDemand = null  
        },
        newQueryListOnDemand() {
            axios.get(`on-demand/${ this.event_id }`)
                .then( resp => {
                    this.listOnDemand = resp.data;
                }).catch(error => {
                    console.log('Error eliminando on demand: ', error)
                })
        }
    }
}
</script>

<style scoped>
.main-content-on-demand {
    margin-top: 2rem;
}
.btn-add-video {
    margin: 0;
}
</style>
