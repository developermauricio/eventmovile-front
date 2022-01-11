<template>
  <div class="wrapper event" style="background-color:#614BA4;">

  <!-- content main -->
  <main class="content-main pt-5">
    <div class="content-header">
        <span class="subtitle"> Sondeo /</span>
        <h3 class="title-main">
          {{event.name}}
        </h3>
        
        
    </div>
    
    
    <div class="row mt-02 survey-result py-lg-1">
      <div class="offset-11 col-1">
        <div class="dropdown">
          <a :style="" href="javascript:history.go(-1)" class="btn custom-btn btn-outline-primary btn-sm mx-1">
            <span class="ti-arrow-left"></span>
          </a>
        </div>
      </div>
      <!-- item -->
      <div class="survey-result__box mt-0" :class="{  'col-md-7':isProbe && !fullScreenFirst10, 'd-none': isProbe && fullScreenFirst10, 'col-md-12':!isProbe || fullScreenSondeo  }">

        <div class="bg-white rounded survey-result__content">
          <div style="position:absolute; top:-20px; right:30px" v-if="isProbe">
            <button @click="classInProbeDivs('answers')" class="btn btn-outline-success">
              <span class="ti-fullscreen"></span>
            </button>
          </div>
          <div class="survey-result__header flex align-content-between">

            <div class="row">
              <div class="col-md-10">
                 <h4 class="survey-result__title">
                  {{viewAnswer.description}}
                </h4>
              </div>
              <div class="col-md-2">
                 <div class="survey-result__poll" style="color:rgb(97, 75, 164)">
                  <span class="label">Total</span>
                  <div class="number">{{viewAnswer.total}}</div>
                </div>
              </div>
            </div>

          </div>


        <template  v-if="viewAnswer.type_question === 'Menu desplegable' || viewAnswer.type_question === 'Selección'">
          <!-- bar -->
          <div class="survey-result__info flex" v-for="item in answersData" :key="item.id">

            <div class="">
              {{item.item}}
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
          <!-- bar -->


        </template>
        <template  v-if="viewAnswer.type_question !== 'Menu desplegable' && viewAnswer.type_question !== 'Selección'">
          <!-- bar -->
          <div class="survey-result__info flex">
            <div class="table-responsive">
              <table class="table">
                <thead class=" text-primary">
                  <tr>
                    <th> Respuesta </th>
                    <th class="text-right"> Hora </th> 
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
        </div>

      </div>
       <!-- item -->
      <div v-if="isProbe" class="survey-result__box mt-0" :class="{  'col-md-5':isProbe && !fullScreenFirst10, 'col-md-12':isProbe && fullScreenFirst10, 'd-none':isProbe && fullScreenSondeo }">

        <div class="bg-white rounded survey-result__content">
          <div style="position:absolute; top:-20px; right:30px" v-if="isProbe">
            <button @click="classInProbeDivs('first')" class="btn btn-outline-success">
              <span class="ti-fullscreen"></span>
            </button>
          </div>
          <div class="survey-result__header flex align-content-between">

            <div class="row">
              <div class="col-md-12 mb-3">
                 <h4 class="survey-result__title">
                  10 Primeros en contestar
                </h4>
              </div>
              
            </div>

          </div>

        <template >
          <!-- bar -->
          <div class="survey-result__info flex">
            <div class="table-responsive">
              <table class="table">
                <thead class=" text-primary">
                  <tr>
                    <th> Nombre </th>
                    <th class="text-right"> Hora </th> 
                  </tr>
                </thead>
                <tbody> 
                  <tr v-for="item in firstTen" :key="item.id"> 
                    <td> {{item.users.name}} {{item.users.lastname}} </td>
                    <td class="text-right"> {{setTime(item.created_at, true)}} </td> 
                  </tr>
                </tbody>
              </table>
            </div>


          </div>
          <!-- bar -->


        </template>
        </div>

      </div>



    </div>

    <div class="row flex justify-content-between px-4 custom-div">

      <button @click="subtractToQuestionIndex"  type="button" class="btn survey-result__back" :disabled="questionIndex < 1">
        Volver
      </button>

      <button type="button" class="btn survey-result__next" :disabled="this.questionIndex+1 >= this.listQuestions.length" @click="addToQuestionIndex()">
          Siguiente
      </button>

    </div>
  </main>
  <!-- content main -->

  </div>


</template>

<script>

