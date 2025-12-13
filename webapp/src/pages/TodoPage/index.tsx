import { trpc } from '../../lib/trpcClient'
import { useNavigate } from 'react-router-dom'
import { EditingTaskPageRoutes } from '../../lib/routes'
import { Segment } from '../../components/Segment'
import css from './index.module.scss'


export function TodoPage() {
  const { data, error, isLoading, isFetching, isError } = trpc.txt.useQuery()
  const navigate = useNavigate()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className={css.App}>
      <div className="container todo-list">
        <h2>To-Do List</h2>
        <div className={css.todoItems}>
          {data?.tasks
            .filter((task) => task.status === 'todo')
            .map((todo) => (
              <Segment 
                title={todo.title}
                description={todo.description}
                key={todo.id}>
                <p className={css.description}>{todo.FullText}</p>
                <button className={css.button} onClick={() => navigate(EditingTaskPageRoutes({ id: todo.id }))}>Edit</button>
              </Segment>
            ))}
        </div>
      </div>
    </div>
  )
}
