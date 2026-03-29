"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          src="/client-media/DSC_0381.MOV"
        />
        <div className={styles.overlay} />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className={styles.content}
        >
          <h1 className={styles.title}>
            <span className={styles.outline}>ELEVATE YOUR</span>
            <br />
            LIFE<span>.</span>
          </h1>

          <div className={styles.heroActions}>
            <Link href="#pricing" className={styles.primaryBtn}>
              VIEW PLANS
            </Link>
            <Link href="/login" className={styles.secondaryBtn}>
              MEMBER LOGIN
            </Link>
          </div>
        </motion.div>
      </div>

      <div className={styles.hashtag}>#ZENITHFITNESS</div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={styles.rotatingBadge}
      >
        <svg viewBox="0 0 100 100">
          <path
            id="circlePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="transparent"
          />
          <text>
            <textPath xlinkHref="#circlePath" className={styles.badgeText}>
              ZENITH FITNESS STUDIO • ZENITH FITNESS STUDIO • 
            </textPath>
          </text>
        </svg>
      </motion.div>

      <div className={styles.scrollIndicator}>
        <span>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
