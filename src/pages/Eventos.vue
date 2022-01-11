<template>

    <div class="wrapper">

       <!-- Plans -->
      <div class="row plans-container" v-bind:class="{ hidden: true }">
        <div class="col-md-12 text-center my-4">
          <h3 class="title">No cuentas con este servicio</h3>
          <p class="subtitle2">Te invitamos a adquirir uno de nustros planes</p>
        </div>

        <div class="col-md-12">
          <div class="row">


          <div class="col-md-9 m-auto">
            <div class="row">


          <div class="col-md-4">
            <div class="plan-box">

              <ul class="list-group">
                <li class="list-group-item active">
                    <h5 class="plan-name">Plan Basic</h5>
                    <span class="price">
                      $150.000
                    </span>
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Asistencia a Ruedas de Negocios
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Asistencia a Eventos publicos y privados
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  50 Invitaciones al mes
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Administración de Eventos
                </li>
                <li class="list-group-item">
                  <p-button type="primary" block>Adquirir</p-button></li>
              </ul>
            </div>
          </div>

          <div class="col-md-4">
            <div class="plan-box">

              <ul class="list-group">
                <li class="list-group-item active">
                    <h5 class="plan-name">Plan Standar</h5>
                    <span class="price">
                      $250.000
                    </span>
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Asistencia a Ruedas de Negocios
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Asistencia a Eventos publicos y privados
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  50 Invitaciones al mes
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Administración de Eventos
                </li>
                <li class="list-group-item">
                  <p-button type="primary" block>Adquirir</p-button></li>
              </ul>
            </div>
          </div>

          <div class="col-md-4">
            <div class="plan-box">

              <ul class="list-group">
                <li class="list-group-item active">
                    <h5 class="plan-name">Plan Premium</h5>
                    <span class="price">
                      $500.000
                    </span>
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Asistencia a Ruedas de Negocios
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Asistencia a Eventos publicos y privados
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  50 Invitaciones al mes
                </li>
                <li class="list-group-item">
                  <span class="ti-check-box"></span>
                  Administración de Eventos
                </li>
                <li class="list-group-item">
                  <p-button type="primary" block>Adquirir</p-button></li>
              </ul>
            </div>
          </div>
          </div>
            </div>
        </div>
        </div>

      </div>

    <div class="row" v-bind:class="{ hidden: false }">
      <div class="col-12">
        <div class="box-header">
          <div class="row">
            <div class="col-2">
              <div class="num-title">
               Total Eventos:
              </div>
              <div class="num-count">
              23
              </div>
            </div>
            <div class="col-6">
              <div class="num-title">
               Proximo Evento:
              </div>
              <div class="num-count">
              24:25:12
              </div>
            </div>
            <div class="col-3">
              <router-link :to="{path:'/nuevo-evento'}">
                <p-button type="primary" block>Crear nuevo evento</p-button>
              </router-link>

            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <h3>Listado de Eventos</h3>
      </div>
      <div class="col-md-4">
        <br>
        <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Ver eventos...</option>
              <option>Pendientes</option>
              <option>Cerrados</option>
            </select>
      </div>
      <div class="col-12">

        <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Evento</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha</th>
                  <th scope="col" class="text-right">Opciones</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">
                      1
                  </th>
                  <td>Expo Arte</td>
                  <td>Cerrado</td>
                  <td>20/08/2020 </td>
                  <td class="text-right">

                    <router-link :to="{path:'/evento'}">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      2
                  </th>
                  <td>Inversión en tiempos de Covid</td>
                  <td>Pendiente</td>
                  <td>20/08/2020 </td>
                  <td class="text-right">

                    <router-link :to="{path:'/nuevo-evento'}">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      3
                  </th>
                  <td>Yoga para el Alma</td>
                  <td>Pendiente</td>
                  <td>20/08/2020 </td>
                  <td class="text-right">

                    <router-link :to="{path:'/nuevo-evento'}">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      4
                  </th>
                  <td>Expo Arte</td>
                  <td>Cerrado</td>
                  <td>20/08/2020 </td>
                  <td class="text-right">

                    <router-link :to="{path:'/nuevo-evento'}">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      5
                  </th>
                  <td>Inversión en tiempos de Covid</td>
                  <td>Pendiente</td>
                  <td>20/08/2020 </td>
                  <td class="text-right">

                    <router-link :to="{path:'/nuevo-evento'}">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>

                <tr>
                  <th scope="row">
                      6
                  </th>
                  <td>Yoga para el Alma</td>
                  <td>Pendiente</td>
                  <td>20/08/2020 </td>
                  <td class="text-right">

                    <router-link :to="{path:'/nuevo-evento'}">
                      <button type="button" class="btn btn-outline-primary btn-sm mx-1">
                        <span class="ti-pencil-alt"></span>
                      </button>
                    </router-link>

                    <button type="button" class="btn btn-outline-danger btn-sm mx-1">
                       <span class="ti-trash"></span>
                    </button>

                  </td>
                </tr>


              </tbody>
            </table>



      </div>
    </div>
   </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = [ "Id", "Evento", "Tipo", "Fecha", "Valor" ];
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

.box-header{
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.num-title{
  font-size: 0.8rem;
}
.num-count{
  font-size: 3rem;
  font-weight: bold;
  color:  #8e04cc
}
</style>
