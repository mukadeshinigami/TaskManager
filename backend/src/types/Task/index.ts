export type TaskStatus = 'todo' | 'progress' | 'review' | 'done'

export type Task = {
  id: string
  title: string
  description: string
  FullText: string

  status: TaskStatus
}
