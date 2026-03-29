'use client';

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Settings, 
  Calendar as CalendarIcon, 
  Award, 
  TrendingUp, 
  Clock, 
  Flame,
  User,
  Bell,
  CheckCircle,
  CreditCard,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const handleUpgrade = () => {
    showToast("Opening Plan Upgrade Portal...", "info");
  };

  const handleBook = (className: string) => {
    showToast(`Successfully booked: ${className}!`, "success");
  };

  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast("Redirecting to full schedule...", "info");
  };

  if (!isMounted) return null;

  const gymPhotos = [
    "/client-media/DSC_0351.JPG",
    "/client-media/DSC_0386.JPG",
    "/client-media/DSC_0387.JPG",
    "/client-media/DSC_0388.JPG",
    "/client-media/DSC_0389.JPG",
    "/client-media/DSC_0390.JPG"
  ];

  const attendanceDays = [2, 4, 5, 7, 9, 12, 14, 15, 18, 19, 21, 24];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>ZENITH</div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItemActive}><TrendingUp size={20} /> Overview</Link>
          <button className={styles.navItem} onClick={() => showToast("Schedule coming soon!", "info")}><CalendarIcon size={20} /> My Schedule</button>
          <button className={styles.navItem} onClick={() => showToast("View your achievements!", "info")}><Award size={20} /> My Badges</button>
          <button className={styles.navItem} onClick={() => showToast("Account settings...", "info")}><Settings size={20} /> Settings</button>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.memberBrief}>
            <div className={styles.miniAvatar}>Y</div>
            <div className={styles.miniInfo}>
              <strong>Alex Mercer</strong>
              <span>PRO MEMBER</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Instagram style photo strip */}
        <div className={styles.photoStrip}>
          {gymPhotos.map((photo, i) => (
            <div key={i} className={styles.photoWrapper}>
              <img src={photo} alt={`Gym active ${i}`} />
            </div>
          ))}
        </div>

        <header className={styles.header}>
          <div className={styles.welcome}>
            <h1>WELCOME BACK, ALEX!</h1>
            <p>You're on a 5-day workout streak. Keep pushing!</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.notification} onClick={() => showToast("No new notifications", "info")}>
              <Bell size={20} />
              <span className={styles.dot}></span>
            </div>
            <div className={styles.userProfile}>
              <div className={styles.userName}>Alex Mercer</div>
              <div className={styles.userAvatar}>
                <User size={24} />
              </div>
            </div>
          </div>
        </header>

        <div className={styles.contentGrid}>
          {/* Section 1: Profile & Stats */}
          <div className={styles.leftCol}>
            {/* Member Profile Card */}
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.largeAvatar}>Y</div>
                <div className={styles.badgeWrapper}>
                  <div className={styles.tierBadge}>PRO PLAN</div>
                  <div className={styles.statusBadge}>ACTIVE</div>
                </div>
              </div>
              <div className={styles.profileBody}>
                <h2>Alex Mercer</h2>
                <div className={styles.joinInfo}>
                  <div className={styles.infoItem}>
                    <span>JOINED</span>
                    <strong>15 Jan 2024</strong>
                  </div>
                  <div className={styles.infoItem}>
                    <span>EXPIRY</span>
                    <strong>15 Oct 2024</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Clock size={20} /></div>
                <div className={styles.statValue}>124</div>
                <div className={styles.statLabel}>Days Left</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{backgroundColor: '#FFE5E5', color: '#FF4D4D'}}><CheckCircle size={20} /></div>
                <div className={styles.statValue}>48</div>
                <div className={styles.statLabel}>Classes</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{backgroundColor: '#E5F1FF', color: '#007AFF'}}><CalendarIcon size={20} /></div>
                <div className={styles.statValue}>15 Oct</div>
                <div className={styles.statLabel}>Renewal</div>
              </div>
            </div>

            {/* Plan Summary */}
            <div className={styles.planSummary}>
              <div className={styles.planHeader}>
                <h3>ACTIVE PLAN SUMMARY</h3>
                <button className={styles.upgradeBtn} onClick={handleUpgrade}>UPGRADE PLAN</button>
              </div>
              <div className={styles.planProgress}>
                <div className={styles.progressHeader}>
                  <span>Plan Usage</span>
                  <span>65% Used</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: '65%'}}></div>
                </div>
              </div>
              <ul className={styles.planFeatures}>
                <li><Zap size={14} /> 24/7 Unlimited Access</li>
                <li><Zap size={14} /> All Group Classes Include</li>
                <li><Zap size={14} /> Monthly PT Session</li>
              </ul>
            </div>

            {/* Payment History */}
            <div className={styles.tableBox}>
              <h3>PAYMENT HISTORY</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '15 Jan 2024', plan: 'PRO - 6 Mo', amount: '₹9,999', status: 'Paid' },
                    { date: '12 Dec 2023', plan: 'BASIC - 1 Mo', amount: '₹1,999', status: 'Paid' }
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row.date}</td>
                      <td>{row.plan}</td>
                      <td>{row.amount}</td>
                      <td><span className={styles.paidBadge}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Calendar & Updates */}
          <div className={styles.rightCol}>
            {/* Announcement Board */}
            <div className={styles.announcementBoard}>
              <div className={styles.boardHeader}>
                <Bell size={18} />
                <h3>STUDIO NOTICES</h3>
              </div>
              <div className={styles.announcementContent}>
                <p>ZENITH FITNESS STUDIO is now open 24/7! We've added new air filtration systems and updated our 'ZEN STUDIO' equipment. Join us for the Morning Yoga session at 7:00 AM.</p>
                <span className={styles.postDate}>Posted: 2 days ago</span>
              </div>
            </div>

            {/* Attendance Calendar */}
            <div className={styles.calendarBox}>
              <div className={styles.calendarHeader}>
                <h3>ATTENDANCE</h3>
                <span>MARCH 2024</span>
              </div>
              <div className={styles.calendarGrid}>
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <div 
                    key={day} 
                    className={`${styles.calendarDay} ${attendanceDays.includes(day) ? styles.attended : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className={styles.calendarFooter}>
                <div className={styles.legendItem}>
                  <div className={styles.attendedDot}></div>
                  <span>Attended</span>
                </div>
                <button className={styles.viewHistory} onClick={() => showToast("Viewing full history...", "info")}>View Full History</button>
              </div>
            </div>

            {/* Class Booking */}
            <div className={styles.bookingBox}>
              <div className={styles.bookingHeader}>
                <h3>BOOK SESSIONS</h3>
                <a href="#" onClick={handleViewAll}>View All <ChevronRight size={14} /></a>
              </div>
              <div className={styles.classList}>
                {[
                  { name: 'Power Lifting', time: 'Today, 06:00 PM', trainer: 'Kabir Khan' },
                  { name: 'Morning Yoga', time: 'Tomorrow, 07:00 AM', trainer: 'Ananya Roy' }
                ].map((item, i) => (
                  <div key={i} className={styles.classItem}>
                    <div className={styles.classInfo}>
                      <strong>{item.name}</strong>
                      <span>{item.time} • {item.trainer}</span>
                    </div>
                    <button className={styles.bookBtn} onClick={() => handleBook(item.name)}>BOOK</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
