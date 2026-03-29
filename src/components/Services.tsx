"use client";

import { motion } from "framer-motion";
import styles from "./Services.module.css";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

const services = [
  "PERSONAL TRAINING",
  "DUO TRAINING",
  "SMALL GROUP",
  "NUTRITION COACHING",
];

export default function Services() {
  const { showToast } = useToast();

  const handleServiceClick = (service: string) => {
    showToast(`Exploring our ${service} program... More details coming soon!`, "info");
  };

  return (
    <section className={styles.services}>
      <div className="container">
        <ul className={styles.list}>
          {services.map((service, index) => (
            <motion.li
              key={service}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.item}
              onClick={() => handleServiceClick(service)}
            >
              <div className={styles.link}>
                {service}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
