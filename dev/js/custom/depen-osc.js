require(['rotas','jquery-ui'], function (React) {

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

  jQuery(document).ready(function($) {
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
  });

  var rotas = new Rotas();
  var modulo = 'depen-osc';

  $.ajax({
    url: rotas.ModuloBySlug(modulo),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
    },
    success: function(data){
      if (data.length > 0){

        var modulo_html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
        modulo_html += '<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+data[0].modulos.tx_descricao_modulo+'</div>';
        modulo_html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>' +
            '<table class="table">\n' +
            '  <thead>\n' +
            '    <tr>\n' +
            '      <th scope="col">#</th>\n' +
            '      <th scope="col">First</th>\n' +
            '      <th scope="col">Last</th>\n' +
            '      <th scope="col">Handle</th>\n' +
            '    </tr>\n' +
            '  </thead>\n' +
            '  <tbody>\n' +
            '    <tr>\n' +
            '      <th scope="row">1</th>\n' +
            '      <td>Mark</td>\n' +
            '      <td>Otto</td>\n' +
            '      <td>@mdo</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">2</th>\n' +
            '      <td>Jacob</td>\n' +
            '      <td>Thornton</td>\n' +
            '      <td>@fat</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">3</th>\n' +
            '      <td>Larry</td>\n' +
            '      <td>the Bird</td>\n' +
            '      <td>@twitter</td>\n' +
            '    </tr>\n' +
            '  </tbody>\n' +
            '</table>';

        if(data[0].itens.length > 0){
          for (var i in data[0].itens) {
            modulo_html += '<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+data[0].itens[i].tx_titulo_itens+'</h3>';
            modulo_html += '<div class="text-justify txtBloco">'+data[0].itens[i].tx_descricao_itens+'</div>';
            modulo_html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';
          }
        }
        $('#depen-osc').prepend(modulo_html);
      }
      else{
        $('.manutencao').css('display', 'block');
      }
      $('.loading').addClass('hide');
    }
  });

});
