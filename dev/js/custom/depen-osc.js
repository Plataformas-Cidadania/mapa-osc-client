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
    //url: rotas.ModuloBySlug(modulo),
    url: 'json/lista-osc-com-links.json',
    type: 'GET',
    dataType: 'json',

    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.manutencao').css('display', 'block');
        $('.loading').addClass('hide');
    },
    success: function(data){
      if (data.length > 0){

        var menu_html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">Cadastro Nacional de Participação Social na Execução Penal</h1><hr></div></div>';

        var modulo_html = '<table class="table table-striped"><thead><tr><th scope="col">Nome</th><th scope="col">CNPJ</th><th scope="col">Detalhar</th></tr></thead><tbody>';

        if(data.length > 0){
          for (var i in data) {
            modulo_html += '<tr><th scope="row">'+data[i].cnpj+'</th>';
            modulo_html += '<td>'+data[i].nome+'</td>';
            modulo_html += '<td><a href="'+data[i].link+'" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> Detalhar</a></td></tr>';
          }
        }

        modulo_html += '</tbody></table>';


        $('#depen-osc').append(menu_html);
        $('#depen-osc').append(modulo_html);
      }
      else{
        $('.manutencao').css('display', 'block');
      }
      $('.loading').addClass('hide');
    }
  });

});
