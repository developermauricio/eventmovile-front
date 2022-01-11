<template>
  <div id="ver" :style="bgImg">
    <!-- header -->
    <div
      class="header-main row"
      :style="'background-color:' + styles.home_div_first_color"
    >
      <div class="col-2 col-sm-1 col-xl-1">
        <router-link
          :to="{ name: 'landingEvent', query: { eventId: eventId } }"
        >
          <a
            :style="
              'border:none;background-color:' +
              styles.home_btn_color +
              '; color:' +
              styles.home_btn_text_color
            "
            class="btn btn-outline-primary btn-sm mx-1"
          >
            <span class="ti-arrow-left"></span>
          </a>
        </router-link>
      </div>
      <div class="col-5 col-sm-5 col-xl-8 p-1">
        <img class="img-responsive" width="100" height="100" :src="uriImg + styles.home_img_logo" />
      </div>

      <TopNavbar
        :color="styles.home_btn_color"
        :secondColor="styles.home_btn_text_color"
        v-if="showTopNav && styles.home_btn_color"
        :event="event"
      >
      </TopNavbar>
    </div>

    <div class="banner-container">
      <div class="img-mask-banner">
        <img :src="uriImg + halls.pic_banner" />
      </div>
    </div>
    <!-- header -->

    <!-- content main -->
    <main class="content-main container-cronograma">
      <div class="content-header">
        <span class="subtitle">{{
          $t("pages.Events.DetailEvent.schedule")
        }}</span>
        <h3
          class="title-main__actividad mt-0"
          :style="'color:' + styles.home_titles_color"
        >
          {{ hall.name }}
        </h3>
      </div>

      <!-- actividades item -->
      <div
        class="info-actividad row"
        v-for="(act, index) in activities"
        :key="index"
      >
        <div class="col-md-2 pr-lg-5">
          <div class="col-md-1 line-actividad py-4 ml-auto">
            <div
              class="number-actividad"
              :style="'background:' + styles.home_div_first_color"
            >
              <span :style="colorDiv(index, 'text', 'btn')"
                >{{ index + 1 }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-10">
          <div
            class="row"
            :style="{
              backgroundImage: `url('${uriImg}${act.pic_banner}')`,
            }"
          >
            <!--<div class="col-md-12 py-4" :style="colorDiv(index, 'bg')">-->
            <div class="col-md-12 py-4">
              <!--opcion 1 ini-->
              <span class="mb-3">
                <span :style="colorDiv(index, 'text')"></span>
                <span class="h2" :style="colorDiv(index, 'text')">{{
                  $moment(act.start_date).lang(lang).format("D")
                }}</span>
              </span>
              <div class="line-actividad-horizontal mb-3">
                <span :style="colorDiv(index, 'text', 'btn')"> </span>
              </div>
              <!--opcion 1 fijn-->
              
              <!--opcion 2 fin-->
              <div class="row">
                <div class="col-md-8 pb-3 px-4 collapsible__header">
                  <span :style="colorDiv(index, 'text')"
                    >{{ $t("pages.Events.DetailEvent.activity") }}/</span
                  >

                  <div class="hall-title-container row">
                    <div class="col-0"></div>
                    <!--template activitiesLineInHalls -->
                    <activitiesLiveInHalls :data="act"></activitiesLiveInHalls>
                    <!-- time -->
                    <div class="col-8 p-0">
                      <h4 class="mt-0 mb-1" :style="colorDiv(index, 'text')">
                        {{ act.name }}
                      </h4>
                    </div>
                    <div class="col-8 mt-2">
                      <span
                        class="collapsible__hour"
                        :style="colorDiv(index + 1, 'bg')"
                      >
                        <span
                          style="margin-right: 6px"
                          :style="colorDiv(index, 'text')"
                          class="ti-time"
                        ></span>
                        <span :style="colorDiv(index, 'text')">{{
                          $moment(act.start_date).lang(lang).format("hh:mm a")
                        }}</span>
                      </span>
                    </div>
                    <!-- time -->
                  </div>
                  <div class="speaker mt-3" :style="colorDiv(index, 'text')">
                    {{ $t("pages.Events.DetailEvent.speaker") }}:
                    <!--{{ listSpeakers(act.speakers) }}-->
                    <template v-for="itemSe in act.speakers">
                      <detailSpeaker
                        :styleDiv="colorDiv(index, 'text')"
                        :data="itemSe"
                        :key="itemSe.id"
                      ></detailSpeaker>
                    </template>
                  </div>
                </div>
                <div class="col-md-4" style="text-align: right">
                  <div>
                    <!-- <router-link
                      v-if="
                        showTopNav == true &&
                        act.type_activity.id == 1 &&
                        event.event_type_id != 2
                      "
                      :to="{
                        name: 'StreamingEvent',
                        params: { activityId: act.id },
                      }"
                    > -->
                    <template
                      v-if="
                        showTopNav == true &&
                        act.type_activity.id == 1 &&
                        event.even | (t_type_id != 2)
                      "
                    >
                      <button
                        @click="validateAll(1, act.id, act.authorization)"
                        class="btn custom-btn btn-primary mt-2 button-1"
                        :style="
                          'width: 85%; border:none;' +
                          'background-color:' +
                          styles.section_btn_color +
                          '; --color-hover:' +
                          styles.section_btn_color_hover +
                          ';--text-hover:' +
                          styles.section_btn_text_color_hover
                        "
                      >
                        <span :style="colorDiv(index, 'text', 'btn')">{{
                          $t("pages.Events.DetailEvent.enterTheActivity")
                        }}</span>
                      </button>
                    </template>
                    <!-- </router-link> -->
                    <template
                      v-if="
                        showTopNav == false &&
                        act.type_activity.id == 1 &&
                        event.event_type_id != 2
                      "
                    >
                      <button
                        @click="validateAll(2, act.id, act.authorization)"
                        class="btn custom-btn btn-primary mt-2 button-2"
                        :style="
                          'width: 85%; border:none;' +
                          'background-color:' +
                          styles.section_btn_color +
                          '; --color-hover:' +
                          styles.section_btn_color_hover +
                          ';--text-hover:' +
                          styles.section_btn_text_color_hover
                        "
                      >
                        <span :style="colorDiv(index, 'text', 'btn')">{{
                          $t("pages.Events.DetailEvent.enterTheActivity")
                        }}</span>
                      </button>
                    </template>
                    <!-- <router-link
                      v-if="
                        act.invited &&
                        act.type_activity.id == 2 &&
                        event.event_type_id != 2
                      "
                      :to="{
                        name: 'StreamingEvent',
                        params: { activityId: act.id },
                      }"
                    > -->
                    <template
                      v-if="
                        act.invited &&
                        act.type_activity.id == 2 &&
                        event.event_type_id != 2
                      "
                    >
                      <button
                        @click="validateAll(3, act.id, act.authorization)"
                        class="btn custom-btn btn-primary mt-2 button-3"
                        :style="
                          'width: 85%; border:none;' +
                          'background-color:' +
                          styles.section_btn_color +
                          '; --color-hover:' +
                          styles.section_btn_color_hover +
                          ';--text-hover:' +
                          styles.section_btn_text_color_hover
                        "
                      >
                        <span :style="colorDiv(index, 'text', 'btn')">{{
                          $t("pages.Events.DetailEvent.enterTheActivity")
                        }}</span>
                      </button>
                    </template>
                    <!-- </router-link> -->

                    <button
                      @click="validateAll(7, act.id, act.authorization)"
                      v-if="!act.invited && act.type_activity.id == 2"
                      class="btn custom-btn btn-primary mt-2 button-4"
                      :style="
                        'width: 85%; border:none;' +
                        'background-color:' +
                        styles.section_btn_color +
                        '; --color-hover:' +
                        styles.section_btn_color_hover +
                        ';--text-hover:' +
                        styles.section_btn_text_color_hover
                      "
                    >
                      <span :style="colorDiv(index, 'text')">{{
                        $t("pages.Events.DetailEvent.enterTheActivity")
                      }}</span>
                    </button>
                  </div>
                  <modal
                    name="modal-notification"
                    :width="400"
                    :height="250"
                    :adaptive="true"
                  >
                    <div class="container py-3">
                      <div slot="top-right">
                        <button
                          style="
                            margin-left: 97%;
                            border: none;
                            border-radius: 10px;
                            margin-top: 7px;
                          "
                          @click="$modal.hide('modal-notification')"
                        >
                          ❌
                        </button>
                      </div>
                      <div class="row my-4">
                        <div class="col-md-12 text-center">
                          <h3 class="h4" style="color: #614ba4">
                            {{ $t("pages.Events.DetailEvent.welcome") }}
                          </h3>

                          <router-link
                            v-if="
                              showTopNav == false &&
                              act.type_activity.id == 1 &&
                              event.event_type_id != 2
                            "
                            :to="{
                              name: 'Register-Event',
                              query: { eventId: act.event_id },
                            }"
                          >
                            <button
                              @click="notificationIfRegIni()"
                              class="btn custom-btn btn-primary mt-2"
                              :style="
                                'width: 85%; border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')"
                                >{{
                                  $t("pages.Events.DetailEvent.register")
                                }}-1</span
                              >
                            </button>
                          </router-link>
                          <p>
                            {{
                              $t(
                                "pages.Events.DetailEvent.ifYouAreAlreadyRegistered"
                              )
                            }}
                            -1
                            <router-link
                              :to="{
                                name: 'Login',
                                params: { eventId: event.id },
                              }"
                            >
                              <u :style="'color:#000'"
                                ><b :style="'color:#000'">
                                  {{
                                    $t("pages.Events.DetailEvent.logInHere")
                                  }}</b
                                ></u
                              >
                            </router-link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </modal>

                  <modal
                    name="modal-landing"
                    :width="400"
                    :height="200"
                    :adaptive="true"
                  >
                    <div class="container py-3">
                      <div slot="top-right">
                        <button
                          style="
                            margin-left: 97%;
                            border: none;
                            border-radius: 10px;
                            margin-top: 7px;
                          "
                          @click="$modal.hide('modal-landing')"
                        >
                          ❌
                        </button>
                      </div>
                      <div class="row my-4">
                        <div class="col-md-12 text-center">
                          <h3 class="h4" style="color: #614ba4">
                            {{ $t("pages.Events.DetailEvent.youNeedSignin") }}
                          </h3>
                          <router-link
                            :to="{
                              name: 'landingEvent',
                              query: { eventId: act.event_id },
                            }"
                          >
                            <button
                              class="btn custom-btn btn-primary mt-2"
                              :style="
                                'width: 85%; border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')">{{
                                $t("pages.Events.DetailEvent.goToHome")
                              }}</span>
                            </button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </modal>

                  <modal
                    name="modal-landing-user-logueado"
                    :width="400"
                    :height="200"
                    :adaptive="true"
                  >
                    <div class="container py-3">
                      <div slot="top-right">
                        <button
                          style="
                            margin-left: 97%;
                            border: none;
                            border-radius: 10px;
                            margin-top: 7px;
                          "
                          @click="$modal.hide('modal-landing-user-logueado')"
                        >
                          ❌
                        </button>
                      </div>
                      <div class="row my-4">
                        <div class="col-md-12 text-center">
                          <h3 class="h4" style="color: #614ba4">
                            {{
                              $t("pages.Events.DetailEvent.messageErrorTicket")
                            }}
                          </h3>
                          <router-link
                            :to="{
                              name: 'landingEvent',
                              query: {
                                eventId: act.event_id,
                                showTicket: true,
                              },
                            }"
                          >
                            <button
                              class="btn custom-btn btn-primary mt-2"
                              :style="
                                'width: 85%; border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')">{{
                                $t("pages.Events.DetailEvent.clickHere")
                              }}</span>
                            </button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </modal>

                  <modal
                    name="modal-ticket"
                    :width="400"
                    :height="250"
                    :adaptive="true"
                  >
                    <div class="container py-3">
                      <div slot="top-right">
                        <button
                          style="
                            margin-left: 97%;
                            border: none;
                            border-radius: 10px;
                            margin-top: 7px;
                          "
                          @click="$modal.hide('modal-ticket')"
                        >
                          ❌
                        </button>
                      </div>
                      <div class="row my-4">
                        <div class="col-md-12 text-center">
                          <h3 class="h4" style="color: #614ba4">
                            {{ $t("pages.Events.DetailEvent.youNeedSignin") }}
                          </h3>
                          <!-- <p>{{$t('pages.Events.DetailEvent.toCompleteTheTicketPurchaseProcess')}}</p> -->
                          <router-link
                            :to="{
                              name: 'Register-Event',
                              query: { eventId: act.event_id },
                            }"
                          >
                            <button
                              @click="notificationIfRegIni()"
                              class="btn custom-btn btn-primary mt-2"
                              :style="
                                'width: 85%; border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')"
                                >{{
                                  $t("pages.Events.DetailEvent.register")
                                }}-2</span
                              >
                            </button>
                          </router-link>
                          <!-- <p>
                            {{$t('pages.Events.DetailEvent.ifYouAreAlreadyRegistered')}} -2
                            <router-link :to="{ name: 'Login', params: { eventId: event.id },}">
                              <u :style="'color:#000'"
                                ><b :style="'color:#000'">
                                  {{$t('pages.Events.DetailEvent.logInHere')}}</b
                                ></u
                              >
                            </router-link>
                          </p> -->
                        </div>
                      </div>
                    </div>
                  </modal>

                  <button
                    :style="
                      'width: 85%; margin-top:0%; border:none;' +
                      'background-color:' +
                      styles.section_btn_color +
                      '; --color-hover:' +
                      styles.section_btn_color_hover +
                      ';--text-hover:' +
                      styles.section_btn_text_color_hover
                    "
                    class="btn custom-btn btn-primary"
                    @click="showDetail(act.id)"
                  >
                    {{ $t("pages.Events.DetailEvent.showDetails") }}
                  </button>
                </div>
              </div>

              <!-- content actividad -->
              <div
                class="col-md-10 pt-4 border-top"
                :style="colorDiv(index + 1, 'bg')"
                v-if="show == act.id"
              >
                <div class="row">
                  <div class="col-md-12">
                    <div class="speaker" :style="colorDiv(index + 1, 'text')">
                      {{ $t("pages.Events.DetailEvent.speaker") }}:{{
                        listSpeakers(act.speakers)
                      }}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-5">
                    <img class="img-active" :src="uriImg + act.pic" alt="" />
                  </div>

                  <div class="col-md-7 pl-5">
                    <div class="row">
                      <div class="col-md-12">
                        <p
                          class="actividad-par"
                          :style="colorDiv(index + 1, 'text')"
                          v-html="act.sort_description"
                        ></p>
                      </div>

                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-4">
                            <b
                              ><span
                                class="label4"
                                :style="colorDiv(index + 1, 'text')"
                                >{{ $t("pages.Events.DetailEvent.date") }}</span
                              ></b
                            >
                            <span
                              class="label5"
                              :style="colorDiv(index + 1, 'text')"
                              >{{
                                $moment(act.start_date).lang(lang).format("ll")
                              }}</span
                            >
                          </div>
                          <div class="col-md-4">
                            <b
                              ><span
                                class="label4"
                                :style="colorDiv(index + 1, 'text')"
                                >{{ $t("pages.Events.DetailEvent.hour") }}</span
                              ></b
                            >
                            <span
                              class="label5"
                              :style="colorDiv(index + 1, 'text')"
                              >{{
                                $moment(act.start_date)
                                  .lang(lang)
                                  .format("hh:mm a")
                              }}</span
                            >
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-4">
                            <b
                              ><span
                                class="label4"
                                :style="colorDiv(index + 1, 'text')"
                                >{{
                                  $t("pages.Events.DetailEvent.price")
                                }}</span
                              ></b
                            >
                            <span
                              v-if="act.unit_price == 0"
                              class="label5"
                              :style="colorDiv(index + 1, 'text')"
                              >{{ $t("pages.Events.DetailEvent.free") }}</span
                            >
                            <span
                              v-else
                              class="label5"
                              :style="colorDiv(index + 1, 'text')"
                              >{{ act.unit_price }}</span
                            >
                          </div>
                          <div class="col-md-4">
                            <b
                              ><span
                                class="label4"
                                :style="colorDiv(index + 1, 'text')"
                                >{{
                                  $t("pages.Events.DetailEvent.modality")
                                }}</span
                              ></b
                            >
                            <span
                              class="label5"
                              :style="colorDiv(index + 1, 'text')"
                              >{{ act.mode.name }}</span
                            >
                          </div>
                        </div>

                        <div>
                          <!-- <router-link
                            v-if="
                              showTopNav == true &&
                              act.type_activity.id == 1 &&
                              event.event_type_id != 2
                            "
                            :to="{
                              name: 'StreamingEvent',
                              params: { activityId: act.id },
                            }"
                          > -->
                          <template
                            v-if="
                              showTopNav == true &&
                              act.type_activity.id == 1 &&
                              event.event_type_id != 2
                            "
                          >
                            <button
                              @click="validateAll(4, act.id, act.authorization)"
                              class="btn custom-btn btn-primary mt-4 button-5"
                              :style="
                                'border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')">{{
                                $t("pages.Events.DetailEvent.enterTheActivity")
                              }}</span>
                            </button>
                          </template>
                          <!-- </router-link> -->
                          <!-- <router-link
                            v-if="
                              showTopNav == false &&
                              act.type_activity.id == 1 &&
                              event.event_type_id != 2
                            "
                            :to="{
                              name: 'Register-Event',
                              query: { eventId: act.event_id },
                            }"
                          > -->
                          <template
                            v-if="
                              showTopNav == false &&
                              act.type_activity.id == 1 &&
                              event.event_type_id != 2
                            "
                          >
                            <button
                              @click="validateAll(5, act.id, act.authorization)"
                              class="btn custom-btn btn-primary mt-4 button-6"
                              :style="
                                'border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')">{{
                                $t("pages.Events.DetailEvent.enterTheActivity")
                              }}</span>
                            </button>
                          </template>
                          <!-- </router-link> -->
                          <!-- <router-link
                            v-if="
                              act.invited &&
                              act.type_activity.id == 2 &&
                              event.event_type_id != 2
                            "
                            :to="{
                              name: 'StreamingEvent',
                              params: { activityId: act.id },
                            }"
                          > -->
                          <template
                            v-if="
                              act.invited &&
                              act.type_activity.id == 2 &&
                              event.event_type_id != 2
                            "
                          >
                            <button
                              @click="validateAll(6, act.id, act.authorization)"
                              class="btn custom-btn btn-primary mt-4 button-7"
                              :style="
                                'border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text', 'btn')">{{
                                $t("pages.Events.DetailEvent.enterTheActivity")
                              }}</span>
                            </button>
                          </template>
                          <!-- </router-link> -->

                          <template
                            v-if="!act.invited && act.type_activity.id == 2"
                          >
                            <button
                              @click="validateAll(6, act.id, act.authorization)"
                              class="btn custom-btn btn-primary mt-4"
                              :style="
                                'border:none;' +
                                'background-color:' +
                                styles.section_btn_color +
                                '; --color-hover:' +
                                styles.section_btn_color_hover +
                                ';--text-hover:' +
                                styles.section_btn_text_color_hover
                              "
                            >
                              <span :style="colorDiv(index, 'text')">{{
                                $t("pages.Events.DetailEvent.enterTheActivity")
                              }}</span>
                            </button>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- content actividad -->
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- content main -->

    <!-- actividades item -->
  </div>
