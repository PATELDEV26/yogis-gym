'use client';

import React, { useState } from 'react';
import styles from './Login.module.css';
import { User, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <Link href="/" className={styles.backHome}>
        ← BACK TO HOME
      </Link>
      
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.iconCircle}>
          <User size={40} />
        </div>
        
        <div className={styles.header}>
          <h2>ZENITH FITNESS STUDIO</h2>
          <p>Your transformation begins here.</p>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'signin' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            SIGN IN
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'signup' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            SIGN UP
          </button>
        </div>

        <form className={styles.form} onSubmit={handleAuth}>
          <AnimatePresence mode="wait">
            {activeTab === 'signup' && (
              <motion.div 
                key="signup-fields"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={styles.inputGroup}
              >
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? (
              'PROCESSING...'
            ) : (
              <>
                {activeTab === 'signin' ? 'LOGIN TO DASHBOARD' : 'CREATE ACCOUNT'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            New here? <Link href="/#pricing">View our plans</Link>
          </p>
          <Link href="/admin/login" className={styles.adminLink}>
            Admin Console
          </Link>
        </div>
      </motion.div>

      {/* Decorative background elements */}
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>
    </div>
  );
};

export default LoginPage;
