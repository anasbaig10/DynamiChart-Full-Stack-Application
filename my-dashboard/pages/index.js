import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Head from 'next/head';

const CandlestickChart = dynamic(() => import('../components/CandlestickChart'), { ssr: false });
const LineChart = dynamic(() => import('../components/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('../components/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('../components/PieChart'), { ssr: false });

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    candlestick: [],
    line: { labels: [], data: [] },
    bar: { labels: [], data: [] },
    pie: { labels: [], data: [] }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candlestickResponse, lineResponse, barResponse, pieResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/candlestick-data/'),
          axios.get('http://localhost:8000/api/line-chart-data/'),
          axios.get('http://localhost:8000/api/bar-chart-data/'),
          axios.get('http://localhost:8000/api/pie-chart-data/')
        ]);

        setChartData({
          candlestick: candlestickResponse.data.data,
          line: lineResponse.data,
          bar: barResponse.data,
          pie: pieResponse.data
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch chart data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Financial Dashboard - Anas Baig</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Financial Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Stock Price Movement">
            <CandlestickChart data={chartData.candlestick} />
          </ChartCard>
          <ChartCard title="Monthly Sales Trend">
            <LineChart data={chartData.line} />
          </ChartCard>
          <ChartCard title="Product Sales Comparison">
            <BarChart data={chartData.bar} />
          </ChartCard>
          <ChartCard title="Revenue Distribution">
            <PieChart data={chartData.pie} />
          </ChartCard>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-500">
        <p>&copy; 2024 Anas Baig Blockhouse Assignment. All rights reserved.</p>
      </footer>
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
    <div className="px-6 py-4 bg-gray-700">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default Dashboard;