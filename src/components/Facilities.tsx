'use client';

import React from 'react';
import styles from './Facilities.module.css';
import { Dumbbell, Heart, Users, Shield, Zap, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const facilityData = [
  {
    icon: <Dumbbell size={40} />,
    title: "FREE WEIGHTS",
    description: "Extensive range of dumbbells, barbells, and plates for all strength levels.",
    image: "/client-media/DSC_0351.JPG"
  },
  {
    icon: <Zap size={40} />,
    title: "CARDIO ZONE",
    description: "State-of-the-art treadmills, ellipticals, and rowers for peak endurance.",
    image: "/client-media/DSC_0365.JPG"
  },
  {
    icon: <Heart size={40} />,
    title: "ZEN STUDIO",
    description: "A peaceful space dedicated to yoga, Pilates, and mindful movement.",
    image: "/client-media/DSC_0375.JPG"
  },
  {
    icon: <Users size={40} />,
    title: "GROUP CLASSES",
    description: "High-energy sessions led by world-class certified instructors.",
    image: "/client-media/DSC_0383.JPG"
  },
  {
    icon: <Shield size={40} />,
    title: "LOCKER ROOMS",
    description: "Premium showers, saunas, and secure storage for your comfort.",
    image: "/client-media/DSC_0356.JPG"
  },
  {
    icon: <Layout size={40} />,
    title: "REST LOUNGE",
    description: "Recharge after your workout in our specialized relaxation area.",
    image: "/client-media/DSC_0405.JPG"
  }
];

const Facilities: React.FC = () => {
  const { showToast } = useToast();

  const handleCardClick = (title: string) => {
    showToast(`Exploring ${title}... More details coming soon!`, "info");
  };

  return (
    <section id="facilities" className={styles.facilitiesSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>OUR FACILITIES</h2>
          <p className={styles.subtitle}>Premium equipment and specialized zones for your ultimate fitness experience.</p>
        </div>
        <div className={styles.grid}>
          {facilityData.map((item, index) => (
            <motion.div 
              key={index} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => handleCardClick(item.title)}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className={styles.overlay}></div>
              <div className={styles.content}>
                <div className={styles.iconWrapper}>
                  {item.icon}
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
