<template>
  <div>
    <modal name="modal-notification"
           width="80%"
           height="auto"
           :adaptive="true"
           :resizable="true"
           :scrollable="true"
           @closed="onCloseModal">
      <div class="container ">
        <div slot="top-right">
          <button style="margin-left: 97%; border: none; border-radius: 10px; margin-top:7px"
                  @click="$modal.hide('modal-notification')">
            ❌
          </button>
        </div>
        <div class="container position-relative pt-2 customc-modal mb-5">
          <h3>Administrar Notificaciones</h3>
          <div class="row mt-2">
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <label>Título Notificación <span class="text-danger">*</span></label>
                <input v-model="notification.title" type="text" class="form-control" aria-describedby="emailHelp"
                       placeholder="titulo de la notificación">
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
              <div class="form-group">
                <label>Link o acción</label>
                <input v-model="notification.link" type="text" class="form-control" aria-describedby="emailHelp"
                       placeholder="link o acción de la notificación">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Descripción <span class="text-danger">*</span></label>
                <textarea v-model="notification.description" class="form-control" id="exampleFormControlTextarea1"
                          rows="3"></textarea>
              </div>
            </div>
            <div class="col-12 col-md-4 col-lg-4">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Tipo de notificación</label>
                <select v-model="typeNotification" class="form-select custom-select d-block w-100"
                        aria-label="Default select example">
                  <option selected>Seleccionar</option>
                  <option value="1">Envío directo</option>
                  <option value="2">Programar envío</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-4 col-lg-4" v-if="typeNotification === '2'">
              <div class="form-group">
                <label for="scheduledata">Programar fecha</label>
                <input type="date" v-model="scheduleDate" class="form-control border-input" id="scheduledata"
                       placeholder="" value="" required="">
              </div>
            </div>
            <div class="col-12 col-md-4 col-lg-4" v-if="typeNotification === '2'">
              <label for="scheduleTime">Programar hora</label>
              <input type="time" v-model="scheduleTime" class="form-control border-input" id="scheduleTime"
                     placeholder="" value="" required="">
            </div>
          </div>
          <div class="row" v-if="typeNotification || typeNotification ==='Seleccionar'">
            <div class="col-12 float-right">
              <button type="button" class="btn btn-primary pull-right" @click="saveNotification()">Guardar
                Notificación
              </button>
            </div>
          </div>
          <hr>
          <div class="row">
            <h4>Lista de notificaciones para el evento <strong class="text-event">{{ eventName }}</strong></h4>
            <div class="col-12 mt-2 mb-2">
              <div class="row">
                <div class="col-12 col-lg-4 col-md-4">
                  <label>Buscar:</label>
                  <input class="form-control" v-model="filters.title.value" placeholder="Buscar por título"
                         style="width: 100%;"/>
                </div>
                <div class="col-12 col-lg-4 col-md-4">
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Filtar por estado</label>
                    <select v-model="selectStateNotification" class="form-select custom-select d-block w-100"
                            aria-label="Default select example">
                      <option selected>Seleccionar</option>
                      <option value="2">Envíados</option>
                      <option value="1">Sin envíar</option>
                    </select>
                  </div>
                </div>
              </div>
              <v-table class="table table-striped table-hover table-responsive"
                       :data="listNotification"
                       :filters="filters"
                       :currentPage.sync="currentPage"
                       :pageSize="5"
                       @totalPagesChanged="totalPages = $event"
                       v-if="listNotification.length > 0"
              >
                <thead slot="head">
                <th>Titulo</th>
                <th>Link o acción</th>
                <th>Descripción</th>
                <th>Estado</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                <tr v-for="row in displayData" :key="row.id">
                  <td>{{ row.title }}</td>
                  <td>
                    <a v-if="row.link_event_action !== 'null'" class="link-action" :href="row.link_event_action" target="_blank">{{ row.link_event_action}}</a>
                    <span v-else>No se agrego link</span>
                  </td>
                  <td>{{ row.description }}</td>
                  <td class="text-center"><span :class="+row.send === 1 ?'badge badge-warning': 'badge badge-success'">{{
                      row.send === '1' ? 'Sin Enviar' : 'Enviado'
                    }}</span>
                  </td>
                </tr>
                </tbody>
              </v-table>
              <div class="col-12 mt-5" v-else>
                <h6>No hay notificaciones para este evento o este estado</h6>
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
import Swal from "sweetalert2";
import axios from "axios";
import {publishMQTT} from "../../../plugins/mqtt-v2";

