define('componenteBlocoDeTexto', ['react'], function (React) {
  var BlocoTexto = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <div className="bloco">
            <h5>{this.props.dados[i].titulo}</h5>
            <div className="texto">{this.props.dados[i].formato}</div>
          </div>
        );
      }
      return items;
    },
    render: function() {
      return (<div>{this.renderListItems()}</div>);
    }
  });

  return BlocoTexto;
});

define('componenteCabecalho', ['react'], function (React) {
  var Cabecalho = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <div>
            <div className="divImg">
              <img id="imagemLogo" src={(this.props.dados[i].imgLogo)?this.props.dados[i].imgLogo:"img/camera.jpg"} className="img-rounded media-object logoOSC"></img>
              <div id="btnInserirImg"></div>
              <div id="btnRemoverImg"></div>
              <div className="alert alert-danger fade in hide" id="errorLabel">
                <strong>Erro!</strong> Somente Imagem no formato png, jpg ou gif menores que 1 MB.
              </div>
           </div>
           <div className="cabeca">
              <h2>Nome: {this.props.dados[i].Nome}</h2>
              <h3>CNPJ: {this.props.dados[i].cd_nur}</h3>
              <h3>Natureza Jurídica: {this.props.dados[i].NatJur}</h3>
            </div>
        </div>
        );
      }
      return items;
    },
    render: function() {
      return (<div>{this.renderListItems()}</div>);
    }
  });

  return Cabecalho;
});

define('componenteResultadoDaConsulta', ['react'], function (React) {
  var ResultadoConsulta = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <tr>
            <th scope="row">
              <a href="#" className="pull-left"><img className="img-circle media-object" src={this.props.dados[i].imagem} height="64" width="64"></img></a>
            </th>
            <td className="title">{this.props.dados[i].nome}</td>
            <td>{this.props.dados[i].cnpj}</td>
            <td>{this.props.dados[i].natjur}</td>
            <td>{this.props.dados[i].end}</td>
            <td>
              <button type="button" className="btn btn-info" href="perguntas-frequentes.html" >Detalhar
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
            </td>
          </tr>
        );
      }
      return items;
    },
    render: function() {
      return (

        <table className="tablesaw table-hover" data-tablesaw-sortable data-tablesaw-sortable-switch>
          <thead>
            <tr>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="persist"></th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="1" data-tablesaw-sortable-default-col>Nome da OSC</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="4">CNPJ</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="2">Natureza Jurídica</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="3">Endereço</th>
              <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="3">Detalhar</th>
            </tr>
          </thead>
          <tbody>
           {this.renderListItems()}
           </tbody>
       </table>

        );
    }
  });

  return ResultadoConsulta;
});

define('componenteTitulosCertificacoes', ['react','componenteDropdown'], function (React, Dropdown) {

  //// Componente para renderizar a linha da tabela contendo as informaçõe dos títulos
  var TitulosCertificacoesLinhaTabela = React.createClass({
    render: function() {
      var titleSpanFonte = "Informação preenchida pela Organização";
      var SpanFonte = <span className="fonte-de-dados dado-organizacao" title={this.props.fonte}><img className="imgDadoEditavel" title={titleSpanFonte} src="img/dado_representante.png"></img></span>
      var botaoRemover = <button type="button" className="remove_titulo_certificacao btn btn-danger" data={this.props.id} href="#" onClick={this.props.remove_titulo.bind(this,this.props.id)} >Remover</button>
      if(this.props.fonte != 'Representante' && this.props.fonte != 'Representante de OSC' && this.props.fonte != null && this.props.fonte != false){
        botaoRemover = ""
        titleSpanFonte = "informação oficial. Fonte " + this.props.fonte;
        SpanFonte = <span className="fonte-de-dados dado-oficial" title={this.props.fonte}><img className="imgDadoOficial"  title={titleSpanFonte} src="img/base_dados.png"></img></span>
      }else if (this.props.fonte == false) {
          SpanFonte = "";
          botaoRemover = ""
      }

      return (
        <tr id={this.props.id_titulo}>
          <td>
            <div className="input-box tipo_titulo_certificado">
              {SpanFonte}
              {this.props.nome_titulo}
            </div>
          </td>
          <td className="data_inicio_validade_titulo_certificado">{this.props.data_inicio}</td>
          <td className="data_fim_validade_titulo_certificado">{this.props.data_validade}</td>
          <td className="local_titulo_certificado" data-cod={this.props.uf_mun_certificado} >{this.props.local_certificado}</td>
          <td>
            {botaoRemover}
          </td>
        </tr>
        );
    }
  });

  //// Componente para renderizar a tabela contendo as informaçõe dos títulos
  var TitulosCertificacoesTabela = React.createClass({
    // Coso o componente seja atualizado ( state ), o datatable é recarregado

    componentDidUpdate: function(){
      $('#tabela_titulos_certificados').dataTable({
        responsive: true, processing: true, paging: true,
        destroy: true, pageLength: 10, deferLoading: 1000,
        searching: false, dom: 'Bfrtip', "bSort": true,
  		});
   	},


    render: function() {
      var function_remove_titulo = this.props.exclui_titulo_lista.bind(this);
      return (
          <table className="tablesaw table-hover" id="tabela_titulos_certificados" data-tablesaw-sortable data-tablesaw-sortable-switch>
            <thead>
              <tr>
                <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="4">Título/Certificado</th>
                <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="2">Início da Validade</th>
                <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="2">Fim da Validade</th>
                <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="2">Localidade</th>
                <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="3"></th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.dados_tabela.map(function(titulo, index){
                  return <TitulosCertificacoesLinhaTabela
                    nome_titulo={titulo.tx_nome_certificado}
                    data_validade={titulo.dt_fim_certificado}
                    data_inicio={titulo.dt_inicio_certificado}
                    local_certificado={titulo.tx_local_certificado}
                    uf_mun_certificado={titulo.cd_uf_mun_certificado}
                    fonte={titulo.ft_certificado}
                    id={index}
                    remove_titulo={function_remove_titulo}
                    id_titulo={titulo.id_certificado} />
              })
            }
            </tbody>
         </table>
        );
    }
  });

  //// Componente para renderizar o formulario para inclusão de um novo título
  //// de utilidade publica estadual ou municial
  var TitulosCertificacoesNovoTitulo = React.createClass({
    render: function() {
      //Títulos permitidos para inclusão
      var tiposTitulosCertificados = [ "Utilidade Pública Estadual", "Utilidade Pública Municipal" ];

      return (
        <div>
          <button className="btn-primary btn" id="novo_titulo_certificacao_botao" onClick={this.props.toggle_exibe_novo_titulo} >Adicionar Novo Título</button>
          <br/><br/>
          <table className={'tablesaw table-hover ' + this.props.visivel} id="novo_titulo_certificacao_form" data-tablesaw-sortable data-tablesaw-sortable-switch >
            <tbody>
             <tr>
              <td> <TitulosCertificacoes_dropdown list={tiposTitulosCertificados} /> </td>
              <td>
                <div className="input-box">
                  <input maxLength="10" className="form-control date"  id="novo_titulo_certificacao_data_inicio" placeholder="Data início da validade" type="text" ></input>
                </div>
              </td>
              <td>
                <div className="input-box">
                  <input maxLength="10" className="form-control date"  id="novo_titulo_certificacao_data" placeholder="Data fim da validade" type="text" ></input>
                </div>
              </td>
              <td>
                <div className="input-box">
                  <input maxLength="100" className="form-control  ui-autocomplete-input"  id="novo_titulo_certificacao_local" placeholder="Estado/Município" type="text" ></input>
                  <input className="form-control"  id="cd_uf_mun_titulo_certificacao" type="hidden"></input>
                </div>
              </td>
              <td><button type="button" className="btn btn-primary" onClick={this.props.inclui_novo_titulo}> Adicionar </button></td>
             </tr>
             </tbody>
          </table>
        </div>
        );
    }
  });

  //// Componente para renderizar do dropbox com as opções de títulos
  var TitulosCertificacoes_dropdown = React.createClass({
    render: function() {
        return (
          <div>
           <select id="idSelectTitulosCertificados" className="form-control">
            <option value={"Estadual"} selected>Selecione uma opção...</option>
            {
             this.props.list.map(function(item){
                return <option value={item}>{item}</option>
             })
            }
            </select>
          </div>
        );
      }
  });

    //// Componente para renderizar a mensagem(feedback) pro usuário
  function Mensagem(props) {
    return <p className={"label "+ props.msg_class }>{props.msg}</p>
  }

  //// Componente principal que renderiza todos os outros
  var TitulosCertificacoes = React.createClass({
    //Set estados iniciais
    getInitialState : function() {

      return {
        novoTitulo_Visivel : "hidden", //state botão "Inclui novo"
        listaTitulosCertificados  : this.props.dados, //lista com os certificados
        msg  : "", //mensagem para exibir ao usuario
        msg_class  : "" //mensagem para exibir ao usuario
      };
    },

    //reset dos campos de inclusão de novos títulos
    limpa_campos: function(){
       document.getElementById('idSelectTitulosCertificados').value = "";
       document.getElementById('novo_titulo_certificacao_data').value = "";
       document.getElementById('novo_titulo_certificacao_data_inicio').value = "";
       document.getElementById('novo_titulo_certificacao_local').value = "";
       document.getElementById('cd_uf_mun_titulo_certificacao').value = "";
    },

    //handler do botão "Incluir novo Título" - toggle visibility
    toggle_form_novo_titulo: function(e) {
        this.setState( (this.state.novoTitulo_Visivel == "hidden") ? {novoTitulo_Visivel: ""} : {novoTitulo_Visivel: "hidden"} );
        this.setState({ mgs: "", msg_class: ""});
    },

    exclui_titulo: function(id_item) {
      var lista_atual = this.state.listaTitulosCertificados;
      lista_atual.splice(id_item,1);
      $("#tabela_titulos_certificados").DataTable().destroy();
      this.setState( {listaTitulosCertificados: lista_atual,  msg: "Título excluído com sucesso.",  msg_class: "label-success" });
    },

    //handler do botão "Incluir" que inclui o novo título na lista e renderiza
    inclui_titulo: function(e) {
      var nova_lista_titulos = this.state.listaTitulosCertificados;
      var data_inicio_titulo = (document.getElementById('novo_titulo_certificacao_data_inicio').value) ? document.getElementById('novo_titulo_certificacao_data_inicio').value : "Não informado" ;
      var data_fim_titulo = document.getElementById('novo_titulo_certificacao_data').value;
      var tipo_titulo = document.getElementById('idSelectTitulosCertificados').value;
      var local_certificado = document.getElementById('novo_titulo_certificacao_local').value;
      var uf_mun_certificado = document.getElementById('cd_uf_mun_titulo_certificacao').value;
      // push do novo título

      if((data_inicio_titulo && tipo_titulo) && (tipo_titulo != -1)){
        // Inclui na tabela os novos valores
        nova_lista_titulos.push({
                                    dt_inicio_certificado: data_inicio_titulo,
                                    dt_fim_certificado: data_fim_titulo,
                                    ft_certificado:  "Representante de OSC",
                                    tx_nome_certificado: tipo_titulo,
                                    tx_local_certificado: local_certificado,
                                    cd_uf_mun_certificado: uf_mun_certificado
                                    //id: "NovoTitulo_" + Math.random()
                                });
        $("#tabela_titulos_certificados").DataTable().destroy(); // Destroy datatable para gerar nova com base na nova lista atualizada
        this.setState( {listaTitulosCertificados: nova_lista_titulos, novoTitulo_Visivel: "hidden", msg: "Novo Título incluído com sucesso", msg_class: "label-success"} ); // Set novos estados
        this.limpa_campos(); // reset dos campos
      }else{
        this.setState( {msg: "Novo Título não incluído. Favor verificar os dados inseridos.",msg_class: "label-danger" });
      }
    },

    // Carrega o datatable.js após renderização do componente tabela
    componentDidMount: function(){
    	var self = this;
   		$('#tabela_titulos_certificados').dataTable({
        responsive: true, processing: true, destroy: true,
        paging: true, pageLength: 3, deferLoading: 1000,
        searching: false, dom: 'Bfrtip', "bSort": true,
        "fnDrawCallback": function() {
              	self.forceUpdate();
            },
  		});

 	  },

    render: function() {
      return (
          <div>
            <br/>
            <TitulosCertificacoesNovoTitulo
              visivel={this.state.novoTitulo_Visivel}
              toggle_exibe_novo_titulo={this.toggle_form_novo_titulo.bind(this)}
              inclui_novo_titulo={this.inclui_titulo.bind(this)}
            />
            <br/>
            <Mensagem msg={this.state.msg} msg_class={this.state.msg_class} />
            <br/>
            <TitulosCertificacoesTabela
              dados_tabela={this.state.listaTitulosCertificados}
              exclui_titulo_lista={this.exclui_titulo.bind(this)} />
          </div>
        );
    }
  });

  return TitulosCertificacoes;
});

