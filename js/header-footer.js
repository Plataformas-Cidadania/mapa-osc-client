//Header da página
require(['react', 'jsx!components/Header','bootstrap'], function(React, Header) {

  function MenuDropDownObject(text, link){
    this.text = text;
    this.link = link;
  }
  function Menu(dropdown, menuList, menuLogado, menuDados, menuCadastro, menuLogadoEstadoMunicipio){
    this.dropdown = dropdown;
    this.menuList = menuList;
    this.menuLogado = menuLogado;
    this.menuDados = menuDados;
    this.menuCadastro = menuCadastro;
    this.menuLogadoEstadoMunicipio = menuLogadoEstadoMunicipio;
  }

  function MenuListObject(text, link){
    this.text = text;
    this.link = link;
  }

  var menuList = [];
  menuList.push(new MenuListObject("Home", "index.html"));
  menuList.push(new MenuListObject("Mapa", "resultado-consulta.html"));
  menuList.push(new MenuListObject("Contato", "contato.html"));
  menuList.push(new MenuListObject("Editar OSCs", "minhas-oscs.html"));
  menuList.push(new MenuListObject("Enviar Dados", "entrada-dados.html"));
  menuList.push(new MenuListObject("Entrar", ""));

  var linksSubmenu = [];
  linksSubmenu.push(new MenuDropDownObject("Sobre", "sobre.html"));
  linksSubmenu.push(new MenuDropDownObject("Metodologia", "metodologia.html"));
  linksSubmenu.push(new MenuDropDownObject("Equipe", "equipe.html"));
  linksSubmenu.push(new MenuDropDownObject("Versão", "versao.html"));
  linksSubmenu.push(new MenuDropDownObject("",""));
  linksSubmenu.push(new MenuDropDownObject("Glossário", "glossario.html"));
  linksSubmenu.push(new MenuDropDownObject("Tutoriais", "tutoriais.html"));
  linksSubmenu.push(new MenuDropDownObject("Perguntas frequentes", "perguntas-frequentes.html"));
  linksSubmenu.push(new MenuDropDownObject("",""));
  linksSubmenu.push(new MenuDropDownObject("Imprensa", "imprensa.html"));
  linksSubmenu.push(new MenuDropDownObject("Publicações", "publicacoes.html"));
  linksSubmenu.push(new MenuDropDownObject("Editais para OSCs", "editais.html"));
  linksSubmenu.push(new MenuDropDownObject("Colabore", "colabore.html"));
  linksSubmenu.push(new MenuDropDownObject("Apoio", "apoio.html"));
  linksSubmenu.push(new MenuDropDownObject("Links", "links-uteis.html"));

  var linksSubmenuCadastro = [];
  linksSubmenuCadastro.push(new MenuDropDownObject("Representante OSC", "cadastro-representante.html"));
  linksSubmenuCadastro.push(new MenuDropDownObject("Estado/Município", "cadastro-estado-municipio.html"));

  var linksSubmenuDados = [];
  linksSubmenuDados.push(new MenuDropDownObject("Base de Dados", "base-dados.html"));
  linksSubmenuDados.push(new MenuDropDownObject("Dados e Indicadores", "dados-indicadores.html"));

  var linksUsuarioLogado = [];
  linksUsuarioLogado.push(new MenuDropDownObject("Configurar Conta", "configurar-conta.html"));
  linksUsuarioLogado.push(new MenuDropDownObject("",""));
  linksUsuarioLogado.push(new MenuDropDownObject("Editar OSCs", "minhas-oscs.html"));
  linksUsuarioLogado.push(new MenuDropDownObject("",""));
  linksUsuarioLogado.push(new MenuDropDownObject("Sair", "javascript: deslogar();void(0);"));

  var linksUsuarioLogadoEstadoMunicipio = [];
  linksUsuarioLogadoEstadoMunicipio.push(new MenuDropDownObject("Configurar Conta", "configurar-conta-perfil.html"));
  linksUsuarioLogadoEstadoMunicipio.push(new MenuDropDownObject("",""));
  linksUsuarioLogadoEstadoMunicipio.push(new MenuDropDownObject("Enviar Dados", "entrada-dados.html"));
  linksUsuarioLogadoEstadoMunicipio.push(new MenuDropDownObject("",""));
  linksUsuarioLogadoEstadoMunicipio.push(new MenuDropDownObject("Sair", "javascript: deslogar();void(0);"));


  Header = React.createFactory(Header);
  ReactDOM.render(Header({headerObject: new Menu(linksSubmenu, menuList, linksUsuarioLogado, linksSubmenuDados, linksSubmenuCadastro, linksUsuarioLogadoEstadoMunicipio)}), document.getElementById("header"));

  ativaEnterModalLogin();
  ativaEnterModalLocalidade();
  verificarLogado();
  verificarContraste();
  document.getElementById("navCont").accessKey = "1";
  document.getElementById("navMenu").accessKey = "2";
  document.getElementById("navRoda").accessKey = "3";
});

//Footer da página
require(['react', 'jsx!components/Footer','bootstrap'], function(React, Footer) {

  function BlockFooterObject(title, urls, texts, target){
    this.title = title;
    this.urls = urls;
    this.texts = texts;
    this.target= target;
  }
  // links do menu inferior
  var blocks = [];
  blocks.push(new BlockFooterObject("Mapa das OCSs", ["metodologia.html", "termos-uso.html","cadastro-representante.html", "contato.html"], ["Metodologia", "Termos de Uso", "Cadastro de Representante", "Contato e Sugestões"], "_self"));
  blocks.push(new BlockFooterObject("Ajuda", ["glossario.html", "perguntas-frequentes.html", "tutoriais.html", "mapa-do-site.html"], ["Glossário", "Perguntas Frequentes", "Tutoriais", "Mapa do Site"], "_self"));
  blocks.push(new BlockFooterObject("IPEA", ["http://portal.convenios.gov.br/", "http://ivs.ipea.gov.br/", "http://www.ipea.gov.br/extrator/","http://www.ipea.gov.br/participacao/"], ["Portal dos Convênios", "Atlas da Vulnerabilidade Social", "Extrator de Dados do Ipea","Participação em Foco"],"_blank"));

  // src e alt, respectivamente, da parte de "realização" normal e com contraste
  var imgsAltRealizacao = ["img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada", "img\\ipea-realizacao.png", "Instituto de Pesquisa Economica Aplicada"];
  //Carrossel do rodapé
  var imgList = [["img\\logo_secretaria.png", "img\\logo-mj.png", "img\\logo_ods.png","img\\logo_prosas.png"],
                 ["http://www.secretariadegoverno.gov.br/","http://www.justica.gov.br/","http://www.agenda2030.com.br/","https://prosas.com.br"],
                 ["Link externo para Secretaria de Governo","Link externo para Ministério da Justiça e Cidadania","Link externo para Plataforma Agenda 2030","Link externo para Prosas"]];

  function FooterObject(blocks, imgsAltRealizacao, imgList){
    this.blocks =blocks;
    this.imgsAltRealizacao = imgsAltRealizacao;
    this.imgList = imgList;
  }

  Footer = React.createFactory(Footer);
  ReactDOM.render(Footer({footerObject: new FooterObject(blocks, imgsAltRealizacao, imgList)}), document.getElementById("rodape"));

  verificarContraste();

  window.onload = function () {
    verificarLogado();
    verificarContraste();
  };

});
