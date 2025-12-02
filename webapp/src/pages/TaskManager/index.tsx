import { trpc } from '../../lib/trpc'

            
export function TaskManager() {

const result = trpc.tasks.useQuery();

const { data, error, isLoading, isFetching, isError } = trpc.tasks.useQuery();

if (isLoading || isFetching) {
    return <div>Loading...</div>;
}
if (isError) {
    return <div>Error: {error.message}</div>;
}

const x: string = 1;

  return (
    console.log(result),
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
