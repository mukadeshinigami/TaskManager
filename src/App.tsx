import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Welcome to Task Manager</h1>

      <input type="text" placeholder="Enter your task here" />

      <button>Add Task</button>

      <div className="container task-list">
        <h2>Your Tasks</h2>

        <div className="task-status-areas">
          {/* To Do */}
          <div className="status-area todo">
            <div className="area-header">
              <h3>📝 To Do</h3>
              <span className="task-count">0</span>
            </div>
            <button className="add-btn primary">+ New Task</button>
            <div className="tasks-list" id="todo-tasks">
              {tasks.map((task) => {
                return (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* In Progress */}
          <div className="status-area progress">
            <div className="area-header">
              <h3>⚡ In Progress</h3>
              <span className="task-count">0</span>
            </div>
            <button className="add-btn secondary">+ New Task</button>
            <div className="tasks-list" id="progress-tasks"></div>
          </div>

          {/* Review */}
          <div className="status-area review">
            <div className="area-header">
              <h3>👀 Review</h3>
              <span className="task-count">0</span>
            </div>
            <button className="add-btn warning">+ New Task</button>
            <div className="tasks-list" id="review-tasks"></div>
          </div>

          {/* Done */}
          <div className="status-area done">
            <div className="area-header">
              <h3>✅ Done</h3>
              <span className="task-count">0</span>
            </div>
            <button className="add-btn success">+ New Task</button>
            <div className="tasks-list" id="done-tasks"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const tasks = [
  {
    id: 'task-1',
    title: 'Sample Task',
    description: 'This is a sample task description.',
    status: 'todo', // Possible values: 'todo', 'progress', 'review', 'done'
  },
  {
    id: 'task-2',
    title: 'Another Task',
    description: 'This is another task description.',
    status: 'todo', // Possible values: 'todo', 'progress', 'review', 'done'
  },
]

export default App
