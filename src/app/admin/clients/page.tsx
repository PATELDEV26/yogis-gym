'use client';

import React, { useState, useEffect } from 'react';
import styles from './AdminClients.module.css';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Download,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

const AdminClientsPage: React.FC = () => {
  const { showToast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast("Error fetching members: " + error.message, "error");
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  const handleExport = () => {
    showToast("Preparing member list for export...", "info");
    setTimeout(() => showToast("Member list downloaded successfully!", "success"), 1500);
  };

  const handleAddMember = async () => {
    // This would typically open a modal. For now, we'll demonstrate a quick add for testing if the user wants.
    showToast("Opening 'Add New Member' form...", "info");
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        showToast("Error deleting: " + error.message, "error");
      } else {
        showToast(`${name} deleted from records.`, "success");
        setMembers(prev => prev.filter(m => m.id !== id));
      }
    }
  };

  const handleEdit = (name: string) => {
    showToast(`Editing profile for ${name}...`, "info");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.iconCircle}>
            <Users size={24} />
          </div>
          <div>
            <h1>CLIENTS & MEMBERS</h1>
            <p>Manage your fitness community membership records</p>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.exportBtn} onClick={handleExport}>
            <Download size={18} /> Export
          </button>
          <button className={styles.addBtn} onClick={handleAddMember}>
            <Plus size={18} /> Add New Member
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.search}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={16} />
            <select onChange={() => showToast("Filtering by plan...", "info")}>
              <option>All Plans</option>
              <option>BASIC</option>
              <option>PRO</option>
              <option>ELITE</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <select onChange={() => showToast("Filtering by status...", "info")}>
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Member</th>
              <th>Contact</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Expiry Date</th>
              <th className={styles.center}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className={styles.loadingCell}>
                  <div className={styles.loader}>
                    <Loader2 className={styles.spin} size={40} />
                    <span>Syncing with Supabase...</span>
                  </div>
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyCell}>
                  No members found. Add your first member to get started!
                </td>
              </tr>
            ) : (
              members.filter(m => 
                m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.phone?.includes(searchTerm)
              ).map((member, i) => (
                <motion.tr 
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td>
                    <div className={styles.memberName}>
                      <div className={styles.avatar}>{member.name[0]}</div>
                      <strong>{member.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contact}>
                      <span><Mail size={12} /> {member.email}</span>
                      <span><Phone size={12} /> {member.phone || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.tag} ${styles[member.plan?.toLowerCase() || 'basic']}`}>
                      {member.plan}
                    </span>
                  </td>
                  <td>
                    <div className={styles.statusCell}>
                      {member.status === 'Active' ? (
                        <span className={styles.statusActive}><CheckCircle size={14} /> Active</span>
                      ) : (
                        <span className={styles.statusInactive}><XCircle size={14} /> Inactive</span>
                      )}
                    </div>
                  </td>
                  <td>{member.joined_date}</td>
                  <td>{member.expiry_date || 'N/A'}</td>
                  <td className={styles.center}>
                    <div className={styles.rowActions}>
                      <button className={styles.iconBtn} title="Edit" onClick={() => handleEdit(member.name)}><Edit size={16} /></button>
                      <button className={styles.iconBtn} title="Delete" onClick={() => handleDelete(member.id, member.name)}><Trash2 size={16} /></button>
                      <button className={styles.iconBtn} title="More" onClick={() => showToast("Extra options available in full version.", "info")}><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <footer className={styles.pagination}>
        <span>Showing 5 of 450 members</span>
        <div className={styles.pages}>
          <button disabled>Prev</button>
          <button className={styles.activePage} onClick={() => showToast("You are on page 1", "info")}>1</button>
          <button onClick={() => showToast("Loading page 2...", "info")}>2</button>
          <button onClick={() => showToast("Loading page 3...", "info")}>3</button>
          <button onClick={() => showToast("Loading next page...", "info")}>Next</button>
        </div>
      </footer>
    </div>
  );
};

export default AdminClientsPage;
