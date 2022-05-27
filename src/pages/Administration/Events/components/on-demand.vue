<template>
    <div class="main-content-on-demand">
        <h4>Ingrese los datos para los videos</h4>
        <div class="row">
            <div class="col-4"> 
                <div>
                    <label for="title-video">Título del vídeo </label><span class="copys">*</span>
                    <input v-model="itemVideo.title" 
                        @input="changeValueTitle"
                        type="text"  
                        :class="{'error-input': showErrorTitle}"
                        class="form-control border-input" 
                        id="title-video" 
                        placeholder="Ingrese el título del vídeo" 
                        required="">
                    <div v-if="showErrorTitle" class="error-form">El campo título del vídeo es requerido.</div>
                </div>  

                <button v-if="addNewItem" @click="addNewVideo" type="button" class="btn btn-primary btn-add-video">Agregar nuevo vídeo</button>
                <div v-else>
                    <button @click="updateItemSelect" type="button" class="btn btn-primary btn-add-video mr-4">Editar</button>
                    <button @click="cancelItemSelect" type="button" class="btn btn-secondary btn-add-video">Cancelar</button>
                </div>
            </div>
            <div class="col-4">
                <label>Iframe del vídeo </label><span class="copys">*</span>
                <textarea v-model="itemVideo.iframe"
                    @input="changeValueIframe"
                    :class="{'error-input': showErrorTitle}"
                    class="form-control border-input" 
                    placeholder="Ingrese el iframe del video"
                    cols="30" 
                    rows="3"></textarea>
                <div v-if="showErrorIframe" class="error-form">El campo iframe del vídeo es requerido.</div>
            </div>
            <div class="col-4"> 
                <label>Descripción del vídeo</label><span class="copys">Max 300 carácteres</span>
                <textarea v-model="itemVideo.description" 
                    maxlength="300"
                    placeholder="Agrege una descripción corta del vídeo"
                    class="form-control border-input" 
                    cols="30" 
                    rows="3"></textarea>
            </div>
        </div>

        <div class="col-md-12" v-if="listOnDemand.length">
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
                    <td>{{ item.title }}</td>
                    <td>{{ item.iframe }}</td>
                    <td>{{ item.description ? item.description : '--' }}</td>
                    <td class="text-right">
                        <button @click="updateItemVideo(item, index)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                            <span class="ti-pencil-alt"></span>
                        </button>

                        <button @click="removeItemVideo(index)" type="button" class="btn btn-outline-danger btn-sm mx-1">
                            <span class="ti-trash"></span>
                        </button>
                    </td>
                </tr>
              </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "OnDemand",
    props: {
        listOnDemand: {
            type: Array,
            default: function () {
                return [];
            },
        }        
    },
    data() {
        return {            
            itemVideo: {
                title: '',
                iframe: '',
                description: ''
            },
            currentItemUpdate: {},
            addNewItem: true,
            showErrorTitle: false,
            showErrorIframe: false,
        }
    },
    methods: {
        changeValueTitle() {
            this.itemVideo.title ? this.showErrorTitle = false : this.showErrorTitle = true;
        },
        changeValueIframe() {
            this.itemVideo.iframe ? this.showErrorIframe = false : this.showErrorIframe = true;
        },
        addNewVideo() {     
            this.changeValueTitle()
            this.changeValueIframe()

            if ( this.showErrorTitle || this.showErrorIframe ) {
                return;
            } 

            this.listOnDemand.push(Object.assign({}, this.itemVideo))            
            this.clearCurrentItem()
        },        
        updateItemVideo( item, index ) {
            this.itemVideo = Object.assign({}, item)
            this.currentItemUpdate = Object.assign({}, item)
            this.removeItemVideo(index)
            this.addNewItem = false
        },
        removeItemVideo( index ) {
            this.listOnDemand.splice(index, 1)
        },
        updateItemSelect() {
            this.addNewVideo()
            this.currentItemUpdate = {}  
            this.addNewItem = true
        },
        cancelItemSelect() {
            this.listOnDemand.push(Object.assign({}, this.currentItemUpdate))     
            this.currentItemUpdate = {}   
            this.clearCurrentItem()
            this.addNewItem = true
        },
        clearCurrentItem() {
            this.itemVideo.title = ''
            this.itemVideo.iframe = ''
            this.itemVideo.description = ''
        }
    },
    mounted() {
        console.log('componente para crear videos...')
    }
}
</script>

<style scoped>
.main-content-on-demand {
    margin-top: 2rem;
}
button.btn-add-video {
    margin: 0;
    margin-top: 1rem;
}

.error-form {
    color: #dc3545;
    font-size: 14px;
    margin-top: 3px;
}
.error-input {
    border-color: #dc3545 !important
}
</style>
