import { trpc } from '../../lib/trpc'
import { useState } from 'react'

export function TaskManager() {
  const { data, error, isLoading, isFetching, isError } = trpc.tasks.useQuery()
  const [selectedTask, setSelectedTask] = useState<any>(null)

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

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
              {data?.tasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    className="task-card"
                    style={{ cursor: 'pointer' }}

                    onClick={() => setSelectedTask(task)}
                    role="button"

                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedTask(task) } }}
                  >
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

      {/* Simple stub modal when a task card is clicked */}
      {selectedTask && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ width: 520, maxWidth: '90vw', background: '#fff', color: '#000', borderRadius: 8, overflow: 'auto' }}>
            <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{selectedTask.title}</h3>
              <button onClick={() => setSelectedTask(null)} aria-label="Close" style={{ background: 'transparent', border: 'none', fontSize: 20 }}>×</button>
            </div>
            <div style={{ padding: 12 }}>
              <p>{selectedTask.description}</p>
              <p><em>This is a placeholder Implement task details here.</em></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
