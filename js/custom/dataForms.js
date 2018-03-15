"use strict";var _createClass=function(){function a(a,e){for(var o=0;o<e.length;o++){var s=e[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(a,s.key,s)}}return function(e,o,s){return o&&a(e.prototype,o),s&&a(e,s),e}}();function _classCallCheck(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}var DataForms=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"dadosGerais",value:function(a,e){a={form_items:[{id:"tx_nome_fantasia_osc",label:"Nome Fantasia",content:a.tx_nome_fantasia_osc?a.tx_nome_fantasia_osc:null,fonte:a.ft_nome_fantasia_osc?a.ft_nome_fantasia_osc:null,placeholder:"Insira o nome como a OSC é conhecida",type:"text"},{id:"tx_sigla_osc",label:"Sigla da OSC",content:a.tx_sigla_osc?a.tx_sigla_osc:null,fonte:a.ft_sigla_osc?a.ft_sigla_osc:null,placeholder:"Insira aqui a sigla da OSC, se houver",type:"text"},{id:"tx_endereco",label:"Endereço da OSC",content:e||null,fonte:a.ft_endereco?a.ft_endereco:null,type:"p",placeholder:"Insira o endereço da OSC"},{id:"tx_nome_situacao_imovel_osc",label:"Situação do Imóvel",content:a.tx_nome_situacao_imovel_osc?a.tx_nome_situacao_imovel_osc:null,fonte:a.ft_situacao_imovel_osc?a.ft_situacao_imovel_osc:null,type:"select",options:["Próprio","Alugado","Cedido","Comodato"]},{id:"tx_nome_responsavel_legal",label:"Responsável Legal",content:a.tx_nome_responsavel_legal?a.tx_nome_responsavel_legal:null,fonte:a.ft_nome_responsavel_legal?a.ft_nome_responsavel_legal:null,placeholder:"Insira o nome do responsável legal pela OSC",type:"text"},{id:"dt_ano_cadastro_cnpj",label:"Ano de inscrição no Cadastro de CNPJ",content:a.dt_ano_cadastro_cnpj?a.dt_ano_cadastro_cnpj.substring(6):null,fonte:a.ft_ano_cadastro_cnpj?a.ft_ano_cadastro_cnpj:null,placeholder:"Insira o ano em que a OSC foi legalmente criada",type:"text",custom_class:"ano"},{id:"dt_fundacao_osc",label:"Ano de Fundação",content:a.dt_fundacao_osc?a.dt_fundacao_osc.substring(6):null,fonte:a.ft_fundacao_osc?a.ft_fundacao_osc:null,placeholder:"Insira o ano de fundação da OSC",type:"text",custom_class:"ano"},{id:"tx_email",label:"E-mail oficial da OSC",content:a.tx_email?a.tx_email:null,fonte:a.ft_email?a.ft_email:null,placeholder:"Insira o endereço de e-mail da OSC",type:"text"},{id:"tx_resumo_osc",label:"O que a OSC faz",content:a.tx_resumo_osc?a.tx_resumo_osc:null,fonte:a.ft_resumo_osc?a.ft_resumo_osc:null,placeholder:"Apresente ao público, resumida e objetivamente, o que a OSC faz. Insira os objetivos, as atividades, práticas ou o que achar mais adequado para retratar a OSC",type:"textarea"},{id:"tx_site",label:"Site",content:a.tx_site?a.tx_site:null,fonte:a.ft_site?a.ft_site:null,placeholder:"Insira o endereço da página da OSC na internet, se houver",type:"text"},{id:"tx_telefone",label:"Telefone",content:a.tx_telefone?a.tx_telefone:null,fonte:a.ft_telefone?a.ft_telefone:null,placeholder:"Insira aqui o contato de telefone da OSC (DDD + número do telefone)",type:"tel"}]};return a}},{key:"areasAtuacao",value:function(){return{form_items:[{id:"atividade_economica",label:"Atividade econômica (CNAE)",content:null,fonte:null,placeholder:"Insira atividade econômica",type:"p",custom_class:null},{id:"macro_area_1",label:"Área de atuação 1",content:null,fonte:null,placeholder:"Selecione a área de atuação da OSC",type:"text",custom_class:"autocomplete"},{id:"macro_area_1_outros",label:"Insira a area desejada",content:null,fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"text",hide:!0,custom_class:"macro_area_outros"},{id:"sub_area_1_outros",label:"Insira a subarea desejada",content:null,fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"text",hide:!0,custom_class:"sub_area_outros"},{id:"macro_area_2",label:"Área de atuação 2",content:null,fonte:null,placeholder:"Selecione uma segunda área de atuação da OSC, se houver.",type:"text",custom_class:"autocomplete"},{id:"macro_area_2_outros",label:"Insira a area desejada",content:null,fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"text",hide:!0,custom_class:"macro_area_outros"},{id:"sub_area_2_outros",label:"Insira a subarea desejada",content:null,fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"text",hide:!0,custom_class:"sub_area_outros"}]}}},{key:"descricao",value:function(a){a={form_items:[{id:"tx_historico",label:"Histórico",content:a.tx_historico?a.tx_historico:null,fonte:a.ft_historico?a.ft_historico:null,placeholder:"De modo resumido e objetivo, diga como surgiu a OSC, quando, onde, por que e por quem foi fundada",type:"textarea"},{id:"tx_missao_osc",label:"Missão",content:a.tx_missao_osc?a.tx_missao_osc:null,fonte:a.ft_missao_osc?a.ft_missao_osc:null,placeholder:"Se houver, apresente qual a missão da OSC",type:"textarea"},{id:"tx_visao_osc",label:"Visão",content:a.tx_visao_osc?a.tx_visao_osc:null,fonte:a.ft_visao_osc?a.ft_visao_osc:null,placeholder:"Se houver, apresente a visão da OSC",type:"textarea"},{id:"tx_finalidades_estatutarias",label:"Finalidades Estatutárias da OSC",content:a.tx_finalidades_estatutarias?a.tx_finalidades_estatutarias:null,fonte:a.ft_finalidades_estatutarias?a.ft_finalidades_estatutarias:null,placeholder:"Apresente as finalidades estatutárias da OSC. Se preferir, copie do estatuto da OSC",type:"textarea"},{id:"tx_link_estatuto_osc",label:"Link para o Estatuto da OSC",content:a.tx_link_estatuto_osc?a.tx_link_estatuto_osc:null,fonte:a.ft_link_estatuto_osc?a.ft_link_estatuto_osc:null,placeholder:"Se houver, insira o link que leva ao estatuto da OSC",type:"textarea"}]};return a}},{key:"titulosCertificacoes",value:function(a,e){var o=e.validateObject(a.certificado)?a.certificado:"",s=o.utilidade_publica_estadual,r=o.utilidade_publica_municipal,i={form_items:[{id:"tx_utilidade_publica",label:null,content:null,fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"checkbox",options:[{label:"Utilidade pública estadual",value:"estadual",checked:!0},{label:"Utilidade pública municipal",value:"municipal",checked:!1}]},{id:"utilidade_publica_estadual",label:"Insira data de validade para Utilidade pública estadual",content:s?s.dt_data_validade:null,fonte:s?s.ft_utilidade_publica_estadual:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"text",hide:!0},{id:"utilidade_publica_municipal",label:"Insira data de validade para Utilidade pública municipal",content:r?r.dt_data_validade:null,fonte:r?r.ft_utilidade_publica_municipal:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"text",hide:!0}]};return i}},{key:"modalAjuda",value:function(){return{dados_gerais:{"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho."},areas_de_atuacao:{"Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da Classificação Nacional de Atividades Econômicas – CNAE, disponível na declaração da base RAIS do Ministério do Trabalho e Emprego. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC. Defina-as com zelo, pois estes campos podem para os usuários buscarem informações de OSCs, por áreas temáticas de atuação."},certificacoes:{"Descrição da OSC":"Nesta seção a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades previstas em seu estatuto. A intenção é permitir à organização se mostrar aos cidadãos e indicar a razão de sua existência."},titulosCertificacoes:{"Títulos e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>."},relacoesTrabalho:{"Relações de Trabalho e Governança":"Nesta seção você deve indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da organização e, se houver, indicar quantos são os trabalhadores voluntários atuando nela. Os campos relativos ao número de empregados formais provêm das informações da declaração da RAIS, do Ministério do Trabalho e Emprego."},espacos:{"Espaços de Participação Social":"Você deve indicar aqui a participação em espaços colegiados com o poder público ou auto organizados pela própria sociedade civil (fóruns, redes etc.). Quanto mais detalhado for, mas será possível saber sobre a importância das instituições participativas no país.<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>."},projetos:{"Projetos, atividades e programas - PAP":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>."},fontes:{"Fontes de recursos anuais da OSC":"Você deve informar cada uma das fontes de recurso da OSCs ao longo do ano. Quando mais detalhado, mais transparente será a organização."}}}},{key:"jsonModalAjuda",value:function(){return{"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho.","Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da Classificação Nacional de Atividades Econômicas – CNAE, disponível na declaração da base RAIS do Ministério do Trabalho e Emprego. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC. Defina-as com zelo, pois estes campos podem para os usuários buscarem informações de OSCs, por áreas temáticas de atuação.","Descrição da OSC":"Nesta seção a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades previstas em seu estatuto. A intenção é permitir à organização se mostrar aos cidadãos e indicar a razão de sua existência.","Títulos e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Relações de Trabalho e Governança":"Nesta seção você deve indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da organização e, se houver, indicar quantos são os trabalhadores voluntários atuando nela. Os campos relativos ao número de empregados formais provêm das informações da declaração da RAIS, do Ministério do Trabalho e Emprego.","Espaços de Participação Social":"Você deve indicar aqui a participação em espaços colegiados com o poder público ou auto organizados pela própria sociedade civil (fóruns, redes etc.). Quanto mais detalhado for, mas será possível saber sobre a importância das instituições participativas no país.<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Projetos, atividades e programas - PAP":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.","Fontes de recursos anuais da OSC":"Você deve informar cada uma das fontes de recurso da OSCs ao longo do ano. Quando mais detalhado, mais transparente será a organização."}}},{key:"getSuggestions",value:function(){return[{cd_area_atuacao:1,tx_nome_area_atuacao:"Habitação"},{cd_area_atuacao:2,tx_nome_area_atuacao:"Saúde"},{cd_area_atuacao:3,tx_nome_area_atuacao:"Cultura e recreação"},{cd_area_atuacao:4,tx_nome_area_atuacao:"Educação e Pesquisa"},{cd_area_atuacao:5,tx_nome_area_atuacao:"Assistência social"},{cd_area_atuacao:6,tx_nome_area_atuacao:"Religião"},{cd_area_atuacao:7,tx_nome_area_atuacao:"Associações patronais, profissionais e de produtores rurais"},{cd_area_atuacao:8,tx_nome_area_atuacao:"Meio ambiente e proteção animal"},{cd_area_atuacao:9,tx_nome_area_atuacao:"Desenvolvimento e defesa de direitos"},{cd_area_atuacao:10,tx_nome_area_atuacao:"Outros"}]}},{key:"sectionsRelacoesGovernanca",value:function(){return{items:[{id:"relacoes_trabalho",priority:"2",text:"Relações de Trabalho e Governança",target:"relacoes_trabalho_e_governanca"},{id:"governanca",priority:"3",text:"Governança da OSC",target:"relacoes_trabalho"},{id:"dirigentes",priority:"4",text:"Quadro de dirigentes",subsections:[]},{id:"conselheiros",priority:"4",text:"Conselho Fiscal",subsections:[]},{id:"conselho_fiscal",priority:"4",text:"Membros do conselho fiscal",subsections:[]},{id:"trabalhadores",priority:"3",text:"Trabalhadores",target:"relacoes_trabalho",subsections:[]}]}}},{key:"relacoesTrabalho",value:function(a){var e={form_items:[{id:"trabalhadores",label:"Total de trabalhadores",content:a.nr_trabalhadores?a.nr_trabalhadores:"Não constam informações nas bases de dados do Mapa.",fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"p"},{id:"empregados",label:"Empregados",content:a.nr_trabalhadores_vinculo?a.nr_trabalhadores_vinculo:"Não constam informações nas bases de dados do Mapa.",fonte:a.ft_trabalhadores_vinculo,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"p"},{id:"deficiencia",label:"Trabalhadores com deficiência",content:a.nr_trabalhadores_deficiencia?a.nr_trabalhadores_deficiencia:"Não constam informações nas bases de dados do Mapa.",fonte:a.ft_trabalhadores_deficiencia,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"p"},{id:"voluntarios",label:"Trabalhadores voluntários",content:a.nr_trabalhadores_voluntarios,fonte:a.ft_trabalhadores_voluntarios,placeholder:"Insira o número de voluntários",type:"text"}]};return e}},{key:"trabalhadoresRelacoesGovernanca",value:function(){return{form_items:[{id:"trabalhadores",label:"Total de trabalhadores",content:"",fonte:null,placeholder:"Não constam informações nas bases de dados do Mapa.",type:"p"},{id:"empregados",label:"Empregados",content:"Não constam informações nas bases de dados do Mapa.",fonte:"",placeholder:"Não constam informações nas bases de dados do Mapa.",type:"p"},{id:"deficiencia",label:"Trabalhadores com deficiência",content:"Não constam informações nas bases de dados do Mapa.",fonte:"",placeholder:"Não constam informações nas bases de dados do Mapa.",type:"p"},{id:"voluntarios",label:"Trabalhadores voluntários",content:"",fonte:"",placeholder:"Insira o número de voluntários",type:"text"}]}}},{key:"partSocial",value:function(){return{items:[{id:"participacao_social",priority:"2",text:"Espaços de Participação Social",target:"participacao_social"},{id:"conselhos",priority:"3",text:"Conselhos de Políticas Públicas",target:"participacao_social"},{id:"conferencias",priority:"3",text:"Conferências de Políticas Públicas",target:"participacao_social"},{id:"outros_part",priority:"3",text:"Outros espaços de participação social",target:"participacao_social"}]}}},{key:"itemsRecurso",value:function(){return{items:[{id:"recursos_geral",priority:"2",text:"Fontes de recursos anuais da OSC"},{id:"recursos_proprios",priority:"3",text:"Recursos próprios"},{id:"recursos_publicos",priority:"3",text:"Recursos públicos"},{id:"recursos_privados",priority:"3",text:"Recursos privados",subsections:[]},{id:"recursos_nao_financeiros",priority:"3",text:"Recursos não financeiros",subsections:[]}]}}},{key:"tiposRecurso",value:function(){return{recursos_geral:[{id:"ano",label:"Ano",content:"2017",fonte:null,placeholder:"",type:"select",options:["2017","2016","2015","2014"],custom_class:"select-ano"}],recursos_proprios:[{id:"patrimoniais",label:"Rendimentos de fundos patrimoniais",pretext:"R$",placeholder:"Insira o valor recebido de rendimentos de fundos patrimoniais"},{id:"reservas",label:"Rendimentos financeiros de reservas ou contas correntes  próprias",placeholder:"Insira o valor recebido de rendimentos financeiros de reservas ou contas correntes próprias"},{id:"mensalidades",label:"Mensalidades ou contribuições de associados",placeholder:"Insira o valor recebido de mensalidades ou contribuições de associados"},{id:"premios",label:"Prêmios recebidos",placeholder:"Insira o valor de prêmios recebidos"},{id:"venda",label:"Venda de produtos",placeholder:"Insira o valor recebido de venda de produtos"},{id:"servicos",label:"Prestação de serviços",placeholder:"Insira o valor recebido de prestação de serviços"},{id:"bens",label:"Venda de bens e direitos",placeholder:"Insira o valor recebido de venda de bens e direitos"}],recursos_publicos:[{id:"federal",label:"Parceria com o governo federal",placeholder:"Insira o valor recebido de parcerias com o governo federal"},{id:"estadual",label:"Parceria com o governo estadual",placeholder:"Insira o valor recebido de parcerias com o governo estadual"},{id:"municipal",label:"Parceria com o governo municipal",placeholder:"Insira o valor recebido de parcerias com o governo municipal"},{id:"multilaterais",label:"Acordo com organismos multilaterais ",placeholder:"Insira o valor recebido de acordos com organismos multilaterais"},{id:"estrangeiros",label:"Acordo com governos estrangeiros",placeholder:"Insira o valor recebido de acordos com governos estrangeiros"},{id:"empresas_publicas",label:"Empresas públicas ou sociedades de economia mista",placeholder:"Insira o valor recebido de empresas públicas ou sociedades de economia mista"}],recursos_privados:[{id:"oscs_brasileiras",label:"Parceria com OSCs brasileiras",placeholder:"Insira o valor recebido de parcerias com OSCs brasileiras"},{id:"oscs_estrangeiras",label:"Parcerias com OSCs estrangeiras",placeholder:"Insira o valor recebido de parcerias com OSCs estrangeiras"},{id:"religiosas_brasileiras",label:"Parcerias com organizações religiosas brasileiras",placeholder:"Insira o valor recebido de parcerias com organizações religiosas brasileiras"},{id:"religiosas_estrangeiras",label:"Parcerias com organizações religiosas estrangeiras",placeholder:"Insira o valor recebido de parcerias com organizações religiosas estrangeiras"},{id:"empresas_brasileiras",label:"Empresas privadas brasileiras",placeholder:"Insira o valor recebido de empresas privadas"},{id:"empresas_estrangeiras",label:"Empresas privadas estrangeiras",placeholder:"Insira o valor recebido de empresas privadas estrangeiras"},{id:"doacoes_pj",label:"Doações de pessoa jurídica",placeholder:"Insira o valor recebido de doações de pessoa jurídica"},{id:"doacoes_pf",label:"Doações de pessoa física",placeholder:"Insira o valor recebido de doações de pessoa física"},{id:"doacoes_servicos",label:"Doações recebidas na forma de produtos e serviços (com Nota Fiscal)",placeholder:"Insira o valor de Doações recebidas na forma de produtos e serviços (com Nota Fiscal)",content:""}],recursos_nao_financeiros:[{id:"voluntariado",label:"Voluntariado",placeholder:"Insira o valor recebido de doações voluntárias"},{id:"isencoes",label:"Isenções",placeholder:"Insira o valor recebido de isenções"},{id:"imunidades",label:"Imunidades",placeholder:"Insira o valor recebido de imunidades"},{id:"bens_recebidos",label:"Bens recebidos em direito de uso",placeholder:"Insira o valor de bens recebidos em direito de uso"},{id:"doacoes_recebidas",label:"Doações recebidas na forma de produtos e serviços (sem Nota Fiscal)",placeholder:"Insira o valor de doações recebidas na forma de produtos e serviços (sem Nota Fiscal)"}]}}},{key:"labelsProjeto",value:function(){return{tx_nome_projeto:{header:"Nome do projeto, atividade ou programa",containerClass:"col-md-12",removable:!1,type:"text",options:null,placeholder:"Insira o nome do projeto"},tx_nome_status_projeto:{header:"Situação do projeto",containerClass:"col-md-3",removable:!1,type:"select",options:["Arquivado, cancelado ou indeferido","Proposta","Projeto em andamento","Finalizado","Outro"]},dt_data_inicio_projeto:{header:"Data de Início",containerClass:"col-md-3",removable:!1,type:"text",options:null,placeholder:"Insira a data de início do projeto"},dt_data_fim_projeto:{header:"Data de Fim",containerClass:"col-md-3",removable:!1,type:"text",options:null,placeholder:"Insira o data de fim do projeto"},tx_link_projeto:{header:"Link para o projeto",containerClass:"col-md-3",removable:!1,type:"text",options:null,placeholder:"Insira o link do projeto"},nr_total_beneficiarios:{header:"Total de Beneficiários",containerClass:"col-md-3",removable:!1,type:"text",options:null,placeholder:"Insira o número total de beneficiários"},nr_valor_total_projeto:{header:"Valor Total",containerClass:"col-md-3",removable:!1,type:"text",options:null,placeholder:"Insira o valor total do projeto"},nr_valor_captado_projeto:{header:"Valor Recebido",containerClass:"col-md-3",removable:!1,type:"text",options:null,placeholder:"Insira o valor recebido do projeto"},fonte_recursos:{header:"Fontes de Recursos",containerClass:"col-md-3 fonte_recursos",custom_class:"fonte_recurso",removable:!1,type:"checkbox",options:["Recursos públicos","Recursos privados","Recursos próprios","Recursos não financeiros"]},fonte_de_recursos_publico:{header:"Fontes de Recursos Públicos",containerClass:"col-md-3",custom_class:"fonte_recurso",removable:!1,type:"select",options:["Recursos públicos","Recursos privados","Recursos próprios","Recursos não financeiros"]},financiador_projeto:{header:"Financiadores do Projeto",containerClass:"col-md-4",removable:!0,type:"text",options:null,placeholder:"Insira a informação"},area_atuacao:{header:"Áreas de atuação do projeto, atividade ou programa",containerClass:"col-md-12",removable:!1,type:"text",options:null,placeholder:"Selecione a área de atuação do projeto"},area_atuacao_outra:{header:"Outras áreas de atuação do projeto, atividade ou programa",containerClass:"col-md-3",removable:!0,type:"text",options:null},publico_beneficiado:{header:"Público Beneficiado",containerClass:"col-md-4",removable:!0,type:"text",options:null,placeholder:"Insira a informação"},tx_nome_abrangencia_projeto:{header:"Abrangência de atuação",containerClass:"col-md-3",removable:!1,type:"select",options:["Municipal","Estadual","Regional","Nacional"]},localizacao_projeto:{header:"Local de execução",containerClass:"col-md-4 local",removable:!0,type:"text",options:null,title:null,placeholder:"Insira a informação"},osc_parceira:{header:"OSCs Parceiras",containerClass:"col-md-6 osc_parceira",removable:!0,type:"text",options:null,placeholder:"Insira a informação"},tx_nome_zona_atuacao:{header:"Zona de Atuação",containerClass:"col-md-3",removable:!1,type:"select",options:["Rural","Urbana"]},tx_descricao_projeto:{header:"Descrição do Projeto, atividade e/ou programa",containerClass:"col-md-12",removable:!1,type:"textarea",options:null,placeholder:"Descreva aqui qual sobre o que trata e qual o objetivo do projeto, atividade ou programa."},tx_metodologia_monitoramento:{header:"Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa",containerClass:"col-md-12",removable:!1,type:"textarea",options:null,placeholder:"Descreva a forma de monitorar e avaliar a implementação do projeto, se houver."},tipo_parceria:{header:"Tipo de Parceria",containerClass:"col-md-3 tipo_parceria_projeto",removable:!1,type:"checkbox",options:["Acordo de cooperação técnica","Termo de fomento","Termo de colaboração","Termo de parceria","Contrato de gestão","Convênio","Outro"]},objetivos:{header:"Objetivos do Desenvolvimento Sustentável - ODS",containerClass:"col-md-12",removable:!1,type:"select",options:null},objetivo_meta:{header:"Objetivos do Desenvolvimento Sustentável - ODS",containerClass:"col-md-12",removable:!0,type:"select",options:null}}}},{key:"getEmptyProject",value:function(){return{id_projeto:null,tx_identificador_projeto_externo:null,ft_identificador_projeto_externo:null,tx_nome_projeto:null,ft_nome_projeto:"Usuário",cd_status_projeto:null,tx_nome_status_projeto:null,ft_status_projeto:"Usuário",dt_data_inicio_projeto:null,ft_data_inicio_projeto:"Usuário",dt_data_fim_projeto:null,ft_data_fim_projeto:"Usuário",tx_link_projeto:null,ft_link_projeto:"Usuário",nr_total_beneficiarios:null,ft_total_beneficiarios:"Usuário",nr_valor_total_projeto:null,ft_valor_total_projeto:"Usuário",nr_valor_captado_projeto:null,ft_valor_captado_projeto:"Usuário",tx_descricao_projeto:null,ft_descricao_projeto:"Usuário",tx_metodologia_monitoramento:null,ft_metodologia_monitoramento:"Usuário",cd_abrangencia_projeto:null,tx_nome_abrangencia_projeto:null,ft_abrangencia_projeto:"Usuário",cd_zona_atuacao_projeto:null,tx_nome_zona_atuacao:null,ft_zona_atuacao_projeto:"Usuário",publico_beneficiado:[],area_atuacao:[],area_atuacao_outra:[],localizacao_projeto:[],tipo_parceria:[],osc_parceira:[],financiador_projeto:[],objetivo_meta:[],fonte_recursos:[],recursos:null}}},{key:"oLanguageDataTable",value:function(){return{sEmptyTable:"Nenhum registro encontrado",sInfo:"Mostrando de _START_ até _END_ de _TOTAL_ registros",sInfoEmpty:"Mostrando 0 até 0 de 0 registros",sInfoFiltered:"(Filtrados de _MAX_ registros)",sInfoPostFix:"",sInfoThousands:".",sLengthMenu:"_MENU_ resultados por página",sLoadingRecords:"Carregando...",sProcessing:"Processando...",sZeroRecords:"Nenhum registro encontrado",sSearch:"Pesquisar",oPaginate:{sNext:"Próximo",sPrevious:"Anterior",sFirst:"Primeiro",sLast:"Último"},oAria:{sSortAscending:": Ordenar colunas de forma ascendente",sSortDescending:": Ordenar colunas de forma descendente"}}}}]),a}();