define('componenteLinksUteis', ['react'], function (React) {

  var LinksUteis = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <li className="media">
              <a className="pull-left" href={this.props.dados[i].elo} target="_blank">
               <img className="media-object img-circle" src={this.props.dados[i].imagem} height="64" width="64"></img></a>
              <div className="media-body">
                  <h4 className="media-heading">
                   <a className="btn-link" href={this.props.dados[i].elo} target="_blank">
                    {this.props.dados[i].titulo}</a>
                    <img className="imgLinkExterno" src="img/site-ext.gif" width="17" height="11" alt="Site Externo." title="Site Externo."></img>
                    </h4>
                  <div dangerouslySetInnerHTML={{__html: this.props.dados[i].desc}}></div>
              </div>
          </li>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div className="col-md-12">
         <h4 className="h4-texto">Relação de links úteis</h4>
         <ul className="media-list">{this.renderListItems()}
         </ul>
        </div>
       );
    }
  });

  return LinksUteis;
});

define('componenteGlossario', ['react'], function (React) {

  var Glossario = React.createClass({
    renderListItems: function(){
      var items=[];
      for (var i=0; i<this.props.dados.length; i++){
        items.push(
          <li className="media glossario">
              <div className="media-left">
                <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{this.props.dados[i].topico}</h4>
                <p>{this.props.dados[i].desc}</p>
              </div>
          </li>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div className="col-md-12">
          <ul className="media-list">{this.renderListItems()}
         </ul>
        </div>
       );
    }
  });

  return Glossario;
});

define('componenteAccordion', ['react'], function (React) {

  var accordion = React.createClass({

    renderListParagrafo: function(i){
      var paragrafos=[];
      for (var j=0; j<this.props.dados[i].desc.length; j++){
          paragrafos.push(
            <p>{this.props.dados[i].desc[j]}</p>
          );
      }
      return paragrafos;
    },
    renderListItems: function(){
      var items=[];
      var style = {float: 'right'};
      for (var i=0; i<this.props.dados.length; i++){
        var heading = "heading_"+i;
        var idColapse= "collapse_"+i;
        items.push(
          <div className="panel panel-default">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#"+idColapse} aria-expanded="true" aria-controls={"#"+idColapse}>
              <div className="panel-heading" role="tab" id={heading}>
                <h4 className="panel-title"><b>{this.props.dados[i].topico}</b><span className="glyphicon glyphicon-plus" style={style} aria-hidden="true"></span></h4>
              </div>
            </a>
            <div id={idColapse} className="panel-collapse collapse" role="tabpanel" aria-labelledby={heading}>
              <div className="panel-body">{this.renderListParagrafo(i)}</div>
            </div>
          </div>
        );
      }
      return items;
    },
    render: function() {
      return (
        <div className="col-md-12">
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">{this.renderListItems()}</div>
        </div>
       );
    }
  });

  return accordion;
});


define('componenteDropdown', ['react'], function (React) {
  var Dropdown = React.createClass({
    getInitialState:function(){
      //console.log(this.props);
        return {selectValue:this.props.list[0]};
    },
    handleChange: function(e){
      this.setState({selectValue: e.target.value});
    },
    renderListItems: function () {
      var items = [];
      items.push(<option value={-1} selected>Selecione uma opção...</option>);
      for(var i=0; i<this.props.list.length; i++){
        var val = this.props.list[i];
        if (val == this.props.selected) {
          items.push(<option value={val} selected>{val}</option>);
        } else {
          items.push(<option value={val}>{val}</option>);
        }
      }
      return items;
    },
      render: function() {
          return (
            <div>
             <select id={this.props.id} className="form-control">
                {this.renderListItems()}
              </select>
            </div>
          );
      }
  });

  return Dropdown;
});

define('componenteDropdownDual', ['react'], function (React) {
  var DropdownDual = React.createClass({
    getInitialState:function(){
      return {selectValue:this.props.list[0].valor};
    },
    handleChange: function(e){
      this.setState({selectValue: e.target.value});
    },
    renderListItems: function () {
      var items = [];
      items.push(<option value={-1} selected>Selecione uma opção...</option>);
      for(var i=0; i<this.props.list.length; i++){
        var val = this.props.list[i].valor;
        var text = this.props.list[i].texto;
        if (val === this.props.selected) {
          items.push(<option value={val} selected>{text}</option>);
        } else {
          items.push(<option value={val}>{text}</option>);
        }
      }
      return items;
    },
      render: function() {
          return (
            <div>
             <select id={this.props.id} className="form-control">
                {this.renderListItems()}
              </select>
            </div>
          );
      }
  });

  return DropdownDual;
});

define('componenteCheckbox', ['react'], function (React) {
  var Checkbox = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var selecionados = this.props.selected ? this.props.selected : null;

      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        item.selected = null;
        var inputElement;
        var checkboxElement;
        if(selecionados){
          for (var j = 0; j < selecionados.length; j++) {
            if(item.tx_nome_subarea_atuacao === selecionados[j].tx_nome_subarea_atuacao){
              item.selected = "checked";
            }
          }
        } else {
          if(item.checked){
            item.selected = "checked";
          }
        }
        checkboxElement =
        <div className="input-box checkbox">
          <label>
            <input type="checkbox" value={item.value} defaultChecked={item.selected}>
            </input>
            {item.label}
          </label>
        </div>
        itens.push(
          checkboxElement
        );
      }
      return itens;
    },


      render: function() {
          return (
            <div className="checkbox">{this.renderListItems()}</div>
          );
      }
  });

  return Checkbox;
});


