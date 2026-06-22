import { useState, useEffect } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

function App() {
  // Load registered users database from localStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('taskflow_registered_users')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse registered users', e)
        return []
      }
    }
    return []
  })

  // Load current user session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('taskflow_current_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse current user session', e)
        return null
      }
    }
    return null
  })

  // Current view routing state: 'login' | 'signup' | 'home'
  const [currentView, setCurrentView] = useState(() => {
    const savedUser = localStorage.getItem('taskflow_current_user')
    return savedUser ? 'home' : 'login'
  })

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

  // Sync registered users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('taskflow_registered_users', JSON.stringify(registeredUsers))
  }, [registeredUsers])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Handle register request from SignUp component
  // Returns error message if failed, or null if success
  const handleRegister = (name, email, password) => {
    const emailLower = email.toLowerCase().trim()
    const emailExists = registeredUsers.some((u) => u.email.toLowerCase() === emailLower)
    
    if (emailExists) {
      return 'Email is already registered'
    }

    const newUser = {
      name: name.trim(),
      email: emailLower,
      password: password, // In a real app, this would be hashed on a backend
    }

    setRegisteredUsers((prev) => [...prev, newUser])
    return null // success
  }

  // Handle login request from Login component
  // Returns error message if failed, or null if success
  const handleLogin = (email, password) => {
    const emailLower = email.toLowerCase().trim()
    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === emailLower && u.password === password
    )

    if (!matchedUser) {
      return 'Invalid email or password'
    }

    // Save session
    localStorage.setItem('taskflow_current_user', JSON.stringify(matchedUser))
    setCurrentUser(matchedUser)
    setCurrentView('home')
    return null // success
  }

  const handleLogout = () => {
    localStorage.removeItem('taskflow_current_user')
    setCurrentUser(null)
    setCurrentView('login')
  }

  return (
    <>
      {/* Premium animated decorative background shapes */}
      <div className="bg-gradient-shapes">
        <div className="gradient-shape-1"></div>
        <div className="gradient-shape-2"></div>
      </div>

      {currentView === 'home' && currentUser && (
        <Home
          currentUser={currentUser}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      {currentView === 'login' && (
        <Login
          onLogin={handleLogin}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}

      {currentView === 'signup' && (
        <SignUp
          onSignUp={handleRegister}
          onNavigate={(view) => setCurrentView(view)}
        />
      )}
    </>
  )
}

export default App
