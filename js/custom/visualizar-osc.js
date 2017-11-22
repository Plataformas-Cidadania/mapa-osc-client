"use strict";function abrirProjeto(a){var e=$(a).attr("data");$(e).toggle("slow"),$(a).find(".glyphicon").toggleClass("glyphicon-minus"),verificarContraste()}function abrirModalAjuda(a){acionarModalAjuda("Ajuda - "+a,jsonModalAjuda[a],"<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>")}function abrirModalRelatorio(a){var e="<fieldset id='escolhaImpressao'><legend>Escolha quais seções para imprimir</legend>";e+="<label><input type='checkbox' name='escolha' value='tudo' checked> Todas Seções</label><br><br>",e+="<label><input type='checkbox' name='secao' value='dados_gerais' checked> Dados Gerais</label><br>",e+="<label><input type='checkbox' name='secao' value='areas_de_atuacao' checked> Áreas e Subáreas de Atuação da OSC</label><br>",e+="<label><input type='checkbox' name='secao' value='descricao' checked> Descrição da OSC</label><br>",e+="<label><input type='checkbox' name='secao' value='titulacao' checked> Titulações e Certificações</label><br>",e+="<label><input type='checkbox' name='secao' value='relacao_trabalho' checked> Relações de Trabalho e Governança</label><br>",e+="<label><input type='checkbox' name='secao' value='participacao_social' checked> Espaços de Participação Social</label><br>",e+="<label><input type='checkbox' name='secao' value='projetos' checked> Projetos, atividades e/ou programas</label><br>",e+="<div class='subCheckbox'><label><input type='checkbox' name='secaoProjeto' value='todos_projetos'> Todas as Informações do Projeto</label></div>",e+="<label><input type='checkbox' name='secao' value='recursos' checked> Fontes de recursos anuais da OSC</label><br>",e+="<div class='subCheckbox'><label><input type='checkbox' name='secaoRecurso' value='2014'> 2014</label>",e+="<label><input type='checkbox' name='secaoRecurso' value='2015'> 2015</label>",e+="<label><input type='checkbox' name='secaoRecurso' value='2016'> 2016</label>",e+="<label><input type='checkbox' name='secaoRecurso' value='2017'> 2017</label></div>";var o="<button type='button' class='btn btn-success' data-dismiss='modal' onclick='imprimir()'><span class='glyphicon glyphicon-print' aria-hidden='true'></span> Imprimir</button>";acionarModalAjuda("Gerar "+a,e+="</fieldset>",o+="<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>"),$("#escolhaImpressao input:checkbox[name=escolha]").click(function(){$(this).is(":checked")?$("#escolhaImpressao input:checkbox[name=secao]").each(function(){$(this).prop("checked",!0)}):$("#escolhaImpressao input:checkbox[name=secao]").each(function(){$(this).prop("checked",!1)})})}function acionarModalAjuda(a,e,o){$("#modalTitulo").html(""),$("#modalTitulo").html(a),$("#corpoModal").html(""),$("#corpoModal").html(e),$("#btnFooter").html(""),$("#btnFooter").html(o),$("#modalAjuda").modal("show"),verificarContraste()}function imprimir(){$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){valor=$(this).val(),$("#"+valor).hide()}),$("#escolhaImpressao input:checkbox[name=secaoProjeto]").is(":checked")&&$("#projetos").find(".panel-collapse").each(function(){$(this).show(),$(this).parent().find(".glyphicon").toggleClass("glyphicon-minus")}),$("#escolhaImpressao input:checkbox[name=secaoRecurso]:checked").each(function(){var a=$(this).val();$("#recursos").find(".panel-title").each(function(){$(this).text().split(" ")[1]==a&&($(this).parent().parent().parent().find(".panel-collapse").show(),$(this).parent().parent().find(".glyphicon").toggleClass("glyphicon-minus"))})}),$("#modalAjuda").hide(),window.print&&window.print(),$("#escolhaImpressao input:checkbox[name=secaoProjeto]").is(":checked")&&$("#projetos").find(".panel-collapse").each(function(){$(this).hide(),$(this).parent().find(".glyphicon").toggleClass("glyphicon-minus")}),$("#escolhaImpressao input:checkbox[name=secaoRecurso]:checked").each(function(){var a=$(this).val();$("#recursos").find(".panel-title").each(function(){$(this).text().split(" ")[1]==a&&($(this).parent().parent().parent().find(".panel-collapse").hide(),$(this).parent().parent().find(".glyphicon").toggleClass("glyphicon-minus"))})}),$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){valor=$(this).val(),$("#"+valor).show()})}function verificarBotaoEditar(a){util.verificarPermissao(a)&&($(".btnEditar").append('<a id="btnEditar" type="button" title="Clique para Editar"  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar OSC</a>'),$("#btnEditar").attr("href","editar-osc.html#/"+a))}function addLinkVoltar(a){$("#voltaVisualizar").attr("href","visualizar-osc.html#/"+a),urlPagAnterior=document.referrer,-1==urlPagAnterior.indexOf("minhas-oscs")?-1==urlPagAnterior.indexOf("editar-osc")?$("#voltaPagAnterior").text("Mapa"):$("#voltaPagAnterior").text("Editar"):$("#voltaPagAnterior").text("Lista de OSCs")}var idOsc,absUrl,controller=angular.module("oscApp",[]),util=new Util;controller.controller("OscCtrl",["$http","$location","$scope","$filter",function(a,e,o,r){absUrl=e.$$absUrl;var s=this,i=new Rotas;void 0==o.currentPage&&(o.currentPage=0),o.pageSize=10,o.projs=[],o.q="",s.carregarDadosGerais=function(){idOsc=e.absUrl().substr(e.absUrl().lastIndexOf("/")+1),a({url:"js/controller.php",method:"GET",params:{flag:"consulta",rota:i.OSCByID(idOsc)}}).then(function(a){if(void 0==a.data.msg){s.osc=a.data;var e=a.data.projeto;o.projs=void 0!=e?e.projeto:"",s.msg=""}else s.msg=a.data.msg})},o.getData=function(){return r("filter")(o.projs,o.q)},o.numberOfPages=function(){return Math.ceil(o.getData().length/o.pageSize)},o.range=function(){for(var a=[],e=1;e<=o.numberOfPages();e++)a.push(e);return a},o.novaPagina=function(a){o.currentPage=a-1},o.paginaCorrente=function(a){var e=a-1;return o.currentPage==e}}]),controller.filter("startFrom",function(){return function(a,e){return e=+e,a.slice(e)}}),controller.filter("unique",function(){return function(a,e){var o=[],r=[];return angular.forEach(a,function(a){var s=a[e];-1===r.indexOf(s)&&(r.push(s),o.push(a))}),o}}),controller.filter("tel",function(){return function(a){if(null!==a&&void 0!==a&&""!==a){var e=a+"";return 11===(e=e.replace(/\D/g,"")).length?e=0===e[0]?e.replace(/^(\d{4})(\d{3})(\d{4})/,"$1-$2-$3"):e.replace(/^(\d{2})(\d{5})(\d{4})/,"($1) $2-$3"):10===e.length?e=e.replace(/^(\d{2})(\d{4})(\d{4})/,"($1) $2-$3"):9===e.length?e=e.replace(/^(\d{0})(\d{5})(\d{4})/,"($1) $2-$3"):8===e.length&&(e=e.replace(/^(\d{0})(\d{4})(\d{4})/,"($1) $2-$3")),e}return"Não informado"}}),require(["jquery-ui","rotas"],function(a){var e=new Rotas;$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a("#loading").hide(),a(".conteudo_loading .section").css("visibility","visible"),a(".fb-share-button").attr("data-href",window.location.href),verificarBotaoEditar(idOsc),addLinkVoltar(idOsc),a(".scroll").click(function(e){e.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)}),a("#voltaPagAnterior").on("click",function(){history.go(-1)}),setTimeout(function(){verificarContraste()},3e3),window.onload=function(){verificarContraste(),a(".social iframe").each(function(){a(this).attr("title","")})},a.ajax({url:"js/controller.php",type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:e.BarraTransparencia(idOsc)},error:function(e){console.log("Erro no ajax: "),console.log(e),a("#grafico-progress").parent().hide()},success:function(e){null!=e&&(dataJson={values:[{id:"DG",order:1,score:e.transparencia_dados_gerais,weight:e.peso_dados_gerais,color:"#9E0041",label:"Dados Gerais"},{id:"ASAO",order:1,score:e.transparencia_area_atuacao,weight:e.peso_area_atuacao,color:"#E1514B",label:"Áreas e Subáreas de Atuação da OSC"},{id:"DO",order:1,score:e.transparencia_descricao,weight:e.peso_descricao,color:"#F47245",label:"Descrição da OSC"},{id:"TC",order:1,score:e.transparencia_titulos_certificacoes,weight:e.peso_titulos_certificacoes,color:"#FB9F59",label:"Titulações e Certificações"},{id:"RTG",order:1,score:e.transparencia_relacoes_trabalho_governanca,weight:e.peso_relacoes_trabalho_governanca,color:"#6CC4A4",label:"Relações de Trabalho e Governança"},{id:"EPS",order:1,score:e.transparencia_espacos_participacao_social,weight:e.peso_espacos_participacao_social,color:"#4D9DB4",label:"Espaços de Participação Social"},{id:"PAP",order:1,score:e.transparencia_projetos_atividades_programas,weight:e.peso_projetos_atividades_programas,color:"#4776B4",label:"Projetos, atividades e/ou programas"},{id:"FRAO",order:1,score:e.transparencia_fontes_recursos,weight:e.peso_fontes_recursos,color:"#5E4EA1",label:"Fontes de recursos anuais da OSC"}]},perfil(dataJson.values),a("#grafico-progress").parent().hide())}})})});var jsonModalAjuda={"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho.","Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da declaração da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC.","Descrição da OSC":"Aqui a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades (previstas no seu estatuto). Os campos podem ser preenchidos pelo(a) representante da OSC cadastrado(a) no Mapa.","Titulações e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Relações de Trabalho e Governança":"Aqui o(a) representante da OSC pode indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da sua organização, além de preencher o número de trabalhadores voluntários da entidade. Isso garante transparência para quem busca informações sobre a OSC. Os campos relativos ao número de empregados formais provêm das informações lançadas na RAIS/MTE.","Espaços de Participação Social":"Nesse espaço, o(a) representante da OSC pode indicar a participação em espaços colegiados com o Poder Público (conselhos de políticas públicas), as oportunidades que teve de integrar espaços que traçaram diretrizes de políticas (conferências de políticas públicas), bem como outros espaços de participação compartilhados com o Poder Público ou autoorganizados pela própria sociedade civil (fóruns, redes etc.).<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Projetos, atividades e/ou programas":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Fontes de recursos anuais da OSC":"Essa seção informa o somatório de todos os recursos por fonte autodeclarados pela OSC ano a ano."};