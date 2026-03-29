'use client';

import React from 'react';
import styles from './AdminDashboard.module.css';
import { 
  Users, 
  UserPlus, 
  CreditCard, 
  TrendingUp, 
  MessageSquare,
  Activity,
  UserX,
  Zap,
  Phone,
  BarChart,
  Target,
  Clock,
  Send,
  Download,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const handleAction = (label: string) => {
    switch (label) {
      case 'Create Walk-In':
        router.push('/admin/enquiry');
        showToast("Opening Enquiry Form...", "info");
        break;
      case 'Send Payment Link':
        showToast("Sending payment reminders to 15 members...", "success");
        break;
      case 'Generate Report':
        showToast("Generating daily studio report PDF...", "success");
        break;
      case 'Bulk WhatsApp':
        showToast("AI: Sending bulk messages to all active members...", "success");
        break;
      default:
        showToast(`Action: ${label} triggered`, "info");
    }
  };

  const handleViewMore = (type: string) => {
    if (type === 'enquiry') router.push('/admin/enquiry');
    if (type === 'renewal') router.push('/admin/billing');
    showToast(`Viewing all ${type}s...`, "info");
  };

  const stats = [
    { label: 'Total Members', value: '450', icon: <Users size={24} />, trend: '+12' },
    { label: 'Active Members', value: '380', icon: <Activity size={24} />, trend: '95%' },
    { label: 'Inactive Members', value: '70', icon: <UserX size={24} />, trend: '-3' },
    { label: 'Newsletter', value: '1.2k', icon: <MessageSquare size={24} />, trend: '+45' },
    { label: 'Pending Payments', value: '15', icon: <CreditCard size={24} />, color: '#FF4D4D' },
    { label: 'Pending Enquiries', value: '28', icon: <UserPlus size={24} />, color: '#FFA500' },
  ];

  const actions = [
    { label: 'Create Walk-In', icon: <UserPlus size={20} />, description: 'Add new client enquiry' },
    { label: 'Send Payment Link', icon: <Send size={20} />, description: 'WhatsApp/SMS reminder' },
    { label: 'Generate Report', icon: <Download size={20} />, description: 'Daily metrics PDF/CSV' },
    { label: 'Bulk WhatsApp', icon: <Share2 size={20} />, description: 'Message all active members' },
  ];

  return (
    <div className={styles.container}>
      {/* AI Indicator */}
      <div className={styles.aiIndicator}>
        <div className={styles.aiBadge}>
          <Zap size={14} fill="currentColor" />
          AI AUTOMATION ACTIVE
        </div>
      </div>

      <header className={styles.header}>
        <div>
          <h1>DASHBOARD OVERVIEW</h1>
          <p>Zenith Fitness Studio Central Console</p>
        </div>
        <div className={styles.timeInfo}>
          <Clock size={16} />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => showToast(`Detailed view for ${stat.label} is coming soon!`, "info")}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.statIcon} style={{color: stat.color || 'var(--color-peach)'}}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
            {stat.trend && <div className={styles.trendBadge}>{stat.trend}</div>}
          </motion.div>
        ))}
      </div>

      {/* Action Center */}
      <section className={styles.actionCenter}>
        <h3>ACTION CENTER</h3>
        <div className={styles.actionsGrid}>
          {actions.map((action, i) => (
            <motion.button 
              key={i} 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(action.label)}
            >
              <div className={styles.actionIcon}>{action.icon}</div>
              <div className={styles.actionText}>
                <strong>{action.label}</strong>
                <span>{action.description}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Bottom Grid: Recent Activity & Follow Ups */}
      <div className={styles.bottomGrid}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3>RECENT WALK-INS</h3>
            <button className={styles.viewMore} onClick={() => handleViewMore('enquiry')}>View All</button>
          </div>
          <div className={styles.list}>
            {[
              { name: 'Sameer Shah', time: '10:45 AM', intent: 'Weight Loss' },
              { name: 'Priya Mehta', time: '09:12 AM', intent: 'Yoga Coaching' },
              { name: 'Karan Jani', time: 'Yesterday', intent: 'Muscle Gain' }
            ].map((item, i) => (
              <div key={i} className={styles.listItem}>
                <div className={styles.itemAvatar}>{item.name[0]}</div>
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span>Goal: {item.intent}</span>
                </div>
                <div className={styles.itemMeta}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3>PENDING RENEWALS</h3>
            <button className={styles.viewMore} onClick={() => handleViewMore('renewal')}>View All</button>
          </div>
          <div className={styles.list}>
            {[
              { name: 'Rahul Patel', expiry: 'In 2 days', amount: '₹9,999' },
              { name: 'Anjali Desai', expiry: 'In 5 days', amount: '₹4,999' },
              { name: 'Vikram Singh', expiry: 'Expired today', amount: '₹12,499' }
            ].map((item, i) => (
              <div key={i} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <strong>{item.name}</strong>
                  <span className={styles.warning}>{item.expiry}</span>
                </div>
                <div className={styles.itemMeta}>{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
