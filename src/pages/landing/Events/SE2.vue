<template>
  <card class="card" :title="'Evento / '+event.name">

    <!-- Video -->
    <div class="row content-streaming">



      <div class="col-md-9">

        <div class="row header">
          <div class="col-md-10">
          <h4 class="title">
            {{activityActive.name}}
          </h4>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn-rec">
              <span class="ti-control-record"></span>
              En vivo </button>
          </div>
        </div>

          <div class="responsive-video" v-html="activityActive.code_streaming" >
          </div>



      </div>

      <div class="col-md-3">

         <!-- Document library -->
        <div class="col-md-12 library">
          <h4 class="subtitle">
            <span class="ti-archive"></span>
            Documento para descargar</h4>
          <ul class="list-group list-document">
            <li v-for="doc in documents" :key="doc.id"  class="list-group-item">
              <a target="_blank" :href="uri+'storage/'+doc.url">
                <span class="ti-bookmark"></span>
                {{doc.name}}
              </a>
            </li>
          </ul>
        </div>
        <!-- Document library -->

        <!-- Chat -->
        <!-- <div class="col-md-12">
          <h4 class="subtitle">
            <span class="ti-comments"></span>
            Chat del evento</h4>
            <div class="box-message">

                <div class="message">
                  <span class="message-autor">Rodrigo Mirando</span>
                  <span class="message-hour">02:35 pm</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet molestias optio cum vitae doloribus velit, dignissimos sequi ducimus excepturi ut quos veniam quas. Obcaecati officiis architecto nesciunt tenetur alias quam!
                  </p>
                </div>

                <div class="message">
                  <span class="message-autor">Maria fuentes</span>
                  <span class="message-hour">02:32 pm</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet molestias optio cum vitae doloribus velit..
                  </p>
                </div>

                <div class="message">
                  <span class="message-autor">Armando Garcia</span>
                  <span class="message-hour">02:30 pm</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet molestias optio cum vitae doloribus velit, dignissimos sequi ducimus excepturi ut quos veniam quas. Obcaecati officiis architecto nesciunt tenetur alias quam!
                  </p>
                </div>


            </div>
            <div class="message-question">
              <input type="text" class="form-control" id="firstName" placeholder="Ingresa tu pregunta" value="" required="">
            </div>

        </div> -->

        <div class="col-md-12">
          <button
              @click="$modal.show('encuesta-modal')"
              type="button"
              class="btn btn-outline-primary btn-block">llenar Encuesta</button>
        </div>
        <!-- Chat -->


      </div>
    </div>
    <!-- Video -->

  <div class="row">

    <div class="timeline">

      <div class="timeline__header">
        <h3 class="subtitle text-center">
          <span class="ti-timer"></span>
          Linea de tiempo de todo el evento
        </h3>
      </div>

      <div class="box">
            <ul id="first-list">
                <li v-for="act in activities" :key="act.id" @click.prevent="changeActivity(act)">
                  <span></span>
                  <div class="title">{{act.name}}</div>
                  <div class="info">{{act.sort_description}}</div>
                  <div class="name">-{{event.name}}-</div>
                  <div class="time">
                      <span>{{$moment(act.start_date).format('HH:MM a')}}</span>
                      <span>{{$moment(act.end_date).format('HH:MM a')}}</span>
                  </div>
                </li>
            </ul>
        </div>

    </div>



  </div>



  <!-- Encuesta -->
    <modal name="encuesta-modal"

         :width="800"
         :height="720"
         :adaptive="true">
        <div class="container">
            <div class="row">

            <div class="col-12 question-header">
              <h4 class="question-title">Encuesta - Actividad</h4>
              <p>Te invitamos a contestar esta pequeña encuesta</p>
            </div>

            <div class="col-md-12 question-box">
                 <h4 class="question-title2">1. Como calificas la presentación del Speaker</h4>
                  <div class="question-content">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="" name="question1">
                      <label class="form-check-label" for="defaultCheck1">
                        Excelente
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="" name="question1">
                      <label class="form-check-label" for="defaultCheck2">
                        Regular
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="" name="question1">
                      <label class="form-check-label" for="defaultCheck2">
                        Mala
                      </label>
                    </div>
                  </div>
            </div>

            <div class="col-md-12 question-box">
                 <h4 class="question-title2">2. Que te gustaría ver en nuestro proximos eventos?</h4>
                  <div class="question-content">
                      <input class="form-control" type="text" placeholder="Escriba aqui su repuesta" name="question1">

                  </div>
            </div>

            <div class="col-md-12 question-box">
                 <h4 class="question-title2">3. Recomendarías esta actividad?</h4>
                  <div class="question-content">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="" name="recomendar">
                      <label class="form-check-label" for="defaultCheck1">
                        Si
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="" name="recomendar">
                      <label class="form-check-label" for="defaultCheck2">
                        No
                      </label>
                    </div>
                  </div>
            </div>

            <div class="col-md-7">
            </div>
            <div class="col-md-2">
              <button
                @click="$modal.show('encuesta-modal')"
                type="button"
                class="btn btn-outline-primary">Omitir</button>
            </div>
            <div class="col-md-3">
              <button
                @click="$modal.show('encuesta-modal')"
                type="button"
                class="btn btn-outline-primary">Enviar Encuesta</button>
            </div>

            </div>
        </div>
    </modal>
  <!-- Encuesta -->

