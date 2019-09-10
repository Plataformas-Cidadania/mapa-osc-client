class Projeto {
  constructor() {

  }

  getFonteDeRecursosProjeto(fonte){
    var key = Object.keys(fonte)[0];
    var objFonte = {
      "id": "fonte_recursos",
      "dados": fonte[key]
    };
    return objFonte;
  }

  montarProjetos(json, util){
    var arraySecaoProjeto = [];

    var projects_list = util.validateObject(json.projeto_abreviado, []);
    //console.log(json.projeto);
    var headerProjeto = {
      "id": "lista_projetos",
      "priority": "2",
      "text": "Projetos, atividades e programas - PAP"
    };
    arraySecaoProjeto.push(headerProjeto);

    var columns = 3;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto, 1);
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto, "");
      newData[i][2] = "<span className='input-group-btn'>"+
      "<button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button>"+
      "</span>"
    }
    arraySecaoProjeto.push(newData);
    var columns = 3;
    var sizeOfData = projects_list.length;
    var newData = new Array(sizeOfData);
    for (var i=0; i < projects_list.length; i++){
      newData[i] = new Array(columns);
      newData[i][0] = util.validateObject(projects_list[i].id_projeto, 1);
      newData[i][1] = util.validateObject(projects_list[i].tx_nome_projeto, "");
      newData[i][2] = "<span className='input-group-btn'>"+
      "<button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button>"+
      "</span>"
    }
    arraySecaoProjeto.push(newData);
    return arraySecaoProjeto;
  }

  montarProjeto(project, util, dadosForm,rotas){

    var labelMap = dadosForm.labelsProjeto();//console.log(labelMap);
    var arrayCampos = [];
    var agrupadores = [];
    var projectId = project.id_projeto;
    var projet = util.validateObject(project.projeto,project);
    var project = util.validateObject(projet[0],projet);
    var title;
    var fonte = util.validateObject(project.ft_identificador_projeto_externo,null);
    var objetivo_meta = util.validateObject(project.objetivo_meta,null);

    var fonteRec = this.getFonteDeRecursosProjeto(util.validateObject(project.fonte_recursos, []));
    fonteRec.dados = util.validateObject(project.fonte_recursos, []);

    for (var property in project) {
      // Area de atuacao e oscs parceiras de projeto temporariamente escondidas
      if((property != "tipo_parceria") && (property != "fonte_recursos") && (property != "area_atuacao") && (property != "osc_parceira") && (property != "area_atuacao_outra")){
        if ((project.hasOwnProperty(property)) && (labelMap[property] !== undefined)) {

          var sectionId = property;
          var value = project[property];
          var fonte = project[property.replace(/tx_|dt_|nr_|cd_/g,'ft_')];

          var header = labelMap[property].header;
          var containerClass = labelMap[property].containerClass;
          var removable = labelMap[property].removable;
          var type = labelMap[property].type;
          var options = labelMap[property].options;
          var placeholder = labelMap[property].placeholder;
          var infoTitle = labelMap[property].infoTitle;
          var buttons = null;
          var buttonsInLine = false;


          if((value === null) || (value.constructor !== Array)){

            var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title, fonte, objetivo_meta, null, infoTitle);
            var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons, options, null, infoTitle);
            agrupadores.push(agrupadorInputProjeto);
          }
        }
      }
      else if ((property == "tipo_parceria")) {
        var sectionId = property;
        var value = project[property];
        var fonte = project[property.replace(/tx_|dt_|nr_|cd_/g,'ft_')];

        var header = labelMap[property].header;
        var containerClass = labelMap[property].containerClass;
        var removable = labelMap[property].removable;
        var type = labelMap[property].type;
        var options = labelMap[property].options;
        var placeholder = labelMap[property].placeholder;
        var infoTitle = labelMap[property].infoTitle;
        var buttons = null;
        var buttonsInLine = false;

        var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title, fonte, null, null, infoTitle);
        var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons, options, null, infoTitle);
        agrupadores.push(agrupadorInputProjeto);
      }
    }

    //console.log(agrupadores);
    console.log(project);
    console.log("===========================================================");
    if (project.hasOwnProperty("fonte_recursos")){
      var sectionId = fonteRec.id;
      var value = fonteRec.dados;
      var fonte = null;
      if(fonteRec.dados.length > 0){
          fonte = fonteRec.dados[0].ft_fonte_recursos_projeto;
      }

      var header = labelMap[sectionId].header;
      var containerClass = labelMap[sectionId].containerClass;
      var removable = labelMap[sectionId].removable;
      var type = labelMap[sectionId].type;
      var options = labelMap[sectionId].options;
      var placeholder = labelMap[sectionId].placeholder;
      var infoTitle = labelMap[sectionId].infoTitle;

      var buttons = null;
      var buttonsInLine = false;

      var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title, fonte, null, null, infoTitle);
      var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons, options, null, infoTitle);
      agrupadores.push(agrupadorInputProjeto);

      console.log(agrupadorInputProjeto);

    }
    /* Area de atuacao de projeto temporariamente escondida
    if (!(project.hasOwnProperty("area_atuacao"))){
      var property = "area_atuacao";
      var sectionId = property;
      var value = "";
      var header = labelMap[property].header;
      var containerClass = labelMap[property].containerClass;
      var removable = labelMap[property].removable;
      var type = labelMap[property].type;
      var options = labelMap[property].options;
      var placeholder = labelMap[property].placeholder;
      var buttons = null;
      var buttonsInLine = false;
      var inputProjeto = util.InputProjeto(sectionId, value, type, options, removable, buttons, buttonsInLine, placeholder, title, objetivo_meta);
      var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, [inputProjeto], buttons);
      agrupadores.push(agrupadorInputProjeto);
    }*/
    var area_atuacao_projeto = util.validateObject(project.area_atuacao, []);
    var autodeclaradas = util.validateObject(project.area_atuacao_outra, []);

    var projectlocalizacao = util.validateObject(project.localizacao, []);
    var localizacao =  util.getTipoProjeto("localizacao_projeto", projectlocalizacao);

    var projectPublicoFinanciado = util.validateObject(project.publico_beneficiado, []);
    var publicoBeneficiado =  util.getTipoProjeto("publico_beneficiado", projectPublicoFinanciado);

    var financiadorProjeto = util.validateObject(project.financiador_projeto, []);
    var financiadores =  util.getTipoProjeto("financiador_projeto", financiadorProjeto);
    var autodeclaradas = util.getTipoProjeto("area_atuacao_outra", autodeclaradas);

    var oscParceira = util.validateObject(project.osc_parceira, []);
    var parceiras =  util.getTipoProjeto("osc_parceira", oscParceira);

    var id_osc_parceira = [];
    var tam_osc_parc = project.osc_parceira ? project.osc_parceira.length : 0;
    for (var i = 0; i < tam_osc_parc ; i++) {
      id_osc_parceira = util.validateObject(project.osc_parceira[i].id_osc,null);
    }

    var valorMeta = "";
    var idObjetivo = util.validateObject(project.objetivo_meta) ? project.objetivo_meta.id_objetivo_projeto : "";

    // Area de atuacao de projeto e OSCs parceiras temporariamente escondidas
    // var multipleInputs = [
    //   autodeclaradas, localizacao, publicoBeneficiado, financiadores, parceiras, fonte//, objetivo_meta
    // ];
    var multipleInputs = [//local onde apresenta os campos na tela de edição do projeto
       localizacao, publicoBeneficiado, financiadores, parceiras
    ];
    //console.log(multipleInputs);

    for (var j = 0; j < multipleInputs.length; j++) {
      if(util.validateObject(multipleInputs[j].dados, false)){
        var agrupador = this.createAgrupadorMultipleInputs(multipleInputs[j], labelMap, util);
        agrupadores.push(agrupador);
      }
   }
    //metasObjetivos(project, projectId);

    //ordenar canpos
    var campos_projetos =  dadosForm.getEmptyProject();
    var agrupadores_ordenado = [];

    for (var campo in campos_projetos) {
      for (var i = 0; i < agrupadores.length; i++) {
        if (  agrupadores[i].id == campo) {
          agrupadores_ordenado.push(agrupadores[i]);
          break;
        }
      }

    }

    return agrupadores_ordenado;
  }

  carregaProjeto(id, dadosForm, rotas, util, novo){
    //console.log(dadosForm);
    //console.log(novo);
    var res = {};
    var agrupadores=null;
    if(novo){
      var empty_project = dadosForm.getEmptyProject();
      res.agrupadores = this.montarProjeto(empty_project, util, dadosForm,rotas);
    } else {
      $.ajax({
        url: rotas.ProjectByID(id),
        type: 'GET',
        async: false,
        dataType: 'json',
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          res.projeto = data;
          //console.log(data);
        }
      });
      agrupadores = this.montarProjeto(res.projeto, util, dadosForm,rotas);
      res.agrupadores = agrupadores;
    }
    //console.log(res);
    return res;
  }

  createAgrupadorMultipleInputs(object, labelMap, util){
    var buttonRemove = {
      "type": "remove",
      "value": "Remover"
    };

    var buttonAdd = {
      "type": "add",
      "value": "Adicionar"
    };
    var sectionId = object.id
    //console.log(object);
    var element = labelMap[object.id];
    var inputs = [];
    var value = "";
    var removable = util.validateObject(element)?element.removable:"";
    var type = util.validateObject(element)?element.type:"";
    var options = util.validateObject(element)?element.options:"";
    var suboptions = null;
    var cc = util.validateObject(element)?element.custom_class:"";
    var infoTitle = util.validateObject(element)?element.infoTitle:"";

    var buttonsInput = null;
    var buttonsInLine = false;
    var placeholder = "Insira a informação";
    if(removable){
      buttonsInput = [buttonRemove];
      buttonsAgrupador = [buttonAdd];
      buttonsInLine = true;
    }
    if(object.dados.length === 0){
      var inputId = sectionId;
      value = "";
      var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine, placeholder, null, null, null, cc, infoTitle)
      inputs.push(inputProjeto);
    }
    for (var i = 0; i < object.dados.length; i++) {
      var inputId = sectionId;
      for (var property in object.dados[i]) {
        //console.log(property);
        if (object.dados[i].hasOwnProperty(property)) {
          if(property.slice(0,2) === "tx"){
            value = object.dados[i][property];
            var cd = object.dados[i].cd_area_atuacao_projeto;
            var inputProjeto = util.InputProjeto(inputId, value, type, options, removable, buttonsInput, buttonsInLine, placeholder, null, null, cd, cc, infoTitle);
            inputs.push(inputProjeto);
          }
        }
      }
    }
    var header = util.validateObject(element)?element.header:"";
    var containerClass = util.validateObject(element)?element.containerClass:"col-md-3";

    var buttonsAgrupador = null;
    if(removable){
      buttonsInput = [buttonRemove];
      buttonsAgrupador = [buttonAdd];
    }
    var agrupadorInputProjeto = util.AgrupadorDeInputs(sectionId, containerClass, header, inputs, buttonsAgrupador, options, cc, infoTitle);
    return agrupadorInputProjeto;
  }


}
