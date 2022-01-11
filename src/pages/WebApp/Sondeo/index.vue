<template>
    <div>
        <div class="col-md-12">
        <h4 class="subtitle2">
            {{$t('pages.Events.StreamingEvent.weInviteYouToFillOutTheSurvey')}}
        </h4>
        </div>
        <div class="col-md-12 poll-content">
        <template v-for="(item,index) in probes">
            <div :key="item.index">
            <button class="btn btn-primary w-100 mt-1" type="button" @click="functionShowProbe(index)">
                {{item.name}}
            </button>
                
            <div v-show="item.display">
                <div class="card card-body p-0 pr-1" v-if="ifShowProbes(index)">
                <template v-for="item2 in item.questions">
                    <question :data="item2" :key="item2.id" v-model="item2.answer"/>  
                </template>
                <button class="btn btn-outline-primary mt-0" @click="probesAnswersFunction(index)">
                {{$t('pages.Events.StreamingEvent.send')}}
                </button>
                </div>
                <div class="card card-body" v-if="!ifShowProbes(index)">
                <answers-probe :probe_id="probes[index].id"/>
                </div>
            </div>
            </div>
            
        </template>
    
        <!-- items -->
            <div class="row mt-0">
            <!-- document-footer -->
            
            <!-- document-footer -->

            </div>
        <!-- items -->
        </div>
    </div>
</template>
<script>
import question from './questions'
import answersProbe from './answersProbes'
export default {
    components:{question, answersProbe},
    data(){
        return{
            id_user: 0,
            id_event:0,
            probes:[],            
        }
    },
    props:['idActivity'],
    
    mounted(){
        this.id_user = localStorage.getItem("_current_user_id")
        this.id_event = localStorage.getItem("eventId")    
        this.getActivities()   
        this.getProbes(this.idActivity)     
        //alert(this.idActivity)
    },
    methods:{                
        getProbes(idActivity){
            axios.get(`probe-questions-activity/${idActivity}`).then(res=>{
                this.probes = res.data.data.map(item=>{
                    const temp = item.questions.map(item2=>{
                        return {
                        ...item2,
                        }
                        answer:""
                    })
                    item.questions = temp
                    return {...item, display: false}
                })
            })            
        },
        ifShowProbes(index){
            if(this.probes[index].answers.length > 0){
            const user_id = localStorage.getItem('_current_user_id')
            for(let i=0; i<this.probes[index].answers.length; i++){
                if(this.probes[index].answers[i].user_id == user_id)
                {
                    return false;
                    break;
                }
            }
            }
            return true
        },
        functionShowProbe(id){
            if(this.probes[id].display)
            this.probes[id].display = false
            else
            this.probes[id].display = true
        },
        async getActivities(){
            const response = await axios.get(`getIdsActivitiesByEvent/${this.id_event}`);
            this.activities = response.data
            for(let i = 0; i<this.activities.length; i++){
                this.getProbes(this.activities[i]);
            }
        },        
        async probesAnswersFunction(index){
            const user_id = localStorage.getItem('_current_user_id')
            
            if(!this.validateSurveyAnswers(this.probes[index].questions)){
            this.$swal({icon:'error', text:this.$t('pages.Events.StreamingEvent.missingFieldsToFill')})
            return
            }
            let cont = 0;
            this.probes[index].questions.map(async item=>{
            const forSend = {
                question_id: item.id,
                user_id,
                probe_id: item.probe_id,
                value:item.answer
            }
            let res
            if(item.answer !== '')
                res = await axios.post(`probe-answers`,forSend)
                if(res)
                cont ++
            if(cont === this.probes[index].questions.length)
            {
                this.getProbes(this.activityId)
                this.$swal(this.$t('pages.Events.StreamingEvent.answersSent'))}
            })            
        },
        validateSurveyAnswers(data){        
            let activeMessageError = false
            data.map(item=>{
            if(item.required === 1 && item.answer === ""){
                activeMessageError = true
            }
            })

            if(activeMessageError){
            return false
            }
            else 
            return true
        },
    }
}
</script>