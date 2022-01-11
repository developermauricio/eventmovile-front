<template>
  <div class="wrapper business">
    <!-- header -->
    <header-custom
      :user="user"
      :businessMarket="businessMarket"
      @update-invitations="getInvitations(user.id)"
      @cancel-meeting="getSchedulle(user.id)"
    />
    <!-- header -->

    <!-- content main -->
    <main class="content-main h-fixed">
      <div class="content-header">
        <span class="subtitle">Rueda de Negocios/</span>
        <h3 class="title-main">
          {{ businessMarket.name }}
        </h3>
      </div>
      <div class="row mt-1">
        <basic-profile :id="this.user.id" @user-data="getUserData" />
        <!-- col 2 -->
        <div class="col-md-7">
          <div class="row">
            <div class="col-md-5 pt-4">
              <!-- Agenda -->
              <div class="row timeline main mb-2">
                <div class="col-md-12 p-4 box-card">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Mi Agenda /</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 timeline-content">
                      <div class="row mt-4">
                        <!--<div class="line"></div>-->
                        <!-- timeline-item -->
                        <div class="col-md-12 mb-2">
                          <template v-for="item in schedule">
                            <div
                              class="col-md-12 mb-2 timeline-date"
                              :key="item.id"
                              style="background: #fff"
                            >
                              <span
                                class="ti-calendar timeline-date__icon"
                              ></span>
                              {{ item.date }}
                              <!--<span class="ti-minus timeline-date__btn"></span>-->
                            </div>

                            <template v-for="item2 in item.schedule">
                              <meeting
                                :data="item2"
                                :key="item2.id"
                                @appointment-delete="getSchedulle(user.id)"
                              />
                            </template>
                          </template>
                          <!-- date 
                              <div class="col-md-12 mb-2 timeline-date">
                                <span class="ti-calendar timeline-date__icon"></span>
                                26 de Agosto
                                <span class="ti-minus timeline-date__btn"></span>
                              </div>
                              date -->

                          <!--<div class="timeline-item row available" >
                                <div class="timeline-hour">4:30pm</div>
                                <div class="col-md-2">
                                </div>
                                <div class="col-md-10 px-4">
                                  <p class="subtitle-2">
                                    <b class="par-small">Espacio disponible</b>
                                  </p>
                                </div>
                              </div>-->
                        </div>
                        <!-- timeline-item -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Agenda -->

              <!-- documents -->
              <div class="row document main">
                <div class="col-md-12 p-4 box-card">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Mis Documentos /</h4>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 document-content">
                      <div class="row mt-4">
                        <!-- document-item -->
                        <template v-for="item in documents">
                          <document :document="item" :key="item.id" />
                        </template>
                        <!-- document-item -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- documents -->
            </div>

            <div class="col-md-7 p-4">
              <!-- Invitaciones -->
              <div class="row invitaciones mb-3">
                <div class="col-md-12 px-4 py-3 box-card">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="box-card__title">Invitaciones pendiente</h4>
                    </div>
                  </div>

                  <div class="row mt-2">
                    <div class="col-md-12 invitaciones-content">
                      <template v-for="item in invitations">
                        <participant-data
                          :data="item"
                          :key="item.id"
                          @update-invitations="
                            updateInvitationsSchedule(user.id)
                          "
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Invitaciones -->

              <!-- participantesParticipan -->
              <div class="row participantes main mb-3">
                <div class="col-md-12 p-4 box-card">
                  <div class="row">
                    <div class="col-md-5">
                      <h4 class="box-card__title">Participantes /</h4>
                    </div>
                    <div class="col-md-7 text-right">
                      <div class="search">
                        <span class="ti-search search-icon"></span>
                        <input
                          type="text"
                          class="search-input"
                          v-model="participantsSearch.search"
                          @keyup="searchParticipan"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="row"
                    v-if="businessMarket.segmentation_actived == true"
                  >
                    <div class="col-md-11 border-bottom m-auto">
                      <div class="row p-2">
                        <div class="col-4 text-center">
                          <button
                            class="btn btn-outline-primary small"
                            @click="getSegmentation('all')"
                          >
                            Todos
                          </button>
                          <!-- <button
                            @click="getSegmentation('all')"
                            :style="'border-radius:5px;'"
                            class="btn border-0 p-2 m-0 w-100"
                          >
                            <span :style="'color:white;'" class="ti-infinite">
                              Todos</span
                            >
                          </button> -->
                        </div>
                        <div class="col-4 text-center">
                          <button
                            class="btn btn-outline-primary small"
                            @click="getSegmentation('offerer')"
                          >
                            Vendedor
                          </button>
                          <!-- <button
                            @click="getSegmentation('offerer')"
                            :style="'border-radius:5px;'"
                            class="btn border-0 p-2 m-0 w-100"
                          >
                            <span :style="'color:white;'" class="ti-id-badge">
                              Vendedor</span
                            >
                          </button> -->
                        </div>
                        <div class="col-4 text-center">
                          <button
                            class="btn btn-outline-primary small"
                            @click="getSegmentation('claimant')"
                          >
                            Comprador
                          </button>
                          <!-- <button
                            @click="getSegmentation('claimant')"
                            :style="'border-radius:5px;'"
                            class="btn  border-0 p-2 m-0 w-100"
                          >
                            <span :style="'color:white;'" class="ti-face-smile"
                              > Comprador</span
                            >
                          </button> -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4 participantes-content">
                    <div class="col-md-12 mb-2">
                      <!-- participantes item -->
                      <template v-for="item in participants">
                        <participant
                          :data="item"
                          :business_id="id"
                          :key="item.id"
                        />
                      </template>
                      <!-- participantes item -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- participantes -->
            </div>
          </div>
        </div>
        <!-- col 2 -->
      </div>
    </main>
    <!-- content main -->
  </div>
