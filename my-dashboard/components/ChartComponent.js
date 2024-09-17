import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartTheme = {
  mode: 'dark',
  palette: 'palette1',
  monochrome: {
    enabled: false,
    color: '#255aee',
    shadeTo: 'light',
    shadeIntensity: 0.65
  }
};

export const CandlestickChart = ({ data }) => {
  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: 'transparent',
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left',
      style: { color: '#fff' }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    theme: chartTheme
  };

  const series = [{
    data: data.map(item => ({
      x: new Date(item.x).getTime(),
      y: [item.open, item.high, item.low, item.close]
    }))
  }];

  return <Chart options={options} series={series} type="candlestick" height={350} />;
};

export const LineChart = ({ data }) => {
  const options = {
    chart: {
      type: 'line',
      height: 350,
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: data.labels
    },
    title: {
      text: 'Monthly Sales Trend',
      align: 'left',
      style: { color: '#fff' }
    },
    theme: chartTheme
  };

  const series = [{
    name: 'Sales',
    data: data.data
  }];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export const BarChart = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.labels,
    },
    title: {
      text: 'Product Sales Comparison',
      align: 'left',
      style: { color: '#fff' }
    },
    theme: chartTheme
  };

  const series = [{
    name: 'Sales',
    data: data.data
  }];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export const PieChart = ({ data }) => {
  const options = {
    chart: {
      type: 'pie',
      background: 'transparent',
    },
    labels: data.labels,
    title: {
      text: 'Revenue Distribution',
      align: 'left',
      style: { color: '#fff' }
    },
    theme: chartTheme,
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

  return <Chart options={options} series={data.data} type="pie" height={350} />;
};