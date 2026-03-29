'use client';

import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import { Shield, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminLoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate admin auth
    setTimeout(() => {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('role', 'admin');
      localStorage.setItem('adminEmail', 'admin@zenithfitness.com');
      router.push('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backHome}>
        ← RETURN TO SITE
      </Link>
      
      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.iconCircle}>
          <Shield size={40} />
        </div>
        
        <div className={styles.header}>
          <h2>ADMIN CONSOLE</h2>
          <p>Secure system access for studio management</p>
        </div>

        <form className={styles.form} onSubmit={handleAdminAuth}>
          <div className={styles.inputGroup}>
            <label><Mail size={16} /> Admin Email</label>
            <input type="email" placeholder="admin@zenithfitness.com" defaultValue="admin@zenithfitness.com" required />
          </div>
          
          <div className={styles.inputGroup}>
            <label><Lock size={16} /> Secure Password</label>
            <input type="password" placeholder="••••••••" defaultValue="password" required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? (
              'ESTABLISHING SECURE CONNECTION...'
            ) : (
              <>
                AUTHENTICATE
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className={styles.securityNotice}>
          This is a protected system. Unauthorized access is strictly prohibited.
        </div>
      </motion.div>
      
      <div className={styles.bgGlow}></div>
    </div>
  );
};

export default AdminLoginPage;
