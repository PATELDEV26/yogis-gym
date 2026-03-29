import React from 'react';
import styles from './WhatsAppButton.module.css';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "1234567890"; // Replace with actual number
  const message = "Hello! I'm interested in joining Zenith Fitness Studio.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      className={styles.whatsappButton} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className={styles.tooltip}>Chat with us!</span>
    </a>
  );
};

export default WhatsAppButton;
