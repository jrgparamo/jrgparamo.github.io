import { education, certifications } from '../../data/resume'
import styles from './Education.module.css'

export default function Education() {
  return (
    <section className={styles.education}>
      <h2 className={styles.heading}>Education</h2>
      <div className={styles.list}>
        {education.map((edu, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.dates}>{edu.graduated}</span>
            </div>
            <div className={styles.content}>
              <p className={styles.school}>{edu.school}</p>
              <p className={styles.degree}>
                {edu.degree} — {edu.field}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.certsBlock}>
        <h3 className={styles.certsHeading}>Certifications</h3>
        <ul className={styles.certsList}>
          {certifications.map((cert, i) => (
            <li key={i} className={styles.certItem}>
              <span className={styles.certName}>{cert.name}</span>
              <span className={styles.certMeta}>
                {cert.status && <span className={styles.certStatus}>{cert.status}</span>}
                {cert.status && ' · '}
                Issued {cert.issued}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
