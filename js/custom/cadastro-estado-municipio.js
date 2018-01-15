"use strict";function validaNome(o){return!(o.length<5)}function validaEmail(o){var e=o.substring(0,o.indexOf("@")),a=o.substring(o.indexOf("@")+1,o.length);return e.length>=1&&a.length>=3&&-1==e.search("@")&&-1==a.search("@")&&-1==e.search(" ")&&-1==a.search(" ")&&-1!=a.search(".")&&a.indexOf(".")>=1&&a.lastIndexOf(".")<a.length-1}function validaEmailGov(o){var e=o.substring(0,o.indexOf("@")),a=o.substring(o.indexOf("@")+1,o.length);return e.length>=1&&a.length>=3&&-1==e.search("@")&&-1==a.search("@")&&-1==e.search(" ")&&-1==a.search(" ")&&-1!=a.search(".")&&a.indexOf(".")>=1&&a.lastIndexOf(".")<a.length-1&&-1!=a.indexOf("gov")}function validaCPF(cpf){var exp=/\.|\-/g;cpf=cpf.toString().replace(exp,"");for(var digitoDigitado=eval(cpf.charAt(9)+cpf.charAt(10)),soma1=0,soma2=0,vlr=11,i=0;i<9;i++)soma1+=eval(cpf.charAt(i)*(vlr-1)),soma2+=eval(cpf.charAt(i)*vlr),vlr--;soma1=10*soma1%11==10?0:10*soma1%11,soma2=10*(soma2+2*soma1)%11;var digitoGerado=10*soma1+soma2;return digitoGerado==digitoDigitado}function getErrorMessage(o,e){return 0===o.status?"Not connect.\n Verify Network.":404==o.status?"Requested page not found. [404]":500==o.status?"Internal Server Error [500].":"parsererror"===e?"Requested JSON parse failed.":"timeout"===e?"Time out error.":"abort"===e?"Ajax request aborted.":"Uncaught Error.\n"+o.responseText}function replaceSpecialChars(o){return o=o.replace(/[ÀÁÂÃÄÅ]/g,"A"),o=o.replace(/[àáâãäå]/g,"a"),o=o.replace(/[ÉÈÊË]/g,"E"),o=o.replace(/[éèêë]/g,"e"),o=o.replace(/[ÍÌÎÏ]/g,"I"),o=o.replace(/[íìîï]/g,"i"),o=o.replace(/[ÓÒÔÕ]/g,"O"),o=o.replace(/[óòôõ]/g,"o"),o=o.replace(/[ÚÙÛÜ]/g,"U"),o=o.replace(/[úùûü]/g,"u"),o=o.replace(/[Ç]/g,"C"),o=o.replace(/[ç]/g,"c")}function abrirModalAjuda(o){acionarModalAjuda("Ajuda - "+o,jsonModalAjuda[o],"<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>")}function acionarModalAjuda(o,e,a){$("#modalTitulo").html(""),$("#modalTitulo").html(o),$("#corpoModal").html(""),$("#corpoModal").html(e),$("#btnFooter").html(""),$("#btnFooter").html(a),$("#modalAjuda").modal("show"),verificarContraste()}require(["jquery-ui"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,e){$(this).css(o),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(o){o(".scroll").click(function(e){e.preventDefault(),o("html,body").animate({scrollTop:o(this.hash).offset().top},800)})})}),require(["react","jsx!components/Util"],function(o){require(["jquery-ui","rotas","jquery","libs/jquery-mask/jquery.mask.min"],function(o){function e(o){$.ajax({url:"js/controller.php",type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:a.ValidarLocalidade(o)},error:function(o){t=!0},success:function(o){t=!1,s=o.resultado}})}var a=new Rotas,r=$("#modalMensagem"),s=!1,t=!1;$("#tx_nome_representante.form-control").blur(function(o,e){var a="";validaNome(this.value)?(a="#"+$("#tx_nome_representante.form-control").attr("id"),$("#tx_nome_representante.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(a).removeClass("glyphicon-remove").addClass("glyphicon-ok")):(a="#"+$("#tx_nome_representante.form-control").attr("id"),$("#tx_nome_representante.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(a).removeClass("glyphicon-ok").addClass("glyphicon-remove"))}),$("#tx_email.form-control").blur(function(o,e){var a="";validaEmail(this.value)?(a="#"+$("#tx_email.form-control").attr("id"),$("#tx_email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(a).removeClass("glyphicon-remove").addClass("glyphicon-ok")):(a="#"+$("#tx_email.form-control").attr("id"),$("#tx_email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(a).removeClass("glyphicon-ok").addClass("glyphicon-remove"))}),$("#tx_email_confirmacao.form-control").blur(function(o,e){var a="";validaEmailGov(this.value)?(a="#"+$("#tx_email_confirmacao.form-control").attr("id"),$("#tx_email_confirmacao.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(a).removeClass("glyphicon-remove").addClass("glyphicon-ok")):(a="#"+$("#tx_email_confirmacao.form-control").attr("id"),$("#tx_email_confirmacao.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(a).removeClass("glyphicon-ok").addClass("glyphicon-remove"))}),$("#tx_cpf.form-control").blur(function(o,e){var a="";validaCPF(this.value)?(a="#"+$("#tx_cpf.form-control").attr("id"),$("#tx_cpf.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(a).removeClass("glyphicon-remove").addClass("glyphicon-ok")):(a="#"+$("#tx_cpf.form-control").attr("id"),$("#tx_cpf.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(a).removeClass("glyphicon-ok").addClass("glyphicon-remove"))}),$("#tx_senha.form-control").blur(function(o,e){this.value.length>=6?$("#tx_senha.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"):$("#tx_senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error")}),$("#tx_confirmar_senha.form-control").blur(function(o,e){var a=this.value;a==$("#tx_senha").val()&&a.length>=6?($("#tx_senha.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$("#tx_confirmar_senha.form-control").closest(".form-group").removeClass("has-error").addClass("has-success")):($("#tx_senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#tx_confirmar_senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"))}),$("#tx_nome_municipio").autocomplete({minLength:1,source:function(o,e){$.ajax({url:"js/controller.php",type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:a.AutocompleteOSCByCounty(replaceSpecialChars(o.term).replace(/ /g,"+"),25)},success:function(o){e($.map(o,function(o){return{label:o.edmu_nm_municipio+" - "+o.eduf_sg_uf,value:o.edmu_nm_municipio+" - "+o.eduf_sg_uf,id:o.edmu_cd_municipio}}))},error:function(o){$("#tx_nome_municipio").val(""),$("#cd_municipio_id").val(""),$("#tx_nome_municipio").closest(".form-group").removeClass("has-success").addClass("has-error")}})},select:function(o,a){var r="";$("#tx_nome_municipio").val(a.item.value),$("#cd_municipio_id").val(a.item.id),e(a.item.id),s||t?(r="#"+$("#tx_nome_municipio.form-control").attr("id"),$("#tx_nome_municipio.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")):(r="#"+$("#tx_nome_municipio.form-control").attr("id"),$("#tx_nome_municipio.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok"))}}),$("#tx_nome_uf").autocomplete({minLength:1,source:function(o,e){$.ajax({url:"js/controller.php",type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:a.AutocompleteOSCByState(replaceSpecialChars(o.term).replace(/ /g,"+"),10)},success:function(o){e($.map(o,function(o){return{label:o.eduf_nm_uf,value:o.eduf_nm_uf,id:o.eduf_cd_uf}}))},error:function(){$("#tx_nome_uf").val(""),$("#cd_uf_id").val(""),$("#tx_nome_uf").closest(".form-group").removeClass("has-success").addClass("has-error")}})},select:function(o,a){var r="";$("#tx_nome_uf").val(a.item.value),$("#cd_uf_id").val(a.item.id),e(a.item.id),s||t?(r="#"+$("#tx_nome_uf.form-control").attr("id"),$("#tx_nome_uf.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")):(r="#"+$("#tx_nome_uf.form-control").attr("id"),$("#tx_nome_uf.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok"))}}),$("input:radio").change(function(){0==$(this).val()?($("#tx_nome_uf").parent().show(),$("#tx_nome_municipio").parent().hide(),$("#tx_nome_municipio").val(""),$("#cd_municipio_id").val("")):($("#tx_nome_municipio").parent().show(),$("#tx_nome_uf").parent().hide(),$("#tx_nome_uf").val(""),$("#cd_uf_id").val(""))}),$("#tx_nome_uf.form-control").blur(function(o,a){""==this.value&&$("#cd_uf_id").val("");e($("#cd_uf_id").val());var r="";s||t?(r="#"+$("#tx_nome_uf.form-control").attr("id"),$("#tx_nome_uf.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")):(r="#"+$("#tx_nome_uf.form-control").attr("id"),$("#tx_nome_uf.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok"))}),$("#tx_nome_municipio.form-control").blur(function(o,a){""==this.value&&$("#cd_municipio_id").val("");e($("#cd_municipio_id").val());var r="";s||t?(r="#"+$("#tx_nome_municipio.form-control").attr("id"),$("#tx_nome_municipio.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")):(r="#"+$("#tx_nome_municipio.form-control").attr("id"),$("#tx_nome_municipio.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok"))});var l=function(o){return 11===o.replace(/\D/g,"").length?"(00) 00000-0000":"(00) 0000-00009"},n={onKeyPress:function(o,e,a,r){a.mask(l.apply({},arguments),r)}};$("#tx_telefone1").mask(l,n),$("#tx_telefone2").mask(l,n),$("#btnLimpar").on("click",function(){$("#conteudo input").each(function(){$(this).val("")}),$("input[type=checkbox]").each(function(){$(this).attr("checked",!1),$(this).prop("checked",!1)})});$(".form-group").find(".btn.btn-success").on("click",function(){if(0==grecaptcha.getResponse().length)return jQuery("#labelCaptcha").text("Resolver o Captcha."),!1;jQuery("#labelCaptcha").text("");var o="",e=$("#tx_nome_representante").val(),s=$("#tx_email").val(),t=$("#tx_cpf").val(),l=$("#tx_orgao_trabalha").val(),n=$("#tx_telefone1").val(),c=$("#tx_telefone2").val(),i=$("#tx_senha").val(),m=$("#tx_confirmar_senha").val(),u=$("#cd_municipio_id").val(),d=$("#cd_uf_id").val(),f=$("#tx_email_confirmacao").val(),p=$("#tx_registro_institucional").val(),h=!1;h=!!$("#termoUso").is(":checked");var _=!1;_=!!$("#newsletter").is(":checked");var v=!1;if(v=!!$("#pedido_atualizacao_trimestral").is(":checked"),!validaNome(e))return o="#"+$("#tx_nome_representante.form-control").attr("id")+"1",$("#tx_nome_representante.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(o).removeClass("glyphicon-remove").addClass("glyphicon-ok"),!1;if(!validaEmail(s))return o="#"+$("#tx_email.form-control").attr("id")+"1",$("#tx_email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(o).removeClass("glyphicon-ok").addClass("glyphicon-remove"),!1;if(!validaCPF(t))return o="#"+$("#tx_cpf.form-control").attr("id")+"1",$("#tx_cpf.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(o).removeClass("glyphicon-ok").addClass("glyphicon-remove"),!1;if(""==i||i!=m||i.length<6)return o="#"+$("#tx_senha.form-control").attr("id")+"1",$("#tx_senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(o).removeClass("glyphicon-ok").addClass("glyphicon-remove"),o="#"+$("#tx_confirmar_senha.form-control").attr("id")+"1",$("#tx_confirmar_senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(o).removeClass("glyphicon-ok").addClass("glyphicon-remove"),jQuery("#modalTitle").text("Problema no cadastro!"),i.length<6?jQuery("#modalConteudo").text("Senha deve conter mínimo 6 caracteres."):jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes."),r.modal("show"),!1;if(!h)return o="#"+$("#termoUso.form-control").attr("id")+"1",$("#termoUso.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(o).removeClass("glyphicon-remove").addClass("glyphicon-ok"),jQuery("#modalTitle").text("Problema no cadastro!"),jQuery("#modalConteudo").text("É necessário concordar com os termos de uso."),r.modal("show"),!1;var g={tx_email_usuario:s,tx_senha_usuario:i,tx_nome_usuario:e,nr_cpf_usuario:t,tx_orgao_trabalha:l,tx_telefone_1:n,tx_telefone_2:c,bo_lista_email:_,bo_lista_pedido_atualizacao_trimestral:v,tx_registro_institucional:p,tx_email_confirmacao:f};0==$("input:radio:checked").val()?g.localidade=d:g.localidade=u,$.ajax({url:"js/controller.php",type:"POST",dataType:"json",data:{flag:"consultaPost",rota:a.CadastroRepresentanteEstadoMunicipio(),parametros:g},error:function(o){200==o.status?(jQuery("#modalTitle").text("Solicitação realizada com sucesso!"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text("Por favor, verifique o e-mail cadastrado.")):(jQuery("#modalTitle").text("Problema no cadastro!"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text(JSON.parse(o.responseText).msg)),r.modal("show")},success:function(o){jQuery("#modalTitle").text("Cadastro de Representante"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text(o.msg),r.modal("show")}})})})});var jsonModalAjuda={"Email de Confirmação":'Email institucional (gov.br) da chefia imediata ou de superior mais próximo que possua email <b>".gov.br"</b>.<br>Caso o Estado ou Município não possua email institucional, informe pelo email mapaosc@ipea.com.br.',"Registro Institucional":"Um registro que comprove a vinculação do representante do Estado ou Município com o ente federativo. Sugere-se utilizar o número de matrícula do servidor ou identificador similar. Não Obrigatório.","Órgão em que Trabalha":"Informar o setor que trabalha e a Secretaria Estadual ou Municipal à qual está vinculado/a.",Email:'Email institucional do/a responsável por encaminhar ao Mapa das OSCs o banco de dados com as parcerias entre OSCs e o governo estadual/municipal. Solicitamos, preferencialmente, um contato institucional terminado em <b>".gov.br"</b>.<br>Caso não seja possível, pode-se utilizar o email pessoal para efetuar o cadastro.',Senha:"A senha deve conter no mínimo <b>6</b> caracteres.","Unidade Administrativa":"Informe o Estado ou Município a qual representa.<br>Primeiro passo: escolha entre Estado ou município.<br>Segundo passo: Digite o nome da unidade federativa. Após digitar, selecione o nome da sua unidade federativa."};