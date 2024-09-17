import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ data }) => {
  if (!data || data.labels.length === 0 || data.data.length === 0) {
    return <div className="text-center text-gray-400">No data available for Pie Chart</div>;
  }

  const total = data.data.reduce((sum, value) => sum + value, 0);

  const options = {
    chart: {
      type: 'pie',
      background: 'transparent',
    },
    labels: data.labels,
    colors: ['#FF0000', '#0000FF', '#FFFF00'], // Red, Blue, Yellow
    title: {
      text: 'Distribution Analysis',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#2d3748'
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#2d3748'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const value = opts.w.config.series[opts.seriesIndex];
        const percent = ((value / total) * 100).toFixed(1);
        return `${percent}%\n(${value})`;
      },
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return `${value} (${((value / total) * 100).toFixed(1)}%)`;
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <Chart
      options={options}
      series={data.data}
      type="pie"
      height={350}
    />
  );
};

export default PieChart;