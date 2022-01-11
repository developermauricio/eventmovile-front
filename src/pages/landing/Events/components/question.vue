<template>
    <div class="row mt-0">
        <div class="col-md-12 mb-2 poll-item " >
        <h6 class="poll-ask">
            {{data.description}} <b v-if="data.required == 1">*</b>
        </h6>
        <div class="poll-answer" v-if="data.type_question_id == 3">
            <div class="form-check" v-for="item in thisOptions" :key="item.id">
            <input class="form-check-input" type="radio" :name="'exampleRadios'+data.id+'_'+item.id" :value="item" v-model="dataInput">
            <label class="form-check-label" :for="'exampleRadios'+data.id+'_'+item.id">
                {{item}}
            </label>
            </div>
        </div>
        <div class="poll-answer" v-if="data.type_question_id == 1">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="dataInput"></textarea>
        </div>
        
        <div class="poll-answer" v-if="data.type_question_id == 2">
            <input class="form-control" type="number" name="Number" id="number" v-model="dataInput">
        </div>
        
        </div>
    </div>
</template>
<script>
export default {
    name:"survey-question",
    props:['data'],
    data() {
        return {
            dataInput:""
        }
    },
    computed: {
     thisOptions: function (){
         if(this.data.type_question_id  == 3)
        return  JSON.parse(this.data.options);
     }
    },
    watch: {
        dataInput:function(newVal){
            this.$emit('input',newVal)
        }
    },
    methods: {
        
    },
}
</script>