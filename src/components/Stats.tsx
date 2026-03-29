'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './Stats.module.css';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.number}>
        <motion.span>{displayValue}</motion.span>{suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.statsGrid}>
          <Counter value={10} label="Years of Experience" suffix="+" />
          <Counter value={150} label="Pieces of Equipment" suffix="+" />
          <Counter value={20} label="Expert Trainers" suffix="+" />
          <Counter value={2500} label="Happy Members" suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
