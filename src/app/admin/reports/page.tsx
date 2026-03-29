'use client';

import React from 'react';
import styles from './AdminReports.module.css';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard,
  PieChart as PieChartIcon,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const revenueData = [
  { name: 'Mon', revenue: 4500 },
  { name: 'Tue', revenue: 5200 },
  { name: 'Wed', revenue: 4800 },
  { name: 'Thu', revenue: 6100 },
  { name: 'Fri', revenue: 5900 },
  { name: 'Sat', revenue: 7500 },
  { name: 'Sun', revenue: 4200 },
];

const memberData = [
  { name: 'Jan', total: 320, active: 300 },
  { name: 'Feb', total: 350, active: 310 },
  { name: 'Mar', total: 450, active: 380 },
];

const AdminReportsPage: React.FC = () => {
  const { showToast } = useToast();

  const handleExport = () => {
    showToast("Compiling performance analytics...", "info");
    setTimeout(() => showToast("Detailed report (PDF) downloaded successfully!", "success"), 1500);
  };

  const handleFilter = () => {
    showToast("Opening date range selector...", "info");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <BarChart3 size={24} />
          </div>
          <div>
            <h1>PERFORMANCE REPORTS</h1>
            <p>Analyze revenue, attendance and growth metrics</p>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.exportBtn} onClick={handleExport}><Download size={18} /> Export Daily Metrics</button>
          <button className={styles.addBtn} onClick={handleFilter}><Calendar size={18} /> Filter by Date</button>
        </div>
      </header>

      <div className={styles.chartsGrid}>
        {/* Revenue Chart */}
        <div className={styles.chartCardLarge} onClick={() => showToast("Revenue trend: +12.5% this week.", "info")} style={{ cursor: 'pointer' }}>
          <div className={styles.chartHeader}>
            <div className={styles.headerInfo}>
              <h3>REVENUE OVERVIEW</h3>
              <div className={styles.totalValue}>₹482,450 <span>+12.5%</span></div>
            </div>
          </div>
          <div className={styles.chartBody}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAD8CE" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EAD8CE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '10px' }}
                  itemStyle={{ color: '#EAD8CE' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#EAD8CE" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Growth */}
        <div className={styles.chartCardSmall} onClick={() => showToast("Member growth: 100 new signups in March.", "info")} style={{ cursor: 'pointer' }}>
          <div className={styles.chartHeader}>
            <h3>MEMBER GROWTH</h3>
          </div>
          <div className={styles.chartBody}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={memberData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'rgba(234, 216, 206, 0.05)'}}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '10px' }}
                />
                <Bar dataKey="total" fill="#333" radius={[5, 5, 0, 0]} />
                <Bar dataKey="active" fill="#EAD8CE" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.chartFooter}>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{backgroundColor: '#EAD8CE'}}></div>
              <span>Active</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{backgroundColor: '#333'}}></div>
              <span>Total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
