class Rotas{

  constructor() {
  }

  getBaseUrl(){
    var loc = window.location;
    return loc.protocol + '//' + loc.host + ':' + loc.port + '/api/';
  //  return  "https://mapaosc-desenv.ipea.gov.br/api/";
  }

  getBaseUrlCMS(){
    var loc = window.location;
    return "http://" + loc.host.split(":")[0] + '/cms';//':8181';
  //  return  "https://mapaosc-desenv.ipea.gov.br/cms";

  }

  //index.js
  AutocompleteOSCByName(term, limit, similarity){
    return this.getBaseUrl()+"search/osc/autocomplete/"+term+"/"+limit+"/0/"+similarity;
  }
  AutocompleteOSCByCnpj(term, limit){
    return this.getBaseUrl()+"search/cnpj/autocomplete/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByCounty(term, limit){
    return this.getBaseUrl()+"menu/geo/municipio/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByState(term, limit){
    return this.getBaseUrl()+"menu/geo/estado/"+term+"/"+limit+"/0";
  }
  AutocompleteOSCByRegion(term, limit){
    return this.getBaseUrl()+"menu/geo/regiao/"+term+"/"+limit+"/0";
  }

  //resultado-consulta.js
  OSCPopUpByID(id){
    return this.getBaseUrl()+"osc/popup/"+id;
  }
  OSCByID(id){
    return this.getBaseUrl()+"osc/"+id;
  }
  OSCByNameInMap(term, similarity){
    return this.getBaseUrl()+"search/osc/geo/"+term+"/0/0/"+similarity;
  }
  OSCByCountyInMap(term){
    return this.getBaseUrl()+"search/municipio/geo/"+term;
  }
  OSCByStateInMap(term){
    return this.getBaseUrl()+"search/estado/geo/"+term;
  }
  OSCByRegionInMap(term){
    return this.getBaseUrl()+"search/regiao/geo/"+term;
  }
  AllOSCInMap(){
    return this.getBaseUrl()+"geo/osc/";
  }
  OSCByName(term, offset, similarity){
    return this.getBaseUrl()+"search/osc/lista/"+term+"/10/"+offset+"/"+similarity;
  }
  OSCByCounty(term,offset){
    return this.getBaseUrl()+"search/municipio/lista/"+term+"/10/"+offset;
  }
  OSCByState(term,offset){
    return this.getBaseUrl()+"search/estado/lista/"+term+"/10/"+offset;
  }
  OSCByRegion(term,offset){
    return this.getBaseUrl()+"search/regiao/lista/"+term+"/10/"+offset;
  }
  AllOSC(offset){
    return this.getBaseUrl()+"search/all/lista/10/"+offset;
  }
  ClusterMunicipio(){
    return this.getBaseUrl()+"geo/cluster/municipio";
  }
  ClusterEstado(){
    return this.getBaseUrl()+"geo/cluster/estado";
  }
  ClusterEstadoPorRegiao(id){
    return this.getBaseUrl()+"geo/cluster/estado/"+id;
  }
  ClusterPais(){
    return this.getBaseUrl()+"geo/cluster/regiao";
  }
  ClusterRegiao(id){
    return this.getBaseUrl()+"geo/cluster/regiao/"+id;
  }
  ExportarDadosConsulta(){
    return this.getBaseUrl()+"exportacao/busca";
  }
  Ipeadata(){
    return this.getBaseUrl()+"menu/osc/ipeadata";
  }

