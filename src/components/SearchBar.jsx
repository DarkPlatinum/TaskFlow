import { useState } from 'react'

function SearchBar({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
}) {
  const filterOptions = [
    { label: 'All Tasks', value: 'all' },
    { label: 'High Priority', value: 'high' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'Low Priority', value: 'low' },
  ]

  return (
    <div className="search-sort-bar glass-container">
      {/* Search Input field with SVG Magnifying Glass icon */}
      <div className="search-input-wrapper">
        <span style={{ position: 'absolute', left: '0.85rem', display: 'flex', color: 'var(--text-muted)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks in real-time..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Pill controls */}
      <div className="filter-controls">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`filter-btn ${priorityFilter === opt.value ? 'active' : ''}`}
            onClick={() => setPriorityFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort selection dropdown */}
      <div className="sort-select-wrapper">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort Tasks"
        >
          <option value="date-new">Newest First</option>
          <option value="date-old">Oldest First</option>
          <option value="priority-high">Priority: High to Low</option>
          <option value="priority-low">Priority: Low to High</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar
