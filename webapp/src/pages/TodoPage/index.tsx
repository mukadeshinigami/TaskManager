import { trpc } from '../../lib/trpc'
import { useNavigate } from 'react-router-dom'
import { EditingTaskPageRoutes } from '../../lib/routes'
import './style.css'

export function TodoPage() {
  const { data, error, isLoading, isFetching, isError } = trpc.tasks.useQuery()
  const navigate = useNavigate()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="App">
      <div className="container todo-list">
        <h2>To-Do List</h2>

        <div className="todo-items">
          {data?.tasks
            .filter((task) => task.status === 'todo')
            .map((todo) => {
              return (
                <div key={todo.id} className="todo-card">
                  <h4>{todo.title}</h4>
                  <p>{todo.FullText}</p>

                  <button onClick={() => navigate(EditingTaskPageRoutes({ id: todo.id }))}>Edit</button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
