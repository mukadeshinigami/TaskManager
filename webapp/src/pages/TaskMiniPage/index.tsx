import { useState, useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import { trpc } from '../../lib/trpc'

type Props = {
  initialOpen?: boolean
}

export function TaskMiniPage({ initialOpen }: Props) {
  // open state is initialized closed to avoid the same-click overlay-close
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // if caller requested initialOpen, set open asynchronously after mount
  useEffect(() => {
    if (!initialOpen) {
      return
    }
    const id = window.setTimeout(() => setIsOpen(true), 0)
    return () => window.clearTimeout(id)
  }, [initialOpen])

  useEffect(() => {
    console.info('[TaskMiniPage] mounted, initialOpen=', initialOpen)
    return () => console.info('[TaskMiniPage] unmount')
  }, [initialOpen])

  useEffect(() => {
    console.info('[TaskMiniPage] isOpen changed ->', isOpen)
  }, [isOpen])
  // use summary endpoint that does not include FullText
  const { data, isLoading } = trpc.fulltxt.useQuery()

  const firstTask = data?.tasks?.[0]

  return (
    
    <div>
      <button className="add-btn primary" onClick={() => setIsOpen(true)}>
        Open
      </button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} title="Task details">
        {isLoading ? <div>Loading...</div> : firstTask ? <div className="task-card"></div> : <div>No tasks</div>}
      </Modal>
    </div>
  )
}
