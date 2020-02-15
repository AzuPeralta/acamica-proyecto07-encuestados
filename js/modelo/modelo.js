/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.borrarTodo = new Evento(this);

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
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },

  borrarPregunta: function(id){
    this.preguntas.splice(id, 1);
    this.guardar();
    this.preguntaEliminada.notificar();
},
 editarPregunta: function(){

},
  borrarTodo: function(){
    console.log('el circuito funciona');
    this.preguntas.splice(0);
    this.guardar();
    borrarTodo.notificar();
  },
}
