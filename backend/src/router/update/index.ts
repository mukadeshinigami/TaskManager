/**
 * UPDATE Task Procedure
 *
 * Endpoint: /trpc/update
 * Input: { id, data } where data is partial Task
 * Output: Updated Task or null
 */

import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import type { TaskService } from '../../services/taskService'

const updateDataSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().optional().nullable(),
    FullText: z.string().optional().nullable(),
    status: z.enum(['todo', 'progress', 'review', 'done']).optional(),
  })
  .partial()

export const createUpdateRoute = (taskService: TaskService) =>
  trpc.procedure.input(z.object({ id: z.string(), data: updateDataSchema })).mutation(async ({ input }) => {
    const updated = await taskService.updateTask(input.id, input.data)
    return updated
  })
