"use client";

import { motion } from "framer-motion";
import styles from "./Playground.module.css";
import Image from "next/image";

export default function Playground() {
  return (
    <section className="bg-peach">
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={styles.text}
          >
            <h2 className="section-title">YOUR TRANSFORMATION STARTS HERE.</h2>
            <p className="description">
              Zenith Fitness Studio is a private sanctuary designed for those who seek high-performance results with a mindful approach. We blend strength training with intentional movement to help you reach your peak physical and mental form.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className={styles.imageWrapper}
          >
            <Image
              src="/client-media/DSC_0410.JPG"
              alt="Transformation at Zenith Fitness Studio"
              width={800}
              height={600}
              style={{ objectFit: 'cover' }}
              className={styles.img}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
