

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;



var app = new Vue({  
    el: '#app',  
    data: {    
        fechas:[],
        fecha_formateada:"",
        days: ["SUN","MON","TUE","WED","THUR","FRI","SAT"],
        months:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
        listaPartidos: [],
        mensajes: [],
        newMensaje:"",
        section: "GC",
        match:{},
        isOpen: false,
        isButtonDisabled: "",
        selector:0,
        identificador:"",
        idSeleccionado:""
    },
    created(){
        navigator.standalone = navigator.standalone || (screen.height-document.documentElement.clientHeight<40)
        this.getData();/* llamo game_schedule.json de partidos y guardo en this.fechas */


    },
    mounted(){
        let lista=document.querySelectorAll(".row.boton")
        lista.forEach(element => {
            this.listaPartidos.push(element.id)
        });
    },
    computed:{
        seccion(){
            if (this.section=='GC'||this.section=='GI') {
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        sidemenu(){
            if (this.isOpen==false) {
                this.isOpen=true;
            } else if(this.isOpen==true){
                this.isOpen=false;
            }
        },
        getModel ($event) {
          this.isButtonDisabled=$event.target.value.trim()
          return this.isButtonDisabled
        },
        activa(opcion){
            var pagina=this.section
            if (opcion==pagina) {
                return "active"
            } else{
                return ""
            } 
        },
        changeURL(idSeleccionado) { /* cambio de pagina al pulsar alguno de los partidos */
            this.idSeleccionado=idSeleccionado
            this.selector=this.listaPartidos.indexOf(idSeleccionado)
            this.section = "GI"
        },
        goToInfo(page){
            this.section = page;
        },
        getAdress(campo){
            this.match.direccion=play_fields[campo].street
            return this.match.direccion
        },
        getMap(campo){
            this.match.mapa=play_fields[campo].iframe
            return this.match.mapa
        },
        getFecha(fecha_mostrar){
            let date= new Date(fecha_mostrar.split("-"));
            this.match.fecha_partido=this.days[date.getDay()] + " " +"<span class='color_text'>" +"-"+this.months[date.getMonth()] +" "+fecha_mostrar.substr(-2, 2)+"-"+"</span>" +" "+ date.getFullYear()
            return this.match.fecha_partido
        },
        modFechas(fechas){/* recorro cada partido para incluir */
            fechas.forEach(fecha => {
                let games=fecha.partidos
                games.forEach(game => {
                    game.id=fecha.fecha+"-"+game.partido
                });
            });
            return fechas
        },
        getData() {  /* llamo a modFechas para incluir id's de cada partido en el .json */
            this.fechas= this.modFechas(data.fechas);
        }
        // removeWarning(){
        //   var firestore = firebase.firestore();
        //   var settings = {timestampsInSnapshots: true};
        //   firestore.settings(settings);
        // },
        
    }
});


 