export default {
  name: "NotificationNew",
  components: {
    VueSweetalert2
  },
  data() {
    return {
      filters: {
        title: {value: '', keys: ['title']}
      },
      scheduleDate: null,
      scheduleTime: null,
      currentPage: 1,
      totalPages: 0,
      notifications: [],
      typeNotification: null,
      notification: {
        title: null,
        link: null,
        description: null
      },
      selectStateNotification: null,
    }
  },
  props: ['showModalNotification', 'eventId', 'eventName'],
  methods: {
    onCloseModal(e) {
      this.$modal.hide('modal-notification')
      this.$emit("close-modal-notification")
    },
    getNotifications() {
      axios.get('/get-list-notifications-event/' + this.eventId).then(resp => {
        this.notifications = resp.data.data
      })
    },
    saveNotification() {
      let validate = this.validationNotication()
      if (validate) {
        this.$toast.error({
          title: 'Error',
          message: 'Tenga en cuenta agregar el título y la descripción',
          showDuration: 1000,
          hideDuration: 8000,
        })
        return
      }
      if (this.typeNotification === '2') {
        let validateDate = this.validationNoticationDateTime()
        if (validateDate) {
          this.$toast.error({
            title: 'Error',
            message: 'Tenga en cuenta agregar la fecha y hora de envío de la notificación',
            showDuration: 1000,
            hideDuration: 8000,
          })
          return
        };
      }

      setTimeout(() => {
        const data = new FormData()
        data.append('notificationTitle', this.notification.title);
        data.append('notificationDescription', this.notification.description);
        data.append('notificationLink', this.notification.link);
        data.append('notificationType', this.typeNotification);
        data.append('scheduleDate', this.scheduleDate + ' ' + this.scheduleTime);
        data.append('eventId', this.eventId);

        Swal.fire({
          title: 'Confirmar',
          text: '¿Esta seguro de crear la notificación?',
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
            axios.post('save-notification-news', data).then(resp => {
              this.getNotifications()

              this.notification.title = ''
              this.notification.link = ''
              this.notification.description = ''
              this.scheduleDate = null
              this.scheduleTime = null
              publishMQTT('notification_news_event', 'Nueva Notificación')
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

    validationNotication() {
      if (this.notification.title === null ||
          this.notification.title === '' ||
          this.notification.description === '' ||
          this.notifications.description === null
      ) {
        return true
      } else {
        return false
      }
    },
    validationNoticationDateTime() {
      if (this.scheduleDate === null ||
          this.scheduleDate === '' ||
          this.scheduleTime === '' ||
          this.scheduleTime === null
      ) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    listNotification: function () {
      let selectedNoticiation = this.selectStateNotification
      let listNotification = []
      if (selectedNoticiation === null || selectedNoticiation === 'Seleccionar') {
        listNotification = this.notifications
        return listNotification;
      }
      if (this.selectStateNotification) {
        let filtered = false
        this.notifications.filter(notification => {
          console.log(selectedNoticiation);
          if (notification.send === selectedNoticiation) {
            console.log(notification);
            filtered = true
          }
          if (filtered === true) {
            listNotification.push(notification)
          }
        })
      }
      return listNotification;
    }
  },
  watch: {
    showModalNotification: function () {
      this.$modal.show('modal-notification')
      this.getNotifications();
    }
  },
}
</script>

<style scoped>
.link-action {
  color: black;
}

.link-action:hover {
  color: #8e04cc !important;
}

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