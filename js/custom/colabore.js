"use strict";require(["rotas","jquery-ui"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,s){$(this).css(o),$("<div>").addClass("arrow").addClass(s.vertical).addClass(s.horizontal).appendTo(this)}}}),jQuery(document).ready(function(o){o(".scroll").click(function(s){s.preventDefault(),o("html,body").animate({scrollTop:o(this.hash).offset().top},800)})});var s=new Rotas;s.getBaseUrlCMS();$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:s.ModuloBySlug("colabore")},error:function(o){console.log("ERRO no AJAX :"+o),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(o){if(o.length>0){var s='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+o[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>";if(s+='<div class="row"><div class="col-md-12">'+o[0].modulos.tx_descricao_modulo+"</div></div>",o[0].itens.length>0)for(var t in o[0].itens)s+='<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+o[0].itens[t].tx_titulo_itens+"</h3>",s+='<div class="text-justify txtBloco">'+o[0].itens[t].tx_descricao_itens+"</div>",s+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';$("#colabore").prepend(s)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});