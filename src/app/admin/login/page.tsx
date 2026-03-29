'use client';

import React, { useState } from 'react';
import styles from './AdminLogin.module.css';
import { Shield, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminLoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('admin@yogigym.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate admin auth with specific credentials
    setTimeout(() => {
      if (email === 'admin@yogigym.com' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('adminEmail', email);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please use the sample credentials provided.');
        setIsLoading(false);
      }
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

        <div className={styles.credentialsBox}>
          <p><strong>Sample Credentials:</strong></p>
          <p>Email: admin@yogigym.com</p>
          <p>Password: admin123</p>
        </div>

        <form className={styles.form} onSubmit={handleAdminAuth}>
          {error && <div className={styles.errorText}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label><Mail size={16} /> Admin Email</label>
            <input 
              type="email" 
              placeholder="admin@yogigym.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label><Lock size={16} /> Secure Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
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
