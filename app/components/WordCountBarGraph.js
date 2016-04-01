import React from 'react';
import { Bar as BarChart } from 'react-chartjs';


let WordCountBarGraph = ({data = [], labels = []}) => {
  const barChartData = {
      labels: labels,
      datasets: [
          {
              label: "Word Count",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: data
          }
      ]
    };

  const barChartOptions = {
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero:true
        }
      }]
    },

  //Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : true,

  //String - Colour of the grid lines
  scaleGridLineColor : "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth : 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - If there is a stroke on each bar
  barShowStroke : true,

  //Number - Pixel width of the bar stroke
  barStrokeWidth : 2,

  //Number - Spacing between each of the X value sets
  barValueSpacing : 5,

  //Number - Spacing between data sets within X values
  barDatasetSpacing : 1,

  //String - A legend template
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"


  }

  return (
    <BarChart data={barChartData} options={barChartOptions} width="500" height="300" />
  )
}
export default WordCountBarGraph;
