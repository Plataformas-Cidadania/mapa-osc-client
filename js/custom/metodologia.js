"use strict";require(["jquery-ui","rotas"],function(s){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(s,a){$(this).css(s),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}});var a=new Rotas;a.getBaseUrlCMS();$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:a.ModuloBySlug("metodologia")},error:function(s){console.log("ERRO no AJAX :"+s),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(s){if(s.length>0){var a='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+s[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>",o='<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+s[0].modulos.tx_descricao_modulo+"</div></div></div>";if(s[0].itens.length>0){var t=0;a+='<ul class="nav nav-pills">';for(var i in s[0].itens)if(t=parseInt(i)+1,"Final"!=s[0].itens[i].tx_titulo_itens&&(a+='<li><a href="#item_'+t+'" class="scroll">'+s[0].itens[i].tx_titulo_itens+"</a></li>"),"Final"==s[0].itens[i].tx_titulo_itens){var e='<div class="row"><div class="col-md-12">';e+='<div class="text-justify">'+s[0].itens[i].tx_descricao_itens+"</div>",e+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>'}else if("Descrição das bases de dados"==s[0].itens[i].tx_titulo_itens){var l='<a id="item_'+t+'" name="item_'+t+'" href="#descricao_bases_dados" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="descricao_bases_dados" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Saiba mais sobre as descrições das bases de dados</a>';l+='<div class="collapse" id="descricao_bases_dados">',l+='<div class="well">',l+='<div class="row"><div class="col-md-12"><h4 class="subTitulo">'+s[0].itens[i].tx_titulo_itens+"</h4>",l+='<div class="text-justify">'+s[0].itens[i].tx_descricao_itens+"</div>",l+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>'}else o+='<div id="item_'+t+'" name="item_'+t+'" class="row"><div class="col-md-12"><h4 class="subTitulo">'+s[0].itens[i].tx_titulo_itens+"</h4>",o+='<div class="text-justify">'+s[0].itens[i].tx_descricao_itens+"</div>",o+='<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';a+="</ul>"}$("#metodologia").append(a),$("#metodologia").append(o),$("#metodologia").append(l),$("#metodologia").append(e)}else $(".manutencao").css("display","block");$(".loading").addClass("hide"),$(".scroll").click(function(s){s.preventDefault(),$("html,body").animate({scrollTop:$(this.hash).offset().top},800)})}})});