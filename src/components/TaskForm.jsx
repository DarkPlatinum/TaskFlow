import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate empty input
    if (!text.trim()) {
      setError('Task content cannot be empty.')
      return
    }

    onAddTask(text.trim(), priority)
    setText('')
    setPriority('medium') // reset to medium
    setError('')
  }

  return (
    <div className="task-form-card glass-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-input-container">
          <input
            type="text"
            className="task-form-input"
            placeholder="Add a new task to your flow..."
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              if (error) setError('')
            }}
          />
          {error && <span className="error-message" style={{ paddingLeft: '0.25rem' }}>{error}</span>}
        </div>

        <div className="priority-select-wrapper">
          <select
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Task Priority"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </form>
    </div>
  )
}

export default TaskForm
