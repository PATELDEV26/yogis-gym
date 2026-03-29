'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminAttendance.module.css';
import { 
  Calendar, 
  Search, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreVertical,
  User,
  Check,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

const AdminAttendancePage: React.FC = () => {
  const { showToast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  const fetchAttendance = async () => {
    setLoading(true);
    // Fetch all clients first
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('id, name, plan')
      .eq('status', 'Active');

    if (clientsError) {
      showToast("Error fetching clients: " + clientsError.message, "error");
      setLoading(false);
      return;
    }

    // Fetch attendance for the selected date
    const { data: attendance, error: attendanceError } = await supabase
      .from('attendance')
      .select('*')
      .eq('log_date', date);

    if (attendanceError) {
      showToast("Error fetching attendance: " + attendanceError.message, "error");
    }

    // Merge attendance data into clients list
    const mergedData = clients.map(client => {
      const record = attendance?.find(a => a.client_id === client.id);
      return {
        ...client,
        status: record ? record.status : 'Pending',
        time: record ? record.check_in_time : '-'
      };
    });

    setMembers(mergedData);
    setLoading(false);
  };

  const handleMarkPresent = async (id: string, name: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const { error } = await supabase
      .from('attendance')
      .upsert({ 
        client_id: id, 
        status: 'Present', 
        check_in_time: now, 
        log_date: date 
      }, { onConflict: 'client_id,log_date' });

    if (error) {
      showToast("Error updating attendance: " + error.message, "error");
    } else {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'Present', time: now } : m));
      showToast(`${name} marked as PRESENT at ${now}`, "success");
    }
  };

  const handleMarkAbsent = async (id: string, name: string) => {
    const { error } = await supabase
      .from('attendance')
      .upsert({ 
        client_id: id, 
        status: 'Absent', 
        check_in_time: '-', 
        log_date: date 
      }, { onConflict: 'client_id,log_date' });

    if (error) {
      showToast("Error updating attendance: " + error.message, "error");
    } else {
      setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'Absent', time: '-' } : m));
      showToast(`${name} marked as ABSENT`, "error");
    }
  };

  const handleDateChange = () => {
    showToast("Opening calendar to select another date...", "info");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spin} size={60} />
        <h2>Loading Attendance Sheet...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <Calendar size={24} />
          </div>
          <div>
            <h1>DAILY ATTENDANCE</h1>
            <p>Mark and track daily workouts for all members</p>
          </div>
        </div>
        <div className={styles.dateSelector} onClick={handleDateChange} style={{ cursor: 'pointer' }}>
          <Calendar size={18} />
          <span>TODAY: {new Date(date).toLocaleDateString('en-GB')}</span>
        </div>
      </header>

      <div className={styles.attendanceGrid}>
        {members.length === 0 ? (
          <div className={styles.emptyState}>No active members found to track.</div>
        ) : (
          members.map((member, i) => (
            <motion.div 
              key={member.id} 
              className={`${styles.memberCard} ${member.status === 'Present' ? styles.presentCard : ''} ${member.status === 'Absent' ? styles.absentCard : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={styles.memberHeader}>
                <div className={styles.memberAvatar}>{member.name[0]}</div>
                <div className={styles.nameDetails}>
                  <h3>{member.name}</h3>
                  <span className={styles.planInfo}>{member.plan} MEMBER</span>
                </div>
              </div>
              
              <div className={styles.statusInfo}>
                <div className={styles.statusLabel}>
                  <Clock size={14} /> Check-in: {member.time}
                </div>
              </div>

              <div className={styles.cardActions}>
                <button 
                  className={`${styles.absentBtn} ${member.status === 'Absent' ? styles.activeAbsent : ''}`}
                  onClick={() => handleMarkAbsent(member.id, member.name)}
                  title="Mark Absent"
                >
                  <XCircle size={18} />
                </button>
                <button 
                  className={`${styles.presentBtn} ${member.status === 'Present' ? styles.activePresent : ''}`}
                  onClick={() => handleMarkPresent(member.id, member.name)}
                >
                  <Check size={18} /> {member.status === 'Present' ? 'Checked In' : 'Mark Present'}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAttendancePage;
