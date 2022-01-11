<template>
    <div >
        <div class="row">
            <div class="col-12">
                <h4 class="">Administrar Stickers</h4><br>
            </div>
            <div v-if="stickers.length == 0" class="col-6">
                <label for="firstName">Nombre</label><span class="copys">Max 100</span>
                <input type="text" v-model.trim="form.name" class="form-control" id="firstName" placeholder="Nombre de sticker">
                <div class="hasError" v-if="!$v.form.name.maxLength">Maximo {{$v.form.name.$params.maxLength.max}} letras.</div>
            </div>
            <div v-if="stickers.length == 0" class="col-6">
                <label for="country">Campos adicionales</label>
                <multiselect :options="fieldsEvent" v-model="fieldsSeleted"  width="100px"  track-by="name"
                    :multiple="true" label="name" :close-on-select="false" :clear-on-select="false" />
            </div>
            <div v-if="stickers.length == 0" class="offset-9 col-3">
                <button class="btn btn-primary w-100" @click.prevent="beforeSave">{{bottomAccion}}</button>
            </div>
        </div>
        <div class="col-md-12" v-if="stickers.length>0">

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col" class="text-right">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in stickers" :key="item.id">
                    <th scope="row">
                        {{item.id}}
                    </th>
                    <td>{{item.name}}</td> 
                    <td class="text-right">

                        <a :href="urlToEditor(item)" target="_blanck" class="btn btn-outline-primary btn-sm mx-1">
                            <span class="ti-palette"></span>
                        </a>

                        <button @click="edit(item)" type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                        </button>

                        <button @click="deleteSticker(item)" type="button" class="btn btn-outline-danger btn-sm mx-1">
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

import multiselect from '@/components/ownMultiselect/OwnMultiselect'
import { maxLength } from "vuelidate/lib/validators"

export default {
    name:"stickersAdmin",
    components:{multiselect},
    props:["event_id"],
    data() {
        return {
            stickers:[],
            bottomAccion:"Guardar",
            fieldsEvent:[],
            fieldsSeleted:[],
            form:{
                name:"",
                event_id:this.event_id,
                custom_fields:""
            }
        }
    },
    validations(){
    let form_init_val = {form:{
                name:{maxLength: maxLength(100)},
            }}

    return form_init_val

  },
    mounted() {
        this.getFields()
        this.getStickers()
    },
    methods: {
        urlToEditor(item){
            const token = localStorage.getItem('_current_token')
            const route = "sticker"
            const action = 'edit'
            const url = 'http://localhost:4000'// process.env.VUE_APP_API_URL+'editor/index'
            const mode = process.env.VUE_APP_MODE
            const ToReturn = url+'?token='+token+'&action='+action+'&model_id='+item.id+'&mode='+mode+'&route='+route+'&event_id='+this.event_id
            return ToReturn
        },
        edit(item){
            this.form = item
            item.custom_fields = JSON.parse(item.custom_fields)
            this.fieldsSeleted = item.custom_fields 
            this.bottomAccion = "Actualizar"  
        },
        resetForm(){
            this.form = {
                name:"",
                event_id:this.event_id,
                custom_fields:""
            }

            this.fieldsSeleted = []
            this.bottomAccion = "Guardar"
        },
        beforeSave(item){
            this.$v.form.$touch()
            if(this.$v.form.$error) return

            let tmp = this.fieldsSeleted.map(field=>{return {name:field.name, id:field.id}})
            this.form.custom_fields = JSON.stringify(tmp)

            if(this.bottomAccion === "Guardar"){
                this.saveSticker()
            }
            if(this.bottomAccion === "Actualizar"){
                this.updateSticker()
            }
        },
        getFields(){
            axios.get(`fieldsEvent/${this.event_id}`).then(response=>{
                this.fieldsEvent = response.data.data
                
            })
        },
        getStickers(){
            axios.get(`stickers-event/${this.event_id}`).then(res=>{
                this.stickers = res.data.data
            }).catch(e=>{
                this.$swal({icon:'error',text:e})
            })
        },
        saveSticker(){
            axios.post('sticker',this.form).then(res=>{
                this.$swal('Sticker creado con exito')
                this.resetForm()
                this.getStickers()
            }).catch(e=>{
                this.$swal({icon:'error',text:e})
            })
        },
        updateSticker(){
            axios.put(`sticker/${this.event_id}`,this.form).then(res=>{
                this.$swal('Sticker actualizado con exito')
                this.resetForm()
                this.getStickers()
            }).catch(e=>{
                this.$swal({icon:'error',text:e})
            })
        },
        deleteSticker(item){
            this.$swal.fire({
                'title':"Eliminar sticker?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then(rta=>{
                if(rta.isConfirmed)
                    axios.delete(`sticker/${item.id}`).then(res=>{
                        this.$swal('Sticker eliminado con exito')
                        this.getStickers()
                    }).catch(e=>{
                        this.$swal({icon:'error',text:e})
                    })
            }) 
            
        }
    },
}
</script>