  // editar-osc.js
  OSCByID_no_project(id){
    return this.getBaseUrl()+"osc/no_project/"+id;
  }
  ProjectByID(id){
    return this.getBaseUrl()+"projeto/"+id;
  }
  AtualizarProjectByID(id){
    return this.getBaseUrl()+"osc/projeto/"+id;
  }
  CriarProjectByID(id){
    return this.getBaseUrl()+"osc/projeto/insert/"+id;
  }
  RemoverProjectByID(id_proj,id_osc){
    return this.getBaseUrl()+"osc/projeto/"+id_proj+"/"+id_osc;
  }
  Objetivos(){
    return this.getBaseUrl()+"menu/osc/objetivo_projeto";
  }
  MetasById(id){
    return this.getBaseUrl()+"menu/osc/meta_projeto/"+id;
  }
  AreaAtuacao(){
    return this.getBaseUrl()+"menu/osc/area_atuacao";
  }
  AtualizarAreaAtuacao(id){
    return this.getBaseUrl()+"osc/area_atuacao/"+id;
  }
  DadosGerais(id){
    return this.getBaseUrl()+"osc/dadosgerais/"+id;
  }
  SubAreaAtuacao(){
    return this.getBaseUrl()+"menu/osc/subarea_atuacao";
  }
  MetaProjeto(id){
    return this.getBaseUrl()+"componente/metas_objetivo_projeto/"+id;
  }
  Descricao(id){
    return this.getBaseUrl()+"osc/descricao/"+id;
  }
  Certificado(id){
    return this.getBaseUrl()+"osc/certificado/"+id;
  }
  Busca_Certificado(){
    return this.getBaseUrl()+"menu/osc/certificado";
  }
  RelacoesTrabalho(id){
    return this.getBaseUrl()+"osc/relacoestrabalho/"+id;
  }
  RelacoesTrabalhoOutra(id){
    return this.getBaseUrl()+"osc/relacoestrabalhooutra/"+id;
  }
  ParticipacaoSocialConselho(id){
    return this.getBaseUrl()+"osc/participacaosocialconselho/"+id;
  }
  ParticipacaoSocialConferencia(id){
    return this.getBaseUrl()+"osc/participacaosocialconferencia/"+id;
  }
  OutraParticipacaoSocial(id){
    return this.getBaseUrl()+"osc/participacaosocialoutra/"+id;
  }
  PeriodicidadeReuniao(){
    return this.getBaseUrl()+"menu/osc/periodicidade_reuniao/";
  }
  Conselho(){
    return this.getBaseUrl()+"menu/osc/conselho/";
  }
  Conferencia(){
    return this.getBaseUrl()+"menu/osc/conferencia/";
  }
  Titularidade(){
    return this.getBaseUrl()+"menu/osc/tipo_participacao/";
  }
  FontesRecursosById(id){
    return this.getBaseUrl()+"osc/recursos/"+id;
  }
  FontesRecursos(){
    return this.getBaseUrl()+"menu/osc/fonte_recursos_osc";
  }
  AtualizarFontesRecursos(id){
    return this.getBaseUrl()+"osc/recursososc/"+id;
  }
  ConselhoFiscal(id){
    return this.getBaseUrl()+"osc/conselhofiscal/"+id;
  }
  Dirigente(id){
    return this.getBaseUrl()+"osc/dirigente/"+id;
  }
  // editais.js
  Edital(){
    return this.getBaseUrl()+"edital";
  }

  // Header.jsx
  Login(){
    return this.getBaseUrl()+"user/login/";
  }

  //cadastro-receber-noticia.js
  ReceberNoticia(){
    return this.getBaseUrl()+"user/newsletter/";
  }

  //cadastro-representante.js
  CadastroRepresentante(){
    return this.getBaseUrl()+"user/";
  }

  //cadastro-estado-municipio.js
  CadastroRepresentanteEstadoMunicipio(){
    return this.getBaseUrl()+"user/governo/";
  }

  ValidarLocalidade(cod_localidade){
    return this.getBaseUrl()+"user/governo/ativo/localidade/"+cod_localidade;
  }

  //contato.js
  Contato(){
    return this.getBaseUrl()+"user/contato/";
  }

  //recuperar-senha
  RecuperSenha(){
    return this.getBaseUrl()+"user/esquecisenha/";
  }

  //alterar-senha
  AlterarSenha(){
    return this.getBaseUrl()+"user/alterarsenha/";
  }

  //configurar-conta.js
  ValidarUsuario(id){
    return this.getBaseUrl()+"user/"+id;
  }

  UpdateUsuario(id){
    return this.getBaseUrl()+"user/"+id;
   }

   UpdateUsuarioGov(id){
     return this.getBaseUrl()+"user/governo/"+id;
    }

   //usuario
  AtivarUsuario(token){
    return this.getBaseUrl()+"user/ativarcadastro/"+token;
  }

  //consulta avancada
  SituacaoImovel(){
    return this.getBaseUrl()+"menu/osc/situacao_imovel/";
  }

  FontesRecursosProjeto(){
    return this.getBaseUrl()+"menu/osc/origem_fonte_recursos_projeto/";
  }

  ZonaAtuacaoProjeto(){
    return this.getBaseUrl()+"menu/osc/zona_atuacao_projeto/";
  }

  AbrangenciaProjeto(){
    return this.getBaseUrl()+"menu/osc/abrangencia_projeto/";
  }

  SituacaoProjeto(){
    return this.getBaseUrl()+"menu/osc/status_projeto/";
  }

  FormaParticipacaoConferencia(){
    return this.getBaseUrl()+"menu/osc/forma_participacao_conferencia/";
  }

  ConsultaAvancadaLista(offset){
    return this.getBaseUrl()+"search/advanced/lista/10/"+offset;
  }

  ConsultaAvancadaMapa(term){
    return this.getBaseUrl()+"search/advanced/geo/0/0";
  }

  AutocompleteAtividadeEconomica(term, limit){
    return this.getBaseUrl()+"search/atividade_economica/autocomplete/"+term+"/"+limit;
  }

  //Recuperar por get nome campo - resultado da busca
  SituacaoImovel_id(id){
    return this.getBaseUrl()+"menu/osc/situacao_imovel/"+id;
  }

