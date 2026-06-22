import React from 'react'

function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  // Format the date/time string into a human-readable layout
  const formatDate = (isoString) => {
    if (!isoString) return ''
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return ''
    }
  }

  return (
    <div className={`task-card glass-container ${task.completed ? 'completed-task' : ''}`}>
      <div className="task-item-left">
        {/* Custom Checkbox */}
        <label className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <span className="checkbox-custom"></span>
        </label>

        {/* Task Text & Metadata */}
        <div className="task-content">
          <span className="task-text">{task.text}</span>
          <div className="task-meta">
            {/* Priority Badge */}
            <span className={`priority-badge ${task.priority}`}>
              {task.priority}
            </span>

            {/* Date Badge */}
            <span className="task-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.15rem' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDeleteTask(task.id)}
        className="btn-icon"
        aria-label="Delete task"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>
  )
}

export default TaskItem
