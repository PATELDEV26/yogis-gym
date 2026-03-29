'use client';

import React from 'react';
import styles from './AdminStatusBar.module.css';
import { Database, Server, Info } from 'lucide-react';

const AdminStatusBar: React.FC = () => {
  return (
    <footer className={styles.statusBar}>
      <div className={styles.left}>
        <div className={styles.item}>
          <span className={styles.studioName}>ZENITH FITNESS STUDIO v1.0.4</span>
        </div>
      </div>
      
      <div className={styles.right}>
        <div className={styles.item}>
          <Database size={14} className={styles.icon} />
          <span>Database: <strong className={styles.statusOnline}>Connected</strong></span>
        </div>
        <div className={styles.item}>
          <Server size={14} className={styles.icon} />
          <span>Backend: <strong className={styles.statusOnline}>Active</strong></span>
        </div>
        <div className={styles.item}>
          <Info size={14} className={styles.icon} />
          <span>Uptime: 24d 14h 55m</span>
        </div>
      </div>
    </footer>
  );
};

export default AdminStatusBar;
