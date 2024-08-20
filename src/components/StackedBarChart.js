import React from "react";
import { Bar } from "react-chartjs-2";

const StackedBarChart = ({ data }) => {
  const chartData = {
    labels: data.values.map(i => i.name),
    datasets: data.values.map(i => ({
      label: `${i.name} (${i.value})`,
      data: [i.value],
      backgroundColor: i.color,
    })),
  };

  const options = {
    indexAxis: 'y',
    layout:{
      padding: {
        top: 20,
        bottom: 20,
        right: 20,
    }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 12,
          generateLabels: function (chart) {
            const labels = chart.data.datasets.map((dataset) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
            }));

            
            return labels;
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
  
    <div style={{ width: '100%' ,padding:'10px'}}>
      <div style={{paddingBottom:'10px'}}>
          <h6>{data.total}</h6>
      </div>
      <div>
      <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StackedBarChart;
