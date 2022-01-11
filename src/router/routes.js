//begin login/register pages administrator /landing
import Login from "@/pages/Auth/Login/Login.vue";
import LoginBM from "@/pages/Auth/Login/LoginBM.vue";
import Restore from "@/pages/Auth/Login/Restore.vue";
import Register from "@/pages/Auth/Login/Register.vue";
import RegisterBM from "@/pages/Auth/Login/RegisterBM.vue";
import RegisterToken from "@/pages/Auth/Login/RegisterToken.vue";
//end login/register

//*begin administration portal pages
//--/users
import adminUsers from "@/pages/Administration/index.vue";
import adminUsersCreate from "@/pages/Administration/create.vue";
import adminUsersEdit from "@/pages/Administration/edit.vue";
//--/tickets
import Tickets from "@/pages/Administration/Tickets/index.vue";
import CreateTicket from "@/pages/Administration/Tickets/create.vue";
import EditTicket from "@/pages/Administration/Tickets/edit.vue";
//--/halls
import Halls from "@/pages/Administration/Halls/index.vue";
import CreateHall from "@/pages/Administration/Halls/create.vue";
import EditHall from "@/pages/Administration/Halls/edit.vue";
//--/events
import Events from "@/pages/Administration/Events/index.vue";
import CreateEvent from "@/pages/Administration/Events/create.vue";
import EditEvent from "@/pages/Administration/Events/edit.vue";
//--/events--/activity
import CreateActivity from "@/pages/Administration/Events/create-activity.vue";
import EditActivity from "@/pages/Administration/Events/edit-activity.vue";
//--/business market
import BusinessMarket from "@/pages/Administration/BusinessMarket/index.vue";
import CreateBusinessMarket from "@/pages/Administration/BusinessMarket/create.vue";
//--/staff-access
import Staff from "@/pages/Administration/Staff/index.vue";
import StaffCreate from "@/pages/Administration/Staff/create.vue";
//end administration


// GeneralViews
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/landing/UserProfile/UserProfile.vue";
import Notifications from "@/pages/landing/Notifications/Notifications.vue";
import HomeBusinessMarket from "@/pages/landing/HomeBusinessMarket/index.vue";
import CompanyProfile from "@/pages/landing/HomeBusinessMarket/companyProfile.vue";
import StreamingBusinessMarket from "@/pages/landing/HomeBusinessMarket/StreamingBusinessMarket.vue";
import LandingBusinessMarket from "@/pages/landing/HomeBusinessMarket/LandingBusinessMarket.vue";
import DetailBusinessMarket from "@/pages/landing/HomeBusinessMarket/DetailBusinessMarket.vue";
import StreamingEvent from "@/pages/landing/Events/StreamingEvent.vue";
import StreamingEventRedirect from "@/pages/landing/Events/components/redirectStreaming.vue";
import CustomRegisterFormBM from "@/pages/landing/HomeBusinessMarket/CustomRegisterFormBM";
import userProfile from '@/pages/landing/HomeBusinessMarket/userProfile';

//Guest Evento
import RegisterEvent from "@/pages/landing/Events/RegisterEvent.vue";
import RegisterEventToken from "@/pages/landing/Events/RegisterEventToken.vue";
import PaymentEvent from "@/pages/landing/Events/PaymentEvent.vue";
import ModeratorEvent from "@/pages/landing/Events/ModeratorEvent.vue";
import PollEvent from "@/pages/landing/Events/PollEvent.vue";
import LandingEvent from "@/pages/landing/Events/LandingEvent.vue";
import DetailEvent from "@/pages/landing/Events/DetailEvent.vue";
import Evento from "@/pages/Evento.vue";

import Networking from "@/pages/landing/Events/NetworkingZoom.vue";
import externalNetworking from "@/pages/landing/Events/components/externalNetworking";


//webApp
import indexWA  from "@/pages/WebApp/Dashboard/index.vue";
import loginWA from "@/pages/WebApp/Login/index.vue";
import notificacionesWA from "@/pages/WebApp/Notificaciones/index.vue";
import EventSchedule from "@/pages/WebApp/Agenda/event-schedule.vue";
import MenuWebApp  from "@/pages/WebApp/Dashboard/Menu.vue";
import StreamingWA from "@/pages/WebApp/Streaming/index.vue";
import qyaWA from "@/pages/WebApp/QyA/index.vue";
import SondeosWA from "@/pages/WebApp/Sondeo/index.vue";
import RecursosWA from "@/pages/WebApp/Recursos/index.vue";
import NetworkingWA from "@/pages/WebApp/Networking/index.vue";
import SpeakerWA from "@/pages/WebApp/Speaker/index.vue";
import EncuestaWA from "@/pages/WebApp/Survey/index.vue";
import CertificadoWA from "@/pages/WebApp/Certificado/index.vue";
import FeriaWA from "@/pages/WebApp/Feria/index.vue";
import MapaWA from "@/pages/WebApp/Mapa/index.vue";
import AlbumWA from "@/pages/WebApp/Album/index.vue";
import AlbumPublic from "@/pages/WebApp/Album/Public.vue";
import AlbumPrivate from "@/pages/WebApp/Album/Private.vue";
import FeriaAdmin from "@/pages/Administration/feria.vue";
import adminAlbum from "@/pages/Administration/Album/index.vue";


