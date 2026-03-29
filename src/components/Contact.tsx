'use client';

import React, { useState } from 'react';
import styles from './Contact.module.css';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            intent: formData.message,
            source: 'Online',
            status: 'Pending'
          }
        ]);

      if (error) throw error;

      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Message sent successfully! Our team will contact you soon.", "success");
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      showToast("Failed to send message: " + error.message, "error");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className="container">
        <div className={styles.grid}>
          {/* Map Section */}
          <div className={styles.mapArea}>
            <div className={styles.mapWrapper}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15716.484210086812!2d72.5714!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzQnMTcuMCJF!5e0!3m2!1snl!2snl!4v1711650000000!5m2!1snl!2snl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <MapPin size={24} className={styles.infoIcon} />
                <div>
                  <h4>VISIT US</h4>
                  <p>123 Fitness St, Ahmedabad, Gujarat, India</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Mail size={24} className={styles.infoIcon} />
                <div>
                  <h4>EMAIL US</h4>
                  <p>hello@yogigym.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Phone size={24} className={styles.infoIcon} />
                <div>
                  <h4>CALL US</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className={styles.formArea}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>GET IN TOUCH</h2>
              <p>Have questions? Reach out to us and our team will get back to you shortly.</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                <Send size={18} />
              </button>
              {isSuccess && (
                <div className={styles.successMessage}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
