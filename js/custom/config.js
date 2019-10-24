"use strict";require.config({baseUrl:"js/",waitSeconds:200,paths:{react:"libs/react-15.3.1/react-with-addons.min",jsx:"libs/jsxcompiler/jsx",text:"libs/require-2.3.2/text",JSXTransformer:"libs/jsxcompiler/JSXTransformer",babel:"libs/babel-core/5.8.24/browser.min",jquery:"libs/jquery-3.1.0/jquery-3.1.0.min","jquery-ui":"libs/jquery-ui-1.12.0/jquery-ui",bootstrap:"libs/bootstrap-3.3.7/bootstrap.min",d3:"libs/nv-d3/d3.v3","nv.d3":"libs/nv-d3/nv.d3","nv.d3.lib":"libs/nv-d3/nv.d3.lib",stream:"libs/nv-d3/stream-layers",tablesaw:"libs/tablesaw-3.0/tablesaw","tablesaw-init":"libs/tablesaw-3.0/tablesaw-init","datatables.net":"libs/DataTables/DataTables-1.10.12/js/jquery.dataTables.min","datatables-responsive":"libs/DataTables/Responsive-2.1.0/js/dataTables.responsive.min",leaflet:"libs/leaflet-0.7.7/leaflet",leafletCluster:"libs/leaflet-0.7.7/cluster.min","leaflet-groupedlayercontrol":"libs/leaflet-groupedlayercontrol/leaflet.groupedlayercontrol.min",controlFullscreen:"libs/leaflet-0.7.7/control.fullscreen",google:"libs/google",rotas:"custom/rotas",graficoParaTabela:"util/graficoParaTabela",cookies:"util/cookies",contraste:"util/contraste",util:"util/Util",dataForms:"custom/dataForms",simplePagination:"libs/simplePagination/simplePagination",tagsinput:"libs/tagsinput/bootstrap-tagsinput",editarCabecalho:"editar/cabecalho",editarAreasAtuacao:"editar/areas-atuacao",editarDadosGerais:"editar/dados-gerais",editarDescricao:"editar/descricao",editarEspPartSoc:"editar/espacos-part-social",editarFonteRecurso:"editar/fonte-recurso",editarProjeto:"editar/projetos",editarRelGovernanca:"editar/relacoes-governanca",editarTitCert:"editar/titulos-certificacoes","select-boxit":"libs/select-boxit/jquery.selectBoxIt.min"},shim:{contraste:["cookies"],react:["contraste"],"jquery-ui":["jquery"],bootstrap:["jquery-ui"],d3:["bootstrap"],"nv.d3":["d3"],stream:["nv.d3"],"nv.d3.lib":["stream"],"tablesaw-init":["tablesaw"],"datatables.net":["jquery"],"datatables-responsive":["datatables.net"],controlFullscreen:["leaflet"],"leaflet-groupedlayercontrol":["leaflet"],leafletCluster:["controlFullscreen"],google:["leafletCluster"],graficoParaTabela:["bootstrap"],util:["jquery"],simplePagination:["jquery"],tagsinput:["bootstrap","jquery"],"select-boxit":["bootstrap"],editarCabecalho:["util","dataForms","editarAreasAtuacao","editarDadosGerais","editarDescricao","editarEspPartSoc","editarFonteRecurso","editarTitCert","editarProjeto","editarRelGovernanca"]},jsx:{fileExtension:".jsx",harmony:!0,stripTypes:!0}});