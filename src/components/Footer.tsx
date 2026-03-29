import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <h4 className={styles.logo}>ZENITH<span>.</span></h4>
            <p>ELEVATE STUDIO<br />DOWNTOWN HUB</p>
          </div>
          <div className={styles.contact}>
            <a href="tel:+1234567890" className={styles.link}>+1 234 567 8900</a><br />
            <a href="mailto:hello@yogigym.com" className={styles.link}>HELLO@YOGIGYM.COM</a>
          </div>
          <div className={styles.social}>
            <Link href="#">@ZENITHFITNESS</Link>
            <Link href="#">YOUTUBE</Link>
            <Link href="#">INSTAGRAM</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ZENITH FITNESS STUDIO. ALL RIGHTS RESERVED.</p>
          <Link href="/admin/login" className={styles.adminLink}>
            ADMIN CONSOLE
          </Link>
        </div>
      </div>
    </footer>
  );
}
