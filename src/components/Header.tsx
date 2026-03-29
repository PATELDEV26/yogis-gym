"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useToast } from "@/context/ToastContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLink = (label: string) => {
    setIsMenuOpen(false);
    showToast(`Navigating to ${label}...`, "info");
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={() => handleNavLink("Home")}>
            ZENITH<span>.</span>
          </Link>
          
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <Link href="/" className={styles.navLink} onClick={() => handleNavLink("HOME")}>HOME</Link>
            <Link href="#facilities" className={styles.navLink} onClick={() => handleNavLink("FACILITIES")}>FACILITIES</Link>
            <Link href="#pricing" className={styles.navLink} onClick={() => handleNavLink("PRICING")}>PRICING</Link>
            <Link href="#contact" className={styles.navLink} onClick={() => handleNavLink("CONTACT")}>CONTACT</Link>
          </nav>

          <div className={styles.actions}>
            <Link href="/login" className={styles.loginBtn} onClick={() => handleNavLink("Login")}>
              MEMBER LOGIN
            </Link>
            <button 
              className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`} 
              aria-label="Toggle Menu"
              onClick={toggleMenu}
            >
              <span className={styles.line}></span>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
