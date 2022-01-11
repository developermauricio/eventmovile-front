<template>
  <div>
    <div class="jumbotron text-center" style="margin-bottom: 0">
      <h1>web App Event movil</h1>
      <p>Este sitio esta en fase de desarrollo!!</p>
    </div>

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <a class="navbar-brand" href="#">Opciones</a>      
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link"> {{$t('pages.Events.LandingEvent.schedule')}}</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Transmision</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Q&A</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'Sondeos' }">
                <b class="nav-link">Sondeo</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Recursos</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link"> </b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Networking</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Encuesta/Survey</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Certificado</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Feria comercial</b>
            </router-link>
            <router-link class="nav-item" :to="{name:'EventSchedule' }">
                <b class="nav-link">Mapa</b>
            </router-link>                     
            <router-link class="nav-item" :to="{name:'Album' }">
                <b class="nav-link">Album</b>
            </router-link>                                 
            <router-link class="nav-item" :to="{name:'notificacionesWA' }">
                <b class="nav-link">Notificaciones</b>
            </router-link>    
        </ul>
      </div>
    </nav>

    <div class="container" style="margin-top: 30px">
      <div class="row">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){

    }
}
</script>