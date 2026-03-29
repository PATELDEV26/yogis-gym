'use client';

import React from 'react';
import styles from './Pricing.module.css';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const plans = [
  {
    name: "BASIC",
    price: "49",
    features: [
      "Access to all basic gym equipment",
      "Standard locker room access",
      "Free initial fitness assessment",
      "Standard membership card",
      "Open gym access (Off-peak)"
    ],
    popular: false
  },
  {
    name: "PRO",
    price: "99",
    features: [
      "24/7 Unlimited gym access",
      "Access to all group classes",
      "Monthly personal trainer session",
      "Sauna & Steam room access",
      "Digital workout tracking app",
      "Nutrition strategy guides"
    ],
    popular: true
  },
  {
    name: "ELITE",
    price: "199",
    features: [
      "Weekly 1-on-1 personal training",
      "Unlimited guest passes",
      "Customized supplements toolkit",
      "Dedicated locker for your gear",
      "Vip lounge & protein bar access",
      "Priority class bookings"
    ],
    popular: false
  }
];

const Pricing: React.FC = () => {
  const { showToast } = useToast();

  const handleChoosePlan = (name: string) => {
    showToast(`Excellent choice! Redirecting to ${name} plan enrollment...`, "success");
  };

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>MEMBERSHIP PLANS</h2>
          <p className={styles.subtitle}>Choose the perfect tier that matches your fitness goals and lifestyle.</p>
        </div>
        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <Star size={16} fill="black" />
                  MOST POPULAR
                </div>
              )}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.priceWrapper}>
                <span className={styles.currency}>$</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>/month</span>
              </div>
              <ul className={styles.featureList}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <Check size={18} className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className={`${styles.ctaButton} ${plan.popular ? styles.ctaPopular : ''}`}
                onClick={() => handleChoosePlan(plan.name)}
              >
                CHOOSE PLAN
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
