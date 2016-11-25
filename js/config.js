require.config({
  baseUrl: "js/",
  paths: {
    "react": "libs/react-15.3.1/react-with-addons.min",
    "jsx": "libs/jsxcompiler/jsx",
    "text": "libs/require-2.3.2/text",
    "JSXTransformer": "libs/jsxcompiler/JSXTransformer",
    "babel": "libs/babel-core/5.8.24/browser.min",
    "jquery": "libs/jquery-3.1.0/jquery-3.1.0.min",
    "jquery-ui": "libs/jquery-ui-1.12.0/jquery-ui",
    "bootstrap":"libs/bootstrap-3.3.7/bootstrap.min",
    "d3": "libs/nv-d3/d3.v3",
    "nv.d3":"libs/nv-d3/nv.d3",
    "nv.d3.lib":"libs/nv-d3/nv.d3.lib",
    "stream":"libs/nv-d3/stream-layers",
    "tablesaw":"libs/tablesaw-3.0/tablesaw",
    "tablesaw-init":"libs/tablesaw-3.0/tablesaw-init",
    "datatables.net": "libs/DataTables/DataTables-1.10.12/js/jquery.dataTables.min",
    "datatables-responsive":"libs/DataTables/Responsive-2.1.0/js/dataTables.responsive.min",
    "leaflet": "libs/leaflet-0.7.7/leaflet",
    "leafletCluster": "libs/leaflet-0.7.7/cluster.min",
    "google": "libs/google",
    "rotas":"rotas",
    "graficoParaTabela":"util/graficoParaTabela",
    "cookies":"util/cookies",
    "contraste":"util/contraste",
    "util" : "util/Util.js"
  },
  shim: {
      'contraste':['cookies'],
      'react':['contraste'],
      'jquery-ui': ['jquery'],
      'bootstrap': ['jquery-ui'],
      'd3': ['bootstrap'],
      'nv.d3': ['d3'],
      'stream':['nv.d3'],
      'nv.d3.lib': ['stream'],
      'tablesaw-init':['tablesaw'],
      'datatables.net':['jquery'],
      'datatables-responsive': ['datatables.net'],
      //'leaflet': ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCb7xfXqVa7ip6KP-62zZmZbiwYjX7mL-0'],
      'leafletCluster': ['leaflet'],
      'google': ['leafletCluster'],
      'graficoParaTabela': ['bootstrap'],
      'util':['jquery']
  },
  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});
