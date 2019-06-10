"use strict";require(["jquery-ui"],function(a){$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix"),$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left"),$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(e){e.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["rotas","nv.d3.lib","graficoParaTabela"],function(a){function e(a){var e=". ";return null!=a&&(e=a.join(", ").replace(/'/gi,""),e+=". "),"Fonte: "+e}var o=new Rotas;$("#voltaPagAnterior").on("click",function(){history.go(-1)});var s=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null,r="";null!==s&&function(a){$("#voltaPerfil").attr("href","analise-perfil.html?localidade="+a)}(r=s[1]),$.ajax({url:o.RecuperarPerfilByIDLocalidade(r),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide"),$(".tela").addClass("hide")},success:function(a){$("#tx_localidade").text(a.tx_localidade);var o=[];o.push("Quantidade OSCs e Quantidade Trabalhadores: "+a.caracteristicas.ft_quantidade_osc),$("#tabela caption").text(e(o));var s=[];a.caracteristicas.ft_quantidade_recursos.length?s.push("Valores de Recursos: "+a.caracteristicas.ft_quantidade_recursos):s.push("Valores de Recursos: SigaBrasil. Valores deflacionados para Dez/2018"),$("#tabela caption").append("<br>"+e(s));var r=[];a.caracteristicas.ft_quantidade_projetos.length?r.push("Quantidade Projetos: "+a.caracteristicas.ft_quantidade_projetos):r.push("Quantidade Projetos: Não há projetos"),$("#tabela caption").append("<br>"+e(r));f='<h5><a id="tabela-p1" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';$("#tabela caption").append(f);var t="<tr>";t+="<td>"+a.caracteristicas.nr_quantidade_osc.toLocaleString("pt-BR")+"</td>",t+="<td>"+a.caracteristicas.nr_quantidade_trabalhadores.toLocaleString("pt-BR")+"</td>",t+="<td>"+formatarDinheiro(a.caracteristicas.nr_orcamento_empenhado)+"</td>",t+="<td>"+a.caracteristicas.nr_quantidade_projetos.toLocaleString("pt-BR")+"</td>",t+="</tr>",$("#tabela tbody").append(t),f="<p>"+a.tx_localidade+" é o <b>"+a.evolucao_quantidade_osc_ano.nr_colocacao_nacional+"º</b> em relação a quantidade de OSCs no âmbito nacional. ",f+="Nesse ranking, o estado ("+a.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado+", <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado.toLocaleString("pt-BR")+"</b> OSCs) ",f+="e o município ("+a.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio+", <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio.toLocaleString("pt-BR")+"</b> OSCs) são os que contêm mais OSCs. ",f+="O estado ("+a.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0]+") e o município ("+a.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0]+") ",f+="são os que contêm menos OSCs, <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado.toLocaleString("pt-BR")+"</b> e <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio.toLocaleString("pt-BR")+"</b> respectivamente.",f+="</p>",$("#tx_caracteristicas").append(f);b={};b.configuracao=["f","1","","f"],b.legenda_x="Ano",b.legenda_y="Quantidade OSC",b.titulo_colunas=["Evolução","Ano","Quantidade"],b.titulo="Evolucao da quantidade OSCs por ano",b.fontes=a.evolucao_quantidade_osc_ano.fontes,b.legenda="",b.tipo_grafico="linechart";var i=[];i.push(a.evolucao_quantidade_osc_ano.series_1[0]);var d={};d.area=!1,d.color="#ff7f0e",d.key="Quantidade OSC Acumulada",d.tipo_valor="";for(var n=[],c=0,l=0;l<a.evolucao_quantidade_osc_ano.series_1.length;l++)for(var _=0;_<a.evolucao_quantidade_osc_ano.series_1[l].values.length;_++){var u={};u.x=a.evolucao_quantidade_osc_ano.series_1[l].values[_].x,c+=a.evolucao_quantidade_osc_ano.series_1[l].values[_].y,u.y=c,n.push(u)}d.values=n,i.push(d),b.series_1=i,escolherGrafico("p1",b);f="<p>Na população de OSCs "+function(a,e){var o=a.toLowerCase(),s="do "+o;return 1==e&&(s="O "+o),"região"==o&&(s="da "+o,1==e&&(s="A "+o)),s}(a.tx_tipo_localidade,2)+", <b>"+a.natureza_juridica.nr_porcentagem_maior+"%</b> são classificadas como ";f+=a.natureza_juridica.tx_porcentagem_maior+". A média nacional é de <b>"+a.natureza_juridica.nr_porcentagem_maior_media_nacional+"%</b> de OSCs identificadas como ",f+=a.natureza_juridica.tx_porcentagem_maior_media_nacional,f+=".</p>",$("#tx_natureza_juridica").append(f),f='<h5 class="legenda_perfil">'+e(a.natureza_juridica.fontes)+"</h5>",f+='<h5><a id="tabela-p2" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_natureza_juridica").append(f);(b={}).configuracao=["f","1","","f"],b.legenda_x="Natureza Jurídica",b.legenda_y="Quantidade OSC",b.titulo_colunas=["Natureza Jurídica","Quantidade OSC"],b.titulo="Número de OSCs por natureza jurídica",b.fontes=a.natureza_juridica.fontes,b.legenda="",b.tipo_grafico="barchart",b.series_1=a.natureza_juridica.series_1,escolherGrafico("p2",b);f="<p>"+a.tx_localidade;a.repasse_recursos.nr_repasse_media>0?(f+=" é o <b>"+a.repasse_recursos.nr_colocacao_nacional+"º</b> em relação aos repasses de recursos para OSCs, com média de <b>",f+=formatarDinheiro(a.repasse_recursos.nr_repasse_media)+"</b> por ano."):f+=" não possui declarações de OSCs sobre repasse de recursos nos últimos 3 anos.",f+=" A média nacional de repasse de recursos é de <b>"+formatarDinheiro(a.repasse_recursos.nr_repasse_media_nacional)+"</b>. ",null!=a.repasse_recursos.tx_maior_tipo_repasse[0]&&(f+="Além dos repasses federais, a categoria de recursos mais declarada foi "+a.repasse_recursos.tx_maior_tipo_repasse+" com <b>"+a.repasse_recursos.nr_porcentagem_maior_tipo_repasse+"%</b> do total."),f+="</p>",$("#tx_repasse_recursos").append(f),f='<h5 class="legenda_perfil">'+e(a.repasse_recursos.fontes)+"</h5>",f+='<h5><a id="tabela-p3" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_repasse_recursos").append(f);if((b={}).configuracao=["f","1000","","f"],b.legenda_x="Ano",b.legenda_y="Recursos (em milhares R$)",b.titulo_colunas=["Repasse","Ano","Recursos"],b.titulo="Evolução de recursos transferidos para OSCs",b.fontes=a.repasse_recursos.fontes,b.legenda="",b.tipo_grafico="linechart",null!=a.repasse_recursos.series_1)b.series_1=a.repasse_recursos.series_1;else{m=[{tipo_valor:"$",values:[{x:(p=(new Date).getFullYear())-2,y:0},{x:p-1,y:0},{x:p,y:0}],key:"Recursos próprios"},{tipo_valor:"$",values:[{x:p-2,y:0},{x:p-1,y:0},{x:p,y:0}],key:"Recursos públicos"},{tipo_valor:"$",values:[{x:p-2,y:0},{x:p-1,y:0},{x:p,y:0}],key:"Recursos privados"},{tipo_valor:"$",values:[{x:p-2,y:0},{x:p-1,y:0},{x:p,y:0}],key:"Recursos não financeiros"}];b.series_1=m}escolherGrafico("p3",b),f="A média de transferências Federais é de <b>"+formatarDinheiro(a.orcamento.media)+"</b>.",$("#tx_transferencias_federais").append(f),f='<h5 class="legenda_perfil">'+e(a.orcamento.fontes)+"</h5>",f+='<h5><a id="tabela-p6" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_transferencias_federais").append(f);if((b={}).configuracao=["f","1000","","f"],b.legenda_x="Ano",b.legenda_y="Transferências Federais (em milhares R$)",b.titulo_colunas=["Transferências Federais","Ano","Quantidade"],b.titulo="Transferências Federais para OSCs por ano",b.fontes=a.orcamento.fontes,b.legenda="",b.tipo_grafico="linechart",null!=a.orcamento.series_1)b.series_1=a.orcamento.series_1;else{var p=(new Date).getFullYear(),m=[{tipo_valor:"$",values:[{x:p-2,y:0},{x:p-1,y:0},{x:p,y:0}],key:"Orçamento empenhado"}];b.series_1=m}escolherGrafico("p6",b);for(var f="<p>"+a.tx_localidade+" possui <b>"+a.area_atuacao.nr_porcentagem_maior+"%</b> das OSCs atuando em "+a.area_atuacao.tx_porcentagem_maior[0],l=0;l<a.area_atuacao.media_nacional.length;l++){a.area_atuacao.media_nacional[l].tx_area_atuacao==a.area_atuacao.tx_porcentagem_maior[0]&&(f+=", enquanto o percentual médio nacional de OSCs nesta categoria é de <b>"+a.area_atuacao.media_nacional[l].nr_area_atuacao+"%</b>.");break}$("#tx_area_atuacao").append(f),f='<h5 class="legenda_perfil">'+e(a.area_atuacao.fontes)+"</h5>",f+='<h5><a id="tabela-p4" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_area_atuacao").append(f);(b={}).configuracao=["f","1","","f"],b.legenda_x="Atividade Econômica",b.legenda_y="Quantidade OSC",b.titulo_colunas=["Atividade Econômica","Quantidade OSC"],b.titulo="Distribuição de OSCs por área de atuação",b.fontes=a.area_atuacao.fontes,b.legenda="",b.tipo_grafico="donutchart",b.series_1=a.area_atuacao.series_1,escolherGrafico("p4",b);f="<p>"+a.tx_localidade+" foram identificados ";f+="<b>"+a.trabalhadores.series_1[0].value+"</b> "+a.trabalhadores.series_1[0].label+". ",f+="Alem desses, as OSCS declararam <b>"+a.trabalhadores.series_1[2].value+"</b> "+a.trabalhadores.series_1[2].label+" e ",f+="<b>"+a.trabalhadores.series_1[1].value+"</b> "+a.trabalhadores.series_1[1].label+".",f+="</p>",$("#tx_trabalhadores").append(f),f='<h5 class="legenda_perfil">'+e(a.trabalhadores.fontes)+"</h5>",f+='<h5><a id="tabela-p5" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_trabalhadores").append(f);var b;(b={}).configuracao=["f","1","","f"],b.legenda_x="Tipo",b.legenda_y="Número de trabalhadores",b.titulo_colunas=["Tipo","Número de trabalhadores"],b.titulo="Distribuição de trabalhodores",b.fontes=a.trabalhadores.fontes,b.legenda="",b.tipo_grafico="barchart",b.series_1=a.trabalhadores.series_1,escolherGrafico("p5",b),$(".dt_pub_news").before($(".social")),$(".social").css("display","flex"),$(".loading").addClass("hide"),$(".social iframe").each(function(){$(this).attr("title","")})}})});