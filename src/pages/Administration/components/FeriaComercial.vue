<template>
  <div>
    <modal name="modal-feria-comercial"
           width="80%"
           height="auto"
           :adaptive="true"
           :resizable="true"
           :scrollable="true"
           @closed="onCloseModal">
      <div class="container ">
        <div slot="top-right">
          <button style="margin-left: 97%; border: none; border-radius: 10px; margin-top:7px"
                  @click="$modal.hide('modal-feria-comercial')">
            ❌
          </button>
        </div>
        <div class="container position-relative pt-2 customc-modal mb-5">
          <h3>Administrar Feria Comercial</h3>
          <div class="row mt-2">
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <label>Nombre de la empresa <span class="text-danger">*</span></label>
                <input v-model="nameCompany" type="text" class="form-control" aria-describedby="emailHelp"
                       placeholder="nombre de la empresa">
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <label>Logo <span class="text-danger">*</span></label>
                <div class="">
                  <input type="file" @change="picture" class="custom-file-input" id="imageSpeaker" accept="image/*">
                  <label class="custom-file-label" style="margin-top: 2rem" id="companyImage" for="imageSpeaker">Seleccionar logo</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Descripción de la empresa <span class="text-danger">*</span></label>
                <textarea v-model="descriptionCompany" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>
          </div>
          <div class="row" >
            <div class="col-12 float-right">
              <button type="button" class="btn btn-primary pull-right" @click="store()">Guardar
              </button>
            </div>
          </div>
          <hr>
          <div class="row">
            <h4>Lista de empresas <strong class="text-event">{{ eventName }}</strong></h4>
            <div class="col-12 mt-2 mb-2">
              <div class="row">
                <div class="col-12 col-lg-4 col-md-4">
                  <label>Buscar:</label>
                  <input class="form-control" v-model="filters.title.value" placeholder="Buscar por nombre"
                         style="width: 100%;"/>
                </div>
<!--                <div class="col-12 col-lg-4 col-md-4">-->
<!--                  <div class="form-group">-->
<!--                    <label for="exampleFormControlTextarea1">Filtar por estado</label>-->
<!--                    <select v-model="selectStateCompany" class="form-select custom-select d-block w-100"-->
<!--                            aria-label="Default select example">-->
<!--                      <option selected>Seleccionar</option>-->
<!--                      <option value="2">Envíados</option>-->
<!--                      <option value="1">Sin envíar</option>-->
<!--                    </select>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
              <v-table class="table table-striped table-hover table-responsive"
                       :data="companies"
                       :filters="filters"
                       :currentPage.sync="currentPage"
                       :pageSize="5"
                       @totalPagesChanged="totalPages = $event"
                       v-if="listCompanies.length > 0"
              >
                <thead slot="head">
                <th>Nombre de la empresa</th>
                <th>Descripción</th>
                <th>Logo</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="row in displayData" :key="row.id">
                  <td>{{ row.name_company }}</td>
                  <td>{{ row.description_company }}</td>
                  <td><img :src='link+row.logo_company' width="50" alt=""></td>
                </tr>
                </tbody>
              </v-table>
              <div class="col-12 mt-5" v-else>
                <h6>No hay empresas registradas para este evento</h6>
              </div>
              <smart-pagination
                  :currentPage.sync="currentPage"
                  :totalPages="totalPages"
              />
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import VueSweetalert2 from 'vue-sweetalert2';
import axios from "axios";
import Swal from "sweetalert2";
import {publishMQTT} from "../../../plugins/mqtt-v2";

export default {
  name: "FeriaComercial",
  props: ['showModalFeriaComercial', 'eventId', 'eventName'],
  data(){
    return{
      logoCompany: null,
      nameCompany: '',
      phoneCompany: '',
      descriptionCompany: '',
      companies: [],

      filters: {
        title: {value: '', keys: ['name_company']}
      },
      currentPage: 1,
      totalPages: 0,
      link: process.env.VUE_APP_API_URL_FILES,

      selectStateCompany: null
    }
  },
  methods: {
    onCloseModal(e) {
      this.$modal.hide('modal-feria-comercial')
      this.$emit("close-modal-feria-comercial")
    },

    store(){
     let validate = this.validation();
      if (validate) {
        this.$toast.error({
          title: 'Error',
          message: 'Tenga en cuenta agregar el nombre y la descripción de la empresa',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }

      setTimeout(() =>{
        const data = new FormData()
        data.append('name_company', this.nameCompany);
        data.append('description_company', this.descriptionCompany);
        data.append('logo_company', this.logoCompany)
        data.append('id_event', this.eventId)

        Swal.fire({
          title: 'Confirmar',
          text: '¿Esta seguro de crear la empresa?',
          confirmButtonColor: "#8e04cc",
          cancelButtonColor: "#66615B",
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          customClass: "swal-confirmation",
          showCancelButton: true,
          reverseButtons: true,
          allowOutsideClick: false,
        }).then(result => {
          if (result.value) {
            axios.post('createCompany', data).then(resp => {
              this.nameCompany = ''
              this.descriptionCompany = ''
              this.logoCompany = ''

              this.$toast.success({
                title: '',
                message: 'La empresa se creo correctamente',
                showDuration: 1000,
                hideDuration: 8000,
              })
              this.getCompanies()
            }).catch(err => {
              this.$toast.error({
                title: 'Error',
                message: 'Hubo un error, consulte con el administrador',
                showDuration: 1000,
                hideDuration: 8000,
              })
            })
          }
        });

      }, 200)
    },

    getCompanies() {
      axios.get('/get-companies-feria-comercial/' + this.eventId).then(resp => {
        this.companies = resp.data.data
      })
    },

    validation() {
      if (this.nameCompany === null ||
          this.nameCompany === '' ||
          this.descriptionCompany === '' ||
          this.descriptionCompany === null
      ) {
        return true
      } else {
        return false
      }
    },

    picture(e) {
      let label;
      let files = e.target.files || e.dataTransfer.files;
      this.logoCompany = files[0];
      label = document.getElementById("companyImage");
      //console.log(files[0].name)
      label.innerText = files[0].name;
    },
  },
  computed: {
    listCompanies: function () {
      let selectedCompany = this.selectStateCompany
      let listCompanies = []
      if (selectedCompany === null || selectedCompany === 'Seleccionar') {
        listCompanies = this.companies
        return listCompanies;
      }
      if (this.selectStateCompany) {
        let filtered = false
        this.companies.filter(company => {
          console.log(selectedCompany);
          if (company.send === selectedCompany) {
            console.log(company);
            filtered = true
          }
          if (filtered === true) {
            listCompanies.push(company)
          }
        })
      }
      return listCompanies;
    }
  },
  watch: {
    showModalFeriaComercial: function () {
      this.$modal.show('modal-feria-comercial')
      this.getCompanies();
    }
  },
}
</script>

<style scoped>
.text-event {
  color: #8e04cc !important;
}

.table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table td, .table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #ddd;
}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #8e04cc;
  color: white;
}
</style>