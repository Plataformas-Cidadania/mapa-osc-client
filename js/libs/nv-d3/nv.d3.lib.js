function createDonutChart(grafico, valores){
	//Donut chart example
	nv.addGraph(function() {
	  var chart = nv.models.pieChart()
	      .x(function(d) { return d.label })
	      .y(function(d) { return d.value })
	      .showLabels(true)     //Display pie labels
	      .labelThreshold(0.05)  //Configure the minimum slice size for labels to show up
	      .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
	      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
	      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
	      .height(430);


	    d3.select(grafico + " svg")
	        .datum(valores[0].values)
	        .transition().duration(350)
	        .call(chart);

			nv.utils.windowResize(function () {
				chart.update();
			});

	  return chart;
	});
}

function createBarChart(grafico, valores)
{
	var chart = nv.models.discreteBarChart()
				.margin({top: 30, right: 50, bottom: 70, left: 80})
	      .x(function(d) { return d.label })
	      .y(function(d) { return d.value })
	      .staggerLabels(false)
	      .tooltips(true)
	      .showValues(true)
	      .height(430);

		chart.xAxis
				.axisLabel(valores[0].leg_X);

		chart.yAxis     //Chart y-axis settings
					.axisLabel(valores[0].leg_Y)
					.tickFormat(function(d) { return d3.format(valores[0].config[0])(d/valores[0].config[1]) + valores[0].config[2] });

	  d3.select(grafico + " svg")
	      .datum(valores)
	      .transition().duration(1200)
	      .call(chart);

		nv.utils.windowResize(function(){
			chart.update();
			rotateLabelGrafico(grafico);
		});

		rotateLabelGrafico(grafico);

	  return chart;
}

function createMultiBarChart(grafico, valores)
{
	var chart = nv.models.multiBarChart()
				.margin({bottom: 70, left: 80})
				.x(function(d) { return d.label })
				.y(function(d) { return d.value })
	      .transitionDuration(350)
	      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
	      .rotateLabels(0)      //Angle to rotate x-axis labels.
	      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
	      .groupSpacing(0.1)    //Distance between each group of bars.
				.height(430);

		chart.xAxis
				.axisLabel(valores[0].leg_X);

		chart.yAxis     //Chart y-axis settings
					.axisLabel(valores[0].leg_Y)
					.tickFormat(function(d) { return d3.format(valores[0].config[0])(d/valores[0].config[1]) + valores[0].config[2] });

	    d3.select(grafico + " svg")
	        .datum(valores[0].series)
	        .call(chart);

		function stackControls(){
		  d3.select(grafico + ' .nv-controlsWrap .nv-series:nth-child(1)').attr('transform', 'translate(-85, 0)');
			d3.select(grafico + ' .nv-controlsWrap .nv-series:nth-child(2)').attr('transform', 'translate(-20, 0)');
		}
		 nv.utils.windowResize(function(){
			 chart.update();
			 stackControls();
			 rotateLabelGrafico(grafico);
		 });

		d3.select(grafico + ' .nv-controlsWrap').on('click', stackControls);
		d3.select(grafico + ' .nv-legendWrap').on('click', stackControls);
		stackControls();
		rotateLabelGrafico(grafico);

	return chart;
}

//config[0] -> formataçao (http://bl.ocks.org/zanarmstrong/raw/05c1e95bf7aa16c4768e/)
//config[1] -> escala (1000000)
//config[2] -> texto(M B T)
function createLineChart(grafico, valores)
{
	var chart = nv.models.lineChart()
								.margin({top: 30, right: 50, bottom: 70, left: 100}) //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
								.height(430);

	chart.xAxis
			.axisLabel(valores[0].leg_X);

	chart.yAxis     //Chart y-axis settings
				.axisLabel(valores[0].leg_Y)
				.tickFormat(function(d) { return d3.format(valores[0].config[0])(d/valores[0].config[1]) + valores[0].config[2] });

  d3.select(grafico + " svg")    //Select the <svg> element you want to render the chart in.
      .datum(valores[0].series)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
	nv.utils.windowResize(function(){
		chart.update();
		rotateLabelGrafico(grafico);
	});

	rotateLabelGrafico(grafico);

  return chart;
}

//config[0] -> formataçao (http://bl.ocks.org/zanarmstrong/raw/05c1e95bf7aa16c4768e/)
//config[1] -> escala (1000000)
//config[2] -> texto(M B T)
function createLinePlusBarChart(grafico, valores)
{
	var chart = nv.models.linePlusBarChart()
			.margin({top: 30, right: 60, bottom: 80, left: 80})
			//We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
		//	.x(function(d,i) { return i })
		//	.y(function(d,i) {return d[1] })
			.x(function(d) { return d.label })
			.y(function(d) { return d.value })
			;

	chart.xAxis
			.axisLabel(valores[0].leg_X)
			.tickFormat(function(d) {
			 	if(!(d % 1 != 0 && !isNaN(d % 1))){
					return d;
				}
			});

	chart.y1Axis
			.axisLabel(valores[0].leg_Y)
			.tickFormat(d3.format(valores[0].config[3]));

	chart.y2Axis
			.tickFormat(function(d) { return d3.format(valores[0].config[0])(d/valores[0].config[1]) + valores[0].config[2] });


	chart.bars.forceY([0]);

	d3.select(grafico + " svg")
		.datum(valores[0].series)
		.transition()
		.duration(0)
		.call(chart);

	//Update the chart when window resizes.
	nv.utils.windowResize(function(){
		chart.update();
		rotateLabelGrafico(grafico);
	});

	rotateLabelGrafico(grafico);
	return chart;
}

