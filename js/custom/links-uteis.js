"use strict";require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,o){$(this).css(a),$("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(o){o.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["react","rotas","jsx!components/Util"],function(a){require(["componenteLinksUteis"],function(o){for(var e=["Portal de Convênios","Biblioteca Digital das OSCs","Biblioteca do Marco Regulatório das OSCs","Pesquisa FASFIL 2010","Participa.br","Marco Regulatório das OSCs","Sniic - Sistema Nacional de Informações e Indicadores Culturais"],i=["O Portal dos Convênios é a página virtual que abriga o Sistema de Gestão de Convênios e Contratos de Repasse – SICONV, bem como todo o conjunto de informações relacionadas a convênios e contratos de repasse.","Página oficial da Biblioteca da Associação Brasileira de Organizações Não Governamentais – ABONG.","A Biblioteca do Marco Regulatório das OSCs reúne estudos e pesquisas sobre OSCs.","Pesquisa sobre Fundações Privadas e Associações sem Fins Lucrativos – FASFIL.","O Participa.br é uma Plataforma de Participação Social. Trata-se de um espaço virtual para participação social no Brasil, com o objetivo de facilitar o diálogo entre o Governo Federal e a Sociedade Civil.","O Marco Regulatório das Organizações da Sociedade Civil é fruto de um esforço conjunto do governo federal e da sociedade civil para modernizar as relações do poder público com as Organizações da Sociedade Civil.","O Sistema Nacional de Informações e Indicadores Culturais é um banco de dados disponível para toda a sociedade. Ele reúne dados de bens, serviços, infraestrutura, investimentos, instituições e gestão cultural, produção, acesso, consumo, agentes, programas e transparência."],s=["img/siconv.png","img/abong.png","img/mrosc.png","img/fasfil-2010.png","img/participa-br.png","img/icone-mrosc.png","img/sniic.png"],t=["http://portal.convenios.gov.br/","http://bibliotecadigital.abong.org.br/","http://www.secretariadegoverno.gov.br/iniciativas/mrosc/estudos-e-pesquisas","ftp://ftp.ibge.gov.br/Fundacoes_Privadas_e_Associacoes/2010/fasfil.pdf","http://www.participa.br/","http://www.secretariadegoverno.gov.br/iniciativas/mrosc","http://sniic.cultura.gov.br/"],r=[],n=0;n<e.length;n++)r.push(new function(a,o,e,i,s){this.titulo=a,this.desc=o,this.imagem=e,this.elo=i,this.linkExterno=s}(e[n],i[n],s[n],t[n],!0));o=a.createFactory(o),ReactDOM.render(o({dados:r}),document.getElementById("linksuteis_formato_dados"))})});