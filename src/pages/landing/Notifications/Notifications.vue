<template>
  <card title="Notificaciones" sub-title="Listado de notificaciones">
    <div>
      <div class="row">
        <div class="col-md-12">

          <div class="alert alert-info">
            <button type="button" aria-hidden="true" class="close">×</button>
            <span>
              En un día es el lanzamiento de tu evento, Yoga para el Alma
            </span>
          </div>

          <div class="alert alert-info">
            <button type="button" aria-hidden="true" class="close">×</button>
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet molestias optio cum vitae doloribus velit, dignissimos sequi ducimus excepturi ut quos veniam quas. Obcaecati officiis architecto nesciunt tenetur alias quam!</span>
          </div>

          <div class="alert alert-info">
            <button type="button" aria-hidden="true" class="close">×</button>
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet molestias optio cum vitae doloribus velit, dignissimos sequi ducimus excepturi ut quos veniam quas. Obcaecati officiis architecto nesciunt tenetur alias quam!</span>
          </div>

        </div>

      </div>

    </div>
  </card>
</template>
<script>
import NotificationTemplate from './NotificationTemplate';

export default {
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      }
    };
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "ti-gift",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    }
  }
};
</script>
<style>
</style>
