<template>
    <div class="rate mb-3 mt-0">
        <input type="radio" id="star5" value="5" v-model="input" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" value="4" v-model="input" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" value="3" v-model="input" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" value="2" v-model="input" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" value="1" v-model="input" />
        <label for="star1" title="text">1 star</label>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input:''
        }
    },
    watch: {
        input:function(newVal){
            this.$emit('input', newVal)
        }
    },
}
</script>
<style scoped>
  .rate {
    float: left;
    height: 46px;
    padding: 0 10px;
  }
  .rate:not(:checked) > input {
      position:absolute;
      top:-9999px;
  }
  .rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
  }
  .rate:not(:checked) > label:before {
    content: '★ ';
  }
  .rate > input:checked ~ label {
    color: #ffc700;    
  }
  .rate:not(:checked) > label:hover,
  .rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
  }
  .rate > input:checked + label:hover,
  .rate > input:checked + label:hover ~ label,
  .rate > input:checked ~ label:hover,
  .rate > input:checked ~ label:hover ~ label,
  .rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
  }
</style>