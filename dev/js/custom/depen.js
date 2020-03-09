require(["jquery-ui","rotas"], function (React) {

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

  var rotas = new Rotas();
  var modulo = "depen";

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

        var menu_html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
        var html = '<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+data[0].modulos.tx_descricao_modulo+'</div></div></div><br>';

        if(data[0].itens.length > 0){
          var menu = 0;
          menu_html += '<ul class="nav nav-pills">';
          for (var i in data[0].itens) {
            menu = parseInt(i)+1;



            if(data[0].itens[i].tx_titulo_itens == 'Final'){
              var end_html = '<div class="row"><div class="col-md-12">';
              end_html += '<div class="text-justify">'+data[0].itens[i].tx_descricao_itens+'</div>';
              end_html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';

            }else if(data[0].itens[i].tx_titulo_itens == 'Descrição das bases de dados'){
              var pop_html = '<a id="item_'+menu+'" name="item_'+menu+'" href="#descricao_bases_dados" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="descricao_bases_dados" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Saiba mais sobre as descrições das bases de dados</a>';
              pop_html += '<div class="collapse" id="descricao_bases_dados">';
              pop_html += '<div class="row">';
              pop_html += '<div class="col-md-4"><h4 class="subTitulo">'+data[0].itens[i].tx_titulo_itens+'</h4>';
              pop_html += '<div class="text-justify">'+data[0].itens[i].tx_descricao_itens+'</div>';
            }else{


              html += '<div id="item_'+menu+'" name="item_'+menu+'"><div class="col-md-4">';
              //html += '<a href="/cadastro-representante.html" class="box-list-description-a">';

              if(i==='0'){
                html += '<a href="/depen-osc.html" class="box-list-description-a">';
                html += '<div class="box-list-description"><i class="fa fa-file-text fa-5x">&nbsp;</i>';
              }else if(i==='1'){
                html += '<a href="/resultado-consulta.html" class="box-list-description-a">';
                html += '<div class="box-list-description"><i class="fa fa-search fa-5x">&nbsp;</i>';
              }else{
                html += '<a href="/cadastro-representante.html" class="box-list-description-a">';
                html += '<div class="box-list-description"><i class="fa fa-user fa-5x">&nbsp;</i>';
              }

              //html += '<div class="box-list-description">'+icon;
              html += '<h2>'+data[0].itens[i].tx_titulo_itens+'</h2><div class="box-list-clear"></div></div>';
              html += '<div class="text-justify"></br>'+data[0].itens[i].tx_descricao_itens+'</div>';
              html += '</a></div>';
              /*html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';*/
            }
          }



          menu_html += '</ul>';
        }

        $('#depen').append(menu_html);
        $('#depen').append(html);
        $('#depen').append(pop_html);
        $('#depen').append(end_html);
      }
      else{
        $('.manutencao').css('display', 'block');
      }

      $('.loading').addClass('hide');

      $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
      });

    }
  });

});