define('componenteCheckboxProjeto', ['react'], function (React) {
  var Checkbox = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];

      for (var i = 0; i < dados.options.length; i++) {
        var item = dados.options[i];
        var selected = false;
        var checkboxElement;
        if(dados.content != null){
          for (var j = 0; j < dados.content.length; j++) {
              console.log(item, dados.content[j].tx_nome_origem_fonte_recursos_projeto);
              //normalize() está sendo usado para evitar problemas na comparação das strings
            if(item == dados.content[j].tx_nome_tipo_parceria || item.normalize() == dados.content[j].tx_nome_origem_fonte_recursos_projeto.normalize()){
                console.log(item, 'encontrado');
              selected = true;
            }
            else if( contains("financeiros",dados.content[j].tx_nome_tipo_parceria) && contains("financeiros",item) ){
              selected = true;
            }
          }
        }

        checkboxElement =
          <label>
            <input type="checkbox" value={item} defaultChecked={selected}></input>
          {item}
          </label>
        itens.push(
          checkboxElement
        );
      }
      return itens;
    },


      render: function() {
          return (
            <div className="checkbox">{this.renderListItems()}</div>
          );
      }
  });

  return Checkbox;
});

define('componenteFormItem', ['react','componenteDropdown', 'componenteDropdownDual','componenteCheckbox'], function (React, Dropdown, DropdownDual, Checkbox) {
  var FormItem = React.createClass({
    renderListItems: function(){
      var items=[];
      if(this.props.header){
        var HeaderElement = `h${this.props.header.priority}`;
        if(this.props.header.text == "Dados Gerais" || this.props.header.text == "Áreas e Subáreas de Atuação da OSC" || this.props.header.text == "Descrição da OSC" || this.props.header.text == "Títulos e Certificações"){
          items.push(<HeaderElement>{this.props.header.text}<a className='btn-item ajuda' type='button' title={'Clique para informações sobre os campos de ' + this.props.header.text} data={this.props.header.text}><span className='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></HeaderElement>);
        }else{
          items.push(<HeaderElement>{this.props.header.text}</HeaderElement>);
        }
      }
      for (var i=0; i<this.props.dados.length; i++){
        var item = this.props.dados[i];
        var placeholder = item.placeholder;

        var content = item.content;
        if(((content == null) || (content === "")) && (item.placeholder != undefined)){
          placeholder = item.placeholder;
          content = "";
        }
        if((item.id === undefined) || (item.id === null)){
          item.id = "";
        }
        var titleSpanFonte = "Informação preenchida pela Organização";
        var SpanFonte = <span className="fonte-de-dados dado-organizacao" title={titleSpanFonte}><img className="imgDadoEditavel" src="img/dado_representante.png"></img></span>
        if(item.fonte != 'Representante' &&  item.fonte != 'Representante de OSC' && item.fonte != null && item.fonte != false){
          //console.log(item);
          titleSpanFonte = "informação oficial. Fonte " + item.fonte;
          SpanFonte = <span className="fonte-de-dados dado-oficial" title={titleSpanFonte}><img className="imgDadoOficial" src="img/base_dados.png"></img></span>
        }
        else if (item.fonte == false || item.fonte == null) {
            SpanFonte = "";
        }

        var custom_class = "";
        if(item.custom_class){
          custom_class = " "+item.custom_class;
        }
        var ContentElement;
        if(item.type == 'p'){
          ContentElement =
          <div className="input-box">
            <p className="form-control-static" id={item.id}>{content}</p>
            {SpanFonte}
          </div>
        } else if(item.type == 'textarea') {
          if (item.id == "tx_resumo_osc"){
           //console.log(item.id);
           ContentElement =
            <div className="input-box">
              <textarea maxLength="500" className="form-control" id={item.id}
              placeholder={placeholder} defaultValue={content}></textarea>
              {SpanFonte}
            </div>
          } else {
          ContentElement =
          <div className="input-box">
            <textarea maxLength="500" className="form-control" id={item.id} placeholder={placeholder} defaultValue={content}></textarea>
            {SpanFonte}
          </div>
          }
        } else if(item.type == 'select'){
          var className = "input-box"+ custom_class;
          ContentElement =
          <div className={className}>
            <Dropdown list={item.options} id={item.id} selected={item.content}></Dropdown>
            {SpanFonte}
          </div>
        } else if(item.id == "tx_endereco_eletronico_sugerido"){
          ContentElement =
          <div className="input-box">
            <input maxLength="100" className="form-control with-pretext" id={item.id} placeholder={placeholder} type={item.type} defaultValue={content}></input>
            <span className="pre-text">{item.pretext}</span>
            {SpanFonte}
          </div>
        } else if(item.type == "checkbox"){
          ContentElement = <Checkbox dados={item}></Checkbox>
        } else if(item.areas){
          var areas = item.areas;
          var subareas = item.subareas;
          var subareas_selected = null;
          var className = "form-control"+custom_class;
          var checkbox_className = "hidden";
          var itensCheckBox = [];
          for (var j = 0; j < areas.length; j++) {
            if(item.content === areas[j].tx_nome_area_atuacao){
              checkbox_className = "";
              subareas_selected = item.subareas_selected;
            } else {
              checkbox_className = "hidden";
              subareas_selected = null;
            }
            var subset = [];
            var cd_area = areas[j].cd_area_atuacao;
            for (var k = 0; k < subareas.length; k++) {
              if(cd_area == subareas[k].cd_area_atuacao){
                subset.push(subareas[k]);
              }
            }
            itensCheckBox.push(<div id = {"subareas-"+cd_area} className={checkbox_className}><Checkbox dados={subset} selected={subareas_selected}></Checkbox></div>)
          }

          ContentElement =
          <div className="input-box">
            <input maxLength="200" className={className}  id={item.id} placeholder={placeholder} type={item.type} defaultValue={content}></input>
            {SpanFonte}
            <div className="checkboxList">{itensCheckBox}</div>
          </div>
        } else if (item.type == 'tel'){
         ContentElement =
         <div id={item.id} className="input-box">
           <input maxLength="50" id={item.id} type="tel" className="form-control" placeholder={placeholder} defaultValue={content}></input>
           {SpanFonte}
         </div>
       } else {
          if(item.id.toString().substring(0,2) === "dt"){
            if(item.label.substring(0,3) === "Ano"){
              custom_class += " ano";
            } else {
              custom_class += " date";
            }
          }
          var className = "form-control "+custom_class;
          ContentElement =
          <div className="input-box">
            <input maxLength="100" className={className}  id={item.id} placeholder={placeholder} type={item.type} defaultValue={content}></input>
            {SpanFonte}
          </div>
        }
        var labelElement;

        if(item.label){
          var obrigatorio="";//console.log(item.label);console.log(item.header);
          if(item.obrigatorio){
            obrigatorio = <span className="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span>;
          }
          labelElement = <label className="control-label" for={item.id}>{item.label}: {obrigatorio}</label>
          /*if(item.id=="tx_endereco_eletronico_sugerido"){
            labelElement = <label className="control-label" for={item.id} title="Defina um nome que vai constar como link para esta página da OSC , que poderá divulgá-lo como endereço oficial do Mapa">{item.label}:</label>
          }*/
          //if(item.id=="estadual") {
          if(contains("estadual",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="As parcerias voluntárias entre a administração pública do nível estadual e as organizações civis.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id=="federal") {
          if(contains("federal",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="As parcerias voluntárias entre a administração pública do nível federal e as organizações civis.">
            Transferências federais recebidas pela OSC: 
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id=="municipal") {
          if(contains("municipal",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="As parcerias voluntárias entre a administração pública do nível municipal e as organizações civis.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==16/*"empresas_publicas"*/) {
          if(contains("Empresas públicas",item.label)) {
            labelElement = <label className="control-label" /*for={item.id}*/ title="Empresa pública é pessoa jurídica de direito privado, constituída por capital exclusivamente público e podendo ser constituída em qualquer uma das modalidades empresariais. Sociedade de economia mista é pessoa jurídica de direito privado, constituída por capital público e privado. A parte do capital público deve ser maior, pois a maioria das ações deve estar sob o controle do Poder Público.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          /*
          if(item.id=="recursos_privados-2016"){
            console.log(item.id);
            labelElement = <label className="control-label" for={item.id} title="Indique se houve recursos captados de fontes privadas">{item.label}:</label>
          }*/
          //if(item.id==33/*"oscs_brasileiras"*/) {
          if(contains("OSCs brasileiras",item.label)) {
            labelElement = <label className="control-label" /*for={item.id}*/ title="As diferentes formas de parcerias formais ou informais com outras OSCs (fundações privadas ou associações privadas) brasileiras, com a exceção de organizações religiosas.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==34/*"oscs_estrangeiras"*/){
          if(contains("OSCs estrangeiras",item.label)) {
            labelElement = <label className="control-label" /*for={item.id}*/ title="As diferentes formas de parcerias formais ou informais com outras OSCs (fundações privadas ou associações privadas) estrangeiras, com a exceção de organizações religiosas.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==35/*"religiosas_brasileiras"*/){
          if(contains("religiosas brasileiras",item.label)) {
            labelElement = <label className="control-label" /*for={item.id}*/ title="As diferentes formas de parcerias formais ou informais com OSCs que sejam organizações religiosas brasileiras.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==36/*"religiosas_estrangeiras"*/){
          if(contains("religiosas estrangeiras",item.label)) {
            labelElement = <label className="control-label" /*for={item.id}*/ title="As diferentes formas de parcerias formais ou informais com OSCs que sejam organizações religiosas estrangeiras.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==37/*"empresas_brasileiras"*/){
          if(contains("Empresas privadas brasileiras",item.label)) {
            labelElement = <label className="control-label" /*for={item.id}*/ title="As diferentes formas de parcerias com empresas privadas brasileiras por meio das quais as empresas cedem os recursos necessários (físicos, financeiros e/ou humanos) para a execução de um determinado projeto.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==38/*"empresas_estrangeiras"*/){
          if(contains("Empresas estrangeiras",item.label)) {
            labelElement = <label className="control-label" for={item.id} title="As diferentes formas de parcerias com empresas privadas estrangeiras por meio das quais as empresas cedem os recursos necessários (físicos, financeiros e/ou humanos) para a execução de um determinado projeto.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==15/*"estrangeiros"*/){
          if(contains("estrangeiros",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Acordos de cooperação podem ser firmados com governos estrangeiros em diversos campos de atividades, não havendo nenhum tipo de repasse financeiro.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==13/*"multilaterais"*/){
          if(contains("multilaterais",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Acordos de cooperação podem ser firmados com organizações multilaterais em diversos campos de atividades, não havendo nenhum tipo de repasse financeiro. Exemplos de organizações multilaterais são as Nações Unidas, o Banco Mundial e o Banco Interamericano de Desenvolvimento.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==29/*"premios"*/){
          if(contains("Prêmios",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Prêmios recebidos na forma de bens ou valores monetários pela OSC como reconhecimento de quaisquer méritos da organização.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==40/*"doacoes_pf"*/){
          if(contains("pessoa física",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Doações recebidas de indivíduos.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==39/*"doacoes_pj"*/){
          if(contains("pessoa jurídica",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Doações recebidas de empresas, associações, órgãos públicos, igrejas ou outros tipos de organizações.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==41/*"doacoes_servicos"*/){
            if(contains("com Nota Fiscal",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="As doações recebidas pela OSC na forma de produtos ou serviços com nota fiscal podem ser contabilizadas pelo valor da nota fiscal.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==42/*"voluntariado"*/){
          if(contains("Voluntariado",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="O voluntário é o indivíduo que dedica parte de seu tempo à realização de atividades não remuneradas de diversos tipos.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==46/*"doacoes_recebidas"*/){
          if(contains("sem Nota Fiscal",item.label)) {
            labelElement = <label className="control-label" for={item.header} title="Doações recebidas pela OSC na forma de produtos ou serviços sem nota fiscal.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==26/*"patrimoniais"*/){
          if(contains("fundos patrimoniais",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Fundos patrimoniais são estruturas que oferecem sustentabilidade financeira a uma organização sem fins lucrativos.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==27/*"reservas"*/){
          if(contains("contas correntes",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Os fundos de reserva são frequentemente usados pelas organizações no atendimento emergencial de despesas ordinárias do dia a dia da entidade.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==28/*"mensalidades"*/){
          if(contains("Mensalidades",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Contribuição financeira para a sustentabilidade da organização, seja periodicamente (por meio de mensalidades ou anuidades, por exemplo) ou de outro modo.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==30/*"venda"*/){
          if(contains("Venda de produtos",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Esta é uma das formas de captação mais utilizadas pelas organizações, já que os produtos podem ser confeccionados pela própria instituição.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==31/*"servicos"*/){
          if(contains("Prestação de serviços",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Atividades realizadas por uma organização com o fim de atendimento do beneficiário de ações sociais pode retornar dividendos para a entidade.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==/*"bens"*/){
          if(item.label=="Venda de bens e direitos"){
            labelElement = <label className="control-label" /*for={item.header}*/ title="Cessão onerosa da marca associada a uma organização civil para empresas privadas que, em troca, pagam royalties ou direitos autorais.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==43/*"isencoes"*/){
          if(item.label=="Isenções"){
            labelElement = <label className="control-label" /*for={item.header}*/ title="A isenção fiscal é a dispensa de tributo por meio de lei realizada pelo ente federativo competente para institui-lo.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==44/*"imunidades"*/){
          if(item.label=="Imunidades"){
            labelElement = <label className="control-label" /*for={item.header}*/ title="A imunidade é uma limitação constitucional ao poder de tributar, ou seja, nega ao Estado o poder de tributar pessoas ou organizações definidas como imunes.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
          //if(item.id==45/*"bens_recebidos"*/){
          if(contains("Bens recebidos",item.label)) {
            labelElement = <label className="control-label" /*for={item.header}*/ title="Bens cedidos por um doador a um donatário, de modo que este fica obrigado a manter e cuidar dos bens doados, sem que tenha, no entanto, direito pleno ao bem, mas apenas direito de uso em relação a ele.">{item.label}:
            <span className='glyphicon glyphicon-info-sign' aria-hidden='true'></span></label>
          }
        }
        var className = "form-group";
        if (item.hide){
          className += " hidden";
        }
        items.push(
          <div className={className}>
            {labelElement}
            {ContentElement}
          </div>
        );
      }
    //  item.push(</form>);
      return items;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return FormItem;
});

define('componenteSection', ['react'], function (React) {
  var Section = React.createClass({
    renderListItems: function(){
      var ano = this.props.ano;
      if(ano === undefined){
        ano = "";
      } else {
        ano = "-"+ano;
      }
      var dados = this.props.dados;
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var HeaderElement = `h${item.priority}`;

        var ButtonElement;
        var containerClass = "";
        if(item.add_element){
          ButtonElement = <button className="btn-primary btn">Adicionar Projeto</button>
        }
        if(item.container_class){
          containerClass = item.container_class;
        }
        if (item.text == "Fontes de recursos anuais da OSC" || item.text =="Espaços de Participação Social" || item.text == "Relações de Trabalho e Governança" || item.text =="Projetos, atividades e programas - PAP") {
          itens.push(
            <div>
              <div className={containerClass}>
                <HeaderElement>{item.text}<a className='btn-item ajuda' type='button' title={'Clique para informações sobre os campos de ' + item.text} data={item.text}><span className='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></HeaderElement>
                {ButtonElement}
              </div>
              <div id={item.id+ano}></div>
            </div>
          );
        }
        else{
        itens.push(
          <div>
            <div className={containerClass}>
              <HeaderElement>{item.text}</HeaderElement>
              {ButtonElement}
            </div>
            <div id={item.id+ano}></div>
          </div>
        );
      }

      }

      return itens;
    },


      render: function() {
          return (
            <div className="sections">{this.renderListItems()}</div>
          );
      }
  });

  return Section;
});

define('componenteAgrupador', ['react', 'componenteFormItem'], function (React, FormItem) {
  var Agrupador = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var group = [];
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var num = i+1;
        group.push(item);
        if(num == dados.length){
          itens.push(
            <div className="dirigente">
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 2 == 0)){
          itens.push(
            <div className="dirigente">
              <FormItem dados={group}></FormItem>
              <button className="btn-danger btn">Remover</button>
              <hr/>
            </div>
          )
          group = [];
        }
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }

      //items.push(<HeaderElement>{this.props.header.text}<a className='btn-item ajuda' type='button' title={'Clique para informações sobre os campos de ' + this.props.header.text} data={this.props.header.text}><span className='glyphicon glyphicon-question-sign' aria-hidden='true'></span></a></HeaderElement>);

  });

  return Agrupador;
});

define('componenteAgrupadorConferencia', ['react', 'componenteFormItem'], function (React, FormItem) {
  var AgrupadorConferencia = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var group = [];
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var num = i+1;
        group.push(item);
        if(num == dados.length){
          itens.push(
            <div className="conferencia">
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 4 == 0)){
          itens.push(
            <div className="conferencia">
              <FormItem dados={group}></FormItem>
              <button className="btn-danger btn">Remover</button>
              <hr/>
            </div>
          )
          group = [];
        }
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return AgrupadorConferencia;
});

define('componenteAgrupadorConselhos', ['react', 'componenteFormItem'], function (React, FormItem) {
  var Agrupador = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var group = [];
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var num = i+1;
        group.push(item);
        if(num == dados.length){
          itens.push(
            <div className="conselho">
              <FormItem dados={group}></FormItem>
              <button className="btn-primary btn">Adicionar</button>
              <hr/>
            </div>
          )
          group = [];
        } else if((num % 7 == 0)){
          itens.push(
            <div className="conselho">
              <FormItem dados={group}></FormItem>
              <button className="btn-danger btn">Remover</button>
              <hr/>
            </div>
          )
          group = [];
        }
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return Agrupador;
});

define('componenteFormItemButtons', ['react', 'componenteFormItem'], function (React, FormItem) {
  var FormItemButtons = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var ButtonElement;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        if(item.default){
          ButtonElement = <button className="btn-primary btn">Adicionar</button>
        } else {
          ButtonElement = <button className="btn-danger btn">Remover</button>
        }
        itens.push(
          <div>
            <FormItem dados={[item]}></FormItem>
            {ButtonElement}
            <hr/>
          </div>
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return FormItemButtons;
});

define('componenteFormItemProjeto', ['react', 'componenteFormItemButtons'], function (React, FormItemButtons) {
  var FormItemProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;

      var ButtonElement;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var className = item.className;
        var label = item.label;
        var inputType = item.type;
        var value = item.value;
        var buttonValue = item.buttonValue;
        var buttonType = item.buttonType;
        var type = item.type;

        if(buttonType == "add"){
          ButtonElement = <button className="btn-primary btn">Adicionar</button>
        }
        if(buttonType == "remove") {
          ButtonElement = <button className="btn-danger btn">Remover</button>
        }
        itens.push(
          <div>
            <div className="header">{label}</div>
            <div className="form-group">
              <FormItemButtons dados={[item]}></FormItemButtons>
              {ButtonElement}
            </div>
          </div>
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return FormItemProjeto;
});

define('componenteFormButtonProjeto', ['react'], function (React) {
  var FormButtonProjeto = React.createClass({
    getContainerClass: function(){
      if(this.props.inline){
        return "input-group-btn";
      }
      return "";
    },
    renderListItems: function(){
      var dados = this.props.dados;
      var ButtonElement;
      var itens = [];
      if(dados){
        for (var i = 0; i < dados.length; i++) {
          var item = dados[i];
          var type = item.type;
          var value = item.value;

          if(type == "add"){
            if(value === undefined){
              value = "Adicionar";
            }
            ButtonElement = <button className="btn-primary btn">{value}</button>
          }
          if(type == "remove") {
            if(value === undefined){
              value = "Remover";
            }
            ButtonElement = <button className="btn-danger btn">{value}</button>
          }
          itens.push(
            ButtonElement
          )
        }
      }
      return itens;
    },

      render: function() {
          return (
            <span className={this.getContainerClass()}>{this.renderListItems()}</span>
          );
      }
  });

  return FormButtonProjeto;
});

define('componenteFormInputProjeto', ['react', 'componenteFormButtonProjeto', 'componenteDropdown','componenteCheckboxProjeto'], function (React, FormButtonProjeto, Dropdown, Checkbox) {
  var FormInputProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var id = item.id;
        var removable = item.removable;
        var content = item.content;
        var buttons = item.buttons;
        var inline = item.buttonsInLine;
        var type = item.type;
        var options = item.options;
        var placeholder = item.placeholder;
        var codigo = item.cd ? item.cd : null;
        if(content === undefined || content === null ){
          content = "";
        }

        var InputElement = null;

        if(type == 'select'){
          InputElement =
            <div id={id}>
              <Dropdown list={options} selected={content}></Dropdown>
            </div>
            ;
            if ( (item.fonte != 'Representante' && item.fonte != 'Representante de OSC' && item.fonte != null && item.fonte != "") && (id === "tx_nome_status_projeto") /*&& (content)*/ ) {
              InputElement =
              <div id={id}>
                <span className="form-control">{content}</span>
              </div>
            }
        }
        else if (type == 'textarea'){
          InputElement =
          <div id={id}>
            <textarea maxLength="500" className="form-control" defaultValue={content} placeholder={placeholder}></textarea>
          </div>
          ;
          if ( (item.fonte != 'Representante' && item.fonte != 'Representante de OSC' && item.fonte != null && item.fonte != "") && (id === "tx_descricao_projeto") /*&& (content)*/ ){
            InputElement =
            <div id={id}>
              <textarea maxLength="500" className="form-control" defaultValue={content} disabled></textarea>
            </div>
          }

          /*  $("#recursos_publicos-"+ano).find('input').mask('000.000.000.000.000,00', {reverse: true});
            $("#recursos_publicos-"+ano).find('input').addClass('with-pretext');
            $("#recursos_publicos-"+ano).find('.input-box').prepend('<span class="pretext">R$</span>');*/
        }
        else if (type == 'checkbox'){

          InputElement =
          <div className="input-box checkbox">
            <Checkbox dados={item}></Checkbox>
          </div>

        }
        else {
          var class_string = "form-control ";
          if(id.substring(0,2) === "dt"){
            codigo = id;
            if(id.substring(3,6) === "Ano"){
              class_string += "ano";
            } else {
              class_string += "date";
            }
          }
          InputElement =
            <div id={id}>
              <input maxLength="100" className={class_string} defaultValue={content} placeholder={placeholder}></input>
            </div>
            ;
            if ( (item.fonte) && ( (id !="tx_link_projeto") && (id !="nr_total_beneficiarios") ) ) {
              if (item.fonte != 'Representante' && item.fonte != "Representante de OSC" && item.fonte != null && item.fonte != ""){
              InputElement =
                <div id={id}>
                  <span className="form-control">{content}</span>
                </div>
              }
          }
        }

        if(removable){
          InputElement =
            <div id={id} className="input-group" >
              {InputElement}
              <FormButtonProjeto dados={buttons} inline={inline}></FormButtonProjeto>
            </div>
        }
        itens.push(
          InputElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div id={this.props.dados[0] ? this.props.dados[0].id : "-1"} className="form-group">{this.renderListItems()}</div>
          );
      }
  });

  return FormInputProjeto;
});

define('componenteAgrupadorInputProjeto', ['react', 'componenteFormInputProjeto', 'componenteFormButtonProjeto'], function (React, FormInputProjeto, FormButtonProjeto) {
  var AgrupadorInputProjeto = React.createClass({

    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];
      for (var i = 0; i < dados.length; i++) {

        var item = dados[i];
        var header = item.header;
        var inputs = item.inputs;
        var containerClass = item.containerClass;
        var buttons = item.buttons;
        var infoTitle = item.infoTitle;

        var ButtonElement;
        var className;
        var src;
        var ContainerElement;

        var iconVisivel = 'hidden';

        if(buttons !== undefined || null){
          ButtonElement =
            <FormButtonProjeto dados={buttons}></FormButtonProjeto>
        } else {
          ButtonElement = null;
        }
        if(header === undefined){
          header = "";
        }

        if(inputs[0].fonte === "Representante de OSC" || (inputs[0].fonte != null && inputs[0].fonte != undefined && inputs[0].fonte.length > 0)){
          className = "imgDadoEditavel";
          src = "img/dado_representante.png";
        }
        else if((inputs[0].fonte === null) || (inputs[0].fonte === undefined) || inputs[0].fonte.length == 0){
          className = "";
          src = "";
        }
        else {
          className = "imgDadoOficial";
          src = "img/base_dados.png";
        }

        if(infoTitle != ""){
          iconVisivel = 'visible';
        }

        var fonte = item.inputs[0].fonte;
        //TO DO fonte tipo_parceria e fonte_recursos mudar versao 2.7
        if ((fonte == "Representante de OSC") || (fonte != null && fonte != undefined && fonte.length > 0)) {
            ContainerElement =
            <div className={containerClass}>
              <div className="header" title={infoTitle}>{header}
              <span className="glyphicon glyphicon-info-sign" style={{visibility:iconVisivel}}></span>
              <span><img title="Informação preenchida pela organização" className={className} src={src}></img></span></div>
              <FormInputProjeto dados={inputs}></FormInputProjeto>
              {ButtonElement}
            </div>
        }
        else if ((fonte == null) || (fonte == undefined) || fonte.length == 0 ) {
            ContainerElement =
            <div className={containerClass}>
              <div className="header" title={infoTitle}>{header}
              <span className="glyphicon glyphicon-info-sign" style={{visibility:iconVisivel}}></span></div>
              <FormInputProjeto dados={inputs}></FormInputProjeto>
              {ButtonElement}
            </div>
        }
        else{
            ContainerElement =
            <div className={containerClass}>
              <div className="header" title={infoTitle}>{header}
              <span className="glyphicon glyphicon-info-sign" style={{visibility:iconVisivel}}></span>
              <span><img title={"informação oficial. fonte: "+fonte} className={className} src={src}></img></span>
              </div>
              <FormInputProjeto dados={inputs}></FormInputProjeto>
              {ButtonElement}
            </div>
        }

        itens.push(
          ContainerElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return AgrupadorInputProjeto;
});

define('componenteColunaProjeto', ['react', 'componenteAgrupadorInputProjeto'], function (React, AgrupadorInputProjeto) {
  var ColunaProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var containerClass = dados[i].containerClass;
        var agrupadores = item.agrupadores;
        var ContainerElement =
          <div className={containerClass}>
            <AgrupadorInputProjeto dados={agrupadores}></AgrupadorInputProjeto>
          </div>

        itens.push(
          ContainerElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return ColunaProjeto;
});

define('componenteLinhaProjeto', ['react', 'componenteColunaProjeto'], function (React, ColunaProjeto) {
  var LinhaProjeto = React.createClass({
    renderListItems: function(){
      var dados = this.props.dados;
      var itens = [];

      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        var colunas = item.colunas;
        var LinhaElement =
            <div className="row no-gutter-bordered">
              <ColunaProjeto dados={colunas}></ColunaProjeto>
            </div>

        itens.push(
          LinhaElement
        )
      }

      return itens;
    },


      render: function() {
          return (
            <div>{this.renderListItems()}</div>
          );
      }
  });

  return LinhaProjeto;
});

/*define('componenteLink', ['react'], function (React) {
  var Link = React.createClass({
    var items = [];
    var aObj = this.props.a;
    renderList: function(){
      for(var i=0; i<aObj.length; i++){
        items.push(<a id=aObj.id href=aObj.src>aObj.text</a>);
      }
    },
    render: function(){
      return (<div>{this.renderList()}</div>);
    }
  });
});*/
function contains( substring, string ) {
  if (typeof string === 'string'){
    return string.indexOf(substring)>=0;
  } else {
    return false;
  }
}
