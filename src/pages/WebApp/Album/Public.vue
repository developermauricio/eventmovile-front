<template>
  <div class="container-fluid" style="position: relative; height: 595.812px">   
    <div class="row">
      <div class="col-4">
        <router-link class="nav-item" :to="{name:'MenuWebApp' }">
            <b style="color:red;" class="nav-link">Atras</b>
        </router-link>
        <button @click="inLoadPhoto()">subir foto</button>
      </div>
      <div class="col-8">
        <h1>Album evento</h1>
      </div>
    </div>
    <div v-if="inCreatePhoto" class="row">
      <div class="col-2">
        <div class="form-group">
          <input
            type="file"
            name="path_photo"
            @change="onFileChange"
            class="form-control"            
            accept="image/*"
          />
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            v-model="description"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button class="btn btn-info" @click="loadPhoto()">subir</button>
        <button class="btn btn-danger" @click="inLoadPhoto()">cancelar</button>
      </div>
    </div>    
    <div v-if="inCreatePhoto == false" class="row">
      
      <div v-for="(ph, index) in photos" :key="index" class="card col-12 col-md-3" style="width: 20rem; margin: 20px 0 24px 0">
        <img
          class="card-img-top"
          width="100"
          height="200"
          :src="uriImg+ph.path_photo"
          :alt="ph.description"
          style="width: 100%"
        />
        <div class="card-body">
          <p class="card-text">
            {{ph.description}}
          </p>
          <div class="row">
            <div class="col-3"></div>
            <button onClick="this.disabled=true" @click="interactionGo(ph.id,'happy-face')" class="col-2"><span>{{ph.happyFace.length}}</span> 😊</button>          
            <div class="col-2"></div>
            <button onClick="this.disabled=true" @click="interactionGo(ph.id,'love-face')" class="col-2"><span>{{ph.loveFace.length}}</span>🥰</button>          
            <div class="col-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../../components/Button.vue";
export default {
  components: { Button },
  data() {
    return {
      photos: [],
      id_user: 0,
      id_album: 0,
      description: "",
      path_photo: "",
      privacidad: 1,
      upload_at: "",
      status: 1,
      id_event: 0,
      inCreatePhoto: false,
      uriImg: process.env.VUE_APP_API_URL_FILES,
    };
  },
  mounted() {
    this.id_user = localStorage.getItem("_current_user_id")
    this.id_event = localStorage.getItem("eventId")
    this.getIdAlbum()
    this.getPhotos()
  },
  methods: {
    async getPhotos(){
      const response = await axios.get(`listPhotos/${this.id_event}/0`);
      this.photos = response.data.data;
      console.log(response);
    },
    async uploadPhoto(description, path_photo) {
      let data = new FormData();
      data.append("id_user", this.id_user);
      data.append("id_album", this.id_album);
      data.append("description", description);
      data.append("path_photo", path_photo);
      data.append("privacidad", "public");
      //CARGAR AL ARRAY DE PHOTOS this.photos.push(data)
      axios.post("uploadPhoto", data)
        .then((response) => {
          this.getPhotos()
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });            
    },
    async getIdAlbum() {
      const response = await axios.get(`album/${this.id_event}`)
        .then((response)=>{
          this.id_album = response.data;
          console.log(response);
        }).catch((error)=>{          
          this.$swal({ icon: "error", text: 'Validar habilitación de webApp' });
        });      
    },
    logicCamara() {},
    inLoadPhoto() {
      if (this.inCreatePhoto) this.inCreatePhoto = false;
      else this.inCreatePhoto = true;
    },
    loadPhoto() {
      let description = this.description;
      let path_photo = this.path_photo;      
      this.uploadPhoto(description,path_photo)
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      let idFile = e.target.id;      
      this.path_photo = files[0];
    },
    async interactionGo(id_photo,interaction){      
      switch(interaction){
        case 'happy-face':
          this.addInteractionNow(this.photos,'id',id_photo,'happyFace',interaction)
        break
        case 'love-face':
          this.addInteractionNow(this.photos,'id',id_photo,'loveFace',interaction)
        break
      }              
      let data = new FormData();
      data.append("id_user", this.id_user);
      data.append("id_photo", id_photo);
      data.append('interaction',interaction)

      await axios.post("interaction", data)
        .then((response) => {
          //mensaje bonito
        })
        .catch((error) => {
          this.$swal({ icon: "error", text: error });
        });            
    },
    addInteractionNow(array, prop, value,type,interaction){        
        for(var i = 0; i < array.length; i++){
            var obj = array[i];                        
            for(var key in obj){                                                                            
              if(key == prop){
                if(obj[key]==value){
                  obj[type].push({'description':interaction,'id_user':this.id_user})                  
                }
              }                                  
            }
        }            
    }
  },
};
</script>

<style>
  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
</style>