/*
import Feria from "@/pages/WebApp/Album/Private.vue";
import Feria from "@/pages/WebApp/Album/Private.vue";
*/

import Icons from "@/pages/Icons.vue";
//import { FALSE } from "node-sass";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      
      {
        meta:{
          requireAuth:true
        },
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        meta:{
          requireAuth:true
        },
        path: "mi-cuenta",
        name: "Mi Cuenta",
        component: UserProfile
      },
      {
        meta:{
          requireAuth:true
        },
        path: "notifications",
        name: "Mis Notificaciones",
        component: Notifications
      },
      {
        meta:{
          requireAuth:true
        },
        path: "events",
        name: "Mis Eventos",
        component: Events,
      },
      {
        meta:{
          requireAuth:true
        },
        path: "evento",
        name: "Mi Evento",
        component: Evento,
      },
      {
        meta:{
          requireAuth:true
        },
        path: "business-market",
        name: "Mis Rueda de Negocios",
        component: BusinessMarket
      },
      {
        meta:{
          requireAuth:true
        },
        path: "create-event",
        name: "Nuevo Evento",
        component: CreateEvent
      },
      {
        meta:{
          requireAuth:true
        },
        path: "edit-event/:eventId?",
        name: "Editar Evento",
        component: EditEvent,
        props:true
      },
      {
        meta:{
          requireAuth:true
        },
        path: "edit-activity/:propActivity?",
        name: "Editar Actividad",
        component: EditActivity,
        props:true
      },
      {
        meta:{
          requireAuth:true
        },
        path: "create-activity/:eventId?",
        name: "Crear Actividad",
        component: CreateActivity,
        props:true
      },
      {
        meta:{
          requireAuth:true
        },
        path: "create-business-market/:id?",
        name: "Nueva Rueda de Negocio",
        component: CreateBusinessMarket,
        props: true
      },
      {
        meta:{
          requireAuth:true
        },

        path: "icons",
        name: "Icons Template",
        component: Icons
      },
      {
        meta:{
          requireAuth:true
        },
        path: "halls",
        name: "Halls",
        component: Halls
      },
      {
        meta:{
          requireAuth:true
        },
        path: "create-hall",
        name: "Nueva Sala",
        component: CreateHall
      },
      {
        meta:{
          requireAuth:true
        },
        path: "edit-hall",
        name: "Editar Sala",
        component: EditHall,
        props:true
      },
      {
        meta:{
          requireAuth:true
        },
        path: "ticket",
        name: "Tickets",
        component: Tickets
      },
      {
        meta:{
          requireAuth:true
        },
        path: "create-ticket",
        name: "Nuevo Ticket",
        component: CreateTicket
      },
      {
        meta:{
          requireAuth:true
        },
        path: "edit-ticket",
        name: "EditTicket",
        component: EditTicket,
        props:true,
      },
      {
        meta:{
          requireAuth:true
        },
        path: "staff-access",
        name: "Staff Access",
        component: Staff
      },
      {
        meta:{
          requireAuth:true
        },
        path: "staff-access-create",
        name: "Staff Access Create",
        component: StaffCreate
      },
      {
        meta:{
          requireAuth:true
        },
        path: "admin-users",
        name: "Admin Users",
        component: adminUsers
      },
      {
        meta:{
          requireAuth:true
        },
        path: "admin-users-create",
        name: "Admin Users Create",
        component: adminUsersCreate
      },
      {
        meta:{
          requireAuth:true
        },
        path: "admin-users-edit",
        name: "Admin Users Edit",
        component: adminUsersEdit,
        props:true,
      },
    ],
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/login",
    name: "Login",
    component: Login,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/RestorePassword/:token/:action?/:id?",
    name: "RestorePassword",
    component: Restore,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/register-bm/:business_id?",
    name: "RegisterBM",
    component: RegisterBM,
    props:true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/profile-bm/:id?/:modal?",
    name: "userProfileBM",
    component: userProfile,
    props:true
  },
  {
    meta:{
      requireAuth:true
    },
    path: "/RegisterToken",
    name: "RegisterToken",
    component: RegisterToken,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/login-bm/:business_id",
    name: "LoginBM",
    component: LoginBM,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/bm-register/:business_id?",
    name: "BMRegister",
    component: CustomRegisterFormBM,
    props:true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Landing-BusinessMarket",
    name: "LandingBusinessMarket",
    component: LandingBusinessMarket
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/landing-business-market/:business_id?",
    name: "DetailBusinessMarket",
    component: DetailBusinessMarket,
    props: true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Detail-BusinessMarket/:business_id?",
    name: "DetailBusinessMarketBU",
    component: DetailBusinessMarket,
    props: true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/home-business-market/:id?",
    name: "HomeBusinessMarket",
    component: HomeBusinessMarket,
    props: true
  },
  {
    meta:{
      requireAuth:true
    },
    path: "/company-business-market/:id?/:business_id?",
    name: "PerfilBusinessMarket",
    component: CompanyProfile,
    props: true
  },
  {
    meta:{
      requireAuth:true
    },
    path: "/streaming-business-market/:business_id?/:meeting_id?",
    name: "StreamingBusinessMarket",
    component: StreamingBusinessMarket,
    props: true
  },
  {
    meta:{
      requireAuth:true
    },
    path: "/Networking-VideoCall/:networking_id?/:event_id?/:session?/:activityId?",
    name: "Networking",
    component: Networking,
    props: true
  },
  {
    meta:{ 
      requireAuth:false
    },
    path: "/Streaming-Event/:activityId?",
    name: "StreamingEvent",
    component: StreamingEvent,
    props:true,
  },
  {
    meta:{ 
      requireAuth:false
    },
    path: "/Streaming-Event-redirect/:activityId?",
    name: "StreamingEventRedirect",
    component: StreamingEventRedirect,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Landing-Event/:event_id?",
    name: "landingEvent",
    component: LandingEvent,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Detail-Event/:id/:type",
    name: "Detail-Event",
    component: DetailEvent,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Register-Event",
    name: "Register-Event",
    component: RegisterEvent,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Register-Event-Token",
    name: "Register-Event-Token",
    component: RegisterEventToken,
    props:true,
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Payment-Event",
    name: "Payment-Event",
    component: PaymentEvent
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Moderator-Event",
    name: "Moderator-Event",
    component: ModeratorEvent
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Poll-Event/:whereSearch?/:idToSearch?/:eventId?",
    name: "Poll-Event",
    component: PollEvent,
    props:true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/external-networking/:token?",
    name: "externalNetworking",
    component: externalNetworking,
    props:true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/notFound",
    name: "notFoundPage",
    component: NotFound,
    props:false
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Event-schedule/",
    name: "EventSchedule",
    component: EventSchedule,
    props: false
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/Album-public/",
    name: "AlbumPublic",
    component: AlbumPublic,
    props: false
  },  
  {
    meta:{
      requireAuth:false
    },
    path: "/Album-private/",
    name: "AlbumPrivate",
    component: AlbumPrivate,
    props: false
  },  
  {
    meta:{
      requireAuth:false
    },
    path: "/FeriaAdmin/",
    name: "FeriaAdmin",
    component: FeriaAdmin,
    props: true
  },    
  {
    meta:{
      requireAuth:false
    },
    path: "/adminAlbum/",
    name: "adminAlbum",
    component: adminAlbum,
    props: true
  },      
  {
    meta:{
      requireAuth:false
    },
    path: "/Sondeos/",
    name: "SondeosWA",
    component: SondeosWA,
    props: true
  },
  {
    meta:{
      requireAuth:false
    },
    path: "/NetworkingWA/",
    name: "NetworkingWA",
    component: NetworkingWA,
    props: true
  },  
  {
    meta:{
      requireAuth:false
    },
    path: "/SpeakerWA/",
    name: "SpeakerWA",
    component: SpeakerWA,
    props: true
  },    
  {
    meta:{
      requireAuth:false
    },
    path: "/RecursosWA/",
    name: "RecursosWA",
    component: RecursosWA,
    props: true
  },      
  {
    meta:{
      requireAuth:false
    },
    path: "/EncuestaWA/",
    name: "EncuestaWA",
    component: EncuestaWA,
    props: true
  },      
  {
    meta:{
      requireAuth:false
    },
    path: "/CertificadoWA/",
    name: "CertificadoWA",
    component: CertificadoWA,
    props: true
  },        
  {
    meta:{
      requireAuth:false
    },
    path: "/MapaWA/",
    name: "MapaWA",
    component: MapaWA,
    props: true
  },        
  {
    meta:{
      requireAuth:false
    },
    path: "/FeriaWA/",
    name: "FeriaWA",
    component: FeriaWA,
    props: true
  },          
  {
    meta:{
      requireAuth:false
    },
    path: "/Album/",
    name: "AlbumWA",
    component: AlbumWA,
    props: false
  },    
  {
    meta:{
      requireAuth:false
    },
    path: "/StreamingWA",
    name: "StreamingWA",
    component: StreamingWA,
    props: false
  },   
  {
    meta:{
      requireAuth:false
    },
    path: "/qyaWA",
    name: "qyaWA",
    component: qyaWA,
    props: false
  },  
  {
    meta:{
      requireAuth:false
    },
    path: "/notificacionesWA",
    name: "notificacionesWA",
    component: notificacionesWA,
    props: true
  },  
  {
    meta:{
      requireAuth:false
    },
    path: "/Web-app-login",
    name: "loginWA",
    component: loginWA,
    props: false
  },  
  {
    meta:{
      requireAuth:false
    },
    path:"/:webAppPath?",
    name: "indexWA",
    component: indexWA,
    props: true
  }, 
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
