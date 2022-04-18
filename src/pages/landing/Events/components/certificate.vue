<template>
    <div class="row px-3" >
        <div class="col-12">
            <h4 class="mb-3">Certificado de evento</h4>
        </div>
        <button type="button" @click='showModalCer()' class="btn btn-outline-primary btn-sm mx-1">
        <span class="ti-pencil-alt"></span> Editar
        </button>
        <jsonExcel  class="btn btn-default btn-sm mx-1" type="csv"  name="certificados.csv" :fetch="fetchData">Descargar Total <span class="ti-download"></span></jsonExcel>
        <jsonExcel  class="btn btn-default btn-sm mx-1" type="csv" name="certificados.csv" :fetch="fetchData2">Descargar Unicos <span class="ti-download"></span></jsonExcel>
        <modal name="certificates"

            width="1200"
            :height="800"
            :adaptive="true">
            <iframe          
                :src="urlToIframe()"
                ref="zoomFrame" 
                id="iframe-certificate"
                allow="*"
                width="100%"
                height="100%" 
                sandbox="allow-scripts allow-popups allow-same-origin"
                ></iframe>
        </modal>
    </div>
</template>
<script>
import jsonExcel from "vue-json-excel"
export default {
    name:"certificate",
    props:['eventId'],
    components:{jsonExcel},
    data() {
        return {
            
        }
    },
    methods: {
        async fetchData(){
            let response
                response = await axios.get(`certificate-tracking-report/${this.eventId}`)
            if(response.data.data.length == 0) this.$swal({icon:'error', text:'No datos'})
            return response.data.data
        },
        async fetchData2(){
            const  response = await axios.get(`certificate-tracking-report/${this.eventId}/filter`)
            if(response.data.data.length == 0) this.$swal({icon:'error', text:'No datos'})
            return response.data.data
        },
        urlToIframe(){
        const token = localStorage.getItem('_current_token')
        const action = 'edit'
        const route = "certificate"
        const url = process.env.VUE_APP_API_URL+'editor/index'
        const mode = process.env.VUE_APP_MODE
        const ToReturn = url+'?token='+token+'&action='+action+'&model_id='+this.eventId+'&mode='+mode+'&route='+route
        return ToReturn
      },
      showModalCer(){
        //this.$modal.show('certificates');
        window.open(`https://backendtest-eventmovil.socket-aicode.art/api/v1/view-certificate/${this.eventId}`, '_blank');
      },
    },
}
</script>