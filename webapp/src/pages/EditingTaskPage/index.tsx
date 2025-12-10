import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import './style.css'
import { useState } from 'react'

export const EditingTaskPage = () => {
  const [state, setState] = useState({
    title: '',
    description: '',
    FullText: '',
  })

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
          <strong>Title: {state.title}</strong> {task.title}
          <br />
          <input
            placeholder="Edit title (not wired)"
            type="text"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
          <button style={{ marginLeft: 8 }}>Save</button>
        </p>
        <p>
          <strong>Description:</strong> {task.description}
          <br />
          <input
            placeholder="Edit description (not wired)"
            type="text"
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
          <button style={{ marginLeft: 8 }}>Save</button>
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
          <form>
            <textarea
              placeholder="Edit full text (not wired)"
              style={{ display: 'block', marginTop: 8, width: '100%' }}
              onChange={(e) => setState({ ...state, FullText: e.target.value })}
              value={state.FullText}
              name="text"
              id="text"
            />
            <button style={{ marginLeft: 8 }}>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}