  FontesRecursosProjeto_id(id){
    return this.getBaseUrl()+"menu/osc/origem_fonte_recursos_projeto/"+id;
  }

  ZonaAtuacaoProjeto_id(id){
    return this.getBaseUrl()+"menu/osc/zona_atuacao_projeto/"+id;
  }

  AbrangenciaProjeto_id(id){
    return this.getBaseUrl()+"menu/osc/abrangencia_projeto/"+id;
  }

  SituacaoProjeto_id(id){
    return this.getBaseUrl()+"menu/osc/status_projeto/"+id;
  }

  FormaParticipacaoConferencia_id(id){
    return this.getBaseUrl()+"menu/osc/forma_participacao_conferencia/"+id;
  }

  PeriodicidadeReuniao_id(id){
    return this.getBaseUrl()+"menu/osc/periodicidade_reuniao/"+id;
  }
  Conselho_id(id){
    return this.getBaseUrl()+"menu/osc/conselho/"+id;
  }
  Conferencia_id(id){
    return this.getBaseUrl()+"menu/osc/conferencia/"+id;
  }
  Titularidade_id(id){
    return this.getBaseUrl()+"menu/osc/tipo_participacao/"+id;
  }
  FontesRecursos_id(id){
      return this.getBaseUrl()+"menu/osc/fonte_recursos_osc/"+id;
  }
  Objetivos_ODS_id(id){
      return this.getBaseUrl()+"menu/osc/objetivoprojeto/"+id;
  }
  Metas_ODS_Id(id){
      return this.getBaseUrl()+"componente/metas_objetivo_projeto/"+id;
  }

  //INICIO CMS
  //Imprensa
  Imprensa(){
    return this.getBaseUrlCMS()+"/imprensa";
  }
  NoticiaByID(id){
    return this.getBaseUrlCMS()+"/noticiaByID/"+id;
  }
  VideoByID(id){
    return this.getBaseUrlCMS()+"/videoByID/"+id;
  }

  //Publicações
  Publicacoes(){
    return this.getBaseUrlCMS()+"/publicacoes";
  }
  PublicacaoByID(id){
    return this.getBaseUrlCMS()+"/publicacaoByID/"+id;
  }

  //graficos
  GraficosSlug(slug){
    return this.getBaseUrlCMS()+"/graficosSlug/"+slug;
  }

  //MROSC
  MenuMrosc(){
    return this.getBaseUrlCMS()+"/menuMrosc";
  }
  ConteudoMroscByID(id){
    return this.getBaseUrlCMS()+"/conteudoMroscByID/"+id;
  }

  ModuloLinks(){
    return this.getBaseUrlCMS()+"/links";
  }

  ModuloEquipe(){
    return this.getBaseUrlCMS()+"/equipes";
  }

  ModuloApoio(){
    return this.getBaseUrlCMS()+"/apoios";
  }

  ModuloWebdoors(){
    return this.getBaseUrlCMS()+"/webdoors";
  }

  ModuloBySlug(slug){
    return this.getBaseUrlCMS()+"/ModuloBySlug/"+slug;
  }
  ModuloByTipo(tipo){
    return this.getBaseUrlCMS()+"/ModuloByTipo/"+tipo;
  }
  ModuloByID(tipo){
    return this.getBaseUrlCMS()+"/ModuloByID/"+tipo;
  }
  //FIM CMS


  BarraTransparencia(id_osc){
    return this.getBaseUrl()+"osc/barratransparencia/"+id_osc;
  }

  RecuperarOscPorLocalidadeAreaAtuacao(cd_area_atuacao, cd_municipio){
    return this.getBaseUrl()+"osc/listaareaatuacao/"+cd_area_atuacao+"/municipio/"+cd_municipio;
  }

  RecuperarOscPorGeolocalizacaoAreaAtuacao(cd_area_atuacao, latitude, longitude){
    return this.getBaseUrl()+"osc/listaareaatuacao/"+cd_area_atuacao+"/geolocalizacao/"+latitude+"/"+longitude;
  }

  RecuperarOscAtualizacao(){
    return this.getBaseUrl()+"osc/listaatualizadas/";
  }

  RecuperarMunicipio(latitude, longitude){
    return this.getBaseUrl()+"geo/localidade/municipio/"+latitude+"/"+longitude;
  }

  RecuperarOscPorAreaAtuacao(cd_area_atuacao){
    return this.getBaseUrl()+"osc/listaareaatuacao/"+cd_area_atuacao;
  }

  EnviarArquivoEstadoMunicipio(){
    return this.getBaseUrl()+"gov/carregararquivoparcerias";
  }

  RecuperarGrafico(id_grafico){
    return this.getBaseUrl()+"analises?id="+id_grafico;
  }

  RecuperarPerfilByIDLocalidade(id){
    return this.getBaseUrl()+"analises/localidade/"+id;
  }

}
