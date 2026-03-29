"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ParallaxSection.module.css';

const ParallaxSection: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className={styles.parallaxContainer}>
      <motion.div 
        style={{ y, backgroundImage: 'url(/client-media/DSC_0380.JPG)' }} 
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} />
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className={styles.content}
        >
          <h2 className={styles.title}>
            STRENGTH IN<br />
            <span className={styles.outline}>MINDFULNESS.</span>
          </h2>
          <div className={styles.line} />
          <p className={styles.subtitle}>ELEVATE YOUR ATHLETIC PERFORMANCE THROUGH INTENTION.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxSection;
