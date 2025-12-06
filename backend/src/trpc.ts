import { initTRPC } from '@trpc/server'

if (true) {
  console.info('Running in development mode')
}

type TaskStatus = 'todo' | 'progress' | 'review' | 'done'

type Task = {
  id: string
  title: string
  description: string
  FullText: string
  status: TaskStatus
}

export const tasks: Task[] = [
  {
    id: String('task-1'),
    title: String('Sample Task'),
    description: String('This is a sample task description.'),
    FullText: String(
      'This is a sample task description. It can be extended to include more details about the task, its requirements, and any other relevant information that might help in its completion.'
    ),
    status: 'todo',
  },
  {
    id: String('task-2'),
    title: String('Another Task'),
    description: String(
      'This is a sample task description.This is a sample task description.This is a sample task description.'
    ),
    FullText: String(
      'It sportsman earnestly ye preserved an on. Moment led family sooner cannot her window pulled any. Or raillery if improved landlord to speaking hastened differed he. Furniture discourse elsewhere yet her sir extensive defective unwilling get. Why resolution one motionless you him thoroughly. Noise is round to in it quick timed doors. Written address greatly get attacks inhabit pursuit our but. Lasted hunted enough an up seeing in lively letter. Had judgment out opinions property the supplied. '
    ),
    status: 'todo',
  },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  tasks: trpc.procedure.query(() => {
    return { tasks }
  }),
  hello: trpc.procedure.query(() => {
    return 'Hello from tRPC backend!'
  }),
})

export type TrpcRouter = typeof trpcRouter
