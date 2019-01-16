"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),Rotas=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getBaseUrl",value:function(){window.location;return"https://mapaosc-desenv.ipea.gov.br/api/"}},{key:"getBaseUrlCMS",value:function(){window.location;return"https://mapaosc-desenv.ipea.gov.br/cms"}},{key:"getBaseUrlIData",value:function(){return"http://ipeadata.ipea.gov.br/api/v1/AnoValors"}},{key:"AutocompleteOSCByName",value:function(e,t,a){return this.getBaseUrl()+"search/osc/autocomplete/"+e+"/"+t+"/0/"+a}},{key:"AutocompleteOSCByCnpj",value:function(e,t){return this.getBaseUrl()+"search/cnpj/autocomplete/"+e+"/"+t+"/0"}},{key:"AutocompleteOSCByCounty",value:function(e,t){return this.getBaseUrl()+"menu/geo/municipio/"+e+"/"+t+"/0"}},{key:"AutocompleteOSCByState",value:function(e,t){return this.getBaseUrl()+"menu/geo/estado/"+e+"/"+t+"/0"}},{key:"AutocompleteOSCByRegion",value:function(e,t){return this.getBaseUrl()+"menu/geo/regiao/"+e+"/"+t+"/0"}},{key:"OSCPopUpByID",value:function(e){return this.getBaseUrl()+"osc/popup/"+e}},{key:"OSCByID",value:function(e){return this.getBaseUrl()+"osc/"+e}},{key:"OSCByNameInMap",value:function(e,t){return this.getBaseUrl()+"search/osc/geo/"+e+"/0/0/"+t}},{key:"OSCByCountyInMap",value:function(e){return this.getBaseUrl()+"search/municipio/geo/"+e}},{key:"OSCByStateInMap",value:function(e){return this.getBaseUrl()+"search/estado/geo/"+e}},{key:"OSCByRegionInMap",value:function(e){return this.getBaseUrl()+"search/regiao/geo/"+e}},{key:"AllOSCInMap",value:function(){return this.getBaseUrl()+"geo/osc/"}},{key:"OSCByName",value:function(e,t,a){return this.getBaseUrl()+"search/osc/lista/"+e+"/10/"+t+"/"+a}},{key:"OSCByCounty",value:function(e,t){return this.getBaseUrl()+"search/municipio/lista/"+e+"/10/"+t}},{key:"OSCByState",value:function(e,t){return this.getBaseUrl()+"search/estado/lista/"+e+"/10/"+t}},{key:"OSCByRegion",value:function(e,t){return this.getBaseUrl()+"search/regiao/lista/"+e+"/10/"+t}},{key:"AllOSC",value:function(e){return this.getBaseUrl()+"search/all/lista/10/"+e}},{key:"ClusterMunicipio",value:function(){return this.getBaseUrl()+"geo/cluster/municipio"}},{key:"ClusterEstado",value:function(){return this.getBaseUrl()+"geo/cluster/estado"}},{key:"ClusterEstadoPorRegiao",value:function(e){return this.getBaseUrl()+"geo/cluster/estado/"+e}},{key:"ClusterPais",value:function(){return this.getBaseUrl()+"geo/cluster/regiao"}},{key:"ClusterRegiao",value:function(e){return this.getBaseUrl()+"geo/cluster/regiao/"+e}},{key:"OSCByID_no_project",value:function(e){return this.getBaseUrl()+"osc/no_project/"+e}},{key:"ProjectByID",value:function(e){return this.getBaseUrl()+"projeto/"+e}},{key:"AtualizarProjectByID",value:function(e){return this.getBaseUrl()+"osc/projeto/"+e}},{key:"CriarProjectByID",value:function(e){return this.getBaseUrl()+"osc/projeto/insert/"+e}},{key:"RemoverProjectByID",value:function(e,t){return this.getBaseUrl()+"osc/projeto/"+e+"/"+t}},{key:"Objetivos",value:function(){return this.getBaseUrl()+"menu/osc/objetivo_projeto"}},{key:"MetasById",value:function(e){return this.getBaseUrl()+"menu/osc/meta_projeto/"+e}},{key:"AreaAtuacao",value:function(){return this.getBaseUrl()+"menu/osc/area_atuacao"}},{key:"AtualizarAreaAtuacao",value:function(e){return this.getBaseUrl()+"osc/area_atuacao/"+e}},{key:"DadosGerais",value:function(e){return this.getBaseUrl()+"osc/dadosgerais/"+e}},{key:"SubAreaAtuacao",value:function(){return this.getBaseUrl()+"menu/osc/subarea_atuacao"}},{key:"MetaProjeto",value:function(e){return this.getBaseUrl()+"menu/osc/meta_projeto/"+e}},{key:"Descricao",value:function(e){return this.getBaseUrl()+"osc/descricao/"+e}},{key:"Certificado",value:function(e){return this.getBaseUrl()+"osc/certificado/"+e}},{key:"Busca_Certificado",value:function(){return this.getBaseUrl()+"menu/osc/certificado"}},{key:"RelacoesTrabalho",value:function(e){return this.getBaseUrl()+"osc/relacoestrabalho/"+e}},{key:"RelacoesTrabalhoOutra",value:function(e){return this.getBaseUrl()+"osc/relacoestrabalhooutra/"+e}},{key:"ParticipacaoSocialConselho",value:function(e){return this.getBaseUrl()+"osc/participacaosocialconselho/"+e}},{key:"ParticipacaoSocialConferencia",value:function(e){return this.getBaseUrl()+"osc/participacaosocialconferencia/"+e}},{key:"OutraParticipacaoSocial",value:function(e){return this.getBaseUrl()+"osc/participacaosocialoutra/"+e}},{key:"PeriodicidadeReuniao",value:function(){return this.getBaseUrl()+"menu/osc/periodicidade_reuniao/"}},{key:"Conselho",value:function(){return this.getBaseUrl()+"menu/osc/conselho/"}},{key:"Conferencia",value:function(){return this.getBaseUrl()+"menu/osc/conferencia/"}},{key:"Titularidade",value:function(){return this.getBaseUrl()+"menu/osc/tipo_participacao/"}},{key:"FontesRecursosById",value:function(e){return this.getBaseUrl()+"osc/recursos/"+e}},{key:"FontesRecursos",value:function(){return this.getBaseUrl()+"menu/osc/fonte_recursos_osc"}},{key:"AtualizarFontesRecursos",value:function(e){return this.getBaseUrl()+"osc/recursososc/"+e}},{key:"ConselhoFiscal",value:function(e){return this.getBaseUrl()+"osc/conselhofiscal/"+e}},{key:"Dirigente",value:function(e){return this.getBaseUrl()+"osc/dirigente/"+e}},{key:"Edital",value:function(){return this.getBaseUrl()+"edital"}},{key:"Login",value:function(){return this.getBaseUrl()+"user/login/"}},{key:"ReceberNoticia",value:function(){return this.getBaseUrl()+"user/newsletter/"}},{key:"CadastroRepresentante",value:function(){return this.getBaseUrl()+"user/"}},{key:"CadastroRepresentanteEstadoMunicipio",value:function(){return this.getBaseUrl()+"user/governo/"}},{key:"ValidarLocalidade",value:function(e){return this.getBaseUrl()+"user/governo/ativo/localidade/"+e}},{key:"Contato",value:function(){return this.getBaseUrl()+"user/contato/"}},{key:"RecuperSenha",value:function(){return this.getBaseUrl()+"user/esquecisenha/"}},{key:"AlterarSenha",value:function(){return this.getBaseUrl()+"user/alterarsenha/"}},{key:"ValidarUsuario",value:function(e){return this.getBaseUrl()+"user/"+e}},{key:"UpdateUsuario",value:function(e){return this.getBaseUrl()+"user/"+e}},{key:"UpdateUsuarioGov",value:function(e){return this.getBaseUrl()+"user/governo/"+e}},{key:"AtivarUsuario",value:function(e){return this.getBaseUrl()+"user/ativarcadastro/"+e}},{key:"SituacaoImovel",value:function(){return this.getBaseUrl()+"menu/osc/situacao_imovel/"}},{key:"FontesRecursosProjeto",value:function(){return this.getBaseUrl()+"menu/osc/origem_fonte_recursos_projeto/"}},{key:"ZonaAtuacaoProjeto",value:function(){return this.getBaseUrl()+"menu/osc/zona_atuacao_projeto/"}},{key:"AbrangenciaProjeto",value:function(){return this.getBaseUrl()+"menu/osc/abrangencia_projeto/"}},{key:"SituacaoProjeto",value:function(){return this.getBaseUrl()+"menu/osc/status_projeto/"}},{key:"FormaParticipacaoConferencia",value:function(){return this.getBaseUrl()+"menu/osc/forma_participacao_conferencia/"}},{key:"ConsultaAvancadaLista",value:function(e){return this.getBaseUrl()+"search/advanced/lista/10/"+e}},{key:"ConsultaAvancadaMapa",value:function(e){return this.getBaseUrl()+"search/advanced/geo/0/0"}},{key:"AutocompleteAtividadeEconomica",value:function(e,t){return this.getBaseUrl()+"search/atividade_economica/autocomplete/"+e+"/"+t}},{key:"SituacaoImovel_id",value:function(e){return this.getBaseUrl()+"menu/osc/situacao_imovel/"+e}},{key:"FontesRecursosProjeto_id",value:function(e){return this.getBaseUrl()+"menu/osc/origem_fonte_recursos_projeto/"+e}},{key:"ZonaAtuacaoProjeto_id",value:function(e){return this.getBaseUrl()+"menu/osc/zona_atuacao_projeto/"+e}},{key:"AbrangenciaProjeto_id",value:function(e){return this.getBaseUrl()+"menu/osc/abrangencia_projeto/"+e}},{key:"SituacaoProjeto_id",value:function(e){return this.getBaseUrl()+"menu/osc/status_projeto/"+e}},{key:"FormaParticipacaoConferencia_id",value:function(e){return this.getBaseUrl()+"menu/osc/forma_participacao_conferencia/"+e}},{key:"PeriodicidadeReuniao_id",value:function(e){return this.getBaseUrl()+"menu/osc/periodicidade_reuniao/"+e}},{key:"Conselho_id",value:function(e){return this.getBaseUrl()+"menu/osc/conselho/"+e}},{key:"Conferencia_id",value:function(e){return this.getBaseUrl()+"menu/osc/conferencia/"+e}},{key:"Titularidade_id",value:function(e){return this.getBaseUrl()+"menu/osc/tipo_participacao/"+e}},{key:"FontesRecursos_id",value:function(e){return this.getBaseUrl()+"menu/osc/fonte_recursos_osc/"+e}},{key:"Objetivos_ODS_id",value:function(e){return this.getBaseUrl()+"menu/osc/objetivoprojeto/"+e}},{key:"Metas_ODS_Id",value:function(e){return this.getBaseUrl()+"menu/osc/metaprojeto/"+e}},{key:"Imprensa",value:function(){return this.getBaseUrlCMS()+"/imprensa"}},{key:"NoticiaByID",value:function(e){return this.getBaseUrlCMS()+"/noticiaByID/"+e}},{key:"VideoByID",value:function(e){return this.getBaseUrlCMS()+"/videoByID/"+e}},{key:"Publicacoes",value:function(){return this.getBaseUrlCMS()+"/publicacoes"}},{key:"PublicacaoByID",value:function(e){return this.getBaseUrlCMS()+"/publicacaoByID/"+e}},{key:"GraficosSlug",value:function(e){return this.getBaseUrlCMS()+"/graficosSlug/"+e}},{key:"MenuMrosc",value:function(){return this.getBaseUrlCMS()+"/menuMrosc"}},{key:"ConteudoMroscByID",value:function(e){return this.getBaseUrlCMS()+"/conteudoMroscByID/"+e}},{key:"ModuloLinks",value:function(){return this.getBaseUrlCMS()+"/links"}},{key:"ModuloEquipe",value:function(){return this.getBaseUrlCMS()+"/equipes"}},{key:"ModuloApoio",value:function(){return this.getBaseUrlCMS()+"/apoios"}},{key:"ModuloWebdoors",value:function(){return this.getBaseUrlCMS()+"/webdoors"}},{key:"ModuloBySlug",value:function(e){return this.getBaseUrlCMS()+"/ModuloBySlug/"+e}},{key:"ModuloByTipo",value:function(e){return this.getBaseUrlCMS()+"/ModuloByTipo/"+e}},{key:"ModuloByID",value:function(e){return this.getBaseUrlCMS()+"/ModuloByID/"+e}},{key:"BarraTransparencia",value:function(e){return this.getBaseUrl()+"osc/barratransparencia/"+e}},{key:"RecuperarOscPorLocalidadeAreaAtuacao",value:function(e,t){return this.getBaseUrl()+"osc/listaareaatuacao/"+e+"/municipio/"+t}},{key:"RecuperarOscPorGeolocalizacaoAreaAtuacao",value:function(e,t,a){return this.getBaseUrl()+"osc/listaareaatuacao/"+e+"/geolocalizacao/"+t+"/"+a}},{key:"RecuperarOscAtualizacao",value:function(){return this.getBaseUrl()+"osc/listaatualizadas/"}},{key:"RecuperarMunicipio",value:function(e,t){return this.getBaseUrl()+"geo/localidade/municipio/"+e+"/"+t}},{key:"RecuperarOscPorAreaAtuacao",value:function(e){return this.getBaseUrl()+"osc/listaareaatuacao/"+e}},{key:"EnviarArquivoEstadoMunicipio",value:function(){return this.getBaseUrl()+"gov/carregararquivoparcerias"}},{key:"RecuperarGrafico",value:function(e){return this.getBaseUrl()+"analises?id="+e}},{key:"RecuperarPerfilByIDLocalidade",value:function(e){return this.getBaseUrl()+"osc/listaareaatuacao/5/municipio/"+e}},{key:"IDHM",value:function(){return this.getBaseUrlIData()+"(SERCODIGO='13IDHM',NIVNOME='Munic%C3%ADpios')?$count=true&ANOINICIAL=2010&ANOFINAL=2010"}},{key:"IDHM_Educacao",value:function(){return this.getBaseUrlIData()+"(SERCODIGO='13IDHM_E',NIVNOME='Munic%C3%ADpios')?$count=true&ANOINICIAL=2010&ANOFINAL=2010"}},{key:"IDHM_Longevidade",value:function(){return this.getBaseUrlIData()+"(SERCODIGO='13IDHM_L',NIVNOME='Munic%C3%ADpios')?$count=true&ANOINICIAL=2010&ANOFINAL=2010"}},{key:"IDHM_Renda",value:function(){return this.getBaseUrlIData()+"(SERCODIGO='13IDHM_R',NIVNOME='Munic%C3%ADpios')?$count=true&ANOINICIAL=2010&ANOFINAL=2010"}},{key:"mort_infant5",value:function(){return this.getBaseUrlIData()+"(SERCODIGO='13MORT5',NIVNOME='Munic%C3%ADpios')?$count=true&ANOINICIAL=2010&ANOFINAL=2010"}},{key:"mort_infant",value:function(){return this.getBaseUrlIData()+"(SERCODIGO='13MORT1',NIVNOME='Munic%C3%ADpios')?$count=true&ANOINICIAL=2010&ANOFINAL=2010"}}]),e}();