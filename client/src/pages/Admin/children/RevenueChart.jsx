import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [labels, setLabels] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchRevenueData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/dashboard', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            // Xử lý dữ liệu từ monthlySales
            const processedData = data.monthlySales.map(item => ({
                month: item._id,
                sales: item.totalSales
            }));

            // Sắp xếp dữ liệu theo tháng
            setRevenueData(processedData.map(item => item.sales));
            setLabels(processedData.map(item => {
                const date = new Date(item.month + "-01");
                return date.toLocaleString('vi-VN', { month: 'short' });
            }));
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        }
    };

    fetchRevenueData();
}, []);

const data = {
  labels: labels,
  datasets: [
      {
          label: 'Doanh thu (VND)',
          data: revenueData,
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
      },
  ],
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu theo tháng',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Doanh thu theo tháng</h2>
            <div className='hidden md:block'>
                <Bar data={data} options={options} className='' />
            </div>
        </div> 
    </>
  )
}

export default RevenueChart
