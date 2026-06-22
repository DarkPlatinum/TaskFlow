import { useState, useEffect } from 'react'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  // Navigation / Login state (UI-only auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  // Theme state: defaults to dark for premium wow factor
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return 'dark'
  })

  // Apply the theme class to body for global style changes
  useEffect(() => {
    document.body.className = `${theme}-theme`
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const handleLogin = (email) => {
    setUserEmail(email)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
  }

  return (
    <>
      {/* Premium animated decorative background shapes */}
      <div className="bg-gradient-shapes">
        <div className="gradient-shape-1"></div>
        <div className="gradient-shape-2"></div>
      </div>

      {isLoggedIn ? (
        <Home
          email={userEmail}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
