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
import { TRPCError } from '@trpc/server'

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
      try {
        const created = await taskService.createTask({
          title: input.title,
          description: input.description ?? '',
          FullText: input.FullText ?? '',
          status: input.status,
        })
        return created
      } catch (err: any) {
        if (err && (err.code === 'DUPLICATE_TITLE' || /title already exists/i.test(String(err.message || '')))) {
          throw new TRPCError({ code: 'CONFLICT', message: 'Task title already exists' })
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: String(err?.message ?? 'Unknown error') })
      }
    })
