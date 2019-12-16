var controller = angular.module('oscApp', []);
var idOsc;
var absUrl;
var rotas;
var util = new Util();
var recursos_relatorio;

controller.controller('OscCtrl', ['$http', '$location', '$scope', '$filter', function($http, $location, $scope, $filter) {

		absUrl = $location.$$absUrl;
		var self = this;

		idOsc = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);//$location.absUrl().substr($location.absUrl().lastIndexOf('/') + 1);

		if ($scope.currentPage == undefined) {
				 $scope.currentPage = 0;
		 };

	  	$scope.pageSize = 10;
		$scope.projs = []
	  	$scope.q = '';

		rotas = new Rotas();

		self.carregarDadosGerais = function(){

			$http({
			     url: rotas.OSCByID(idOsc),
			     method: "GET"
			}).then(function(response) {
				if(response.data.msg == undefined){
					self.osc = response.data
					var projeto_array = response.data.projeto.projeto
					if(projeto_array != undefined){
						$scope.projs = projeto_array // PROJETOS
					}
					else {
						$scope.projs = "";
					}

		    	self.msg = '';

					if(response.data.recursos != undefined){
						recursos_relatorio = response.data.recursos.recursos;
					}

				}else{
					self.msg = response.data.msg;
				}
			});
		};


		$scope.getData = function () {
			 return $filter('filter')($scope.projs, $scope.q)
		 }

		 $scope.numberOfPages=function(){
	        return Math.ceil($scope.getData().length/$scope.pageSize);
	   }

		 $scope.range = function() {
			 	 var paginacao = [];
				 for (var i = 1; i <= $scope.numberOfPages(); i++) {
	   	 		paginacao.push(i);
				 }
				 return paginacao;
		 };

		  $scope.novaPagina=function(n){
				$scope.currentPage = n -1;
			};

			$scope.paginaCorrente=function(n){
				var pagina = n -1
				return $scope.currentPage == pagina  ? true: false ;
			};

	}]);


controller.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

controller.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});


