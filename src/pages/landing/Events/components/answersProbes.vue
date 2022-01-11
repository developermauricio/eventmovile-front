<template>

      <div class="col-12 p-0">
         <!--<h4 class="mb-2">Respuestas de Sondeo</h4>-->
        <div class="row small border-bottom pb-1">
            <div class="col-10 mb-2">
              {{viewAnswer.description}}
              
            </div>
            <div class="col-2 p-0">
                    <span class="label">T:{{viewAnswer.total}}</span>          
            </div>
        </div>
        <template  v-if="viewAnswer.type_question === 'Menu desplegable'">
          <!-- bar -->
          <div class="survey-result__info flex " v-for="item in answersData" :key="item.id">

            <div class="small">
              {{item.item}}
            </div>
            <div class="survey-result__bar">

              <div class="survey-result__bg ">
                <div class="survey-result__rango" style="background-color:#614BA4" :style="{width:percentage(item.count)+'%'}"></div>
              </div>

              <div class="small" style="color:#614BA4">

                <span class="">{{percentage(item.count)}}%</span>
                <!--<span class="survey-result__total2">
                  {{item.count}} Votos
                </span>-->
              </div>

            </div>

          </div>
          <!-- bar -->


        </template>
        <template  v-if="viewAnswer.type_question !== 'Menu desplegable'">
          <!-- bar -->
          <div class="survey-result__info flex">
            <div class="table-responsive small">
              <table class="table">
                <thead class=" text-primary">
                  <tr>
                    <th> {{ $t('pages.Events.components.answersProbes.answer') }}</th>
                    <th class="text-right"> {{ $t('pages.Events.components.answersProbes.hour') }}</th> 
                  </tr>
                </thead>
                <tbody> 
                  <tr v-for="item in answersData" :key="item.id"> 
                    <td> {{item.value}} </td>
                    <td class="text-right"> {{setTime(item.created_at)}} </td> 
                  </tr>
                </tbody>
              </table>
            </div>


          </div>
          <!-- bar -->


        </template>

        <div class="row flex justify-content-between px-0 custom-div">

            <button @click="subtractToQuestionIndex"  type="button" class="btn survey-result__back" :disabled="questionIndex < 1">
                {{ $t('pages.Events.components.answersProbes.return') }}
            </button>

            <button type="button" class="btn survey-result__next" :disabled="questionIndex+1 >= questions.length" @click="addToQuestionIndex()">
                {{ $t('pages.Events.components.answersProbes.next') }}
            </button>

        </div>

     </div>

</template>
<script>
export default {
    props:['probe_id'],
    
    data() {
        return {
          questions:[],
          questionsList:[],
            viewAnswer:{ 
              total : 0
            },
            questionIndex:0,
            answersData:[],
        }
    },
    created() {
      this.getListQuestions(this.probe_id)
      const self = this;
      setInterval(function(){
        self.getAndswersData(self.viewAnswer.id)
      },30000)
    },
    methods: {
      setTime(time){
        return this.$moment(time).format('MM-DD hh:mm')
      },
      percentage(voto){
          if(this.viewAnswer.total === 0)
          return 0
          return (voto*100/this.viewAnswer.total).toFixed(0)
      },
      getListQuestions(id){
        axios.get(`probe-questions-probe-wh/${id}?pagination=false`).then(res=>{
        this.questions = res.data
        if(this.questions.length > 0)
            this.changeView(0, true)
        })
      },
      getAndswersData(id){
        axios.get(`probe-answers-question/${id}?pagination=false`).then(res=>{

          if(this.viewAnswer.type_question === "Menu desplegable"){
            const options = JSON.parse(this.viewAnswer.options)
            let total = 0
            this.answersData = options.map(item=>{
              let count = 0
              if(Array.isArray(res.data))
                res.data.map(res=>{
                  if(res.value === item)
                    count++
                  
                  total = total + count
                })

              return {
                item,
                count
              }
            })
            
            this.viewAnswer.total = total
          } else {
            //console.log("Resultado ", Array.isArray(res.data))
            if(Array.isArray(res.data)){
              this.answersData = res.data
              this.viewAnswer.total = res.data.length
              } else
            {
              this.answersData = []
              this.viewAnswer.total = 0
              }
  
          }      
          
        })
      },
      addToQuestionIndex(){
        //console.log("Click")
        if(this.questionIndex+1 < this.questions.length)
          this.questionIndex++
        this.answersData = []
        this.changeView(this.questionIndex)
        this.getAndswersData(this.viewAnswer.id)

      },
      subtractToQuestionIndex(){
        //console.log("Click")
        if(this.questionIndex>0)
        this.questionIndex--
        this.answersData = []
        this.changeView(this.questionIndex)
        this.getAndswersData(this.viewAnswer.id)
      },
      changeView(index, init = false){
        this.viewAnswer = {
          ...this.questions[index],
          total: this.viewAnswer.total
        }
        if(init){
            this.getAndswersData(this.viewAnswer.id) 
        }
      }

    },
}
</script>
<style scoped>
  .survey-result__percentage {
    font-size: 80% !important;
    font-weight: 400 !important;
  }
  .survey-result__total {
    
  }
</style>
