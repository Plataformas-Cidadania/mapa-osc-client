"use strict";require(["rotas","jquery","jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,t){$(this).css(a),$("<div>").addClass("arrow").addClass(t.vertical).addClass(t.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(t){t.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})}),$("#voltaPagAnterior").on("click",function(){history.go(-1)});var t=new Rotas,i=void 0!==window.location.href.split("#")[1]?window.location.href.split("#/")[1].split("="):null,s="";null!==i&&function(a){$("#voltaAnalise").attr("href","analise.html#/"+a)}(s=i[0]),$.ajax({url:t.AnaliseByID(s),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(a){var t='<div class="row"><div class="col-md-12"><h2 class="text-primary">'+a.tx_titulo_analise+"</h2><hr></div></div>";t+='<span class="glyphicon glyphicon-calendar txtData" aria-hidden="true"></span><label class="dt_pub_news">Publicado em '+a.dt_analise+"</label>",t+='<div class="text-justify txtBloco">'+a.tx_descricao_analise+"</div>",$("#analise").append(t),$(".dt_pub_news").before($(".social")),$(".social").css("display","flex"),$(".loading").addClass("hide"),$(".social iframe").each(function(){$(this).attr("title","")})}})});