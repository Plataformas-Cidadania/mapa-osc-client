"use strict";require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,i){$(this).css(a),$("<div>").addClass("arrow").addClass(i.vertical).addClass(i.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(i){i.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["rotas","jquery-ui","datatables-responsive"],function(a){function i(a,i){$(a).DataTable({responsive:!0,processing:!0,deferLoading:1e3,deferRender:!0,searching:!1,data:i,dom:"Bfrtip",bSort:!0,aaSorting:[[0,"desc"]],columns:[{title:"",width:"80px"},{title:""}]})}var o=new Rotas;$.ajax({url:o.Publicacoes(),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),i("#publicacao_formato_dados",""),$(".loading").addClass("hide")},success:function(a){void 0!==a&&0!=a.length?i("#publicacao_formato_dados",function(a){for(var i=a.length,o=new Array(i),t="",c=0;c<i;c++)o[c]=new Array(2),o[c][0]='<div><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> '+a[c].dt_publicacao+"<div>",t=null!=a[c].tx_link_img_publicacao&&""!=a[c].tx_link_img_publicacao?"/cms/imagens/publications/xs-"+a[c].tx_link_img_publicacao:"img/noticia_icon.png",o[c][1]='<ul class="media-list"><li class="media"><a class="pull-left" href="./publicacao.html#/'+a[c].cd_publicacao+'" target="_self"><img class="media-object img-rounded img-publicacao" src="'+t+'"  onerror="this.src=\'img/noticia_icon.png\';"></a><div class="media-body"><h4 class="media-heading"><a class="btn-link" href="./publicacao.html#/'+a[c].cd_publicacao+'" target="_self">'+a[c].tx_titulo_publicacao+"</a></h4><p>"+a[c].tx_resumo_publicacao+"</p></div></li></ul>";return o}(a)):i("#publicacao_formato_dados",""),$(".loading").addClass("hide"),$("#publicacao_formato_dados").on("draw.dt",function(){verificarContraste()}),$('a[data-toggle="tab"]').on("shown.bs.tab",function(a){$.fn.dataTable.tables({visible:!0,api:!0}).columns.adjust()})}})});
