require(["jquery-ui"], function (React) {

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

});


require(['rotas','jquery-ui','datatables-responsive'], function (React) {

  var rotas = new Rotas();

  function popularDadosAnalise(data){
    var sizeOfData = data.length;
    var columns = 2;
    var newData = new Array(sizeOfData);
    var txtVazioNulo = 'Dado não informado.';
    var src_link = '';
    var link_erro = "this.src='img/noticia_icon.png'";

    for (var i=0; i < sizeOfData; i++){
      newData[i] = new Array(columns);
      newData[i][0] = '<div><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> '+data[i].dt_analise+'<\div>';

      if(data[i].tx_link_img_analise != null && data[i].tx_link_img_analise != ""){
        src_link =  '/cms/imagens/analises/xs-'+data[i].tx_link_img_analise;
      }
      else{
        src_link = 'img/noticia_icon.png';
      }
      newData[i][1] = '<ul class="media-list"><li class="media"><a class="pull-left" href="./analise.html#/'+data[i].cd_analise+'" target="_self"><img class="media-object img-rounded img-analise" src="'+src_link+'"  onerror="'+link_erro+';"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./analise.html#/'+data[i].cd_analise+'" target="_self">'+data[i].tx_titulo_analise+'</a></h4><p>'+data[i].tx_resumo_analise+'</p></div></li></ul>';
    }
    return newData;
  }


  function tabela (div, newData){
    $(div).DataTable({
      responsive: true,
      processing: true,
      deferLoading: 1000,
      deferRender: true,
      searching: false,
      data: newData,
      dom: 'Bfrtip',
      "bSort": true,
      "aaSorting": [[ 0, 'desc' ]],
      columns: [
               {title: "", "width": "80px"},
               {title: ""},
           ]
     });
   }


  $.ajax({
    url: rotas.Analises(),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        tabela('#analise_formato_dados','','');
        $('.loading').addClass('hide');
    },
    success: function(data){
      var txtVazioNulo = 'Dado não informado.';
      if(data !== undefined && data.length != 0){
          tabela('#analise_formato_dados', popularDadosAnalise(data));
      }
      else{
        tabela('#analise_formato_dados','','');
      }

      $('.loading').addClass('hide');

      $('#analise_formato_dados').on( 'draw.dt', function () {
        verificarContraste();
      });

      $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
          $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
      } );
    }
  });

});
