import React from 'react';
import { Bar as BarChart } from 'react-chartjs';
import styles from '../styles';

// USING REACT-CHARTJS


const Graph = ({labels = [], data = [], dataAvg = [], barChartDatasets = [], barChartLabels = [] }) => {
  console.log(barChartDatasets)
  const dataOptions = {
          animation: {
          duration: 2000,
          easing: "easeOutQuart"
        },
        xAxes: [{
            id: "x-axis-0"
        }]
  }
  const dataset = {
      labels: labels,
      datasets: [
        {

          label: "Average Mood",
          fill: true,
          backgroundColor: "rgba(2,152,245,0.2)",
          borderColor: "rgba(2,152,245,1)",
          pointBorderColor: "rgba(2,152,245,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,152,245,1)",
          pointHoverBorderColor: "rgba(2,152,245,1)",
          pointHoverBorderWidth: 2,
          data: data
        },
      ]
    };
  const barChartData = {
    labels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ],
    datasets: [
        {
            label: "Channel Engagement",
            backgroundColor: "rgba(2,152,245,1)",
            fillColor: "rgba(0220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(0220,220,220,0.75)",
            highlightStroke: "rgba(0220,220,220,1)",
            data: barChartDatasets.map(hour => hour.count)
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
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 7,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 7,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 2,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  }
      return (
        <div>
          <BarChart style = {styles.graph} data={barChartData} options={barChartOptions} width="500" height="160" />
        </div>
    );
};

export default Graph;