</card>





</template>
<script>

export default {
    name: 'StreamingEvent',
    props:['eventId'],
    data(){
      return{
        invitations:[],
        activities:[],
        event:[],
        activityActive:[],
        documents:[],
        questions:[],
        uri: process.env.VUE_APP_API_URL,
      }
    },
    mounted(){
      if(this.eventId){
        this.getActivities()
        this.getEvent()
        this.getInvitations()
        //this.verifyPoll()
      }      
    },
    methods: {
      // verifyPoll(){
      //   axios.get()
      // },
      changeActivity(activity){
        let hasPermission = false
        hasPermission = this.invitations.map(item=>{
          if(item.id == activity.id){
            return true
          }
        })
        if(hasPermission[0] == true) {
          this.activityActive = activity
          this.getDocuments()
        }
        else this.$swal({icon:'info', text:'No tienes acceso a esta actividad, pero la puedes adquirir.'})
      },
      getInvitations(){
        axios.get(`activitiesInvitation/${this.eventId}`).then(response=>{
          this.invitations = response.data.data
          this.activityActive = this.invitations[0]
          this.getDocuments()
        })
      },
      getActivities(){
        axios.get(`activities-event/${this.eventId}`).then(response =>{
          this.activities = response.data.data
        })
      },
      getEvent(){
        axios.get(`events/${this.eventId}`).then(response=>{
          this.event = response.data[0]
        })
      },
      getDocuments(){
        axios.get(`modelDocuements/activity/${this.activityActive.id}`).then(response=>{
          this.documents = response.data.data
        })
      },  
      getQuestions () {
        axios.get(`pollQuestionsEvent/${this.eventId}`).then(response=>{
          this.questions = response.data.data
          this.$modal.show('encuesta-modal');
        })
          
      },
      hide () {
          this.$modal.hide('encuesta-modal');
      }
    },
    mount () {
        this.show()
    }
};


</script>
<style>
.question-header{
  padding: 1rem 2rem !important;
}
.question-title{
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color:   #8e04cc;
  font-weight: bold;
}
.question-title2{
  font-size: 1rem;
  margin: 0 0 1rem;
}
.question-box{
  padding: 1rem 2rem;
  background: #ebebeb;
  max-width: 90% !important;
  margin: 1rem auto;
  border-radius: 15px;
}
.content-streaming{
  position: relative;
}

.responsive-video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 60px; overflow: hidden;
}