controller.filter('tel', function() {
	return function(input) {
		if(input !== null && input !== undefined  && input !== ""){
	  	var str = input+ '';
	    str = str.replace(/\D/g,'');
			if(str.length === 11 ){
				if(str[0] === 0){
					str=str.replace(/^(\d{4})(\d{3})(\d{4})/,'$1-$2-$3');
				}
				else{
					  str=str.replace(/^(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
				}
	    }
			else if(str.length === 10){
	    	str=str.replace(/^(\d{2})(\d{4})(\d{4})/,'($1) $2-$3');
	    }
			else if(str.length === 9){
	    	str=str.replace(/^(\d{0})(\d{5})(\d{4})/,'($1) $2-$3');
	    }
			else if(str.length === 8){
	        str=str.replace(/^(\d{0})(\d{4})(\d{4})/,'($1) $2-$3');
	    }
	    return str;
		}
		return "Não informado";
  };
});

controller.filter('icone', function() {
	return function(input) {
		if(input !== null && input !== undefined  && input !== ""){
	  	var src;
			if(input == "Representante de OSC" || input == "Representante" ){
				src = "img/dado_representante.png";
			}
			else {
				src = "img/base_dados.png";
			}
			return src;
		}
		return "";
  };
});

controller.filter('icon_title', function() {
	return function(input) {
		if(input !== null && input !== undefined  && input !== ""){
	  	var title;
			if(input == "Representante de OSC" || input == "Representante" ){
				title = "Informação preenchida pela Organização";
			}
			else {
				title = "Informação oficial. Fonte " + input;
			}
			return title;
		}
		return "";
  };
});

controller.filter('icon_class', function() {
	return function(input) {
		if(input !== null && input !== undefined  && input !== ""){
	  	var classe;
			if(input == "Representante de OSC" || input == "Representante" ){
				classe = "imgDadoEditavel";
			}
			else {
				classe = "imgDadoOficial";
			}
			return classe;
		}
		return "";
  };
});

controller.filter('verificarLink', function() {
	return function(input) {
		if(input !== null && input !== undefined && input !== ""){
	  	var link = input;
			if(!input.startsWith("http")){
				link = "http://" + input;
			}
			return link;
		}
		return "";
  };
});

function abrirProjeto(e) {
	var id = $(e).attr("data");
	$(id).toggle("slow");
	$(e).find(".glyphicon").toggleClass( "glyphicon-minus" );
	verificarContraste();
}


require(["jquery-ui", 'rotas'], function (React) {
	var rotas = new Rotas();

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

	jQuery(document).ready(function($) {
		idOsc = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
		$("#loading").hide();
		$(".conteudo_loading .section").css('visibility', 'visible');
		$(".fb-share-button").attr('data-href',window.location.href);
		//$(".g-plusone").attr('data-href',window.location.href);

		verificarBotaoEditar(idOsc);
		verificarBotaoCertificate();
		addLinkVoltar(idOsc);
    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
	   });

		 $("#voltaPagAnterior").on("click", function(){
	     history.go(-1);
	   });

		 setTimeout(function(){ verificarContraste(); }, 3000);
		 window.onload = function () {
				 verificarContraste();
				 $(".social iframe").each(function() {
					 $(this).attr('title', '');
				 });
		 };

		 $.ajax({
			 url: rotas.BarraTransparencia(idOsc),
			 type: 'GET',
			 async: true,
			 dataType: 'json',
			 error:function(e){
				 console.log("Erro no ajax: ");
				 console.log(e);
				 $('#grafico-progress').parent().hide();
			 },
			 success: function(data){

				 if (data != null) {

					 var dataJson = { values: [{"id": "DG", "order": 1, "score": data.transparencia_dados_gerais, "weight": data.peso_dados_gerais, "color": "#9E0041", "label":"Dados Gerais"},
					 {"id":"ASAO", "order":1, "score":data.transparencia_area_atuacao, "weight": data.peso_area_atuacao, "color":"#E1514B", "label":"Áreas e Subáreas de Atuação da OSC"},
					 {"id":"DO", "order":1, "score":data.transparencia_descricao, "weight": data.peso_descricao, "color":"#F47245", "label":"Descrição da OSC"},
					 {"id":"TC", "order":1, "score":data.transparencia_titulos_certificacoes, "weight": data.peso_titulos_certificacoes, "color":"#FB9F59", "label":"Titulações e Certificações"},
					 {"id":"RTG", "order":1, "score":data.transparencia_relacoes_trabalho_governanca, "weight": data.peso_relacoes_trabalho_governanca, "color":"#6CC4A4", "label":"Relações de Trabalho e Governança"},
					 {"id":"EPS", "order":1, "score":data.transparencia_espacos_participacao_social, "weight": data.peso_espacos_participacao_social, "color":"#4D9DB4", "label":"Espaços de Participação Social"},
					 {"id":"PAP", "order":1, "score":data.transparencia_projetos_atividades_programas, "weight": data.peso_projetos_atividades_programas, "color":"#4776B4", "label":"Projetos, atividades e/ou programas"},
					 {"id":"FRAO", "order":1, "score":data.transparencia_fontes_recursos, "weight": data.peso_fontes_recursos, "color": "#5E4EA1","label":"Fontes de recursos anuais da OSC"}]
					 };

	 				 perfil(dataJson['values']);
					 add_medalha(parseInt(data.transparencia_osc));

				}
			}

		 });

	});

	function add_medalha(valor) {
		var img = "sem_medalha.png";

		if(valor >= 50 && valor < 70){
			img = "bronze.png";
		}
		else if(valor >= 70 && valor < 90){
			img = "prata.png";
		}
		else if (valor >= 90 && valor < 99) {
			img = "ouro.png";
		}
		else if(valor == 100) {
			img = "diamante.png";
		}

		var html = '<a href="metodologia.html" title="Conquista referente ao Índice de Preenchimento."><img src="img/'+img+'" class="medalha"></a>'+
		'<br><br>'+
		'<a href="https://gife.org.br/indicadores-gife-de-governanca/autoavaliacao" title="Acesse os Indicadores GIFE de Governança" target="_blank">'+
		'<img src="img/GIFEpeca_01.png" width="64" height="48">'+
		'<img class="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo."></a>';

		$(".divImg").append(html);
	}


});

