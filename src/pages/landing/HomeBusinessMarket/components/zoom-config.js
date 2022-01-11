import { ZoomMtg } from '@zoomus/websdk';


//ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.7.8/lib', '/av');
let zoomJSLib='node_modules/@zoomus/websdk/dist/lib';
let zoomJSAVLib='/av'

//ZoomMtg.setZoomJSLib(zoomJSLib, zoomJSAVLib);
var browseinfo = ZoomMtg.checkSystemRequirements();
console.log(browseinfo)

document.getElementById('zmmtg-root').style.display = "none";
ZoomMtg.preLoadWasm()
ZoomMtg.prepareJssdk()


const API_KEY = "mipQVZA4QICj71qO0QsKIA";
const API_SECRET = "96BbgmotDimIBiMefwVOBriXo5lyzSk4mz4l";

const MeetingCfg = (meetingId, nickname) => ({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    meetingNumber: meetingId,
    userName: nickname,
    passWord: 'dXJ6ajQxTUVxVXM2NWpsamptbXU2UT09',
    leaveUrl: "https://google.com.co",
    role: 0
});

export default { MeetingCfg , ZoomMtg };