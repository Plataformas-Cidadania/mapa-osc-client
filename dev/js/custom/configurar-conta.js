require(['jquery-ui'], function (React) {

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
      $(".scroll").click(function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
     });
  });

});


require(['react', 'jsx!components/Util','jquery-ui','rotas','tagsinput'], function (React) {
  require(['componenteFormItem'], function(FormItem){
    function FormItens(id, label, type, obrigatorio){
      this.id = id;
      this.name = id;
      this.label = label;
      this.type = type;
      this.obrigatorio = obrigatorio;
      this.fonte = false;
    }

    //formulario 1
    var hd = 'Dados de Identificação.';
    var id = ['nome','email','senha','confirmarSenha'];
    var label = ['Nome','Email','Senha','Confirmar Senha'];
    var type = ['text','email','password','password'];
    var obrigatorio = [true, true, false, false ];
    var formItens = [];

    for (var j=0; j<id.length; j++){
      formItens.push(new FormItens(id[j], label[j], type[j], obrigatorio[j]));
    }

    //console.log(formItens);

    //formulario 2
    var hd2 = 'Suas Organizações.';
    var id2 = ['nomeEntidade'];
    var label2 = ['CNPJ da Entidade'];
    var type2 = ['text'];
    var obrigatorio2 = [true];
    var formItens2 = [];

    for (var i=0; i<id2.length; i++){
      formItens2.push(new FormItens(id2[i], label2[i], type2[i], obrigatorio2[i]));
    }

    FormItem = React.createFactory(FormItem);
    ReactDOM.render(FormItem({header:hd, dados:formItens}), document.getElementById("form-dados"));
    ReactDOM.render(FormItem({header:hd2, dados:formItens2}), document.getElementById("form-org"));

    validarUsuario();
   });

   var user = window.localStorage.getItem('User');
   var auth  = window.localStorage.getItem('Authorization');

   var authHeader = {
     "User": user,
     "Authorization": auth
   };


   var newJson = {};
   newJson['headers'] = authHeader;

   var $id_osc = '';
   var rotas = new Rotas();
   var limiteAutocomplete = 10;

   $('#tag').tagsinput({
       cancelConfirmKeysOnEmpty: false,
       freeInput: false,
       itemValue: 'id',
       itemText: 'text'
      });

   function validarUsuario(){
       $.ajax({
           url: rotas.ValidarUsuario(user),
           type: 'GET',
           dataType: "json",
           data: newJson,
           success: function(data) {
               //console.log(data);
               $('#nome').val(data.tx_nome_usuario);
               //console.log($('#nome').val());
               $('#email').val(data.tx_email_usuario);

               for (var i = 0; i < data.representacao.length; i++){
                   if(i==0){
                       $('#tags').prepend('<label class="control-label listaOscs">Lista de OSCs: <span class="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span></label>');
                   }
                   $('#tags').removeClass('hide');
                   $('#tag').tagsinput('add', {id: data.representacao[i].id_osc, text: data.representacao[i].tx_nome_osc});
               }
               $("#tags span[data-role=remove]").each(function(){
                   $(this).addClass("tagRemove").prop('title', 'Clique para Remover a OSC do seu Cadastro.');
               });
           },
           error: function(e) {
               console.log(e);
               $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
               $('#modalTitle').text('Erro');
               $('#modalConteudo').text('É necessário estar logado no sistema para acessar essa página.');
               $('.modal-footer button').on('click', function(){
                   history.go(-1);
               });
               $('#modalMensagem').modal('show');
           }
       });
   }



   require(["jquery-ui", "rotas"], function(React) {
       $("#nomeEntidade.form-control").autocomplete({
           minLength: 14,
           source: function(request, response) {
               $.ajax({
                   url: rotas.AutocompleteOSCByCnpj(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete),
                   type: 'GET',
                   dataType: "json",
                   success: function(data) {
                     if (data === null){
                         $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                     }else{
                       $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                     }
                     response($.map(data, function(item) {
                         return {
                             label: item.tx_nome_osc,
                             value: item.tx_nome_osc,
                             id:    item.id_osc
                         };
                     }));
                   },
                   error: function(e) {
                       response([]);
                   }
               });
           },
           select: function(event, ui) {
               $id_osc = ui.item.id;
               $('#tags').removeClass('hide');
               $('#tag').tagsinput('add', {id: ui.item.id, text: ui.item.label});

               $("#tags span[data-role=remove]").each(function(){
                  $(this).addClass("tagRemove").prop('title', 'Clique para Remover a OSC do seu Cadastro.');
               });
           }
       });
     });

     $('#send').on('click', function(){
        var nome = $('#nome').val();
        var email = $('#email').val().toLowerCase();
        var senha = $('#senha').val();
        var confirmarSenha = $('#confirmarSenha').val();
        var tag = $('#tag').val();
        var error = true;

        if(nome === '' || nome === null){
          $("#nome").closest('.form-group').removeClass('has-success').addClass('has-error');
          $("#nome").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Nome não pode está vazio!</span></div>');
        }
        else{
          $("#nome").closest('.form-group').removeClass('has-error').addClass('has-success');
          error = false;
        }
        if(!validaEmail(email)){
          $("#email").closest('.form-group').removeClass('has-success').addClass('has-error');
          $("#email").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Email não pode está vazio!</span></div>');
          error = true;
        }
        else{
          $("#email").closest('.form-group').removeClass('has-error').addClass('has-success');
          if(error){
            error = true;
          }
          else {
            error = false;
          }
        }

        if(senha !== '' ){
          if(senha.length > 5 ){
            if (confirmarSenha === senha)
            {
                $("#senha").closest('.form-group').removeClass('has-error').addClass('has-success');
                $("#confirmarSenha").closest('.form-group').removeClass('has-error').addClass('has-success');
                if(error){
                  error = true;
                }
                else {
                  error = false;
                }
            } else {
                $("#senha").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Confirmar senha tem que ser igual senha!</span></div>');
                error = true;
            }
          }else {
            error = true;
            $("#senha").closest('.form-group').removeClass('has-success').addClass('has-error');
            $("#confirmarSenha").closest('.form-group').removeClass('has-success').addClass('has-error');
            $("#senha").closest('.form-group').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Senha é Menor que 6 Caracteres!</span></div>');
          }
        }

        if(tag === '' || tag === null){
          $("#tag").closest('#tags').append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: É necessário ter pelo menos uma OSC!</span></div>');
          error = true;
        }
        else{
          if(error){
            error = true;
          }
          else {
            error = false;
          }
        }

        if(!error){
          newJson['tx_nome_usuario'] = nome;
          newJson['tx_email_usuario'] = email;
          if(senha !== '' && senha !== null && senha.length > 5)
            newJson['tx_senha_usuario'] = senha;
          var tags = tag.split(',');
          var tagValue = [];
          for (var i = 0; i < tags.length; i++){
             tagValue.push({'id_osc':tags[i]});
          }

          newJson['representacao'] = tagValue;
          newJson['id_usuario'] = user;

          $.ajax({
              url: rotas.UpdateUsuario(user),
              type: 'POST',
              dataType: "json",
              data: newJson,
              success: function(data) {

                $('#modalTitle').text('Sucesso');
                $('#modalConteudo').text('Sua atualização foi realizada com sucesso.');
                $('#modalMensagem').modal('show');

                //atualizar nome Usuário e ids das OSCs permetidas para edição.
                window.localStorage.setItem('Authorization', data.access_token);
                window.localStorage.setItem('Osc', data.representacao);
                window.localStorage.setItem('Nome', data.tx_nome_usuario);
                $(".menuLogado .dropdown-toggle").html('');
                $(".menuLogado .dropdown-toggle").append(data.tx_nome_usuario);
                $(".menuLogado .dropdown-toggle").append(" <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>");

              },
              error: function(e) {
                  console.log(e);
              }
          });
        }
     });
});
function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÉÈÊË]/g, "E");
    str = str.replace(/[éèêë]/g, "e");
    str = str.replace(/[ÍÌÎÏ]/g, "I");
    str = str.replace(/[íìîï]/g, "i");
    str = str.replace(/[ÓÒÔÕ]/g, "O");
    str = str.replace(/[óòôõ]/g, "o");
    str = str.replace(/[ÚÙÛÜ]/g, "U");
    str = str.replace(/[úùûü]/g, "u");
    str = str.replace(/[Ç]/g, "C");
    str = str.replace(/[ç]/g, "c");
    return str;
}

function validaEmail(email) {
    var usuario = email.substring(0, email.indexOf("@"));
    var dominio = email.substring(email.indexOf("@") + 1, email.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    } else {
        return false;
    }
}
