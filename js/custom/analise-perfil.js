"use strict";require(["jquery-ui"],function(a){$("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix"),$("#tabs li").removeClass("ui-corner-top").addClass("ui-corner-left"),$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(e){e.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["rotas","nv.d3.lib","graficoParaTabela"],function(a){function e(a){var e=". ";return null!=a&&(e=a.join(", ").replace(/'/gi,""),e+=". "),"Fonte: "+e}function o(a,e){var o=a.toLowerCase(),t="do "+o;return 1==e&&(t="O "+o),"região"==o&&(t="da "+o,1==e&&(t="A "+o)),t}var t=new Rotas;$("#voltaPagAnterior").on("click",function(){history.go(-1)});var r=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null,i="";null!==r&&function(a){$("#voltaPerfil").attr("href","analise-perfil.html?localidade="+a)}(i=r[1]),$.ajax({url:t.RecuperarPerfilByIDLocalidade(i),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide"),$(".tela").addClass("hide")},success:function(a){$("#tx_localidade").text(a.tx_localidade),$("#tabela caption").text(e(a.caracteristicas.fontes));s='<h5><a id="tabela-p1" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>';$("#tabela caption").append(s);var t="<tr>";t+="<td>"+a.caracteristicas.nr_quantidade_oscs.toLocaleString("pt-BR")+"</td>",t+="<td>"+a.caracteristicas.nr_quantidade_trabalhadores.toLocaleString("pt-BR")+"</td>",t+="<td>"+formatarDinheiro(a.caracteristicas.nr_quantidade_recursos)+"</td>",t+="<td>"+a.caracteristicas.nr_quantidade_projetos.toLocaleString("pt-BR")+"</td>",t+="</tr>",$("#tabela tbody").append(t),s="<p>"+a.tx_localidade+" é o <b>"+a.evolucao_quantidade_osc_ano.nr_colocacao_nacional+"º</b> em relação a quantidade de OSCs no âmbito nacional. ",s+="Nesse ranking, o estado ("+a.evolucao_quantidade_osc_ano.tx_primeiro_colocado_estado+", <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_estado.toLocaleString("pt-BR")+"</b> OSCs) ",s+="e o município ("+a.evolucao_quantidade_osc_ano.tx_primeiro_colocado_municipio+", <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_primeiro_colocado_municipio.toLocaleString("pt-BR")+"</b> OSCs) são os que contêm mais OSCs. ",s+="O estado ("+a.evolucao_quantidade_osc_ano.tx_ultimo_colocado_estado[0]+") e o município ("+a.evolucao_quantidade_osc_ano.tx_ultimo_colocado_municipio[0]+") ",s+="são os que contêm menos OSCs, <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_estado.toLocaleString("pt-BR")+"</b> e <b>"+a.evolucao_quantidade_osc_ano.nr_quantidade_oscs_ultimo_colocado_municipio.toLocaleString("pt-BR")+"</b> respectivamente.",s+="</p>",$("#tx_caracteristicas").append(s);n={};n.configuracao=["f","1","","f"],n.legenda_x="Ano",n.legenda_y="Quantidade OSC",n.titulo_colunas=["Evolução","Ano","Quantidade"],n.titulo="Evolucao da quantidade OSCs por ano",n.fontes=a.evolucao_quantidade_osc_ano.fontes,n.legenda="",n.tipo_grafico="linechart",n.series_1=a.evolucao_quantidade_osc_ano.series_1,escolherGrafico("p1",n);s="<p>Na população de OSCs "+o(a.tx_tipo_localidade,2)+", <b>"+a.natureza_juridica.nr_porcentagem_maior+"%</b> são ";s+=a.natureza_juridica.tx_porcentagem_maior+". Enquanto, em relação a média nacional <b>"+a.natureza_juridica.nr_porcentagem_maior_media_nacional+"%</b> são ",s+=a.natureza_juridica.tx_porcentagem_maior_media_nacional,s+=".</p>",$("#tx_natureza_juridica").append(s),s='<h5 class="legenda_perfil">'+e(a.natureza_juridica.fontes)+"</h5>",s+='<h5><a id="tabela-p2" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_natureza_juridica").append(s);(n={}).configuracao=["f","1","","f"],n.legenda_x="Natureza Jurídica",n.legenda_y="Quantidade OSC",n.titulo_colunas=["Natureza Jurídica","Quantidade OSC"],n.titulo="Número de OSCs por natureza jurídica",n.fontes=a.natureza_juridica.fontes,n.legenda="",n.tipo_grafico="barchart",n.series_1=a.natureza_juridica.series_1,escolherGrafico("p2",n);s="<p>"+a.tx_localidade+" é o <b>"+a.repasse_recursos.nr_colocacao_nacional+"º</b> em relação ao repasse de recursos, com média de <b>";s+=formatarDinheiro(a.repasse_recursos.nr_repasse_media)+"</b> por ano, enquanto a média nacional ficou em <b>"+formatarDinheiro(a.repasse_recursos.nr_repasse_media_nacional)+"</b>. ",null!=a.repasse_recursos.tx_maior_tipo_repasse[0]&&(s+="A entidade que mais repassou foi "+a.repasse_recursos.tx_maior_tipo_repasse+", chegando a <b>"+a.repasse_recursos.nr_porcentagem_maior_tipo_repasse+"%</b> dos valores."),s+="</p>",$("#tx_repasse_recursos").append(s),s='<h5 class="legenda_perfil">'+e(a.natureza_juridica.fontes)+"</h5>",s+='<h5><a id="tabela-p3" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_repasse_recursos").append(s);if((n={}).configuracao=["f","1000","","f"],n.legenda_x="Ano",n.legenda_y="Recursos (em milhares R$)",n.titulo_colunas=["Repasse","Ano","Recursos (em milhares R$)"],n.titulo="Evolução de recursos transferidos para OSCs",n.fontes=a.repasse_recursos.fontes,n.legenda="",n.tipo_grafico="linechart",null!=a.repasse_recursos.series_1)n.series_1=a.repasse_recursos.series_1;else{var r=(new Date).getFullYear(),i=[{tipo_valor:"$",values:[{x:r,y:0}],key:"Recursos próprios"},{tipo_valor:"$",values:[{x:r,y:0}],key:"Recursos públicos"},{tipo_valor:"$",values:[{x:r,y:0}],key:"Recursos privados"},{tipo_valor:"$",values:[{x:r,y:0}],key:"Recursos não financeiros"}];n.series_1=i}escolherGrafico("p3",n);s="<p>"+a.tx_localidade+" contém <b>"+a.area_atuacao.nr_porcentagem_maior+"%</b> das OSCs atuando em "+a.area_atuacao.tx_porcentagem_maior;s+=". Enquanto a média nacional está com <b>"+a.area_atuacao.nr_porcentagem_maior_media_nacional+"%</b> relacionada a atividade econômica ",s+=a.area_atuacao.tx_porcentagem_maior_media_nacional,s+=".</p>",$("#tx_area_atuacao").append(s),s='<h5 class="legenda_perfil">'+e(a.natureza_juridica.fontes)+"</h5>",s+='<h5><a id="tabela-p4" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_area_atuacao").append(s);(n={}).configuracao=["f","1","","f"],n.legenda_x="Atividade Econômica",n.legenda_y="Quantidade OSC",n.titulo_colunas=["Atividade Econômica","Quantidade OSC"],n.titulo="Distribuição de OSCs por área de atuação",n.fontes=a.area_atuacao.fontes,n.legenda="",n.tipo_grafico="donutchart",n.series_1=a.area_atuacao.series_1,escolherGrafico("p4",n);var s="<p>"+o(a.tx_tipo_localidade,1)+" possui <b>"+a.trabalhadores.nr_porcentagem_maior+"%</b> de ";s+=a.trabalhadores.tx_porcentagem_maior+". Enquanto a média nacional apresenta <b>"+a.trabalhadores.nr_porcentagem_maior_media_nacional+"%</b> de ",s+=a.trabalhadores.tx_porcentagem_maior_media_nacional,s+="</p>",$("#tx_trabalhadores").append(s),s='<h5 class="legenda_perfil">'+e(a.natureza_juridica.fontes)+"</h5>",s+='<h5><a id="tabela-p5" class="btn-item" data-toggle="modal" title="Mostrar os dados em Tabela.">Visualize os dados em tabela.</a></h5>',$("#tx_trabalhadores").append(s);var n;(n={}).configuracao=["f","1","","f"],n.legenda_x="Tipo",n.legenda_y="Número de trabalhadores",n.titulo_colunas=["Tipo","Número de trabalhadores"],n.titulo="Distribuição de trabalhodores",n.fontes=a.trabalhadores.fontes,n.legenda="",n.tipo_grafico="barchart",n.series_1=a.trabalhadores.series_1,escolherGrafico("p5",n),$(".dt_pub_news").before($(".social")),$(".social").css("display","flex"),$(".loading").addClass("hide"),$(".social iframe").each(function(){$(this).attr("title","")})}})});