</template>

<script>
import basicProfile from "./components/basicProfile";
import participantData from "./components/participantData";
import participant from "./components/participants";
import document from "./components/document";
import meeting from "./components/meeting";
import headerCustom from "./components/header";

export default {
  components: {
    basicProfile,
    participantData,
    participant,
    document,
    meeting,
    headerCustom,
  },
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      company: {},
      listProducts: {},
      product: {},
      user: {},
      invitations: {},
      schedule: [],
      participants: [],
      participantsSearch: {
        participants: [],
        search: "",
      },
      documents: [],
      businessMarket: {},
      user_type: "",
    };
  },
  watch: {},
  created() {
    console.log("actualizacion0");
    this.user.id = localStorage.getItem("_current_user_id");
    this.user_type = "all";
    this.getSchedulle(this.user.id);
    this.getInvitations(this.user.id);
    this.getParticipants(this.id);
    setInterval(() => {
      console.log("actualizacion");
      this.getParticipants(this.id);
    }, 30000);
    this.getUserData();
    this.getBusinessMarketData(this.id);
  },
  methods: {
    searchParticipan() {
      console.log(
        "this.participantsSearch.participants:",
        this.participantsSearch.participants
      );
      this.participants = this.participantsSearch.participants.filter(
        (item) =>
          item.name.search(new RegExp(this.participantsSearch.search, "i")) !==
          -1
      );
      this.getSegmentationWithArray(this.participants);
    },
    getBusinessMarketData(id) {
      axios.get(`business-market/${id}`).then((res) => {
        this.businessMarket = res.data;
        console.log("this.businessMarket:", this.businessMarket);
      });
    },
    updateInvitationsSchedule() {
      this.$swal("Lista de invitaciones actualizada");
      this.getSchedulle(this.user.id);
      this.getInvitations(this.user.id);
    },
    getInvitations(id) {
      axios.get(`meeting-by-user/${id}/${this.id}`).then((data) => {
        this.invitations = data.data.data;
      });
    },
    getSchedulle(id) {
      axios.get(`schedule/${id}/${this.id}`).then((data) => {
        const formatSchedule = data.data.data.map((item) => {
          return {
            ...item,
            start: new Date(item.start),
          };
        });
        const sortSchedule = formatSchedule.sort((a, b) => a.start - b.start);
        let sortSchedule2 = [];
        sortSchedule.map((item) => {
          if (sortSchedule2.length > 0) {
            const instant = this.$moment(item.start).format("YYYY-MM-DD");
            let temp = -1;
            for (var i = 0, len = sortSchedule2.length; i < len; i++) {
              if (sortSchedule2[i].date === instant) {
                temp = i;
                break;
              }
            }

            if (temp !== -1) {
              sortSchedule2[temp].schedule.push(item);
            } else {
              let schedule = [];
              schedule.push(item);
              sortSchedule2.push({
                date: this.$moment(item.start).format("YYYY-MM-DD"),
                schedule,
              });
            }
          } else {
            let schedule = [];
            schedule.push(item);
            sortSchedule2.push({
              date: this.$moment(item.start).format("YYYY-MM-DD"),
              schedule,
            });
          }
        });
        //console.log("Nuevo Orden", sortSchedule2)
        this.schedule = sortSchedule2;
      });
    },
    getParticipants(id) {
      axios.get(`participants/${id}/${this.user.id}`).then((data) => {
        this.participants = data.data.data;
        this.participantsSearch.participants = data.data.data;
        this.getSegmentation(this.user_type);
      });
    },
    getDocuments(id) {
      axios.get(`modelDocuements/company/${id}`).then((data) => {
        this.documents = data.data.data;
      });
    },
    url(src) {
      return `${process.env.VUE_APP_API_URL}storage/${src}`;
    },
    getUserData() {
      const role = localStorage.getItem("_current_role_name");
      const id = localStorage.getItem("_current_user_id");

      axios.get(`business-market-user/${id}`).then((data) => {
        this.user = data.data[0];

        if (data.data[0].company_id !== null) {
          this.company = data.data[0].company;
          this.getProducts();
          this.getDocuments(data.data[0].company_id);
        }
      });
    },
    getProducts() {
      axios.get(`products-by-id/${this.user.company_id}`).then((result) => {
        //console.log(result)
        this.listProducts = result.data.data;
      });
    },
    getSegmentation(type) {
      let userSegmentation = [];
      this.user_type = type;
      if (this.user_type == "all") {
        userSegmentation = this.participantsSearch.participants;
      }
      if (this.businessMarket.segmentation_actived == true) {
        if (this.user_type == "claimant") {
          this.participantsSearch.participants.map((item) => {
            if (item.user_type == this.user_type) {
              userSegmentation.push(item);
            }
          });
        } else if (this.user_type == "offerer") {
          this.participantsSearch.participants.map((item) => {
            if (item.user_type == this.user_type) {
              userSegmentation.push(item);
            }
          });
        }
        this.participants = [];
        this.participants = userSegmentation;
        this.getSegmentationWithName(this.participants)
      }

      console.log("userSegmentation:", userSegmentation);
    },
    getSegmentationWithArray(searchUsers) {
      if (this.user_type !== "all") {
        this.participants = searchUsers.filter(
          (item) =>
            item.user_type.search(new RegExp(this.user_type, "i")) !== -1
        );
      }
    },

    getSegmentationWithName(searchUsers) {
      this.participants = searchUsers.filter(
        (item) =>
          item.name.search(new RegExp(this.participantsSearch.search, "i")) !==
          -1
      );
    },
  },
};
</script>
<style scoped>
</style>

