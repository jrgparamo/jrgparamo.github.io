import { personal } from '../../data/resume'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.about}>
      <h2 className={styles.heading}>About</h2>
      <p className={styles.bio}>{personal.bio}</p>
    </section>
  )
}
