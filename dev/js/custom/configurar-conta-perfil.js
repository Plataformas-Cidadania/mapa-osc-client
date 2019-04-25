require(["jquery-ui"], function(React) {

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

    jQuery(document).ready(function($) {
        $(".scroll").click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
       });
    });

    $(".captcha iframe").attr('title', '');

});

require(['react', 'jsx!components/Util'], function(React) {

    //carregar dependendias e outras funcoes definidas
    require(["jquery-ui", "rotas", 'jquery', 'libs/jquery-mask/jquery.mask.min'], function(React) {

        var user = window.localStorage.getItem('User');
        var auth  = window.localStorage.getItem('Authorization');

        var newJson = {};
        var authHeader = {
          "User": user,
          "Authorization": auth
        };
        newJson['headers'] = authHeader;

        var $id_osc = '';
        var rotas = new Rotas();
        var $modal = $('#modalMensagem');

        $.ajax({
            url: rotas.ValidarUsuarioPerfil(user),
            type: 'GET',
            dataType: "json",
            data: newJson,
            success: function(data) {
              $('#tx_nome_representante').val(data.tx_nome_usuario);
              $('#tx_email').val(data.tx_email_usuario);
              $('#tx_cpf').text(data.nr_cpf_usuario);
              $('#tx_orgao_trabalha').val(data.tx_orgao_trabalha);
              $('#tx_telefone1').val(data.tx_telefone_1);
              $('#tx_telefone2').val(data.tx_telefone_2);
              $('#tx_registro_institucional').val(data.tx_dado_institucional);
              $('#tx_email_confirmacao').text(data.tx_email_confirmacao);
              $('#tx_localidade').text(data.localidade);

              if(data.bo_lista_atualizacao_trimestral){
                $('#pedido_atualizacao_trimestral').prop( "checked", true );
              }else{
                $('#pedido_atualizacao_trimestral').prop( "checked", false );
              }

              if(data.bo_lista_email){
                $('#newsletter').prop( "checked", true );
              }else{
                $('#newsletter').prop( "checked", false );
              }

            },
            error: function(e) {
                $('#modalMensagem').modal({backdrop: 'static', keyboard: false});
                $('#modalTitle').text('Erro');
                $('#modalConteudo').text('É necessário estar logado no sistema para acessar essa página.');
                $('.modal-footer button').on('click', function(){
                  history.go(-1);
                });
                $('#modalMensagem').modal('show');
            }
        });



        $("#tx_nome_representante.form-control").blur(function(event, ui) {
            var nome = this.value;
            var id_attr = '';
            if (validaNome(nome)) {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id");
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id");
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_email.form-control").blur(function(event, ui) {
            var email = this.value.toLowerCase();
            var id_attr = '';
            if (validaEmail(email)) {
                id_attr = "#" + $("#tx_email.form-control").attr("id");
                $("#tx_email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_email.form-control").attr("id");
                $("#tx_email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_senha.form-control").blur(function(event, ui) {
            var senha = this.value;
            if (senha.length >= 6) {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            }
        });

        $("#tx_confirmar_senha.form-control").blur(function(event, ui) {
            var confirmar_senha = this.value;
            var senha = $('#tx_senha').val();
            if (confirmar_senha == senha && confirmar_senha.length >= 6) {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            }
        });

        var SPMaskBehavior = function (val) {
          return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
          onKeyPress: function(val, e, field, options) {
              field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

        $('#tx_telefone1').mask(SPMaskBehavior, spOptions);
        $('#tx_telefone2').mask(SPMaskBehavior, spOptions);

        //inicio btn.btn-success.click
        var div = $(".form-group");
        div.find(".btn.btn-success").on("click", function() {

            //Captcha
            if (grecaptcha.getResponse().length == 0) {
                jQuery("#labelCaptcha").text("Resolver o Captcha.");
                return false;
            } else {
                jQuery("#labelCaptcha").text("");
            }
            var id_attr = '';
            var nome = $('#tx_nome_representante').val();
            var email = $('#tx_email').val().toLowerCase();
            var orgao_trabalha = $('#tx_orgao_trabalha').val();
            var tel1 = $('#tx_telefone1').val();
            var tel2 = $('#tx_telefone2').val();
            var senha = $('#tx_senha').val();
            var confirmar_senha = $('#tx_confirmar_senha').val();
            var registro_institucional = $('#tx_registro_institucional').val();

            var newsletter = false;
            if ($('#newsletter').is(":checked")) {
                newsletter = true;
            } else {
                newsletter = false;
            }

            var pedido_atualizacao_trimestral = false;
            if ($('#pedido_atualizacao_trimestral').is(":checked")) {
                pedido_atualizacao_trimestral = true;
            } else {
                pedido_atualizacao_trimestral = false;
            }

            if (!validaNome(nome)) {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id") + "1";
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
                return false;
            }

            if (!validaEmail(email)) {
                id_attr = "#" + $("#tx_email.form-control").attr("id") + "1";
                $("#tx_email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
                return false;
            }

            if ((senha == "") || (senha != confirmar_senha) || (senha.length < 6)) {
                id_attr = "#" + $("#tx_senha.form-control").attr("id") + "1";
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                id_attr = "#" + $("#tx_confirmar_senha.form-control").attr("id") + "1";
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                jQuery("#modalTitle").text("Problema no cadastro!");
                if(senha.length < 6){
                  jQuery("#modalConteudo").text("Senha deve conter mínimo 6 caracteres.");
                }
                else{
                  jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes.");
                }
                $modal.modal('show');
                return false;
            }

            newJson['id_usuario'] = user;
            newJson["tx_email_usuario"] =  email;
            newJson["tx_senha_usuario"] =  senha;
            newJson["tx_nome_usuario"] =  nome;
            newJson["tx_orgao_usuario"] =  orgao_trabalha;
            newJson["tx_telefone_1"] =  tel1;
            newJson["tx_telefone_2"] =  tel2;
            newJson["bo_lista_email"] =  newsletter;
            newJson["bo_lista_atualizacao_trimestral"] = pedido_atualizacao_trimestral;
            newJson["tx_dado_institucional"] = registro_institucional;

            $.ajax({
                url: rotas.UpdateUsuarioGov(user),
                type: 'POST',
                dataType: "json",
                data: newJson,
                success: function(data) {

                  $('#modalTitle').text('Sucesso');
                  $('#modalConteudo').text('Sua atualização foi realizada com sucesso.');
                  $('#modalMensagem').modal('show');

                  //atualizar nome Usuário e ids das OSCs permetidas para edição.
                  window.localStorage.setItem('Authorization', data.access_token);
                  window.localStorage.setItem('Nome', data.tx_nome_usuario);
                  $(".menuLogado_EM .dropdown-toggle").html('');
                  $(".menuLogado_EM .dropdown-toggle").append(data.tx_nome_usuario);
                  $(".menuLogado_EM .dropdown-toggle").append(" <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>");

                },
                error: function(e) {
                    console.log(e);
                }
            });

        });
        //final  btn.btn-success.click


    }); //final require
});

//FUNCOES DE VALIDACAO
function validaNome(nome) {
    if (nome.length < 5) {
        return false;
    } else {
        return true;
    }
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
        (dominio.lastIndexOf(".") < dominio.length - 1)
      ) {
        return true;
    } else {
        return false;
    }
}

function validaEmailGov(email) {
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
        (dominio.lastIndexOf(".") < dominio.length - 1) &&
        (dominio.indexOf("gov") != -1)
      ) {
        return true;
    } else {
        return false;
    }
}


function getErrorMessage(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    return msg;
}


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

var jsonModalAjuda = {
	"Email de Confirmação":'Email institucional (gov.br) da chefia imediata ou de superior mais próximo que possua email <b>".gov.br"</b>.<br>Caso o Estado ou Município não possua email institucional, informe pelo email mapaosc@ipea.com.br.',
 	"Registro Institucional":"Um registro que comprove a vinculação do representante do Estado ou Município com o ente federativo. Sugere-se utilizar o número de matrícula do servidor ou identificador similar. Não Obrigatório.",
 	"Órgão em que Trabalha":"Informar o setor que trabalha e a Secretaria Estadual ou Municipal à qual está vinculado/a.",
 	"Email":'Email institucional do/a responsável por encaminhar ao Mapa das OSCs o banco de dados com as parcerias entre OSCs e o governo estadual/municipal. Solicitamos, preferencialmente, um contato institucional terminado em <b>".gov.br"</b>.<br>Caso não seja possível, pode-se utilizar o email pessoal para efetuar o cadastro.',
  "Senha":'A senha deve conter no mínimo <b>6</b> caracteres.'
};

function abrirModalAjuda(titulo) {

  var	corpo = jsonModalAjuda[titulo];
  var tituloCompleto = "Ajuda - "+titulo;
  var btn = "<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>";

  acionarModalAjuda(tituloCompleto, corpo, btn);
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
