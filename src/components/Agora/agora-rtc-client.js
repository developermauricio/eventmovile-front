import AgoraRTC from 'agora-rtc-sdk'
//console.log('AgoraRTC SDK VERSION: ', AgoraRTC.VERSION)
import EventEmitter from 'events'
import { isFirefox, isCompatibleChrome} from './tools'
export default class RTCClient {
  constructor() {
    // Options for joining a channel
    this.option = {
      appId: '',
      channel: '',
      uid: '',
      token: '',
    }
    this.client = null
    this.localStream = null
    this._eventBus = new EventEmitter()
  }

  //init client and Join a channel
  joinChannel(option) {
    return new Promise((resolve, reject) => {
      this.client = AgoraRTC.createClient({mode: "rtc", codec: "vp8",areaCode: ['GLOBAL']})
      this.client.init(option.appid, () => { 
        //console.log("init success")
        this.clientListener()
        this.client.join(option.token ? option.token : null, option.channel, null, (uid) => {
          //console.log("join channel: " + this.option.channel + " success, uid: ", uid)
          this.option = {
            appid: option.appid,
            token: option.token,
            channel: option.channel,
            uid: uid,
          }
          resolve()
        }, (err) => {
          console.error("client join failed", err)
        })
      }, (err) => {
        reject(err)
        console.error(err)
      })
      //console.log("[agora-vue] appId", option.appid)
     })
  }

  shareScreen() {
    return new Promise((resolve, reject) => {
      // Create a local stream
      const streamSpec = {
        streamID: this.option.uid,
        audio: false,
        video: false,
        screen: true
      }

      if (isFirefox()) {
        streamSpec.mediaSource = 'window';
      } 
      // else if (!isCompatibleChrome()) {
      //   streamSpec.extensionId = 'minllpmhdgpndnkomcoccfekfegnlikg';
      // }

      this.localStream = AgoraRTC.createStream(streamSpec);
      //console.log("localScreen:", this.localStream)
      // Initialize the local stream
      this.localStream.init(function(stream) {
        // Play the stream.
        //stream.play('Screen');
        //console.log("localScreen:", this.localStream)
        resolve(this.localStream)
        // Publish the stream.
        this.client.publish(this.localStream);

      }.bind(this), function(err) {
        console.log("Errorscreen:", err);
        reject(err)
          
      });
    })
  }

  streamAudio(){
    return new Promise((resolve, reject) => {
       
      this.localStream = AgoraRTC.createStream({
        streamID: this.option.uid,
        audio: true,
        video: false,
        screen: false,
      })
          // Initialize the local stream
      this.localStream.init(() => {
        //console.log("init local stream success") 
        resolve(this.localStream)
    
        // Publish the local stream
        this.client.publish(this.localStream, (err) =>  {
          //console.log("publish failed")
          console.error(err)
        })
      }, (err) => {
        reject(err)
        console.error("init local stream failed ", err)
      })
    })
  }

  publishStream() {
    return new Promise((resolve, reject) => {
      // Create a local stream
      this.localStream = AgoraRTC.createStream({
        streamID: this.option.uid,
        audio: true,
        video: true,
        screen: false,
      })
      // Initialize the local stream
      this.localStream.init(() => {
        //console.log("init local stream success") 
        resolve(this.localStream)
    
        // Publish the local stream
        this.client.publish(this.localStream, (err) =>  {
          //console.log("publish failed")
          console.error(err)
        })
      }, (err) => {
        reject(err)
        console.error("init local stream failed ", err)
      })
    })
  }

  clientListener() {
    const client = this.client
    
    client.on('stream-added', (evt) => {
      // The stream is added to the channel but not locally subscribed
      this._eventBus.emit('stream-added', evt)
    })
    client.on('stream-subscribed', (evt) => {
      this._eventBus.emit('stream-subscribed', evt)
    })
    client.on('stream-removed', (evt) => {
      this._eventBus.emit('stream-removed', evt)
    })
    client.on('peer-online', (evt) => {
      this._eventBus.emit('peer-online', evt)
    })
    client.on('peer-leave', (evt) => {
      this._eventBus.emit('peer-leave', evt)
    })
  }

  on(eventName, callback) {
    this._eventBus.on(eventName, callback)
  }

  leaveChannel() {
    return new Promise((resolve, reject) => {
      // Leave the channel
      this.client.unpublish(this.localStream, (err) => {
        //console.log(err)
      })
      this.client.leave(() => {
        // Stop playing the local stream
        if (this.localStream.isPlaying()) {
          this.localStream.stop()
        }
        // Close the local stream
        this.localStream.close()
        this.client = null
        resolve()
        //console.log("client leaves channel success");
      }, (err) => {
        reject(err)
        //console.log("channel leave failed");
        console.error(err);
      })
    })
  }
}