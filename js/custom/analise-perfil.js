"use strict";require(["jquery-ui"],function(a){$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix"),$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left"),$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(e){e.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["rotas","nv.d3.lib","graficoParaTabela"],function(a){function e(a){var e=". ";return null!=a&&(e=a.join(", ").replace(/'/gi,""),e+=". "),"Fonte: "+e}function o(a,e){var o=a.toLowerCase(),t="do "+o;return 1==e&&(t="O "+o),"região"==o&&(t="da "+o,1==e&&(t="A "+o)),t}var t=new Rotas;$("#voltaPagAnterior").on("click",function(){history.go(-1)});var r=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null,s="";null!==r&&function(a){$("#voltaPerfil").attr("href","analise-perfil.html?localidade="+a)}(s=r[1]),$.ajax({url:t.RecuperarPerfilByIDLocalidade(s),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide"),$(".tela").addClass("hide")},success:function(a){$("#tx_localidade").text(a.tx_localidade);var t=[];t.push("Quantidade OSCs e Quantidade Trabalhadores: "+a.caracteristicas.ft_quantidade_osc),$("#tabela caption").text(e(t));var r=[];a.caracteristicas.ft_quantidade_recursos.length?r.push("Quantidade Recursos: "+a.caracteristicas.ft_quantidade_recursos):r.push("Quantidade Recursos: Representante de OSC"),$("#tabela caption").append("<br>"+e(r));var s=[];a.caracteristicas.ft_quantidade_projetos.length?s.push("Quantidade Projetos: "+a.caracteristicas.ft_quantidade_projetos):s.push("Quantidade Projetos: Não há projetos"),$("#tabela caption").append("<br>"+e(s));f='<h5><a id="tabela-p1" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';$("#tabela caption").append(f);var i="<tr>";i+="<td>"+a.caracteristicas.nr_quantidade_osc.toLocaleString("pt-BR")+"</td>",i+="<td>"+a.caracteristicas.nr_quantidade_trabalhadores.toLocaleString("pt-BR")+"</td>",i+="<td>"+formatarDinheiro(a.caracteristicas.nr_quantidade_recursos)+"</td>",i+="<td>"+a.caracteristicas.nr_quantidade_projetos.toLocaleString("pt-BR")+"</td>",i+="</tr>",$("#tabela tbody").append(i),f="<p>"+a.tx_localidade+" é o <b>"+a.evolucao_quantidade_osc_ano.nr_colocacao_nacional+"º</b> em relação a quantidade de OSCs no âmbito nacional. ",f+="Nesse ranking, o estado ("+a.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado+", <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado.toLocaleString("pt-BR")+"</b> OSCs) ",f+="e o município ("+a.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio+", <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio.toLocaleString("pt-BR")+"</b> OSCs) são os que contêm mais OSCs. ",f+="O estado ("+a.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0]+") e o município ("+a.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0]+") ",f+="são os que contêm menos OSCs, <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado.toLocaleString("pt-BR")+"</b> e <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio.toLocaleString("pt-BR")+"</b> respectivamente.",f+="</p>",$("#tx_caracteristicas").append(f);h={};h.configuracao=["f","1","","f"],h.legenda_x="Ano",h.legenda_y="Quantidade OSC",h.titulo_colunas=["Evolução","Ano","Quantidade"],h.titulo="Evolucao da quantidade OSCs por ano",h.fontes=a.evolucao_quantidade_osc_ano.fontes,h.legenda="",h.tipo_grafico="linechart";var n=[];n.push(a.evolucao_quantidade_osc_ano.series_1[0]);var d={};d.area=!1,d.color="#ff7f0e",d.key="Quantidade OSC Acumulada",d.tipo_valor="";for(var c=[],l=0,_=0;_<a.evolucao_quantidade_osc_ano.series_1.length;_++)for(var u=0;u<a.evolucao_quantidade_osc_ano.series_1[_].values.length;u++){var p={};p.x=a.evolucao_quantidade_osc_ano.series_1[_].values[u].x,l+=a.evolucao_quantidade_osc_ano.series_1[_].values[u].y,p.y=l,c.push(p)}d.values=c,n.push(d),h.series_1=n,escolherGrafico("p1",h);f="<p>Na população de OSCs "+o(a.tx_tipo_localidade,2)+", <b>"+a.natureza_juridica.nr_porcentagem_maior+"%</b> são ";f+=a.natureza_juridica.tx_porcentagem_maior+". Enquanto, em relação ao percentual médio nacional <b>"+a.natureza_juridica.nr_porcentagem_maior_media_nacional+"%</b> são ",f+=a.natureza_juridica.tx_porcentagem_maior_media_nacional,f+=".</p>",$("#tx_natureza_juridica").append(f),f='<h5 class="legenda_perfil">'+e(a.natureza_juridica.fontes)+"</h5>",f+='<h5><a id="tabela-p2" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_natureza_juridica").append(f);(h={}).configuracao=["f","1","","f"],h.legenda_x="Natureza Jurídica",h.legenda_y="Quantidade OSC",h.titulo_colunas=["Natureza Jurídica","Quantidade OSC"],h.titulo="Número de OSCs por natureza jurídica",h.fontes=a.natureza_juridica.fontes,h.legenda="",h.tipo_grafico="barchart",h.series_1=a.natureza_juridica.series_1,escolherGrafico("p2",h);f="<p>"+a.tx_localidade+" é o <b>"+a.repasse_recursos.nr_colocacao_nacional+"º</b> em relação aos valores de recursos autodeclarados, com média de <b>";f+=formatarDinheiro(a.repasse_recursos.nr_repasse_media)+"</b> por ano, enquanto a média nacional ficou em <b>"+formatarDinheiro(a.repasse_recursos.nr_repasse_media_nacional)+"</b>. ",null!=a.repasse_recursos.tx_maior_tipo_repasse[0]&&(f+="A categoria de recursos mais declarada foi "+a.repasse_recursos.tx_maior_tipo_repasse+", chegando a <b>"+a.repasse_recursos.nr_porcentagem_maior_tipo_repasse+"%</b> dos valores."),f+="</p>",$("#tx_repasse_recursos").append(f),f='<h5 class="legenda_perfil">'+e(["Representante de OSC"])+"</h5>",f+='<h5><a id="tabela-p3" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_repasse_recursos").append(f);if((h={}).configuracao=["f","1000","","f"],h.legenda_x="Ano",h.legenda_y="Recursos (em milhares R$)",h.titulo_colunas=["Repasse","Ano","Recursos (em milhares R$)"],h.titulo="Evolução de recursos transferidos para OSCs",h.fontes=["Representante de OSC"],h.legenda="",h.tipo_grafico="linechart",null!=a.repasse_recursos.series_1)h.series_1=a.repasse_recursos.series_1;else{var m=(new Date).getFullYear(),b=[{tipo_valor:"$",values:[{x:m-2,y:0},{x:m-1,y:0},{x:m,y:0}],key:"Recursos próprios"},{tipo_valor:"$",values:[{x:m-2,y:0},{x:m-1,y:0},{x:m,y:0}],key:"Recursos públicos"},{tipo_valor:"$",values:[{x:m-2,y:0},{x:m-1,y:0},{x:m,y:0}],key:"Recursos privados"},{tipo_valor:"$",values:[{x:m-2,y:0},{x:m-1,y:0},{x:m,y:0}],key:"Recursos não financeiros"}];h.series_1=b}escolherGrafico("p3",h);f="<p>"+a.tx_localidade+" contém <b>"+a.area_atuacao.nr_porcentagem_maior+"%</b> das OSCs atuando em "+a.area_atuacao.tx_porcentagem_maior;f+=". Enquanto o percentual médio nacional está com <b>"+a.area_atuacao.nr_porcentagem_maior_media_nacional+"%</b> relacionada a atividade econômica ",f+=a.area_atuacao.tx_porcentagem_maior_media_nacional,f+=".</p>",$("#tx_area_atuacao").append(f),f='<h5 class="legenda_perfil">'+e(a.area_atuacao.fontes)+"</h5>",f+='<h5><a id="tabela-p4" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_area_atuacao").append(f);(h={}).configuracao=["f","1","","f"],h.legenda_x="Atividade Econômica",h.legenda_y="Quantidade OSC",h.titulo_colunas=["Atividade Econômica","Quantidade OSC"],h.titulo="Distribuição de OSCs por área de atuação",h.fontes=a.area_atuacao.fontes,h.legenda="",h.tipo_grafico="donutchart",h.series_1=a.area_atuacao.series_1,escolherGrafico("p4",h);var f="<p>"+o(a.tx_tipo_localidade,1)+" possui <b>"+a.trabalhadores.nr_porcentagem_maior+"%</b> de ";f+=a.trabalhadores.tx_porcentagem_maior+". Enquanto o percentual médio nacional representa <b>"+a.trabalhadores.nr_porcentagem_maior_media_nacional+"%</b> de ",f+=a.trabalhadores.tx_porcentagem_maior_media_nacional,f+="</p>",$("#tx_trabalhadores").append(f),f='<h5 class="legenda_perfil">'+e(a.trabalhadores.fontes)+"</h5>",f+='<h5><a id="tabela-p5" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_trabalhadores").append(f);var h;(h={}).configuracao=["f","1","","f"],h.legenda_x="Tipo",h.legenda_y="Número de trabalhadores",h.titulo_colunas=["Tipo","Número de trabalhadores"],h.titulo="Distribuição de trabalhodores",h.fontes=a.trabalhadores.fontes,h.legenda="",h.tipo_grafico="barchart",h.series_1=a.trabalhadores.series_1,escolherGrafico("p5",h),$(".dt_pub_news").before($(".social")),$(".social").css("display","flex"),$(".loading").addClass("hide"),$(".social iframe").each(function(){$(this).attr("title","")})}})});