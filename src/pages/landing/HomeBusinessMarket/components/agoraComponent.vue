<template>
    <div class="embed-responsive embed-responsive-16by9 " style="min-height:500px">
              
        <div class="agora-my-video">
            <StreamPlayer v-if="rendercurrentLocalStream" :stream="localScreen" :domId="localScreen.getId()" ></StreamPlayer>
            <StreamPlayer v-if="localStream" :stream="localStream" :domId="localStream.getId()" ></StreamPlayer>
        </div>

        <div class="agora-video embed-responsive-item" :key="index" v-for="(remoteStream, index) in remoteStreams">
            <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"></StreamPlayer>
        </div>

        <div class="offset-4 col-4 buttons-video-agora position-absolute " v-if="localStream">
            <div class="row ">
                <div class="col-4 m-0 p-0">
                    <button type="button" class="btn btn-primary w-100 h-100 rounded-0 m-0 p-0 border-0 text-lowercase" :class="classesButtons.video" @click="disableVideo()"><span class="ti-video-camera"></span> {{classesButtons.messageVideo}}</button>
                </div>
                <div class="col-4 m-0 p-0">
                    <button type="button" class="btn btn-primary w-100 h-100 rounded-0 m-0 p-0 border-0 text-lowercase" :class="classesButtons.audio" @click="disableAudio()"><span class="ti-microphone-alt"></span> {{classesButtons.messageAudio}}</button>
                </div>
                <div class="col-4 m-0 p-0">
                    <button type="button" class="btn btn-primary w-100 h-100 rounded-0 m-0 p-0 border-0 text-lowercase" :class="classesButtons.screen" @click="enableShareScreen()"><span class="ti-new-window"></span> {{classesButtons.messageScreen}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RTCClient from "./agora-rtc-client";
import StreamPlayer from "./stream-player";
export default {
    name:"implementingAgora",
    props:['meetingId'],
    components:{StreamPlayer},
    data() {
        return {
            remoteStreams:[],
            principalStream: null,
            localStream: null,
            localScreen:null,
            disableJoin: false,
            option: {
                appid: process.env.VUE_APP_ID_AGORA,
                token: '',
                uid: localStorage.getItem('_current_user_id'),
                channel: this.meetingId,
            },
            classesButtons: {
            video:'enable-video',
            messageVideo:'enabled',
            audio:'enable-audio',
            messageAudio:'enabled',
            screen:'disable-screen',
            messageScreen:'No Share',
            },
            rendercurrentLocalStream:false,
            tmpStatusVideo:true
        }
    },
    created() {
        this.user = {
            id: localStorage.getItem('_current_user_id'),
            name: localStorage.getItem('_current_user_name'),
            role: localStorage.getItem('_current_role_name'),
        }

        this.rtc = new RTCClient()

        const rtc = this.rtc
        rtc.on('stream-added', (evt) => {
            let {stream} = evt
            console.log("[agora] [stream-added] stream-added", stream.getId())
            rtc.client.subscribe(stream)
        })
            
        rtc.on('stream-subscribed', (evt) => {
            let {stream} = evt
            console.log("[agora] [stream-subscribed] stream-added", stream.getId())
            if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
            this.remoteStreams.push(stream)
            }
        })

        rtc.on('stream-removed', (evt) => {
            let {stream} = evt
            console.log('[agora] [stream-removed] stream-removed', stream.getId())
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
        }) 

        rtc.on('peer-online', (evt) => {
            //this.$swal(`Peer ${evt.uid} is online`)
        }) 

        rtc.on('peer-leave', (evt) => {
            //this.$swal(`Peer ${evt.uid} already leave`)
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== evt.uid)
        })

        this.getToken()

    },
    beforeDestroy() {
      if(this.rtc)
        delete this.rtc
      if(this.screen)
        delete this.screen
    },
    methods: {
        forceRerender() {
        // Remove my-component from the DOM
            this.rendercurrentLocalStream = false;

            this.$nextTick(() => {
            // Add the component back in
                this.rendercurrentLocalStream = true;
            });
        },
        enableShareScreen(){
            if(this.localScreen){
                this.leaveScreen()
                return
            }
            this.screen = new RTCClient()

            const screen = this.screen
            screen.on('stream-added', (evt) => {
                let {stream} = evt
                console.log("[agora] [stream-added] stream-added", stream.getId())
                screen.client.subscribe(stream)
            })
            
            screen.on('stream-subscribed', (evt) => {
            let {stream} = evt
            console.log("[agora] [stream-subscribed] stream-added", stream.getId())
            if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
                this.remoteStreams.push(stream)
            }
            })

            screen.on('stream-removed', (evt) => {
                let {stream} = evt
                console.log('[agora] [stream-removed] stream-removed', stream.getId())
                this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
            }) 

            screen.on('peer-online', (evt) => {
                console.log(`Peer ${evt.uid} is online`)
            //this.$swal(`Peer ${evt.uid} is online`)
            }) 

            screen.on('peer-leave', (evt) => {
                console.log(`Peer ${evt.uid} already leave`)
                //this.$swal(`Peer ${evt.uid} already leave`)
                this.remoteStreams = this.remoteStreams.filter((rtc) => it.getId() !== evt.uid)
            })

            this.screen.joinChannel(this.option).then(() => {
                console.log(`Join Success`)
                //this.$swal(`Join Success`)
                this.screen.shareScreen().then((stream) => {
                    console.log(`Publish Success`)
                    //this.$swal(`Publish Success`)
                    this.localScreen = stream
                    this.classesButtons.messageScreen = "Shared"
                    if(this.tmpStatusVideo)
                    this.localStream.muteVideo()

                    this.forceRerender()
                }).catch((err) => {
                    this.$swal({icon:'error', text:'Publish Failure'})
                    console.log('publish local error', err)
                })
            }).catch((err) => {
                this.$swal({icon:'error', text:`Join Failure`})
                console.log('join channel error', err)
            })
        },
        leaveScreen () {
            this.screen.leaveChannel().then(() => {
                this.$swal('Leave Success')
            
            }).catch((err) => {
                this.$swal({icon:'error', text:'Leave Failure'})
                console.log('leave error', err)
            })

            this.localScreen = null
            this.classesButtons.messageScreen = "no Shared"
            if(this.tmpStatusVideo)
                this.localStream.unmuteVideo()
            this.forceRerender()
        },
        disableVideo(){
            if(this.localStream.disableVideo()){
                this.tmpStatusVideo = false
                this.localStream.muteVideo()
                this.classesButtons.video = 'disable-video'
                this.classesButtons.messageVideo = "disabled"
            } else {
                this.tmpStatusVideo = true
                this.localStream.unmuteVideo()
                this.classesButtons.video = 'enable-video'
                this.classesButtons.messageVideo = "enabled"
            }
        },
        disableAudio(){
            if(this.localStream.disableAudio()){
                this.localStream.muteAudio()
                this.classesButtons.audio = 'disable-audio'
                this.classesButtons.messageAudio = "disabled"
            } else {
                this.localStream.unmuteAudio()
                this.classesButtons.audio = 'enable-audio'
                this.classesButtons.messageAudio = "enabled"
            }
        },
        getToken(){
            axios.post('token-agora',{"id_user":this.user.id, "meeting_id":`${this.meetingId}`}).then(res=>{
                this.option.token = res.data.data.token2
                this.option.uid = res.data.data.uid
                this.joinEvent()
            }).catch(e=>{
                this.$swal({icon:'error', text:e})
                console.log(e)
            })
        },
        joinEvent () {
            if(!this.option.appid) {
                this.judge('Appid')
                return
            }
            if(!this.option.channel) {
                this.judge('Channel Name')
                return
            }
            
            console.log("Option:", this.option)
            this.rtc.joinChannel(this.option).then(() => {
            //this.$swal(`Join Success`)
            this.rtc.publishStream().then((stream) => {
                //this.$swal(`Publish Success`)
                this.localStream = stream
            }).catch((err) => {
                this.$swal({icon:'error', text:'Publish Failure'})
                console.log('publish local error', err)
            })
            }).catch((err) => {
            this.$swal({icon:'error', text:`Join Failure`})
            
            console.log('join channel error', err)
            })
            this.disableJoin = true
        },
        leaveEvent (stream) {
            this.disableJoin = false
            this.rtc.leaveChannel().then(() => {
            this.$swal('Leave Success')
            
            }).catch((err) => {
                this.$swal({icon:'error', text:'Leave Failure'})
                
                console.log('leave error', err)
            })
            this.localStream = null
            this.remoteStreams = []
        },
        judge(detail) {
            this.$swal({icon:'error', text:`Please enter the ${detail}`})
        },
      
    },
}
</script>
<style scoped>
.agora-my-video{
    position:absolute;
    z-index:100;
    width: 200px;
    height:110px;
    right: 3px;
    bottom:3px
  }

 .buttons-video-agora{
   bottom:0px;
  }
  .agora-video {
    width: 100%;
    margin:0
  }
  .enable-video {
    background-color: #eb5e28;
  }
  .disable-video {
    background-color: #942e06;
  }

  .enable-audio {
    background-color: #C119BF;
  }
  .disable-audio {
    background-color: #500b4f;
  }
</style>