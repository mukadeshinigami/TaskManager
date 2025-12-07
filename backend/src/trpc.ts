import { initTRPC } from '@trpc/server'
import * as _ from 'lodash'
import { z } from 'zod'

// Simple environment check

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

const tasks: Task[] =_.times(10, (num) => (
  {
    id: `task-${num + 1}`,
    title: `Task ${num + 1}`,
    description: `This is the short description for task ${num + 1}.`,
    FullText: _.times(5, (i) => `This is line ${i + 1} of the full text for task ${num + 1}.`).join(''),

    status: 'todo',
  }
))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  // fulltxt: summary for lists (no FullText)
  fulltxt: trpc.procedure.query(() => {
    return { tasks: tasks.map((task) => _.pick(task, ['id', 'title', 'description', 'status'])) }
  }),

  // get: detailed task by id (includes FullText). Validate input with zod.
  get: trpc.procedure.input(z.string()).query(({ input /*, ctx */ }) => {
    // TODO: check ctx for auth/permissions before returning FullText
    const task = tasks.find((t) => t.id === input)
    if (!task) {
      return null
    }
    return _.pick(task, ['id', 'title', 'description', 'FullText', 'status'])
  }),
})

export type TrpcRouter = typeof trpcRouter
