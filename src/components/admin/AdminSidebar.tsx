'use client';

import React from 'react';
import styles from './AdminSidebar.module.css';
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  MessageSquare, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  LogOut, 
  Globe,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Quick Manage', icon: <TrendingUp size={20} />, path: '/admin/quick' },
    { name: 'All Members', icon: <Users size={20} />, path: '/admin/clients' },
    { name: 'All Follow-Ups', icon: <MessageSquare size={20} />, path: '/admin/followups' },
    { name: 'Pending Enquiry', icon: <UserPlus size={20} />, path: '/admin/enquiry' },
    { name: 'Pending Payment', icon: <CreditCard size={20} />, path: '/admin/billing' },
    { name: 'Upcoming Renewal', icon: <Calendar size={20} />, path: '/admin/renewals' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    showToast("Sucessfully logged out of Admin Portal.", "success");
    router.push('/admin/login');
  };

  const handleViewSite = (e: React.MouseEvent) => {
    showToast("Switching to Public Website...", "info");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>ZENITH ADMIN</div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path} 
            className={pathname === item.path ? styles.navItemActive : styles.navItem}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.adminProfile}>
          <div className={styles.avatar}>A</div>
          <div className={styles.info}>
            <div className={styles.email}>admin@yogigym.com</div>
            <div className={styles.badge}>Administrator</div>
          </div>
        </div>
        
        <Link href="/" className={styles.viewSite} onClick={handleViewSite}>
          <Globe size={18} />
          View Site
        </Link>
        
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
