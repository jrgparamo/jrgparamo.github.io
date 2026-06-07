import { useState } from 'react'
import { personal } from '../../data/resume'
import styles from './Hero.module.css'

const HOVER_SRC = '/images/profile1848.jpeg'
const TRANSITION_MS = 200

export default function Hero() {
  const [src, setSrc] = useState(personal.photo)
  const [blurring, setBlurring] = useState(false)

  const swapTo = (newSrc: string) => {
    setBlurring(true)
    setTimeout(() => {
      setSrc(newSrc)
      setBlurring(false)
    }, TRANSITION_MS)
  }

  return (
    <section className={styles.hero}>
      <img
        className={`${styles.photo}${blurring ? ` ${styles.photoBlur}` : ''}`}
        src={src}
        alt={`${personal.name} profile photo`}
        width={140}
        height={140}
        onMouseEnter={() => swapTo(HOVER_SRC)}
        onMouseLeave={() => swapTo(personal.photo)}
      />
      <div className={styles.info}>
        <h1 className={styles.name}>{personal.name}</h1>
        <p className={styles.title}>{personal.title}</p>
        <p className={styles.location}>
          <span className={styles.dot} aria-hidden="true" />
          {personal.location}
        </p>
      </div>
    </section>
  )
}
