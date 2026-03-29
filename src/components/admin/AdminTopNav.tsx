'use client';

import React from 'react';
import styles from './AdminTopNav.module.css';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  HelpCircle,
  Menu,
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Calendar,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

const AdminTopNav: React.FC = () => {
  const { showToast } = useToast();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      showToast(`Searching for: "${e.currentTarget.value}"...`, "info");
      e.currentTarget.value = "";
    }
  };

  const handleNotification = () => {
    showToast("You have 3 unread studio alerts.", "info");
  };

  const handleProfileClick = () => {
    showToast("Opening Admin Profile Settings...", "info");
  };

  return (
    <nav className={styles.topNav}>
      <div className={styles.left}>
        <div className={styles.navLinks}>
          <Link href="/admin/dashboard" className={styles.link}>Dashboard</Link>
          <Link href="/admin/enquiry" className={styles.link}>Enquiry</Link>
          <Link href="/admin/clients" className={styles.link}>Clients</Link>
          <Link href="/admin/billing" className={styles.link}>Billing & Payments</Link>
          <Link href="/admin/attendance" className={styles.link}>Attendance</Link>
          <Link href="/admin/reports" className={styles.link}>Reports</Link>
          <Link href="/admin/settings" className={styles.link}>Manage & Settings</Link>
        </div>
      </div>
      
      <div className={styles.right}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search clients, bills..." 
            onKeyDown={handleSearch}
          />
        </div>
        
        <div className={styles.actions}>
          <div className={styles.notification} onClick={handleNotification}>
            <Bell size={20} />
            <span className={styles.count}>3</span>
          </div>
          <div className={styles.adminBadge} onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <div className={styles.avatar}>A</div>
            <div className={styles.badgeInfo}>
              <div className={styles.email}>admin@yogigym.com</div>
              <div className={styles.role}>Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopNav;
