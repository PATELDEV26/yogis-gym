'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopNav from '@/components/admin/AdminTopNav';
import AdminStatusBar from '@/components/admin/AdminStatusBar';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) return null;

  // Don't show sidebar/topnav on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.mainWrapper}>
        <AdminTopNav />
        <main className={styles.content}>
          {children}
        </main>
        <AdminStatusBar />
      </div>
    </div>
  );
}
