/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);
  },

  //Cuando apreto el boton en la vistaAdministrador me salta un error en la consola que dice que esta no es una función!
  //Le agregué el console.log solo para ver que llegara hasta esta instancia, pero no puedo llegar al modelo.
  borrarTodo: function(){
    console.log('llegue al controlador.');
    this.modelo.borrarTodo();
  },
};


