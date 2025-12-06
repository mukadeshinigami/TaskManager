import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'

export const EditingTaskPage = () => {
  const { id } = useParams() as { id: string }

  const { data, error, isLoading, isFetching, isError } = trpc.tasks.useQuery()
  return (
    <div>
      <title>{`Editing Task Page: ${id}`}</title>
      <div>
        {isLoading || isFetching ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            <h2>Task Details</h2>
            <p>Title: {data?.tasks.find((task) => task.id === String(id))?.title}</p>
            <p>Description: {data?.tasks.find((task) => task.id === String(id))?.FullText}</p>
          </div>
        )}
      </div>
    </div>
  )
}
