<!-- validar si esta vista se usa si no borrarla */-->
<template>
    <div>
        <modal name="modal"
         width="80%"
         height="auto"
         :adaptive="true"
         :resizable="true" 
         :scrollable="true"
         @closed="onCloseModal">
         <div class="container ">
            <div slot="top-right">
                <button style="margin-left: 97%; border: none; border-radius: 10px; margin-top:7px" @click="$modal.hide('modal')">
                    ❌
                </button>
            </div>
            <div class="container position-relative pt-2 customc-modal">
                <div class="row">
                    <div class="col-12">
                        <h6 class="">
                            Diseño de landing page-event
                        </h6>
                    </div>
                    <div class="col-4 mt-2">
                        <label >Logo</label><span class="copys">250x250</span>
                        <div class="custom-file">
                            <input type="file" name="home_img_logo" @change="onFileChange" class="custom-file-input" id="home_img_logo" accept="image/*">
                            <label class="custom-file-label" for="home_img_logo">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-4 mt-2">
                        <label >Banner</label><span class="copys">512x382</span>
                        <div class="custom-file">
                            <input type="file" name="home_img_banner" @change="onFileChange" class="custom-file-input" id="home_img_banner" accept="image/*">
                            <label class="custom-file-label" for="home_img_banner">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-4 mt-2">
                        <label >Background</label><!--<span class="copys">512x382</span>-->
                        <div class="custom-file">
                            <input type="file" name="home_img_background" @change="onFileChange" class="custom-file-input" id="home_img_background" accept="image/*">
                            <label class="custom-file-label" for="home_img_background">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_titles_font">Fuente de los titulos</label>
                        <select class="custom-select d-block w-100" id="home_titles_font" v-model="form.home_titles_font">
                            <option value="">Seleccionar...</option>
                            <option v-for="font in fonts" :key="font.id" :value="font.id">{{font.name}}</option>
                        </select>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_text_font">Fuente de textos generales</label>
                        <select class="custom-select d-block w-100" id="home_text_font" v-model="form.home_text_font">
                            <option value="">Seleccionar...</option>
                            <option v-for="font in fonts" :key="font.id" :value="font.id">{{font.name}}</option>
                        </select>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_color_background"> Background</label>
                        <input type="color"  class="form-control border-input" name="home_color_background" id="home_color_background" placeholder="" v-model="form.home_color_background">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_titles_color"> Titulos</label>
                        <input type="color"  class="form-control border-input" name="home_titles_color" id="home_titles_color" placeholder="" v-model="form.home_titles_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_text_color"> Texto Parrafo</label>
                        <input type="color"  class="form-control border-input" name="home_text_color" id="home_text_color" placeholder="" v-model="form.home_text_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_btn_color"> Botones</label>
                        <input type="color"  class="form-control border-input" name="home_btn_color" id="home_btn_color" placeholder="" v-model="form.home_btn_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_btn_color_hover"> Mouse sobre Botones</label>
                        <input type="color"  class="form-control border-input" name="home_btn_color_hover" id="home_btn_color_hover" placeholder="" v-model="form.home_btn_color_hover">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_btn_text_color"> Texto de Botones</label>
                        <input type="color"  class="form-control border-input" name="home_btn_text_color" id="home_btn_text_color" placeholder="" v-model="form.home_btn_text_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_btn_text_color_hover">Mouse Sobre Texto Botones</label>
                        <input type="color"  class="form-control border-input" name="section_btn_text_color_hover" id="section_btn_text_color_hover" placeholder="" v-model="form.home_btn_text_color_hover">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_footer_color"> Pie de Pagina</label>
                        <input type="color"  class="form-control border-input" name="home_footer_color" id="home_footer_color" placeholder="" v-model="form.home_footer_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_div_first_color">Contenedores 1</label>
                        <input type="color"  class="form-control border-input" name="home_div_first_color" id="home_div_first_color" placeholder="" v-model="form.home_div_first_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_div_second_color">Contenedores 2</label>
                        <input type="color"  class="form-control border-input" name="home_div_second_color" id="home_div_second_color" placeholder="" v-model="form.home_div_second_color">
                    </div>
                    <!--Preview landing-->
                    <div class="col-12 mt-2 preview-conf"  :style="{'backgroundImage': 'url('+urlfiles('home_img_background')+')',background: form.home_color_background}">
                        <div class="row p-3">
                            <div class="col-4">
                                <h3 :style="{color:form.home_titles_color}">Preview landing</h3>
                                <p :style="{color:form.home_text_color}">Lorem Ipsum is simply dummy
                                    text of the printing and typesetting industry.</p>
                                <button type="button" class="btn btn-dark m-0 border-0 custom-btn" 
                                    :style="{background:form.home_btn_color, color: form.home_btn_text_color,
                                        '--color-hover': form.home_btn_color_hover,
                                        '--text-hover': form.home_btn_text_color_hover}">Button</button>
                            </div>
                            <div class="col-8  custom_container" :style="{background:form.home_div_first_color}">
                                <h3 :style="{color:form.home_titles_color}">Texto preview</h3>
                                <p :style="{color:form.home_text_color}">Lorem Ipsum is simply dummy
                                    text of the printing and typesetting industry.
                                     Lorem Ipsum has been the industry's standard dummy
                                      text ever since the 1500s, when an unknown printer
                                          </p>
                            </div>
                        </div>
                        <div class="row custom-footer" :style="{background:form.home_footer_color}" >
                            <div class="col-12">
                                <center>Pie de pagina   </center>
                            </div>
                        </div>
                    </div>
                    <!--FIN Preview landing-->
                </div>
                <div class="row buttons-action">
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="updateDesignEvent()">Guardar</button>
                        <hr class="border">
                    </div>
                </div>
                <div class="row mt-4 ">
                    <div class="col-12">
                        <h6 class="">
                            Diseño paginas internas
                        </h6>
                    </div>
                    <div class="col-3 mt-2">
                        <label >Background</label><!--<span class="copys">512x382</span>-->
                        <div class="custom-file">
                            <input type="file" name="section_img_background" @change="onFileChange" class="custom-file-input" id="section_img_background" accept="image/*">
                            <label class="custom-file-label" for="section_img_background">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-3 mt-2">
                        <label >Banner formulario de registro</label><!--<span class="copys">512x382</span>-->
                        <div class="custom-file">
                            <input type="file" name="section_banner_register" @change="onFileChange" class="custom-file-input" id="section_banner_register" accept="image/*">
                            <label class="custom-file-label" for="section_banner_register">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_titles_font">Fuente de los titulos</label>
                        <select class="custom-select d-block w-100" id="home_titles_font" v-model="form.section_titles_font">
                            <option value="">Seleccionar...</option>
                            <option v-for="font in fonts" :key="font.id" :value="font.id">{{font.name}}</option>
                        </select>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="home_text_font">Fuente de textos generales</label>
                        <select class="custom-select d-block w-100" id="home_text_font" v-model="form.section_text_font">
                            <option value="">Seleccionar...</option>
                            <option v-for="font in fonts" :key="font.id" :value="font.id">{{font.name}}</option>
                        </select>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_color_background"> Background</label>
                        <input type="color"  class="form-control border-input" name="section_color_background" id="section_color_background" placeholder="" v-model="form.section_color_background">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_titles_color"> Titulos</label>
                        <input type="color"  class="form-control border-input" name="section_titles_color" id="section_titles_color" placeholder="" v-model="form.section_titles_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_text_color"> Texto Parrafo</label>
                        <input type="color"  class="form-control border-input" name="section_text_color" id="section_text_color" placeholder="" v-model="form.section_text_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_btn_color"> Botones</label>
                        <input type="color"  class="form-control border-input" name="section_btn_color" id="section_btn_color" placeholder="" v-model="form.section_btn_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_btn_color_hover"> Mouse sobre Botones</label>
                        <input type="color"  class="form-control border-input" name="section_btn_color_hover" id="section_btn_color_hover" placeholder="" v-model="form.section_btn_color_hover">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_btn_text_color"> Texto de Botones</label>
                        <input type="color"  class="form-control border-input" name="section_btn_text_color" id="section_btn_text_color" placeholder="" v-model="form.section_btn_text_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_btn_text_color_hover"> Mouse Sobre Texto Botones</label>
                        <input type="color"  class="form-control border-input" name="section_btn_text_color_hover" id="section_btn_text_color_hover" placeholder="" v-model="form.section_btn_text_color_hover">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_footer_color"> Pie de Pagina</label>
                        <input type="color"  class="form-control border-input" name="section_footer_color" id="section_footer_color" placeholder="" v-model="form.section_footer_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_div_first_color">Contenedores 1</label>
                        <input type="color"  class="form-control border-input" name="section_div_first_color" id="section_div_first_color" placeholder="" v-model="form.section_div_first_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="section_div_second_color">Contenedores 2</label>
                        <input type="color"  class="form-control border-input" name="section_div_second_color" id="section_div_second_color" placeholder="" v-model="form.section_div_second_color">
                    </div> 
                </div>
                <!--Preview section-->
                    <div class="col-12 mt-2 preview-conf " :style="{'backgroundImage': 'url('+urlfiles('section_img_background','section')+')',background: form.section_color_background}">
                        <div class="row p-3">
                            <div class="col-4">
                                <h3 :style="{color:form.section_titles_color}">Preview section</h3>
                                <p :style="{color:form.section_text_color}">Lorem Ipsum is simply dummy
                                    text of the printing and typesetting industry.</p>
                                <button type="button" class="btn btn-dark m-0 border-0 custom-btn" 
                                    :style="{background:form.section_btn_color, color: form.section_btn_text_color,
                                        '--color-hover': form.section_btn_color_hover,
                                        '--text-hover': form.section_btn_text_color_hover}">Button</button>
                            </div>
                            <div class="col-8  custom_container" :style="{background:form.section_div_first_color}">
                                <h3 :style="{color:form.section_titles_color}">Texto preview</h3>
                                <p :style="{color:form.section_text_color}">Lorem Ipsum is simply dummy
                                    text of the printing and typesetting industry.
                                     Lorem Ipsum has been the industry's standard dummy
                                      text ever since the 1500s, when an unknown printer
                                          </p>
                            </div>
                        </div>
                        <div class="row custom-footer" :style="{background:form.section_footer_color}" >
                            <div class="col-12">
                                <center>Pie de pagina   </center>
                            </div>
                        </div>
                    </div>
                    <!--FIN Preview section-->
                <div class="row mt-4 ">
                    <div class="col-12">
                        <h6 class="">
                            Diseño plantila correo 
                        </h6>
                    </div>
                    <div class="col-3 mt-2">
                        <label >Logo</label><!--<span class="copys">512x382</span>-->
                        <div class="custom-file">
                            <input type="file" name="email_img_logo" @change="onFileChange" class="custom-file-input" id="email_img_logo" accept="image/*">
                            <label class="custom-file-label" for="email_img_logo">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-3 mt-2">
                        <label >Banner</label><!--<span class="copys">512x382</span>-->
                        <div class="custom-file">
                            <input type="file" name="email_img_banner" @change="onFileChange" class="custom-file-input" id="email_img_banner" accept="image/*">
                            <label class="custom-file-label" for="email_img_banner">Seleccionar</label>
                        </div>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_titles_font">Fuente de los titulos</label>
                        <select class="custom-select d-block w-100" id="email_titles_font" v-model="form.email_titles_font">
                            <option value="">Seleccionar...</option>
                            <option v-for="font in fonts" :key="font.id" :value="font.id">{{font.name}}</option>
                        </select>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_text_font">Fuente de textos generales</label>
                        <select class="custom-select d-block w-100" id="email_text_font" v-model="form.email_text_font">
                            <option value="">Seleccionar...</option>
                            <option v-for="font in fonts" :key="font.id" :value="font.id">{{font.name}}</option>
                        </select>
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_color_background"> Background</label>
                        <input type="color"  class="form-control border-input" name="email_color_background" id="email_color_background" placeholder="" v-model="form.email_color_background">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_titles_color"> Titulos</label>
                        <input type="color"  class="form-control border-input" name="email_titles_color" id="email_titles_color" placeholder="" v-model="form.email_titles_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_text_color"> Texto Parrafo</label>
                        <input type="color"  class="form-control border-input" name="email_text_color" id="email_text_color" placeholder="" v-model="form.email_text_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_btn_color"> Botones</label>
                        <input type="color"  class="form-control border-input" name="email_btn_color" id="email_btn_color" placeholder="" v-model="form.email_btn_color">
                    </div>
                    <div class="col-3 mt-2">
                        <label for="email_btn_text_color"> Texto de Botones</label>
                        <input type="color"  class="form-control border-input" name="email_btn_text_color" id="email_btn_text_color" placeholder="" v-model="form.email_btn_text_color">
                    </div>
                </div>
                <!--Preview section-->
                    
                    <div class="col-6 mt-2 preview-conf-email" :style="{background: form.email_color_background}">
                        
                        <div class="row">

                            <img class="logo-email" :src="urlfiles('email_img_logo','email')">
                            <div class="paddingzero">
                                <img class="banner-email" :src="urlfiles('email_img_banner','email')">
                            </div>
                            
                            
                            <div class="col-12 mt-3">
                                <h3 :style="{color:form.email_titles_color}">{{this.event.name}}</h3>
                                <p :style="{color:form.email_text_color}">{{this.event.message_email}}</p>
                                <button type="button" class="btn border-0" 
                                    :style="{background:form.email_btn_color, color: form.email_btn_text_color}">Ir al sitio del evento</button>
                            </div>
                        </div>
                    </div>
                    <!--FIN Preview section-->
                <div class="row buttons-action">
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="updateDesignEvent()">Guardar</button>
                    </div>
                </div>
                <div class="row mt-4">  
                    <div class="col-12">
                        <h6 class="">
                            Banners web app 
                        </h6>
                    </div>                          
                    <div class="col-md-6 col-12">
                        <label for="firstName">Banner 1</label>
                        <div class="custom-file">
                            <input type="file" style="width:300px;" id="webAppBanner1" @change="bannerOne"/>
                            <label style="width:300px;" class="custom-file-label" id="webAppBanner1Label" for="webAppBanner1">Seleccionar</label>
                        </div>
                        <div class="hasError">
                            <!-- Valid first pic is required. -->
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <label for="firstName">Banner 2</label>
                        <div class="custom-file">
                            <input type="file" style="width:300px;" id="webAppBanner2" @change="bannerTwo"/>
                            <label style="width:300px;" class="custom-file-label" id="webAppBanner2Label" for="webAppBanner2">Seleccionar</label>
                        </div>
                        <div class="hasError" >
                            <!-- Valid first pic is required. -->
                        </div>
                    </div>   
                    <div class="row buttons-action">
                        <div class="col-12">
                            <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="updateDesignWA()">Guardar</button>
                            <hr class="border">
                        </div>
                    </div>
                </div>
                <div class="row mt-4 ">
                    <div class="col-12">
                        <h6 class="">
                            Redes Sociales
                        </h6>
                    </div>
                    <div class="col-4 mt-2">
                        <label for="link_facebook">Facebook</label><!--<span class="copys">512x382</span>-->
                        <input name="link_facebook" class="form-control" id="link_facebook" v-model="form.link_facebook"/>
                        <div class="hasError" v-if="!$v.form.link_facebook.maxLength">
                            Maximo 500 caracteres.
                        </div>
                    </div>
                    <div class="col-4 mt-2">
                        <label for="link_instagram">Instagram</label><!--<span class="copys">512x382</span>-->
                        <input name="link_instagram" class="form-control" id="link_instagram" v-model="form.link_instagram"/>
                        <div class="hasError" v-if="!$v.form.link_instagram.maxLength">
                            Maximo 500 caracteres.
                        </div>
                    </div>
                    <div class="col-4 mt-2">
                        <label for="link_twitter">Twitter</label><!--<span class="copys">512x382</span>-->
                        <input name="link_twitter" class="form-control" id="link_twitter" v-model="form.link_twitter"/>
                        <div class="hasError" v-if="!$v.form.link_twitter.maxLength">
                            Maximo 500 caracteres.
                        </div>
                    </div>
                </div>
                <div class="row buttons-action">
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-primary btn-sm mx-1" @click="updateDesignEvent()">Guardar</button>
                    </div>
                </div>
            </div>
         </div>
        </modal>
    </div>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators"
