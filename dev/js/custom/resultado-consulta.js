require(["jquery-ui"], function (React) {
    $(document).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                .addClass("arrow")
                .addClass(feedback.vertical)
                .addClass(feedback.horizontal)
                .appendTo(this);
            }
        }
    });
});

function getParameter(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

var urlRota;
var type_http;
//require(['jquery','datatables-responsive', 'google'], function (React) {
require(['rotas','jquery-ui','datatables-responsive', 'leafletCluster', 'leaflet-groupedlayercontrol', 'simplePagination', 'util'], function (React) {
    var oscLoaded = false;
    var idhLoaded = false;
    var geojson;
    var geojsonIDH;
    var geojsonIDHM;
    var link;
    var util = new Util();
    var composto = [];
    var mapState = {};
    var mapRegion = {};
    var llayersIDH = {}; //layers do mapa de calor IDHM
    var llayers = {}; //layers do mapa de calor
    var clayers = {}; //layers dos estados
    var rlayers = {}; //layers das regiões
    var clustersLayer = L.layerGroup();
    var layerGroup = L.layerGroup();
    var layerGroupIDH = L.layerGroup();
    var layerGroupIDHM = L.layerGroup();
    var layerGroupTeste = L.layerGroup();
    var isControlLoaded = false;//verifica se controle já foi adicionado a tela
    var isClusterVersion = true;
    var consulta_avancada = false;
    var analisePerfil = false;
    var txtFederacao="";
    var txtLocalidade="";
    var icon_perfil = "";
    var idPerfil;
    var params = {};
    var limiteAutocomplete = 10;
    var limiteAutocompleteCidade = 25;
    var flagMultiplo = true;
    var textoBusca = '';
    var zoomMaximo = 18;
    var mapOptions = {
        center: new L.LatLng(-16.55555555, -60.55555555),
        zoom: 4,
        minZoom: 4 //18 niveis de zoom
    };
    var var_adc = [];

    var map = new L.Map('map', mapOptions);

    var leafletView = new PruneClusterForLeaflet();//Prune Cluster library version
    //var leafletView = L.markerClusterGroup();//Marker Cluster library version

    //var ggl2 = new L.Google('ROADMAP');
    var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: zoomMaximo,
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
    });
    //map.addLayer(ggl2);

    // Para mapa com contraste
    var mbAttr = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://mapbox.com">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYW9zY3MiLCJhIjoiY2owbDJpYWxwMDM3dTMzbzh6dDU2bnpzdyJ9._dh2UCWnAeNeG0ZL5sQ5gA';

    var tilesGrayscale = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr});

    var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains: ['mt0','mt1','mt2','mt3']
    });

    map.addLayer(googleHybrid);
    map.addLayer(tilesGrayscale);
    map.addLayer(tiles);

    // create fullscreen control
    var fsControl = new L.Control.FullScreen();
    // add fullscreen control to the map
    map.addControl(fsControl);

    var newData, urlRotaMapa;
    var rotas = new Rotas();
    var valoresURL = window.location.href.split('?')[1]!==undefined ? window.location.href.split('?')[1].split('=') : null;
    var tipoConsulta;

    //botao de consulta
    var div = $("#buscarPerfil .tab-content");
    div.find(".btn.btn-primary").on("click", function(){
        var tabAtiva = div.find('.tab-pane.fade.active.in');
        var id = tabAtiva.attr("id");
        var val = tabAtiva.find(".form-control").val();
        val = replaceSpecialChars(val.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_');

        ////////////////////////////
        var tipoBusca = 0;
        var val2 = null;

        val2 = val.replace(/(\,|\/|\-)/g, '');

        if(checkNumber(val2)){
            val = val2;
            if(val.length==14){
                tipoBusca = 1;
            }
        }

        function checkNumber(valor) {
            var regra = /^[0-9]+$/;
            if (valor.match(regra)) {
                return true;
            }else{
                return false;
            }
        };


        if (id == 'organizacao' && val !== ''){
            link = "./resultado-consulta.html?" + id + "=" + val + "&tipoBusca=" + tipoBusca;
            location.href=link;
        }else {
            val = $('.response').val();
            if (val !== ''){
                link = "./resultado-consulta.html?" + id + "=" + val;
                location.href=link;
            }else{
                $('#errorLabel').removeClass('hide');
            }
        }
    });

    function replaceSpecialChars(str){
        str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
        str = str.replace(/[àáâãäå]/g,"a");
        str = str.replace(/[ÉÈÊË]/g,"E");
        str = str.replace(/[éèêë]/g,"e");
        str = str.replace(/[ÍÌÎÏ]/g,"I");
        str = str.replace(/[íìîï]/g,"i");
        str = str.replace(/[ÓÒÔÕ]/g,"O");
        str = str.replace(/[óòôõ]/g,"o");
        str = str.replace(/[ÚÙÛÜ]/g,"U");
        str = str.replace(/[úùûü]/g,"u");
        str = str.replace(/[Ç]/g,"C");
        str = str.replace(/[ç]/g,"c");
        return str;
    }

    //autocomplete organizacao
    $("#organizacao .form-control").autocomplete({
        minLength: 3,
        source: function (request, response) {
            textoBusca = replaceSpecialChars(request.term.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',');

            $.ajax({
                url: rotas.AutocompleteOSCByName(textoBusca, limiteAutocomplete, 0),
                type: 'GET',
                dataType: "json",
                success: function (data) {
                    response($.map(data, function(item) {
                        return {
                            label: item.tx_nome_osc,
                            value: item.tx_nome_osc,
                            id: item.id_osc
                        };
                    }));
                },
                error: function (e) {
                    response([]);
                }
            });
        },
        select: function(event, ui){
            link = './resultado-consulta.html?organizacao=' + replaceSpecialChars(ui.item.value.trim()).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ',').replace(/\+{2,}/g, '_') + '&tipoBusca=1';
            location.href=link;
        }
    });

    //autocomplete municipio
    $("#municipio .form-control").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                url: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocompleteCidade),
                type: 'GET',
                dataType: "json",
                success: function (data) {
                    response($.map(data, function(item) {
                        return {
                            label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                            value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                            id: item.edmu_cd_municipio
                        };
                    }));
                },
                error: function (e) {
                    response([]);
                }
            });
        },
        select: function(event, ui){
            $('.response').val(ui.item.id);
            link = "./resultado-consulta.html?"+'municipio'+"="+ui.item.id;
            location.href=link;
        }
    });

    //autocomplete estado
    $("#estado .form-control").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                url: rotas.AutocompleteOSCByState(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocomplete),
                type: 'GET',
                dataType: "json",
                success: function (data) {
                    response($.map(data, function(item) {
                        return {
                            label: item.eduf_nm_uf,
                            value: item.eduf_nm_uf,
                            id: item.eduf_cd_uf
                        };
                    }));
                },
                error: function () {
                    response([]);
                }
            });
        },
        select: function(event, ui){
        $('.response').val(ui.item.id);
        link = "./resultado-consulta.html?"+'estado'+"="+ui.item.id;
        location.href=link;
        }
    });

    //autocomplete regiao
    $("#regiao .form-control").autocomplete({
        minLength: 3,
        source: function (request, response) {
        $.ajax({
            url: rotas.AutocompleteOSCByRegion(replaceSpecialChars(request.term).replace(/ /g, '_').replace(/[\/|\\|\||:|#|@|$|&|!|?|(|)|\[|\]]/g, '').replace(/\./g, ','), limiteAutocomplete),
            type: 'GET',
            dataType: "json",
            success: function (data) {
                response($.map( data, function( item ) {
                    return {
                        label: item.edre_nm_regiao,
                        value: item.edre_nm_regiao,
                        id: item.edre_cd_regiao
                    };
                }));
            },
            error: function () {
                response([]);
            }
        });
        },
        select: function(event, ui){
            $('.response').val(ui.item.id);
            link = "./resultado-consulta.html?"+'regiao'+"="+ui.item.id;
            location.href=link;
        }
    });

    $('.ui-autocomplete-input').keypress(function(e) {
        var key = e.which;
        if(key == 13){
            $('.btn-primary').click();
            $('.ui-menu-item').hide();
            return false;
        }
    });

    if(valoresURL!==null){
        //consulta baseado na escolha da tela anterior
        tipoConsulta = valoresURL[0];
        var stringBuscada = valoresURL[1];
        stringBuscada = stringBuscada.replace(/\./g, "");
        stringBuscada = stringBuscada.split('&')[0];

        if(tipoConsulta == "organizacao"){
            urlRota = rotas.OSCByName(getParameter('organizacao'), 0, getParameter('tipoBusca'));
            urlRotaMapa = rotas.OSCByNameInMap(getParameter('organizacao'), getParameter('tipoBusca'));
            isClusterVersion=false;
            analisePerfil = false;
        }else if(tipoConsulta=="municipio"){
            urlRota = rotas.OSCByCounty(stringBuscada,0);
            urlRotaMapa=rotas.OSCByCountyInMap(stringBuscada);
            isClusterVersion=false;
            analisePerfil = true;
            idPerfil = stringBuscada;
            txtFederacao = "do município ";
            icon_perfil = "municipio.png";
        }else if(tipoConsulta=="estado"){
            urlRota = rotas.OSCByState(stringBuscada,0);
            urlRotaMapa=rotas.ClusterEstadoPorRegiao(stringBuscada);//urlRotaMapa=rotas.OSCByStateInMap(stringBuscada);
            analisePerfil = true;
            idPerfil = stringBuscada;
            txtFederacao = "do estado ";
            icon_perfil = "estado.png";
        }else if(tipoConsulta=="regiao"){
            urlRota = rotas.OSCByRegion(stringBuscada,0);
            urlRotaMapa=rotas.ClusterRegiao(stringBuscada);//urlRotaMapa=rotas.OSCByRegionInMap(stringBuscada);
            analisePerfil = true;
            idPerfil = stringBuscada;
            txtFederacao = "da região ";
            icon_perfil = "regiao.png";
        }else if(tipoConsulta=="avancado"){
            params["avancado"] = window.localStorage.getItem('params_busca_avancada');

            if(params["avancado"] == '{}') {//|| util.contains('{"IDH":{',params["avancado"]) ){
                //consulta tudo
                tipoConsulta="todos";
                urlRotaMapa = rotas.ClusterPais();
                urlRota = rotas.AllOSC(0);
            }else{
                var json_filtro_perfil = JSON.parse(params["avancado"]);
                var exportar_dados = true;

                if(json_filtro_perfil.Adicionais){
                  if(Object.keys(json_filtro_perfil).length == 1){
                    exportar_dados = false;
                  }
                }

                if(exportar_dados){
                  urlRota = rotas.ConsultaAvancadaLista(0);
                  urlRotaMapa=rotas.ConsultaAvancadaMapa();
                  isClusterVersion=false;
                  consulta_avancada = true;

                }else{
                  tipoConsulta="todos";
                  urlRotaMapa = rotas.ClusterPais();
                  urlRota = rotas.AllOSC(0);
                }

                if(json_filtro_perfil.dadosGerais){
                    if (json_filtro_perfil.dadosGerais.cd_regiao){
                      idPerfil = json_filtro_perfil.dadosGerais.cd_regiao;
                      txtFederacao = "da região ";
                      icon_perfil = "regiao.png";
                      analisePerfil = true;
                    }

                    if (json_filtro_perfil.dadosGerais.cd_uf){

                      idPerfil = json_filtro_perfil.dadosGerais.cd_uf;
                      txtFederacao = "do estado ";
                      icon_perfil = "estado.png";
                      analisePerfil = true;
                    }

                    if(json_filtro_perfil.dadosGerais.cd_municipio){
                      idPerfil = json_filtro_perfil.dadosGerais.cd_municipio;
                      txtFederacao = "do município ";
                      icon_perfil = "municipio.png";
                      analisePerfil = true;
                    }
                }

                if(json_filtro_perfil.Adicionais){
                  for ( var k in json_filtro_perfil.Adicionais) {
                    var cd = k.split('cd_indice-')[1];
                    var_adc.push(cd);
                  }
                }

            }

            visualizar_filtro_busca(params["avancado"],tipoConsulta);

            /*if (util.contains('IDH_M',params["avancado"])) {
                var data = util.carregaAjax(rotas.Ipea_Data('13IDHM',2010), 'GET', null);
            }

            if (util.contains('IDHM R',params["avancado"])) {
                util.carregaAjax(rotas.Ipea_Data('13IDHM_R',2010),'GET',null);
            }

            if (util.contains('IDHM E',params["avancado"])) {
                util.carregaAjax(rotas.Ipea_Data('13IDHM_E',2010),'GET',null);
            }

            if (util.contains('IDHM L',params["avancado"])) {
                util.carregaAjax(rotas.Ipea_Data('13IDHM_L',2010),'GET',null);
            }

            if (util.contains('Freq',params["avancado"])) {
                util.carregaAjax(rotas.Ipea_Data('13I_FREQ_PROP',2010),'GET',null);
            }*/
        }else{
            console.log("ERRO de URL!");
        }
    }else{
        //consulta tudo
        tipoConsulta = "todos";
        urlRotaMapa = rotas.ClusterPais();
        urlRota = rotas.AllOSC(0);
    }

    if(analisePerfil){
        var txtPerfil = "Análise " + txtFederacao + txtLocalidade;
        $("#analisePerfil").text(txtPerfil);
        $("#analisePerfil").attr("href","analise-perfil.html?localidade="+idPerfil);
        var img_perfil = '<img src="img/'+icon_perfil +'" alt="'+txtLocalidade+'" height=40>';
        $("#analisePerfil").append(img_perfil)
    }

    function convertArrayOfObjectsToCSV(args) {
            var result, ctr, keys, columnDelimiter, lineDelimiter, data;

            data = args.data || null;
            if (data == null || !data.length) {
                return null;
            }

            columnDelimiter = args.columnDelimiter || ';';
            lineDelimiter = args.lineDelimiter || '\n';

            keys = Object.keys(data[0]);

            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(function(item) {
                ctr = 0;
                keys.forEach(function(key) {
                    if (ctr > 0) result += columnDelimiter;

                    result += item[key];
                    ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        }


    function visualizar_filtro_busca(json,tipoConsulta){
        if(tipoConsulta == 'avancado'){
            var json_filtro = JSON.parse(json);

            var dadosgerais = json_filtro.dadosGerais;
            var txt = '<b><u>Filtros utilizados:</u></b> ';
            var nj = false;

            if(dadosgerais){
                if(dadosgerais.tx_razao_social_osc){
                    txt += "<b><i>Nome da OSC:</i></b> " + dadosgerais.tx_razao_social_osc + ", ";
                }
                if(dadosgerais.tx_nome_regiao){
                    txt += "<b><i>Região:</i></b> " + dadosgerais.tx_nome_regiao + ", ";
                }
                if(dadosgerais.tx_nome_fantasia_osc ){
                    txt += "<b><i>Nome Fantasia:</i></b> " + dadosgerais.tx_nome_fantasia_osc + ", ";
                }
                if(dadosgerais.tx_nome_uf){
                    txt += "<b><i>Estado:</i></b> " + dadosgerais.tx_nome_uf + ", ";
                }
                if(dadosgerais.cd_identificador_osc){
                    txt += "<b><i>CNPJ:</i></b> " + dadosgerais.cd_identificador_osc + ", ";
                }

                if(dadosgerais.cd_situacao_imovel_osc){
                    $.ajax({
                        url: rotas.SituacaoImovel_id(dadosgerais.cd_situacao_imovel_osc),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Situação do Imóvel:</i></b> " + data[0].tx_nome_situacao_imovel + ", ";
                            }
                        }
                    });
                }

                if(dadosgerais.anoFundacaoMIN ||  dadosgerais.anoFundacaoMAX){
                    txt += "<b><i>Ano de Fundação</i></b> ";

                    if(dadosgerais.anoFundacaoMIN){
                        txt += "<b><i>maior que:</i></b> " + dadosgerais.anoFundacaoMIN + ", ";
                    }

                    if(dadosgerais.anoFundacaoMAX){
                    txt += "<b><i>menor que:</i></b> " + dadosgerais.anoFundacaoMAX  + ", ";
                    }
                }

                if(dadosgerais.tx_nome_municipio){
                    txt += "<b><i>Município:</i></b> " + dadosgerais.tx_nome_municipio + ", ";
                }

                var txt_nj = "<b><i>Natureza Jurídica:</i></b> ";

                if(dadosgerais.naturezaJuridica_associacaoPrivada){
                    txt_nj += "Associação Privada" + ", ";
                    nj = true;
                }

                if(dadosgerais.naturezaJuridica_fundacaoPrivada){
                    txt_nj += "Fundação Privada" + ", ";
                    nj = true;
                }

                if(dadosgerais.naturezaJuridica_organizacaoReligiosa){
                    txt_nj += "Organização Religiosa"  + ", ";
                    nj = true;
                }

                if(dadosgerais.naturezaJuridica_organizacaoSocial){
                    txt_nj += "Organização Social"  + ", ";
                    nj = true;
                }

                if(dadosgerais.naturezaJuridica_outra){
                    txt_nj += "Não informado"  + ", ";
                    nj = true;
                }

                if(nj){
                    txt += txt_nj;
                }

                if(dadosgerais.cd_objetivo_osc){
                    $.ajax({
                        url: rotas.Objetivos_ODS_id(dadosgerais.cd_objetivo_osc),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data){
                                txt += "<b><i>Objetivos do Desenvolvimento Sustentável - ODS:</i></b> " + data.tx_nome_objetivo_projeto + ", ";
                            }
                        }
                    });
                }

                if(dadosgerais.cd_meta_osc){
                    $.ajax({
                        url: rotas.MetasById(dadosgerais.cd_meta_osc),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data){
                                txt += "<b><i>Metas Relacionadas ao ODS:</i></b> " + data.tx_nome_meta_projeto + ", ";
                            }
                        }
                    });
                }
            }

            var atividadeEconomica = json_filtro.atividadeEconomica;

            if(atividadeEconomica){
                txt += "<b><i>Atividade Econômica (CNAE):</i></b> " + atividadeEconomica.tx_atividade_economica + ", ";
            }

            var areasSubareasAtuacao = json_filtro.areasSubareasAtuacao;
            if(areasSubareasAtuacao){
                var nomes_area_sub_atuacao = [];

                $.ajax({
                    url: rotas.AreaAtuacao(),
                    type: 'GET',
                    async:false,
                    dataType: 'json',
                    error:function(e){
                        console.log("Erro no ajax: ");
                    },
                    success: function(data){
                        for (var key in areasSubareasAtuacao ){
                            var cd_area_atuacao = parseInt(key.split('cd_area_atuacao-')[1]);

                            if(cd_area_atuacao != undefined){
                                $.each(data, function (k, value) {
                                    if(cd_area_atuacao == value.cd_area_atuacao ){
                                        if (nomes_area_sub_atuacao.indexOf(value.tx_nome_area_atuacao) === -1) {
                                            nomes_area_sub_atuacao.push( value.tx_nome_area_atuacao);
                                        }
                                    }
                                });
                            }
                        }

                        $.ajax({
                            url: rotas.SubAreaAtuacao(),
                            type: 'GET',
                            async:false,
                            dataType: 'json',
                            error:function(e){
                            console.log("Erro no ajax: ");
                            },
                            success: function(data){
                                for (key in areasSubareasAtuacao ){
                                    var cd_subarea_atuacao = parseInt(key.split('cd_subarea_atuacao-')[1]);

                                    if(cd_subarea_atuacao != undefined){
                                        $.each(data, function (k, value) {
                                            if(cd_subarea_atuacao == value.cd_subarea_atuacao ){
                                                if (nomes_area_sub_atuacao.indexOf(value.tx_nome_subarea_atuacao) === -1) {
                                                    nomes_area_sub_atuacao.push( value.tx_nome_subarea_atuacao);
                                                }
                                            }
                                        });
                                    }
                                }

                                if(nomes_area_sub_atuacao.length > 0){
                                    txt += "<b><i>Área e Subárea de Atuação:</i></b> " + nomes_area_sub_atuacao.join(', ') + ", ";
                                }
                            }
                        });
                    }
                });
            }

            var titulacoesCertificacoes = json_filtro.titulacoesCertificacoes;

            if(titulacoesCertificacoes){
                var nomes_titulacoesCertificacoes = []

                $.ajax({
                    url: rotas.Busca_Certificado(),
                    type: 'GET',
                    async:false,
                    dataType: 'json',
                    error: function(e){
                        console.log("ERRO no AJAX :" + e);
                    },
                    success: function(data){
                        var id_certificados = {
                            1:"titulacao_entidadeAmbientalista",
                            2:"titulacao_cebasEducacao",
                            3:"titulacao_cebasSaude",
                            4:"titulacao_oscip",
                            5:"titulacao_utilidadePublicaFederal",
                            6:"titulacao_cebasAssistenciaSocial",
                            7:"titulacao_utilidadePublicaEstadual",
                            8:"titulacao_utilidadePublicaMunicipal",
                            9:"titulacao_naoPossui"
                        };

                        var cods = []
                        for (var key in titulacoesCertificacoes ){
                            for (var cd in id_certificados){
                                if(id_certificados[cd] == key){
                                    for (var i in data) {
                                        if(data[i].cd_certificado == cd){
                                            if (nomes_titulacoesCertificacoes.indexOf(data[i].tx_nome_certificado) === -1) {
                                                nomes_titulacoesCertificacoes.push(data[i].tx_nome_certificado);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if(nomes_titulacoesCertificacoes.length > 0){
                            txt += "<b><i>Titulações e Certificações:</i></b> " + nomes_titulacoesCertificacoes.join(', ') + ", ";
                        }
                    }
                });
            }

            var relacoesTrabalhoGovernanca = json_filtro.relacoesTrabalhoGovernanca;

            if(relacoesTrabalhoGovernanca){
                if(relacoesTrabalhoGovernanca.tx_nome_dirigente){
                    txt += "<b><i>Nome do Dirigente:</i></b> " + relacoesTrabalhoGovernanca.tx_nome_dirigente + ", ";
                }

                if(relacoesTrabalhoGovernanca.tx_cargo_dirigente){
                    txt += "<b><i>Cargo do Dirigente:</i></b> " + relacoesTrabalhoGovernanca.tx_cargo_dirigente + ", ";
                }

                if(relacoesTrabalhoGovernanca.tx_nome_conselheiro){
                    txt += "<b><i>Nome do Membro do Conselho Fiscal:</i></b> " + relacoesTrabalhoGovernanca.tx_nome_conselheiro + ", ";
                }

                if(relacoesTrabalhoGovernanca.totalTrabalhadoresMIN ||  relacoesTrabalhoGovernanca.totalTrabalhadoresMAX){
                    txt += "<b><i>Total de Trabalhadores</i></b> ";

                    if(relacoesTrabalhoGovernanca.totalTrabalhadoresMIN){
                        txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.totalTrabalhadoresMIN  + ", ";
                    }

                    if(relacoesTrabalhoGovernanca.totalTrabalhadoresMAX){
                        txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.totalTrabalhadoresMAX  + ", ";
                    }
                }

                if(relacoesTrabalhoGovernanca.totalEmpregadosMIN ||  relacoesTrabalhoGovernanca.totalEmpregadosMAX){
                    txt += "<b><i>Total de Empregados</i></b> ";

                    if(relacoesTrabalhoGovernanca.totalEmpregadosMIN){
                        txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.totalEmpregadosMIN  + ", ";
                    }

                    if(relacoesTrabalhoGovernanca.totalEmpregadosMAX){
                        txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.totalEmpregadosMAX  + ", ";
                    }
                }

                if(relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN ||  relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX){
                    txt += "<b><i>Trabalhadores com Deficiência</i></b> ";

                    if(relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN){
                        txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMIN  + ", ";
                    }

                    if(relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX){
                        txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresDeficienciaMAX  + ", ";
                    }
                }

                if(relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN ||  relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX){
                    txt += "<b><i>Trabalhadores voluntários</i></b> ";

                    if(relacoesTrabalhoGovernanca.totalTrabalhadoresMIN){
                        txt += "<b><i>maior que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMIN  + ", ";
                    }

                    if(relacoesTrabalhoGovernanca.totalTrabalhadoresMAX){
                        txt += "<b><i>menor que:</i></b> " + relacoesTrabalhoGovernanca.trabalhadoresVoluntariosMAX  + ", ";
                    }
                }
            }

            var espacosParticipacaoSocial = json_filtro.espacosParticipacaoSocial;

            if(espacosParticipacaoSocial){
                if(espacosParticipacaoSocial.cd_conselho){
                    $.ajax({
                        url: rotas.Conselho_id(espacosParticipacaoSocial.cd_conselho),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Nome do Conselho:</i></b> " + data[0].tx_nome_conselho + ", ";
                            }
                        }
                    });
                }

                if(espacosParticipacaoSocial.tx_nome_representante_conselho){
                    txt += "<b><i>Nome de representante conselho:</i></b> " + espacosParticipacaoSocial.tx_nome_representante_conselho + ", ";
                }

                if(espacosParticipacaoSocial.cd_tipo_participacao){
                    $.ajax({
                        url: rotas.Titularidade_id(espacosParticipacaoSocial.cd_tipo_participacao),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Titularidade:</i></b> " + data[0].tx_nome_tipo_participacao + ", ";
                            }
                        }
                    });
                }

                if(espacosParticipacaoSocial.dt_data_inicio_conselho){
                    txt += "<b><i>Data de Início de Vigência:</i></b> " + espacosParticipacaoSocial.dt_data_inicio_conselho + ", ";
                }

                if(espacosParticipacaoSocial.dt_data_fim_conselho){
                    txt += "<b><i>Data de Fim de Vigência:</i></b> " + espacosParticipacaoSocial.dt_data_fim_conselho + ", ";
                }

                if(espacosParticipacaoSocial.cd_conferencia){
                    $.ajax({
                        url: rotas.Conferencia_id(espacosParticipacaoSocial.cd_conferencia),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Nome da Conferência:</i></b> " + data[0].tx_nome_conferencia + ", ";
                            }
                        }
                    });
                }

                if(espacosParticipacaoSocial.cd_forma_participacao_conferencia){
                    $.ajax({
                        url: rotas.FormaParticipacaoConferencia_id(espacosParticipacaoSocial.cd_forma_participacao_conferencia),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Forma de Participação na Conferência:</i></b> " + data[0].tx_nome_forma_participacao_conferencia + ", ";
                            }
                        }
                    });
                }

                if(espacosParticipacaoSocial.anoRealizacaoConferenciaMIN ||  espacosParticipacaoSocial.anoRealizacaoConferenciaMAX){
                    txt += "<b><i>Ano de Realização da Conferência</i></b> ";

                    if(espacosParticipacaoSocial.anoRealizacaoConferenciaMIN){
                        txt += "<b><i>maior que:</i></b> " + espacosParticipacaoSocial.anoRealizacaoConferenciaMIN  + ", ";
                    }

                    if(espacosParticipacaoSocial.anoRealizacaoConferenciaMAX){
                        txt += "<b><i>menor que:</i></b> " + espacosParticipacaoSocial.anoRealizacaoConferenciaMAX  + ", ";
                    }
                }
            }

            var projetos = json_filtro.projetos;

            if(projetos){
                if(projetos.tx_nome_projeto){
                    txt += "<b><i>Nome do Projeto:</i></b> " + projetos.tx_nome_projeto + ", ";
                }

                if(projetos.cd_status_projeto){
                    $.ajax({
                        url: rotas.SituacaoProjeto_id(projetos.cd_status_projeto),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Situação do projeto:</i></b> " + data[0].tx_nome_status_projeto + ", ";
                            }
                        }
                    });
                }

                if(projetos.dt_data_inicio_projeto){
                    txt += "<b><i>Data de Início Projeto:</i></b> " + projetos.dt_data_inicio_projeto + ", ";
                }

                if(projetos.dt_data_fim_projeto){
                    txt += "<b><i>Data de Fim Projeto:</i></b> " + projetos.dt_data_fim_projeto + ", ";
                }

                if(projetos.cd_abrangencia_projeto){
                    $.ajax({
                        url: rotas.AbrangenciaProjeto_id(projetos.cd_abrangencia_projeto),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Abrangência de atuação:</i></b> " + data[0].tx_nome_abrangencia_projeto + ", ";
                            }
                        }
                    });
                }

                if(projetos.cd_zona_atuacao_projeto){
                    $.ajax({
                        url: rotas.ZonaAtuacaoProjeto_id(projetos.cd_zona_atuacao_projeto),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Zona de Atuação:</i></b> " + data[0].tx_nome_zona_atuacao + ", ";
                            }
                        }
                    });
                }

                if(projetos.cd_origem_fonte_recursos_projeto){
                    $.ajax({
                        url: rotas.FontesRecursosProjeto_id(projetos.cd_origem_fonte_recursos_projeto),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data.length > 0){
                                txt += "<b><i>Fontes de Recursos:</i></b> " + data[0].tx_nome_origem_fonte_recursos_projeto + ", ";
                            }
                        }
                    });
                }

                if(projetos.cd_objetivo_projeto){
                    $.ajax({
                        url: rotas.Objetivos_ODS_id(projetos.cd_objetivo_projeto),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data){
                                txt += "<b><i>Objetivos do Desenvolvimento Sustentável - ODS para Projeto:</i></b> " + data.tx_nome_objetivo_projeto + ", ";
                            }
                        }
                    });
                }

                if(projetos.cd_meta_projeto){
                    $.ajax({
                        url: rotas.MetasById(projetos.cd_meta_projeto),
                        type: 'GET',
                        async:false,
                        dataType: 'json',
                        error: function(e){
                            console.log("ERRO no AJAX :" + e);
                        },
                        success: function(data){
                            if(data){
                                txt += "<b><i>Metas Relacionadas ao ODS para projeto:</i></b> " + data.tx_nome_meta_projeto + ", ";
                            }
                        }
                    });
                }

                if(projetos.tx_nome_financiador){
                    txt += "<b><i>Financiadores do Projeto:</i></b> " + projetos.tx_nome_financiador + ", ";
                }

                if(projetos.tx_nome_regiao_localizacao_projeto){
                    txt += "<b><i>Local de Execução:</i></b> " + projetos.tx_nome_regiao_localizacao_projeto + ", ";
                }

                if(projetos.tx_nome_publico_beneficiado){
                    txt += "<b><i>Público Beneficiado:</i></b> " + projetos.tx_nome_publico_beneficiado + ", ";
                }

                if(projetos.tx_nome_osc_parceira_projeto){
                    txt += "<b><i>OSC Parceiras:</i></b> " + projetos.tx_nome_osc_parceira_projeto + ", ";
                }

                if(projetos.ft_nome_projeto){
                    txt += "<b><i>Fonte Nome Projeto:</i></b> " + projetos.ft_nome_projeto + ", ";
                }

                if(projetos.totalBeneficiariosMIN || projetos.totalBeneficiariosMAX){
                    txt += "<b><i>Total de Beneficiários</i></b> ";

                    if(projetos.totalBeneficiariosMIN){
                        txt += "<b><i>maior que:</i></b> " + projetos.totalBeneficiariosMIN  + ", ";
                    }

                    if(projetos.totalBeneficiariosMAX){
                        txt += "<b><i>menor que:</i></b> " + projetos.totalBeneficiariosMAX  + ", ";
                    }
                }

                if(projetos.valorTotalMIN || projetos.valorTotalMAX){
                    txt += "<b><i>Valor Total Projeto</i></b> ";

                    if(projetos.valorTotalMIN ){
                        txt += "<b><i>maior que:</i></b> " + projetos.valorTotalMIN  + ", ";
                    }

                    if(projetos.valorTotalMAX){
                        txt += "<b><i>menor que:</i></b> " + projetos.valorTotalMAX  + ", ";
                    }
                }

                if(projetos.valorRecebidoMIN || projetos.valorRecebidoMAX){
                    txt += "<b><i>Valor Recebido Projeto</i></b> ";

                    if(projetos.valorRecebidoMIN ){
                        txt += "<b><i>maior que:</i></b> " + projetos.valorRecebidoMIN  + ", ";
                    }

                    if(projetos.valorRecebidoMAX ){
                        txt += "<b><i>menor que:</i></b> " + projetos.valorRecebidoMAX  + ", ";
                    }
                }
            }

            var fontesRecursos = json_filtro.fontesRecursos;

            if(fontesRecursos){
                if(fontesRecursos.anoFonteRecursoMIN || fontesRecursos.anoFonteRecursoMAX){
                    txt += "<b><i>Fontes de recursos anuais da OSC Ano</i></b> ";

                    if(fontesRecursos.anoFonteRecursoMIN ){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.anoFonteRecursoMIN  + ", ";
                    }

                    if(fontesRecursos.anoFonteRecursoMAX ){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.anoFonteRecursoMAX  + ", ";
                    }
                }

                if(fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN || fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX){
                    txt += "<b><i>Rendimentos financeiros de reservas ou contas correntes próprias</i></b> ";

                    if(fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMIN  + ", ";
                    }

                    if(fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.rendimentosFinanceirosReservasContasCorrentesPropriasMAX  + ", ";
                    }
                }

                if(fontesRecursos.rendimentosFundosPatrimoniaisMIN || fontesRecursos.rendimentosFundosPatrimoniaisMAX){
                    txt += "<b><i>Rendimentos de fundos patrimoniais</i></b> ";

                    if(fontesRecursos.rendimentosFundosPatrimoniaisMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.rendimentosFundosPatrimoniaisMIN  + ", ";
                    }

                    if(fontesRecursos.rendimentosFundosPatrimoniaisMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.rendimentosFundosPatrimoniaisMAX  + ", ";
                    }
                }

                if(fontesRecursos.mensalidadesContribuicoesAssociadosMIN || fontesRecursos.mensalidadesContribuicoesAssociadosMAX){
                    txt += "<b><i>Mensalidades ou contribuições de associados</i></b> ";

                    if(fontesRecursos.mensalidadesContribuicoesAssociadosMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.mensalidadesContribuicoesAssociadosMIN  + ", ";
                    }

                    if(fontesRecursos.mensalidadesContribuicoesAssociadosMAX ){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.mensalidadesContribuicoesAssociadosMAX  + ", ";
                    }
                }

                if(fontesRecursos.vendaBensDireitosMIN || fontesRecursos.vendaBensDireitosMAX){
                    txt += "<b><i>Venda de bens e direitos</i></b> ";

                    if(fontesRecursos.vendaBensDireitosMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.vendaBensDireitosMIN  + ", ";
                    }

                    if(fontesRecursos.vendaBensDireitosMAX ){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.vendaBensDireitosMAX  + ", ";
                    }
                }

                if(fontesRecursos.premiosRecebidosMIN || fontesRecursos.premiosRecebidosMAX){
                    txt += "<b><i>Prêmios recebidos</i></b> ";

                    if(fontesRecursos.premiosRecebidosMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.premiosRecebidosMIN  + ", ";
                    }

                    if(fontesRecursos.premiosRecebidosMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.premiosRecebidosMAX  + ", ";
                    }
                }

                if(fontesRecursos.vendaProdutosMIN || fontesRecursos.vendaProdutosMAX){
                    txt += "<b><i>Venda de produtos</i></b> ";

                    if(fontesRecursos.vendaProdutosMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.vendaProdutosMIN  + ", ";
                    }

                    if(fontesRecursos.vendaProdutosMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.vendaProdutosMAX  + ", ";
                    }
                }

                if(fontesRecursos.prestacaoServicosMIN || fontesRecursos.prestacaoServicosMAX){
                    txt += "<b><i>Prestação de serviços</i></b> ";

                    if(fontesRecursos.prestacaoServicosMIN ){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.prestacaoServicosMIN  + ", ";
                    }

                    if(fontesRecursos.prestacaoServicosMAX ){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.prestacaoServicosMAX  + ", ";
                    }
                }

                if(fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN || fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX){
                    txt += "<b><i>Empresas públicas ou sociedades de economia mista</i></b> ";

                    if(fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.empresasPublicasSociedadesEconomiaMistaMIN  + ", ";
                    }

                    if(fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.empresasPublicasSociedadesEconomiaMistaMAX  + ", ";
                    }
                }

                if(fontesRecursos.acordoOrganismosMultilateraisMIN || fontesRecursos.acordoOrganismosMultilateraisMAX){
                    txt += "<b><i>Acordo com organismos multilaterais</i></b> ";

                    if(fontesRecursos.acordoOrganismosMultilateraisMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.acordoOrganismosMultilateraisMIN  + ", ";
                    }

                    if(fontesRecursos.acordoOrganismosMultilateraisMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.acordoOrganismosMultilateraisMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaGovernoFederalMIN || fontesRecursos.parceriaGovernoFederalMAX){
                    txt += "<b><i>Transferências federais recebidas pela OSC</i></b> ";

                    if(fontesRecursos.parceriaGovernoFederalMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoFederalMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaGovernoFederalMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoFederalMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaGovernoEstadualMIN || fontesRecursos.parceriaGovernoEstadualMAX){
                    txt += "<b><i>Parceria com o governo estadual</i></b> ";

                    if(fontesRecursos.parceriaGovernoEstadualMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoEstadualMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaGovernoEstadualMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoEstadualMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaGovernoMunicipalMIN || fontesRecursos.parceriaGovernoMunicipalMAX){
                    txt += "<b><i>Parceria com o governo municipal</i></b> ";

                    if(fontesRecursos.parceriaGovernoMunicipalMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaGovernoMunicipalMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaGovernoMunicipalMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaGovernoMunicipalMAX  + ", ";
                    }
                }

                if(fontesRecursos.acordoGovernosEstrangeirosMIN || fontesRecursos.acordoGovernosEstrangeirosMAX){
                    txt += "<b><i>Acordo com governos estrangeiros</i></b> ";

                    if(fontesRecursos.acordoGovernosEstrangeirosMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.acordoGovernosEstrangeirosMIN  + ", ";
                    }

                    if(fontesRecursos.acordoGovernosEstrangeirosMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.acordoGovernosEstrangeirosMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaOscBrasileirasMIN || fontesRecursos.parceriaOscBrasileirasMAX){
                    txt += "<b><i>Parceria com OSCs brasileiras</i></b> ";

                    if(fontesRecursos.parceriaOscBrasileirasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOscBrasileirasMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaOscBrasileirasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOscBrasileirasMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaOscEstrangeirasMIN || fontesRecursos.parceriaOscEstrangeirasMAX){
                    txt += "<b><i>Parceria com OSCs estrangeiras</i></b> ";

                    if(fontesRecursos.parceriaOscEstrangeirasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOscEstrangeirasMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaOscEstrangeirasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOscEstrangeirasMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN || fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX){
                    txt += "<b><i>Parceria com organizações religiosas brasileiras</i></b> ";

                    if(fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasBrasileirasMAX  + ", ";
                    }
                }

                if(fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN || fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX){
                    txt += "<b><i>Parceria com organizações religiosas estrangeiras</i></b> ";

                    if(fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMIN  + ", ";
                    }

                    if(fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.parceriaOrganizacoesReligiosasEstrangeirasMAX  + ", ";
                    }
                }

                if(fontesRecursos.empresasPrivadasBrasileirasMIN || fontesRecursos.empresasPrivadasBrasileirasMAX){
                    txt += "<b><i>Empresas privadas brasileiras</i></b> ";

                    if(fontesRecursos.empresasPrivadasBrasileirasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.empresasPrivadasBrasileirasMIN  + ", ";
                    }

                    if(fontesRecursos.empresasPrivadasBrasileirasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.empresasPrivadasBrasileirasMAX  + ", ";
                    }
                }

                if(fontesRecursos.EmpresasEstrangeirasMIN || fontesRecursos.EmpresasEstrangeirasMAX){
                    txt += "<b><i>Empresas estrangeiras</i></b> ";

                    if(fontesRecursos.EmpresasEstrangeirasMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.EmpresasEstrangeirasMIN  + ", ";
                    }

                    if(fontesRecursos.EmpresasEstrangeirasMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.EmpresasEstrangeirasMAX  + ", ";
                    }
                }

                if(fontesRecursos.doacoesPessoaJuridicaMIN || fontesRecursos.doacoesPessoaJuridicaMAX){
                    txt += "<b><i>Doações de pessoa jurídica</i></b> ";

                    if(fontesRecursos.doacoesPessoaJuridicaMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesPessoaJuridicaMIN  + ", ";
                    }

                    if(fontesRecursos.doacoesPessoaJuridicaMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesPessoaJuridicaMAX  + ", ";
                    }
                }

                if(fontesRecursos.doacoesPessoaFisicaMIN || fontesRecursos.doacoesPessoaFisicaMAX){
                    txt += "<b><i>Doações de pessoa física</i></b> ";

                    if(fontesRecursos.doacoesPessoaFisicaMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesPessoaFisicaMIN  + ", ";
                    }

                    if(fontesRecursos.doacoesPessoaFisicaMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesPessoaFisicaMAX  + ", ";
                    }
                }

                if(fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN || fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX){
                    txt += "<b><i>Doações recebidas na forma de produtos e serviços (com NF)</i></b> ";

                    if(fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMIN  + ", ";
                    }

                    if(fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosComNFMAX  + ", ";
                    }
                }

                if(fontesRecursos.voluntariadoMIN || fontesRecursos.voluntariadoMAX){
                    txt += "<b><i>Voluntariado</i></b> ";

                    if(fontesRecursos.voluntariadoMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.voluntariadoMIN  + ", ";
                    }

                    if(fontesRecursos.voluntariadoMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.voluntariadoMAX  + ", ";
                    }
                }

                if(fontesRecursos.isencoesMIN || fontesRecursos.isencoesMAX){
                    txt += "<b><i>Isenções:</i></b> ";

                    if(fontesRecursos.isencoesMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.isencoesMIN  + ", ";
                    }

                    if(fontesRecursos.isencoesMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.isencoesMAX  + ", ";
                    }
                }

                if(fontesRecursos.imunidadesMIN || fontesRecursos.imunidadesMAX){
                    txt += "<b><i>Imunidades</i></b> ";

                    if(fontesRecursos.imunidadesMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.imunidadesMIN  + ", ";
                    }

                    if(fontesRecursos.imunidadesMAX ){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.imunidadesMAX  + ", ";
                    }
                }

                if(fontesRecursos.bensRecebidosDireitoUsoMIN || fontesRecursos.bensRecebidosDireitoUsoMAX){
                    txt += "<b><i>Bens recebidos em direito de uso</i></b> ";

                    if(fontesRecursos.bensRecebidosDireitoUsoMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.bensRecebidosDireitoUsoMIN  + ", ";
                    }

                    if(fontesRecursos.bensRecebidosDireitoUsoMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.bensRecebidosDireitoUsoMAX  + ", ";
                    }
                }

                if(fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN || fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMAX){
                    txt += "<b><i>Doações recebidas na forma de produtos e serviços (sem NF)</i></b> ";

                    if(fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN){
                        txt += "<b><i>maior que:</i></b> " + fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMIN  + ", ";
                    }

                    if(fontesRecursos.doacoesRecebidasFormaProdutosServicosSemNFMAX){
                        txt += "<b><i>menor que:</i></b> " + fontesRecursos.valorMAX  + ", ";
                    }
                }
            }

            var idh_json = json_filtro.IDH;

            if(idh_json){
                if(idh_json.IDH_Municipal){
                    txt += "<b><i>Índice de Desenvolvimento Humano:</i></b> IDH Municipal - Faixa: ";

                    if(idh_json.baixo){
                        txt += "baixa, ";
                    }

                    if(idh_json.medio){
                        txt += "médio, ";
                    }
                    if(idh_json.alto){
                        txt += "alto, ";
                    }
                }
            }

            $("#filtros p").html(txt);
        }
    }

    //*** Methods
    function tabela(urlRota, consulta_avancada){
        var data_tipo;
        $('#loading').removeClass('hide');
        $('#resultadoconsulta_formato_dados').hide();
        if(consulta_avancada){
            type_http = "POST";
            data_tipo = params;
        }else{
            type_http = "GET";
            data_tipo = null;
        }

        $.ajax({
            url: urlRota,
            type: type_http,
            dataType: 'json',
            data:data_tipo,
            error:function(e){
                console.log("Erro no ajax: "+e);
            },
            success: function(data){
                if(data !== "Nenhuma Organização encontrada!"){
                    var columns = 6;
                    var sizeOfData = data.length;
                    if (data.lista_osc) {
                      sizeOfData = data.lista_osc.length;
                    }
                    var newData = new Array(sizeOfData);
                    var i = 0;
                    var txtVazioNulo = 'Dado não informado.';
                    var srcPadrao = 'img/camera.jpg';

                    if (!data.lista_osc) {
                      for (var j in data){
                        if(j=="0"){
                            continue;
                        }else{
                            newData[i] = new Array(columns);
                            var srcImg = data[j][4] !== null ? data[j][4] : srcPadrao;
                            newData[i][0] = '<img class="img-circle media-object" src=' + srcImg + ' height="64" width="64">';
                            newData[i][1] = data[j][0] !== null ? data[j][0] : txtVazioNulo;//tx_nome_osc;
                            newData[i][2] = data[j][1] !== null ? data[j][1] : txtVazioNulo;//cd_identificador_osc;
                            newData[i][3] = data[j][2] !== null ? data[j][2] : txtVazioNulo;//tx_natureza_juridica_osc;
                            newData[i][4] = data[j][3] !== null ? data[j][3] : txtVazioNulo;//tx_endereco_osc;
                            newData[i][5] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+j+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>';
                            i++;
                        }
                    }
                  }else {
                    for (var j in data.lista_osc){
                      if(j=="0"){
                          continue;
                      }else{
                          newData[i] = new Array(columns);
                          var srcImg = data.lista_osc[j][4] !== null ? data.lista_osc[j][4] : srcPadrao;
                          newData[i][0] = '<img class="img-circle media-object" src=' + srcImg + ' height="64" width="64">';
                          newData[i][1] = data.lista_osc[j][0] !== null ? data.lista_osc[j][0] : txtVazioNulo;//tx_nome_osc;
                          newData[i][2] = data.lista_osc[j][1] !== null ? data.lista_osc[j][1] : txtVazioNulo;//cd_identificador_osc;
                          newData[i][3] = data.lista_osc[j][2] !== null ? data.lista_osc[j][2] : txtVazioNulo;//tx_natureza_juridica_osc;
                          newData[i][4] = data.lista_osc[j][3] !== null ? data.lista_osc[j][3] : txtVazioNulo;//tx_endereco_osc;
                          newData[i][5] = '<button type="button" onclick="location.href=\'visualizar-osc.html#'+j+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>';
                          i++;
                      }
                  }

                  }



                    //Se a pesquisa for alguma palavra que não tem referencia com nenhuma OSC
                    if(typeof newData[0] !== "undefined"){
                        var datatable = $('#resultadoconsulta_formato_dados').DataTable({
                            responsive: true,
                            processing: true,
                            deferLoading: 1000,
                            deferRender: true,
                            searching: false,
                            data: newData,
                            dom: 'Bfrtip',
                            "bPaginate": false,
                            "bSort": true,
                            "aaSorting": [[ 1, 'asc' ]],
                            columns: [
                                {title: "", width: 50},
                                {title: "Nome da OSC", width: 200},
                                {title: "CNPJ"},
                                {title: "Natureza Jurídica"},
                                {title: "Endereço"},
                                {title: "Detalhar"}
                            ],
                            aoColumnDefs: [
                                {bSortable :false, aTargets: [0]},
                                {bSortable :false, aTargets: [5]},
                                {bSortable :false, aTargets: [4]}
                            ],
                            autoWidth: true
                        });

                        datatable.destroy();
                        datatable.draw();
                        $('#resultadoconsulta_formato_dados').show();
                        $('#loading').addClass('hide');
                    }else{
                        $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
                        $('#modalTitle').text('Nenhuma OSC encontrada!');

                        if(tipoConsulta !== "avancado" && tipoConsulta !== "municipio"){
                            $('#modalConteudo').text('Sua pesquisa "'+ decodeURIComponent(stringBuscada) + '" não retornou nenhuma OSC.');
                        }else{
                            $('#modalConteudo').text('Sua pesquisa não retornou nenhuma OSC.');
                        }

                        $('#modalMensagem').modal('show');
                    }
                }else {
                    $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
                    $('#modalTitle').text('Nenhuma OSC encontrada!');

                    if(tipoConsulta !== "avancado" && tipoConsulta !== "municipio"){
                        $('#modalConteudo').text('Sua pesquisa "'+ decodeURIComponent(stringBuscada) + '" não retornou nenhuma OSC.');
                    }else {
                        $('#modalConteudo').text('Sua pesquisa não retornou nenhuma OSC.');
                    }
                    $('#modalMensagem').modal('show');
                }
            }
        });

        $('#resultadoconsulta_formato_dados').on('draw.dt', function (){
            verificarContraste();
        });
    }

    function loadPopUp(id, leafletMarker){
        var loading = '<img id="loading" src="img/loading.gif" style="padding-top: 10px; padding-left: 10px;"/>';
        leafletMarker.bindPopup(loading).openPopup();

        $.ajax({
            url: rotas.OSCPopUpByID(id),
            type: 'GET',
            dataType: 'json',
            error: function(e){
                console.log("ERRO no AJAX :" + e);
            },
            success: function(data){
                if(data!==undefined){
                    //console.log(data);
                    var endereco = data.tx_endereco !== null ? data.tx_endereco : '';
                    var bairro = data.tx_bairro !== null? data.tx_bairro : '';
                    var enderecoCompleto = endereco+' - '+bairro;
                    var txtVazioNulo = 'Dado não informado.';
                    var div = '<div class="mapa_organizacao clearfix">' +
                        '<span id="spantitle" class="magneticTooltip">'+
                        '<button id="title" class="btn-link"  onclick=location.href="visualizar-osc.html#'+ id +'">'+
                        '<h4>'+ (data.tx_nome_osc !== null ? data.tx_nome_osc : txtVazioNulo)+'</h4></button></span>'+
                        '<div class="coluna1"><strong></strong><strong>Endereço: </strong>'+ enderecoCompleto +'<br>'+
                        '<strong>Atividade Econômica: </strong>'+(data.tx_nome_atividade_economica !== null ? data.tx_nome_atividade_economica : txtVazioNulo)+'<br>'+
                        '<strong>Natureza Jurídica: </strong>'+(data.tx_nome_natureza_juridica !== null ? data.tx_nome_natureza_juridica : txtVazioNulo)+'<br><br>'+
                        '<div align="center"><button type = button class="btn btn-info" onclick=location.href="visualizar-osc.html#'+ id +'"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>'+
                        '</div></div></div>';
                    leafletMarker.bindPopup(div).openPopup();
                }
            }
        });
    }

    function loadPoint(id, latFinal, lngFinal){
        if((latFinal !=="")&&(latFinal !==null) || (lngFinal!==null)&&(lngFinal !== "")){
            var marker = new PruneCluster.Marker(latFinal, lngFinal);
            marker.data.ID = id;

            leafletView.PrepareLeafletMarker = function(leafletMarker, data){
                leafletMarker.on('click', function(){
                    loadPopUp(data.ID, leafletMarker);
                });
            };

            leafletView.RegisterMarker(marker);
            return leafletView;
        }

        return null;
    }

    function loadPointCluster(icone, id, latFinal, lngFinal, tipoCluster){
        if((latFinal !=="")&&(latFinal !==null) || (lngFinal!==null)&&(lngFinal !== "")){
            var marker;

            if(tipoCluster=="regiao" || tipoCluster=="todos"){
                marker = L.marker([latFinal, lngFinal], {icon: icone}).on('click', clickClusterRegiao);
            }else if(tipoCluster=="estado"){
                marker = L.marker([latFinal, lngFinal], {icon: icone}).on('click', clickClusterEstado);
            }

            //marker.addTo(map);
            return marker;
        }
    }

    function carregaMapa(dados){
        for(var k in dados){
            if(k != "0"){
                var point = loadPoint(k, dados[k][0], dados[k][1]);

                if(point!==null){
                    map.addLayer(point);
                }
            }
        }

        if(tipoConsulta=="avancado" && params["avancado"] != '{}'){
              $('#export button').removeAttr('disabled');
              $('#export button').addClass('btn-success');
              $('#export button' ).attr( "title", "" );
        }

        $("#loadingMapModal").hide();
        leafletView.ProcessView();
    }

    var info = L.control();

    function highlightFeature(e){
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        if(layer.feature.properties.Name=="GO"){
            //Necessário para a layer de Goiás não se sobrepor a layer do Distrito federal
            layer.bringToBack();
        }

        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomm(e){
        var layer = e.target;
        map.fitBounds(layer.getBounds());
    }

    var legend = L.control({position: 'bottomright'});

    function heatMap(arrayPDF, arrayID){
        var nomeEstado;

        $.each(statesData.features , function(i){
            nomeEstado = statesData.features[i].properties.Name;
            statesData.features[i].properties.density = arrayPDF[nomeEstado];
            statesData.features[i].properties.id = arrayID[nomeEstado];
        });

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.density),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.6
            };
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                //click: zoomm //zoomToFeature //metodo que carrega pontos ao clicar no estado
                click: zoomToFeature
            });

            layerGroup.addLayer(layer);
            //layerGroupIDH.addLayer(layer);
            llayers[layer.feature.properties.id] = layer;
            llayersIDH[layer.feature.properties.id] = layer;
        }

        map.addLayer(layerGroup);
        //map.addLayer(layerGroupIDH);

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
            this._div.innerHTML = '<h4>OSCs por Estado</h4>' +  (props ?
                '<b>' + props.Name + '</b><br />' + props.density + ' OSCs.'
                : 'Passe o mouse sobre um estado');
        };

        info.addTo(map);
        var lll;

        function zoomToFeature(e) {
            console.log('clicado zoomToFeature');
            var layer = e.target;
            map.fitBounds(layer.getBounds());
            console.log(layer);
            loadChunkData(layer.feature.properties.id);

            if(rlayers[layer.feature.properties.Regiao]==undefined){
                var l = clayers[layer.feature.properties.id];
                if(l!=undefined)
                map.removeLayer(l);
            }else{
                loadChunkDataRegiao(layer);
            }

            layer.off();

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomm
            });
        }

        //var legend = L.control({position: 'bottomright'});

        legend.onAdd = function(map){
            var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1000, 15000, 30000, 45000, 60000],
            labels = [];

            div.innerHTML += '<h5>Escala de OSCs por estado</h5>';

            for(var i = 0; i < grades.length; i++){
                div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                parseInt(grades[i] + 1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        };

        legend.addTo(map);

        geojson = L.geoJson(statesData, {
            style: function(statesData){
                return {
                    fillColor: getColor(statesData.properties.density),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.6
                };
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    }

    function getColor(d){
        //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
        //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
        return d > 60000 ? '#800026' :
        d > 45000  ? '#E31A1C' :
        d > 30000  ? '#FC4E2A' :
        d > 15000   ? '#FEB24C' :
        d > 1000  ? '#FED976' :
        '#FFEDA0';
    }

    function getColorIDH(d){
        //o menor valor de OScs em um estado é de ~537 e o maior ~91665, a escala abaixo está em 5 níveis,
        //logo o cálculo de degradê abaixo está considerando estes 3 fatores mais um arredondamento
        return d > 0.799  ? '#527DA7' :
        d > 0.699  ? '#58935D' :
        d > 0.599   ? '#D2CE49' :
        d > 0.499  ? '#CC9538' :
        '#AD3735';
    }

    function carregaMapaCluster(dados, level){
        var classNameLevel;

        if(level=="regiao" || level == "todos"){
            classNameLevel = "labelClassRegiao";
        }else if(level=="estado"){
            classNameLevel = "labelClassEstado";
        }

        for(var k in dados){
            var markerGroup = [];

            var icone =  L.divIcon({
                id: dados[k].id_regiao,
                className: classNameLevel,
                html: "<p>"+dados[k].nr_quantidade_osc_regiao+"</p>"
            });

            mapRegion[dados[k].id_regiao] = dados[k].nr_quantidade_osc_regiao;
            var layerPoint = loadPointCluster(icone, dados[k].id_regiao, dados[k].geo_lat_centroid_regiao, dados[k].geo_lng_centroid_regiao, level);
            clustersLayer.addLayer(layerPoint);

            if(level=="estado"){
                clayers[dados[k].id_regiao]=layerPoint;
            }else if(level=="regiao" || level == "todos"){
                rlayers[dados[k].id_regiao]=layerPoint;
            }
        }

        if(!isControlLoaded){//Evitar adicionar controles repetidamente na tela
            clustersLayer.addTo(map);
            //clustersLayer.addTo(layerGroup);
            isControlLoaded=true;
        }

        $("#loadingMapModal").hide();
        //leafletView.ProcessView();
    }

    function loadChunkData(idEstado){
        $("#loadingMapModal").show();

        $.ajax({
            url: rotas.OSCByStateInMap(idEstado),
            type: 'GET',
            dataType: 'json',
            error: function(e){
                console.log("ERRO no AJAX :" + e);
            },
            success: function(data){
                tabela(urlRota, consulta_avancada);
                if(typeof data.length !== 'undefined'){
                    var count = 0;

                    for(var i = 0; i < data.length; i++){
                        count += data[i].nr_quantidade_osc_regiao;
                    }

                    paginar(count);
                }else{
                    paginar(Object.keys(data).length-1);
                }

                if(data!==undefined){
                    carregaMapa(data);
                }
            }
        });
    }

    function clickClusterRegiao(e){
        var idRegiao = e.target.options.icon.options.id;
        $("#loadingMapModal").show();

        $.ajax({
            url: rotas.ClusterEstadoPorRegiao(idRegiao),
            type: 'GET',
            dataType: 'json',
            error: function(e){
                console.log("ERRO no AJAX :" + e);
            },
            success: function(data){
                tabela(urlRota, consulta_avancada);
                if(typeof data.length !== 'undefined'){
                    var count = 0;

                    for(var i = 0; i < data.length; i++){
                        count += data[i].nr_quantidade_osc_regiao;
                    }

                    paginar(count);
                }else{
                    paginar(Object.keys(data).length-1);
                }

                if(data!==undefined){
                    map.setView([e.target._latlng.lat, e.target._latlng.lng], 5);
                    map.removeLayer(e.target);
                    delete rlayers[idRegiao];
                    carregaMapaCluster(data, "estado");
                }
            }
        });
    }

    function loadChunkDataRegiao(layer){
        var idRegiao = layer.feature.properties.Regiao;
        $("#loadingMapModal").show();

        $.ajax({
            url: rotas.ClusterEstadoPorRegiao(idRegiao),
            type: 'GET',
            dataType: 'json',
            error: function(e){
                console.log("ERRO no AJAX :" + e);
            },
            success: function(data){
                tabela(urlRota, consulta_avancada);
                if(typeof data.length !== 'undefined'){
                    var count = 0;

                    for(var i = 0; i < data.length; i++){
                        count += data[i].nr_quantidade_osc_regiao;
                    }

                    paginar(count);
                }else{
                    paginar(Object.keys(data).length-1);
                }

                if(data!==undefined){
                    carregaMapaCluster(data, "estado");
                    var r = rlayers[idRegiao];
                    map.removeLayer(r);
                    delete rlayers[idRegiao];
                    var l = clayers[layer.feature.properties.id];
                    map.removeLayer(l);
                }
            }
        });
    }

    function paginar(qtdPagination){
        $('.pagination').pagination({
            items: qtdPagination,
            itemsOnPage: 10,
            hrefTextPrefix: "#",
            prevText: "Anterior",
            nextText: "Próximo",
            onPageClick: function(pageNumber){(paginarAction(pageNumber))}
        });
    }

    function paginarAction(pageNumber){
        if(pageNumber === null){
            pageNumber = 0;
        }

        var offset = parseInt(pageNumber) * 10 - 10;

        if(tipoConsulta == "avancado"){
            urlRota = rotas.ConsultaAvancadaLista(offset);
            consulta_avancada = true;
        }else if(tipoConsulta == "municipio"){
            urlRota = rotas.OSCByCounty(stringBuscada,offset);
        }else if(tipoConsulta == "estado"){
            urlRota = rotas.OSCByState(stringBuscada,offset);
        }else if(tipoConsulta == "regiao"){
            urlRota = rotas.OSCByRegion(stringBuscada,offset);
        }else if(tipoConsulta == "todos"){
            urlRota = rotas.AllOSC(offset);
        }else if(tipoConsulta == "organizacao"){
            urlRota = rotas.OSCByName(getParameter('organizacao'), offset, getParameter('tipoBusca'));
        }

        tabela(urlRota, consulta_avancada);
    }

    function clickClusterEstado(e){
        var idEstado = e.target.options.icon.options.id;
        //zoomToFeature(idEstado);
        $("#loadingMapModal").show();

        $.ajax({
            url: rotas.OSCByStateInMap(idEstado),
            type: 'GET',
            dataType: 'json',
            error: function(e){
                console.log("ERRO no AJAX :" + e);
            },
            success: function(data){
                tabela(urlRota, consulta_avancada);
                if(typeof data.length !== 'undefined'){
                    var count = 0;
                    for(var i = 0; i < data.length; i++){
                        count += data[i].nr_quantidade_osc_regiao;
                    }

                    paginar(count);
                }else{
                    paginar(Object.keys(data).length-1);
                }

                if(data!==undefined){
                    map.setView([e.target._latlng.lat, e.target._latlng.lng], 6);
                    map.removeLayer(e.target);
                    var l = llayers[idEstado];
                    l.off();

                    l.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: zoomm
                    });

                    carregaMapa(data);
                }
            }
        });
    }

    function apagaMapaDeCalor(e){
        var zoomMap = map.getZoom();

        if(zoomMap==zoomMaximo){
            map.removeLayer(layerGroup);
            map.removeLayer(layerGroupIDH);
        }
    }

    //*** MAIN ***\\
    $("#loadingMapModal").show();

    var data_tipo_mapa;

    if(consulta_avancada){
        type_http = "POST";
        data_tipo_mapa = params;
    }else{
        type_http = "GET";
        data_tipo_mapa = null;
    }

    $.ajax({
        url: urlRotaMapa,
        type: type_http,
        dataType: 'json',
        data: data_tipo_mapa,
        error: function(e){
            console.log("ERRO no AJAX :" + e);
        },
        success: function(data){
            //console.log(tipoConsulta);
            if(data !== "" && data !== undefined && data !== "Nenhuma Organização encontrada!"){
                tabela(urlRota, consulta_avancada);
                var count = 0;
                var data1 = data;
                  if (data.lista_osc) {
                    data1 = data.lista_osc;
                  }

                if(isClusterVersion){
                    if(typeof data1.length !== 'undefined'){
                        for(var i = 0; i < data1.length; i++){
                            if(tipoConsulta=='todos') {
                                count += data1[i].nr_quantidade_osc_regiao;
                            }else{
                                count += data1[i].nr_quantidade_osc_regiao;
                            }
                        }
                    }

                    count = count+27;

                    paginar(count);
                    $("#legenda p").append(count);
                    if(tipoConsulta=='todos'){
                        $("#legendaConsulta").show();
                        $("#legenda p").append(' ');//Colocar *
                    }
                    carregaMapaCluster(data1, tipoConsulta);
                }else{
                    count = Object.keys(data1).length-1;
                    paginar(count);
                    $("#legenda p").append(count);
                    if(tipoConsulta=='todos'){
                        $("#legendaConsulta").show();
                        $("#legenda p").append(' ');//Colocar *
                    }
                    carregaMapa(data1);

                    if(consulta_avancada){

                      $( "#export button" ).click(function() {
                        $("#modal_loading").modal('show');

                        setTimeout(function(){

                        var param_exp = {};
                        param_exp['variaveis_adicionais'] = var_adc;
                        if (data.chave_cache_exportar) {
                          param_exp['chave'] = data.chave_cache_exportar;
                        }


                        $.ajax({
                            url: rotas.ExportarDadosConsulta(),
                            type: 'POST',
                            dataType: 'json',
                            async:false,
                            data: param_exp,
                            error: function(e){
                                $("#modal_loading").modal('hide');

                                $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
                                $('#modalTitle').text('Limite para exportação excedido!');
                                $('#modalConteudo').html('<p>A consulta excedeu o limite para exportação.</p><br><p>Adicione mais filtros ou realize o download completo da base do Mapa das OSCs no link <a title="Link para a Base de Dados." href="/base-dados.html" target="_blank">Base de Dados</a></p>');
                                $('#modalMensagem button').attr('onclick', '');

                                $('#modalMensagem').modal('show');

                            },
                            success: function(retorno){
                              console.log(retorno);

                              var data, filename, link;
                              var csv = convertArrayOfObjectsToCSV({
                                   data: retorno
                              });
                              filename = "exportacao_consulta.csv";

                              var isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;

                              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

                              if (!isMac) {
                                var BOM = "\ufeff";
                                csv = BOM + csv;
                              }

                              var blob = new Blob([csv], {
                                encoding: "UTF-8",
                                type: "text/csv;charset=UTF-8"
                              });
                              var blobUrl = window.URL.createObjectURL(blob);

                              //ie (naturally) does things differently
                              var csvLink = document.getElementById("download_report");
                              if (!window.navigator.msSaveOrOpenBlob) {
                                csvLink.href = blobUrl;
                                csvLink.download = filename;
                              }
                              csvLink.click();

                              $("#modal_loading").modal('hide');
                            }
                          });

                        }, 1000);




                      });
                    }
                }
            }else{
                $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
                $('#modalTitle').text('Nenhuma OSC encontrada!');

                if(tipoConsulta !== "avancado" && tipoConsulta !== "municipio"){
                    $('#modalConteudo').text('Sua pesquisa "'+ decodeURIComponent(stringBuscada) + '" não retornou nenhuma OSC.');
                }else{
                    $('#modalConteudo').text('Sua pesquisa não retornou nenhuma OSC.');
                }

                $('#modalMensagem').modal('show');
            }
      }
    });

    //IDH========================================================================================================
    
    //IDH Estado
    //$('#loadingMapModal').show();
    $.ajax({
        url: rotas.IDH(),
        type: 'GET',
        dataType: 'json',
        error: function(e){
            console.log("ERRO no AJAX: " + e);
        },
        success: function(data){
            //console.log(data);
            IDH(data);
            //$('#loadingMapModal').hide();
            idhLoaded = true;
            addControlsMap();
        }
    });

    var infoIDH = L.control();
    var legendIDH = L.control({position: 'bottomright'});

    infoIDH.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update(null, 'none');
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    infoIDH.update = function (props, tipo) {

        let nome = tipo === 'uf' ? 'nm_uf' : 'nm_municipio';
        let titulo = tipo === 'uf' ? 'IDH' : 'IDHM';

        this._div.innerHTML = '<h4>' + titulo + '</h4>' +  (props ?
            '<b>' + props[nome] + '</b><br />' + props.nr_valor
            : 'Passe o mouse sobre um territorio');
    };

    legendIDH.onAdd = function(map){
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 0.499, 0.599, 0.699, 0.799],

            labels = [];

        div.innerHTML += '<h5>Escala de IDH</h5>';

        div.innerHTML += '<i style="background:' + getColorIDH(0.499) + '"></i> 0 - 0.499 <br>' +
            '<i style="background:' + getColorIDH(0.599) + '"></i> 0.500 - 0.599 <br>' +
            '<i style="background:' + getColorIDH(0.699) + '"></i> 0.600 - 0.699 <br>' +
            '<i style="background:' + getColorIDH(0.799) + '"></i> 0.700 - 0.799 <br>' +
            '<i style="background:' + getColorIDH(0.800) + '"></i> 0.800 - 1';

        /*for(var i = 0; i < grades.length; i++){
            div.innerHTML +=
                '<i style="background:' + getColorIDH(grades[i] + 1) + '"></i> ' +
                parseInt(grades[i] + 1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }*/

        return div;
    };

    function IDH(data){

        geojsonIDH = L.geoJson(data, {
            style: function(feature) {
                return {
                    fillColor: getColorIDH(feature.properties.nr_valor),
                    weight: 0.5,
                    opacity: 1,
                    color: 'white',
                    dashArray: '1',
                    fillOpacity: 0.9
                };
            }.bind(this),
            onEachFeature: onEachFeature //listeners
        });
        //}).addTo(map);

        function onEachFeature(feature, layer) {
            //console.log(layer);
            //console.log(this);

            layerGroupIDH.addLayer(layer);
            //map.addLayer(layerGroupIDH);

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }


        /*infoIDH.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update(null, 'none');
            return this._div;
        };*/

        // method that we will use to update the control based on feature properties passed
        /*infoIDH.update = function (props, tipo) {

            let nome = tipo === 'uf' ? 'nm_uf' : 'nm_municipio';
            let titulo = tipo === 'uf' ? 'IDH' : 'IDHM';

            this._div.innerHTML = '<h4>' + titulo + '</h4>' +  (props ?
                '<b>' + props[nome] + '</b><br />' + props.nr_valor
                : 'Passe o mouse sobre um territorio');
        };*/

        //infoIDH.addTo(map);

        function highlightFeature(e){
            var layer = e.target;

            layer.setStyle({
                weight: 2,
                color: '#667',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            if(layer.feature.properties.Name=="GO"){
                //Necessário para a layer de Goiás não se sobrepor a layer do Distrito federal
                layer.bringToBack();
            }

            infoIDH.update(layer.feature.properties, 'uf');
        }

        function resetHighlight(e) {
            geojsonIDH.resetStyle(e.target);
            infoIDH.update(null);
        }

        function zoomToFeature(e) {
            var layer = e.target;
            map.fitBounds(layer.getBounds());
            //console.log(layer);
            loadChunkData(layer.feature.properties.cod_uf);

            if(rlayers[layer.feature.properties.Regiao]==undefined){
                var l = clayers[layer.feature.properties.id];
                if(l!=undefined)
                    map.removeLayer(l);
            }else{
                loadChunkDataRegiao(layer);
            }

            //console.log(e.target.feature);

            loadIDHM(e.target.feature.properties.cod_uf);

            layer.off();

            layer.on({
                //mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomm
            });
        }

        /*legendIDH.onAdd = function(map){
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 0.499, 0.599, 0.699, 0.799],

                labels = [];

            div.innerHTML += '<h5>Escala de IDH</h5>';

            div.innerHTML += '<i style="background:' + getColorIDH(0.499) + '"></i> 0 - 0.499 <br>' +
                '<i style="background:' + getColorIDH(0.599) + '"></i> 0.500 - 0.599 <br>' +
                '<i style="background:' + getColorIDH(0.699) + '"></i> 0.600 - 0.699 <br>' +
                '<i style="background:' + getColorIDH(0.799) + '"></i> 0.700 - 0.799 <br>' +
                '<i style="background:' + getColorIDH(0.800) + '"></i> 0.800 - 1';

            /!*for(var i = 0; i < grades.length; i++){
                div.innerHTML +=
                    '<i style="background:' + getColorIDH(grades[i] + 1) + '"></i> ' +
                    parseInt(grades[i] + 1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }*!/

            return div;
        };*/

        //legendIDH.addTo(map);



    }

    //----------------------
    
    //IDHM Municipio

    var infoIDHM = L.control();
    var legendIDHM = L.control({position: 'bottomright'});

    //console.log(id);
    function loadIDHM(id){
        $('#loadingMapModal').show();
        $.ajax({
            url: rotas.IDHM(id),
            type: 'GET',
            dataType: 'json',
            error: function(e){
                console.log("ERRO no AJAX: " + e);
            },
            success: function(data){
                console.log(data);
                IDHM(data);
                $('#loadingMapModal').hide();
            }
        });
    }

    function IDHM(data){

        geojsonIDHM = L.geoJson(data, {
            style: function(feature) {
                return {
                    fillColor: getColorIDH(feature.properties.nr_valor),
                    weight: 0.5,
                    opacity: 1,
                    color: 'white',
                    dashArray: '1',
                    fillOpacity: 0.9
                };
            }.bind(this),
            onEachFeature: onEachFeature //listeners
        });
        //}).addTo(map);

        function onEachFeature(feature, layer) {
            //console.log(layer);
            //console.log(this);

            layerGroupIDHM.addLayer(layer);
            layerGroupIDH.addLayer(layerGroupIDHM);

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }


        /*infoIDHM.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update(null, 'none');
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        infoIDHM.update = function (props) {
            this._div.innerHTML = '<h4>IDHM</h4>' +  (props ?
                '<b>' + props.nm_municipio + '</b><br />' + props.nr_valor
                : 'Passe o mouse sobre um município');
        };

        if(!infoIDHM._map){
            infoIDHM.addTo(map);
        }*/


        function highlightFeature(e){
            var layer = e.target;

            layer.setStyle({
                weight: 2,
                color: '#667',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            if(layer.feature.properties.Name=="GO"){
                //Necessário para a layer de Goiás não se sobrepor a layer do Distrito federal
                layer.bringToBack();
            }

            //infoIDHM.update(layer.feature.properties);
            infoIDH.update(layer.feature.properties, 'municipio');
        }

        function resetHighlight(e) {
            geojsonIDHM.resetStyle(e.target);
            //infoIDHM.update(null);
            infoIDH.update(null);
        }

        function zoomToFeature(e) {
            var layer = e.target;
            map.fitBounds(layer.getBounds());
            //loadChunkData(layer.feature.properties.id);

            /*if(rlayers[layer.feature.properties.Regiao]==undefined){
                var l = clayers[layer.feature.properties.id];
                if(l!=undefined)
                    map.removeLayer(l);
            }else{
                loadChunkDataRegiao(layer);
            }*/

            layer.off();

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomm
            });
        }

        /*legendIDHM.onAdd = function(map){
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 0.499, 0.599, 0.699, 0.799],

                labels = [];

            div.innerHTML += '<h5>Escala de IDHM</h5>';

            div.innerHTML += '<i style="background:' + getColorIDHM(0.499) + '"></i> 0 - 0.499 <br>' +
                '<i style="background:' + getColorIDHM(0.599) + '"></i> 0.500 - 0.599 <br>' +
                '<i style="background:' + getColorIDHM(0.699) + '"></i> 0.600 - 0.699 <br>' +
                '<i style="background:' + getColorIDHM(0.799) + '"></i> 0.700 - 0.799 <br>' +
                '<i style="background:' + getColorIDHM(0.800) + '"></i> 0.800 - 1';

            /!*for(var i = 0; i < grades.length; i++){
                div.innerHTML +=
                    '<i style="background:' + getColorIDHM(grades[i] + 1) + '"></i> ' +
                    parseInt(grades[i] + 1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }*!/

            return div;
        };

        legendIDHM.addTo(map);*/



    }


    //FIM IDH=========================================================================================================
    
    //Coloração do mapa
    $.ajax({
        url: rotas.ClusterEstado(),//rotas.IDHM,//
        type: 'GET',
        dataType: 'json',
        error: function(e){
            console.log("ERRO no AJAX :" + e);
        },
        success: function(data){

            if(data!==undefined){
                var pdfs={};
                var ids={};

                //for(var k in data.value){
                if (!data.lista_osc) {
                  for(var k in data){
                    pdfs[data[k].tx_sigla_regiao]=data[k].nr_quantidade_osc_regiao;
                    //pdfs[data.value[k].TERNOME]=data.value[k].a2010m01d01;
                    ids[data[k].tx_sigla_regiao]=data[k].id_regiao;
                    //ids[data.value[k].TERNOME]=data.value[k].TERCODIGO;
                  }
                }else {
                  for(var k in data.lista_osc){
                    pdfs[data.lista_osc[k].tx_sigla_regiao]=data.lista_osc[k].nr_quantidade_osc_regiao;
                    //pdfs[data.value[k].TERNOME]=data.value[k].a2010m01d01;
                    ids[data.lista_osc[k].tx_sigla_regiao]=data.lista_osc[k].id_regiao;
                    //ids[data.value[k].TERNOME]=data.value[k].TERCODIGO;
                  }

                }

                oscLoaded = true;
                addControlsMap();

                map.addControl(L.control.groupedLayers(
                    {
                        'Satélite':googleHybrid,
                        'Contraste': tilesGrayscale,
                        'Mapa': tiles,
                    },
                    {
                        'Camadas': {
                            'OSC':layerGroup,
                            'IDH':layerGroupIDH,
                            'Desativar':layerGroupTeste
                        }
                    },
                    {
                        collapsed:false,
                        // Make the "Landmarks" group exclusive (use radio inputs)
                        exclusiveGroups: ["Camadas"],
                        // Show a checkbox next to non-exclusive group labels for toggling all
                        groupCheckboxes: true
                    }
                ));

                /*map.addControl(new L.Control.Layers(
                    {
                        'Satélite':googleHybrid,
                        'Contraste': tilesGrayscale,
                        'Mapa': tiles,
                    },
                    {
                        'Mapa de calor':layerGroup,
                        'IDHM':layerGroupIDH
                    },
                    {
                        collapsed:false
                    }
                ));*/

                heatMap(pdfs, ids);
            }
        }
    });

    function addControlsMap(){
        /*if(oscLoaded && idhLoaded){
            map.addControl(L.control.groupedLayers(
                {
                    'Satélite':googleHybrid,
                    'Contraste': tilesGrayscale,
                    'Mapa': tiles,
                },
                {
                    'Mapa de calor': {
                        'OSC':layerGroup,
                        'IDH':layerGroupIDH
                    }
                },
                {
                    collapsed:false,
                    exclusiveGroups: ["Mapa de calor"],
                    groupCheckboxes: true
                }
            ));
        } */
    }

    map.on('zoomend', apagaMapaDeCalor);

    let hasExistOSC = true;
    let hasExistIDH = false;

    let firstLoad = true;
    map.on('overlayadd', function(eo){
        if(eo.name === 'OSC' && !firstLoad){
            info.addTo(map);
            legend.addTo(map);
            hasExistOSC = true;
            if (hasExistIDH) {
                map.removeControl(infoIDH);
                map.removeControl(legendIDH);
                hasExistIDH = false;
            }
        }
        if(eo.name === 'IDH' && !firstLoad){
            infoIDH.addTo(map);
            legendIDH.addTo(map);
            hasExistIDH = true;
            if (hasExistOSC) {
                map.removeControl(info);
                map.removeControl(legend);
                hasExistOSC = false;
            }

        }
        if(eo.name === 'Desativar' && !firstLoad){
            if (hasExistOSC) {
                map.removeControl(info);
                map.removeControl(legend);
                hasExistOSC = false;
            }
            if (hasExistIDH) {
                map.removeControl(infoIDH);
                map.removeControl(legendIDH);
                hasExistIDH = false;
            }
        }
        firstLoad = false;
    });


});

