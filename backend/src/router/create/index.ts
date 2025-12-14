/**
 * CREATE Task Procedure
 *
 * Endpoint: /trpc/create
 * Input: Task data without `id`
 * Output: Created Task object
 */

import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import type { TaskService } from '../../services/taskService'

export const createCreateRoute = (taskService: TaskService) =>
  trpc.procedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().optional().nullable(),
        FullText: z.string().optional().nullable(),
        status: z.enum(['todo', 'progress', 'review', 'done']).default('todo'),
      })
    )
    .mutation(async ({ input }) => {
      const created = await taskService.createTask({
        title: input.title,
        description: input.description ?? '',
        FullText: input.FullText ?? '',
        status: input.status,
      })
      return created
    })
