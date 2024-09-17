import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = ({ data }) => {
  if (!data || data.labels.length === 0 || data.data.length === 0) {
    return <div className="text-center text-gray-400">No data available for Bar Chart</div>;
  }

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    colors: ['#4299e1'],
    title: {
      text: 'Category Comparison',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
      }
    },
    xaxis: {
      categories: data.labels,
      labels: {
        style: {
          colors: '#cbd5e0'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#cbd5e0'
        }
      }
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: '#2d3748'
    }
  };

  const series = [{
    name: 'Values',
    data: data.data
  }];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default BarChart;