.responsive-video iframe,
.responsive-video object,
.responsive-video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.title{
  font-weight: bold;
  color:  #8e04cc;
  text-transform: uppercase;
  margin: 1rem 0;
}
.subtitle{
  color:  #8e04cc;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 1rem 0;
}
.ti-control-record{
  font-size: 1rem;
}
.btn-rec{
  background: red;
  border-color: red;
  border-style:none;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 5px;
  line-height: 1rem;
  position: absolute;
  right: 20px;
}
.box-message{
  height: 192px;
  overflow-y: scroll;
  margin-bottom: 2  rem;
}
.message{
  background: #F5F5F5;
  padding: 0.5rem;
  font-size: 0.8rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  position: relative;
  color: #575757;
}
.message p{
  font-size: 0.8rem;
}
.message-autor{
  color:  #8e04cc;
  display: block;
  font-size: 0.8rem;
  font-weight: 300;
  margin-bottom: 0.3rem;
}
.message-hour{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.7rem;
  color: #8d8d8d
}
.message-question{
  margin-top: 1rem;
}

.list-document{
  height: 160px;
  overflow-y: scroll;
}
.list-document li{
  cursor: pointer;
}
.list-document li:hover{
  text-decoration: underline;
}

.library .list-group-item{
  font-size: 13px !important;
}

/* timeline */

.timeline{
  padding: 1rem;
}

.box{
    margin:0 10%;
    padding: 0 0 40px 60px
}

.box ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;
    transition: all 0.5s linear;
    top:0
}

.box ul:last-of-type{top:80px}

.box ul:before{
    content: "";
    display: block;
    width: 0;
    height: 100%;
    border:1px dashed #fff;
    position: absolute;
    top:0;
    left:30px
}

.box ul li{
    margin: 20px 60px 60px;
    position: relative;
    padding: 10px 20px;
    background: rgb(235, 235, 235);
    color: #686565;
    border-radius: 10px;
    line-height: 20px;
    width: 90%;
}


.box ul li > span{
    content: "";
    display: block;
    width: 0;
    height: 100%;
    border:1px solid #c5c5c5;
    position: absolute;
    top:0;
    left:-30px
}

.box ul li > span:before,.box ul li > span:after{
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background:#ff6d6d;
    border:2px solid #fff;
    position: absolute;
    left:-7.5px
}

.box ul li > span:before{top:-10px}
.box ul li > span:after{top:95%}

.box .title{
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 5px;
    font-size: 14px;
}

.box .info:first-letter{text-transform: capitalize;line-height: 1.7}

.box .name{
    margin-top: 10px;
    text-transform: capitalize;
    font-style: italic;
    text-align: right;
    margin-right: 20px
}


.box .time span{
    position: absolute;
    left: -100px;
    color:#ab00ab;
    font-size:80%;
    font-weight: bold;
}
.box .time span:first-child{top:-16px}
.box .time span:last-child{top:94%}


.arrow{
    position: absolute;
    top: 105%;
    left: 22%;
    cursor: pointer;
  height:20px;
  width:20px
}

.arrow:hover{
    -webkit-animation: arrow 1s linear infinite;
       -moz-animation: arrow 1s linear infinite;
         -o-animation: arrow 1s linear infinite;
            animation: arrow 1s linear infinite;
}

.box ul:last-of-type .arrow{
    position: absolute;
    top: 105%;
    left: 22%;
    transform: rotateX(180deg);
    cursor: pointer;
}

svg{
    width: 20px;
    height: 20px
}

@keyframes arrow{
    0%,100%{
        top:105%
    }
    50%{
        top:106%
    }
}

@-webkit-keyframes arrow{
    0%,100%{
        top:105%
    }
    50%{
        top:106%
    }
}

@-moz-keyframes arrow{
    0%,100%{
        top:105%
    }
    50%{
        top:106%
    }
}

@-o-keyframes arrow{
    0%,100%{
        top:105%
    }
    50%{
        top:106%
    }
}

/* timeline */
</style>
