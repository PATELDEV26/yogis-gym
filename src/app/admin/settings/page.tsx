'use client';

import React, { useState } from 'react';
import styles from './AdminSettings.module.css';
import { 
  Settings, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe,
  Plus,
  Edit,
  Trash2,
  Save,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const AdminSettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [plans, setPlans] = useState([
    { id: '1', name: 'BASIC', price: '49', period: 'Month' },
    { id: '2', name: 'PRO', price: '99', period: 'Month' },
    { id: '3', name: 'ELITE', price: '199', period: 'Month' },
  ]);

  const handleSaveAll = () => {
    showToast("Saving all studio configurations...", "info");
    setTimeout(() => showToast("All changes saved successfully!", "success"), 1500);
  };

  const handleAddPlan = () => {
    showToast("Opening 'Add New Membership Plan' form...", "info");
  };

  const handleEditPlan = (name: string) => {
    showToast(`Editing pricing for ${name} plan...`, "info");
  };

  const handleDeletePlan = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the ${name} plan?`)) {
      setPlans(prev => prev.filter(p => p.id !== id));
      showToast(`${name} plan deleted.`, "success");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <Settings size={24} />
          </div>
          <div>
            <h1>MANAGE & SETTINGS</h1>
            <p>Configure your studio information and business rules</p>
          </div>
        </div>
        <button className={styles.saveBtn} onClick={handleSaveAll}><Save size={18} /> Save All Changes</button>
      </header>

      <div className={styles.settingsGrid}>
        {/* Studio Info Section */}
        <section className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}><Globe size={20} /></div>
            <h3>STUDIO INFORMATION</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Studio Name</label>
              <input type="text" defaultValue="Zenith Fitness Studio" />
            </div>
            <div className={styles.inputGroup}>
              <label>WhatsApp Business No.</label>
              <input type="text" defaultValue="+91 98765 43210" />
            </div>
            <div className={styles.inputGroupFull}>
              <label>Physical Address</label>
              <input type="text" defaultValue="123 Fitness St, Ahmedabad, Gujarat, India" />
            </div>
          </div>
        </section>

        {/* Plans Management */}
        <section className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}><CreditCard size={20} /></div>
            <h3>MEMBERSHIP PLANS</h3>
            <button className={styles.miniBtn} onClick={handleAddPlan}><Plus size={14} /> Add Plan</button>
          </div>
          <div className={styles.planList}>
            {plans.map((plan) => (
              <div key={plan.id} className={styles.planItem}>
                <div className={styles.planInfo}>
                  <strong>{plan.name}</strong>
                  <span>₹{plan.price} / {plan.period}</span>
                </div>
                <div className={styles.actions}>
                  <button className={styles.iconBtn} onClick={() => handleEditPlan(plan.name)}><Edit size={14} /></button>
                  <button className={styles.iconBtn} onClick={() => handleDeletePlan(plan.id, plan.name)}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Announcement Board */}
        <section className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}><Bell size={20} /></div>
            <h3>ANNOUNCEMENT BOARD</h3>
          </div>
          <div className={styles.announcementArea}>
            <textarea 
              defaultValue="ZENITH FITNESS STUDIO is now open 24/7! We've added new air filtration systems and updated our 'ZEN STUDIO' equipment. Join us for the Morning Yoga session at 7:00 AM."
              rows={5}
            />
            <p className={styles.note}><Info size={12} /> This notice will be visible to all members on their dashboard.</p>
            <button className={styles.saveBtn} style={{ marginTop: '1rem', width: 'fit-content' }} onClick={() => showToast("Announcement updated for all members!", "success")}>
              Update Notice
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