</template>

<script>
import TopNavbar from "@/layout/dashboard/buttonSession.vue";
import getlang from "@/lang/index.js";
import activitiesLiveInHalls from "./components/activitiesLiveInHalls";
import detailSpeaker from "./components/detailSpeaker";
export default {
  name: "DetailEvent",
  props: ["id", "type"],
  components: { TopNavbar, activitiesLiveInHalls, detailSpeaker },
  data() {
    return {
      showTopNav: false,
      show: null,
      hall: [],
      eventId: null,
      hasPermission: false,
      invitations: [],
      activities: [],
      event: [],
      activityActive: null,
      documents: [],
      questions: [],
      styles: [],
      activity: [],
      halls: [],
      uri: process.env.VUE_APP_API_URL,
      uriImg: process.env.VUE_APP_API_URL_FILES,
      lang: "es",
    };
  },
  async mounted() {
    console.log("tipo:", this.type);
    if (this.id) {
      this.getLanguage();
      this.topNavbar();
      await this.getActivities();
      await this.getStyles();
      //await this.getActivity()
      await this.getHalls();
      this.getEvent();
      this.getInvitations();
      //this.verifyPoll()
    }
  },

  computed: {
    bgImg: function () {
      if (this.styles.home_img_background == "null") {
        return `background-color:${this.styles.home_color_background}`;
      } else {
        return `background-image:url('${this.uriImg}${this.styles.home_img_background}');
            background-color:${this.styles.home_color_background}
            background-position: center center;
            background-size: cover;
            background-repeat: repeat;
            position: relative;
            content:'';
            
          `;
      }
    },
  },

  methods: {
    getLanguage() {
      this.$i18n.locale = getlang.getLanguage();
      this.lang = this.$i18n.locale;
    },
    toPaymentF() {
      console.log("Entro a pagar en buy");
      console.log(this.activities);
      // return null
      let id = localStorage.getItem("_current_user_id");
      if (id)
        this.$router.push({
          name: "Payment-Event",
          query: { eventId: this.event.id },
        });
      else console.log("Entro aquik");
      this.$modal.show("modal-ticket");
    },
    notificationIfRegIni() {
      this.$modal.show("modal-notification");
    },
    topNavbar() {
      let id = localStorage.getItem("_current_user_id");
      if (id == null) this.showTopNav = false;
      else this.showTopNav = true;
    },
    showDetail(index) {
      if (index == this.show) this.show = null;
      else this.show = index;
      this.changeActivity();
    },
    listSpeakers(speakers) {
      let string = "";
      let i = 0;
      speakers.forEach((element) => {
        if (i == 0) string = string + " " + element.name;
        else string = string + ", " + element.name;
        i++;
      });
      return string;
    },
    colorDiv(index, type, opc = null) {
      if (opc) {
        if (type == "text")
          return "color:" + this.styles.section_btn_text_color;
      }

      if (index % 2 == 0) {
        if (type == "bg")
          return "background-color:" + this.styles.section_color_background;
        if (type == "text") return "color:" + this.styles.section_text_color;
      } else {
        if (type == "bg")
          return "background-color:" + this.styles.section_color_background;
        if (type == "text") return "color:" + this.styles.section_text_color;
      }
    },
    getHall() {
      axios.get(`halls`);
    },
    async hasPermissionFunction(activity) {},
    async changeActivity() {
      this.hasPermission = false;
      this.hasPermission = this.invitations.map((item) => {
        if (item.id == this.show) {
          return true;
        }
      });
      let hassP = this.hasPermission.filter((item) => {
        return item == true;
      });
      hassP.filter((item) => {
        if (item == true) this.hasPermission = true;
        else this.hasPermission = false;
      });
    },
    getInvitations() {
      if (this.showTopNav) {
        axios.get(`activitiesInvitation/${this.eventId}`).then((response) => {
          this.invitations = response.data.data;
        });
      }
    },

    getActivity() {
      axios.get(`activityExternal/${this.id}`).then((response) => {
        this.activity = response.data;
      });
    },

    async getActivities() {
      const user_id = localStorage.getItem("_current_user_id");
      if (this.type == "event") {
        console.log("Es un evento");
        this.eventId = this.id;
        if (user_id && user_id != null) {
          console.log("1.Entrando aqui con _current_user_id:", user_id);
          await axios
            .get(`activitiesEventExternal/${this.id}/${user_id}`)
            .then((response) => {
              this.activities = response.data.data;
            });
          console.log("Estas logueado:", this.activities);
        } else {
          await axios
            .get(`activitiesEventExternal/${this.id}`)
            .then((response) => {
              this.activities = response.data.data;
            });
          console.log("No esta logueado:", this.activities);
        }
      } else {
        console.log("Este no es evento");
        let arraAct = [];
        await axios.get(`hallsExternal/${this.id}`).then(async (response) => {
          let data = response.data;
          this.hall = data;
          let acts = JSON.parse(data.activities);
          this.eventId = data.event_id;

          if (user_id && user_id != null) {
            console.log("2.Entrando aqui con _current_user_id:", user_id);
            // await Promise.all(
            //   acts.map(async (item) => {
            //     await axios
            //       .get(`activityExternal/${item}/${user_id}`)
            //       .then((resp) => {
            //         arraAct.push(resp.data);
            //       });
            //   })
            // );
            await Promise.all(
              acts.map(async (item) => {
                await axios
                  .get(`activityExternal/${item}/${user_id}`)
                  .then((resp) => {
                    arraAct.push(resp.data);
                  });
              })
            );
            console.log("Esta logueado:", acts);
          } else {
            await Promise.all(
              acts.map(async (item) => {
                await axios.get(`activityExternal/${item}`).then((resp) => {
                  arraAct.push(resp.data);
                });
              })
            );
            console.log("no esta Esta logueado:", arraAct);
          }
        });
        arraAct = arraAct.sort(function (a, b) {
          var c = new Date(a.start_date);
          var d = new Date(b.start_date);
          return c - d;
        });
        this.activities = arraAct;
      }
      let todayActivities = [];
      todayActivities = this.activities.filter((item) => {
        return (
          this.$moment(item.start_date).format("YYYY-MM-DD") ==
          this.$moment().format("YYYY-MM-DD")
        );
      });
    },
    getEvent() {
      axios.get(`showEvent/${this.eventId}`).then((response) => {
        this.event = response.data[0];
        if (this.type == "event") {
          this.hall = this.event;
        }
      });
    },

    getHalls() {
      axios.get(`hallsExternal/${this.hall.id}`).then((response) => {
        this.halls = response.data;
      });
    },

    getStyles() {
      axios.get(`styleEvent/${this.eventId}`).then((response) => {
        this.styles = response.data;
      });
    },
    validateLogin() {
      let user_id = localStorage.getItem("_current_user_id");
      let token = localStorage.getItem("_current_token");
      if (user_id && token) {
        return true;
      }
      return false;
    },
    validateAll(opt, id, authorization) {
      if (this.validateLogin()) {
        if (authorization) {
          this.$router.push({
            name: "StreamingEvent",
            params: { activityId: id },
          });
        } else {
          // this.$swal({icon:'error', text:'No estas autorizado para este actividad'})

          this.$modal.show("modal-landing-user-logueado");
        }
      } else {
        this.$modal.show("modal-landing");
      }
    },
  },
  mount() {
    this.show();
  },
};
</script>

