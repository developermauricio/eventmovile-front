<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type} c-primary`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card title="Usuarios Inscriptos por evento"
                    sub-title="m"
                    :chart-data="usersChart.data"
                    :chart-options="usersChart.options">
          <span slot="footer">
            <i class="ti-reload"></i> Ultima consulta 31/07/2020 10:20 Am
          </span>
          <div>
            Tipo:
          </div>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Expo Arte
            <i class="fa fa-circle text-danger"></i> Inversión en tiempos de Covid 19
            <i class="fa fa-circle text-warning"></i> Yoga para el Alma
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Correos enviados"
                    sub-title=""
                    :chart-data="preferencesChart.data"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Ultima consulta 2hr </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Expo Arte
            <i class="fa fa-circle text-danger"></i> Inversión en tiempos de Covid 19
            <i class="fa fa-circle text-warning"></i> Yoga para el Alma
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Ventas"
                    sub-title=""
                    :chart-data="activityChart.data"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <i class="ti-timer"></i> Ultima consulta 2hr
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Expo Arte
            <i class="fa fa-circle text-warning"></i> Yoga para el Alma
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-calendar",
          title: "Proximo Evento",
          value: "20:23:14",
          footerText: "Expo Arte",
          footerIcon: "ti-comment"
        },
        {
          type: "success",
          icon: "ti-calendar",
          title: "Proxima rueda",
          value: "02:23:14",
          footerText: "Inversión en tiempos de Covid",
          footerIcon: "ti-comment"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Ultima Encuesta",
          value: "129",
          footerText: "Expo Arte",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-wallet",
          title: "Total Ventas",
          value: "145",
          footerText: "Expo Arte",
          footerIcon: "ti-reload"
        }
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6]
        },
        options: {}
      }
    };
  }
};
</script>
<style>
</style>
