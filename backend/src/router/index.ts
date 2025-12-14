/**
 * Main tRPC Router Factory
 *
 * Creates router with all procedures.
 * Accepts task service via dependency injection.
 *
 * Routes:
 * - /trpc/txt: Fetch all tasks (text/listing route)
 * - /trpc/get: Fetch single task details by ID (get/detail route)
 */

import { trpc } from './../lib/trpc'
// @index('./**/index.ts', f => `import { create${f.path.split('/').slice(0, -1).pop().replace(/^./, c => c.toUpperCase())}Route } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createCreateRoute } from './create'
import { createDeleteRoute } from './delete'
import { createGetRoute } from './get'
import { createTxtRoute } from './txt'
import { createUpdateRoute } from './update'
// @endindex

import type { TaskService } from '../services/taskService'

export const createTrpcRouter = (taskService: TaskService) =>
  trpc.router({
    // @index('./*/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: create${f.path.split('/').slice(0, -1).pop().replace(/^./, c => c.toUpperCase())}Route(taskService),`)
    create: createCreateRoute(taskService),
    delete: createDeleteRoute(taskService),
    get: createGetRoute(taskService),
    txt: createTxtRoute(taskService),
    update: createUpdateRoute(taskService),
    // @endindex
  })

export type TrpcRouter = ReturnType<typeof createTrpcRouter>
