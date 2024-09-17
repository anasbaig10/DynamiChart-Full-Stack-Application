import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CandlestickChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available for Candlestick Chart</div>;
  }

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  const series = [{
    data: data.map(item => ({
      x: new Date(item.x).getTime(),
      y: [item.open, item.high, item.low, item.close]
    }))
  }];

  return (
    <Chart
      options={options}
      series={series}
      type="candlestick"
      height={350}
    />
  );
};

export default CandlestickChart;