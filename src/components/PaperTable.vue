<template>
  <table class="table" :class="tableClass">
    <thead>
    <slot name="columns">
      <th v-for="column in columns" :key="column">{{column}}</th>
    </slot>
      <th v-if="actions === 'active'">Acciones</th>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
          {{itemValue(item, column)}}
        </td>
        <td class="" v-if="actions === 'active'">
          <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="updateAction(item.id)">
              <span class="ti-pencil-alt"></span>
          </button>
          <button type="button" class="btn btn-outline-danger btn-sm mx-1" @click="deleteAction(item.id)">
              <span class="ti-trash"></span>
          </button>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'paper-table',
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    actions:{
      type: String,
      default: "inactive"
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    updateAction(id){
      console.log("Update id: ", id)
      this.$emit("update",id)
    },
    deleteAction(id){
      console.log("Delete id: ", id)
      this.$emit("delete",id)
    }
  }
};
</script>
<style scoped>
  .btn{
    margin: 0.2rem 0;
  }
</style>
