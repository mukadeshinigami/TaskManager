import { trpc } from '../../lib/trpc'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TodoPageRoutes } from '../../lib/routes'
import './style.css'

export function TaskManager() {
  const { data, error, isLoading, isFetching, isError } = trpc.fulltxt.useQuery()
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const { data: taskDetail } = trpc.get.useQuery(selectedTaskId ?? '', { enabled: !!selectedTaskId })
  const [openSection, setOpenSection] = useState<string | null>(null)
  const navigate = useNavigate()

  function handleHeaderClick(status: string) {
    setOpenSection((prev) => (prev === status ? null : status))
  }

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="App">
      <h1>Welcome to Task Manager</h1>

      <div className="container task-list">
        <h2>Your Tasks</h2>

        <div className="task-status-areas">
          {/* To Do */}
          <div className="status-area todo">
            <div className="area-header">
              <button className="area-header-button" onClick={() => navigate(TodoPageRoutes())}>
                <h3>📝 To Do</h3>
                <span className="task-count">{data?.tasks.filter((task) => task.status === 'todo').length}</span>
              </button>
            </div>
            <button className="add-btn primary">+ New Task</button>
            <div className="tasks-list" id="todo-tasks">
              {data?.tasks
                .filter((task) => task.status === 'todo')
                .map((task) => {
                  return (
                    <div
                      key={task.id}
                      className="task-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedTaskId(task.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedTaskId(task.id)
                        }
                      }}
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
              <button
                className="area-header-button"
                onClick={() => handleHeaderClick('progress')}
                aria-expanded={openSection === 'progress'}
              >
                <h3>⚡ In Progress</h3>
                <span className="task-count">0</span>
              </button>
            </div>
            <button className="add-btn secondary">+ New Task</button>
            <div className="tasks-list" id="progress-tasks"></div>
          </div>

          {/* Review */}
          <div className="status-area review">
            <div className="area-header">
              <button
                className="area-header-button"
                onClick={() => handleHeaderClick('review')}
                aria-expanded={openSection === 'review'}
              >
                <h3>👀 Review</h3>
                <span className="task-count">0</span>
              </button>
            </div>
            <button className="add-btn warning">+ New Task</button>
            <div className="tasks-list" id="review-tasks"></div>
          </div>

          {/* Done */}
          <div className="status-area done">
            <div className="area-header">
              <button
                className="area-header-button"
                onClick={() => handleHeaderClick('done')}
                aria-expanded={openSection === 'done'}
              >
                <h3>✅ Done</h3>
                <span className="task-count">0</span>
              </button>
            </div>
            <button className="add-btn success">+ New Task</button>
            <div className="tasks-list" id="done-tasks"></div>
          </div>
        </div>
      </div>

      {/* Modal for task details - loads FullText on demand */}
      {taskDetail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 520,
              maxWidth: '90vw',
              background: '#fff',
              color: '#000',
              borderRadius: 8,
              overflow: 'auto',
            }}
          >
            <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{taskDetail.title}</h3>
              <button
                onClick={() => setSelectedTaskId(null)}
                aria-label="Close"
                style={{ background: 'transparent', border: 'none', fontSize: 18 }}
              >
                Close
              </button>
            </div>
            <div style={{ padding: 12 }}>
              <p>
                <strong>Description:</strong> {taskDetail.description}
              </p>
              <p>
                <strong>Status:</strong> {taskDetail.status}
              </p>
              <hr />
              <div style={{ whiteSpace: 'pre-wrap' }}>{taskDetail.FullText}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
