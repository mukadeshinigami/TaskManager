/**
 * DELETE Task Procedure
 *
 * Endpoint: /trpc/delete
 * Input: { id }
 * Output: boolean success
 */

import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import type { TaskService } from '../../services/taskService'

export const createDeleteRoute = (taskService: TaskService) =>
  trpc.procedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const ok = await taskService.deleteTask(input.id)
    return { success: ok }
  })