var jsonModalAjuda = {
	"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho.",
 	"Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da declaração da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC.",
 	"Descrição da OSC":"Aqui a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades (previstas no seu estatuto). Os campos podem ser preenchidos pelo(a) representante da OSC cadastrado(a) no Mapa.",
 	"Titulações e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
 	"Relações de Trabalho e Governança":"Aqui o(a) representante da OSC pode indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da sua organização, além de preencher o número de trabalhadores voluntários da entidade. Isso garante transparência para quem busca informações sobre a OSC. Os campos relativos ao número de empregados formais provêm das informações lançadas na RAIS/MTE.",
 	"Espaços de Participação Social":"Nesse espaço, o(a) representante da OSC pode indicar a participação em espaços colegiados com o Poder Público (conselhos de políticas públicas), as oportunidades que teve de integrar espaços que traçaram diretrizes de políticas (conferências de políticas públicas), bem como outros espaços de participação compartilhados com o Poder Público ou autoorganizados pela própria sociedade civil (fóruns, redes etc.).<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
 	"Projetos, atividades e/ou programas":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
 	"Fontes de recursos anuais da OSC":"Essa seção informa o somatório de todos os recursos por fonte autodeclarados pela OSC ano a ano."
};

function abrirModalAjuda(titulo) {

	var	corpo = jsonModalAjuda[titulo];
	var tituloCompleto = "Ajuda - "+titulo;
	var btn = "<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>";

	acionarModalAjuda(tituloCompleto, corpo, btn);
}

function abrirModalRelatorio(titulo) {

	var	corpo = "<fieldset id='escolhaImpressao'><legend>Escolha quais seções para imprimir</legend>";
	corpo += "<label><input type='checkbox' name='escolha' value='tudo' checked> Todas Seções</label><br><br>";
	corpo += "<label><input type='checkbox' name='secao' value='dados_gerais' checked> Dados Gerais</label><br>";
	corpo += "<label><input type='checkbox' name='secao' value='areas_de_atuacao' checked> Áreas e Subáreas de Atuação da OSC</label><br>";
	corpo += "<label><input type='checkbox' name='secao' value='descricao' checked> Descrição da OSC</label><br>";
	corpo += "<label><input type='checkbox' name='secao' value='titulacao' checked> Titulações e Certificações</label><br>";
	corpo += "<label><input type='checkbox' name='secao' value='relacao_trabalho' checked> Relações de Trabalho e Governança</label><br>";
	corpo += "<label><input type='checkbox' name='secao' value='participacao_social' checked> Espaços de Participação Social</label><br>";
	corpo += "<label><input type='checkbox' name='secao' value='projetos' checked> Projetos, atividades e/ou programas</label><br>";
	corpo += "<div class='subCheckbox'><label><input type='checkbox' name='secaoProjeto' value='todos_projetos'> Todas as Informações do Projeto</label></div>";
	corpo += "<label><input type='checkbox' name='secao' value='recursos_vis' checked> Fontes de recursos anuais da OSC</label><br>";

	if(recursos_relatorio.length > 0){
		corpo += "<div class='subCheckbox'>";
		for (var i = 0; i < recursos_relatorio.length; i++) {
			corpo += "<label><input type='checkbox' name='secaoRecurso' value='"+recursos_relatorio[i].dt_ano_recursos_osc+"'> "+recursos_relatorio[i].dt_ano_recursos_osc+"</label>";
		}
		corpo += "</div>";
	}
	corpo += "</fieldset>";

	var btn = "<button type='button' class='btn btn-success' data-dismiss='modal' onclick='imprimir()'><span class='glyphicon glyphicon-print' aria-hidden='true'></span> Imprimir</button>";
	btn += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>";

	var tituloCompleto = "Gerar "+titulo;
	acionarModalAjuda(tituloCompleto, corpo, btn);
	$("#escolhaImpressao input:checkbox[name=escolha]").click(function() {
			if( $(this).is(':checked') ){
				$("#escolhaImpressao input:checkbox[name=secao]").each(function(){
					$(this).prop("checked", true );
				});
		 } else {
				$("#escolhaImpressao input:checkbox[name=secao]").each(function(){
					$(this).prop("checked", false );
				});
		 }
	 });
}

