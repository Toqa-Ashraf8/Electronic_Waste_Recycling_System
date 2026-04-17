import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  FaUsers, 
  FaHourglassHalf, 
  FaCoins, 
  FaInbox 
} from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux'
import './AdminDashboard.css';
import { 
  fetchPendingOrders, 
  fetchTotalPoints, 
  fetchStatistics, 
  fetchUsersCount, 
  fetchTotalOrdersCount,
  fetchCategoriesStats
} from '../../services/dashboardService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
 const {
  requestsStatistics,
  usersCount,
  pendingCount,
  totalPoints,
  totalOrders,
  categories
 }=useSelector((state)=>state.dashboard);
 const dispatch=useDispatch();


useEffect(()=>{
  const loadData=async()=>{
   await Promise.all([
        dispatch(fetchStatistics()).unwrap(),
        dispatch(fetchUsersCount()).unwrap(),
        dispatch(fetchPendingOrders()).unwrap(),
        dispatch(fetchTotalPoints()).unwrap(),
        dispatch(fetchTotalOrdersCount()).unwrap(),
        dispatch(fetchCategoriesStats()).unwrap()
      ]);
  }
  loadData();
},[dispatch])



 const comparisonData = {
  labels: requestsStatistics.map(item=>item.MonthName),
  datasets: [
    {
      label: 'Sales 2025 (Last Year)',
      data:[10, 15, 8, 20, 12, 25, 18, 30, 22, 15, 20, 25],
      borderColor: '#cbd5e1', 
      backgroundColor: 'transparent',
      borderDash: [5, 5], 
      tension: 0.4,
    },
    {
      label: 'Sales 2026 (Current Year)',
      data: requestsStatistics.map(item=>item.RequestsCount) , 
      borderColor: '#55a690',
      backgroundColor: 'rgba(85, 166, 144, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 6,
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
      }
    },
    tooltip: {
      mode: 'index', 
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
      }
    }
  }
};

  const doughnutData = {
    labels: categories.map(category=>category.Name),
    datasets: [
      {
        data: categories.map(category=>category.Count),
        backgroundColor: ['#55a690', '#a8e6cf', '#3d7a6a'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
 
  return (
    <div className="admin-dashboard-wrapper">
      <h2 className="admin-main-title">Admin Management Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users-icon"><FaUsers /></div>
          <div className="stat-info">
            <span>Total Users</span>
            <h3>{usersCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon"><FaHourglassHalf /></div>
          <div className="stat-info">
            <span>Pending Requests</span>
            <h3 style={{color: '#d97706'}}>{pendingCount}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon points-icon"><FaCoins /></div>
          <div className="stat-info">
            <span>Points Awarded</span>
            <h3>{totalPoints}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sales-icon"><FaInbox /></div>
          <div className="stat-info">
            <span>Total Orders</span>
            <h3>{totalOrders}</h3>
          </div>
        </div>
      </div>

      <div className="charts-main-grid">
        <div className="chart-item-box">
          <h4>Selling Requests Performance</h4>
          <Line data={comparisonData} options={options} />
        </div>

        <div className="chart-item-box">
          <h4>Devices Category Split</h4>
          <div className="doughnut-wrapper">
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;