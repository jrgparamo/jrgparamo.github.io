import { skills } from '../../data/resume'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section className={styles.skills}>
      <h2 className={styles.heading}>Skills</h2>
      <div className={styles.grid}>
        {skills.map(group => (
          <div key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul className={styles.list}>
              {group.items.map(item => (
                <li key={item} className={styles.tag}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
