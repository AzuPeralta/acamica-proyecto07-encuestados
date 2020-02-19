/*
 * Vista administrador
 */
const VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  let contexto = this;

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
    let contexto = this;
    let nuevoItem = $(`<li class= "list-group-item" id="${pregunta.id}"> ${pregunta.textoPregunta} </li>`);

    //completar
    let interiorItem = $('.d-flex');
    let titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    let lista = this.elementos.lista;
    lista.html('');
    let preguntas = this.modelo.getPreguntas();
    for (let i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    let e = this.elementos;
    let contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      let value = e.pregunta.val();
      let respuestas = [];

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
