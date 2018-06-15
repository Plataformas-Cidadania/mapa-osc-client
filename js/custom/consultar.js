"use strict";require(["jquery-ui","libs/jquery-mask/jquery.mask.min"],function(e){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,a){$(this).css(e),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),$(".scroll").click(function(e){e.preventDefault(),$("html,body").animate({scrollTop:$(this.hash).offset().top},800)})}),require(["react"],function(e){require(["jquery-ui","rotas","jquery","select-boxit"],function(e){var a,t="js/controller.php",o=new Rotas;function n(e,a){var n=$("select#"+a).data("selectBox-selectBoxIt");void 0!=n&&n.destroy(),$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.MetaProjeto(e)},error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){var t=$("#"+a),o='<option value="">Selecione uma opção</option>';null!=e&&$.each(e,function(e,a){o+="<option value="+a.cd_meta_projeto+">"+a.tx_nome_meta_projeto+"</option>"}),t.html(o),$("#"+a).addClass("newSelectBox"),$("#"+a).selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1}),$("#"+a).selectBoxIt(),$("select#"+a).data("selectBox-selectBoxIt").enable(),verificarContraste()}})}function i(e){return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/[ÀÁÂÃÄÅ]/g,"A")).replace(/[àáâãäå]/g,"a")).replace(/[ÉÈÊË]/g,"E")).replace(/[éèêë]/g,"e")).replace(/[ÍÌÎÏ]/g,"I")).replace(/[íìîï]/g,"i")).replace(/[ÓÒÔÕ]/g,"O")).replace(/[óòôõ]/g,"o")).replace(/[ÚÙÛÜ]/g,"U")).replace(/[úùûü]/g,"u")).replace(/[Ç]/g,"C")).replace(/[ç]/g,"c")}$("#accordion .panel-heading").each(function(){$(this).click(function(){$(this).parent().parent().children().last().toggle("slow")})}),$(function(){$("#dt_data_inicio_conselho").datepicker({defaultDate:"+1w",changeYear:!0,changeMonth:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_fim_conselho").datepicker("option","minDate",e)}}),$("#dt_data_fim_conselho").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_inicio_conselho").datepicker("option","maxDate",e)}}),$("#dt_data_inicio_projeto").datepicker({defaultDate:"+1w",changeYear:!0,changeMonth:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_fim_projeto").datepicker("option","minDate",e)}}),$("#dt_data_fim_projeto").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_inicio_projeto").datepicker("option","maxDate",e)}})}),$(function(){$("div[id^='slider-range-']").each(function(){$(this).parent().find("input");var e=$(this).parent().find("label").attr("for");if("valor_dinheiro"==e)$(this).slider({range:!0,animate:!0,min:0,max:1e6,step:100,values:[0,1e6],slide:function(e,a){$(e.target.previousElementSibling).find(".min").val(a.values[0].toLocaleString("pt-BR",{minimumFractionDigits:2})),$(e.target.previousElementSibling).find(".max").val(a.values[1].toLocaleString("pt-BR",{minimumFractionDigits:2}))}});else if("ano"==e){var a=(new Date).getFullYear();$(this).slider({range:!0,min:1900,max:a,values:[1900,a],slide:function(e,a){$(e.target.previousElementSibling).find(".min").val(a.values[0]),$(e.target.previousElementSibling).find(".max").val(a.values[1])}})}else $(this).slider({range:!0,min:0,max:1e3,values:[0,1e3],slide:function(e,a){$(e.target.previousElementSibling).find(".min").val(a.values[0]),$(e.target.previousElementSibling).find(".max").val(a.values[1])}})})}),$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:o.Busca_Certificado()},error:function(e){console.log("ERRO no AJAX :"+e)},success:function(e){var a={1:"titulacao_entidadeAmbientalista",2:"titulacao_cebasEducacao",3:"titulacao_cebasSaude",4:"titulacao_oscip",5:"titulacao_utilidadePublicaFederal",6:"titulacao_cebasAssistenciaSocial",7:"titulacao_utilidadePublicaEstadual",8:"titulacao_utilidadePublicaMunicipal",9:"titulacao_naoPossui"};if(e.length>0)for(var t in e){var o='<label><input id="'+a[e[t].cd_certificado]+'" value="'+e[t].cd_certificado+'"  type="checkbox">'+e[t].tx_nome_certificado+"</label>";$("#cd_certificado").append(o)}}}),$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.AreaAtuacao()},error:function(e){console.log("Erro no ajax: ")},success:function(e){if(null!=e)for(var n in e){var i='<label><input id="cd_area_atuacao-'+e[n].cd_area_atuacao+'" value="'+e[n].cd_area_atuacao+'"  type="checkbox">'+e[n].tx_nome_area_atuacao+"</label>";$("#cd_area_atuacao").append(i)}$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.SubAreaAtuacao()},error:function(e){console.log("Erro no ajax: ")},success:function(e){a=e,$("#cd_area_atuacao input").change(function(){var e=$(this).val(),t=$(this).parent().text();if("Outros"!=t)if(this.checked){if(null!=a){var o=$("#cd_subarea_atuacao"),n="";n+='<div class="form-group col-xs-6 col-sm-12 buscaSubareaAtuacao" id="item_'+e+'" ><label class="control-label itemAreaAtuacao">'+t+":</label>",$.each(a,function(a,t){e==t.cd_area_atuacao&&(n+='<label><input id="cd_subarea_atuacao-'+t.cd_subarea_atuacao+'" value="'+t.cd_subarea_atuacao+'" type="checkbox">'+t.tx_nome_subarea_atuacao+"</label>")}),n+="</div>",$(".subareaAtuacao").css("visibility","visible"),o.append(n)}}else $("#item_"+e).remove()})}})}}),$("#cd_situacao_imovel_osc").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.SituacaoImovel()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_situacao_imovel,value:t[n].cd_situacao_imovel});e.resolve(a)}),e}}),$("#espacosParticipacaoSocial").mousedown(function(){$("#cd_tipo_participacao").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Titularidade()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_tipo_participacao,value:t[n].cd_tipo_participacao});e.resolve(a)}),e}}),$("#cd_conselho").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Conselho()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_conselho,value:t[n].cd_conselho});e.resolve(a)}),e}}),$("#cd_forma_participacao_conferencia").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.FormaParticipacaoConferencia()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_forma_participacao_conferencia,value:t[n].cd_forma_participacao_conferencia});e.resolve(a)}),e}}),$("#cd_conferencia").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Conferencia()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_conferencia,value:t[n].cd_conferencia});e.resolve(a)}),e}})}),$("#projetos").mousedown(function(){$("#cd_origem_fonte_recursos_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.FontesRecursosProjeto()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_origem_fonte_recursos_projeto,value:t[n].cd_origem_fonte_recursos_projeto});e.resolve(a)}),e}}),$("#cd_status_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.SituacaoProjeto()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_status_projeto,value:t[n].cd_status_projeto});e.resolve(a)}),e}}),$("#cd_zona_atuacao_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.ZonaAtuacaoProjeto()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_zona_atuacao,value:t[n].cd_zona_atuacao_projeto});e.resolve(a)}),e}}),$("#cd_abrangencia_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.AbrangenciaProjeto()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_abrangencia_projeto,value:t[n].cd_abrangencia_projeto});e.resolve(a)}),e}})}),$("#cd_objetivo_projeto").mousedown(function(){$("#cd_objetivo_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Objetivos()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_objetivo_projeto,value:t[n].cd_objetivo_projeto});e.resolve(a)}),e}})}),$("#cd_objetivo_projeto").change(function(){var e=$(this).val();if(""!=e)n(e,"cd_meta_projeto");else{$("#cd_meta_projeto").html('<option value="">Selecione uma opção</option>');var a=$("select#cd_meta_projeto").data("selectBox-selectBoxIt");void 0!=a&&a.disable(),verificarContraste()}}),$("#cd_objetivo_osc").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),a=[],n=-1;return $.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Objetivos()}}).done(function(t){for(;++n<t.length;)a.push({text:t[n].tx_nome_objetivo_projeto,value:t[n].cd_objetivo_projeto});e.resolve(a)}),e}}),$("#cd_objetivo_osc").change(function(){var e=$(this).val();if(""!=e)n(e,"cd_meta_osc");else{$("#cd_meta_osc").html('<option value="">Selecione uma opção</option>');var a=$("select#cd_meta_osc").data("selectBox-selectBoxIt");void 0!=a&&a.disable(),verificarContraste()}}),$("#tx_nome_municipio").autocomplete({minLength:1,source:function(e,a){$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteOSCByCounty(i(e.term).replace(/ /g,"+"),25)},success:function(e){a($.map(e,function(e){return{label:e.edmu_nm_municipio+" - "+e.eduf_sg_uf,value:e.edmu_nm_municipio+" - "+e.eduf_sg_uf,id:e.edmu_cd_municipio}}))},error:function(e){a([])}})},select:function(e,a){$("#tx_nome_municipio").val(a.item.value),$("#cd_municipio").val(a.item.id)}}),$("#tx_nome_uf").autocomplete({minLength:1,source:function(e,a){$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteOSCByState(i(e.term).replace(/ /g,"+"),10)},success:function(e){a($.map(e,function(e){return{label:e.eduf_nm_uf,value:e.eduf_nm_uf,id:e.eduf_cd_uf}}))},error:function(){a([])}})},select:function(e,a){$("#tx_nome_uf").val(a.item.value),$("#cd_uf").val(a.item.id)}}),$("#tx_nome_regiao").autocomplete({minLength:1,source:function(e,a){$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteOSCByRegion(i(e.term).replace(/ /g,"+"),10)},success:function(e){a($.map(e,function(e){return{label:e.edre_nm_regiao,value:e.edre_nm_regiao,id:e.edre_cd_regiao}}))},error:function(){a([])}})},select:function(e,a){$("#tx_nome_regiao").val(a.item.value),$("#cd_regiao").val(a.item.id)}}),$("#tx_atividade_economica").autocomplete({minLength:1,source:function(e,a){$.ajax({url:t,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteAtividadeEconomica(i(e.term).replace(/ /g,"_"),10)},success:function(e){e.length>0?a($.map(e,function(e){return{value:e.tx_atividade_economica,cod:e.cd_classe_atividade_economica}})):($("#tx_atividade_economica").val(""),$("#tx_atividade_economica").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#labelError_atividade_economica").text("Nome da Atividade Econômica inválido."),setTimeout(function(){$("#tx_atividade_economica.form-control").closest(".form-group").removeClass("has-error"),$("#labelError_atividade_economica").text("")},2e3))},error:function(e){$("#tx_atividade_economica").val(""),$("#tx_atividade_economica").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#labelError_atividade_economica").text("Nome da Atividade Econômica inválido."),setTimeout(function(){$("#tx_atividade_economica.form-control").closest(".form-group").removeClass("has-error"),$("#labelError_atividade_economica").text("")},2e3)}})},select:function(e,a){$("#tx_atividade_economica").val(a.item.value),$("#cd_classe_atividade_economica").val(a.item.cod),$("#tx_atividade_economica.form-control").closest(".form-group").removeClass("has-error"),$("#labelError_atividade_economica").text("")}}),$(".min, .max").keypress(function(){var e=window.event,a=e.keyCode;a>47&&a<58||e.preventDefault()}),$(".min").change(function(){$(this).parent().parent().find("div[id^='slider-range-']").slider("values",0,$(this).val().replace(/[.]/g,"").split(",")[0])}),$(".max").change(function(){$(this).parent().parent().find("div[id^='slider-range-']").slider("values",1,$(this).val().replace(/[.]/g,"").split(",")[0])}),$("label[for='valor_dinheiro']").parent().find(".min, .max").mask("000.000.000.000.000,00",{reverse:!0}),$("#btnLimpar").on("click",function(){$(".consultaAvancada input[type=text]").each(function(){$(this).val("")}),$("input[type=checkbox]").each(function(){$(this).attr("checked",!1),$(this).prop("checked",!1)}),$(".consultaAvancada select").each(function(){$(this).hasClass("newSelectBox")?void 0!=$(this).data("selectBox-selectBoxIt")&&$(this).data("selectBox-selectBoxIt").selectOption(""):$(this).prop("selectedIndex",0)}),$("div[id^='slider-range-']").each(function(){$(this).slider("values",0,""),$(this).slider("values",1,99999999999)}),$(".buscaSubareaAtuacao").each(function(){$(this).remove()})}),$("#btnConsultar").on("click",function(){var e={};$(".panel-default").each(function(){var a=$(this).find(".panel-title").attr("id");$(this).find("input[type=text], select").each(function(){""!=$(this).val()&&("areasSubareasAtuacao"===a&&(a="atividadeEconomica"),void 0===e[a]&&(e[a]={}),e[a][$(this).attr("id")]=$(this).val())}),$(this).find("input[type=hidden]").each(function(){""!=$(this).val()&&("areasSubareasAtuacao"===a&&(a="atividadeEconomica"),void 0===e[a]&&(e[a]={}),e[a][$(this).attr("id")]=$(this).val())}),$(this).find("input[type=checkbox]").each(function(){$(this).prop("checked")&&("atividadeEconomica"===a&&(a="areasSubareasAtuacao"),void 0===e[a]&&(e[a]={}),e[a][$(this).attr("id")]=$(this).prop("checked"))})});window.localStorage.setItem("params_busca_avancada",JSON.stringify(e)),location.href="./resultado-consulta.html?avancado="})})});
