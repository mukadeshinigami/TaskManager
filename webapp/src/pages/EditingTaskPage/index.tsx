import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import './style.css'

export const EditingTaskPage = () => {
  const { id } = useParams() as { id?: string }

  // Load full task details (includes FullText) on demand
  const { data: task, error, isLoading, isError } = trpc.get.useQuery(id ?? '', { enabled: !!id })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error?.message}</div>
  }
  if (!task) {
    return <div>No data found for task ID: {id}</div>
  }

  return (
    <div>
      <title>{`Editing Task Page: ${id}`}</title>
      <div>
        <h2>Task Details</h2>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <hr />
        <div>
          <strong>Full text:</strong>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{task.FullText}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <input placeholder="Edit title (not wired)" />
          <button style={{ marginLeft: 8 }}>Save</button>
        </div>
      </div>
    </div>
  )
}
