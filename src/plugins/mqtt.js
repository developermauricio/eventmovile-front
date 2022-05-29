import mqtt from 'mqtt';


const url = 'wss://mqtt.socket-aicode.art:8083';
//const url = 'wss://brk2.eventmovil.com:8083';
/* const options = {
    // clientId:"mqttjs01",
    username: "mqtt",
    password: "HVH1RpPLiB2hxI5VwKoY",
    connectTimeout: 4000, // Time out
    reconnectPeriod: 4000, // Reconnection interval
}; */
const options = {
    // clientId:"mqttjs01",
    clientId: "mqttjs_3be2c321",
    username:process.env.VUE_APP_USER_MQTT,
    password:process.env.VUE_APP_PASSWORD_MQTT,
    connectTimeout: 4000, // Time out
    reconnectPeriod: 4000, // Reconnection interval
};

function connect (){
    
    const client = mqtt.connect(url, options);
    // const client = mqtt.connect('mqtt://test.mosquitto.org');
    
    client.on('error', function (error) {
        console.log('🚨 Error: ' + error);
        console.log(error);
    });

    client.on('close', function () {
        console.log('🔌 Connection has been closed');
    });

    client.on('reconnect', function () {
        console.log('⏳ Reconnecting...');
    });

    client.on('connect', function () {
        console.log('✅ Connected!');
        const topic = 'eventmovil';
        
        // client.subscribe(topic, function (err, res) {
            
        //     if (err) {
        //         console.log('🚨 Error when subscribing to topic ' + topic + ': ' + err);
        //         return;
        //     } 
        //     else {
        //         console.log("subscribed a eventmovil")
        //     }    
        // });

        
    });

    return client
}


const eventMQTT = {}

eventMQTT.install = function(Vue){
    Vue.prototype.$mqtt = connect
}

export default eventMQTT
