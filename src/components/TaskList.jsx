import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleComplete, onDeleteTask, hasTasks }) {
  // If the user has no tasks at all in the database
  if (!hasTasks) {
    return (
      <div className="empty-state glass-container">
        <span className="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </span>
        <div className="empty-text">Your workspace is clean!</div>
        <div className="empty-subtext">Add a task using the field above to start organizing your flow.</div>
      </div>
    )
  }

  // If the user has tasks, but they are all filtered out by search/priority
  if (tasks.length === 0) {
    return (
      <div className="empty-state glass-container">
        <span className="empty-icon" style={{ opacity: 0.35 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </span>
        <div className="empty-text">No matches found</div>
        <div className="empty-subtext">No tasks match your current search query or priority filters. Try clearing them!</div>
      </div>
    )
  }

  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList
