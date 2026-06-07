import './index.css'
import { useTheme } from './hooks/useTheme'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Education from './components/Education/Education'
import Projects from './components/Projects/Projects'
import Footer from './components/Footer/Footer'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <main className="container">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
      </main>
      <Footer />
    </>
  )
}

export default App