function acionarModalAjuda(titulo, corpo, btn) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
	$("#btnFooter").html("");
	$("#btnFooter").html(btn);
  $("#modalAjuda").modal('show');
  verificarContraste();
}

function imprimir(){

	$("#grafico-progress").parent().hide();
	$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){
	  var valor = $(this).val();
		$("#"+valor).hide();
	});

	if($("#escolhaImpressao input:checkbox[name=secaoProjeto]").is(':checked')){
		$("#projetos").find(".panel-collapse").each(function() {
			$(this).show();
			$(this).parent().find(".glyphicon").toggleClass( "glyphicon-minus" );
		});
	}

	$("#escolhaImpressao input:checkbox[name=secaoRecurso]:checked").each(function(){
		var valor = $(this).val();
		$("#recursos_vis").find(".panel-title").each(function() {
 			var vet = $(this).text().split(" ");
 		 	if(vet[1] == valor){
 				$(this).parent().parent().parent().find(".panel-collapse").show();
 			 	$(this).parent().parent().find(".glyphicon").toggleClass( "glyphicon-minus" );
 		 	}
 	 	});
	});

	$("#modalAjuda").hide();
	if(window.print){
		window.print();
	}

	if($("#escolhaImpressao input:checkbox[name=secaoProjeto]").is(':checked')){
		$("#projetos").find(".panel-collapse").each(function() {
			$(this).hide();
			$(this).parent().find(".glyphicon").toggleClass( "glyphicon-minus" );
		});
	}

	$("#escolhaImpressao input:checkbox[name=secaoRecurso]:checked").each(function(){
		var valor = $(this).val();
		$("#recursos_vis").find(".panel-title").each(function() {
			var vet = $(this).text().split(" ");
			if(vet[1] == valor){
				$(this).parent().parent().parent().find(".panel-collapse").hide();
				$(this).parent().parent().find(".glyphicon").toggleClass( "glyphicon-minus" );
			}
		});
	});

	$("#grafico-progress").parent().show();
	$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){
		var valor = $(this).val();
		$("#"+valor).show();
	});

}




function verificarBotaoEditar(id){

	$("#btnCertificate").attr("style", "display:none");
	$("#btnCertificate").hide();
	$('#bbtnCertificate').css('display', 'none');

	if(util.verificarPermissao(id)){
		$(".btnEditar").append('<a id="btnEditar" type="button" title="Clique para Editar"  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar OSC</a>');
		$("#btnEditar").attr("href","editar-osc.html#/"+id);


		$(".btnCertificate").append('<li ng-if="ctrl.osc.cabecalho.cd_identificador_osc == null" ><div id="btnCertificate" type="button" onclick="printCertificate(\'printDivCertificate\');" class="btn btn-primary btn-sm btn-aling"><i class="fa fa-certificate" aria-hidden="true"></i>Declaração</div></li>');


	}


}

function addLinkVoltar(id){
		$("#voltaVisualizar").attr("href","visualizar-osc.html#/"+id);
		var urlPagAnterior = document.referrer;
		if(urlPagAnterior.indexOf("minhas-oscs")==-1) {
			if(urlPagAnterior.indexOf("editar-osc")==-1) {
				$("#voltaPagAnterior").text('Mapa');
			}else {
				$("#voltaPagAnterior").text('Editar');
			}
		 } else {
				 $("#voltaPagAnterior").text('Lista de OSCs');
		 }
}
function verificarBotaoCertificate() {
	var rotas = new Rotas();
	let rotaArryCert = rotas.getBaseUrl().split("/");
	let rotaFullCert = rotaArryCert[0] + "//" + rotaArryCert[2];
	//$("#preloadCertificate").attr("src", rotaFullCert+'/img/loading.gif');
	//document.getElementById("preloadCertificate").src = rotaFullCert + "/img/loading.gif";
	$("#preloadCertificate").attr('src', rotaFullCert + "/img/loading.gif");
}

