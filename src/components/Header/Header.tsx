import { personal } from '../../data/resume'
import type { Theme } from '../../hooks/useTheme'
import styles from './Header.module.css'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.name}>{personal.name}</span>

        <nav className={styles.nav}>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={personal.trailblazer} target="_blank" rel="noopener noreferrer">
            Trailblazer
          </a>
          <a href={`mailto:${personal.email}`}>Email</a>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '◑' : '◐'}
          </button>
        </nav>
      </div>
    </header>
  )
}
