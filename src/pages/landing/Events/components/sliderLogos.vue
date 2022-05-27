<template>
    
    <div class="row mt-3">
        <div class="col-5">
            <label>Título del logo </label><span class="copys">*</span>
            <input v-model="itemLogo.title_logo" 
                @input="changeValueTitle"
                :class="{'error-input': showErrorTitle}"
                type="text"  
                class="form-control border-input" 
                placeholder="Ingrese el título del logo" 
                required>
            <div v-if="showErrorTitle" class="error-form">El campo título del logo es requerido.</div>
        </div>  
        
        <div class="col-5">
            <div class="form-group">
                <label>Logo </label><span class="copys">*</span>
                <div class="custom-file">
                    <input @change="onFileChange" 
                        type="file" 
                        id="logo"
                        class="custom-file-input" 
                        accept="image/*">    
                    <label class="custom-file-label" for="logo">{{ textLabelFile }}</label>
                </div>        
                <div v-if="showErrorLogo" class="error-form">El archivo del logo es requerido.</div>
            </div>        
        </div>    

        <div class="col-2 text-center">
            <button @click="saveItemLogo" class="btn btn-outline-primary" type="button">Guardar</button>
        </div>

        <div v-if="listLogos.length" class="col-md-12 mt-3">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Logo</th>
                        <th scope="col" class="text-right">Opciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in listLogos" :key="index">
                        <td scope="row">{{ index + 1 }}</td>
                        <td>{{ item.title_logo }}</td>
                        <td>{{ item.name_logo }}</td>
                        <td class="text-right">                            
                            <button @click="removeItemVideo(item.id)" type="button" class="btn btn-outline-danger btn-sm mx-1">
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
    name: "sliderLogos",
    props: ['event_id'],
    data(){
        return {
            itemLogo: {
                file_logo: null,
                title_logo: '',
            },
            showErrorTitle: false,
            showErrorLogo: false,
            listLogos: [],
            textLabelFile: 'Seleccionar',
        }
    },
    methods: {
        changeValueTitle() {
            this.itemLogo.title_logo ? this.showErrorTitle = false : this.showErrorTitle = true;
        },
        onFileChange(e) {
            console.log('file: ', e.target.files)
            let files = e.target.files
            this.itemLogo.file_logo = files[0]
            this.textLabelFile = files[0].name
        },
        removeItemVideo( id ) {
            console.log('eliminar ', id)
            axios.delete(`delete-item-logo/${id}`)
                .then( resp => {
                    console.log('se creo el logo.... ', resp)
                    this.getListLogos();
                }).catch(error => {
                    console.log('error eliminando logos: ', error)
                })
        },
        saveItemLogo() {
            this.changeValueTitle()

            if ( this.itemLogo.file_logo ) {
                this.showErrorLogo = false
            } else {
                this.showErrorLogo = true
            }

            if ( this.showErrorTitle || this.showErrorLogo ) {
                return
            }

            let data = new FormData()
            data.append('file_logo', this.itemLogo.file_logo)
            data.append('title_logo', this.itemLogo.title_logo)
            data.append('event_id', this.event_id)      

            axios.post('create-item-logo', data)
                .then( resp => {
                    //console.log('se creo el logo.... ', resp)
                    this.clearData()
                    this.getListLogos();
                }).catch(error => {
                    console.log('error al crear item logo: ', error)
                })
        },
        clearData() {
            this.itemLogo.file_logo = null
            this.itemLogo.title_logo = ''
            this.showErrorTitle = false
            this.showErrorLogo = false
            this.textLabelFile = 'Seleccionar'
        },
        getListLogos() {
            axios.get(`list-logos/${this.event_id}`)
                .then( resp => {
                    //console.log('gel list logos. ', resp)
                    this.listLogos = resp.data;
                }).catch(error => {
                    console.log('error listando logos: ', error)
                }) 
        }
    },
    mounted() {   
        this.getListLogos()  
    }

}
</script>

<style scoped>
.error-form {
    color: #dc3545;
    font-size: 14px;
    margin-top: 3px;
}
.error-input {
    border-color: #dc3545 !important
}
</style>