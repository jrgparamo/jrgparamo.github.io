import { personal } from '../../data/resume'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.copy}>© {year} {personal.name}</span>
        <a
          className={styles.resume}
          href={personal.resumePdf}
          download
        >
          Download Resume
        </a>
      </div>
    </footer>
  )
}
