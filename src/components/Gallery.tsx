"use client";

import { motion } from "framer-motion";
import styles from "./Gallery.module.css";
import Image from "next/image";
import { useToast } from "@/context/ToastContext";

const images = [
  "/client-media/DSC_0351.JPG",
  "/client-media/DSC_0354.JPG",
  "/client-media/DSC_0357.JPG",
  "/client-media/DSC_0360.JPG",
  "/client-media/DSC_0363.JPG",
  "/client-media/DSC_0366.JPG",
  "/client-media/DSC_0369.JPG",
  "/client-media/DSC_0372.JPG",
];

export default function Gallery() {
  const { showToast } = useToast();

  const handleImageClick = (index: number) => {
    showToast(`Viewing image ${index + 1} in high resolution...`, "info");
  };

  return (
    <section className={styles.gallery}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">THE ATMOSPHERE.</h2>
          <p className="description">Take a look inside our high-performance studio.</p>
        </div>
        <div className={styles.grid}>
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 8) * 0.05, duration: 0.8 }}
              className={styles.imageItem}
              onClick={() => handleImageClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <Image
                src={src}
                alt={`Studio Shot ${index + 1}`}
                width={500}
                height={500}
                className={styles.img}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
