"use strict";function acionarModalTabela(a,e){$("#modalTitulo").html(""),$("#modalTitulo").html(a),$("#corpoModal").html(""),$("#corpoModal").html(e),$("#modalTabela").modal("show"),verificarContraste()}function formatarDinheiro(a){return a.toLocaleString("pt-BR",{minimumFractionDigits:2,style:"currency",currency:"BRL"})}function createTabela_Bar_Donut(a){tabela='<table class="table table-hover table-striped table-bordered table-responsive">',cabecalho="<thead><tr>";for(var e in a[0].tituloColuna)cabecalho+="<th>"+a[0].tituloColuna[e]+"</th>";cabecalho+="</tr></thead>",tabela+=cabecalho,corpo="<tbody>";for(var t in a[0].values){corpo+="<tr><td>"+a[0].values[t].label+"</td>";var o=a[0].values[t].value;"$"==a[0].tipo_valor&&(o=formatarDinheiro(o)),corpo+="<td>"+o+"</td></tr>"}corpo+="</tbody>",tabela+=corpo,tabela+="</table>",tabela+="<div>"+a[0].legenda+"</div>",acionarModalTabela(a[0].titulo,tabela)}function createTabela_MultBar_Line(a,e){tabela='<table class="table table-hover table-striped table-bordered table-responsive">',cabecalho="<thead><tr>";for(var t in a[0].tituloColuna)cabecalho+="<th>"+a[0].tituloColuna[t]+"</th>";for(cabecalho+="</tr></thead>",tabela+=cabecalho,corpo="<tbody>",t=0;t<a[0].series.length;t++)for(var o in a[0].series[t].values)if(corpo+="<tr><td>"+a[0].series[t].key+"</td>",e){corpo+="<td>"+a[0].series[t].values[o].x+"</td>";var l=a[0].series[t].values[o].y;"$"==a[0].series[t].tipo_valor&&(l=formatarDinheiro(l)),corpo+="<td>"+l+"</td></tr>"}else{corpo+="<td>"+a[0].series[t].values[o].label+"</td>";var r=a[0].series[t].values[o].value;"$"==a[0].series[t].tipo_valor&&(r=formatarDinheiro(r)),corpo+="<td>"+r+"</td></tr>"}corpo+="</tbody>",tabela+=corpo,tabela+="</table>",tabela+="<div>"+a[0].legenda+"</div>",acionarModalTabela(a[0].titulo,tabela)}