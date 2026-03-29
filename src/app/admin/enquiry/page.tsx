'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminEnquiry.module.css';
import { 
  UserPlus, 
  Search, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const AdminEnquiryPage: React.FC = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast("Error fetching enquiries: " + error.message, "error");
    } else {
      setEnquiries(data || []);
    }
    setLoading(false);
  };

  const handleContact = (name: string) => {
    showToast(`Opening WhatsApp chat with ${name}...`, "info");
  };

  const handleConvert = (name: string) => {
    showToast(`Converting ${name} to Member... Redirecting to Registration.`, "success");
    setTimeout(() => router.push('/admin/clients'), 1500);
  };

  const handleAddEnquiry = () => {
    showToast("Opening 'New Enquiry' intake form...", "info");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spin} size={60} />
        <h2>Fetching Leads...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <UserPlus size={24} />
          </div>
          <div>
            <h1>PENDING ENQUIRIES</h1>
            <p>Track and convert prospective leads</p>
          </div>
        </div>
        <button className={styles.addBtn} onClick={handleAddEnquiry}>+ New Enquiry</button>
      </header>

      <div className={styles.grid}>
        {enquiries.length === 0 ? (
          <div className={styles.emptyState}>No pending enquiries at the moment.</div>
        ) : (
          enquiries.map((enquiry, i) => (
            <motion.div 
              key={enquiry.id} 
              className={styles.enquiryCard}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.sourceTag}>{enquiry.source}</div>
                <button className={styles.moreBtn} onClick={() => showToast("Options: Edit/Archive/Delete", "info")}><MoreVertical size={18} /></button>
              </div>
              
              <div className={styles.memberInfo}>
                <div className={styles.avatar}>{enquiry.name[0]}</div>
                <div className={styles.nameDetails}>
                  <h3>{enquiry.name}</h3>
                  <p>Interested in: <strong>{enquiry.intent}</strong></p>
                </div>
              </div>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <Phone size={14} /> {enquiry.phone || 'N/A'}
                </div>
                <div className={styles.contactItem}>
                  <Mail size={14} /> {enquiry.email || 'N/A'}
                </div>
                <div className={styles.contactItem}>
                  <Calendar size={14} /> Received: {enquiry.received_date}
                </div>
              </div>

              <div className={styles.statusRow}>
                <div className={`${styles.statusBadge} ${styles[enquiry.status?.toLowerCase() || 'pending']}`}>
                  <Clock size={12} /> {enquiry.status}
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.contactBtn} onClick={() => handleContact(enquiry.name)}>
                  <MessageCircle size={16} /> Contact
                </button>
                <button className={styles.convertBtn} onClick={() => handleConvert(enquiry.name)}>
                  <CheckCircle size={16} /> Convert
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminEnquiryPage;
