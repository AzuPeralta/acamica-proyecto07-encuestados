/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  // this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregadaEvent = new Evento(this);
  this.preguntaEliminadaEvent = new Evento(this);
  this.preguntaEditadaEvent = new Evento(this);
  this.eliminarTodoEvent = new Evento(this);
  this.guardarEvent = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
   let ultimoId = -1;
    for (let i = 0; i < this.preguntas.length; i++) {
        if (this.preguntas[i].id > ultimoId) {
            ultimoId = this.preguntas[i].id;
        }
    }
    return ultimoId;
  },
  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregadaEvent.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    let preguntasParaGuardar = JSON.stringify(this.preguntas);
    localStorage.setItem('preguntas', preguntasParaGuardar);
  },

  borrarPregunta: function(id){
    this.preguntas.splice(id, 1);
    this.guardar();
    this.preguntaEliminadaEvent.notificar();
},
 editarPregunta: function(){

},
  eliminarTodo: function(){
    this.preguntas = [];
    this.eliminarTodoEvent.notificar();
    this.guardar();
  },
  // getPreguntas: function(){
  //   if(this.preguntas = []){
  //     console.log('habia preguntas');
  //     this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
  //   }
  //   else{
  //     console.log('estaba vacio');
  //     // this.preguntas = [];
  //   }
  //   return this.preguntas;
  // }
}