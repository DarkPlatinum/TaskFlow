import { useState, useEffect } from 'react'
import TaskForm from './TaskForm'
import SearchBar from './SearchBar'
import TaskList from './TaskList'

function Home({ currentUser, onLogout, theme, toggleTheme }) {
  const email = currentUser?.email || ''
  const name = currentUser?.name || ''

  // Load tasks from localStorage initially
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(`tasks_${email}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse tasks', e)
        return []
      }
    }
    return [
      // Some default sample tasks to show visual functionality out of the box
      {
        id: '1',
        text: 'Design a glassmorphic user interface',
        priority: 'high',
        completed: true,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
      },
      {
        id: '2',
        text: 'Review the team performance metrics',
        priority: 'medium',
        completed: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
      },
      {
        id: '3',
        text: 'Draft the monthly internship report',
        priority: 'low',
        completed: false,
        createdAt: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
      }
    ]
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-new')

  // Sync tasks with localStorage whenever they change
  useEffect(() => {
    if (email) {
      localStorage.setItem(`tasks_${email}`, JSON.stringify(tasks))
    }
  }, [tasks, email])

  // Task Operations
  const addTask = (text, priority, description) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      priority,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const activeTasks = totalTasks - completedTasks

  // Search & Filter Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  // Sorting Logic
  const priorityWeight = { high: 3, medium: 2, low: 1 }

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date-new') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    if (sortBy === 'date-old') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
    if (sortBy === 'priority-high') {
      if (priorityWeight[b.priority] === priorityWeight[a.priority]) {
        return new Date(b.createdAt) - new Date(a.createdAt) // Fallback to newest
      }
      return priorityWeight[b.priority] - priorityWeight[a.priority]
    }
    if (sortBy === 'priority-low') {
      if (priorityWeight[a.priority] === priorityWeight[b.priority]) {
        return new Date(b.createdAt) - new Date(a.createdAt) // Fallback to newest
      }
      return priorityWeight[a.priority] - priorityWeight[b.priority]
    }
    return 0
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation / Header */}
      <header className="app-header">
        <div className="brand-section">
          <span className="brand-logo">TaskFlow</span>
        </div>

        <div className="user-controls">
          <div className="user-email-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{name || email}</span>
          </div>

          {/* Theme toggler */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme mode"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          <button onClick={onLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="home-container">
        {/* Statistics Dashboard Banner */}
        <section className="stats-dashboard">
          <div className="stat-card glass-container total">
            <div className="stat-val">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card glass-container active">
            <div className="stat-val">{activeTasks}</div>
            <div className="stat-label">Active Tasks</div>
          </div>
          <div className="stat-card glass-container completed">
            <div className="stat-val">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
        </section>

        {/* Form to Add Tasks */}
        <TaskForm onAddTask={addTask} />

        {/* Filter / Search & Sort bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Task List container */}
        <TaskList
          tasks={sortedTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          hasTasks={totalTasks > 0}
        />
      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} TaskFlow. Built with React &amp; modern CSS.</p>
      </footer>
    </div>
  )
}

export default Home
