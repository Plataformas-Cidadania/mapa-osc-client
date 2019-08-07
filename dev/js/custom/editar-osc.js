/* jshint ignore:start */
require(["jquery-ui", "libs/jquery-mask/jquery.mask.min"], function (React) {
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

  $(".scroll").click(function(event){
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
 });
});

require(['react', 'rotas', 'jsx!components/Util', 'jsx!components/EditarOSC', 'jquery', 'jquery-ui', 'datatables-responsive', 'editarCabecalho'], function (React) {
  var dadosForm = new DataForms();
  var util = new Util();
  var rotas = new Rotas();
  var cabecalhoObject = new Cabecalho();
  var dadosGerais = new DadosGerais();
  var areasAtuacao = new AreaAtuacao();
  var descricao = new Descricao();
  var titulosCertificacoes = new TitulosCertificacoes();
  var relacoesGovernanca = new RelacoesGovernanca();
  var espacosPartSocial = new EspacosPartSocial();
  var projeto = new Projeto();
  var fonteRecurso = new FonteRecurso();
  var old_json = null;
  var newJson = {};
  var qtdObjODS = 0;
  var limiteObjetivos = 3;
  var numODS = 1;
  var success;
  var cd_objetivo;
  // variável global que serve para contar quantas ODS tem na tela. É usada para fazer com que a div tenha um ID único
  var qtdOdsSecaoProjeto = 0;
  var pro_global;
  var ido_global;

  require(['componenteFormItem', 'componenteCabecalho', 'componenteCheckbox', 'componenteSection',
  'componenteAgrupador', 'componenteFormItemButtons','componenteAgrupadorInputProjeto','componenteAgrupadorConferencia','componenteAgrupadorConselhos','componenteTitulosCertificacoes', 'jquery','select-boxit'],
  function(FormItem, Cabecalho, Checkbox, Section, Agrupador, FormItemButtons, AgrupadorInputProjeto, AgrupadorConferencia, AgrupadorConselhos, AgrupadorTitulosCertificacoes){

    var valoresURL = window.location.href.split('#')[1]!==undefined ? window.location.href.split('#/')[1].split('=') : null;
    var urlRota = "";
    var idOsc = "";

    if(valoresURL !== null){
      idOsc = valoresURL[0];
      if(!util.verificarPermissao(idOsc)){
        window.location.href = "visualizar-osc.html#/"+idOsc;
      }
      addBotaoVisualizar(idOsc);
      addLinkVoltar(idOsc);
      urlRota = rotas.OSCByID_no_project(idOsc);
    }

    var authHeader = {
      "User": window.localStorage.getItem('User'),
      "Authorization": window.localStorage.getItem('Authorization')
    }
    var divObjetivosMetasProjeto='';
    var $divMetasProjeto='';

    newJson["headers"] = authHeader;
    newJson["id_osc"] = idOsc;

    function ajaxConsulta(urlRota, isAsync){
      var result = "";
      $.ajax({
      url: urlRota,
      async: isAsync,
      type: 'GET',
      dataType: 'json',
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){result = data;}
      });
      return result;
    }

    function ajaxAutoComplete(urlRota, isAsync){
      var result = "";
      $.ajax({
        url: urlRota,
        async: isAsync,
        type: 'GET',
        dataType: "json",
        success: function(data) {result = data;},
        error: function(e) {
        }
      });
      return result;
    }

    $.ajax({
      url: rotas.OSCByID_no_project(idOsc),
      type: 'GET',
      dataType: 'json',
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        //Cabeçalho
        cabecalhoObject.montarCabecalho(data, util, React, ReactDOM, Cabecalho);
        old_json = data;
        // Dados Gerais
        dadosGerais.montarDadosGerais(data, util, dadosForm, React, ReactDOM, FormItem, Checkbox);
        //ODS Dados gerais
        metasObjetivosOsc(data, Checkbox);
        //Áreas de atuação
        var txtAtvEconomica = util.validateObject(data.dados_gerais.tx_nome_atividade_economica_osc, "") ;
        var fonteAtvEconomica = util.validateObject(data.dados_gerais.ft_atividade_economica_osc, "");
        var areas_atuacao_sugestoes = areasAtuacao.montarAreasDeAtuacao(data, util, dadosForm, rotas, txtAtvEconomica, fonteAtvEconomica, React, ReactDOM, FormItem);
        //Descrição
        descricao.montarDescricao(data, util, dadosForm, React, ReactDOM, FormItem);
        //Títulos e certificações
        titulosCertificacoes.montarTitulosCertificacoes(data, util, React, ReactDOM, FormItem, AgrupadorTitulosCertificacoes);
        //Relações de trabalho e governança
        var formItens = relacoesGovernanca.montarRelacoesGovernanca(data, util, dadosForm);
        relacoesGovernanca.ativarTrabalhoGovernanca(dadosForm, formItens, React, ReactDOM, Section, Agrupador, FormItem, FormItemButtons, util);
        // Espaços participacao social
        var arrayObj = espacosPartSocial.iniciarEspacosPartSoc(data, util, dadosForm, Section, React, ReactDOM, rotas.Conselho(),rotas.Conferencia(),rotas.PeriodicidadeReuniao(),rotas.Titularidade(),rotas.FormaParticipacaoConferencia());
        espacosPartSocial.ativarEspacosPart(arrayObj, util, React, ReactDOM, Agrupador, AgrupadorConselhos, AgrupadorConferencia, FormItemButtons);
        checkbox_nao_possui(data);
        //Projetos
        ativarProjetos(data, util, dadosForm, areas_atuacao_sugestoes, Checkbox);
        //Fonte de recurso
        fonteRecurso.montarFontedeRecursos(data, util, rotas, dadosForm, React, ReactDOM, Section, FormItem);
        //Acessibilidade
        verificarContraste();
        //função para contornar a não renderização de eventos (onclick, onmouseover...) pelo react
        clique();
        //Datas
        $(".date").datepicker({ dateFormat: 'dd-mm-yy',changeYear: true });
        //Seleção anual como opção do date picker
        $(function() {
            $('.ano').datepicker({
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy',
                yearRange: '1900:2017',
                onClose: function(dateText, inst) {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, 1));
                }
            });
            $(".ano").focus(function () {
                $(".ui-datepicker-calendar").hide();
                $('.ui-datepicker-month').hide();
                $('.ui-datepicker-prev').hide();
                $('.ui-datepicker-next').hide();
            });

            $("#tx_telefone input.form-control").focusout(function(event){
                var target, tel, element;
                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                tel = target.value.replace(/\D/g, '');
                element = $(target);
                element.unmask();
                if(tel.length === 11) {
                  if(tel[0] == 0){
                       element.mask("9999 999 9999")
                  } else {
                      element.mask("(99) 99999-9999");
                  }
                }
                else if(tel.length === 10) {
                      element.mask("(99) 9999-9999");
                }
                else if(tel.length === 9) {
                      element.mask("(99) 999-9999");
                }
                else if(tel.length === 8) {
                    element.mask("9999-9999");
                }
                else if(tel.length === 7) {
                    element.mask("999-9999");
                }
            });
            $("#tx_telefone input.form-control").focusin(function(event){
                var target, element;
                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                element = $(target);
                element.unmask();
            });


        });

        //hack para fazer o botão funcionar quando este começa escondido
        $("#bodyheaderTitulosCertificacoes td.sorting_1").click(function() {
          var id = $(".remove_titulo_certificacao").attr("data");
          $("#tabela_titulos_certificados").DataTable().destroy();
        });

        function readURL(input) {
          if (input.files && input.files[0] && input.files[0].type.match('image.*') && input.files[0].size < 1000000) {
            var MAX_WIDTH = 300;
            var MAX_HEIGHT = 225;
            var img = document.createElement("img");
            var canvas = document.createElement("canvas")
            var reader = new FileReader();

            reader.onload = function (e) {
              img.src = e.target.result
              img.onload = function(){
                var width = img.width;
                var height = img.height;

                if (width > height) {
                  if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }

                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                //Cria imagem png base64
                var dataurl = canvas.toDataURL("image/png");
                //seta como sorce da imagem, a nova imagem base64
                $("#imagemLogo").attr('src',dataurl);
              };
            };
            reader.readAsDataURL(input.files[0]);
          }
          else {
            $('#errorLabel').removeClass('hide');
          }
        }

        addBotaoimagem();

        $('.custom-file-upload').on("change", function(){
          $('.alert').addClass('hide');
          $('input[type=file]').each(function(index){
            if ($('input[type=file]').eq(index).val() != ""){
              readURL(this);
              //readURL(this);
            }
          });
        });

        $("#btnRemoverLogo").click(function(){
          $("#imagemLogo").attr('src',"img/camera.jpg");
          $('input[type=file]').eq(0).val("");
        });

        $("#loading").hide();
        $(".conteudo_loading .section").css('visibility', 'visible');
      }
    });

    function addBotaoVisualizar(id){
        $(".btnVisualizar").append('<a id="btnVisualizar" type="button" title="Clique para Visualizar"  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Visualizar OSC</a>');
        $("#btnVisualizar").attr("href","visualizar-osc.html#/"+id);
    }

    function addBotaoimagem(){
        $("#btnInserirImg").append('<label class="custom-file-upload btn btn-info" title="Clique para Inserir o Logo da OSC"><input id="inserirLogo" type="file" accept="image/x-png,image/gif,image/jpeg" /><i class="fa fa-cloud-upload"></i>Inserir Logo</label>');
        $("#btnRemoverImg").append('<a class="btn btn-danger btn-sm" id="btnRemoverLogo" type="button" title="Clique para Remover o Logo da OSC" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Remover Logo</a>');
    }

    function addLinkVoltar(id){
        $("#voltaEditar").attr("href","editar-osc.html#/"+id);
        var urlPagAnterior = document.referrer;
        if(urlPagAnterior.indexOf("minhas-oscs") == -1){
          $("#voltaPagAnterior").text('Visualizar');
          $("#voltaPagAnterior").attr("href","visualizar-osc.html#/"+id);

         } else {
             $("#voltaPagAnterior").text('Lista de OSCs');
             $("#voltaPagAnterior").attr("href","minhas-oscs.html");
         }
    }

    function checkbox_nao_possui(data){

      $("#tx_sigla_osc").parent().parent().prepend('<div class="input-box checkbox box_right"><label><input type="checkbox">Não possui sigla</label></div>');
      $("#tx_email").parent().parent().prepend('<div class="input-box checkbox box_right"><label><input type="checkbox">Não possui email</label></div>');
      $("#tx_site").parent().parent().prepend('<div class="input-box checkbox box_right"><label><input type="checkbox">Não possui site</label></div>');

      var dados_gerais = util.validateObject(data.dados_gerais, 0);
      $("#tx_sigla_osc").parent().parent().find('input[type="checkbox"]').prop('checked', dados_gerais.bo_nao_possui_sigla_osc);
      $("#tx_email").parent().parent().find('input[type="checkbox"]').prop('checked', dados_gerais.bo_nao_possui_email);
      $("#tx_site").parent().parent().find('input[type="checkbox"]').prop('checked', dados_gerais.bo_nao_possui_site);

      $('#dados_gerais .box_right input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

      $("#tx_link_estatuto_osc").parent().parent().prepend('<div class="input-box checkbox box_right"><label><input type="checkbox">Não possui link para o estatuto da OSC</label></div>');

      var descricao = util.validateObject(data.descricao, 0);
      $("#tx_link_estatuto_osc").parent().parent().find('input[type="checkbox"]').prop('checked', descricao.bo_nao_possui_link_estatuto_osc);

      $('#descricao input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

      $("#novo_titulo_certificacao_botao").parent().append('<div class="input-box checkbox"><label><input type="checkbox">Não possui títulos e certificações.</label></div>');

      var certificacoes = util.validateObject(data.certificado, 0);

    $("#novo_titulo_certificacao_botao").click(function(){

      $('#idSelectTitulosCertificados').change(function(){
        var routes="";
        var abrang=$('#idSelectTitulosCertificados')[0].value.toLowerCase();
        var limiteAutocomplete = 10;
        var limiteAutocompleteCidade = 25;

        $('#novo_titulo_certificacao_local').autocomplete({
          minLength: 2,
          source: function (request, response) {

            if ( util.contains('municipal',abrang) ){
              routes = rotas.AutocompleteOSCByCounty(util.replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocompleteCidade);
            }
            else if ( util.contains('estadual',abrang) || (abrang == '-1')  ){
              routes = rotas.AutocompleteOSCByState(util.replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete);
            }
            if ( routes != "" ) {
              var data = ajaxAutoComplete(routes, false);
              response($.map( data, function( item ) {
                if ( util.contains('municipal',abrang) ) {
                   return {
                      label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                      value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                      id: item.edmu_cd_municipio
                  }
                }
                else if ( util.contains('estadual',abrang)  || (abrang == '-1') ) {
                  return {
                      label: item.eduf_nm_uf,
                      value: item.eduf_nm_uf,
                      id: item.eduf_cd_uf
                  }
                }
              }))
            }
          },
          select: function( event, ui ) {
            $("#cd_uf_mun_titulo_certificacao").val(ui.item.id);
        }
       })
      })
    });

      $('#certificacoes input[type="checkbox"]').prop('checked', certificacoes.bo_nao_possui_certificacoes);

      $('#certificacoes input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

      $("#conselhos").prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui conselhos de políticas públicas.</label></div>');
      $("#conferencias").prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui conferências de políticas públicas.</label></div>');
      $("#outros_part").prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui outros espaços de participação social.</label></div>');

      var participacao_social = util.validateObject(data.participacao_social, 0);


      /*console.log("conselho: "+participacao_social.bo_nao_possui_participacao_social_conselho);
      console.log("conferencia: "+participacao_social.bo_nao_possui_participacao_social_conferencia);
      console.log("participacao: "+participacao_social.bo_nao_possui_participacao_social_outra);*/

      $('#conselhos input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_participacao_social_conselho);
      $('#conferencias input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_participacao_social_conferencia);
      $('#outros_part input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_participacao_social_outra);

      /*$('#conselhos input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_conselhos);
      $('#conferencias input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_conferencias);
      $('#outros_part input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_outros_part);*/

      //Fecha div se tiver click
      $('#conselhos input[type="checkbox"]').click(function() {
        $('.conselho').show();
        if($('#conselhos input[type="checkbox"]').prop("checked")){
          $('.conselho').hide();
        }
      });
      
      $('#conferencias input[type="checkbox"]').click(function() {
        $('.conferencia').show();
        if($('#conferencias input[type="checkbox"]').prop("checked")){
          $('.conferencia').hide();
        }
      });
      
      $('#outros_part input[type="checkbox"]').click(function() {
        let children_outro_part = $('#outros_part').children();
        children_outro_part[1].setAttribute('style', 'display: block;');

        if($('#outros_part input[type="checkbox"]').prop("checked")){
          children_outro_part[1].setAttribute('style', 'display: none;');
        }
      });


      //Fecha div se o valor do true
      if(participacao_social.bo_nao_possui_participacao_social_conselho==true){
        $('.conselho').hide();
      }

      if(participacao_social.bo_nao_possui_participacao_social_conferencia==true){
        $('.conferencia').hide();
      }

      if(participacao_social.bo_nao_possui_participacao_social_outra==true){
        let children_outro_part = $('#outros_part').children();
        children_outro_part[1].setAttribute('style', 'display: none;');
      }



      $('#conselhos input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

      $('#conferencias input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

      $('#outros_part input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

    }

    function metasObjetivosOsc(data, Checkbox){
      var objetivo_metas = util.validateObject(data.dados_gerais.objetivo_metas, "");
      var objetivos = {};
      for (var i = 0; i < objetivo_metas.length; i++) {
        var cd_objetivo = objetivo_metas[i].cd_objetivo_osc;
        objetivos[cd_objetivo] = objetivo_metas[i].tx_nome_objetivo_osc ;
      }

      var $divDadosGerais = $('#dados_gerais');
      $divDadosGerais.append('<label title="Indique se o PAP se relaciona com alguns dos objetivos do desenvolvimento sustentável, da ONU.">Objetivos do Desenvolvimento Sustentável - ODS: <span class="glyphicon glyphicon-info-sign" style="visibility:visible;" ></span><a href="http://www.agenda2030.com.br/" target=_blank><img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo." /></a></label>');
      $divDadosGerais.append('<div class="form-group" id="objetivosOsc-metas"</div>');
      $("#objetivosOsc-metas").append('<span class="input-group-btn"><button id="add_objetivo_ods" class="btn-primary btn">Adicionar Objetivo</button></span>');

      var data = ajaxConsulta(rotas.Objetivos(), false);
      if(objetivo_metas == ""){
        criarObjetivosOsc(data,"",-1,-1,Checkbox);
        qtdObjODS++;
        numODS++;
      }
      else{
        for(var k in objetivos){
          var objetivo = util.validateObject(objetivos[k], -1);
          criarObjetivosOsc(data, objetivo_metas, objetivo, k,Checkbox);
          qtdObjODS++;
        }
      }

      $("#add_objetivo_ods").click(function(){
        if(qtdObjODS < limiteObjetivos){
          var data = ajaxConsulta(rotas.Objetivos(), false);
          criarObjetivosOsc(data,"",-1,-numODS,Checkbox);
          qtdObjODS++;
          numODS++;
        }
      });
    }

    function criarObjetivosOsc(data, objetivo_metas, objetivo, cd_objetivo, Checkbox){
      //console.log("Dados Gerais");
      $("#objetivosOsc-metas").append('<label title="Objetivo selecionado da ODS." class="label-objetivosOsc-'+cd_objetivo+'">Objetivo:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></label>');
      $("#objetivosOsc-metas").append('<div id="objetivosOsc" class="objetivosOsc objetivosOsc-'+cd_objetivo+'"></div>');
      $(".objetivosOsc-"+cd_objetivo).append('<div class="form-group"><div id="objetivosOsc-'+cd_objetivo+'" for="'+cd_objetivo+'"><select class="form-control"></select></div></div>');
      $("#objetivosOsc-"+cd_objetivo).append('<div id="metasOsc-'+cd_objetivo+'" class="metasOsc"></div>');

      var $divMetasOsc = $("#objetivosOsc-metas").find("#metasOsc-"+cd_objetivo);
      if(cd_objetivo <= -1){
        $divMetasOsc.append('<br><label title="Marque as metas que se enquadram neste projeto" style="display:none">Metas Relacionadas ao ODS definido:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></label><br>');
      }
      else{
        $divMetasOsc.append('<br><label title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></label><br>');
      }
      $divMetasOsc.append('<ol id="selectableOsc-'+cd_objetivo +'" class="selectable"></ol><br>');

      montarObjetivosOsc(data, cd_objetivo);
      $("#objetivosOsc-"+cd_objetivo+" select").selectBoxIt({
         theme: "default",
         //defaultText: "Selecione abaixo...",
         autoWidth: false
       });

      $("#objetivosOsc-"+cd_objetivo+" select").selectBoxIt("refresh");

      var cd_metas = [];
      if(objetivo !== -1){
        for (var i = 0; i < objetivo_metas.length; i++) {
          if(cd_objetivo == objetivo_metas[i].cd_objetivo_osc){
            var cd_meta = objetivo_metas[i].cd_meta_osc;
            cd_metas.push(cd_meta);
          }
        }
        loadMetasOsc(cd_objetivo, cd_metas, Checkbox);
      }
      carregaEventoMetasOsc(cd_objetivo, Checkbox);
    }

    function montarObjetivosOsc(json, cd_objetivo){
      var options = json;
      var $selectObjetivos = $('#objetivosOsc-'+cd_objetivo).find("select");
      if (cd_objetivo == -1 ) {
        $selectObjetivos.append('<option value=-1 selected id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
      }
      else {
        $selectObjetivos.append('<option value=-1 id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
      }

      for (var i = 0; i < options.length; i++) {
        if(options[i].cd_objetivo_projeto == cd_objetivo){
          $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        } else {
          $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        }
      }
    }

    function loadMetasOsc(cd_objetivo, cd_metas, Checkbox){
      var data = ajaxConsulta(rotas.MetaProjeto(cd_objetivo), false);
      montarMetasOsc(data, cd_objetivo, cd_metas, Checkbox);
    }

    function montarMetasOsc(data, cd_objetivo, cd_metas, Checkbox){
      if (util.validateObject(data, false)){
        var checkboxItems = [];
        function CheckboxItem(id, label, value, type, checked){
          this.id = id;
          this.label = label;
          this.value = value;
          this.type = type;
          this.checked = checked;
        }

        var items = data;

        for (var i=0; i<items.length; i++){
          var checkboxItem = null;
          if(cd_metas.includes(items[i].cd_meta_projeto)){
            checkboxItem = new CheckboxItem(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].cd_meta_projeto, "checkbox", true);
            checkboxItems.push(checkboxItem);
          } else {
            checkboxItem = new CheckboxItem(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].cd_meta_projeto, "checkbox", false);
            checkboxItems.push(checkboxItem);
          }
        }
        //console.log(document.getElementById("selectableOsc-"+cd_objetivo));
        Checkbox = React.createFactory(Checkbox);
        ReactDOM.render(
          Checkbox(
            {dados:checkboxItems}
          ), document.getElementById("selectableOsc-"+cd_objetivo)
        );
      }
      var $divObjetivosMetasOsc = $('#metasOsc-'+cd_objetivo);
      $divObjetivosMetasOsc.append('<span class="input-group-btn"><button id="remover_objetivo_ods-'+cd_objetivo+'" for="'+cd_objetivo+'" class="btn-danger btn">Remover Objetivo</button></span>')
      $divObjetivosMetasOsc.append('<hr>');

      $("#remover_objetivo_ods-"+cd_objetivo).click(function(){
        var cd_objetivo = $(this).attr('for');
        $('.label-objetivosOsc-'+cd_objetivo).remove();
        $('.objetivosOsc-'+cd_objetivo).remove();
        $('#metasOsc-'+cd_objetivo).remove();
        qtdObjODS--;
      });
    }

    function carregaEventoMetasOsc(cd_objetivo, Checkbox){
      $("#objetivosOsc-"+cd_objetivo).find('select').on('change', function(){
        var cd_objetivo = $(this).children(":selected").attr("id");
        var contemObjetivo = false;
        $(".objetivosOsc").each(function() {
          if($( this ).hasClass( 'objetivosOsc-'+cd_objetivo )){
            contemObjetivo = true;
          }
        });
        var id_cd_objetivo = null;
        if(contemObjetivo){
          id_cd_objetivo = $(this).parent().attr('for');
          $('#metasOsc-'+id_cd_objetivo).remove();
        }
        else {
          id_cd_objetivo = $(this).parent().attr('for');
          $(this).parent().attr('for', cd_objetivo);
          $('.label-objetivosOsc-'+id_cd_objetivo).removeClass('label-objetivosOsc-'+id_cd_objetivo).addClass('label-objetivosOsc-'+cd_objetivo);
          $('.objetivosOsc-'+id_cd_objetivo).removeClass('objetivosOsc-'+id_cd_objetivo).addClass('objetivosOsc-'+cd_objetivo);
          $('#metasOsc-'+id_cd_objetivo).remove();
          $(this).parent().append('<div id="metasOsc-'+cd_objetivo+'" class="metasOsc"></div>');
          $('#metasOsc-'+cd_objetivo).append('<br><label title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></label><br>');
          $('#metasOsc-'+cd_objetivo).append('<ol id="selectableOsc-'+cd_objetivo +'" class="selectable"></ol><br>');

          if(parseInt(cd_objetivo) !== 0){
            loadMetasOsc(cd_objetivo, [], Checkbox);
          }
        }
        verificarContraste();
      });
    }

    function ativarProjetos(data, util, dadosForm, areas_atuacao_sugestoes, Checkbox){
      var projetosArray = projeto.montarProjetos(data, util);
      var headerProjeto = projetosArray[0];
      Section = React.createFactory(Section);
      ReactDOM.render(
        Section(
          {dados:[headerProjeto]}
        ), document.getElementById("projetos")
      );

      $("#projetos .sections h2").parent().append('<div class="input-box checkbox pro"><label><input type="checkbox">Não possui projetos, atividades e programas</label></div>');

      var projetos = util.validateObject(data.projetos, 0);
      $('#projetos .pro input[type="checkbox"]').prop('checked', projetos.bo_nao_possui_projetos);

      $('#projetos .pro input[type="checkbox"]').change(function() {
        if($(this).is(':checked')){
          $(this).prop('checked', true);
        }
        else{
          $(this).prop('checked', false);
        }
      });

      $( "#lista_projetos" ).append( '<table id="table_lista_projetos" class="table-striped"></table>' );

      var newData = projetosArray[1];
      var table_lista_projetos = montaTabelaListaProjetos(newData);

      $("#table_lista_projetos tbody td").each(function(i) {
        if (util.validateObject(newData[i])) {
          var res = projeto.carregaProjeto(newData[i][0], dadosForm, rotas, util, false);
          var fonte =res.projeto.projeto[0].ft_nome_projeto;
          if (fonte == 'Representante de OSC' || fonte == 'Representante'){
          $(this).append(
           '<button id="id_botao-projeto" attr="'+newData[i][0]+'" class="btn-danger btn botao-projeto">Remover Projeto</button>'//+
          );
        }
       }
      });

      $('#table_lista_projetos').append('<span class="input-group-btn">'+
      '<button id="add_projeto" class="btn-primary btn">Adicionar Projeto</button>'+
      '</span>');

      $("#table_lista_projetos tbody td").each(function() {
        $(this).prepend('<span class="glyphicon glyphicon-book" aria-hidden="true"></span> ');
        $(this).wrapInner( "<div class='titulo-projeto'></div>" );
      });

      var proj_id_generator = 0;
      $('#add_projeto').click(function(){
        //salvarProjetos();
        table_lista_projetos.row.add([
          -1,
          '<div class="titulo-projeto"><span class="glyphicon glyphicon-book" aria-hidden="true"></span> Novo Projeto'
        ]).draw(false);
        verificarContraste();
      });

      $("#table_lista_projetos").on('click', '.titulo-projeto', function(){
        var tr_projeto = $(this).parent().parent().get(0);
        var novo = false;
        var id_projeto = table_lista_projetos.row(tr_projeto).data()[0];
        var projetos = $(this).next(".projeto");

        if(id_projeto == -1 ){ //projeto nove
          novo = true;
          id_projeto = Number(id_projeto) - proj_id_generator;
          proj_id_generator += 1;
        }

        if(projetos.length < 1){
          var res = projeto.carregaProjeto(id_projeto, dadosForm, rotas, util, novo);
          var result = res.agrupadores;
          var proj = res.projeto;
          var id_projeto_externo = proj ? proj.projeto[0].tx_identificador_projeto_externo : null;

          var divId = "projeto-" + id_projeto;
          $(this).after('<div id="' + divId + '" class="projeto col-md-12">');

          if($(this).find('#id_botao-projeto').length == 0){
            $(this).append('<button id="id_botao-projeto" attr="'+id_projeto+'" class="btn-danger btn botao-projeto">Remover Projeto</button>');
            $('.botao-projeto').click(function(){
              remove_projeto($(this).attr('attr'));
            });
          }

          agrupamento(result, id_projeto);
          montarAreasDeAtuacaoProjetos(areas_atuacao_sugestoes);

          $("#" + divId + " #nr_valor_total_projeto input" ).mask('000.000.000.000.000,00', {reverse: true});
          $("#" + divId + " #nr_valor_total_projeto input" ).addClass('with-pretext');
          $("#" + divId + " #nr_valor_total_projeto input" ).before('<span class="pretext">R$</span>');
          $("#" + divId + " #nr_valor_captado_projeto input" ).mask('000.000.000.000.000,00', {reverse: true});
          $("#" + divId + " #nr_valor_captado_projeto input" ).addClass('with-pretext');
          $("#" + divId + " #nr_valor_captado_projeto input" ).before('<span class="pretext">R$</span>');
          $("#" + divId + " #nr_total_beneficiarios input" ).mask('00000000');
          $($('#'+divId).find("div")[0]).attr("id", id_projeto_externo);

          localizacao(divId, $('#' + divId + ' #tx_nome_abrangencia_projeto').find(":selected").val());

          $("#" + divId + " .local button.btn-primary").click(function() {
            localizacao(divId, $('#' + divId + ' #tx_nome_abrangencia_projeto').find(":selected").val());
          });

          $('#' + divId + ' #tx_nome_abrangencia_projeto').change(function() {
            localizacao(divId, $('#' + divId + ' #tx_nome_abrangencia_projeto').find(":selected").val());
          });

          var fonte_recurso_proprio = false;
          $('#'+divId+' .fonte_recursos input:checked').each(function(){
             if ($(this).val() == "Recursos públicos"){
               fonte_recurso_proprio = true;
             }
          });

          $('#' + divId + ' .tipo_parceria_projeto').addClass(tipo_parceria_projeto($('#'+divId+' .tipo_parceria_projeto input:checked').length, fonte_recurso_proprio));

          function conta(divId){
            var i = 0;
            $('#' + divId + ' .osc_parceira input').each(function(){
              i=i+1;
            });
            return i-1;
          }

          $('#' + divId + ' .osc_parceira button.btn-primary').click(function() {
            osc_parceira(conta(divId));
          })

          $('#' + divId + ' #osc_parceira').find('input').autocomplete({
            source: function (request, response) {
                var cnpj = ($(this)[0].term);
                var nome_osc ='';
                var id_osc='';
                if (!validaCNPJ(cnpj)) {
                  //$('#osc_parceira').find('input')[0].value = "Valor de CNPJ inválido!";
                }
                else {
                    var data = ajaxAutoComplete(rotas.AutocompleteOSCByCnpj(util.replaceSpecialChars(cnpj).replace(/ /g, '+'), 10/*limiteAutocomplete*/), false);
                  if (data == null){
                      $('#' + divId + ' #osc_parceira').find('input')[0].value = "Entidade não cadastrada!";
                  }
                  else{
                    nome_osc = data[0].tx_nome_osc;
                    id_osc = data[0].id_osc;
                    $('#' + divId + ' #osc_parceira').find('input')[0].value = nome_osc;
                    $('#' + divId + ' #osc_parceira').find('input')[0].id_osc_parceira=id_osc;
                  }
                }
            }
          })

          if(proj){
            id_osc_parceira(proj.projeto[0]);
            metasObjetivos(proj.projeto[0], id_projeto);
          } else {
            //id_osc_parceira({});
            metasObjetivos({}, id_projeto);
          }
          verificarContraste();
        }
        else {
          $(this).next(".projeto").toggleClass('hidden');
        }
      });

      $("#table_lista_projetos_paginate").click(function(e){
        var ct_pag = $("#lista_projetos .paginate_button.current").attr("data-dt-idx");
        ct_pag = (ct_pag-1)*10;

        if( ($("#id_botao-projeto").length==0) ) {
          $("#table_lista_projetos tbody td").each(function(i) {
            if (util.validateObject(newData[i+ct_pag])) {
              var res = projeto.carregaProjeto(newData[i+ct_pag][0], dadosForm, rotas, util, false);
              var fonte =res.projeto.projeto[0].ft_nome_projeto;

              if (fonte == 'Representante de OSC' || fonte == 'Representante'){
                $(this).append(
                 '<button id="id_botao-projeto" attr="'+newData[i+ct_pag][0]+'" class="btn-danger btn botao-projeto">Remover Projeto</button>'  );
                $(this).prepend('<span class="glyphicon glyphicon-book" aria-hidden="true"></span> ');
                $(this).wrapInner( "<div class='titulo-projeto'></div>" );
              }
            }

            if ($(this).find( ".glyphicon" ).length == 0){
              $(this).prepend('<span class="glyphicon glyphicon-book" aria-hidden="true"></span> ');
            }
          });
        }
        $('.botao-projeto').click(function(){
          remove_projeto($(this).attr('attr'));
        });
        verificarContraste();
      });

      $('.botao-projeto').click(function(){
        remove_projeto($(this).attr('attr'));
        verificarContraste();
      });

      function remove_projeto(id_proj) {
          var jsonRemoverSucesso;
          var novo=false;
          if(parseInt(id_proj) <= 0){
            novo = true;
          }
          var res = projeto.carregaProjeto(id_proj, dadosForm, rotas, util, novo);
          var fonte = res.projeto ? res.projeto.projeto[0].ft_nome_projeto : "";
          if (fonte == 'Representante de OSC' || fonte == 'Representante'){
            success = util.carregaAjax(rotas.RemoverProjectByID(id_proj,idOsc), 'POST', newJson);
            //console.log(success);
            if (success.msg == "Projeto excluído.") {
              jsonRemoverSucesso = {"Removido com sucesso!":"Suas alterações serão processadas aproximadamente em 1(uma) hora.<br><br>Obrigado!"};
              util.abrirModalAjuda("Removido com sucesso!", jsonRemoverSucesso);
            }
            else {
              jsonRemoverSucesso = {"Problema ao remover projeto!":"Esse projeto possivelmente já foi removido.<br> Suas alterações serão processadas aproximadamente em 1(uma) hora.<br><br>Obrigado!"};
              util.abrirModalAjuda("Problema ao remover projeto!", jsonRemoverSucesso);
            }
          }
          else {
            if(parseInt(id_proj) > 0){
              jsonRemoverSucesso = {"Problema ao remover projeto!":"Esse projeto possivelmente é um projeto de dados oficiais e não pode ser removido.<br> Suas alterações serão processadas aproximadamente em 1(uma) hora.<br><br>Obrigado!"};
              util.abrirModalAjuda("Problema ao remover projeto!", jsonRemoverSucesso);
            }
            else {
              jsonRemoverSucesso = {"Problema ao remover projeto!":"Esse projeto possivelmente foi inseriodo agora!"}
              util.abrirModalAjuda("Problema ao remover projeto!",jsonRemoverSucesso);
            }
          }
      }

      function conta_tr(){
          var i = 0;
          $("#table_lista_projetos tbody tr").each(function() {
            i=i+1;
          });
          return i-1;
      }
    }

    function montarAreasDeAtuacaoProjetos(sugestoes){
      var sugestoesAreas = sugestoes[0];
      var sugestoesSubAreas = sugestoes[1];
      var $divAreaAtuacaoProjeto = $(".projeto #area_atuacao input");
      var areaAtuacao = new AreaAtuacao();

      var id_suggestion = 0;
      $divAreaAtuacaoProjeto.addClass('autocomplete');
      $divAreaAtuacaoProjeto.append('<div class="checkboxList"></div>')
      for (var i = 0; i < sugestoesAreas.length; i++) {
        var sugestaoArea = sugestoesAreas[i];
        $divAreaAtuacaoProjeto.find('.checkboxList').append('<div>')
        for (var j = 0; j < sugestoesSubAreas.length; j++) {
          var sugestaoSubArea = sugestoesSubAreas[j];
          if (sugestaoArea.cd_area_atuacao === sugestaoSubArea.cd_area_atuacao) {
          }
        }
      }

      sugestoesAreas = $.map(sugestoesAreas, function(item) {
        var newItem = {
          label: item.tx_nome_area_atuacao,
          value: item.tx_nome_area_atuacao,
          id: item.cd_area_atuacao
        };
        return newItem;
      });

      $(".projeto .autocomplete").autocomplete({
        minLength: 0,
        create: function(event, ui) {
          var value = $(this).attr("placeholder");
          for (var i = 0; i < sugestoesAreas.length; i++) {
            var suggestion = sugestoesAreas[i].value;

            if (suggestion === value){
              var $container = $(this).siblings(".checkboxList");
              var $element = $container.find("#subareas-"+i);
              if($element.hasClass('hidden')){
                $element.toggleClass('hidden');
              }
              for (var j = 0; j < sugestoesAreas.length; j++) {
                if((value === sugestoesAreas[j].tx_nome_area_atuacao)){
                  var subarea_exists = false;
                  $element.find("label").each(function(){
                    if(sugestoesAreas[j].tx_nome_subarea_atuacao === $(this).text().trim()){
                      subarea_exists = $(this);
                    }
                  });
                  if(subarea_exists){
                    subarea_exists.find("input").prop('checked', true);
                  } else {
                    $element.find("#outros").val(sugestoesAreas[j].tx_nome_subarea_atuacao);
                  }
                }
              }
            }
          }
        },
        source: sugestoesAreas,
        change: function( event, ui ) {
        },
        select: function(event, ui){
          if(event.target.id == 'macro_area_1'){
            $('#sub_area_1_outros').parent().parent().addClass('hidden');
            $('#sub_area_1_outros').val('');
            $(this).parent().find(':checkbox').prop("checked", false);
          }
          else{
            $('#sub_area_2_outros').parent().parent().addClass('hidden');
            $('#sub_area_2_outros').val('');
            $(this).parent().find(':checkbox').prop("checked", false);
          }
          var targetElement = event.target;
          var id = sugestoesAreas.indexOf(ui.item)+1;
          id_suggestion = id;
          var $container = $($(targetElement).siblings(".checkboxList")[0]);
          $container.children().each(function( index ) {
            if(!$(this).hasClass('hidden')){
              $(this).toggleClass('hidden');
              $(this).children().each(function(index){
                var $input = $($(this).find('input')[0]);
                if ($input.is(':checked')){
                  $input.prop('checked', false);
                }
                if ($input.prop('type') == "text"){
                  $input.val("");
                }
              });
            }
          });
          var $element = $container.find("#subareas-"+id);
          if($element.hasClass('hidden')){
            $element.toggleClass('hidden');
          }
          // interação macro_area_outros
          var macro_area = ui.item.value;
          var pai = $(this).closest(".form-group");
          var id = pai.find(".autocomplete").attr("id");
          var $inputContainer = null;
          if(id === "macro_area_1"){
            $inputContainer = pai.siblings().find("#macro_area_1_outros").closest(".form-group");
          } else {
            $inputContainer = pai.siblings().find("#macro_area_2_outros").closest(".form-group");
          }

          if (macro_area === "Outros"){
            $inputContainer.toggleClass('hidden');
            if($inputContainer.hasClass('hidden')){
              var $input = $inputContainer.find('input');
              $input.val("");
            }
          } else {
            if(!$inputContainer.hasClass('hidden')){
              $inputContainer.toggleClass('hidden');
              var $input = $inputContainer.find('input');
              $input.val("");
            }
          }
        }
      });

      $(".autocomplete").on("click", function(){
        $(this).autocomplete( "search", "" );
      });

      $(".autocomplete").keyup(function(){
        if(($(this).val() === "") && (id_suggestion != 0)){
          var id = id_suggestion;
          var $container = $(this).parent();
          var $element = $container.find("#subareas-"+id);
          if(!$element.hasClass('hidden')){
            $element.toggleClass('hidden');
          }
        }
      });
    }

    function montaTabelaListaProjetos(newData){
      var table_lista_projetos = $('#table_lista_projetos').DataTable({
          responsive: true,
          deferLoading: 1000,
          deferRender: true,
          ordering: false,
          data: newData,
          columns: [
            {DT_RowId: "Id"},
            {title: "Nome do Projeto"}
          ],
          order: [],
          aoColumnDefs: [
            {bSortable :false, aTargets: [0]},
            {
              "targets": [ 0 ],
              "visible": false,
              "searchable": false
            },
          ],
          autoWidth: true,
          "oLanguage": dadosForm.oLanguageDataTable()
        }
      );
      return table_lista_projetos;
    }

    function tipo_parceria_projeto(valor, fonte_recurso_proprio){
      if (valor == 0 && !fonte_recurso_proprio){
        return "hidden"
      }else{
        return ""
      }
    }

    function agrupamento(agrupadores, id){
      AgrupadorInputProjeto = React.createFactory(AgrupadorInputProjeto);
      ReactDOM.render(
        AgrupadorInputProjeto(
          {dados:agrupadores}
        ), document.getElementById("projeto-"+id)
      );

      $(".date").datepicker({ dateFormat: 'dd-mm-yy',changeYear: true });
      $(".ano").datepicker({ dateFormat: 'yy' });

      // interacoes
      $('#projeto-'+id).on("click", ".btn-danger", function(){
        $(this).parents(".input-group").remove();
      });

      $('#projeto-'+id).find(".fonte_recursos input[value='Recursos públicos']").bind("change", function(){
        if($(this).prop("checked")){
          $('#projeto-'+id+' .tipo_parceria_projeto').removeClass('hidden');
        }
        else{
          $('#projeto-'+id+' .tipo_parceria_projeto').addClass('hidden');
        }
      });

      $('#projeto-'+id).find(".btn-primary").bind("click", function(){
          $(this).parent().siblings(".form-group").append(
            '<div class="input-group">'+
            '<div>'+
            '<input maxLength="100" class="form-control" placeholder="Insira a informação"></input>'+
            '</div>'+
            '<span class="input-group-btn">'+
            '<button class="btn-danger btn">Remover</button>'+
            '</span>'+
            '</div>'
          );
      });
    }

    function id_osc_parceira(project){
      // OSC Parceiras
      var id_osc_parc;
      var tam_osc_parc = project.osc_parceira ? project.osc_parceira.length : 0;
      for (var i = 0; i < tam_osc_parc ; i++) {
        id_osc_parc = util.validateObject(project.osc_parceira[i].id_osc,null);
        $('#osc_parceira').find('input')[i].id_osc_parceira=id_osc_parc;
      }
    }

    function metasObjetivos(project, id){
      //metas e objetivos
      pro_global = project;
      ido_global = id;
      var objetivo_meta = util.validateObject(project.objetivo_meta, "");
      var objetivo_meta_inicial = util.validateObject(objetivo_meta[0], "");
      var objetivo = util.validateObject(objetivo_meta_inicial.tx_nome_objetivo_projeto, -1);
      var cd_objetivo = util.validateObject(objetivo_meta_inicial.cd_objetivo_projeto, -1);
      var cd_metas = [];
      var metas = [];
      if(objetivo !== -1){
        for (var i = 0; i < objetivo_meta.length; i++) {
          var cd_meta = objetivo_meta[i].cd_meta_projeto;
          var meta = objetivo_meta[i].tx_nome_objetivo_projeto;
          cd_metas.push(cd_meta);
          metas.push(meta);
        }
      }
      var objetivos = {};
      for (var i = 0; i < objetivo_meta.length; i++) {
        cd_objetivo = objetivo_meta[i].cd_objetivo_projeto;
        objetivos[cd_objetivo] = objetivo_meta[i].tx_nome_objetivo_projeto ;
      }

      $.ajax({
        url: rotas.Objetivos(),
        type: 'GET',
        dataType: 'json',
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){

          if (objetivos != ""){

            for(var k in objetivos){
              criarObjetivos(id, objetivos[k], k, cd_metas, data);
              carregaEventoMetas(project, id, data);
            }

          } else {
            criarObjetivos(id, "", cd_objetivo, cd_metas, data);
            carregaEventoMetas(project, id, data);
          }
          add_botao_objetivo(id, data);

        }

      });
    }

    function add_botao_objetivo(id, data) {
        $('#projeto-'+id).append('<div class="col-md-12" id="objetivos-metas">'+
        '<button id="id_botao-add-objetivo" class="btn-primary btn botao-add-objetivo">Adicionar ODS</button></div>');

        $('#projeto-'+id).find(".botao-add-objetivo").on('click',function(){
          add_objetivo($('#projeto-'+id), id, data, -1);
        });
    }

    function criarObjetivos(id,objetivos,cd_objetivo,cd_metas,data){
      //console.log(cd_objetivo);

      $('#projeto-'+id).append('<div class="col-md-12" id="objetivos-metas-'+cd_objetivo+'"</div>');
      var $divObjetivosProjetoClone = $('#projeto-'+id).find("#objetivos-metas-"+cd_objetivo);
      $divObjetivosProjetoClone.append('<div class="header" title="Indique se o PAP se relaciona com alguns dos objetivos do desenvolvimento sustentável, da ONU.">Objetivos do Desenvolvimento Sustentável - ODS: <span class="glyphicon glyphicon-info-sign" style="visibility:visible;" ></span><a href="http://www.agenda2030.com.br/" target=_blank><img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo." /></a></div>');
      $divObjetivosProjetoClone.append('<div class="form-group"><div id="objetivos-'+cd_objetivo+'"><select class="form-control"></select></div></div>');

        var $selectObjetivos = $divObjetivosProjetoClone.find("select");
        if (cd_objetivo == -1 ) {
          $selectObjetivos.append('<option value=-1 selected id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
        }
        else {
          $selectObjetivos.append('<option value=-1 id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
        }
        for (var i = 0; i < data.length; i++) {
          if(data[i].cd_objetivo_projeto == cd_objetivo){
            $selectObjetivos.append('<option selected id="' + data[i].cd_objetivo_projeto + '">' + data[i].tx_nome_objetivo_projeto + '</option>');
          } else {
            $selectObjetivos.append('<option id="' + data[i].cd_objetivo_projeto + '">' + data[i].tx_nome_objetivo_projeto + '</option>');
          }
        }

        $divObjetivosProjetoClone.find("#objetivos-"+cd_objetivo+" select").selectBoxIt();
        if(cd_objetivo != -1){
          loadMetas(cd_objetivo, cd_metas, id);
        }


        $divObjetivosProjetoClone.find(".metas").each(function(){
          if(!$(this).hasClass('hidden')){
            $(this).toggleClass('hidden');
          }
        });
        //console.log("carregaEventoMetas: "+qtdOdsSecaoProjeto);
        $divObjetivosProjetoClone.append('<div id="metas-'+id+cd_objetivo+'" class="metas"></div>');
        $divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).append('<br><div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></div><br>');
        $divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).append('<ol id="selectable-'+id+"-"+cd_objetivo +"-"+qtdOdsSecaoProjeto+'" class="selectable"></ol><br>');
        if($divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).hasClass('hidden')){
          $divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).toggleClass('hidden');
        }

        $divMetasProjeto = $("#projeto-"+id).find("#metas-"+id+cd_objetivo);
        $divMetasProjeto.append(/*''+
          '<button id="id_botao-add-objetivo" class="btn-primary btn botao-add-objetivo">Adicionar Objetivo</button>'+*/
          ''+'<button id="id_botao-rem-objetivo-'+cd_objetivo+'" class="btn-danger btn botao-rem-objetivo">Remover ODS</button>');

        $divMetasProjeto.find(".botao-add-objetivo").on('click',function(){

          add_objetivo($('#projeto-'+ido_global),ido_global,data, cd_objetivo);
        });
        $divMetasProjeto.find(".botao-rem-objetivo").on('click',function(){
          rem_objetivo($(this),ido_global);
        });
        $('#projeto-'+id).append($divObjetivosProjetoClone);
    }

    //--Remover Objetivo Projeto--
    function rem_objetivo(thi, id, data){
    //  qtdOdsSecaoProjeto--; //variável global atualizada
      if (util.contains('objetivo',thi.parent()[0].id)) {
        thi.parent().remove();
      } else {
        thi.parent().parent().remove();
      }

      if ( $("#projeto-"+id).find(".botao-add-objetivo").length < 1 ) {
        add_botao_objetivo(id, data);
      }
    }

    //-- Adicionar Objetivo Projeto--
    function add_objetivo(project, id, data, cd_objetivo){
      qtdOdsSecaoProjeto++; // atualiza variável global contendo a n-ésima ODS adicionada
      var objetivo_meta = util.validateObject(project.objetivo_meta, "");
      var objetivo_meta_inicial = util.validateObject(objetivo_meta[0], "");
      var objetivo = util.validateObject(objetivo_meta_inicial.tx_nome_objetivo_projeto, -1);
      var cd_metas = [];
      var metas = [];

      if(objetivo !== -1){
        for (var i = 0; i < objetivo_meta.length; i++) {
          var cd_meta = objetivo_meta[i].cd_meta_projeto;
          var meta = objetivo_meta[i].tx_nome_objetivo_projeto;
          cd_metas.push(cd_meta);
          metas.push(meta);
        }
      }

      project.find('.botao-add-objetivo').remove();
      project.append('<div class="col-md-12" id="objetivos-metas-'+cd_objetivo+'_'+qtdOdsSecaoProjeto+'"</div>');
      var $divObjetivosProjetoClone = project.find("#objetivos-metas-"+cd_objetivo+'_'+qtdOdsSecaoProjeto);
      $divObjetivosProjetoClone.append('<div class="header" title="Indique se o PAP se relaciona com alguns dos objetivos do desenvolvimento sustentável, da ONU.">Objetivos do Desenvolvimento Sustentável - ODS: <span class="glyphicon glyphicon-info-sign" style="visibility:visible;" ></span><a href="http://www.agenda2030.com.br/" target=_blank><img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo." /></a></div>');
      $divObjetivosProjetoClone.append('<div class="form-group"><div id="objetivos_'+cd_objetivo+'_'+qtdOdsSecaoProjeto+'"><select class="form-control"></select></div></div>');

      var $selectObjetivos = $divObjetivosProjetoClone.find("select");
      //console.log(project);
      if (cd_objetivo == -1 ) {
        $selectObjetivos.append('<option value=-1 selected id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
      }
      else {
        $selectObjetivos.append('<option value=-1 id="' + 0 + '">' + "Selecione uma opção..." + '</option>');
      }

      for (var i = 0; i < data.length; i++) {
        if(data[i].cd_objetivo_projeto == cd_objetivo){
          $selectObjetivos.append('<option selected id="' + data[i].cd_objetivo_projeto + '">' + data[i].tx_nome_objetivo_projeto + '</option>');
        } else {
          $selectObjetivos.append('<option id="' + data[i].cd_objetivo_projeto + '">' + data[i].tx_nome_objetivo_projeto + '</option>');
        }
      }

      $divObjetivosProjetoClone.find("#objetivos-"+cd_objetivo+" select").selectBoxIt();

      if(cd_objetivo != -1){
        loadMetas(cd_objetivo, cd_metas, id);
      }

      $divObjetivosProjetoClone.find('select').on('change', function(){
        var bloquear_btn_add = false;
        if($divObjetivosProjetoClone.find('.botao-rem-objetivo').length == 1 && $divObjetivosProjetoClone.find('.botao-add-objetivo').length == 0){
          bloquear_btn_add = true;
        }

        $divObjetivosProjetoClone.find('.botao-add-objetivo').remove();
        $divObjetivosProjetoClone.find('.botao-rem-objetivo').remove();

        //console.log($(this).children(":selected").attr("id"));
        var cd_objetivo = $(this).children(":selected").attr("id");
        //console.log("--> "+cd_objetivo);
        $divObjetivosProjetoClone.find(".metas").each(function(){
          if(!$(this).hasClass('hidden')){
            $(this).toggleClass('hidden');
          }
        });
        //console.log("add_objetivo: "+qtdOdsSecaoProjeto);
        $divObjetivosProjetoClone.append('<div id="metas-'+id+cd_objetivo+'" class="metas"></div>');
        $divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).append('<br><div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></div><br>');
        $divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).append('<ol id="selectable-'+id+"-"+cd_objetivo+"-"+qtdOdsSecaoProjeto+'" class="selectable"></ol><br>');
        if($divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).hasClass('hidden')){
          $divObjetivosProjetoClone.find(('#metas-'+id+cd_objetivo)).toggleClass('hidden');
        }
        if(parseInt(cd_objetivo) !== 0){
          loadMetas(cd_objetivo, [], id);
        }

        if(bloquear_btn_add){
          $divObjetivosProjetoClone.append('<button id="id_botao-rem-objetivo-'+cd_objetivo+'" class="btn-danger btn botao-rem-objetivo">Remover ODS</button>');
        }
        else{
          $divObjetivosProjetoClone.append('<button id="id_botao-rem-objetivo-'+cd_objetivo+'" class="btn-danger btn botao-rem-objetivo">Remover ODS</button><div class="btn_ODS_add" ><button id="id_botao-add-objetivo" class="btn-primary btn botao-add-objetivo">Adicionar ODS</button></div>');
        }

        $divObjetivosProjetoClone.find(".botao-add-objetivo").on('click',function(){

            add_objetivo($('#projeto-'+ido_global), ido_global, data, -1);
          });
        $divObjetivosProjetoClone.find(".botao-rem-objetivo").on('click',function(){
              rem_objetivo($(this), ido_global, data);
          });
      });

      $('#projeto-'+id).append($divObjetivosProjetoClone);
      verificarContraste();
    }

    function montarObjetivos(json, cd_objetivo){
      var options = json;
      var $selectObjetivos = $divObjetivosProjeto.find("select");
      if (cd_objetivo == -1 ) {
        $selectObjetivos.append('<option value=-1 selected id="' + 0 + '">Selecione uma opção...</option>');
      }
      else {
        $selectObjetivos.append('<option value=-1 id="' + 0 + '">Selecione uma opção...</option>');
      }
      for (var i = 0; i < options.length; i++) {
        if(options[i].cd_objetivo_projeto == cd_objetivo){
          $selectObjetivos.append('<option selected id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        } else {
          $selectObjetivos.append('<option id="' + options[i].cd_objetivo_projeto + '">' + options[i].tx_nome_objetivo_projeto + '</option>');
        }
      }
    }

    function loadMetas(cd_objetivo, cd_metas, project_id){
      var id = cd_objetivo;
      if(cd_objetivo<1){
        id = "";
      }
      $.ajax({
        url: rotas.MetaProjeto(id),
        type: 'GET',
        dataType: 'json',
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          montarMetas(data, cd_objetivo, cd_metas, project_id);
        }
      });
    }

    function carregaEventoMetas(project, id, data){
      //qtdOdsSecaoProjeto++;
      $('.objetivos').find('select').on('change', function(){
        var cd_objetivo = $(this).children(":selected").attr("id");
        var $divObjetivosMetasProjeto = $(this).parents("#objetivos-metas");
        $divObjetivosMetasProjeto.find(".metas").each(function(){
          if(!$(this).hasClass('hidden')){
            $(this).toggleClass('hidden');
          }
        });
        //console.log("carregaEventoMetas: "+qtdOdsSecaoProjeto);
        $divObjetivosMetasProjeto.find(".metas").remove();
        $divObjetivosMetasProjeto.append('<div id="metas-'+cd_objetivo+'" class="metas"></div>');
        $('#metas-'+cd_objetivo).append('<br><div class="header" title="Marque as metas que se enquadram neste projeto">Metas Relacionadas ao ODS definido:<span class="glyphicon glyphicon-info-sign" style="visibility:visible;"></span></div><br>');
        $('#metas-'+cd_objetivo).append('<ol id="selectable-'+id+"-"+cd_objetivo +"-"+qtdOdsSecaoProjeto+'" class="selectable"></ol><br>');
        $('#metas-'+cd_objetivo).append(''+
        '<button id="id_botao-add-objetivo" class="btn-primary btn botao-add-objetivo">Adicionar ODS</button>'+
        ''+'<button id="id_botao-rem-objetivo-'+cd_objetivo+'" class="btn-danger btn botao-rem-objetivo">Remover ODS</button>');

        $('#metas-'+cd_objetivo).find(".botao-add-objetivo").on('click',function(){
          add_objetivo($('#projeto-'+id), id, data, cd_objetivo);
        });

        $('#metas-'+cd_objetivo).find(".botao-rem-objetivo").on('click',function(){
          rem_objetivo($(this), id, data);
        });

        if($('#metas-'+cd_objetivo).hasClass('hidden')){
          $('#metas-'+cd_objetivo).toggleClass('hidden');
        }
        if(parseInt(cd_objetivo) !== 0){
          qtdOdsSecaoProjeto++;
          loadMetas(cd_objetivo, [], id);
        }

        verificarContraste();
      });
    }

    function montarMetas(data, cd_objetivo, cd_metas, project_id){
      if (util.validateObject(data, false)){
        var checkboxItems = [];
        function CheckboxItem(id, label, value, type, checked){
          this.id = id;
          this.label = label;
          this.value = value;
          this.type = type;
          this.checked = checked;
        }

        var items = data;
        //console.log(items);
        //console.log(cd_metas);
        for (var i=0; i<items.length; i++){
          var checkboxItem = null;
          if(cd_metas.includes(items[i].cd_meta_projeto)){
            checkboxItem = new CheckboxItem(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].cd_meta_projeto, "checkbox", true);
            checkboxItems.push(checkboxItem);
          } else {
            checkboxItem = new CheckboxItem(items[i].cd_meta_projeto, items[i].tx_nome_meta_projeto, items[i].cd_meta_projeto, "checkbox", false);
            checkboxItems.push(checkboxItem);
          }
        }
        //console.log("montar metas: "+qtdOdsSecaoProjeto);
        Checkbox = React.createFactory(Checkbox);
        ReactDOM.render(
          Checkbox(
            {dados:checkboxItems}
          ), document.getElementById("selectable-"+project_id+"-"+cd_objetivo+"-"+qtdOdsSecaoProjeto)
        );

      }
  }

    function clique(){
      var jsonModalAjuda = dadosForm.jsonModalAjuda();
      $(".ajuda").on("click", function(){
        util.abrirModalAjuda($(this).attr("data"), jsonModalAjuda);
      });
    }

    function loading(valor){
      var valor_a =  parseInt(($("#modal_loading .progress").width() / 12) * valor);
      var valor_p = parseInt((valor_a * 100) / $("#modal_loading .progress").width());

      $("#modal_loading .progress-bar").css("width", valor_a);
      $("#modal_loading .progress-bar").attr('aria-valuenow',valor_p);
    }

    // Cancelar
    $("#cancelar").click(function(){
      window.location.href='/visualizar-osc.html#/'+idOsc;
    });

    // Salvar
    $("#salvar").click(function(){
      $("#modal_loading").modal('show');

      setTimeout(function(){
          salvar_tudo();
      }, 1000);

    });

    // Salvar
    function salvar_tudo(){

      var barra = 0;

      var success="";//guarda mensagens dos saves das secoes da pagina
      //Dados Gerais
      var newJson = {};

      //newJson = util.validateObject(old_json.dados_gerais, {});
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;

      $("#dados_gerais input:not(:checkbox)").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        newJson[key] = value;
      });

      $("#dados_gerais textarea").each(function(){
        var key = $(this).attr("id");
        var value = $(this).val();
        newJson[key] = value;
      });

      $("#tx_nome_situacao_imovel_osc").each(function(){
          var value = $(this).val();
          if(value === "Próprio"){
            newJson["cd_situacao_imovel_osc"] = 1
          }
          else if(value === "Alugado"){
            newJson["cd_situacao_imovel_osc"] = 2
          }
          else if(value === "Cedido"){
            newJson["cd_situacao_imovel_osc"] = 3
          }
          else if(value === "Comodato"){
            newJson["cd_situacao_imovel_osc"] = 4
          }
          else{
            newJson["cd_situacao_imovel_osc"] = null;
          }
      });

      newJson["bo_nao_possui_sigla_osc"] = $("#tx_sigla_osc").parent().parent().find('input[type="checkbox"]').is(':checked');
      newJson["bo_nao_possui_email"] = $("#tx_email").parent().parent().find('input[type="checkbox"]').is(':checked');
      newJson["bo_nao_possui_site"] = $("#tx_site").parent().parent().find('input[type="checkbox"]').is(':checked');

      newJson["objetivo_metas"] = [];
      $("#objetivosOsc-metas :input:checkbox").each(function(){
        if($(this).prop("checked")){
          var codigo = $(this).attr('value');
          newJson["objetivo_metas"].push({
            "cd_meta_osc": codigo,
          });
        }
      });

      var imgSrc = $("#imagemLogo").attr("src");
      if(imgSrc == "img/camera.jpg" || imgSrc == null || imgSrc == undefined){
        newJson["im_logo"] = null;
      }
      else{
          newJson["im_logo"] = imgSrc;
      }

      success = util.carregaAjax(rotas.DadosGerais(idOsc), 'POST', newJson);
      loading(barra += 1);

      //Áreas de atuação
      newJson = util.validateObject(old_json.area_atuacao, {});
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      newJson["area_atuacao"] = [];

      var suggestions = dadosForm.getSuggestions();
      $("#areas_de_atuacao .autocomplete").each(function(){
        var cd_area = 0;
        for (var i = 0; i < suggestions.length; i++) {
          if($(this).val().trim().toLowerCase() === suggestions[i].tx_nome_area_atuacao.trim().toLowerCase()){
            cd_area = suggestions[i].cd_area_atuacao;
          }
        }

        var macro_area_id = $(this).attr("id").substring(11);
        var idMacroAreaOutros = $("#macro_area_"+macro_area_id+"_outros").val();

        var obj_area_atuacao = {
          "cd_area_atuacao": cd_area.toString(),
          "tx_nome_area_atuacao_outra": ($(this).val() === "Outros") ? idMacroAreaOutros : null
        }

        var subareas = [];
        $(this).siblings(".checkboxList").children(":not(.hidden)").each(function(index){
          $(this).find("input:checked").each(function(){
            var labelOutros = $(this).closest("label").text();
            var isLabelOutros = ($(this).closest("label").text() === "Outros");
            subareas.push({
                "tx_nome_subarea_atuacao_outra": isLabelOutros ? $("#sub_area_"+macro_area_id+"_outros").val() : null,
                "cd_subarea_atuacao": $(this).val()
                //"ft_area_atuacao": "Representante de OSC"
              });
          });

          if(subareas.length <= 0){
            subareas = null;
          }
          obj_area_atuacao.subarea_atuacao = subareas;
          newJson.area_atuacao.push(obj_area_atuacao);
          //newJson.area_atuacao
        });
        if(newJson.area_atuacao.length == 0){
          newJson.area_atuacao.push({
            "cd_area_atuacao": 0,
            "tx_nome_area_atuacao_outra": null,
            "subarea_atuacao": null
          });
        }
      });
      //console.log(newJson);
      success = util.carregaAjax(rotas.AtualizarAreaAtuacao(idOsc), 'POST', newJson);
      loading(barra += 1);

      //Descricao
      newJson = util.validateObject(old_json.descricao, {});
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      newJson["descricao"] = [];

      $("#descricao textarea").each(function(){
        newJson[$(this).attr("id")] = $(this).val();
      });

      newJson["bo_nao_possui_link_estatuto_osc"] = $("#tx_link_estatuto_osc").parent().parent().find('input[type="checkbox"]').is(':checked');

      success = util.carregaAjax(rotas.Descricao(idOsc), 'POST', newJson);
      loading(barra += 1);

      //Certificacoes
      newJson = util.validateObject(old_json.certificado, {});
      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;
      newJson["certificado"] = [];

      $('#tabela_titulos_certificados tbody tr').each(function(i){
        var cd_certificado = 0;
        var cert = $(".tipo_titulo_certificado",this).text();
        switch($(".tipo_titulo_certificado",this).text()){
          case "Utilidade Pública Estadual":
            cd_certificado = 7;
            break;
          case "Utilidade Pública Municipal":
            cd_certificado = 8;
            break;
          case "Utilidade Pública Federal":
            cd_certificado = 5;
            break;
          case "Entidade Ambientalista":
            cd_certificado = 1;
            break;
          case "CEBAS - Educação":
            cd_certificado = 2;
            break;
          case "CEBAS - Saúde":
            cd_certificado = 3;
            break;
          case "OSCIP":
            cd_certificado = 4;
            break;
          case "CEBAS - Assistência Social":
            cd_certificado = 6;
            break;
        }


        var item = {};
        var fonte_dados = $(".tipo_titulo_certificado span",this).attr("title");
        //item.dt_inicio_certificado = null;
        item.bo_oficial = (fonte_dados == "Representante de OSC" || fonte_dados == "Representante" ) ? false : true;
        item.dt_inicio_certificado = ($(".data_inicio_validade_titulo_certificado",this).text() != 'Não informado') ? $(".data_inicio_validade_titulo_certificado",this).text() : '' ;
        item.dt_fim_certificado = $(".data_fim_validade_titulo_certificado",this).text();
        item.ft_certificado = fonte_dados//authHeader.User;
        item.ft_inicio_certificado = fonte_dados//authHeader.User;
        item.ft_fim_certificado = fonte_dados//authHeader.User;
        item.ft_local_certificado = fonte_dados//authHeader.User;
        item.cd_certificado = cd_certificado;
        if (cd_certificado == 7) {
          item.cd_uf = $(".local_titulo_certificado",this).attr("data-cod");
        }
        else if (cd_certificado == 8) {
          item.cd_municipio = $(".local_titulo_certificado",this).attr("data-cod");
        }

        item.id_certificado = $(this).prop("id");
        //console.log(item);

        if(cd_certificado > 0){
          newJson.certificado.push(item);
        }
      });

      newJson["bo_nao_possui_certificacoes"] = $('#certificacoes input[type="checkbox"]').is(':checked');


      newJson["headers"] = authHeader;
      newJson["id_osc"] = idOsc;

      success = util.carregaAjax(rotas.Certificado(idOsc), 'POST', newJson);
      loading(barra += 1);

        // Relações de trabalho
        //Governanca
        newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["governanca"] = [];
        var item = {};
        $("#dirigentes").find("input").each(function(i){
          if ($(this)[0].value){
            if ((i % 2)==0){
              item.id_dirigente = $(this).attr("id") ? $(this).attr("id") : null;
              item.tx_nome_dirigente = $(this)[0].value;
              item.ft_nome_dirigente = "Representante de OSC"; //authHeader.User;
            } else {
              item.tx_cargo_dirigente = $(this)[0].value;
              item.ft_cargo_dirigente = "Representante de OSC"; //authHeader.User;
              newJson.governanca.push(item);
              item = {};
            }
          }
        });
        if(newJson['governanca'].length == 0){
          newJson['governanca'] = null;
        }

        success = util.carregaAjax(rotas.Dirigente(idOsc), 'POST', newJson);
        loading(barra += 1);

        //Conselho Fiscal
        newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["conselho_fiscal"] = [];

        $("#conselho_fiscal").find("input").each(function(){
          if ($(this)[0].value){
            var item = {};
            item.id_conselheiro = $(this).attr("id") ? $(this).attr("id") : null ;
            item.tx_nome_conselheiro = $(this)[0].value;
            item.ft_nome_conselheiro = "Representante de OSC"; //authHeader.User;
            newJson.conselho_fiscal.push(item);
          }
        });

        if(newJson['conselho_fiscal'].length == 0){
          newJson['conselho_fiscal'] = null;
        }

        success = util.carregaAjax(rotas.ConselhoFiscal(idOsc), 'POST', newJson);
        loading(barra += 1);

        //Trabalhadores
        newJson["nr_trabalhadores_voluntarios"] =  $('#voluntarios').val();
        success = util.carregaAjax(rotas.RelacoesTrabalho(idOsc), 'POST', newJson);
        loading(barra += 1);

        // Participacao social
        // Conselho
        var lforma = [];
        lforma = ajaxConsulta(rotas.Titularidade(), false);

        var lconselho =[];
        lconselho = ajaxConsulta(rotas.Conselho(), false);

        var lperiodicidadeReuniao =[];
        lperiodicidadeReuniao = ajaxConsulta(rotas.PeriodicidadeReuniao(), false);

        //conselho
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["conselho"] = [];
        newJson["bo_nao_possui_conselhos"] = $('#conselhos input[type="checkbox"]').is(':checked');

        $(".conselho").each(function(){
         var obj = {}
         obj.conselho = {};
         obj.representante = [];
         var cd_conselho = 0;
         var conselho_id = 0;

         $(this).find("select").each(function(){
           var split = $(this).attr("id").split("-");
           var campo = split[0];
           //console.log(campo);
           conselho_id = parseInt($(this).attr("id").split("-")[1]);
           if(conselho_id == 0){
            obj.conselho.id_conselho = null;
           }else{
            obj.conselho.id_conselho = conselho_id;
           }

           for (var i=0;i<lconselho.length;i++){
             if ($(this).val() === lconselho[i].tx_nome_conselho){
               obj.conselho.cd_conselho = lconselho[i].cd_conselho;
               cd_conselho = obj.conselho.cd_conselho;

               break;
            }
           }
           for (var i=0;i<lforma.length;i++){
             if ($(this).val() === lforma[i].tx_nome_tipo_participacao){
               obj.conselho.cd_tipo_participacao = lforma[i].cd_tipo_participacao;
               break;
             }
           }

           for (var i=0;i<lperiodicidadeReuniao.length;i++){
             if ($(this).val() === lperiodicidadeReuniao[i].tx_nome_periodicidade_reuniao_conselho){
               obj.conselho.cd_periodicidade_reuniao_conselho = lperiodicidadeReuniao[i].cd_periodicidade_reuniao_conselho;
               break;
             }
           }

         });

         $(this).find("input").each(function(index){
           var split = $(this).attr("id").split("-");
           var campo = split[0];
           //console.log("v: "+$(this).val());
           if(obj.conselho.cd_conselho !== 0){
             if (campo == "outro_conselho" && $(this).val() != ''){
                obj.conselho.tx_nome_conselho_outro = $(this).val();
             }
             if(campo == "tx_nome_representante_conselho" && $(this).val() != ''){

               obj.representante.push(
                 {
                  "tx_nome_representante_conselho": $(this).val()
                });
             }
           }
           if (campo == "dt_data_inicio_conselho" && $(this).val() != ''){
              obj.conselho.dt_data_inicio_conselho = $(this).val();
           }
           if (campo == "dt_data_fim_conselho" && $(this).val() != ''){
              obj.conselho.dt_data_fim_conselho = $(this).val();
           }
         });


         if(obj.representante.length !== 0 && util.validateObject(obj.conselho.cd_conselho,null)!==null){
          newJson.conselho.push(obj);
         }

        });

        if(Object.keys(newJson.conselho).length == 0){
          newJson.conselho = null;
        }

        success = util.carregaAjax(rotas.ParticipacaoSocialConselho(idOsc), 'POST', newJson);
        loading(barra += 1);

        // Conferência
        var lista_forma_conferencia = [
        'Membro de comissão organizadora nacional', 'Membro de comissão organizadora estadual ou distrital', 'Membro de comissão organizadora municipal',
  'Delegado para etapa nacional','Delegado para etapa estadual ou distrital','Participante de etapa municipal','Participante de conferência livre ou virtual',
  'Palestrante ou convidado','Observador','Mediador, moderador ou relator','Outro'];
        var lista_forma_conferencia_id = [1,2,3,4,5,6,7,8,9,10,11];

        var lconferencia ={};

        $.ajax({
          url: rotas.Conferencia(),
          type: 'GET',
          async: false,
          dataType: 'json',
          error:function(e){
            console.log("Erro no ajax: ");
            console.log(e);
          },
          success: function(data){
            lconferencia = data;
            loading(barra += 1);
          }
        });

        //conferencia
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["conferencia"] = [];
        newJson["bo_nao_possui_conferencias"] = $('#conferencias input[type="checkbox"]').is(':checked');

        $(".conferencia").each(function(){
           var obj = {};
           var conferencia_id = 0;
           // Busca nos selects
           $(this).find("select").each(function(){
             var split = $(this).attr("id").split("-");
             var campo = split[0];

            for (var i=0;i<lconferencia.length;i++){
             if ($(this).val() === lconferencia[i].tx_nome_conferencia){
               obj["cd_conferencia"] = lconferencia[i].cd_conferencia;
               conferencia_id = parseInt($(this).attr("id").split("-")[1]);
               obj.tx_nome_conferencia = ""; //Existe -- Depois será atribuído caso
               break;
              }
            }

            for (var i=0;i<lista_forma_conferencia.length;i++){
              if ($(this).val() === lista_forma_conferencia[i]){
                 obj["cd_forma_participacao_conferencia"] = lista_forma_conferencia_id[i];
                 break;
              }
            }
           });

          // Busca nos inputs
          $(this).find("input").each(function(){
             var split = $(this).attr("id").split("-");
             var campo = split[0];
              if (campo == "outro_conferencia" && $(this).val() != ''){
                obj.tx_nome_conferencia_outra = $(this).val();
             }

             for (var i=0;i<lconferencia.length;i++){
               // Código Conferência
               if ($(this).val() === lconferencia[i].tx_nome_conferencia){
                 obj["cd_conferencia"] = lconferencia[i].cd_conferencia;
                 break;
                }
             }
             for (var i=0;i<lista_forma_conferencia.length;i++){
               // Forma de Participação
               if ($(this).val() === lista_forma_conferencia[i]){
                 obj["cd_forma_participacao_conferencia"] = lista_forma_conferencia_id[i];
                 break;
                }
              }
              if ( util.contains("19",$(this).val()) ||  util.contains("20",$(this).val()) ){
                 // Data Participaçao
                obj["dt_ano_realizacao"] = $(this).val();
              }
          });

          if (!$.isEmptyObject(obj)){
            if (conferencia_id != 0) {
              obj["id_conferencia"] = conferencia_id;
            }else {
              obj["id_conferencia"] = null;
            }
            newJson.conferencia.push(obj);
          }
        });

        if(Object.keys(newJson.conferencia).length == 0){
          newJson.conferencia = null;
        }

        success = util.carregaAjax(rotas.ParticipacaoSocialConferencia(idOsc), 'POST', newJson);
        loading(barra += 1);

        // Outros espaços
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        newJson["outra"] = [];
        newJson["bo_nao_possui_outros_part"] = $('#outros_part input[type="checkbox"]').is(':checked');

        $("#outros_part").find("div").children(".form-group").each(function(){
          $(this).find("input").each(function(){
            var split = $(this).attr("id").split("-");
            var campo = split[0];
            var val;
            if (!($(this).val() === "")) {
              var obj = {};
              obj[campo]=$(this).val();
              newJson["outra"].push(obj);
            }
          });
        });

        if(Object.keys(newJson.outra).length == 0){
          newJson.outra = null;
        }

        success = util.carregaAjax(rotas.OutraParticipacaoSocial(idOsc), 'POST', newJson);
        loading(barra += 1);

        //Projetos
        salvarProjetos();
        // Fonte de recursos
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;
        $("#recursos").children().each(function(){
          //newJson["fonte_recursos"] = [];
          var ano = $(this).find("select").val();
          var nao_possui = $('#recursos_geral-'+ano+' input[type="checkbox"]').is(':checked');
          var nao_possui_rec_pub = $('#recursos_publicos-'+ano+' input[type="checkbox"]').is(':checked');
          var nao_possui_rec_pro = $('#recursos_proprios-'+ano+' input[type="checkbox"]').is(':checked');
          var nao_possui_rec_pri = $('#recursos_privados-'+ano+' input[type="checkbox"]').is(':checked');
          var nao_possui_rec_nao_fin = $('#recursos_nao_financeiros-'+ano+' input[type="checkbox"]').is(':checked');

          //var obj = {};
          newJson["dt_ano_recursos_osc"] = ano;
          newJson["bo_nao_possui"] = nao_possui;

          newJson["nao_possui_recursos_proprios"] = nao_possui_rec_pro;
          newJson["nao_possui_recursos_publicos"] = nao_possui_rec_pub;
          newJson["nao_possui_recursos_privados"] = nao_possui_rec_pri;
          newJson["nao_possui_recursos_nao_financeiros"] = nao_possui_rec_nao_fin;

          if(nao_possui){
            newJson["nao_possui_recursos_proprios"] = true;
            newJson["nao_possui_recursos_publicos"] = true;
            newJson["nao_possui_recursos_privados"] = true;
            newJson["nao_possui_recursos_nao_financeiros"] = true;
          }

          newJson["recursos"] = [];

          if(!nao_possui){
            $(this).find('input:not([type="checkbox"])').each(function(){
              var obj2 = {};
              var valorRecurso = $(this).val().replace(/\./g,"");
              valorRecurso = valorRecurso.replace(/,/g,"\.");
              if(valorRecurso != ""){
                obj2.cd_fonte_recursos_osc = $(this).attr("id");
                obj2.nr_valor_recursos_osc = parseFloat(valorRecurso);
                newJson.recursos.push(obj2);
              }
            });
          }
          success = util.carregaAjax(rotas.AtualizarFontesRecursos(idOsc), 'POST', newJson);
          newJson = {};
          newJson["headers"] = authHeader;
          newJson["id_osc"] = idOsc;
          loading(barra += 1);
        });
        //console.log(newJson);

      $("#modal_loading").modal('hide');
      var jsonSalvoSucesso = {"Salvo com sucesso!":"Suas alterações serão processadas aproximadamente em instantes.<br><br>Obrigado!"};
      util.abrirModalAjuda("Salvo com sucesso!", jsonSalvoSucesso);
    }

    function localizacao(divId, abrangencia){
      var routes="";
      var abrang=abrangencia.toLowerCase();
      var limiteAutocomplete = 10;
      var limiteAutocompleteCidade = 25;

      $('#' + divId + ' #localizacao_projeto .form-control').autocomplete({
        minLength: 3,
        source: function (request, response) {
          if ((abrang == 'estadual') || (abrang == 'municipal') || (abrang == '-1')){
            routes = rotas.AutocompleteOSCByCounty(util.replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocompleteCidade);
          }
          else if ((abrang == 'regional')|| (abrang == 'nacional')){
            routes = rotas.AutocompleteOSCByState(util.replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete);
          }
          if ( routes != "" ) {
            var data = ajaxAutoComplete(routes, false);
            response($.map( data, function( item ) {
              if ((abrang == 'estadual') || (abrang == 'municipal') || (abrang == '-1')) {
                 return {
                    label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                    value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                    id: item.edmu_cd_municipio
                };
              }
              else if ((abrang == 'regional') || (abrang == 'nacional')){
                return {
                    label: item.eduf_nm_uf,
                    value: item.eduf_nm_uf,
                    id: item.eduf_cd_uf
                };
              }
            }));
          }
        }
     });
   }

   function localizacaoTit(abrangencia){

  }

   function validaCNPJ(cnpj) {
     cnpj = cnpj.toString().replace(/[^\d]+/g,"");
     if((cnpj == '')|| (cnpj.length != 14)) return false;
     // Valida DVs
     var tamanho = cnpj.length - 2
     var numeros = cnpj.substring(0,tamanho);
     var digitos = cnpj.substring(tamanho);
     var soma = 0;
     var pos = tamanho - 7;
     for (var i = tamanho; i >= 1; i--) {
       soma += numeros.charAt(tamanho - i) * pos--;
       if (pos < 2)
          pos = 9;
     }
     var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
     if (resultado != digitos.charAt(0))
         return false;

     tamanho = tamanho + 1;
     numeros = cnpj.substring(0,tamanho);
     soma = 0;
     pos = tamanho - 7;
     for (var i = tamanho; i >= 1; i--) {
       soma += numeros.charAt(tamanho - i) * pos--;
       if (pos < 2)
          pos = 9;
     }
     resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
     if (resultado != digitos.charAt(1))
           return false;

     return true;
   }

   function osc_parceira(i){
       var nome_osc ='';
       var id_osc_parceira='';
       $('#osc_parceira').find('input').autocomplete({
       source: function (request, response) {
         var cnpj = ($(this)[0].term);
         if (!validaCNPJ(cnpj)) {
           //$('#osc_parceira').find('input')[i].value = "Valor de CNPJ inválido!";
         }
         else {
            var data = ajaxAutoComplete(rotas.AutocompleteOSCByCnpj(util.replaceSpecialChars(cnpj).replace(/ /g, '+'), 10/*limiteAutocomplete*/), false);
           if (data == null){
               $('#osc_parceira').find('input')[i].value = "Entidade não cadastrada! ";
           }else{
             nome_osc = data[0].tx_nome_osc;
             id_osc_parceira = data[0].id_osc;
             $('#osc_parceira').find('input')[i].value = nome_osc;
             $('#osc_parceira').find('input')[i].id_osc_parceira=id_osc_parceira;
           }

         }
       }
     })
   }

    function salvarProjetos(){
      // Projetos
      var listaProjetos = [];
      var idProjeto = 0;

      function getDataFromForm($elementos, formulario){
        var obj = [];
        var auxArr = [];
        $elementos.each(function() {
          var $pai = $(this).closest(".form-group");
          var valor = $(this).val();

          if(valor === "-1"){
            valor = "";
          }
          if($pai.attr("id") === undefined){
            $pai = $(this).parent();
          }
          if($(this).closest(".metas").length > 0){
            $pai = $(this).closest(".metas")[0];
            if(obj["objetivo_meta"] === undefined){
              obj["objetivo_meta"] = [];
            }
            if($(this).prop("checked")){
              obj["objetivo_meta"].push({
                "cd_meta_projeto": valor
              });
            }
          }
          else if( $pai.attr("id") === "fonte_recursos"){
            if(obj[$pai.attr("id")] === undefined){
              obj[$pai.attr("id")] = [];
            }

            var cod_fonte_recurso = null;
            if($(this).prop("checked")){
                var valorFonteRecurso = $(this).val();

                switch(valorFonteRecurso) {
                   case "Recursos públicos":
                       cod_fonte_recurso = 1;
                       break;
                   case "Recursos privados":
                       cod_fonte_recurso = 2;
                       break;
                   case "Recursos não financeiros":
                       cod_fonte_recurso = 3;
                       break;
                   case "Recursos próprios":
                       cod_fonte_recurso = 4;
                       break;
                   default:
                       cod_fonte_recurso = null;
               }

               if(obj[$pai.attr("id")] != null){

                 obj[$pai.attr("id")].push({
                  "cd_origem_fonte_recursos_projeto": cod_fonte_recurso
                  });
               }
            }

          }
          else if( $pai.attr("id") === "tipo_parceria"){
              if(obj[$pai.attr("id")] === undefined){
                obj[$pai.attr("id")] = [];
              }

              var cod_tipo_parceria = null;

            if(obj["fonte_recursos"][0]){

              if(obj["fonte_recursos"][0].cd_origem_fonte_recursos_projeto == 1 && $(this).prop("checked")){
                var tipo_parceria = $(this).val();

                switch(tipo_parceria) {
                   case "Termo de fomento":
                       cod_tipo_parceria = 0;
                       break;
                   case "Termo de colaboração":
                       cod_tipo_parceria = 1;
                       break;
                   case "Termo de parceria":
                       cod_tipo_parceria = 2;
                       break;
                   case "Contrato de gestão":
                       cod_tipo_parceria = 3;
                       break;
                   case "Convênio":
                       cod_tipo_parceria = 4;
                       break;
                   case "Acordo de cooperação técnica":
                       cod_tipo_parceria = 5;
                       break;
                   case "Outro":
                       cod_tipo_parceria = 6;
                       break;
                   default:
                       cod_tipo_parceria = null;
              }

              if(obj[$pai.attr("id")] != null){

                obj[$pai.attr("id")].push({
                  "cd_tipo_parceria_projeto": cod_tipo_parceria
                 });
              }
            }
          }

          }
          else if( $pai.attr("id") === "area_atuacao_outra"){
            if(Array.isArray(obj[$pai.attr("id")])){
              obj[$pai.attr("id")].push({
                "cd_area_atuacao_projeto": $(this).attr("id") ? $(this).attr("id") : null,
                "tx_area_atuacao_projeto": valor
              });
            }
            else {
              obj[$pai.attr("id")] = [];
              obj[$pai.attr("id")].push({
                "cd_area_atuacao_projeto": $(this).attr("id") ? $(this).attr("id") : null,
                "tx_area_atuacao_projeto": valor
              });
            }
          }
          else if ($pai.attr("id") != null && $pai.attr("id").match('objetivos') != null && $pai.attr("id").match('objetivos').length > 0){

          }
          else if(($pai.attr("id") === "tx_nome_status_projeto")){
            var cd_status_projeto = null;
            if(valor === "Proposta"){
              cd_status_projeto = 1;
            }
            if(valor === "Projeto em andamento"){
              cd_status_projeto = 2;
            }
            if(valor === "Finalizado"){
              cd_status_projeto = 3;
            }
            if(valor === "Arquivado, cancelado ou indeferido"){
              cd_status_projeto = 5;
            }
            if(valor === "Outro"){
              cd_status_projeto = 4;
            }
            obj["cd_status_projeto"] = cd_status_projeto;
          }
          else if(($pai.attr("id") === "tx_nome_abrangencia_projeto")){
            var cd_abrangencia_projeto = null;
            if(valor === "Municipal"){
              cd_abrangencia_projeto = 1;
            }
            if(valor === "Estadual"){
              cd_abrangencia_projeto = 2;
            }
            if(valor === "Regional"){
              cd_abrangencia_projeto = 3;
            }
            if(valor === "Nacional"){
              cd_abrangencia_projeto = 4;
            }
            obj["cd_abrangencia_projeto"] = cd_abrangencia_projeto;
          }
          else if(($pai.attr("id") === "tx_nome_zona_atuacao")){
            var cd_zona_atuacao_projeto = null;
            if(valor === "Urbana"){
              cd_zona_atuacao_projeto = 1;
            }
            if(valor === "Rural"){
              cd_zona_atuacao_projeto = 2;
            }
            obj["cd_zona_atuacao_projeto"] = cd_zona_atuacao_projeto;
          }
          else if(($pai.attr("id") === "localizacao_projeto")){
            var localizacoes = [];
            var localizacao = {};
            var $inputs = $pai.find("input");
            $inputs.each(function(){
              if($(this).val() !== ""){
                localizacao = {};
                localizacao.tx_nome_regiao_localizacao_projeto = $(this).val();
                localizacoes.push(localizacao);
              }
            });
            obj["localizacao"] = localizacoes.length > 0 ? localizacoes : null;
          }
          else if(($pai.attr("id") === "publico_beneficiado")){
            var publicos_beneficiados = [];
            var publico_beneficiado = {};
            var $inputs = $pai.find("input");
            $inputs.each(function(){
              if($(this).val() !== ""){
                publico_beneficiado = {};
                publico_beneficiado.tx_nome_publico_beneficiado = $(this).val();
                publicos_beneficiados.push(publico_beneficiado);
              }
            });
            obj["publico_beneficiado"] = publicos_beneficiados.length > 0 ? publicos_beneficiados : null;
          }
          else if(($pai.attr("id") === "financiador_projeto")){
            var financiadores = [];
            var financiador = {};
            var $inputs = $pai.find("input");
            $inputs.each(function(){
              if($(this).val() !== ""){
                financiador = {};
                financiador.tx_nome_financiador = $(this).val();
                financiadores.push(financiador);
              }
            });
            obj["financiador_projeto"] = financiadores.length > 0 ? financiadores : null;
          }
          else if(($pai.attr("id") === "osc_parceira")){
            var osc_parceiras = [];
            var osc_parceira = {};
            var $inputs = $pai.find("input");
            $inputs.each(function(){
              if($(this).val() !== ""){
                osc_parceira = {};
                osc_parceira.id_osc = $(this)[0].id_osc_parceira ? $(this)[0].id_osc_parceira : null;
                osc_parceiras.push(osc_parceira);
              }
            });
            if (osc_parceiras == null) {
              obj["osc_parceira"] = null;
            }
            else{
              obj["osc_parceira"] = osc_parceiras.length > 0 ? osc_parceiras : null;
            }
          }
          else {
            obj[$pai.attr("id")] = valor;
          }
        });

        if(formulario == "input"){
          if(obj["fonte_recursos"] === undefined || obj["fonte_recursos"].length == 0){
            obj["fonte_recursos"] = null;
          }

          if(obj["tipo_parceria"] === undefined || obj["tipo_parceria"].length == 0){
            obj["tipo_parceria"] = null;
          }
        }

        obj["bo_nao_possui_projetos"] = $('#projetos .pro input[type="checkbox"]').is(':checked');

        return obj;
      }

      $(".projeto").each(function(){
        var newJson = {};
        newJson["headers"] = authHeader;
        newJson["id_osc"] = idOsc;

        if(!$(this).hasClass("projeto-salvo")) {
          var str = $(this).attr("id");
          var id_projeto_text = str.substr(0,str.indexOf('-'));
          var id_projeto = str.substr(str.indexOf('-')+1);
          var idProjetoExterno = $($(this).find("div")[0]).attr("id");
          idProjeto = Number(id_projeto);
          idProjetoExterno =  idProjetoExterno ? idProjetoExterno : null;

          newJson = $.extend({}, newJson, getDataFromForm($(this).find("input"), "input"));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("textarea"),"textarea"));
          newJson = $.extend({}, newJson, getDataFromForm($(this).find("select"), "select" ));

          if(newJson["objetivo_meta"] === undefined){
            newJson["objetivo_meta"] = null;
          }
          if(idProjeto < 0){
            newJson["id_projeto"] = null;
            newJson["tx_identificador_projeto_externo"] = idProjetoExterno;
            var arrayCampos = ['localizacao', 'publico_beneficiado', 'financiador_projeto', 'osc_parceira'];
            arrayCampos.map(function(index){
              if (!newJson.hasOwnProperty(index)){
                newJson[index] = null;
              }
            });
            success = util.carregaAjax(rotas.CriarProjectByID(idOsc), 'POST', newJson);

            if(success.msg === "Projeto adicionado."){
              $(this).addClass("hidden");
              $(this).addClass("projeto-salvo");
              $(this).prev().append(" - " + newJson["tx_nome_projeto"]);
            }
          } else {
            newJson["id_projeto"] = idProjeto;
            newJson["tx_identificador_projeto_externo"] = idProjetoExterno;
            arrayCampos = ['localizacao', 'publico_beneficiado', 'financiador_projeto', 'osc_parceira'];
            arrayCampos.map(function(index){
              if (!newJson.hasOwnProperty(index)){
                newJson[index] = null;
              }
            });
            success = util.carregaAjax(rotas.AtualizarProjectByID(idOsc), 'POST', newJson);
          }
        }
      });
    }
  });
});
