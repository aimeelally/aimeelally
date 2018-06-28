export default ['HelperFunctions', function(HelperFunctions){

  var that= {
              buildGroupedBarChart: buildGroupedBarChart
            };

  // constructor() {
  //   inject(this, ChartsService.$inject, arguments);
  // }

  function mouseover(d, tooltip, showAsPercentage) {
    var valToDisplay; 
    tooltip.transition().duration(200).style('opacity', 0.9); 

    if (showAsPercentage && d.total) {
      valToDisplay = Math.round((d.value/d.total*100) * 10) / 10 + '%';
    }
    else {
      valToDisplay = Math.round(d.value * 10) / 10;
    }

    tooltip.html(`<em>${valToDisplay}</em> ${humanise(d.name)}`)  
            .style('left', (d3.event.pageX - 5) + 'px')   
            .style('top', (d3.event.pageY - 100) + 'px');
    
  }

  function mouseout(d, tooltip) {
    tooltip.transition().duration(500).style('opacity', 0);
  }

  function humanise(str) {
    var frags = str.split('_');
    for (var i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

  function getTooltip() {
    // Define the div for the tooltip if it doesn't already exist
    if (!hasTooltipBeenCreated()) {
      return d3.select('#admin-analytics')
                  .append('div') 
                  .attr('class', 'tooltip')       
                  .style('opacity', 0);
    }
    else {
      return d3.select('.tooltip');
    }
  }

  function hasTooltipBeenCreated() {
   return document.querySelector('.tooltip') ? true : false;
  }






  /********************************************************************************************************************/




  // BUILD GROUPED BAR CHART
  function buildGroupedBarChart(data, chartId, groupKey, colors, hasLabels) {
    //debugger;

    //var self = this;

    if(!HelperFunctions.array.isArray(data)) {
      HelperFunctions.object.convertToArray(data);
    }

    var margin = {top: 20, right: 50, bottom: 50, left: 60},
        width = 800 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.1),
        x1 = d3.scale.ordinal(),
        y = d3.scale.linear().range([height, 0]),
        xAxis = d3.svg.axis().scale(x0).orient('bottom'),
        yAxis = d3.svg.axis().scale(y).orient('right').tickSize(width + 50),
        color = d3.scale.ordinal().range(colors),
        barWidth,
        tooltip = getTooltip();

    

    var chart = d3.select(chartId)
                  .append('svg')
                  .attr('preserveAspectRatio', 'xMinYMin meet')
                  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                  .classed('svg-content', true)
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    var groups = d3.keys(data[0]).filter(function(key) { return key !== groupKey; });

    data.forEach(function(d) {
      d.formattedGroupForDisplay = groups.map(function(name) { return {name: name, value: +d[name]}; });
      barWidth = width / d.formattedGroupForDisplay.length;
    });

    x0.domain(data.map(function(d) { return d[groupKey]; }));
    x1.domain(groups).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(d.formattedGroupForDisplay, function(d) { return d.value; }); })]);

    chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0,${height + 5})`)
          .call(xAxis);
    
    chart.append('g')
          .attr('class', 'y axis')
          .attr('transform', `translate(-20,0)`)
          .call(customYAxis);

    function customYAxis(g) {
      g.call(yAxis);
      g.select('.domain').remove();
      g.selectAll(`${chartId} .tick:not(:first-of-type) line`)
        .attr('stroke-dasharray', '5,2');
      g.selectAll('.tick text').attr('x', -2).attr('dy', 2);
    }

    

    var groupContainers = chart.selectAll('.groups')
                    .data(data)
                    .enter().append('g')
                    .attr('class', 'groups')
                    .attr('transform', function(d) { return 'translate(' + x0(d[groupKey]) + ',0)'; });

    var bars = groupContainers.selectAll('rect')
          .data(function(d) { return d.formattedGroupForDisplay; })
          .enter();
    
    bars.append('rect')
          .attr('width', x1.rangeBand())          
          .attr('x', function(d) { return x1(d.name); })
          .attr('y', function(d) { return y(d.value); })
          .attr('height', function(d) { return height - y(d.value); })
          .attr('class', 'bar')
          //.style('fill', function(d) { return color(d.name); })
          .on('mouseover', function(d) { return mouseover(d, tooltip); })  
          .on('mouseout', function(d) { return mouseout(d, tooltip); });

    
    if(hasLabels) {
      bars.append('text')
          .attr('transform', function(d, i) { return `translate(${(i * barWidth) / 4}, - 20)`; })
          .attr('x', 0)
          .attr('y', function(d) { return y(d.value) + 3; })
          .attr('dy', '.75em')
          .text(function(d) { return d.value; });
    }

    // var legend = chart.selectAll(".legend")
    //     .data(groups.slice())
    //     .enter().append("g")
    //     .attr("class", "legend")
    //     .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

    // legend.append("rect")
    //     .attr("x", width + 20)
    //     .attr("width", 10)
    //     .attr("height", 10)
    //     .style("fill", color);

    // legend.append("text")
    //     .attr("x", width + 15)
    //     .attr("y", 5)
    //     .attr("dy", ".35em")
    //     .style("text-anchor", "end")
    //     .text(function(d) { return humanise(d); });
    
  } // BUILD GROUPED BAR CHART





  /********************************************************************************************************************/




  // // BUILD STACKED BAR CHART
  // function buildStackedBarChart(data, chartId, groupKey, colors, hasLabels, showAsPercentage) {

  //   var self = this;

  //   if(!this.HelperFunctions.array.isArray(data)) {
  //     this.HelperFunctions.object.convertToArray(data);
  //   }

  //   var margin = {top: 50, right: 50, bottom: 50, left: 60},
  //       width = 800 - margin.left - margin.right,
  //       height = 300 - margin.top - margin.bottom,
  //       x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1),
  //       y = d3.scale.linear().rangeRound([height, 0]),
  //       xAxis = d3.svg.axis().scale(x).orient('bottom'),
  //       yAxis = d3.svg.axis().scale(y).orient('right').tickSize(width),
  //       color = d3.scale.ordinal().range(colors).domain(d3.keys(data[0]).filter(function(key) { return key !== groupKey; })),
  //       tooltip = this.getTooltip();

  //   if (showAsPercentage) {
  //     yAxis.tickFormat(d3.format('.0%'));
  //   }

  //   var groups = d3.keys(data[0]).filter(function(key) { return key !== groupKey; });

  //   var chart = d3.select(chartId)
  //                 .append('svg')
  //                 .attr('preserveAspectRatio', 'xMinYMin meet')
  //                 .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  //                 .classed('svg-content', true)
  //                 .append('g')
  //                 .attr('transform', `translate(${margin.left},${margin.top})`);

    
  //   // PUT DATA INTO A FORMAT FOR STACKED CHARTS
  //   data.forEach(function(d) {
  //     var y0 = 0;
  //     d.groups = color.domain().map(function(name) { 
  //       return {
  //         name: name, 
  //         y0: y0, 
  //         y1: y0 += +d[name],
  //         value: d[name]
  //       }; 
  //     });
  //     d.total = d.groups[d.groups.length - 1].y1;
  //     d.groups.forEach(function(group) {
  //       group.total = d.groups[d.groups.length - 1].y1;
  //     });
  //   });

  //   x.domain(data.map(function(d) { return d[groupKey]; }));
  //   y.domain([0, d3.max(data, function(d) { return d.total; })]);

  //   // ADD XAXIS TO CHART
  //   chart.append("g")
  //         .attr("class", "x axis")
  //         .attr("transform", "translate(0," + height + ")")
  //         .call(xAxis);

  //   // ADD YAXIS TO CHART
  //   chart.append("g")
  //       .attr("class", "y axis")
  //       .call(customYAxis);

  //   function customYAxis(g) {
  //     g.call(yAxis);
  //     g.select('.domain').remove();
  //     g.selectAll('.tick:not(:first-of-type) line')
  //       .attr('stroke-dasharray', '5,2');
  //     g.selectAll('.tick text').attr('x', -2).attr('dy', 2);
  //   }

  //   var month = chart.selectAll(".month")
  //                     .data(data)
  //                   .enter().append("g")
  //                     .attr("class", "g")
  //                     .attr("transform", function(d) { return "translate(" + x(d[groupKey]) + ",0)"; });

  //   month.selectAll("rect")
  //         .data(function(d) { return d.groups; })
  //       .enter().append("rect")
  //         .attr("width", x.rangeBand())
  //         .attr("y", function(d) { return y(d.y1); })
  //         .attr("height", function(d) { return y(d.y0) - y(d.y1); })
  //         .style("fill", function(d) { return color(d.name); })
  //         .on('mouseover', function(d) { return self.mouseover(d, tooltip, showAsPercentage); })  
  //         .on('mouseout', function(d) { return self.mouseout(d, tooltip, showAsPercentage); });

  //   if(hasLabels) {
  //     month.append('text')
  //         .attr('x', 0)
  //         .attr('y', function(d) { return y(d.total) - 15; })
  //         .attr('dy', '.75em')
  //         .text(function(d) { return Math.round(d.total * 10) / 10; });
  //   }

  //   var legend = chart.selectAll(".legend")
  //       .data(groups.slice())
  //       .enter().append("g")
  //       .attr("class", "legend")
  //       .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

  //   legend.append("rect")
  //       .attr("x", width + 20)
  //       .attr("width", 10)
  //       .attr("height", 10)
  //       .style("fill", color);

  //   legend.append("text")
  //       .attr("x", width + 15)
  //       .attr("y", 5)
  //       .attr("dy", ".35em")
  //       .style("text-anchor", "end")
  //       .text(function(d) { return self.humanise(d); });

      
  // }// BUILD STACKED BAR CHART
  




  // /********************************************************************************************************************/


  function getTotal(data, parm) {
    return data.filter(function(d) {
      return d.name === parm;
    });
  }


  // BUILD DONUT CHART
  function buildDonutChart(data, chartId) {

    var self = this;

    var pie = d3.layout.pie()
                .value(function(d){ return d.total; })
                .sort(null);
    var testVis = d3.select(chartId),
        WIDTH = testVis.node().getBoundingClientRect().height,
        HEIGHT = testVis.node().getBoundingClientRect().height,
        totalCorrect = self.getTotal(data, 'correct')[0].total,
        totalIncorrect = self.getTotal(data, 'incorrect')[0].total;

    var outerRadius = WIDTH/2;
    var innerRadius = WIDTH/3;

    var arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    
    var svg = d3.select(chartId)
        .append("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .attr('class', 'donut-chart')
        .append('g')
        .attr({ transform:'translate(' + WIDTH/2 + ',' + HEIGHT/2 +')' });

    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('class', function(d) { return d.data.name + '-segment'; });

    path.transition()
        .duration(1000)
        .attrTween('d', function(d) {
          var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
          return function(t) {
            return arc(interpolate(t));
          };
        });


    var restOfTheData = function() {
      var legend = svg.selectAll('text.correct')
          .data(pie(data))
          .enter()
          .append('text')
          .attr('x', -35)
          .attr('y', 15)
          .text(function(){ return totalCorrect; })
          .attr('class', 'text-correct');

      legend = svg.selectAll('text.total')
        .data(pie(data))
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', 15)
        .text(function(){ return  ' / ' + (Number(totalIncorrect)+Number(totalCorrect)); })
        .attr('class', 'text-total');
    };

    setTimeout(restOfTheData,1000);

      
  }// BUILD DONUT CHART

  /********************************************************************************************************************/




  // // BUILD FANCY GRADE CHART
  // function buildFancyGradeChart(data, chartId, estAfter) {

  //   function getGrade() {
  //     if (+estAfter >= 85) {
  //       return 'a';
  //     }
  //     else if (+estAfter >= 70) {
  //       return 'b';
  //     }
  //     else if (+estAfter >= 60) {
  //       return 'c';
  //     }
  //     else {
  //       return 'no-grade';
  //     }
  //   }

  //   var dataGroup = d3.nest()
  //         .key(function(d) {return d.key;})
  //         .entries(data);

  //   var vis = d3.select(chartId),
  //       WIDTH = vis.node().getBoundingClientRect().width,
  //       HEIGHT = vis.node().getBoundingClientRect().height,
  //       xScale = d3.scale.linear().domain([0,100]).range([0, WIDTH]),
  //       yScale = d3.scale.linear().range([HEIGHT, 0]).domain([0, 100]),
  //       xAxis = d3.svg.axis()
  //         .scale(xScale),
  //       yAxis = d3.svg.axis()
  //         .scale(yScale)
  //         .orient("right")
  //         .tickSize(WIDTH)
  //         .tickValues([0, 10, 20, 30, 40, 50, 60,70,85,100])
  //         .tickFormat(function(d) {
  //           return '';
  //         });

  //   var grade = getGrade();
  //   var pathLine,pathCircle, pathCircleInner, pathGrade;

  //   vis.append("svg:g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + HEIGHT + ")")
  //     .call(xAxis);
  //   vis.append("g")
  //     .attr("class", "y axis")
  //     .attr("transform", "translate(0,0)")
  //     .call(customYAxis);

  //   function customYAxis(g) {
  //     var gradeCimg = 'dynamic-files/assets/common/publisher/grade-c.png';
  //     var gradeBimg = 'dynamic-files/assets/common/publisher/grade-b.png';
  //     var gradeAimg = 'dynamic-files/assets/common/publisher/grade-a.png';
      
  //     g.call(yAxis);
      
  //     g.selectAll('.tick:nth-of-type(8)')
  //       .append('image')
  //       .attr('xlink:href', gradeCimg)
  //       .attr('x', 20)
  //       .attr('y', 3)
  //       .attr('width', 20)
  //       .attr('height', 20);  
      
  //     g.selectAll('.tick:nth-of-type(9)')
  //       .append('image')
  //       .attr('xlink:href', gradeBimg)
  //       .attr('x', 20)
  //       .attr('y', 15)
  //       .attr('width', 20)
  //       .attr('height', 20);
      
  //     g.selectAll('.tick:nth-of-type(10)')
  //       .append('image')
  //       .attr('xlink:href', gradeAimg)
  //       .attr('x', 20)
  //       .attr('y', 15)
  //       .attr('width', 20)
  //       .attr('height', 20);
        
        
  //     g.select('.domain')
  //       .remove();
  //     g.selectAll('.tick:nth-of-type(7) line')
  //       .attr('class', 'main-line')
  //     g.selectAll('.tick:not(:nth-of-type(7)) line')
  //       .attr('class', 'not-main-line')
  //     g.selectAll('.tick:nth-of-type(10)')
  //       .append('rect')
  //       .attr('class', 'grade-a-ais')
  //     g.selectAll('.tick:nth-of-type(9)')
  //       .append('rect')
  //       .attr('class', 'grade-b-ais')
  //     g.selectAll('.tick:nth-of-type(8)')
  //       .append('rect')
  //       .attr('class', 'grade-c-ais')
  //     g.selectAll('.tick text')
  //       .attr('x', -5)
  //       .attr('dy', 2);
  //   }

  //   var lineGen = d3.svg.line()
  //     .x(function(d) { return xScale(d.scale); })
  //     .y(function(d) { return yScale(d.grade); })
  //     .interpolate("cardinal");


  //   //DRAW THE LINE & DOTS ON THE CHART
  //   dataGroup.forEach(function(d,i) {
  //     pathLine = vis.append('svg:path')
  //       .attr('d', lineGen(d.values))
  //       .attr('id', 'line_'+d.key)
  //       .attr('fill', 'none')
  //       .attr('class', 'line-color');

  //     pathCircle = vis.append("g")
  //       .attr("class","group")
  //       .selectAll("circle.dots")
  //       .data(data)
  //       .enter()
  //       .append("circle")
  //       .attr('class', 'hide-dot')
  //       .attr("cx", function(d,i) { return xScale(d.scale); } )
  //       .attr("cy", function(d,i) { return yScale(d.grade); } )
  //       .attr("r", 10)

  //     pathCircleInner = vis.append("g")
  //       .attr("class","group")
  //       .selectAll("circle.dots")
  //       .data(data)
  //       .enter()
  //       .append("circle")
  //       .attr('class', 'hide-dot')
  //       .attr("cx", function(d,i) { return xScale(d.scale); } )
  //       .attr("cy", function(d,i) { return yScale(d.grade); } )
  //       .attr("r", 7)

  //     pathGrade = vis.append("g")
  //       .selectAll("circle.dots")
  //       .data(data)
  //       .enter()
  //       .append("text")
  //       .text(function(){
  //         if (grade === 'no-grade') {
  //           return '';
  //         }
  //         return grade; 
  //       })
  //       .attr('class', 'hide-text')
  //       .attr("x", function(d,i) { return xScale(d.scale); } )
  //       .attr("y", function(d,i) { return yScale(d.grade); } )
  //       .attr('dy', '0.4em')
  //       .attr('dx', '-0.3em')
  //   });


  //   //ANIMATE FANCY GRADE CHART
  //   var totalLength = pathLine.node().getTotalLength();

  //   pathLine
  //     .attr("stroke-dasharray", totalLength + " " + totalLength)
  //     .attr("stroke-dashoffset", totalLength)
  //     .transition()
  //     .duration(1000)
  //     .ease("ease-out")
  //     .attr("stroke-dashoffset", 0);

  //   pathCircle
  //     .attr("stroke-dasharray", totalLength + " " + totalLength)
  //     .attr("stroke-dashoffset", totalLength)
  //     .transition()
  //     .delay(1000)
  //     .duration(1000)
  //     .ease("ease-linear")
  //     .attr("stroke-dashoffset", 0)
  //     .attr('class', function(d,i) {
  //     return i === (data.length-1) ? 'last-dot '+grade : 'hide-dot';
  //   });

  //   pathCircleInner
  //     .attr("stroke-dasharray", totalLength + " " + totalLength)
  //     .attr("stroke-dashoffset", totalLength)
  //     .transition()
  //     .delay(1000)
  //     .duration(1000)
  //     .ease("linear")
  //     .attr("stroke-dashoffset", 0)
  //     .attr('class', function(d,i) {
  //     return i === (data.length-1) ? 'last-dot-inner '+grade : 'hide-dot';
  //   });

  //   pathGrade
  //     .transition()
  //     .delay(1000)
  //     .duration(1000)
  //     .ease("linear")
  //     .attr('class', function(d,i) {
  //       return i === (data.length-1) ? 'grade-text' : 'hide-text';
  //     });
      
  // }// BUILD FANCY GRADE CHART


  return that;

}];

