import React from "react";
import queryLogo from "../public/QryFlaskLogo.svg";
import Image from "next/image";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.navbar}>
      <Image src={queryLogo} alt="image for query flask" />
    </div>
  );
}