<style>
.hall-title-container {
  display: flex;
}

body {
  overflow-x: hidden;
}
.collapsible__header {
  cursor: pointer;
  position: relative;
}

.collapsible__btn {
  position: absolute;
  right: 0;
  top: 0px;
  font-size: 3rem;
}

.collapsible__hour {
  right: 80px;
  top: 20px;
  font-size: 1rem;
  border-radius: 5px;
  /*background: white;*/
  padding: 0.5rem 1rem;
}

.title-main__actividad {
  font-size: 2.5rem;
  font-weight: bold;
}

.line-actividad {
  position: relative;
  height: 87%;
}

.line-actividad::after {
  content: "";
  background: #aeadad;
  width: 4px;
  height: 100%;
  position: absolute;
  left: 37px;
}
.line-actividad-horizontal {
  position: relative;
}

.line-actividad-horizontal::after {
  content: "";
  background: #aeadad;
  width: 100%;
  height: 2px;
  position: absolute;
  left: 1;
}

.logo-main {
  margin-left: 2em;
}

.logo-main img {
  width: 50%;
}

.img-active {
  width: 100%;
  margin: 1rem 0;
}

.le-box {
  padding: 0.5rem;
  cursor: pointer;
}
.le-date {
  display: block;
  color: black;
  font-size: 0.7rem;
  margin: 0 0 -7px;
}
.le-number {
  display: block;
  color: black;
}
.label4 {
  color: rgb(102, 102, 102);
  display: block;
  margin: 0.5rem 0;
}
.label5 {
  color: black;
  display: block;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.vm--modal {
  border-radius: 20px !important;
}
.actividad-par {
  margin-top: 3rem;
}
.box-calendar__wrap {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
}
.box-calendar {
  color: white;
}

.box-calendar__title {
  font-size: 1rem;
  cursor: pointer;
}

.box-calendar__date {
  display: block;
}

.box-calendar__hour {
  display: block;
}

.number-actividad {
  background: #614ba4;
  text-align: center;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
}

/* CREATEGICA */

.header-main {
  background-color: #fff;
}

.container-cronograma {
  width: 70%;
  padding: 10em 0 10em 0 !important;
  margin: auto !important;
}

.mb-1 {
  width: 70%;
}

.custom-btn:hover {
  background: var(--color-hover) !important;
  color: var(--text-hover) !important;
}

/* CREATEGICA END*/
</style>
