<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">

            </paper-table>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Evento", "Tipo", "Fecha", "Valor"];
const tableData = [
  {
    id: 1,
    evento: "Expo Arte",
    tipo: "Abierto",
    fecha: "20/08/2020",
    valor: "$0",
  },
  {
    id: 2,
    evento: "Inversión en tiempos de Covid 19",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$80.000",
  },
  {
    id: 3,
    evento: "Yoga para el Alma",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$45.000",
  },{
    id: 1,
    evento: "Expo Arte",
    tipo: "Abierto",
    fecha: "20/08/2020",
    valor: "$0",
  },
  {
    id: 2,
    evento: "Inversión en tiempos de Covid 19",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$80.000",
  },
  {
    id: 3,
    evento: "Yoga para el Alma",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$45.000",
  },
  {
    id: 1,
    evento: "Expo Arte",
    tipo: "Abierto",
    fecha: "20/08/2020",
    valor: "$0",
  },
  {
    id: 2,
    evento: "Inversión en tiempos de Covid 19",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$80.000",
  },
  {
    id: 3,
    evento: "Yoga para el Alma",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$45.000",
  },
  {
    id: 1,
    evento: "Expo Arte",
    tipo: "Abierto",
    fecha: "20/08/2020",
    valor: "$0",
  },
  {
    id: 2,
    evento: "Inversión en tiempos de Covid 19",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$80.000",
  },
  {
    id: 3,
    evento: "Yoga para el Alma",
    tipo: "Privado",
    fecha: "20/08/2020",
    valor: "$45.000",
  }
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "Eventos",
        subTitle: "Listado de eventos",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Table on Plain Background",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  }
};
</script>
<style>
</style>
