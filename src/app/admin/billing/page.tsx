'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminBilling.module.css';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreVertical,
  Mail,
  Phone,
  Plus,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

const AdminBillingPage: React.FC = () => {
  const { showToast } = useToast();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('billing')
      .select('*')
      .order('payment_date', { ascending: false });

    if (error) {
      showToast("Error fetching payments: " + error.message, "error");
    } else {
      setPayments(data || []);
    }
    setLoading(false);
  };

  const handleSendLink = (name: string) => {
    showToast(`WhatsApp payment link sent to ${name}.`, "success");
  };

  const handleMarkPaid = async (id: string, name: string) => {
    const { error } = await supabase
      .from('billing')
      .update({ status: 'Paid' })
      .eq('id', id);

    if (error) {
      showToast("Error updating status: " + error.message, "error");
    } else {
      setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'Paid' } : p));
      showToast(`Payment for ${name} marked as PAID.`, "success");
    }
  };

  const handleRecordPayment = () => {
    showToast("Opening 'Record New Payment' form...", "info");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spin} size={60} />
        <h2>Loading Ledger...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <CreditCard size={24} />
          </div>
          <div>
            <h1>BILLING & PAYMENTS</h1>
            <p>Track membership revenue and pending dues</p>
          </div>
        </div>
        <button className={styles.addBtn} onClick={handleRecordPayment}>
          <Plus size={18} /> Record New Payment
        </button>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Member</th>
              <th>Amount</th>
              <th>Plan</th>
              <th>Date</th>
              <th>Status</th>
              <th className={styles.center}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>No payment records found.</td>
              </tr>
            ) : (
              payments.map((payment, i) => (
                <motion.tr 
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div className={styles.memberName}>
                      <div className={styles.avatar}>{payment.client_name[0]}</div>
                      <strong>{payment.client_name}</strong>
                    </div>
                  </td>
                  <td className={styles.amount}>{payment.amount}</td>
                  <td>
                    <span className={`${styles.tag} ${styles[payment.plan?.toLowerCase() || 'basic']}`}>
                      {payment.plan}
                    </span>
                  </td>
                  <td>{payment.payment_date}</td>
                  <td>
                    <div className={styles.statusCell}>
                      {payment.status === 'Paid' ? (
                        <span className={styles.statusActive}><CheckCircle size={14} /> Paid</span>
                      ) : (
                        <span className={styles.statusInactive}><XCircle size={14} /> Pending</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.center}>
                    <div className={styles.rowActions}>
                      <button className={styles.iconBtn} title="Send Payment Link" onClick={() => handleSendLink(payment.client_name)}><Send size={16} /></button>
                      <button className={styles.iconBtn} title="Mark as Paid" onClick={() => handleMarkPaid(payment.id, payment.client_name)}><CheckCircle size={16} /></button>
                      <button className={styles.iconBtn} title="More" onClick={() => showToast("Options: Refund/Invoice/Delete", "info")}><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBillingPage;
