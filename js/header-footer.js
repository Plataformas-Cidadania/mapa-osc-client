
"use strict";require(["react","jsx!components/Header","bootstrap"],function(e,t){function a(e,t){this.text=e,this.link=t}function o(e,t){this.text=e,this.link=t}var s=[];s.push(new o("Home","index.html")),s.push(new o("Mapa","resultado-consulta.html")),s.push(new o("Contato","contato.html")),s.push(new o("Cadastre-se","cadastro-representante.html")),s.push(new o("Entrar",""));var n=[];n.push(new a("Sobre","sobre.html")),n.push(new a("Metodologia","metodologia.html")),n.push(new a("Equipe","equipe.html")),n.push(new a("Versão","versao.html")),n.push(new a("","")),n.push(new a("Glossário","glossario.html")),n.push(new a("Tutoriais","tutoriais.html")),n.push(new a("Perguntas frequentes","perguntas-frequentes.html")),n.push(new a("","")),n.push(new a("Editais para OSCs","editais.html")),n.push(new a("Colabore","colabore.html")),n.push(new a("Apoio","apoio.html")),n.push(new a("Links","links-uteis.html"));var i=[];i.push(new a("Base de Dados","base-dados.html")),i.push(new a("Dados e Indicadores","dados-indicadores.html"));var r=[];r.push(new a("Configurar Conta","configurar-conta.html")),r.push(new a("Editar Página OSC","minhas-oscs.html")),r.push(new a("","")),r.push(new a("","")),r.push(new a("Sair","javascript: deslogar();void(0);")),t=e.createFactory(t),ReactDOM.render(t({headerObject:new function(e,t,a,o){this.dropdown=e,this.menuList=t,this.menuLogado=a,this.menuDados=o}(n,s,r,i)}),document.getElementById("header")),ativaEnterModalLogin(),verificarLogado(),verificarContraste(),document.getElementById("navCont").accessKey="1",document.getElementById("navMenu").accessKey="2",document.getElementById("navRoda").accessKey="3"}),require(["react","jsx!components/Footer","bootstrap"],function(e,t){function a(e,t,a,o){this.title=e,this.urls=t,this.texts=a,this.target=o}var o=[];o.push(new a("Mapa das OCSs",["metodologia.html","termos-uso.html","cadastro-representante.html","contato.html"],["Metodologia","Termos de Uso","Cadastro de Representante","Contato e Sugestões"],"_self")),o.push(new a("Ajuda",["glossario.html","perguntas-frequentes.html","tutoriais.html","mapa-do-site.html"],["Glossário","Perguntas Frequentes","Tutoriais","Mapa do Site"],"_self")),o.push(new a("IPEA",["http://portal.convenios.gov.br/","http://ivs.ipea.gov.br/","http://www.ipea.gov.br/extrator/","http://www.ipea.gov.br/participacao/"],["Portal dos Convênios","Atlas da Vulnerabilidade Social","Extrator de Dados do Ipea","Participação em Foco"],"_blank"));var s=["img\\ipea-realizacao.png","Instituto de Pesquisa Economica Aplicada","img\\ipea-realizacao.png","Instituto de Pesquisa Economica Aplicada"],n=[["img\\logo_secretaria.png","img\\logo-mj.png","img\\logo_ods.png"],["http://www.secretariadegoverno.gov.br/","http://www.justica.gov.br/","http://agenda2030.com.br/"],["Link externo para Secretaria de Governo","Link externo para Ministério da Justiça e Cidadania","Link externo para Plataforma Agenda 2030"]];t=e.createFactory(t),ReactDOM.render(t({footerObject:new function(e,t,a){this.blocks=e,this.imgsAltRealizacao=t,this.imgList=a}(o,s,n)}),document.getElementById("rodape")),verificarContraste(),window.onload=function(){verificarLogado(),verificarContraste()}});

