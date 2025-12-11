import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import './style.css'
import { useState } from 'react'
import { Input } from '../../components/Imput'

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
        <h2>{task.title} Details</h2>
        <Input 
          input='input'
          field="title"
          label={task.title}
          placeholder="Edit title"
          state={state}
          setState={setState}
        /> 
        <Input
          input='input'
          field="description"
          label={task.description}
          bonus='Description: '
          placeholder="Edit description"
          state={state}
          setState={setState}
        />
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <hr />
        <Input
          input='textarea'
          field="FullText"
          label={task.FullText}
          bonus="Full Text: "
          placeholder="Edit full text"
          state={state}
          setState={setState}
        />

      </div>
    </div>
  )
}
