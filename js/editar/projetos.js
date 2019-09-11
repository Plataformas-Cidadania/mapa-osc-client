"use strict";function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,o){for(var a=0;a<o.length;a++){var t=o[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(o,a,t){return a&&e(o.prototype,a),t&&e(o,t),o}}(),Projeto=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getFonteDeRecursosProjeto",value:function(e){return{id:"fonte_recursos",dados:e[Object.keys(e)[0]]}}},{key:"montarProjetos",value:function(e,o){var a=[],t=o.validateObject(e.projeto_abreviado,[]);a.push({id:"lista_projetos",priority:"2",text:"Projetos, atividades e programas - PAP"});for(var r=3,n=t.length,l=new Array(n),i=0;i<t.length;i++)l[i]=new Array(r),l[i][0]=o.validateObject(t[i].id_projeto,1),l[i][1]=o.validateObject(t[i].tx_nome_projeto,""),l[i][2]="<span className='input-group-btn'><button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button></span>";a.push(l);for(var r=3,n=t.length,l=new Array(n),i=0;i<t.length;i++)l[i]=new Array(r),l[i][0]=o.validateObject(t[i].id_projeto,1),l[i][1]=o.validateObject(t[i].tx_nome_projeto,""),l[i][2]="<span className='input-group-btn'><button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button></span>";return a.push(l),a}},{key:"montarProjeto",value:function(e,o,a,t){var r=a.labelsProjeto(),n=[],l=(e.id_projeto,o.validateObject(e.projeto,e)),e=o.validateObject(l[0],l),i=o.validateObject(e.ft_identificador_projeto_externo,null),c=o.validateObject(e.objetivo_meta,null),s=this.getFonteDeRecursosProjeto(o.validateObject(e.fonte_recursos,[]));s.dados=o.validateObject(e.fonte_recursos,[]);for(var u in e)if("tipo_parceria"!=u&&"fonte_recursos"!=u&&"area_atuacao"!=u&&"osc_parceira"!=u&&"area_atuacao_outra"!=u){if(e.hasOwnProperty(u)&&void 0!==r[u]){var d=u,p=e[u],i=e[u.replace(/tx_|dt_|nr_|cd_/g,"ft_")],j=r[u].header,v=r[u].containerClass,_=r[u].removable,f=r[u].type,b=r[u].options,g=r[u].placeholder,h=r[u].infoTitle,m=null,O=!1;if(null===p||p.constructor!==Array){var y=o.InputProjeto(d,p,f,b,_,m,O,g,void 0,i,c,null,h),P=o.AgrupadorDeInputs(d,v,j,[y],m,b,null,h);n.push(P)}}}else if("tipo_parceria"==u){var d=u,p=e[u],i=e[u.replace(/tx_|dt_|nr_|cd_/g,"ft_")],j=r[u].header,v=r[u].containerClass,_=r[u].removable,f=r[u].type,b=r[u].options,g=r[u].placeholder,h=r[u].infoTitle,m=null,O=!1,y=o.InputProjeto(d,p,f,b,_,m,O,g,void 0,i,null,null,h),P=o.AgrupadorDeInputs(d,v,j,[y],m,b,null,h);n.push(P)}if(console.log(e),console.log("==========================================================="),e.hasOwnProperty("fonte_recursos")){var d=s.id,p=s.dados,i=null;s.dados.length>0&&(i=s.dados[0].ft_fonte_recursos_projeto);var j=r[d].header,v=r[d].containerClass,_=r[d].removable,f=r[d].type,b=r[d].options,g=r[d].placeholder,h=r[d].infoTitle,m=null,O=!1,y=o.InputProjeto(d,p,f,b,_,m,O,g,void 0,i,null,null,h),P=o.AgrupadorDeInputs(d,v,j,[y],m,b,null,h);n.push(P),console.log(P)}o.validateObject(e.area_atuacao,[]);for(var I=o.validateObject(e.area_atuacao_outra,[]),A=o.validateObject(e.localizacao,[]),T=o.getTipoProjeto("localizacao_projeto",A),C=o.validateObject(e.publico_beneficiado,[]),k=o.getTipoProjeto("publico_beneficiado",C),w=o.validateObject(e.financiador_projeto,[]),x=o.getTipoProjeto("financiador_projeto",w),I=o.getTipoProjeto("area_atuacao_outra",I),D=o.validateObject(e.osc_parceira,[]),E=o.getTipoProjeto("osc_parceira",D),R=e.osc_parceira?e.osc_parceira.length:0,N=0;N<R;N++)o.validateObject(e.osc_parceira[N].id_osc,null);o.validateObject(e.objetivo_meta)&&e.objetivo_meta.id_objetivo_projeto;for(var z=[T,k,x,E],F=0;F<z.length;F++)if(o.validateObject(z[F].dados,!1)){var M=this.createAgrupadorMultipleInputs(z[F],r,o);n.push(M)}var B=a.getEmptyProject(),G=[];for(var $ in B)for(N=0;N<n.length;N++)if(n[N].id==$){G.push(n[N]);break}return G}},{key:"carregaProjeto",value:function(e,o,a,t,r){var n={},l=null;if(r){var i=o.getEmptyProject();n.agrupadores=this.montarProjeto(i,t,o,a)}else $.ajax({url:a.ProjectByID(e),type:"GET",async:!1,dataType:"json",error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){n.projeto=e}}),l=this.montarProjeto(n.projeto,t,o,a),n.agrupadores=l;return n}},{key:"createAgrupadorMultipleInputs",value:function(e,o,a){var t={type:"remove",value:"Remover"},r={type:"add",value:"Adicionar"},n=e.id,l=o[e.id],i=[],c="",s=a.validateObject(l)?l.removable:"",u=a.validateObject(l)?l.type:"",d=a.validateObject(l)?l.options:"",p=a.validateObject(l)?l.custom_class:"",j=a.validateObject(l)?l.infoTitle:"",v=null,_=!1;if(s&&(v=[t],P=[r],_=!0),0===e.dados.length){b=n;c="";m=a.InputProjeto(b,c,u,d,s,v,_,"Insira a informação",null,null,null,p,j);i.push(m)}for(var f=0;f<e.dados.length;f++){var b=n;for(var g in e.dados[f])if(e.dados[f].hasOwnProperty(g)&&"tx"===g.slice(0,2)){c=e.dados[f][g];var h=e.dados[f].cd_area_atuacao_projeto,m=a.InputProjeto(b,c,u,d,s,v,_,"Insira a informação",null,null,h,p,j);i.push(m)}}var O=a.validateObject(l)?l.header:"",y=a.validateObject(l)?l.containerClass:"col-md-3",P=null;s&&(v=[t],P=[r]);return a.AgrupadorDeInputs(n,y,O,i,P,d,p,j)}}]),e}();