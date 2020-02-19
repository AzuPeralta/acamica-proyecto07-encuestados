/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregadaEvent.suscribir(() => contexto.reconstruirLista());
  this.modelo.preguntaEliminadaEvent.suscribir(()=> contexto.reconstruirLista());
  this.modelo.eliminarTodoEvent.suscribir(() => contexto.reconstruirLista());
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.configuracionDeBotones();
    this.reconstruirLista();

  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $(`<li class= "list-group-item" id="${pregunta.id}"> ${pregunta.textoPregunta} </li>`);
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    // var preguntas = this.modelo.getPreguntas();
    let preguntas = this.modelo.preguntas;
    //var preguntas = this.modelo.getPreguntas(); en esta funcion que esta dentro del modelo tiene que estar la condicional de si hay o no preguntas en el array y que devuelve
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        let respuesta = $(this).val();
        respuestas.push({textoRespuesta: respuesta, cantidad: 0});
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    e.botonBorrarPregunta.click(() => {
      let id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    }),

    e.borrarTodo.click(() => {
      contexto.controlador.borrarTodo();
    })

    //asociar el resto de los botones a eventos
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
