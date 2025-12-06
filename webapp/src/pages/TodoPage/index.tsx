import { trpc } from '../../lib/trpc'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'


export function TodoPage() {
  const { data, error, isLoading, isFetching, isError } = trpc.tasks.useQuery()
  const [selectedTodo, setSelectedTodo] = useState<any>(null)
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
                <div
                  key={todo.id}
                  className="todo-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedTodo(todo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedTodo(todo)
                    }
                  }}
                >
                  <h4>{todo.title}</h4>
                  <p>{todo.FullText}</p>
                  <button onClick={() => navigate(`/edit/${todo.id}`)}>
                  Edit
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
