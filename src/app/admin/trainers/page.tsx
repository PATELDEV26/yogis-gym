'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminTrainers.module.css';
import { 
  Users, 
  Dumbbell, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  Star,
  Zap,
  Award,
  CircleOff,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

const AdminTrainersPage: React.FC = () => {
  const { showToast } = useToast();
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('trainers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast("Error fetching trainers: " + error.message, "error");
    } else {
      setTrainers(data || []);
    }
    setLoading(false);
  };

  const handleAddTrainer = () => {
    showToast("Opening 'Add New Trainer' form...", "info");
  };

  const handleEdit = (name: string) => {
    showToast(`Editing profile for ${name}...`, "info");
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the staff?`)) {
      const { error } = await supabase
        .from('trainers')
        .delete()
        .eq('id', id);

      if (error) {
        showToast("Error deleting: " + error.message, "error");
      } else {
        showToast(`${name} removed from trainers roster.`, "success");
        setTrainers(prev => prev.filter(t => t.id !== id));
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spin} size={60} />
        <h2>Syncing Roster...</h2>
      </div>
    );
  }

  if (trainers.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}><Dumbbell size={60} /></div>
        <h2>No Trainers Yet</h2>
        <p>Start building your team of fitness experts.</p>
        <button className={styles.addBtn} onClick={handleAddTrainer}>
          <Plus size={18} /> Add First Trainer
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <Dumbbell size={24} />
          </div>
          <div>
            <h1>TRAINER MANAGEMENT</h1>
            <p>Manage your expert staff and coaching roster</p>
          </div>
        </div>
        <button className={styles.addBtn} onClick={handleAddTrainer}>
          <Plus size={18} /> Add New Trainer
        </button>
      </header>

      <div className={styles.grid}>
        {trainers.map((trainer, i) => (
          <motion.div 
            key={trainer.id} 
            className={styles.trainerCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={styles.cardTop}>
              <div className={styles.trainerAvatar}>{trainer.name[0]}</div>
              <div className={styles.rating}>
                <Star size={12} fill="currentColor" /> {trainer.rating}
              </div>
            </div>
            
            <div className={styles.trainerDetails}>
              <h3>{trainer.name}</h3>
              <p className={styles.specialty}>{trainer.specialty}</p>
              
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <strong>{trainer.assigned_clients || 0}</strong>
                  <span>Clients</span>
                </div>
                <div className={styles.stat}>
                  <strong>{trainer.experience}</strong>
                  <span>Experience</span>
                </div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button className={styles.editBtn} onClick={() => handleEdit(trainer.name)}><Edit size={16} /> Edit</button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(trainer.id, trainer.name)}><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminTrainersPage;
