import { useState } from 'react'
import { experience } from '../../data/resume'
import styles from './Experience.module.css'

const VISIBLE_COUNT = 4

export default function Experience() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className={styles.experience}>
      <h2 className={styles.heading}>Work Experience</h2>
      <div className={styles.list}>
        {experience.map((job, i) => {
          const isFade = i === VISIBLE_COUNT - 1 && !expanded
          const isHidden = i >= VISIBLE_COUNT && !expanded

          return (
            <div
              key={i}
              className={[
                styles.item,
                isFade ? styles.fadeHint : '',
                isHidden ? styles.hidden : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.meta}>
                <span className={styles.dates}>
                  {job.start} – {job.end}
                </span>
                <span className={styles.location}>{job.location}</span>
              </div>
              <div className={styles.content}>
                <p className={styles.role}>{job.role}</p>
                <p className={styles.company}>
                  {job.company}
                  {job.team && <span className={styles.team}> · {job.team}</span>}
                </p>
                <ul className={styles.bullets}>
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      {experience.length > VISIBLE_COUNT && (
        <button
          className={styles.toggle}
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
        >
          {expanded ? 'View less' : 'View more'}
        </button>
      )}
    </section>
  )
}
