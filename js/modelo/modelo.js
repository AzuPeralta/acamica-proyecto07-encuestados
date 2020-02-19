/*
 * Modelo
 */
const Modelo = function() {
  // this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregadaEvent = new Evento(this);
  this.preguntaEliminadaEvent = new Evento(this);
  this.preguntaEditadaEvent = new Evento(this);
  this.eliminarTodoEvent = new Evento(this);
  this.guardarEvent = new Evento(this);
};

Modelo.prototype = {
  getPreguntas: function(){
    if( localStorage != null){
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'))
    }
    else{
      this.preguntas = [];
    }
    return this.preguntas;
  },
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
    let id = this.obtenerUltimoId();
    id++;
    let nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
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
  borrarTodo: function(){
    this.preguntas = localStorage.setItem('preguntas', []);
    this.eliminarTodoEvent.notificar();
  },
}