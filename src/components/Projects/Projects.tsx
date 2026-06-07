import { projects } from '../../data/resume'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section className={styles.projects}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.name}>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h3>
            </div>
            <p className={styles.description}>{project.description}</p>
            <ul className={styles.tech}>
              {project.tech.map(t => (
                <li key={t} className={styles.tag}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
