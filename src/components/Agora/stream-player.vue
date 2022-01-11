<template>
  <div class="row cont-agora-video-player">
    <div class="col-12 m-0 p-0 agora-video-player" ref="player" :id="domId"></div>
  </div>
</template>

<script>
export default {
  name: 'stream-player',
  props: [
    'stream',
    'domId',
  ],
  mounted () {
    console.log("STREAM IS PLAY",this.stream.isPlaying())
    this.$nextTick(function () {
      
      if (this.stream && !this.stream.isPlaying()) {
        console.log("PLAY A VIDEO")
        this.stream.play(`${this.domId}`, {fit: 'cover'}, (err) => {
          
          if (err && err.status !== 'aborted') {
            console.warn('trigger autoplay policy')
          }
        })
      }
    })
  },
  methods: {
    
  },
  beforeDestroy () {
    if (this.stream) {
      if (this.stream.isPlaying()) {
        this.stream.stop()
      }
      this.stream.close()
    }
  }
}
</script>

<style>
.cont-agora-video-player{
  height: 100%;
  width: 100%;
  position:relative;
}
.agora-video-player {
  position:relative !important;
  height: 100%;
  width: 100%;
}
.buttons-video-agora{
  position:absolute;
  z-index:100;
  height:25px;
  
}
</style>