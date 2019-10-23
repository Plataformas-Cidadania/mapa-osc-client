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

require(["rotas","jquery-ui","nv.d3.lib","graficoParaTabela"], function (React) {

  var rotas = new Rotas();

  $.ajax({
    url: rotas.GraficosSlug("home"),
    type: 'GET',
    async: false,
    dataType: 'json',
    error: function(e){
      console.log("Erro no ajax: ");
      console.log(e);
    },
    success: function(idsGraficos){

      if(idsGraficos != null ){
        for (var i = 0; i < idsGraficos.length; i++) {
          
              $.ajax({
                url: rotas.RecuperarGrafico(idsGraficos[i]),
                type: 'GET',
                async: false,
                dataType: 'json',
                error: function(e){
                  console.log("Erro no ajax: ");
                  console.log(e);
                },
                success: function(data){

                  if(data != null ){
                    var menu_msg = "";
                    var fontes = "Elaboração própria.";
                    var num = i+1;

                    menu_msg += '<div class="container"><div class="row"><div class="col-md-12"><hr>';
                    menu_msg += '<h2 class="text-center">'+data.titulo+'</h2>';
                    menu_msg += '</div></div><div class="row"><div class="col-md-12"><hr></div></div>';
                    menu_msg += '<div class="row"><div class="col-md-12"><div class="chart-container" id="grafico-'+num+'"><svg></svg></div>';

                    if(data.fontes != null){
                      fontes = data.fontes.join(", ").replace(/'/gi,"");
                      fontes += ".";
                    }

                    menu_msg += '<h5>Fonte: '+fontes+'</h5>';
                    if(data.legenda != null){
                      menu_msg += '<h5>'+data.legenda+'</h5>';
                    }
                    menu_msg += '<h5><a id="tabela-'+num+'" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';
                    menu_msg += '</div></div><a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div>';

                    $("#itemGrafico").append(menu_msg);

                    escolherGrafico(num,data);
                  }
                }
              });
        }
      }
    }
  });

} );

require(["rotas","bootstrap","jquery-ui" ], function (React) {

  var rotas = new Rotas();

  $.ajax({
    url: rotas.ModuloWebdoors(),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
        $('.loading').addClass('hide');
    },
    success: function(data){

      var src_link = '';
      var link_erro = "this.src='img/item_cms.png'";

      if(data.length > 0){

          for (var i in data) {
            var indicators = '';
            var listbox = '';

            if(i == 0){
              indicators += '<li data-target="#carousel-topo" data-slide-to="'+i+'" class="active"></li>';
              listbox += '<div class="item active">';
            }
            else {
              indicators += '<li data-target="#carousel-topo" data-slide-to="'+i+'"></li>';
              listbox += '<div class="item">';
            }

            if(data[i].tx_imagem_webdoor != null && data[i].tx_imagem_webdoor != ""){
              src_link =  '/cms/imagens/webdoors/'+data[i].tx_imagem_webdoor;
            }
            else{
              src_link = 'img/item_cms.png';
            }

            listbox += '<a class="btn-item" href="'+data[i].tx_link_webdoor+'">';
            listbox += '<img src="'+src_link+'"  onerror="'+link_erro+';" alt="" title="Link para '+data[i].tx_titulo_webdoor+'">';
            listbox += '<div class="carousel-caption"><h4 class="legenda">'+data[i].tx_legenda_webdoor+'</h4></div>';

            if(data[i].tx_descricao_webdoor != null && data[i].tx_descricao_webdoor != ""){
                listbox += '<div class="carousel-caption carousel-descricao"><div">'+data[i].tx_descricao_webdoor+'</div></div>';
            }
            listbox += '</a></div>';

            $('.carousel-indicators').append(indicators);
            $('.carousel-inner').append(listbox);
          }
        }
        $('.loading').addClass('hide');
    }
  });


  var limiteAutocomplete = 10;
  var limiteAutocompleteCidade = 25;

  var flagMultiplo = true;
  var textoBusca = '';

  //botao de consulta
  var div = $(".tab-content");
  div.find(".btn.btn-primary").on("click", function(){
    var tabAtiva = div.find('.tab-pane.fade.active.in');
    var id = tabAtiva.attr("id");
    var val = tabAtiva.find(".form-control").val();
    val = replaceSpecialChars(val.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_');
    var link;

      ////////////////////////////
      var tipoBusca = 0;
      var val2 = null;

      val2 = val.replace(/(\,|\/|\-)/g, '');

      if(checkNumber(val2)){
          val = val2;
          if(val.length==14){
              tipoBusca = 1;
          }
      }

    function checkNumber(valor) {
      var regra = /^[0-9]+$/;
      if (valor.match(regra)) {
          return true;
      }else{
          return false;
      }
    };


    if (id == 'organizacao' && val !== ''){
        link = "./resultado-consulta.html?" + id + "=" + val + "&tipoBusca=" + tipoBusca;
        location.href=link;
    }
    else {
      val = $('.response').val();
      if (val !== ''){
        link = "./resultado-consulta.html?" + id + "=" + val;
        location.href=link;
      }
      else{
        $('#errorLabel').removeClass('hide');
      }
    }
  });


  function replaceSpecialChars(str){
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÉÈÊË]/g,"E");
    str = str.replace(/[éèêë]/g,"e");
    str = str.replace(/[ÍÌÎÏ]/g,"I");
    str = str.replace(/[íìîï]/g,"i");
    str = str.replace(/[ÓÒÔÕ]/g,"O");
    str = str.replace(/[óòôõ]/g,"o");
    str = str.replace(/[ÚÙÛÜ]/g,"U");
    str = str.replace(/[úùûü]/g,"u");
    str = str.replace(/[Ç]/g,"C");
    str = str.replace(/[ç]/g,"c");
    return str;
  }

  //autocomplete organizacao
  $("#organizacao .form-control").autocomplete({
    minLength: 3,
    source: function (request, response) {
	   textoBusca = replaceSpecialChars(request.term.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',');

       $.ajax({
           url: rotas.AutocompleteOSCByName(textoBusca, limiteAutocomplete, 0),
           type: 'GET',
           dataType: "json",
           success: function (data) {
             response($.map( data, function( item ) {
                return {
                    label: item.tx_nome_osc,
                    value: item.tx_nome_osc,
                    id: item.id_osc
                };
            }));
           },
           error: function (e) {
             //console.log(e);
               response([]);
           }
       });
   },
   select: function(event, ui){
		var link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(ui.item.value.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_') + '&tipoBusca=1';
		location.href=link;
   }
 });

  //autocomplete municipio
  $("#municipio .form-control").autocomplete({
    minLength: 3,
    source: function (request, response) {
       $.ajax({
           url: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocompleteCidade),
           type: 'GET',
           dataType: "json",
           success: function (data) {
             response($.map( data, function( item ) {
                return {
                    label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                    value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                    id: item.edmu_cd_municipio
                };
            }));
           },
           error: function (e) {
               response([]);
           }
       });
   },
   select: function(event, ui){
     $('.response').val(ui.item.id);
     var link = "./resultado-consulta.html?"+'municipio'+"="+ui.item.id;
     location.href=link;
   }
 });

 //autocomplete estado
 $("#estado .form-control").autocomplete({
   minLength: 3,
   source: function (request, response) {
      $.ajax({
          url: rotas.AutocompleteOSCByState(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocomplete),
          type: 'GET',
          dataType: "json",
          success: function (data) {
            response($.map( data, function( item ) {
               return {
                   label: item.eduf_nm_uf,
                   value: item.eduf_nm_uf,
                   id: item.eduf_cd_uf
               };
           }));
          },
          error: function () {
              response([]);
          }
      });
  },
  select: function(event, ui){
    $('.response').val(ui.item.id);
    var link = "./resultado-consulta.html?"+'estado'+"="+ui.item.id;
    location.href=link;
  }
});

//autocomplete regiao
$("#regiao .form-control").autocomplete({
  minLength: 3,
  source: function (request, response) {
     $.ajax({
         url: rotas.AutocompleteOSCByRegion(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocomplete),
         type: 'GET',
         dataType: "json",
         success: function (data) {
           response($.map( data, function( item ) {
              return {
                  label: item.edre_nm_regiao,
                  value: item.edre_nm_regiao,
                  id: item.edre_cd_regiao
              };
          }));
         },
         error: function () {
             response([]);
         }
     });
 },
 select: function(event, ui){
   $('.response').val(ui.item.id);
   var link = "./resultado-consulta.html?"+'regiao'+"="+ui.item.id;
   location.href=link;
  }
 });

 $(document).ready(function() {
  var itemWidth = "";

  if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showPosition,showError);
  }else{
    verificarLocalidade();
  }

  function showPosition(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    if(lat != undefined && lat != null && lat != "" && long != undefined && long != null && long != ""){

      window.localStorage.setItem('cd_latitude', lat.toLocaleString('PT'));
      window.localStorage.setItem('cd_longitude', long.toLocaleString('PT'));

      $.ajax({
        url: rotas.RecuperarMunicipio(lat, long),
        type: 'GET',
        async: true,
        dataType: 'json',
        error: function(e){
          verificarLocalidade();
        },
        success: function(data){
          if(data != null &&  data.length !== 0){
            window.localStorage.setItem('cd_localidade',  data[0].cd_localidade);
            window.localStorage.setItem('nome_localidade',  data[0].tx_nome_localidade);
            $("#btn-localidade").text(data[0].tx_nome_localidade);
          }
          mostrarAreaAtuacaoPersonalizada();
        }
      });
    } else{
      verificarLocalidade();
    }
  }

  function showError(error){
    verificarLocalidade();
  }

  function verificarLocalidade(){
    var cd_localidade = window.localStorage.getItem('cd_localidade');
    if(cd_localidade == "" || cd_localidade == null || cd_localidade == undefined){
      $('#modalLocalidade').modal('show');
    }
    mostrarAreaAtuacaoPersonalizada();
  }

  $('.ui-autocomplete-input').keypress(function(e) {
     var key = e.which;
     if(key == 13){
       $('.btn-primary').click();
       $('.ui-menu-item').hide();
       return false;
     }
  });

  function ResCarouselSize() {
      var itemsMainDiv = ('.MultiCarousel');
      var itemsDiv = ('.MultiCarousel-inner');

      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();

      $(itemsDiv).each(function () {
         id = id + 1;
         var itemNumbers = $(this).find(itemClass).length;
         var btnParentSb = $(this).parent().attr(dataItems);
         itemsSplit = btnParentSb.split(',');
         $(this).parent().attr("id", "MultiCarousel" + id);

         if (bodyWidth >= 1200) {
             incno = itemsSplit[3];
             itemWidth = 30 + (sampwidth / incno) ;
         }
         else if (bodyWidth >= 992) {
             incno = itemsSplit[2];
             itemWidth = ( sampwidth / incno);
         }
         else if (bodyWidth >= 768) {
             incno = itemsSplit[2];
             itemWidth = (sampwidth / incno);
         }
         else if (bodyWidth >= 400) {
             incno = itemsSplit[1];
             itemWidth = (sampwidth / incno);
         }
         else {
             incno = itemsSplit[0];
             itemWidth = (sampwidth / incno);
         }
         $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
         $(this).find(itemClass).each(function () {
             $(this).outerWidth(itemWidth);
         });

         $(".leftLst").addClass("over");
         $(".rightLst").removeClass("over");

      });
    }

     //this function used to move the items
     function ResCarousel(e, el, s) {
         var itemsDiv = ('.MultiCarousel-inner');

         var leftBtn = ('.leftLst');
         var rightBtn = ('.rightLst');
         var translateXval = '';
         var divStyle = $(el + ' ' + itemsDiv).css('transform');
         var values = divStyle.match(/-?[\d\.]+/g);
         var xds = Math.abs(values[4]);
         if (e == 0) {
             translateXval = parseInt(xds) - parseInt(itemWidth * s);
             $(el + ' ' + rightBtn).removeClass("over");

             if (translateXval <= itemWidth / 2) {
                 translateXval = 0;
                 $(el + ' ' + leftBtn).addClass("over");
             }
         }
         else if (e == 1) {
             var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
             translateXval = parseInt(xds) + parseInt(itemWidth * s);
             $(el + ' ' + leftBtn).removeClass("over");

             if (translateXval >= itemsCondition - itemWidth / 2) {
                 translateXval = itemsCondition;
                 $(el + ' ' + rightBtn).addClass("over");
             }
         }
         $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
     }

     //It is used to get some elements from btn
     function click(ell, ee) {
         var Parent = "#" + $(ee).parent().attr("id");
         var slide = $(Parent).attr("data-slide");
         ResCarousel(ell, Parent, slide);
     }

    function escolherRotaLocalidadeAreaAtuacao(cd_area_atuacao) {
      var cd_localidade = window.localStorage.getItem('cd_localidade');
      var cd_latitude = window.localStorage.getItem('cd_latitude');
      var cd_longitude = window.localStorage.getItem('cd_longitude');
      var rotaEscolhida;

      if(cd_latitude != undefined && cd_latitude != null && cd_latitude != "" && cd_longitude != undefined && cd_longitude != null && cd_longitude != ""){
        rotaEscolhida = rotas.RecuperarOscPorGeolocalizacaoAreaAtuacao(cd_area_atuacao, cd_latitude, cd_longitude);
      }
      else if(cd_localidade != undefined && cd_localidade != null && cd_localidade != "" ){
        rotaEscolhida = rotas.RecuperarOscPorLocalidadeAreaAtuacao(cd_area_atuacao, cd_localidade);
      }else{
        rotaEscolhida = rotas.RecuperarOscPorAreaAtuacao(cd_area_atuacao);
      }

      return rotaEscolhida;
    }

     function recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao) {

       $.ajax({
         url: escolherRotaLocalidadeAreaAtuacao(cd_area_atuacao),
         type: 'GET',
         async: false,
         dataType: 'json',
         error: function(e){
           console.log("Erro no ajax: ");
           console.log(e);
         },
         success: function(data){

           $("#loading_top_5").hide();

           var tabela = '<center><h5 style="padding-top: 0px;"><b>'+nome_area_atuacao+'</b></h5></center>';
           tabela += '<div class="table-responsive">';
           tabela += '<table class="table table-hover">';
           var corpo = '<tbody>';
           if(data != null && data.length !== 0 ){

             for(var i = 0; i < data.length && i < 5; i++){
                var num_row = i + 1;
                corpo += '<tr>';
                corpo += '<th scope="row">'+num_row+'</th>';
                corpo += '  <td><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" >'+data[i].tx_nome_osc+'</a></td>';
                corpo += '  <th scope="row"><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></th>';
                corpo += '</tr>';
             }
             corpo += '</tbody>';
           }
           else{
             corpo += '<tr>';
             corpo += '<th scope="row"><center>Nenhuma OSC encontrada.</center></th>';
             corpo += '</tr>';
           }
           tabela += corpo +'</table></div>';
           $("#top_5_area_atuacao").html(tabela);
         }
       });
     }

    function mostrarAreaAtuacaoPersonalizada() {

       $.ajax({
         url: rotas.AreaAtuacao(),
         type: 'GET',
         async: true,
         dataType: 'json',
         error: function(e){
           console.log("Erro no ajax: ");
           console.log(e);
         },
         success: function(data){
          var nome_area_atuacao = "";

           if(data != null && typeof data.length !== 'undefined'){
             var corpo = "";
             var cd_area_atuacao;
             for(var i = 0; i < data.length; i++){
               if(data[i].cd_area_atuacao != 1 && data[i].cd_area_atuacao != 10 ){
                  if(data[i].cd_area_atuacao == 2){
                    corpo += '<div class="item active">';
                    cd_area_atuacao = data[i].cd_area_atuacao;
                    nome_area_atuacao = data[i].tx_nome_area_atuacao;
                  }else{
                    corpo += '<div class="item">';
                  }
                  corpo += '<div class="col-xs-12"><a class="btn-item" data-btn='+data[i].cd_area_atuacao+' <center>';
                  corpo += '<img class="imgAreaAtuacao" src="img/area_atuacao_'+data[i].cd_area_atuacao+'.png" >';
                  corpo += '<h5><b>'+data[i].tx_nome_area_atuacao+'</b></h5></center></a></div></div>';
               }
             }

             $(".MultiCarousel-inner").append(corpo);
             $('.leftLst, .rightLst').click(function () {
                 var condition = $(this).hasClass("leftLst");
                 if (condition){
                     click(0, this);
                 }else{
                    click(1, this);
                 }
            });

             ResCarouselSize();

             $(window).resize(function () {
                 ResCarouselSize();
             });

             //botao de consulta top 5
             $(".MultiCarousel .item a").on("click", function(){
               cd_area_atuacao = $(this).attr("data-btn");
               nome_area_atuacao = $(this).text();
               recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao);
             });

             recuperarOscLocalidadeAreaAtuacao(cd_area_atuacao, nome_area_atuacao);
           }
         }
       });
     }

     $.ajax({
       url: rotas.RecuperarOscAtualizacao(),
       type: 'GET',
       async: false,
       dataType: 'json',
       error: function(e){
         console.log("Erro no ajax: ");
         console.log(e);
       },
       success: function(data){

         $("#loading_top_10").hide();
         if(data != null && typeof data.length !== 'undefined'){

           var tabela = '<div class="table-responsive">';
           tabela += '<table class="table table-hover">';
           var corpo = '<tbody>';

           for(var i = 0; i < data.length && i < 10; i++){
              var num_row = i + 1;
              corpo += '<tr>';
              corpo += '<th scope="row">'+num_row+'</th>';
              corpo += '  <td><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';" >'+data[i].tx_nome_osc+'</a></td>';
              corpo += '  <th scope="row"><a class="btn-item" onclick="location.href=\'visualizar-osc.html#'+data[i].id_osc+'\';"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a></th>';
              corpo += '</tr>';
           }
           corpo += '</tbody>';
           tabela += corpo +'</table></div>';

           $("#top_10_atualizacao").html(tabela);

         }
       }
     });

 });

});