function printCertificate(tagid){


	//////////*Start Data Hoje *//////////
	var data = new Date();
	var dia = data.getDate();
	var mes = data.getMonth() + 1;
	if (mes < 10) {
		mes = "0" + mes;
	}
	if (dia < 10) {
		dia = "0" + dia;
	}
	var ano = data.getFullYear();

	document.getElementById('testeData').innerHTML = dia+"/"+mes+"/"+ano;
	//////////*End Data Hoje *//////////

	//////////*Start Print *//////////
	var hashid = "#"+ tagid;
	var tagname =  $(hashid).prop("tagName").toLowerCase() ;
	var attributes = "";
	var attrs = document.getElementById(tagid).attributes;
	$.each(attrs,function(i,elem){
		attributes +=  " "+  elem.name+" ='"+elem.value+"' " ;
	})
	var divToPrint= $(hashid).html() ;
	var head = "<html><head>"+ $("head").html() + "</head>" ;
	var allcontent = head + "<body  onload='window.print()' >"+ "<" + tagname + attributes + ">" +  divToPrint + "</" + tagname + ">" +  "</body></html>"  ;
	var newWin=window.open('','Print-Window');
	newWin.document.open();
	newWin.document.write(allcontent);
	newWin.document.close();
	//////////*Start Print *//////////

}

require(['rotas',"jquery-ui"], function (React) {

	var rotas = new Rotas();

    $.ajax({
        url: rotas.ModuloBySlug('certificado'),
        //url: rotas.ModuloCertificado(),
        type: 'GET',
        dataType: 'json',
        error: function(e){
            console.log("ERRO no AJAX :" + e);
            $('.manutencao').css('display', 'block');
            $('.loading').addClass('hide');
        },
        success: function(data){
			var txtCertificado = data[0].modulos.tx_descricao_modulo.replace(/<.*?>/g, '');
			var txtCertificado = isoToUtf8(txtCertificado);

			var re = /\s*;;\s*/;
			var txtCertificado = txtCertificado.split(re);

			let rotaArry = rotas.getBaseUrlCMS().split("/");
			let rotaFull = rotaArry[0]+"//"+rotaArry[2];

			$("#title").text(data[0].modulos.tx_titulo_modulo);
			$("#txt0").text(txtCertificado[0]);
			$("#txt1").text(txtCertificado[1]);
			$("#txt2").text(txtCertificado[2]);
			$("#txt3").text(txtCertificado[3]);

            $("#imgSetada").attr("src",rotaFull+'/cms/imagens/modulos/'+data[0].modulos.tx_imagem_modulo);

        }
    });
});

function isoToUtf8 (str) {
	var acentos = {
		'&Aacute;': 'Á',
		'&Eacute;': 'É',
		'&Iacute;': 'Í',
		'&Oacute;': 'Ó',
		'&Uacute;': 'Ú',
		'&aacute;': 'á',
		'&eacute;': 'é',
		'&iacute;': 'í',
		'&oacute;': 'ó',
		'&uacute;': 'ú',
		'&Acirc;': 'Â',
		'&Ecirc;': 'Ê',
		'&Ocirc;': 'Ô',
		'&Acirc;': 'â',
		'&Ecirc;': 'ê',
		'&Ocirc;': 'ô',
		'&Agrave;': 'À',
		'&agrave;': 'à',
		'&Uuml;': 'Ü',
		'&uuml;': 'ü',
		'&Ccedil;': 'Ç',
		'&ccedil;': 'ç',
		'&Atilde;': 'Ã',
		'&Otilde;': 'Õ',
		'&atilde;': 'ã',
		'&otilde;': 'õ',
		'&Ntilde;': 'Ñ',
		'&ntilde;': 'ñ',
	};

	for(let property in acentos){
		str = replaceAll(str, property, acentos[property]);
	}

	return str;


}
function replaceAll(str, de, para){
	var pos = str.indexOf(de);
	while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
	return (str);
}





