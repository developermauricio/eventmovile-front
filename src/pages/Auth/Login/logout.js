import Axios from "axios"

const logoutTracking ={
   methods:{
      logoutTracking(){
         const trackingId = localStorage.getItem('_current_tracking_login')
         if(trackingId){
            let params = { actived:false }
            axios.put(`loginTracking/${trackingId}`, params)
         }
      }
   }
}

const logoutKillToken = {
   
}

export default logoutTracking