"use strict";require(["rotas","jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,t){$(this).css(a),$("<div>").addClass("arrow").addClass(t.vertical).addClass(t.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(t){t.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})});new Rotas;$.ajax({url:"json/lista-osc-com-links.json",type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(a){if(a.length>0){var t='<table class="table table-striped"><thead><tr><th scope="col">CNPJ</th><th scope="col">Nome</th><th scope="col">Detalhar</th></tr></thead><tbody>';if(a.length>0)for(var o in a)t+='<tr><th scope="row">'+a[o].cnpj+"</th>",t+="<td>"+a[o].nome+"</td>",t+='<td><a href="'+a[o].link+'" class="btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i> Detalhar</a></td></tr>';t+="</tbody></table>",$("#depen-osc").append('<div class="row"><div class="col-md-12"><h1 class="text-primary">Cadastro Nacional de Participação Social na Execução Penal</h1><hr></div></div>'),$("#depen-osc").append(t)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});