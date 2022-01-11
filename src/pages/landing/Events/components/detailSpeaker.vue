<template>
  <div :style="styleDiv" class="row">
    <div class="col-md-12 mt-3 text-left">
      <img :src="img" class="avatar-speaker" />
    </div>
    <div class="col-md-12 text-left">
      <p
        class="mt-2"        
      >    
        {{ data.name }}
      </p>
    </div>
    <div class="col-md-12 text-left">
      <p class="mt-1" style="font-size: 12px">
        {{ data.sort_description }}
      </p>
    </div>
  </div>
  </template>






<script>
export default {
  name: "detailSpeaker",
  props: ["data", "styleDiv"],
  data() {
    return {
      now: "",
      img: process.env.VUE_APP_API_URL_FILES + this.data.pic,
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
    .avatar-speaker{
        width: 82px;
        height: 82px;
        border: 0.7px solid #acacac;
        border-radius: 50%;        
    }
</style>