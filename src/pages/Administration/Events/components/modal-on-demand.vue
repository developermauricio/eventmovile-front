<template>
    <div>
        <modal name="onDemanModal"
            :clickToClose="true"
            :width="720"
            :height="450"
            :adaptive="true">            
            <div class="container p-4">
                <div class="row-header">                    
                    <h4>{{ newItem ? 'Nuevo' : 'Actualizar' }} Item On Demand</h4>
                    <button class="btn-close-modal" @click="closeModal">
                        ❌
                    </button>
                </div>
                
                <div class="row mt-3">
                    <div class="col-6">
                        <label>Título del vídeo </label><span class="copys">*</span>
                        <input v-model="itemVideo.title_video" 
                            @input="changeValueTitle"
                            :class="{'error-input': showErrorTitle}"
                            type="text"  
                            class="form-control border-input" 
                            placeholder="Ingrese el título del vídeo" 
                            required>
                        <div v-if="showErrorTitle" class="error-form">El campo título del vídeo es requerido.</div>
                    </div>  

                    <div class="col-6">
                        <label>Descripción del vídeo</label><span class="copys">Max 300 carácteres</span>
                        <textarea v-model="itemVideo.description_video" 
                            maxlength="300"
                            placeholder="Agrege una descripción corta del vídeo"
                            class="form-control border-input" 
                            cols="30" 
                            rows="3"></textarea>
                    </div>  

                    <div class="col-12">
                        <label>Iframe del vídeo </label><span class="copys">*</span>
                        <textarea v-model="itemVideo.iframe_video"
                            @input="changeValueIframe"
                            :class="{'error-input': showErrorTitle}"
                            class="form-control border-input" 
                            placeholder="Ingrese el iframe del video"
                            required
                            cols="30" 
                            rows="3"></textarea>
                        <div v-if="showErrorIframe" class="error-form">El campo iframe del vídeo es requerido.</div>
                    </div>        

                    <div class="col-md-12 mb-3 text-right">
                        <button @click="saveNewItemOnDemand" class="btn btn-outline-primary" type="button">{{ newItem ? 'Guardar' : 'Actualizar' }}</button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name:'ModalOnDemand',    
    props:['event_id', 'showModal', 'itemOnDemand'],
    data(){
        return{
            itemVideo: {
                title_video: '',
                iframe_video: '',
                description_video: '',
                event_id: 0,
                id: 0,
            },
            showErrorTitle: false,
            showErrorIframe: false,
            newItem: true,
        }
    },
    methods:{
        changeValueTitle() {
            this.itemVideo.title_video ? this.showErrorTitle = false : this.showErrorTitle = true;
        },
        changeValueIframe() {
            this.itemVideo.iframe_video ? this.showErrorIframe = false : this.showErrorIframe = true;
        },
        saveNewItemOnDemand() {
            this.changeValueTitle()
            this.changeValueIframe()

            if ( this.showErrorTitle || this.showErrorIframe ) {
                return;
            } 
            
            if ( this.newItem ) {
                this.itemVideo.event_id = this.event_id

                axios.post('create-on-demand', this.itemVideo)
                .then( resp => {
                    //console.log('se creo. ', resp)
                    this.closeModal();
                    this.$emit('reloadList')
                }).catch(error => {
                    console.log('error al crear on demand: ', error)
                })
            } else {
                axios.put(`update-on-demand`, this.itemVideo)
                .then( resp => {
                    //console.log('se actualizo. ', resp)
                    this.closeModal();
                    this.$emit('reloadList')
                }).catch(error => {
                    console.log('error al editar on demand: ', error)
                })
            }  
        },
        closeModal() {
            this.itemVideo.title_video = ''
            this.itemVideo.iframe_video = ''
            this.itemVideo.description_video = ''
            this.itemVideo.event_id = 0
            this.itemVideo.id = 0

            this.newItem = true
            this.showModal = false
            this.$modal.hide('onDemanModal')
            this.$emit('closeModalOnDemand')
        }
    },
    watch:{
        showModal: function(newVal) {
            newVal == true ? this.$modal.show('onDemanModal') : this.$modal.hide('onDemanModal')            
        },
        itemOnDemand: function(newVal) {
            if ( newVal ) {
                this.newItem = false
                this.itemVideo = newVal
            }
        }
    }, 
}
</script>

<style scoped>
.row-header {
    display: flex;
    justify-content: space-between;
}
button.btn-close-modal {
    padding-right: 5px;
    padding-left: 1rem;
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