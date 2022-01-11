<template>

      <div class="col-12">
         <h4 class="mb-2">Respuestas de Encuesta</h4>
        <div class="row">
            <div class="col-10 mt-4">
              <h5 class="survey-result__title">
                {{viewAnswer.question}}
              </h5>
            </div>
            <div class="col-2">
                <div class="survey-result__poll" style="color:rgb(97, 75, 164)">
                    <span class="label">Total</span>
                    <div class="number">{{viewAnswer.total}}</div>
                </div>
            </div>
        </div>
        <template>
          <div class="survey-result__info flex" v-for="item in answersData" :key="item.id">

              <div class="">
              {{item.item}} <template v-if="viewAnswer.type=== 'starts'">Estrellas</template>
              </div>
              <div class="survey-result__bar">

              <div class="survey-result__bg">
                  <div class="survey-result__rango" style="background-color:#614BA4" :style="{width:percentage(item.count)+'%'}"></div>
              </div>

              <div class="survey-result__percentage" style="color:#614BA4">

                  <span class="survey-result__total">{{percentage(item.count)}}</span>
                  <span class="survey-result__signo">%</span>
                  <span class="survey-result__total2">
                  {{item.count}} Votos
                  </span>
              </div>

              </div>

          </div>
        </template>

        <div class="row flex justify-content-between px-4 custom-div">

            <button @click="subtractToQuestionIndex"  type="button" class="btn survey-result__back" :disabled="questionIndex < 1">
                Volver
            </button>

            <button type="button" class="btn survey-result__next" :disabled="questionIndex+1 >= questions.length" @click="addToQuestionIndex()">
                Siguiente
            </button>

        </div>

     </div>

</template>
<script>
export default {
    props:{
      business_id:{
        type:String
      } ,
      questions:{
        type:Array,
        default:[]
      }
    },
    
    data() {
        return {
          questionsList:[],
            viewAnswer:{ 
              total : 0
            },
            questionIndex:0,
            answersData:[],
        }
    },
    created() {
      this.changeView(0, true)
      const self = this;
      setInterval(function(){
        self.getAndswersData(self.viewAnswer.id)
      },30000)
    },
    methods: {
        percentage(voto){
            if(this.viewAnswer.total === 0)
            return 0
            return (voto*100/this.viewAnswer.total).toFixed(0)
        },
        getAndswersData(id){
        axios.get(`feedback-report-by-question/${id}?pagination=false`).then(res=>{
          
            let options = JSON.parse(this.viewAnswer.options)
            if(this.viewAnswer.type === "starts"){
              options = ["1","2", "3", "4", "5"] 
            }
            let total = res.data.length
            this.answersData = options.map(item=>{
              let count = 0
              if(Array.isArray(res.data))
                res.data.map(res=>{
                  if(res.value === item)
                    count++
                })
              return {
                item,
                count
              }
            })
            
            this.viewAnswer.total = total
           
          
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
