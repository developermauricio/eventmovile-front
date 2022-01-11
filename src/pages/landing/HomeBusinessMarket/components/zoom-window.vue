<template>
    <div>
    <div @click.prevent="signature">Click</div>
    
    </div>
</template>

<script>
    import zoomConfig from './zoom-config'
    
    export default {
        props: {
            nickname: String,
            meetingId: String
        },
        
        methods: {
            signature(){
                const meetConfig = zoomConfig.MeetingCfg(76749145413 , 'pepe');
                const ZoomMtg = zoomConfig.ZoomMtg;
                // Generate Signature function
                const signature = ZoomMtg.generateSignature({
                    meetingNumber: meetConfig.meetingNumber,
                    apiKey: meetConfig.apiKey,
                    apiSecret: meetConfig.apiSecret,
                    role: meetConfig.role,
                    success: (res) => {
                        // eslint-disable-next-line                             
                        console.log("success signature: " + res.result);
                    }
                });
                // join function
                console.log('start initialization');
                setTimeout(()=>{
                    this.initZoom(meetConfig,signature)
                },5000)
            },
            initZoom(meetConfig, signature){
                document.getElementById('zmmtg-root').style.display="block"
                ZoomMtg.init({
                leaveUrl: "https://www.google.com.co",
                isSupportAV: true,
                success: (success) => {
                    console.log('trying to join ' + JSON.stringify(success));
                    ZoomMtg.join({
                        signature: signature,
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
                        apiKey: meetConfig.apiKey,
                        userEmail: '',
                        passWord: meetConfig.passWord,
                        success: (res) => {
                            // eslint-disable-next-line
                            console.log("join meeting success");
                        },
                        error: (res) => {
                            // eslint-disable-next-line
                            console.log(res);
                        }
                    });
                },
                error: (res) => {
                    // eslint-disable-next-line
                    console.log(res);
                }
            })
            }
        },
    };
</script>