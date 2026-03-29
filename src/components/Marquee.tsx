"use client";

import { motion } from "framer-motion";
import styles from "./Marquee.module.css";

const items = [
  "STRENGTH.",
  "BALANCE.",
  "MINDSET.",
  "EVOLVE.",
  "ZENITH.",
];

export default function Marquee() {
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className={styles.marquee}>
      <motion.div
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={styles.inner}
      >
        {repeatedItems.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </motion.div>
    </section>
  );
}
