<template>
  <aside class="calendar-sidebar">
    <!--<div class="scroll-sidebar">
      <img src="@/assets/scroll-icon.png" alt />
    </div>-->
    <h1 class="title-sidebar">
      <button @click="toggleModal" class="add-button">
        Añadir tarea
        <span>+</span>
      </button>
    </h1>
    <div class="card-sidebar"> 
      <vue-cal hide-view-selector 
        :time="false" 
        active-view="month" 
        xsmall
        @cell-focus="changeDate"
        :events=events>
      </vue-cal>
    </div>
  </aside>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "calendar",
  components: { VueCal },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7],
      showBtnCreate:false,
    };
  },
  props:{
    
    events:{
      type:Array,
      required:true,
    }
  },
  watch:{
    
    events: function (newVal) {
      this.events = newVal
    }
  },
  methods:{
    toggleModal(){
      this.$bus.$emit('showModalCalendar')
    },
    changeDate(event){
      this.$bus.$emit('changeDate', event)
    }
  }
};
</script>

<style lang="scss">
aside.calendar-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  padding: 20px;
  padding-top: 65px;
  width: 350px;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: white;
  font-family: 'Montserrat', sans-serif;
  & .scroll-sidebar {
    position: fixed;
    background: rgba(219, 219, 219, 0);
    background: -moz-linear-gradient(
      top,
      rgba(219, 219, 219, 0) 0%,
      rgba(226, 226, 226, 0.95) 54%,
      rgba(232, 232, 232, 0.95) 100%
    );
    background: -webkit-gradient(
      left top,
      left bottom,
      color-stop(0%, rgba(219, 219, 219, 0)),
      color-stop(54%, rgba(226, 226, 226, 0.95)),
      color-stop(100%, rgba(232, 232, 232, 0.95))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(219, 219, 219, 0) 0%,
      rgba(226, 226, 226, 0.95) 54%,
      rgba(232, 232, 232, 0.95) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(219, 219, 219, 0) 0%,
      rgba(226, 226, 226, 0.95) 54%,
      rgba(232, 232, 232, 0.95) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(219, 219, 219, 0) 0%,
      rgba(226, 226, 226, 0.95) 54%,
      rgba(232, 232, 232, 0.95) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(219, 219, 219, 0) 0%,
      rgba(226, 226, 226, 0.95) 54%,
      rgba(232, 232, 232, 0.95) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dbdbdb', endColorstr='#e8e8e8', GradientType=0 );
    width: 350px;
    height: 150px;
    bottom: 0;
    right: 0;
    & img {
      position: absolute;
      left: 50%;
      display: block;
      bottom: 30px;
      width: 40px;
      height: 40px;
      transform: translate(-20px, 0%);
    }
  }
  .title-sidebar {
    display: flex;
    padding: 50px 0px;
    align-items: center;
    justify-content: flex-end;
    color: #052369;
    & .add-button {
      background: #052369;
      border: none;
      padding: 10px 17px;
      border-radius: 20px;
      color: white;
      font-size: 1.1em;
      cursor: pointer;
      & span {
        padding: 0 10px;
        font-weight: bolder;
        color: #00fffd;
      }
    }
    & i {
      font-size: 2.2em;
      margin-right: 20px;
      color: #00fffd;
    }
  }
  .card-sidebar {
    background: white;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 20px;
  }

  //Calendar mini
  .vuecal {
    -webkit-box-shadow: 0 0 0 1px inset rgba(0,0,0,.08);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.0);
}
.vuecal__title-bar{
    background: transparent;
}
  .vuecal__cell-date {
    padding: 10px;
  }

  .vuecal__cell:before {
    border: none;
  }
}
aside.calendar-sidebar::-webkit-scrollbar {
  display: none;
}

</style>