export default {
    name:"design",
    props:['showModal','eventID'],
    watch: {
        showModal:function(newVal){
         if(newVal) {
             this.getDesignEvent()
             this.getFonts()
             this.getEvent()
             this.$modal.show('modal')
         }
         else this.$modal.hide('modal')
      },
    },

    data() {
        return {
            event:[],
            urlApi: "eventStyle",
            action: "update",
            fonts:[],
            form:{
                home_img_background:'',
                home_img_banner:'',
                home_img_logo:'',
                home_color_background:'',
                home_titles_color:'',
                home_text_color:'',
                home_titles_font:'',
                home_text_font:'',
                home_btn_color:'',
                home_btn_color_hover:'',
                home_btn_text_color:'',
                home_btn_text_color_hover:'',
                home_footer_color:'',
                home_div_first_color:'',
                home_div_second_color:'',
                section_img_background:'',
                section_color_background:'',
                section_titles_color:'',
                section_text_color:'',
                section_titles_font:'',
                section_text_font:'',
                section_btn_color:'',
                section_btn_color_hover:'',
                section_btn_text_color:'',
                section_btn_text_color_hover:'',
                section_footer_color:'',
                section_div_first_color:'',
                section_div_second_color:'',
                link_facebook:'',
                link_instagram:'', 
                link_twitter:'',
                section_banner_register:'',
                email_img_logo:'',
                email_img_banner:'',
                email_titles_font:'',
                email_color_background:'',
                email_btn_color:'',
                email_btn_text_color:'',
                email_text_color:'',
                email_titles_color:'',
                email_text_font:'',
            },
            wa_banner_one:'',
            wa_banner_two:'',
        }
    },
    validations(){
        const val = {
            form:{
                link_facebook:{maxLength: maxLength(499)},
                link_instagram:{maxLength: maxLength(499)}, 
                link_twitter:{maxLength: maxLength(499)},
            }
        }
        return val
    },
    methods: {
        bannerOne(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.wa_banner_one = files[0];
            let label = document.getElementById("webAppBanner1Label");
            label.innerText = files[0].name;
        },
        bannerTwo(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.wa_banner_two = files[0];
            let label = document.getElementById("webAppBanner2Label");
            label.innerText = files[0].name;
        },
        updateDesignWA(){
            let data = new FormData
            data.append('bannerOne',this.wa_banner_one)
            data.append('bannerTwo',this.wa_banner_two)
            data.append('id',this.eventID)
            axios.post('addBanners',data)
                .then(result =>{
                    this.$swal('Banners cargados!')                    
                })  .catch(e=>{
                this.$swal({icon:'error',text:e})
            })            
        },
        getFonts(){
            axios.get('fonts?pagination=false').then(res=>{
                //console.log(res.data)
                this.fonts = res.data
            })
        },
        urlfiles(data, tipo = 'landing'){
            console.log("comp: ", typeof this.form[data])
            console.log("compDos: ", data)
            
            if(!this.form[data])
                return ''
            if(typeof this.form[data] === "string"){
                //console.log("URL: ",`${process.env.VUE_APP_API_URL}storage/${this.form[data]}`) 
                return `${process.env.VUE_APP_API_URL_FILES}${this.form[data]}`}
            if(typeof this.form[data] === "object")
                return `${process.env.VUE_APP_API_URL_FILES}${this.form[data]}`
        },
        resetForm(){
            this.form = {
                home_img_background:'',
                home_img_banner:'',
                home_img_logo:'',
                home_color_background:'',
                home_titles_color:'',
                home_text_color:'',
                home_titles_font:'',
                home_text_font:'',
                home_btn_color:'',
                home_btn_color_hover:'',
                home_btn_text_color:'',
                home_btn_text_color_hover:'',
                home_footer_color:'',
                home_div_first_color:'',
                home_div_second_color:'',
                section_img_background:'',
                section_color_background:'',
                section_titles_color:'',
                section_text_color:'',
                section_titles_font:'',
                section_text_font:'',
                section_btn_color:'',
                section_btn_color_hover:'',
                section_btn_text_color:'',
                section_btn_text_color_hover:'',
                section_footer_color:'',
                section_div_first_color:'',
                section_div_second_color:'',
                link_facebook:'',
                link_instagram:'', 
                link_twitter:'', 
                section_banner_register:'',
                email_img_logo:'',
                email_img_banner:'',
                email_titles_font:'',
                email_color_background:'',
                email_btn_color:'',
                email_btn_text_color:'',
                email_text_color:'',
                email_titles_color:'',
                email_text_font:'',
            }

            let labels = document.getElementsByClassName('custom-file-label');
            for(let i=0; i<labels.length; i++){
                if(labels[i].htmlFor === e.target.id)
                    labels[i].innerText = files[0].name
            }
        },
        onCloseModal(e){
            this.resetForm()
            this.$emit("close-modal")
        },
        onFileChange(e){
            let files = e.target.files || e.dataTransfer.files
            let idFile = e.target.id
            //console.log(files[0])
            this.form[idFile] = files[0]
            let labels = document.getElementsByClassName('custom-file-label');
            for(let i=0; i<labels.length; i++){
                if(labels[i].htmlFor === e.target.id)
                    labels[i].innerText = files[0].name
            }
        },
        updateTextLabels(dato, key){
            let labels = document.getElementsByClassName('custom-file-label');
            for(let i=0; i<labels.length; i++){
                if(labels[i].htmlFor === key)
                    labels[i].innerText = dato
            }
        },
        getEvent(){
            axios.get(`events/${this.eventID}`).then(response=>{
                this.event = response.data[0]
            })
        },
        getDesignEvent(){
            axios.get(`${this.urlApi}/${this.eventID}`).then(res=>{
                if(res.data.id){
                    let temp = {}
                    for ( var key in res.data){
                        if(key.includes('pic') || key.includes('img') || key.includes('banner_register')){
                            this.updateTextLabels(res.data[key], key)
                        }
                        

                        if(typeof res.data[key] === 'object' && res.data[key] !== null){
                            temp[key]=res.data[key].id
                        } else if(key.includes('font')){
                            temp[key]= res.data[key] ? res.data[key] : ''
                        } else
                            temp[key]=res.data[key]
                        }
                        this.form = temp
                }   else    {
                    this.action = "create"
                }
            }).catch(error=>{
                this.$swal({icon:'error',text:error})
            })
        },
        updateDesignEvent(){
            this.$v.form.$touch()
            if(this.$v.form.$error) return

            let final_form = new FormData()

            for ( var key in this.form) {
                final_form.append(key, this.form[key] ? this.form[key] : '');
            }

            final_form.append('event_id', this.eventID);
            let url 
            if(this.action === "update"){
                url = `${this.urlApi}/${this.form.id}`,
                final_form.append('_method', 'PUT')}
            else
                url = this.urlApi

            axios.post(url,final_form)
                .then(result =>{
                    this.$swal('Actualizacion correcta')
                    this.form.id = result.data.data.id
                    this.action = "update"
                    this.$v.form.$reset()
                })  .catch(e=>{
                this.$swal({icon:'error',text:e})
            })
        }
    },
}
</script>
<style scope>
    .paddingzero{
        padding-left: 0%;
        padding-right: 0%;
    }
    .text-email{
        margin-top: 3%;
        text-align: center;
        text-justify: distribute;
    }
    .logo-email{
        margin-top: 3%;
        width: 15%;
        height: 15%;
        margin-left: 45%;  
    }
    .banner-email{
        width: 100%;
        margin-top: 3%;
    }
    .preview-conf-email{
        min-height: 400px;
        background: #ccc;
        border-radius: 15px;
        border:solid 1px#ccc;
        overflow: hidden;
        text-align: center;
    }
    .preview-conf{
        min-height: 200px;
        background: #ccc;
        border-radius: 15px;
        border:solid 1px#ccc;
        overflow: hidden;
    }
    .custom_container{
        margin-top: 25px;
        height: 150px;
        background: rgb(230, 229, 229);
    }
    .customc-modal{
        max-height: 70vh;
        overflow-y: scroll !important;
    }
    .custom-footer{
        min-height: 25px;
    }
    .buttons-action{
        
    }
    
    .custom-btn:hover{
        background: var(--color-hover) !important;
        color: var(--text-hover) !important;
    }
    .custom-file-label{
        overflow: hidden !important;
    }
</style>