export default {
    name: 'PollEvent',
    props:['idToSearch','whereSearch','eventId'],
    data(){
      return{
        event:{},
        listQuestions:[],
        questionIndex:0,
        viewAnswer:{ 
          total : 0
        },
        answersData:[],
        poll:{
          res1 : 20,
          res2 : 50,
          res3 : 30,
        },
        rawAnswer: [],
        fullScreenSondeo: false,
        fullScreenFirst10:false,
      }
    },
    computed: {
      isProbe:function(test){
        return this.whereSearch === 'probe' ? true : false
      },
      firstTen:function(){
        let tmp = []
        for(let i = 0; i < this.rawAnswer.length && i < 10 ; i++){
          tmp[i] = this.rawAnswer[i]
        }
        return tmp
      }
    
    },
    created() {
      
      if(this.whereSearch === 'poll'){
        this.getListQuestions('pollQuestionsEvent-wh', this.idToSearch)
      }
      if(this.whereSearch === 'probe'){
        this.getListQuestions('probe-questions-probe-wh', this.idToSearch)
      }

      this.getEvent()
      
      const self = this;
      setInterval(function(){
        if(self.whereSearch === 'poll'){
          self.getAndswersData('poll-answers-question', self.viewAnswer.id)
        }
        if(self.whereSearch === 'probe'){
          self.getAndswersData('probe-answers-question', self.viewAnswer.id)
        }
      },30000)
    },
    methods: {
      classInProbeDivs(data){
        console.log("Here", this.fullScreenSondeo)
        if(data === "answers"){
          this.fullScreenSondeo = !this.fullScreenSondeo
        }
        if(data === "first"){
          this.fullScreenFirst10 = !this.fullScreenFirst10
        }
      },
      getEvent(){
        axios.get(`showEvent/${this.eventId}`).then(response=>{
          this.event = response.data[0]
        })
      },
      setTime(time, s = false){
        if(!s)
          return this.$moment(time).format('MM-DD hh:mm')
        else
          return this.$moment(time).format('MM-DD hh:mm:ss')
      },
      percentage(voto){
        if(this.viewAnswer.total === 0)
         return 0
        return (voto*100/this.viewAnswer.total).toFixed(0)
      },
      addToQuestionIndex(){
        //console.log("Click")
        if(this.questionIndex+1 < this.listQuestions.length)
          this.questionIndex++
        this.answersData = []
        this.changeView(this.questionIndex)
        if(this.whereSearch === 'poll'){
          this.getAndswersData('poll-answers-question', this.viewAnswer.id)
        }
        if(this.whereSearch === 'probe'){
          this.getAndswersData('probe-answers-question', this.viewAnswer.id)
        }

      },
      subtractToQuestionIndex(){
        //console.log("Click")
        if(this.questionIndex>0)
        this.questionIndex--
        this.answersData = []
        this.changeView(this.questionIndex)
        if(this.whereSearch === 'poll'){
          this.getAndswersData('poll-answers-question', this.viewAnswer.id)
        }
        if(this.whereSearch === 'probe'){
          this.getAndswersData('probe-answers-question', this.viewAnswer.id)
        }
      },
      getListQuestions( url, id,){
        axios.get(`${url}/${id}?pagination=false`).then(res=>{
          this.listQuestions = res.data
          if(this.listQuestions.length > 0)
            this.changeView(0, true)
        })
      },
      getAndswersData(url, id){
        axios.get(`${url}/${id}?pagination=false`).then(res=>{
          this.rawAnswer = res.data
          if(this.viewAnswer.type_question === "Menu desplegable" || this.viewAnswer.type_question === "Selección"){
            const options = JSON.parse(this.viewAnswer.options)
            let total = 0
            this.answersData = options.map(item=>{
              let count = 0
              if(Array.isArray(res.data)){
                res.data.map(res=>{
                  if(res.value === item)
                    count++
                  
                  total = total + count
                })}
              


              return {
                item,
                count
              }
            })
            
            this.viewAnswer.total = res.data.length
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
      changeView(index, init = false){
        this.viewAnswer = {
          ...this.listQuestions[index],
          total: this.viewAnswer.total
        }
        if(init){
          if(this.whereSearch === 'poll'){
            this.getAndswersData('poll-answers-question', this.viewAnswer.id)
          }
          if(this.whereSearch === 'probe'){
            this.getAndswersData('probe-answers-question', this.viewAnswer.id)
          }
        }
      }
    },
};


</script>

<style scoped>
.custom-div{
  z-index: 1000;
  position: relative;
}
</style>