function createStackedAreaChart(grafico, valores)
{
		var chart = nv.models.stackedAreaChart()
							 .margin({top: 30, right: 100, bottom: 70, left: 50})
					//     .x(function(d) { return d[0] })   //We can modify the data accessor functions...
					//		 .y(function(d) { return d[1] })   //...in case your data is formatted differently.
							 .x(function(d) { return d.label })
							 .y(function(d) { return d.value })
							 .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
							 .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
							 .transitionDuration(500)
							 .showControls(true)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
							 .clipEdge(true);

	 //Format x-axis labels with custom function.
/*	 chart.xAxis
			 .tickFormat(function(d) {
				 return d3.time.format('%x')(new Date(d))
	 });
*/
	 chart.yAxis
			 .tickFormat(d3.format(',.2f'));

	 d3.select(grafico + " svg")
		 .datum(valores[0].series)
		 .call(chart);

	 nv.utils.windowResize(function(){
		 chart.update();
		 rotateLabelGrafico(grafico);
	 });

	 rotateLabelGrafico(grafico);

	 return chart;
 }

 function createMultiBarHorizontalChart(grafico, valores)
 {
		 var chart = nv.models.multiBarHorizontalChart()
								.x(function(d) { return d.label })
								.y(function(d) { return d.value })
								.margin({top: 30, right: 20, bottom: 70, left: 175})
								.showValues(true)           //Show bar value next to each bar.
								.tooltips(true)             //Show tooltips on hover.
								.transitionDuration(350)
								.showControls(true);        //Allow user to switch between "Grouped" and "Stacked" mode.

		chart.xAxis
				.axisLabel(valores[0].leg_X);

		chart.yAxis     //Chart y-axis settings
					.axisLabel(valores[0].leg_Y)
					.tickFormat(function(d) { return d3.format(valores[0].config[0])(d/valores[0].config[1]) + valores[0].config[2] });

		d3.select(grafico + " svg")
				.datum(valores[0].series)
				.call(chart);

		nv.utils.windowResize(function(){
			chart.update();
			rotateLabelGrafico(grafico);
		});

		return chart;
}


function createLineWithFocusChart(grafico, valores)
{
	  var chart = nv.models.lineWithFocusChart()
								.margin({top: 30, right: 50, bottom: 70, left: 50}) //Adjust chart margins to give the x-axis some breathing room.
								.showLegend(true)
								.height(430);


		chart.xAxis
				.axisLabel(valores[0].leg_X);

	  chart.yAxis
	      .tickFormat(d3.format(valores[0].config[3]));

		chart.y2Axis     //Chart y-axis settings
					.axisLabel(valores[0].leg_Y)
					.tickFormat(function(d) { return d3.format(valores[0].config[0])(d/valores[0].config[1]) + valores[0].config[2] });

	  d3.select(grafico + " svg")
	      .datum(valores[0].series)
	      .transition().duration(500)
	      .call(chart);

		nv.utils.windowResize(function(){

		chart.update();
			rotateLabelGrafico(grafico);
		});

		rotateLabelGrafico(grafico);

	  return chart;
}

function rotateLabelGrafico(grafico){

	if(window.innerWidth < 550){
		var xTicks1 = d3.select(grafico + ' .nv-x.nv-axis > g').selectAll('g')
			.selectAll('text').style('text-anchor','end').style('opacity',1).style('font-size',9)
			.attr('transform', function(d,i,j) { return 'translate (-10, 5) rotate(-90 0,0)' });
		var xleg1 = d3.select(grafico + ' .nv-axislabel').style('text-anchor','middle').style('opacity',1).style('font-size',12)
				.attr('transform', function(d,i,j) { return 'translate (0, 40) rotate(0 0,0)' }) ;
		}
		else{
			var xTicks2 = d3.select(grafico + ' .nv-x.nv-axis > g').selectAll('g')
				.selectAll("text").style('text-anchor','middle').style('opacity',1).style('font-size',12)
				.attr('transform', function(d,i,j) { return 'translate (0, 10) rotate(0 0,0)' }) ;
			var xleg2 = d3.select(grafico + ' .nv-axislabel').style('text-anchor','middle').style('opacity',1).style('font-size',12)
					.attr('transform', function(d,i,j) { return 'translate (0, 20) rotate(0 0,0)' }) ;
		}
}
